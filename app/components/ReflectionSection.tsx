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
  headline: "Outcome + Lessons Learned",
  intro:
    "The final video gave the Basic Needs Department an engaging way to reach students, shaped by stakeholders at every step. Two lessons stuck with me from this project.",
  lesson1Heading: "Communication is key",
  lesson1Body:
    "Clear communication carried this collaboration, and the visual kind mattered as much as the verbal. The shot lists and footage log gave my client a concrete picture of the video at every stage, so alignment never depended on imagination.",
  lesson2Heading: "Guide client feedback, don't reject it",
  lesson2Body:
    "Client feedback is a mixed bag of good and bad ideas, and handling it well is a design skill. My client wanted a QR code as the video's contact point, but QR codes fail in video since viewers rarely pause to scan. Instead of rejecting the idea, I redirected it: the department's email and phone number became the primary call to action, solving the real goal with a format that works.",
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

export default function ReflectionSection() {
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
    </div>
  );
}