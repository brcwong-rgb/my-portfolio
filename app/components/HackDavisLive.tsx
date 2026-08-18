"use client";

import { useEffect, useState } from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const MOBILE_BREAKPOINT = 900;

type Photo = { src: string; label: string; area: string };

const CONTENT = {
  sectionLabel: "Live at HackDavis",
  headline: "Stress testing with 50+ judges",
  body: "The app ran live at HackDavis 2026. Over 50 judges used it on their phones, walking the venue and scoring 100+ projects.",
  photos: [
    { src: "/hackdavis-live-venue.jpeg", label: "The venue", area: "venue" },
    { src: "/hackdavis-live-grading.jpeg", label: "Grading a project", area: "grade" },
    { src: "/hackdavis-live-home.jpeg", label: "The app", area: "home" },
    { src: "/hackdavis-live-judge.jpeg", label: "Reviewing the queue", area: "queue" },
    { src: "/hackdavis-live-judging.jpeg", label: "Live judging", area: "score" },
  ] as Photo[],
};

function ExpandIcon() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        width: 30,
        height: 30,
        borderRadius: 8,
        background: "rgba(18,18,18,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 14, height: 14 }}
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    </span>
  );
}

function Cell({
  photo,
  index,
  isMobile,
  onOpen,
}: {
  photo: Photo;
  index: number;
  isMobile: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      aria-label={`View larger: ${photo.label}`}
      style={{
        margin: 0,
        padding: 0,
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        border: `0.5px solid ${LINE}`,
        background: CARD,
        gridArea: isMobile ? undefined : photo.area,
        width: "100%",
        aspectRatio: isMobile ? "3 / 2" : undefined,
        height: isMobile ? undefined : "100%",
        cursor: "pointer",
        display: "block",
        WebkitTapHighlightColor: "transparent",
        font: "inherit",
      }}
    >
      <img
        src={photo.src}
        alt={photo.label}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      <span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 45%)",
          pointerEvents: "none",
        }}
      />

      <ExpandIcon />

      <span
        style={{
          position: "absolute",
          left: 14,
          bottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: ACCENT,
            fontFamily: WORK_SANS,
            letterSpacing: "0.06em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: INK,
            fontFamily: WORK_SANS,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {photo.label}
        </span>
      </span>
    </button>
  );
}

function Lightbox({
  photo,
  onClose,
}: {
  photo: Photo;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.label}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        boxSizing: "border-box",
        animation: "lbFade 0.25s ease",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 44,
          height: 44,
          borderRadius: 999,
          border: `0.5px solid ${LINE}`,
          background: "rgba(30,30,30,0.8)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={INK}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 18, height: 18 }}
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          maxWidth: "92vw",
        }}
      >
        <img
          src={photo.src}
          alt={photo.label}
          style={{
            maxWidth: "92vw",
            maxHeight: "82vh",
            objectFit: "contain",
            borderRadius: 8,
            display: "block",
          }}
        />
        <figcaption
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: DIM,
            fontFamily: WORK_SANS,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {photo.label}
        </figcaption>
      </figure>

      <style>{`@keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

export default function HackDavisLive() {
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // close on Escape + lock body scroll while open
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  const gridStyle: React.CSSProperties = isMobile
    ? {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        marginTop: 40,
      }
    : {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "clamp(150px, 16vw, 220px)",
        gridTemplateAreas: `
          "venue venue venue grade"
          "venue venue venue grade"
          "home queue score score"
        `,
        gap: 16,
        marginTop: 56,
      };

  return (
    <div
      id="live"
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: isMobile ? "64px 20px 0" : "96px 48px 0",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "280px minmax(0, 1fr)",
        gap: isMobile ? 0 : 48,
        alignItems: "start",
      }}
    >
      {!isMobile && <div />}

      <div style={{ width: "100%" }}>
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: DIM,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: WORK_SANS,
            marginBottom: 20,
          }}
        >
          {CONTENT.sectionLabel}
        </span>

        <h2
          style={{
            fontSize: "clamp(26px, 2.2vw, 32px)",
            fontWeight: 600,
            color: INK,
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            margin: 0,
            maxWidth: 720,
            fontFamily: MANROPE,
          }}
        >
          {CONTENT.headline}
        </h2>

        <p
          style={{
            fontSize: isMobile ? 17 : 18,
            fontWeight: 400,
            color: "#D4D4D4",
            lineHeight: 1.65,
            margin: "28px 0 0 0",
            maxWidth: 640,
            fontFamily: WORK_SANS,
          }}
        >
          {CONTENT.body}
        </p>

        <div style={gridStyle}>
          {CONTENT.photos.map((p, i) => (
            <Cell
              key={p.src}
              photo={p}
              index={i}
              isMobile={isMobile}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          photo={CONTENT.photos[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}