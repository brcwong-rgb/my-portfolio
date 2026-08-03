"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setDone(true), 250);
        setTimeout(() => setHidden(true), 1050);
      } else {
        setProgress(current);
      }
    }, 26);
    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#121212",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "48px",
        boxSizing: "border-box",
        transform: done ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.8s cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      {/* label bottom-left */}
      <span
        style={{
          fontFamily: "'Work Sans', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#757575",
        }}
      >
        Brandon Wong — Portfolio
      </span>

      {/* big counter bottom-right */}
      <span
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "clamp(80px, 18vw, 240px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "#FAFAFA",
          lineHeight: 0.8,
        }}
      >
        {progress}
        <span style={{ color: "#CDFE88" }}>%</span>
      </span>
    </div>
  );
}