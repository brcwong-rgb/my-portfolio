import React from "react";

const INK = "#FAFAFA";
const BG = "#121212";
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
  sectionLabel: "REFLECTION",
  headline: "Lessons Learned",
  intro: "Wrapping up Treevah, three lessons stuck with me.",
  lesson1Heading: "Understand your users first",
  lesson1Body: "A strong solution starts with truly understanding who you're designing for, then tailoring the experience to their real needs rather than assumptions.",
  lesson2Heading: "Stay agile when plans shift",
  lesson2Body: "Things come up and plans change. I learned that change is the status quo, and the job is to respond quickly and adapt rather than cling to the original plan.",
  lesson3Heading: "Guide stakeholders with research",
  lesson3Body: "Stakeholders don't always know exactly what they want. Research insights become the tool that directs them toward a solution grounded in evidence.",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: 19,
  fontWeight: 400,
  color: "#D4D4D4",
  lineHeight: 1.65,
  maxWidth: 960,
  fontFamily: WORK_SANS,
};

const lessonHeadingStyle: React.CSSProperties = {
  fontSize: "clamp(22px, 2.2vw, 30px)",
  fontWeight: 700,
  color: INK,
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
  margin: 0,
};

export default function TreevahReflection() {
  return (
    <div id="reflection" style={{ width: "100%", background: BG, boxSizing: "border-box", padding: "96px 0 0" }}>
      <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{D.sectionLabel}</span>
      <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.35, margin: 0, maxWidth: 1000 }}>{D.headline}</h2>
      <p style={{ ...paragraphStyle, margin: "20px 0 0 0" }}>{renderBold(D.intro)}</p>

      <div style={{ marginTop: 72 }}>
        <h3 style={lessonHeadingStyle}>{D.lesson1Heading}</h3>
        <p style={{ ...paragraphStyle, margin: "20px 0 0 0" }}>{renderBold(D.lesson1Body)}</p>
      </div>

      <div style={{ marginTop: 56 }}>
        <h3 style={lessonHeadingStyle}>{D.lesson2Heading}</h3>
        <p style={{ ...paragraphStyle, margin: "20px 0 0 0" }}>{renderBold(D.lesson2Body)}</p>
      </div>

      <div style={{ marginTop: 56 }}>
        <h3 style={lessonHeadingStyle}>{D.lesson3Heading}</h3>
        <p style={{ ...paragraphStyle, margin: "20px 0 0 0" }}>{renderBold(D.lesson3Body)}</p>
      </div>
    </div>
  );
}