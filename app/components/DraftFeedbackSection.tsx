import React from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const WORK_SANS = "var(--font-work-sans), sans-serif";

function getYouTubeId(url: string): string {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : "";
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

function VideoEmbed({ url, title }: { url: string; title: string }) {
  const videoId = getYouTubeId(url);
  if (!videoId) return null;
  return (
    <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 4, border: "0.5px solid " + LINE, overflow: "hidden", background: CARD }}>
      <iframe
        src={"https://www.youtube.com/embed/" + videoId + "?rel=0"}
        title={title}
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

const D = {
  draftHeading: "Draft #1",
  draftBody:
    "An early rough cut gave the client something real to react to. We could point at the screen instead of talking in the abstract.",
  draftVideo: "https://youtu.be/K_IXXdx3Ftk",
  feedbackHeading: "Client Feedback",
  feedbackBody:
    "The review made the priorities clear, and part of my job was being honest about which requests would actually strengthen the video. Three revisions came out of it:",
  bullet1: "A more effective outro with a stronger call to action",
  bullet2: "Wording changes throughout the video",
  bullet3: "Swapping select content and clips for a better fit",
  finalLabel: "FINAL DESIGN",
  finalHeadline: "The finished promotional video",
  finalVideo: "https://youtu.be/2XZWUcL0Jo4",
};

const headingStyle: React.CSSProperties = {
  fontSize: "clamp(22px, 2.2vw, 30px)",
  fontWeight: 700,
  color: INK,
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
  margin: 0,
};

const paragraphStyle: React.CSSProperties = {
  fontSize: 19,
  fontWeight: 400,
  color: "#D4D4D4",
  lineHeight: 1.65,
  maxWidth: 960,
  fontFamily: WORK_SANS,
};

export default function DraftFeedbackSection() {
  const bullets = [D.bullet1, D.bullet2, D.bullet3].filter(Boolean);

  return (
    <div style={{ width: "100%", background: BG, boxSizing: "border-box", paddingTop: 96 }}>
      <div id="draft-1">
        <h3 style={headingStyle}>{D.draftHeading}</h3>
        <p style={{ ...paragraphStyle, margin: "20px 0 0 0" }}>{renderBold(D.draftBody)}</p>
        <div style={{ marginTop: 40 }}>
          <VideoEmbed url={D.draftVideo} title={D.draftHeading} />
        </div>
      </div>

      <div id="client-feedback" style={{ marginTop: 96 }}>
        <h3 style={headingStyle}>{D.feedbackHeading}</h3>
        <p style={{ ...paragraphStyle, margin: "20px 0 0 0" }}>{renderBold(D.feedbackBody)}</p>
        <ul style={{ margin: "20px 0 0 0", padding: "0 0 0 22px", display: "flex", flexDirection: "column", gap: 10 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 19, fontWeight: 400, color: "#D4D4D4", lineHeight: 1.5, fontFamily: WORK_SANS, maxWidth: 940 }}>{renderBold(b)}</li>
          ))}
        </ul>
      </div>

      <div id="final-design" style={{ marginTop: 120 }}>
        <span style={{ display: "block", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 16 }}>{D.finalLabel}</span>
        <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, color: INK, letterSpacing: "-0.01em", lineHeight: 1.35, margin: 0, maxWidth: 1000 }}>{D.finalHeadline}</h2>
        <div style={{ marginTop: 48 }}>
          <VideoEmbed url={D.finalVideo} title={D.finalHeadline} />
        </div>
      </div>
    </div>
  );
}