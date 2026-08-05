"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const MIN_DURATION = 900;
    let pageReady = document.readyState === "complete";

    const markReady = () => {
      pageReady = true;
    };
    if (!pageReady) window.addEventListener("load", markReady);

    let raf = 0;
    let finished = false;

    const tick = () => {
      const elapsed = Date.now() - start;
      const timeRatio = Math.min(elapsed / MIN_DURATION, 1);
      const ceiling = pageReady ? 1 : 0.85;
      const target = Math.min(timeRatio, ceiling) * 100;

      setProgress((p) => (target > p ? Math.min(target, 100) : p));

      if (pageReady && timeRatio >= 1 && !finished) {
        finished = true;
        setProgress(100);
        // let the bar + counter visibly land on 100 first, THEN wipe away
        window.setTimeout(() => setDone(true), 400);
        window.setTimeout(() => setHidden(true), 400 + 800);
        return;
      }
      if (!finished) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", markReady);
    };
  }, []);

  if (hidden) return null;

  const pct = Math.round(progress);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#121212",
        transform: done ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.8s cubic-bezier(0.76,0,0.24,1)",
        pointerEvents: done ? "none" : "auto",
      }}
    >
      {/* thin green load bar pinned at the very top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 3,
          width: `${pct}%`,
          background: "#CDFE88",
          transition: "width 0.25s ease",
        }}
      />

      {/* big counter bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          fontFamily: "Manrope, sans-serif",
          fontSize: "clamp(80px, 18vw, 240px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "#FAFAFA",
          lineHeight: 0.8,
        }}
      >
        {pct}
        <span style={{ color: "#CDFE88" }}>%</span>
      </div>
    </div>
  );
}