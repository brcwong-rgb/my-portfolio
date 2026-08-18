"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const INK = "#FAFAFA";
const DIM = "#757575";
const LINE = "#2a2a2a";
const WORK_SANS = "'Work Sans', sans-serif";

const NAV_TOP = 120;
const SPY_LINE = 200;
const MOBILE_BREAKPOINT = 900;
const MAXW = 1440; // must match the container in page.tsx

type Sub = { label: string; id: string };
type Group = { group: string; id: string; subs: Sub[] };

const TOC: Group[] = [
  {
    group: "Design",
    id: "design",
    subs: [
      { label: "User Flow", id: "user-flow" },
      { label: "Design Decisions", id: "design-decisions" },
    ],
  },
  { group: "Live at HackDavis", id: "live", subs: [] },
  {
    group: "Improvements",
    id: "improvements",
    subs: [
      { label: "Feedback", id: "feedback" },
      { label: "Edge Case", id: "edge-cases" },
    ],
  },
  { group: "Takeaways", id: "takeaways", subs: [] },
];

function getEl(id: string): Element | null {
  const els = document.querySelectorAll(`[id="${id}"]`);
  return els.length > 0 ? els[els.length - 1] : null;
}

export default function HackDavisNav() {
  const [mounted, setMounted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [activeGroup, setActiveGroup] = useState("");
  const [activeSub, setActiveSub] = useState("");
  const [progress, setProgress] = useState(0);
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
      let visible = false;

      const start = getEl("design");
      if (start) {
        visible = start.getBoundingClientRect().top - NAV_TOP - 20 <= 0;
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - window.innerHeight;
      if (nearBottom) visible = false;

      setNavVisible(visible);

      let g = "";
      for (const section of TOC) {
        const el = getEl(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - SPY_LINE <= 0) g = section.id;
      }
      setActiveGroup(g);

      let s = "";
      for (const section of TOC) {
        for (const sub of section.subs) {
          const el = getEl(sub.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top - SPY_LINE <= 0) s = sub.id;
        }
      }
      setActiveSub(s);

      const gi = TOC.findIndex((t) => t.id === g);
      let prog = 0;
      if (gi !== -1) {
        const curEl = getEl(TOC[gi].id);
        const nextEl = gi + 1 < TOC.length ? getEl(TOC[gi + 1].id) : null;
        if (curEl && nextEl) {
          const a = curEl.getBoundingClientRect().top;
          const b = nextEl.getBoundingClientRect().top;
          if (b > a) prog = Math.max(0, Math.min(1, (SPY_LINE - a) / (b - a)));
        }
      }
      setProgress(prog);
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

  if (!mounted || !navVisible || isMobile) return null;

  const nav = (
    <nav
      style={{
        position: "fixed",
        top: NAV_TOP,
        left: `max(48px, calc((100vw - ${MAXW}px) / 2 + 48px))`,
        width: 240,
        boxSizing: "border-box",
        padding: "22px 22px",
        borderRadius: 16,
        border: `0.5px solid ${LINE}`,
        background: "rgba(24,24,24,0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        fontFamily: WORK_SANS,
        zIndex: 90,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {TOC.map((section, i) => {
          const groupActive = activeGroup === section.id;
          const hasSubs = section.subs.length > 0;
          const fill = groupActive ? progress : 0;
          return (
            <div
              key={section.group}
              style={{
                animation: "hdNavIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <span
                onClick={() => scrollTo(section.id)}
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: groupActive ? INK : DIM,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
              >
                {section.group}
              </span>

              <div
                style={{
                  overflow: "hidden",
                  maxHeight: groupActive ? 200 : 0,
                  opacity: groupActive ? 1 : 0,
                  transition:
                    "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    paddingTop: hasSubs ? 14 : 0,
                    paddingLeft: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 11,
                  }}
                >
                  {hasSubs && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 14,
                          bottom: 0,
                          width: 1,
                          background: LINE,
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 14,
                          width: 1,
                          height: `calc((100% - 14px) * ${fill})`,
                          background: INK,
                          transition: "height 0.12s linear",
                        }}
                      />
                    </>
                  )}

                  {section.subs.map((sub) => {
                    const subActive = activeSub === sub.id;
                    return (
                      <span
                        key={sub.id}
                        onClick={() => scrollTo(sub.id)}
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: subActive ? INK : DIM,
                          letterSpacing: "0.02em",
                          cursor: "pointer",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {sub.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes hdNavIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );

  return createPortal(nav, document.body);
}