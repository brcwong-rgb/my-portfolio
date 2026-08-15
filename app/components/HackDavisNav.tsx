"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const INK = "#FAFAFA";
const DIM = "#757575";
const WORK_SANS = "'Work Sans', sans-serif";

const NAV_TOP = 120;
const SPY_LINE = 200;
const MOBILE_BREAKPOINT = 900;

// sections only — no sub-items
const TOC = [
  { group: "Design", id: "design" },
  { group: "Live at HackDavis", id: "live" },
  { group: "Improvements", id: "improvements" },
  { group: "Takeaways", id: "takeaways" },
];

function getEl(id: string): Element | null {
  const els = document.querySelectorAll(`[id="${id}"]`);
  return els.length > 0 ? els[els.length - 1] : null;
}

export default function HackDavisNav() {
  const [mounted, setMounted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [activeGroup, setActiveGroup] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const check = () => {
      const start = getEl("design");
      if (start) {
        const top = start.getBoundingClientRect().top;
        setNavVisible(top - NAV_TOP - 20 <= 0);
      }

      let currentGroup = "";
      for (const section of TOC) {
        const el = getEl(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - SPY_LINE <= 0) {
          currentGroup = section.id;
        }
      }
      setActiveGroup(currentGroup);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = getEl(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // hidden entirely on mobile
  if (!mounted || !navVisible || isMobile) return null;

  const nav = (
    <nav
      style={{
        position: "fixed",
        top: NAV_TOP,
        left: 48,
        width: 280,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: WORK_SANS,
        zIndex: 90,
      }}
    >
      {TOC.map((section) => {
        const groupActive = activeGroup === section.id;
        return (
          <span
            key={section.group}
            onClick={() => scrollTo(section.id)}
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: groupActive ? INK : DIM,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "color 0.25s ease",
            }}
          >
            {section.group}
          </span>
        );
      })}
    </nav>
  );

  return createPortal(nav, document.body);
}