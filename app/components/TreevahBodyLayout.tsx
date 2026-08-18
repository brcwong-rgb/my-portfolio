"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const LINE = "#2a2a2a";
const CARD = "#1e1e1e";
const ACCENT = "#FAFAFA"; // was orange — now white
const WORK_SANS = "var(--font-work-sans), sans-serif";

const NAV_TOP = 120;
const SPY_LINE = 200;

const INSPIRATION_IMG = "/treevah-inspiration.png";

// full original sub-items restored
const TOC = [
  {
    group: "Research",
    id: "research",
    items: [
      { label: "Research Overview", id: "research-overview" },
      { label: "Interview Insights", id: "interview-insights" },
    ],
  },
  { group: "Define", id: "define", items: [{ label: "Problem Statement", id: "the-problem" }] },
  { group: "Iteration", id: "iteration", items: [{ label: "User Flow", id: "user-flow" }] },
  {
    group: "Final Design",
    id: "final-design",
    items: [
      { label: "Comparing File Content", id: "comparing-file-content" },
      { label: "Quick File Glance", id: "quick-file-glance" },
      { label: "Folder Recommendation", id: "folder-recommendation" },
    ],
  },
  {
    group: "Design Highlights",
    id: "design-highlights",
    items: [
      { label: "Transparency and Control", id: "transparency-and-control" },
      { label: "Feature Segmentation", id: "feature-segmentation" },
      { label: "Why Icons?", id: "why-icons" },
    ],
  },
  { group: "Reflection", id: "reflection", items: [] },
];

function getAllById(id: string): Element[] {
  return Array.from(document.querySelectorAll('[id="' + id + '"]'));
}

function renderBold(text: string) {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ fontWeight: 600, color: INK }}>
        {part}
      </strong>
    ) : (
      part
    )
  );
}

const D = {
  sectionLabel: "RESEARCH",
  headline: "Research Overview",
  body: "I kicked off a 1-week research sprint with the researcher on our team to define what users need for a better folder management experience.",
  bullet1: "Interviewed **6 users** virtually about managing their files with AI",
  bullet2: "Analyzed **Treevah's file management system** alongside Google Drive",
  bullet3: "Outlined **CEO needs** to align on project goals",
  captionText: "Below is the CEO's inspiration photo",
};

export default function TreevahBodyLayout({
  content,
}: {
  content?: React.ReactNode;
}) {
  const bullets = [D.bullet1, D.bullet2, D.bullet3].filter(Boolean);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const check = () => {
      let g = "";
      for (const section of TOC) {
        const els = getAllById(section.id);
        for (const el of els) {
          if (el.getBoundingClientRect().top - SPY_LINE <= 0) g = section.id;
        }
      }
      setActiveGroup(g);

      let a = "";
      for (const section of TOC) {
        for (const item of section.items) {
          const els = getAllById(item.id);
          for (const el of els) {
            if (el.getBoundingClientRect().top - SPY_LINE <= 0) a = item.id;
          }
        }
      }
      setActiveId(a);

      const gi = TOC.findIndex((t) => t.id === g);
      let prog = 0;
      if (gi !== -1) {
        const curEls = getAllById(TOC[gi].id);
        const nextEls = gi + 1 < TOC.length ? getAllById(TOC[gi + 1].id) : [];
        const cur = curEls[curEls.length - 1];
        const next = nextEls[nextEls.length - 1];
        if (cur && next) {
          const aTop = cur.getBoundingClientRect().top;
          const bTop = next.getBoundingClientRect().top;
          if (bTop > aTop) prog = Math.max(0, Math.min(1, (SPY_LINE - aTop) / (bTop - aTop)));
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
    const els = getAllById(id);
    if (els.length > 0) els[els.length - 1].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="research"
      ref={containerRef}
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: isMobile ? "64px 20px" : "96px 48px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "240px minmax(0, 1fr)",
        gap: isMobile ? 0 : 64,
        alignItems: "start",
        maxWidth: 1300,
        margin: "0 auto",
      }}
    >
      {/* LEFT GUTTER — sticky nav lives HERE, in its own column (no overlap) */}
      {!isMobile && (
        <div style={{ position: "sticky", top: NAV_TOP, alignSelf: "start" }}>
          <nav
            style={{
              boxSizing: "border-box",
              padding: "22px 22px",
              borderRadius: 16,
              border: `0.5px solid ${LINE}`,
              background: "rgba(24,24,24,0.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              fontFamily: WORK_SANS,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {TOC.map((section) => {
                const groupActive = activeGroup === section.id;
                const hasSubs = section.items.length > 0;
                const fill = groupActive ? progress : 0;
                return (
                  <div key={section.group}>
                    <span
                      onClick={() => scrollTo(section.id)}
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: groupActive ? ACCENT : DIM,
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
                        maxHeight: groupActive ? 260 : 0,
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
                            <span style={{ position: "absolute", left: 0, top: 14, bottom: 0, width: 1, background: LINE }} />
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
                        {section.items.map((item) => {
                          const itemActive = activeId === item.id;
                          return (
                            <span
                              key={item.id}
                              onClick={() => scrollTo(item.id)}
                              style={{
                                fontSize: 12,
                                fontWeight: 500,
                                color: itemActive ? INK : DIM,
                                letterSpacing: "0.02em",
                                cursor: "pointer",
                                transition: "color 0.3s ease",
                              }}
                            >
                              {item.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* RIGHT — content */}
      <div style={{ width: "100%", minWidth: 0 }}>
        <div id="research-overview">
          <span
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: DIM,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: WORK_SANS,
              marginBottom: 20,
            }}
          >
            {D.sectionLabel}
          </span>

          <h2
            style={{
              fontSize: "clamp(24px, 2.4vw, 36px)",
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.01em",
              lineHeight: 1.35,
              margin: 0,
              maxWidth: 720,
              fontFamily: WORK_SANS,
            }}
          >
            {D.headline}
          </h2>

          <p
            style={{
              fontSize: isMobile ? 17 : 18,
              fontWeight: 400,
              color: "#D4D4D4",
              lineHeight: 1.65,
              margin: "28px 0 0 0",
              maxWidth: 640,
              fontFamily: WORK_SANS,
            }}
          >
            {renderBold(D.body)}
          </p>

          <ul style={{ margin: "24px 0 0 0", padding: "0 0 0 22px", display: "flex", flexDirection: "column", gap: 10 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ fontSize: 17, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.55, fontFamily: WORK_SANS, maxWidth: 640 }}>
                {renderBold(b)}
              </li>
            ))}
          </ul>

          <p style={{ fontSize: 16, fontWeight: 400, color: DIM, lineHeight: 1.65, margin: "32px 0 0 0", maxWidth: 640, fontFamily: WORK_SANS }}>
            {D.captionText}
          </p>

          <div style={{ margin: "24px auto 0", maxWidth: 720, borderRadius: 8, border: `0.5px solid ${LINE}`, overflow: "hidden", background: CARD }}>
            <Image src={INSPIRATION_IMG} alt="CEO's inspiration photo" width={1600} height={1000} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>

        {content ? <div style={{ marginTop: 96 }}>{content}</div> : null}
      </div>
    </div>
  );
}