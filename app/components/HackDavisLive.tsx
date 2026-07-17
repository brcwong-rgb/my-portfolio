"use client";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

type Photo = {
  src: string; // file in /public
  caption: string;
  span: number; // grid columns out of 6
};

const CONTENT = {
  sectionLabel: "LIVE AT HACKDAVIS",
  headline: "Stress testing with 50+ judges",
  body: "The app ran live at HackDavis 2026. Over 50 judges used it on their phones, walking the venue and scoring 100+ projects in real time.",
  photos: [
    {
      src: "/hackdavis-live-venue.jpeg",
      caption: "The venue during judging",
      span: 4,
    },
    {
      src: "/hackdavis-live-grading.jpeg",
      caption: "A judge grading a project",
      span: 2,
    },
    {
      src: "/hackdavis-live-home.jpeg",
      caption: "Home page directing the judge to their next project",
      span: 2,
    },
    {
      src: "/hackdavis-live-judge.jpeg",
      caption: "A judge reviewing their queue",
      span: 2,
    },
    {
      src: "/hackdavis-live-judging.jpeg",
      caption: "A judge scoring a hacker's project",
      span: 2,
    },
  ] as Photo[],
};

function PhotoFrame({ src, caption, span }: Photo) {
  return (
    <figure
      style={{
        margin: 0,
        gridColumn: `span ${span}`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          background: CARD,
          border: `0.5px solid ${LINE}`,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <img
          src={src}
          alt={caption}
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: span >= 4 ? "16/9" : "4/5",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <figcaption
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: DIM,
          lineHeight: 1.5,
          fontFamily: WORK_SANS,
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

export default function HackDavisLive() {
  return (
    <div
      id="live"
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: "96px 48px 0",
        display: "grid",
        gridTemplateColumns: "280px minmax(0, 1fr)",
        gap: 48,
        alignItems: "start",
      }}
    >
      {/* gutter — mirrors the sticky nav column */}
      <div />

      <div style={{ width: "100%" }}>
        <span
          style={{
            display: "block",
            fontSize: 22,
            fontWeight: 400,
            color: INK,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: WORK_SANS,
            marginBottom: 16,
          }}
        >
          {CONTENT.sectionLabel}
        </span>

        <h2
          style={{
            fontSize: "clamp(24px, 2.4vw, 36px)",
            fontWeight: 700,
            color: INK,
            letterSpacing: "-0.01em",
            lineHeight: 1.35,
            margin: 0,
            maxWidth: 1000,
            fontFamily: MANROPE,
          }}
        >
          {CONTENT.headline}
        </h2>

        <p
          style={{
            fontSize: 19,
            fontWeight: 400,
            color: "#D4D4D4",
            lineHeight: 1.65,
            margin: "48px 0 0 0",
            maxWidth: 960,
            fontFamily: WORK_SANS,
          }}
        >
          {CONTENT.body}
        </p>

        {/* photo grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 24,
            marginTop: 56,
          }}
        >
          {CONTENT.photos.map((p) => (
            <PhotoFrame key={p.src} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}