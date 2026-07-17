"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";

export default function Hero({
  name = "brandon",
  tagline = "Shipping digital experiences that go beyond visuals, blending UX and motion to create designs that inspire engagement.",
  ctaText = "View Projects",
  targetId = "projects",
}: {
  name?: string;
  tagline?: string;
  ctaText?: string;
  targetId?: string;
}) {
  const letters = name.split("");
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState<boolean[]>([]);
  const [fontSize, setFontSize] = useState(100);

  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const fit = () => {
    const c = containerRef.current;
    const n = nameRef.current;
    if (!c || !n) return;
    const containerWidth = c.getBoundingClientRect().width;
    const nameWidth = n.getBoundingClientRect().width;
    if (containerWidth > 0 && nameWidth > 0) {
      setFontSize((current) => {
        const next = current * (containerWidth / nameWidth) * 0.995;
        return Math.abs(next - current) > 0.5 ? next : current;
      });
    }
  };

  useLayoutEffect(() => {
    fit();
  }, [fontSize, name]);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(fit);
    if (containerRef.current) ro.observe(containerRef.current);
    if (document.fonts?.ready) {
      document.fonts.ready.then(fit);
    }
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setVisible(Array(letters.length).fill(false));
    const timers = letters.map((_, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 200 + i * 60)
    );
    return () => timers.forEach(clearTimeout);
  }, [name]);

  const scrollToProjects = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
        paddingTop: 48,
      }}
    >
      <div style={{ width: "100%", overflow: "hidden", flexShrink: 0 }}>
        <div
          ref={nameRef}
          style={{
            display: "inline-flex",
            fontSize,
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
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "16px 48px 24px 48px",
          fontSize: "clamp(28px, 4.6vw, 80px)",
        }}
      >
        <p
          style={{
            fontSize: "1em",
            fontWeight: 800,
            color: "#FAFAFA",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            margin: 0,
            padding: 0,
            width: "100%",
          }}
        >
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
          {tagline}
        </p>
      </div>
    </div>
  );
}