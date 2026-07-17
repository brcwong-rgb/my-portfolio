import React from "react";
import Image from "next/image";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "var(--font-work-sans), sans-serif";

const FLOW_IMG = "/treevah-userflow.png";

type Step = { label: string; ai: boolean };

const FIRST_TIME: Step[] = [
  { label: "Sign Up", ai: false },
  { label: "Upload Files", ai: false },
  { label: "Sort Files", ai: false },
  { label: "Folder Recommendations", ai: true },
  { label: "Organized Files into Folders", ai: false },
];

const RETURN: Step[] = [
  { label: "Log In", ai: false },
  { label: "Select Folders", ai: false },
  { label: "Quick File Glance", ai: true },
  { label: "Locate Files", ai: false },
  { label: "Analyze Files", ai: false },
  { label: "Comparing File Content", ai: true },
];

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

function Chip({ label, ai }: { label: string; ai: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: CARD, border: "0.5px solid " + (ai ? ACCENT : LINE), borderRadius: 999, padding: "10px 18px", fontSize: "clamp(13px, 1.3vw, 15px)", fontWeight: 500, color: ai ? ACCENT : INK, fontFamily: WORK_SANS, whiteSpace: "nowrap" }}>
      {ai ? <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} /> : null}
      {label}
    </span>
  );
}

function Arrow() {
  return <span style={{ color: DIM, fontSize: 16, flexShrink: 0, userSelect: "none" }}>→</span>;
}

function Flow({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <div>
      <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: DIM, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{title}</span>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 10px" }}>
        {steps.map((step, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <Chip label={step.label} ai={step.ai} />
            {i < steps.length - 1 ? <Arrow /> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

const D = {
  sectionLabel: "ITERATION",
  headline: "User Flow",
  body: "I mapped the typical user flow for Treevah's file management system, covering both a first-time user and a returning user. **AI features** are highlighted in green.",
  firstTimeTitle: "First-time user",
  returnTitle: "Returning user",
  captionText: "Below is the full user flow diagram",
};

export default function IterationSection() {
  return (
    <div id="iteration" style={{ width: "100%", background: BG, boxSizing: "border-box", paddingTop: 96 }}>
      <div id="user-flow">
        <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{D.sectionLabel}</span>
        <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.35, margin: 0, maxWidth: 1000 }}>{D.headline}</h2>
        <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "48px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{renderBold(D.body)}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 48, marginTop: 48 }}>
          <Flow title={D.firstTimeTitle} steps={FIRST_TIME} />
          <Flow title={D.returnTitle} steps={RETURN} />
        </div>

        <p style={{ fontSize: 19, fontWeight: 400, color: DIM, lineHeight: 1.65, margin: "56px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{D.captionText}</p>

        <div style={{ marginTop: 24, maxWidth: 960, borderRadius: 4, border: "0.5px solid " + LINE, overflow: "hidden", background: CARD }}>
          <Image src={FLOW_IMG} alt="Full user flow diagram" width={1600} height={1000} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </div>
  );
}