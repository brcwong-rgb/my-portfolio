"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const MOBILE_BREAKPOINT = 768;
const NAV_CLEARANCE = 54; // px — roughly the height of the fixed nav bar
const MOBILE_TOP_TRIM = 0.3; // em of the font's internal leading to crop off
const FIRST_LINE_INDENT = "1.7em"; // Champ-style indent on the tagline
const TAGLINE_MIN = 22; // px — floor for the auto-fitted tagline
const TAGLINE_MAX = 80; // px — ceiling for the auto-fitted tagline

export default function Hero({
  name = "brandon",
  tagline = "Shipping digital experiences that blend UX and motion to create engaging designs solutions.",
  highlights = ["UX", "motion"],
  ctaText = "View Projects",
  targetId = "projects",
}: {
  name?: string;
  tagline?: string;
  highlights?: string[];
  ctaText?: string;
  targetId?: string;
}) {
  const letters = name.split("");
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState<boolean[]>([]);
  const [fontSize, setFontSize] = useState(100);
  const [offsetEm, setOffsetEm] = useState(0);
  const [taglineSize, setTaglineSize] = useState(32);
  const [highlightIn, setHighlightIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineWrapRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Measure the real horizontal ink edges, as fractions of the advance width.
  const measureBearings = (el: HTMLElement, text: string) => {
    if (!canvasRef.current) canvasRef.current = document.createElement("canvas");
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return { leftRatio: 0, rightRatio: 0 };

    const cs = getComputedStyle(el);
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;

    const spaced = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
    if ("letterSpacing" in spaced) spaced.letterSpacing = cs.letterSpacing;

    const m = ctx.measureText(text);
    const advance = m.width;
    if (!advance || m.actualBoundingBoxLeft == null) {
      return { leftRatio: 0, rightRatio: 0 };
    }

    return {
      leftRatio: -m.actualBoundingBoxLeft / advance,
      rightRatio: (advance - m.actualBoundingBoxRight) / advance,
    };
  };

  const fit = () => {
    const row = rowRef.current;
    const n = nameRef.current;
    if (!row || !n) return;

    const rowWidth = row.getBoundingClientRect().width;
    const boxWidth = n.getBoundingClientRect().width;
    if (rowWidth <= 0 || boxWidth <= 0) return;

    const { leftRatio, rightRatio } = measureBearings(n, name);
    const inkWidth = boxWidth * (1 - leftRatio - rightRatio);
    if (inkWidth <= 0) return;

    const nextOffsetEm = (leftRatio * boxWidth) / fontSize;
    setOffsetEm((prev) =>
      Math.abs(prev - nextOffsetEm) > 0.002 ? nextOffsetEm : prev
    );

    setFontSize((current) => {
      const next = current * (rowWidth / inkWidth) * 0.999;
      return Math.abs(next - current) > 0.5 ? next : current;
    });
  };

  // Grow the tagline until its widest line reaches the right edge.
  const fitTagline = () => {
    const p = taglineRef.current;
    const wrap = taglineWrapRef.current;
    if (!p || !wrap) return;

    const wrapRect = wrap.getBoundingClientRect();
    const target = wrapRect.width;
    if (target <= 0) return;

    const range = document.createRange();
    range.selectNodeContents(p);
    const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0.5);
    if (!rects.length) return;

    const maxRight = Math.max(...rects.map((r) => r.right));
    const widest = maxRight - wrapRect.left;
    if (widest <= 0) return;

    setTaglineSize((current) => {
      if (attemptsRef.current > 40) return current;
      const raw = current * (target / widest);
      // damp each step so a rewrap can't send it into a loop
      const stepped = Math.min(raw, current * 1.1);
      const next = Math.max(TAGLINE_MIN, Math.min(stepped, TAGLINE_MAX));
      if (Math.abs(next - current) < 0.3) return current;
      attemptsRef.current += 1;
      return next;
    });
  };

  useLayoutEffect(() => {
    fit();
  }, [fontSize, offsetEm, name]);

  useLayoutEffect(() => {
    if (!isMobile) return;
    fitTagline();
  }, [taglineSize, tagline, isMobile]);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => {
      attemptsRef.current = 0;
      fit();
      fitTagline();
    });
    if (rowRef.current) ro.observe(rowRef.current);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        attemptsRef.current = 0;
        fit();
        fitTagline();
      });
    }
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setVisible(Array(letters.length).fill(false));
    setHighlightIn(false);

    const timers = letters.map((_, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 200 + i * 60)
    );

    // fire once the last letter has finished settling
    const revealDelay = 200 + letters.length * 60 + 500;
    const revealTimer = setTimeout(() => setHighlightIn(true), revealDelay);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(revealTimer);
    };
  }, [name]);

  const scrollToProjects = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Split the tagline so highlighted words can be wrapped individually.
  const pattern = new RegExp(
    `\\b(${highlights.map(escapeRe).join("|")})\\b`,
    "g"
  );
  const parts = tagline.split(pattern);
  const highlightSet = new Set(highlights);
  let hlIndex = 0;

  const cta = (
    <button
      onClick={scrollToProjects}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        float: isMobile ? "none" : "left",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.15em",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: isMobile ? "2px 0 8px 0" : 0,
        marginRight: isMobile ? 0 : "6vw",
        marginTop: isMobile ? 0 : "0.28em",
        marginBottom: isMobile ? "0.5em" : 0,
        fontSize: "0.42em",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span style={{ position: "relative", display: "inline-block" }}>
        <span
          style={{
            fontSize: "1em",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: hover ? "#FAFAFA" : "#CDFE88",
            transition: "color 0.3s ease",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          {ctaText}
        </span>
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: "-0.08em",
            height: 2,
            width: "100%",
            background: "#CDFE88",
            transformOrigin: "right",
            transform: hover ? "scaleX(0)" : "scaleX(1)",
            transition: "transform 0.4s cubic-bezier(0.65, 0, 0.35, 1)",
            display: "block",
          }}
        />
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={hover ? "#FAFAFA" : "#CDFE88"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          width: "0.55em",
          height: "0.55em",
          flexShrink: 0,
          transition: "stroke 0.3s ease, transform 0.3s ease",
          transform: hover ? "translateY(0.1em)" : "translateY(0)",
        }}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </button>
  );

  return (
    <div
      id="hero"
      ref={containerRef}
      style={{
        width: "100%",
        background: "#121212",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        padding: isMobile
          ? `${NAV_CLEARANCE}px clamp(20px, 4vw, 48px) 0`
          : "48px clamp(20px, 4vw, 48px) 0",
      }}
    >
      <div
        ref={rowRef}
        style={{ width: "100%", overflow: "visible", flexShrink: 0 }}
      >
        <div
          ref={nameRef}
          style={{
            display: "inline-flex",
            fontSize,
            marginLeft: `-${offsetEm}em`,
            marginTop: isMobile ? `-${MOBILE_TOP_TRIM}em` : 0,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.82,
            whiteSpace: "nowrap",
            userSelect: "none",
            color: "#FAFAFA",
          }}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? "translateY(0%)" : "translateY(30%)",
                transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={taglineWrapRef}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: isMobile ? "24px 0 32px 0" : "16px 0 24px 0",
          fontSize: isMobile ? taglineSize : "clamp(28px, 4.6vw, 80px)",
        }}
      >
        {isMobile && cta}

        <p
          ref={taglineRef}
          style={{
            fontSize: "1em",
            fontWeight: 800,
            color: "#FAFAFA",
            letterSpacing: "-0.03em",
            lineHeight: isMobile ? 1.1 : 1.02,
            textIndent: isMobile ? FIRST_LINE_INDENT : 0,
            textAlign: "left",
            margin: 0,
            padding: 0,
            width: "100%",
          }}
        >
          {!isMobile && cta}

          {parts.map((part, i) => {
            if (!highlightSet.has(part)) return <span key={i}>{part}</span>;
            const delay = hlIndex++ * 0.14;
            return (
              <span
                key={i}
                style={{
                  position: "relative",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  textIndent: 0,
                }}
              >
                {part}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: "0.02em",
                    height: "0.05em",
                    width: "100%",
                    background: "#FAFAFA",
                    transformOrigin: "left",
                    transform: highlightIn ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
                    display: "block",
                  }}
                />
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}