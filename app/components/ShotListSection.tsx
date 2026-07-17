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
const RED = "#E14B32";

const LABEL_SIZE = "clamp(8.5px, 0.95vw, 11.5px)";
const NOTE_SIZE = "clamp(8px, 0.85vw, 10.5px)";
const TICK_SIZE = "clamp(9px, 0.95vw, 12px)";

type Seg = { labels: string[]; color: string; note?: string; dark?: boolean };

const OPTION_1: Seg[] = [
  { labels: ["Intro"], color: YELLOW },
  { labels: ["“What is Basic Needs?”"], color: YELLOW },
  { labels: ["What we do"], color: YELLOW },
  { labels: ["Food & Hygiene"], color: GREEN },
  { labels: ["Mental Health"], color: GREEN },
  { labels: ["Transport"], color: GREEN },
  { labels: ["Child Care"], color: GREEN },
  { labels: ["Financial Assistance"], color: GREEN, note: "Limitation: aid follows a process, not instant funds" },
  { labels: ["Legal Help"], color: GREEN },
  { labels: ["Housing"], color: GREEN, note: "Limitation: we help find housing, not place you in it" },
  { labels: ["CTA: support form"], color: PURPLE },
  { labels: ["Conclusion"], color: PURPLE },
];

const OPTION_2: Seg[] = [
  { labels: ["Intro"], color: YELLOW },
  { labels: ["“What is Basic Needs?”"], color: YELLOW },
  { labels: ["What we do"], color: YELLOW },
  { labels: ["Jaguar Market"], color: GREEN, note: "Limitation: one item per shopper, not per household" },
  { labels: ["Second Harvest"], color: GREEN, note: "Limitation: only what's available" },
  { labels: ["Grocery Rescue"], color: GREEN },
  { labels: ["Basic Needs Center"], color: BLUE, dark: true, note: "Limitation: eligibility not guaranteed" },
  { labels: ["Housing", "Transport"], color: LIGHTBLUE, note: "Limitation: we connect, we don't house" },
  { labels: ["Legal Help", "Child Care"], color: LIGHTBLUE },
  { labels: ["Mental Health", "Financial Aid"], color: LIGHTBLUE },
  { labels: ["CTA: support form"], color: PURPLE },
  { labels: ["Conclusion"], color: PURPLE },
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

function Timeline({ title, segments, tag }: { title: string; segments: Seg[]; tag?: string }) {
  return (
    <div style={{ background: CARD, border: "0.5px solid " + LINE, borderRadius: 4, padding: "28px 24px 20px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: INK }}>{title}</span>
        {tag ? <span style={{ fontSize: 11, fontWeight: 600, color: DIM, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: WORK_SANS }}>{tag}</span> : null}
      </div>

      <div style={{ display: "flex", gap: "clamp(3px, 0.5vw, 6px)", alignItems: "flex-end", width: "100%" }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            {seg.note ? (
              <>
                <div style={{ background: RED, borderRadius: 4, padding: "6px 4px", fontSize: NOTE_SIZE, fontWeight: 500, color: "#FFF", lineHeight: 1.35, fontFamily: WORK_SANS, textAlign: "center" }}>{seg.note}</div>
                <div style={{ width: 1, height: 16, background: RED, margin: "0 auto" }} />
              </>
            ) : null}

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
  heading: "Shot List",
  body: "Before any filming, I mapped the video second by second in two different shot lists. Giving the client real options this early served two purposes. It let them see the structure of the video while changes were still cheap, and their reactions to each version taught me what they actually cared about.",
  decision:
    "The client chose **Option 2**, which grouped the resources more clearly and felt more dynamic to them.",
};

export default function ShotListSection() {
  const paragraphStyle: React.CSSProperties = {
    fontSize: 19,
    fontWeight: 400,
    color: "#D4D4D4",
    lineHeight: 1.65,
    maxWidth: 960,
    fontFamily: WORK_SANS,
  };

  return (
    <div id="shot-list" style={{ width: "100%", background: BG, boxSizing: "border-box", paddingTop: 96 }}>
      <h3 style={{ fontSize: "clamp(22px, 2.2vw, 30px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.2, margin: 0 }}>{D.heading}</h3>

      <p style={{ ...paragraphStyle, margin: "20px 0 0 0" }}>{renderBold(D.body)}</p>
      <p style={{ ...paragraphStyle, margin: "16px 0 0 0" }}>{renderBold(D.decision)}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 48 }}>
        <Timeline title="Option 1" segments={OPTION_1} />
        <Timeline title="Option 2" segments={OPTION_2} tag="Selected" />
      </div>
    </div>
  );
}