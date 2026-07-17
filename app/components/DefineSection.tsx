import React from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "var(--font-work-sans), sans-serif";

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
  sectionLabel: "DEFINE",
  headline: "The Problem: frustrating file and folder analysis",
  body: "The research pointed to one core issue. There was no efficient way to understand complex files. Each problem became a How Might We objective that guided the design work.",
  p1Title: "Complex files",
  p1Body: "Users struggled to understand what their files actually contained.",
  hmw1: "HMW assist users in analyzing complex files and reduce the time spent on this task?",
  p2Title: "Disorganized content",
  p2Body: "Messy nested folders made content hard to locate and manage.",
  hmw2: "HMW improve file and folder organization for better efficiency?",
  p3Title: "File privacy",
  p3Body: "Users didn't trust AI to analyze their files.",
  hmw3: "HMW build user trust and encourage adoption of AI tools?",
};

function ProblemToHMW({ index, title, body, hmw }: { index: string; title: string; body: string; hmw: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ background: CARD, border: "0.5px solid " + LINE, borderRadius: 4, padding: "clamp(24px, 2.5vw, 36px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: DIM, letterSpacing: "0.08em", fontFamily: WORK_SANS }}>({index})</span>
        <h4 style={{ fontSize: "clamp(19px, 1.8vw, 24px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.15, margin: 0 }}>{title}</h4>
        <p style={{ fontSize: 16, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.55, margin: 0, fontFamily: WORK_SANS }}>{body}</p>
      </div>

      <div style={{ width: 1, height: 32, background: "#404040", margin: "0 auto" }} />

      <div style={{ borderLeft: "2px solid " + ACCENT, padding: "4px 0 4px 16px" }}>
        <p style={{ fontSize: "clamp(16px, 1.5vw, 19px)", fontWeight: 600, color: INK, letterSpacing: "-0.01em", lineHeight: 1.45, margin: 0 }}>{hmw}</p>
      </div>
    </div>
  );
}

export default function DefineSection() {
  return (
    <div id="define" style={{ width: "100%", background: BG, boxSizing: "border-box", paddingTop: 96 }}>
      <div id="the-problem">
        <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{D.sectionLabel}</span>
        <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.35, margin: 0, maxWidth: 1000 }}>{D.headline}</h2>
        <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "48px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{renderBold(D.body)}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32, marginTop: 48, alignItems: "stretch" }}>
          <ProblemToHMW index="01" title={D.p1Title} body={D.p1Body} hmw={D.hmw1} />
          <ProblemToHMW index="02" title={D.p2Title} body={D.p2Body} hmw={D.hmw2} />
          <ProblemToHMW index="03" title={D.p3Title} body={D.p3Body} hmw={D.hmw3} />
        </div>
      </div>
    </div>
  );
}