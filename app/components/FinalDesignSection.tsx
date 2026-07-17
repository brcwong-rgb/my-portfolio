import React from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
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

type Feature = { id: string; title: string; body: string; gif: string; alt: string };

const FEATURES: Feature[] = [
  {
    id: "comparing-file-content",
    title: "Comparing File Content",
    body: "This is the file comparison feature, which enables users to select and compare the content of multiple files. AI analyzes the selected files and provides a summary of how the files compare in two separate columns.",
    gif: "/treevah-comparison.gif",
    alt: "Comparing file content feature demo",
  },
  {
    id: "quick-file-glance",
    title: "Quick File Glance",
    body: "This is the Quick File Glance feature, which provides a short AI-generated summary of each file's content, so users can understand what a file contains at a glance without opening it.",
    gif: "/treevah-glance.gif",
    alt: "Quick File Glance feature demo",
  },
  {
    id: "folder-recommendation",
    title: "Folder Recommendations",
    body: "This is the Folder Recommendations feature, which organizes uploaded files into folders based on their file content, so users can keep their file system structured without sorting everything manually.",
    gif: "/treevah-folders.gif",
    alt: "Folder Recommendations feature demo",
  },
];

const SECTION_LABEL = "FINAL DESIGN";

function FeatureBlock({ feature }: { feature: Feature }) {
  return (
    <div id={feature.id}>
      <h3 style={{ fontSize: "clamp(24px, 2.6vw, 38px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>{feature.title}</h3>
      <p style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.65, margin: "20px 0 0 0", maxWidth: 960, fontFamily: WORK_SANS }}>{renderBold(feature.body)}</p>
      <div style={{ marginTop: 32, width: "100%", borderRadius: 4, border: "0.5px solid " + LINE, overflow: "hidden", background: CARD }}>
        <img src={feature.gif} alt={feature.alt} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </div>
  );
}

export default function FinalDesignSection() {
  return (
    <div id="final-design" style={{ width: "100%", background: BG, boxSizing: "border-box", paddingTop: 96 }}>
      <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 48 }}>{SECTION_LABEL}</span>

      <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
        {FEATURES.map((f) => (
          <FeatureBlock key={f.id} feature={f} />
        ))}
      </div>
    </div>
  );
}