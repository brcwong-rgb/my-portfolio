"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const LINE = "#2a2a2a";
const CARD = "#1e1e1e";
const ACCENT = "#DF8000";
const WORK_SANS = "var(--font-work-sans), sans-serif";

const NAV_TOP = 120;
const SPY_LINE = 200;

const INSPIRATION_IMG = "/treevah-inspiration.png";

const TOC = [
  {
    group: "Research",
    id: "research",
    items: [
      { label: "Research Overview", id: "research-overview" },
      { label: "Interview Insights", id: "interview-insights" },
    ],
  },
  {
    group: "Define",
    id: "define",
    items: [{ label: "Problem Statement", id: "the-problem" }],
  },
  {
    group: "Iteration",
    id: "iteration",
    items: [{ label: "User Flow", id: "user-flow" }],
  },
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

const SPY_TARGETS: { id: string; group: string }[] = [];
TOC.forEach((section) => {
  if (section.items.length === 0) {
    SPY_TARGETS.push({ id: section.id, group: section.id });
  } else {
    section.items.forEach((item) => {
      SPY_TARGETS.push({ id: item.id, group: section.id });
    });
  }
});

function getAllById(id: string): Element[] {
  return Array.from(document.querySelectorAll('[id="' + id + '"]'));
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
  const [navVisible, setNavVisible] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [activeGroup, setActiveGroup] = useState("");

  useEffect(() => {
    const check = () => {
      const start = containerRef.current;
      if (!start) return;

      const startTop = start.getBoundingClientRect().top;
      setNavVisible(startTop - NAV_TOP - 20 <= 0);

      let currentId = "";
      let currentGroup = "";
      let closestDist = Infinity;
      for (const target of SPY_TARGETS) {
        const els = getAllById(target.id);
        for (const el of els) {
          const top = el.getBoundingClientRect().top;
          if (top - SPY_LINE <= 0) {
            const dist = Math.abs(top - SPY_LINE);
            if (dist < closestDist) {
              closestDist = dist;
              currentId = target.id;
              currentGroup = target.group;
            }
          }
        }
      }

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (scrolledToBottom) {
        const last = SPY_TARGETS[SPY_TARGETS.length - 1];
        currentId = last.id;
        currentGroup = last.group;
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
    const els = getAllById(id);
    if (els.length > 0) {
      els[els.length - 1].scrollIntoView({ behavior: "smooth" });
    }
  };

  let lineIndex = 0;
  const lineStyle = (): React.CSSProperties => {
    const delay = lineIndex * 0.08;
    lineIndex += 1;
    return { animation: "tocLineIn 0.5s cubic-bezier(0.16,1,0.3,1) " + delay + "s both" };
  };

  return (
    <div
      id="research"
      ref={containerRef}
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: "96px 48px",
        display: "grid",
        gridTemplateColumns: "280px minmax(0, 1fr)",
        gap: 48,
        alignItems: "start",
      }}
    >
      <style>{`@keyframes tocLineIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0px); } }`}</style>

      {navVisible ? (
        <nav style={{ position: "fixed", top: NAV_TOP, left: 48, width: 280, display: "flex", flexDirection: "column", gap: 32, fontFamily: WORK_SANS, zIndex: 90 }}>
          {TOC.map((section) => {
            const groupActive = activeGroup === section.id;
            return (
              <div key={section.group}>
                <span onClick={() => scrollTo(section.id)} style={{ display: "block", fontSize: 13, fontWeight: 600, color: groupActive ? ACCENT : INK, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: section.items.length > 0 ? 12 : 0, cursor: "pointer", transition: "color 0.25s ease", ...lineStyle() }}>{section.group}</span>
                {section.items.map((item) => {
                  const itemActive = activeId === item.id;
                  return (
                    <span key={item.id} onClick={() => scrollTo(item.id)} style={{ display: "block", fontSize: 15, fontWeight: itemActive ? 500 : 400, color: itemActive ? ACCENT : DIM, lineHeight: 1.9, cursor: "pointer", transition: "color 0.25s ease", ...lineStyle() }}>{item.label}</span>
                  );
                })}
              </div>
            );
          })}
        </nav>
      ) : null}

      <div />

      <div style={{ width: "100%" }}>
        <div id="research-overview">
          <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{D.sectionLabel}</span>
          <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.35, margin: 0, maxWidth: 1000 }}>{D.headline}</h2>
          <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "48px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{renderBold(D.body)}</p>

          <ul style={{ margin: "20px 0 0 0", padding: "0 0 0 22px", display: "flex", flexDirection: "column", gap: 10 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.5, fontFamily: WORK_SANS, maxWidth: 940 }}>{renderBold(b)}</li>
            ))}
          </ul>

          <p style={{ fontSize: 19, fontWeight: 400, color: DIM, lineHeight: 1.65, margin: "32px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{D.captionText}</p>

          <div style={{ marginTop: 24, maxWidth: 960, borderRadius: 4, border: "0.5px solid " + LINE, overflow: "hidden", background: CARD }}>
            <Image src={INSPIRATION_IMG} alt="CEO's inspiration photo" width={1600} height={1000} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>

        {content ? <div style={{ marginTop: 96 }}>{content}</div> : null}
      </div>
    </div>
  );
}