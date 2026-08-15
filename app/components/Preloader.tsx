"use client";

import { useEffect, useRef, useState } from "react";

const MIN_DURATION = 600;
const MAX_WAIT = 2600;
const HARD_LIFT = 4000;
const HOLD = 300;
const WIPE = 700;
const FALLBACK_AFTER = 3500;

const EMAIL_USER = "bwong127";
const EMAIL_DOMAIN = "asu.edu";
const WORK_SAMPLE_URL = "/treevah-work-sample.pdf";

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const doneRef = useRef(false);

  useEffect(() => {
    const start = Date.now();
    let readyAt = 0;

    const markReady = () => {
      if (readyAt === 0) readyAt = Date.now();
    };
    if (document.readyState === "complete" || document.readyState === "interactive") {
      markReady();
    } else {
      document.addEventListener("DOMContentLoaded", markReady, { once: true });
    }
    window.addEventListener("load", markReady, { once: true });
    const readyCap = setTimeout(markReady, MAX_WAIT);

    const lift = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setPct(100);
      setTimeout(() => {
        setLifting(true);
        setTimeout(() => setHidden(true), WIPE);
      }, HOLD);
    };

    const interval = setInterval(() => {
      if (doneRef.current) return;
      const elapsed = Date.now() - start;
      const minMet = elapsed >= MIN_DURATION;
      const ready = readyAt !== 0;

      setPct((prev) => {
        const ceiling = ready && minMet ? 100 : 90;
        if (prev >= ceiling) return prev;
        const next = prev + Math.max(1, (ceiling - prev) * 0.12);
        return Math.min(ceiling, next);
      });

      if (ready && minMet) lift();
    }, 40);

    const fallbackTimer = setTimeout(() => {
      if (!doneRef.current) setShowFallback(true);
    }, FALLBACK_AFTER);

    const hardLift = setTimeout(lift, HARD_LIFT);

    return () => {
      clearInterval(interval);
      clearTimeout(readyCap);
      clearTimeout(fallbackTimer);
      clearTimeout(hardLift);
      document.removeEventListener("DOMContentLoaded", markReady);
      window.removeEventListener("load", markReady);
    };
  }, []);

  if (hidden) return null;

  const shown = Math.min(100, Math.round(pct));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: lifting ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.7s cubic-bezier(0.76,0,0.24,1)",
        pointerEvents: lifting ? "none" : "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 2,
          fontFamily: "Manrope, sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#FAFAFA",
        }}
      >
        <span
          style={{
            fontSize: "clamp(56px, 12vw, 150px)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {shown}
        </span>
        <span
          style={{
            fontSize: "clamp(20px, 4vw, 44px)",
            color: "#CDFE88",
            transform: "translateY(-0.15em)",
          }}
        >
          %
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "clamp(28px, 6vw, 56px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          width: "min(90%, 420px)",
          textAlign: "center",
          opacity: showFallback ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: showFallback ? "auto" : "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "#757575",
            letterSpacing: "0.01em",
            lineHeight: 1.5,
          }}
        >
          Taking a while? Your network may be blocking parts of this site.
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => window.open(WORK_SAMPLE_URL, "_blank", "noopener,noreferrer")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#CDFE88",
              color: "#121212",
              border: "none",
              borderRadius: 999,
              padding: "10px 18px",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            View Work Sample (PDF)
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#121212"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 13, height: 13 }}
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </button>

          <button
            onClick={() => { window.location.href = "mailto:" + EMAIL_USER + "@" + EMAIL_DOMAIN; }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "none",
              border: "0.5px solid #404040",
              borderRadius: 999,
              padding: "10px 18px",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: "#FAFAFA",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}