"use client";

import { useEffect, useRef, useState } from "react";

const MIN_DURATION = 900;   // minimum time the loader shows
const MAX_DURATION = 4000;  // FAIL-SAFE: force finish after this no matter what

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

    // if the page is already loaded, mark immediately
    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady);
    }

    // FAIL-SAFE: no matter what, treat the page as ready after MAX_DURATION
    const failSafe = setTimeout(() => {
      pageReadyRef.current = true;
    }, MAX_DURATION);

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setPct(100);
      // small pause so the bar/counter visibly land on 100, then wipe up
      setTimeout(() => {
        setFinished(true);
        setTimeout(() => setHidden(true), 800);
      }, 400);
    };

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const ready = pageReadyRef.current;
      const minMet = elapsed >= MIN_DURATION;

      setPct((prev) => {
        // climb toward a ceiling; only allow 100 once ready + min time met
        const ceiling = ready && minMet ? 100 : 85;
        if (prev >= ceiling) return prev;
        // ease as it climbs
        const step = Math.max(0.5, (ceiling - prev) * 0.06);
        return Math.min(ceiling, prev + step);
      });

      if (pageReadyRef.current && minMet) {
        // close enough to 100 → finish
        setPct((prev) => {
          if (prev >= 99.5 && !finishedRef.current) {
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

    // absolute hard stop: force the whole thing gone after MAX + buffer
    const hardStop = setTimeout(() => {
      finish();
    }, MAX_DURATION + 1200);

    return () => {
      window.removeEventListener("load", markReady);
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
      {/* thin load bar pinned at top */}
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

      {/* big % counter bottom-right */}
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