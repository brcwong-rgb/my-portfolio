"use client";

import React, { useState, useEffect, useRef } from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "var(--font-work-sans), sans-serif";

const NAV_TOP = 120;
const SPY_LINE = 200;

const TOC = [
  {
    group: "Preproduction Planning",
    id: "preproduction",
    items: [
      { label: "How Might We...", id: "how-might-we" },
      { label: "Shot List", id: "shot-list" },
    ],
  },
  {
    group: "Production",
    id: "production",
    items: [
      { label: "Footage list", id: "footage-list" },
      { label: "Draft #1", id: "draft-1" },
      { label: "Client Feedback", id: "client-feedback" },
    ],
  },
  { group: "Final Design", id: "final-design", items: [] },
  { group: "Reflection", id: "reflection", items: [] },
];

const SPY_TARGETS: { id: string; group: string }[] = [];
TOC.forEach((section) => {
  SPY_TARGETS.push({ id: section.id, group: section.id });
  section.items.forEach((item) => {
    SPY_TARGETS.push({ id: item.id, group: section.id });
  });
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
      for (const target of SPY_TARGETS) {
        const els = getAllById(target.id);
        for (const el of els) {
          if (el.getBoundingClientRect().top - SPY_LINE <= 0) {
            currentId = target.id;
            currentGroup = target.group;
            break;
          }
        }
      }

      // If we're at (or near) the bottom of the page, force-select the last
      // target — short final sections can't reach the reading line.
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
      id="preproduction"
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
        <div id="how-might-we">
          <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{D.sectionLabel}</span>
          <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.35, margin: 0, maxWidth: 1000 }}>{D.headline}</h2>
          <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "48px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{renderBold(D.body)}</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px 20px", maxWidth: 980, margin: "80px auto 0" }}>
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