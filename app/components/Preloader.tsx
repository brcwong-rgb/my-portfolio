"use client";

import { useEffect, useRef, useState } from "react";

const MIN_DURATION = 700;   // minimum time the loader shows
const MAX_DURATION = 2500;  // FAIL-SAFE: force ready after this no matter what
const HARD_STOP = 3500;     // absolute stop: force the whole thing gone

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hidden, setHidden] = useState(false);
  const startRef = useRef<number>(Date.now());
  const pageReadyRef = useRef(false);
  const finishedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = Date.now();

    const markReady = () => {
      pageReadyRef.current = true;
    };

    // Ready as soon as the DOM is parsed — do NOT wait on window "load",
    // because that waits on videos/images that corporate proxies (Zscaler)
    // may block, which would hang the loader forever.
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      markReady();
    } else {
      document.addEventListener("DOMContentLoaded", markReady);
    }

    // FAIL-SAFE: treat as ready after MAX_DURATION regardless of anything
    const failSafe = setTimeout(markReady, MAX_DURATION);

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setPct(100);
      setTimeout(() => {
        setFinished(true);
        setTimeout(() => setHidden(true), 800);
      }, 350);
    };

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const ready = pageReadyRef.current;
      const minMet = elapsed >= MIN_DURATION;

      setPct((prev) => {
        const ceiling = ready && minMet ? 100 : 90;
        if (prev >= ceiling) return prev;
        const step = Math.max(0.8, (ceiling - prev) * 0.08);
        return Math.min(ceiling, prev + step);
      });

      if (ready && minMet) {
        setPct((prev) => {
          if (prev >= 99 && !finishedRef.current) {
            finish();
          }
          return prev;
        });
      }

      if (!finishedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    // absolute backstop — force everything gone no matter what state
    const hardStop = setTimeout(finish, HARD_STOP);

    return () => {
      document.removeEventListener("DOMContentLoaded", markReady);
      clearTimeout(failSafe);
      clearTimeout(hardStop);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (hidden) return null;

  const shown = Math.round(pct);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#121212",
        transform: finished ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.8s cubic-bezier(0.76,0,0.24,1)",
        pointerEvents: finished ? "none" : "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 3,
          width: `${shown}%`,
          background: "#CDFE88",
          transition: "width 0.2s ease-out",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "clamp(20px, 5vw, 64px)",
          bottom: "clamp(20px, 5vw, 48px)",
          fontFamily: "Manrope, sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontSize: "clamp(80px, 18vw, 240px)",
          color: "#FAFAFA",
        }}
      >
        {shown}
        <span style={{ color: "#CDFE88" }}>%</span>
      </div>
    </div>
  );
}