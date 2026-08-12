"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const MOBILE_BREAKPOINT = 768;
const NAV_CLEARANCE = 54;
const MOBILE_TOP_TRIM = 0.42;
const TAGLINE_GAP = 8;
const TAGLINE_MIN = 22;
const TAGLINE_MAX = 80;
const TAGLINE_SCALE = 0.7;

// ── ENTRANCE TIMELINE (all times in seconds, keyed off `entered`) ──
const START_EVENT = "site:loaded";   // dispatch this from your preloader when it finishes
const FALLBACK_MS = 1500;            // safety net if the event never arrives (raise if preloader runs longer)
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; // expo-out — the "expensive" curve

const NAME_DUR = 0.8;         // per-letter rise duration
const NAME_STAGGER = 0.055;   // gap between each letter
const TAGLINE_DELAY = 0.4;    // tagline starts after name is underway
const TAGLINE_DUR = 0.9;
const HIGHLIGHT_DELAY = 1.0;  // underlines draw after tagline lands
const HIGHLIGHT_STAGGER = 0.14;
const CTA_DELAY = 0.85;       // CTA is last in
const CTA_DUR = 0.75;

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
  const [entered, setEntered] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [offsetEm, setOffsetEm] = useState(0);
  const [taglineSize, setTaglineSize] = useState(32);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineWrapRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const attemptsRef = useRef(0);

  // ── ENTRANCE TRIGGER: fire on preloader event, with a safety fallback ──
  useEffect(() => {
    let fired = false;
    const go = () => {
      if (fired) return;
      fired = true;
      setEntered(true);
    };
    window.addEventListener(START_EVENT, go);
    const fb = setTimeout(go, FALLBACK_MS);
    return () => {
      window.removeEventListener(START_EVENT, go);
      clearTimeout(fb);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const fitTagline = () => {
    const p = taglineRef.current;
    const wrap = taglineWrapRef.current;
    if (!p || !wrap) return;

    const wrapRect = wrap.getBoundingClientRect();
    const target = wrapRect.width * TAGLINE_SCALE;
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

  const scrollToProjects = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const pattern = new RegExp(
    `\\b(${highlights.map(escapeRe).join("|")})\\b`,
    "g"
  );
  const parts = tagline.split(pattern);
  const highlightSet = new Set(highlights);
  let hlIndex = 0;

  // DESKTOP CTA — text + retracting underline + down arrow
  const desktopCta = (
    <button
      onClick={scrollToProjects}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        float: "left",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.15em",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        marginRight: "6vw",
        marginTop: "0.28em",
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

  // MOBILE CTA — bold solid green pill with down arrow
  const mobileCta = (
    <button
      onClick={scrollToProjects}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "#CDFE88",
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        padding: "14px 24px",
        marginBottom: 44,
        // entrance
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(16px)",
        transition: `opacity ${CTA_DUR}s ${EASE} ${CTA_DELAY}s, transform ${CTA_DUR}s ${EASE} ${CTA_DELAY}s`,
        willChange: "opacity, transform",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span
        style={{
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "#121212",
        }}
      >
        {ctaText}
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#121212"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          width: 16,
          height: 16,
          animation: "heroPillBob 1.6s ease-in-out infinite",
        }}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
      <style>{`
        @keyframes heroPillBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
      `}</style>
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
                overflow: "hidden",
                verticalAlign: "bottom",
                paddingTop: "0.12em",
                marginTop: "-0.12em",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: entered ? "translateY(0%)" : "translateY(110%)",
                  transition: `transform ${NAME_DUR}s ${EASE} ${i * NAME_STAGGER}s`,
                }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div
        ref={taglineWrapRef}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: isMobile ? `${TAGLINE_GAP}px 0 28px 0` : "16px 0 24px 0",
          fontSize: isMobile ? taglineSize : "clamp(28px, 4.6vw, 80px)",
          // entrance (vertical-only transform keeps the auto-fit measurement valid)
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(22px)",
          transition: `opacity ${TAGLINE_DUR}s ${EASE} ${TAGLINE_DELAY}s, transform ${TAGLINE_DUR}s ${EASE} ${TAGLINE_DELAY}s`,
          willChange: "opacity, transform",
        }}
      >
        <p
          ref={taglineRef}
          style={{
            fontSize: "1em",
            fontWeight: 800,
            color: "#FAFAFA",
            letterSpacing: "-0.03em",
            lineHeight: isMobile ? 1.1 : 1.02,
            textAlign: "left",
            margin: 0,
            padding: 0,
            width: "100%",
          }}
        >
          {!isMobile && desktopCta}

          {parts.map((part, i) => {
            if (!highlightSet.has(part)) return <span key={i}>{part}</span>;
            const delay = HIGHLIGHT_DELAY + hlIndex++ * HIGHLIGHT_STAGGER;
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
                    transform: entered ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform 0.7s ${EASE} ${delay}s`,
                    display: "block",
                  }}
                />
              </span>
            );
          })}
        </p>
      </div>

      {isMobile && mobileCta}
    </div>
  );
}