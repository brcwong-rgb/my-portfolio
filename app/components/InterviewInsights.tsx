import React from "react";
import Image from "next/image";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const LINE = "#2a2a2a";
const CARD = "#1e1e1e";
const WORK_SANS = "var(--font-work-sans), sans-serif";

const INSIGHTS_IMG = "/treevah-insights.png";

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
  heading: "Interview Insights",
  body: "Users were concerned about **privacy** and letting AI handle their files, and frustrated by **navigating nested folder systems**. What they wanted most was to understand **file content quickly**.",
  quote: "I would use AI features if I had a few files that were similar and wanted to know which was what.",
  quoteSource: "Interview participant",
  captionText: "Below is an image of the organized interview insights",
};

export default function InterviewInsights() {
  return (
    <div id="interview-insights" style={{ width: "100%", background: BG, boxSizing: "border-box", paddingTop: 96 }}>
      <h3 style={{ fontSize: "clamp(22px, 2.2vw, 30px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.2, margin: 0 }}>{D.heading}</h3>

      <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "20px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{renderBold(D.body)}</p>

      <blockquote style={{ margin: "40px 0 0 0", padding: "8px 0 8px 24px", borderLeft: "2px solid " + LINE, maxWidth: 880 }}>
        <p style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 600, color: INK, letterSpacing: "-0.01em", lineHeight: 1.4, margin: 0 }}>“{D.quote}”</p>
        <span style={{ display: "block", fontSize: 15, fontWeight: 500, color: DIM, marginTop: 12, fontFamily: WORK_SANS }}>— {D.quoteSource}</span>
      </blockquote>

      <p style={{ fontSize: 19, fontWeight: 400, color: DIM, lineHeight: 1.65, margin: "40px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{D.captionText}</p>

      <div style={{ marginTop: 24, maxWidth: 960, borderRadius: 4, border: "0.5px solid " + LINE, overflow: "hidden", background: CARD }}>
        <Image src={INSIGHTS_IMG} alt="Organized interview insights" width={1600} height={1000} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </div>
  );
}