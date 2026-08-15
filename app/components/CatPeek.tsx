"use client";

import { useEffect, useRef, useState } from "react";

const CAT_WIDTH = 240;
const EYE_SIZE = 26;
const LEFT_EYE = { x: 0.235, y: 0.55 };
const RIGHT_EYE = { x: 0.38, y: 0.55 };
const PUPIL_TRAVEL = 4;

export default function CatPeek() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      setOffset({
        x: (dx / dist) * PUPIL_TRAVEL,
        y: (dy / dist) * PUPIL_TRAVEL,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const eyeStyle = (eye: { x: number; y: number }): React.CSSProperties => ({
    position: "absolute",
    width: EYE_SIZE,
    height: EYE_SIZE,
    left: `${eye.x * 100}%`,
    top: `${eye.y * 100}%`,
    transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
    transition: "transform 0.12s ease-out",
    pointerEvents: "none",
  });

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: CAT_WIDTH,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <img
        src="/cat-body.png"
        alt=""
        style={{ width: "100%", display: "block" }}
      />
      <img src="/cat-eye-left.png" alt="" style={eyeStyle(LEFT_EYE)} />
      <img src="/cat-eye-right.png" alt="" style={eyeStyle(RIGHT_EYE)} />
    </div>
  );
}