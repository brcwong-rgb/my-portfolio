import React from "react";

const INK = "#FAFAFA";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
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

type Highlight = { id: string; title: string; body: string; img: string; alt: string };

const HIGHLIGHTS: Highlight[] = [
  {
    id: "transparency-and-control",
    title: "Transparency and Control",
    body: "There was a lot of distrust around AI handling personal files, and users didn't feel in **control**. I designed for **transparency** by letting users choose exactly which files AI would analyze, and made the AI features **opt-in** so adoption always started with user consent. Clearly defining when and how AI would be used built another layer of **trust**.",
    img: "/treevah-transparency.png",
    alt: "Transparency and control design highlight",
  },
  {
    id: "feature-segmentation",
    title: "Feature Segmentation",
    body: "Treevah AI is a **premium feature**, so from a business perspective it needed a clear visual separation from the standard tools, plus a strong CTA to drive adoption. I used **color**, **labeling**, and distinct UI components to set the premium features apart and guide users toward them.",
    img: "/treevah-segmentation.png",
    alt: "Feature segmentation design highlight",
  },
  {
    id: "why-icons",
    title: "Why Icons?",
    body: "Humans are inherently **visual beings**. I used a sparkle icon to signal AI features throughout the product, which reinforced Treevah's branding while making the AI functionality easy to recognize at a glance.",
    img: "/treevah-icons.png",
    alt: "Why icons design highlight",
  },
];

const SECTION_LABEL = "DESIGN HIGHLIGHTS";

function HighlightRow({ highlight }: { highlight: Highlight }) {
  return (
    <div id={highlight.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
      <div>
        <h3 style={{ fontSize: "clamp(24px, 2.6vw, 38px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>{highlight.title}</h3>
        <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "20px 0 0 0", maxWidth: 560, fontFamily: WORK_SANS }}>{renderBold(highlight.body)}</p>
      </div>
      <div style={{ width: "100%", borderRadius: 4, border: "0.5px solid " + LINE, overflow: "hidden", background: CARD }}>
        <img src={highlight.img} alt={highlight.alt} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </div>
  );
}

export default function DesignHighlights() {
  return (
    <div id="design-highlights" style={{ width: "100%", background: BG, boxSizing: "border-box", paddingTop: 96 }}>
      <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 48 }}>{SECTION_LABEL}</span>

      <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
        {HIGHLIGHTS.map((h) => (
          <HighlightRow key={h.id} highlight={h} />
        ))}
      </div>
    </div>
  );
}