"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const INK = "#FAFAFA";
const DIM = "#757575";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";

const NAV_TOP = 120;
const SPY_LINE = 200;

type Item = { label: string; id: string };
type Group = { group: string; id: string; items: Item[] };

const TOC: Group[] = [
  {
    group: "Design",
    id: "design",
    items: [
      { label: "User Flow", id: "user-flow" },
      { label: "Design Decisions", id: "design-decisions" },
    ],
  },
  { group: "Live at HackDavis", id: "live", items: [] },
  {
    group: "Improvements",
    id: "improvements",
    items: [{ label: "Edge Case", id: "edge-cases" }],
  },
  { group: "Takeaways", id: "takeaways", items: [] },
];

// flat list of every spy target
const SPY_TARGETS: { id: string; group: string }[] = [];
TOC.forEach((section) => {
  SPY_TARGETS.push({ id: section.id, group: section.id });
  section.items.forEach((item) => {
    SPY_TARGETS.push({ id: item.id, group: section.id });
  });
});

function getEl(id: string): Element | null {
  const els = document.querySelectorAll(`[id="${id}"]`);
  return els.length > 0 ? els[els.length - 1] : null;
}

export default function HackDavisNav() {
  const [mounted, setMounted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [activeGroup, setActiveGroup] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const check = () => {
      // nav appears once the DESIGN section reaches the top
      const start = getEl("design");
      if (start) {
        const top = start.getBoundingClientRect().top;
        setNavVisible(top - NAV_TOP - 20 <= 0);
      }

      // scroll-spy: last target past the reading line
      let currentId = "";
      let currentGroup = "";
      for (const target of SPY_TARGETS) {
        const el = getEl(target.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - SPY_LINE <= 0) {
          currentId = target.id;
          currentGroup = target.group;
        }
      }
      setActiveId(currentId);
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

  if (!mounted || !navVisible) return null;

  const nav = (
    <nav
      style={{
        position: "fixed",
        top: NAV_TOP,
        left: 48,
        width: 280,
        display: "flex",
        flexDirection: "column",
        gap: 32,
        fontFamily: WORK_SANS,
        zIndex: 90,
      }}
    >
      {TOC.map((section) => {
        const groupActive = activeGroup === section.id;
        return (
          <div key={section.group}>
            <span
              onClick={() => scrollTo(section.id)}
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: groupActive ? ACCENT : INK,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: section.items.length > 0 ? 12 : 0,
                cursor: "pointer",
                transition: "color 0.25s ease",
              }}
            >
              {section.group}
            </span>
            {section.items.map((item) => {
              const itemActive = activeId === item.id;
              return (
                <span
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: "block",
                    fontSize: 15,
                    fontWeight: itemActive ? 500 : 400,
                    color: itemActive ? ACCENT : DIM,
                    lineHeight: 1.9,
                    cursor: "pointer",
                    transition: "color 0.25s ease",
                  }}
                >
                  {item.label}
                </span>
              );
            })}
          </div>
        );
      })}
    </nav>
  );

  return createPortal(nav, document.body);
}