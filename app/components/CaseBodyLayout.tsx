"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const WORK_SANS = "var(--font-work-sans), sans-serif";

const MOBILE_BREAKPOINT = 900;
const NAV_TOP = 120;
const SPY_LINE = 200;

type Sub = { label: string; id: string };
type Group = { group: string; id: string; subs: Sub[] };

const TOC: Group[] = [
  {
    group: "Preproduction Planning",
    id: "preproduction",
    subs: [
      { label: "How Might We...", id: "how-might-we" },
      { label: "Shot List", id: "shot-list" },
    ],
  },
  {
    group: "Production",
    id: "production",
    subs: [
      { label: "Footage list", id: "footage-list" },
      { label: "Draft #1", id: "draft-1" },
      { label: "Client Feedback", id: "client-feedback" },
    ],
  },
  { group: "Final Design", id: "final-design", subs: [] },
  { group: "Reflection", id: "reflection", subs: [] },
];

function getEl(id: string): Element | null {
  const els = document.querySelectorAll('[id="' + id + '"]');
  return els.length > 0 ? els[els.length - 1] : null;
}

function renderBold(text: string) {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ fontWeight: 600, color: INK }}>{part}</strong>
    ) : (
      part
    )
  );
}

function Term({ label, dotColor }: { label: string; dotColor: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12, background: CARD, border: "0.5px solid " + LINE, borderRadius: 999, padding: "14px 24px", whiteSpace: "nowrap" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
      <span style={{ fontSize: "clamp(15px, 1.6vw, 19px)", fontWeight: 500, color: INK, fontFamily: WORK_SANS }}>{label}</span>
    </span>
  );
}

function Operator({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, color: DIM, fontFamily: WORK_SANS, flexShrink: 0 }}>{children}</span>;
}

const D = {
  sectionLabel: "PREPRODUCTION PLANNING",
  headline:
    "How might we raise awareness of the Basic Needs resources available at San José City College?",
  body: " With over **16,000 students** enrolled at SJCC and nearly **two-thirds experiencing basic needs insecurity,** the department needed a compelling way to educate students about the no-cost resources and support services available to them.",
  goal1: "Instructional",
  goal2: "Marketing the Services",
  goal3: "Catchy & Captivating",
  result: "The Promotional Video",
};

export default function CaseBodyLayout({
  content,
}: {
  content?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [activeGroup, setActiveGroup] = useState("");
  const [activeSub, setActiveSub] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const check = () => {
      // Nav visible from the first section until the last section scrolls past.
      let visible = false;
      const firstEl = getEl("preproduction");
      const lastEl = getEl("reflection");
      if (firstEl && lastEl) {
        const started = firstEl.getBoundingClientRect().top - NAV_TOP - 20 <= 0;
        const ended = lastEl.getBoundingClientRect().bottom - NAV_TOP <= 0;
        visible = started && !ended;
      }
      setNavVisible(visible);

      // ---- DEBUG: remove after we diagnose ----
      console.log(
        "VIS:", visible,
        "| first top:", firstEl ? Math.round(firstEl.getBoundingClientRect().top) : "MISSING",
        "| reflection bottom:", lastEl ? Math.round(lastEl.getBoundingClientRect().bottom) : "MISSING"
      );
      // -----------------------------------------

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

  const nav =
    mounted && navVisible && !isMobile
      ? createPortal(
          <nav
            style={{
              position: "fixed",
              top: NAV_TOP,
              left: 48,
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
                      animation: "sjNavIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
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
              @keyframes sjNavIn {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </nav>,
          document.body
        )
      : null;

  return (
    <div
      id="preproduction"
      ref={containerRef}
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: isMobile ? "72px 20px" : "96px 48px",
      }}
    >
      {nav}

      <div
        style={{
          maxWidth: isMobile ? "100%" : 820,
          marginLeft: isMobile ? 0 : 312,
          marginRight: "auto",
          width: "100%",
        }}
      >
        <div id="how-might-we">
          <span style={{ display: "block", fontSize: isMobile ? 16 : 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{D.sectionLabel}</span>
          <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.35, margin: 0, maxWidth: 1000 }}>{D.headline}</h2>
          <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "48px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{renderBold(D.body)}</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start", gap: "16px 20px", maxWidth: 980, margin: isMobile ? "56px 0 0" : "80px 0 0" }}>
          <Term label={D.goal1} dotColor="#635D9B" />
          <Operator>+</Operator>
          <Term label={D.goal2} dotColor="#F8F9FA" />
          <Operator>+</Operator>
          <Term label={D.goal3} dotColor="#FFC627" />
          <Operator>=</Operator>
          <span style={{ display: "inline-flex", alignItems: "center", background: INK, borderRadius: 999, padding: "14px 28px", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: "clamp(15px, 1.6vw, 19px)", fontWeight: 600, color: BG, fontFamily: WORK_SANS }}>{D.result}</span>
          </span>
        </div>

        {content ? <div style={{ marginTop: 96 }}>{content}</div> : null}
      </div>
    </div>
  );
}