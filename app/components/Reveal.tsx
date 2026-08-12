"use client";

import { useEffect, useState, ElementType, ReactNode, CSSProperties } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.85,
  as: Tag = "div" as ElementType,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let fired = false;
    const go = () => {
      if (fired) return;
      fired = true;
      setEntered(true);
    };
    window.addEventListener("site:loaded", go);
    const fb = setTimeout(go, 1500);
    return () => {
      window.removeEventListener("site:loaded", go);
      clearTimeout(fb);
    };
  }, []);

  return (
    <Tag
      className={className}
      style={{
        ...style,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}