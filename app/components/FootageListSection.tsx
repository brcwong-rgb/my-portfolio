import React from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const WORK_SANS = "var(--font-work-sans), sans-serif";

const YELLOW = "#F7CE55";
const GREEN = "#B9E6C9";
const BLUE = "#4A90E2";
const LIGHTBLUE = "#BDE3F8";
const PURPLE = "#D9C7F5";

const LABEL_SIZE = "clamp(8.5px, 0.95vw, 11.5px)";
const TICK_SIZE = "clamp(9px, 0.95vw, 12px)";

type Seg = { labels: string[]; color: string; dark?: boolean };

const FOOTAGE: Seg[] = [
  { labels: ["Intro Graphics"], color: YELLOW },
  { labels: ["What is Basic Needs"], color: YELLOW },
  { labels: ["Breakdown of resources"], color: YELLOW },
  { labels: ["Jaguar Market footage"], color: GREEN },
  { labels: ["Food drive-thru footage"], color: GREEN },
  { labels: ["Grocery Rescue footage"], color: GREEN },
  { labels: ["Student Success & Retention Center"], color: BLUE, dark: true },
  { labels: ["Housing", "Transportation"], color: LIGHTBLUE },
  { labels: ["Legal Help", "Child Care"], color: LIGHTBLUE },
  { labels: ["Mental Health", "Financial Assistance"], color: LIGHTBLUE },
  { labels: ["Contact info animation"], color: PURPLE },
  { labels: ["Outro"], color: PURPLE },
];

const TICKS = ["0", "10", "20", "30", "40", "50", "60s"];

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

function Timeline({ segments }: { segments: Seg[] }) {
  return (
    <div style={{ background: CARD, border: "0.5px solid " + LINE, borderRadius: 4, padding: "28px 24px 20px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", gap: "clamp(3px, 0.5vw, 6px)", alignItems: "flex-end", width: "100%" }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {seg.labels.map((label, j) => (
                <div key={j} style={{ background: seg.color, borderRadius: 4, padding: "4px 3px", fontSize: LABEL_SIZE, fontWeight: 500, color: seg.dark ? "#FFF" : "#1A1A1A", lineHeight: 1.3, fontFamily: WORK_SANS, height: seg.labels.length > 1 ? "clamp(34px, 3.8vw, 44px)" : "clamp(72px, 8vw, 92px)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden" }}>{label}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 2, background: "#404040", margin: "14px 0 8px" }} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {TICKS.map((t) => (
          <span key={t} style={{ fontSize: TICK_SIZE, fontWeight: 500, color: DIM, fontFamily: WORK_SANS }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

const D = {
  sectionLabel: "PRODUCTION",
  headline: "Turning the plan into footage",
  subheading: "Footage List",
  body: "Once filming started, I logged every clip in a footage list. One place to see what was filmed and where it fit on the timeline, which kept the edit organized and made gaps easy to spot before they became problems.",
};

export default function FootageListSection() {
  return (
    <div id="production" style={{ width: "100%", background: BG, boxSizing: "border-box", paddingTop: 96 }}>
      <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{D.sectionLabel}</span>
      <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.35, margin: 0, maxWidth: 1000 }}>{D.headline}</h2>

      <div id="footage-list" style={{ marginTop: 72 }}>
        <h3 style={{ fontSize: "clamp(22px, 2.2vw, 30px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.2, margin: 0 }}>{D.subheading}</h3>
        <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "20px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{renderBold(D.body)}</p>
        <div style={{ marginTop: 48 }}>
          <Timeline segments={FOOTAGE} />
        </div>
      </div>
    </div>
  );
}