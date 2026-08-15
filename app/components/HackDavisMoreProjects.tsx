"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const MOBILE_BREAKPOINT = 900;

type Project = {
  title: string;
  tag: string;
  href: string;
  video: string;
  posterTime?: number;
};

// the other three projects — HackDavis excluded
const PROJECTS: Project[] = [
  { title: "Curve Biosciences", tag: "Digital Design", href: "/curve", video: "/curve.mp4", posterTime: 6.5 },
  { title: "Treevah", tag: "UX/UI · AI Integration", href: "/treevah", video: "/treevah.mp4" },
  { title: "San Jose City College", tag: "Motion · Video Production", href: "/sjcc", video: "/sjcc.mp4" },
];

function Thumb({ project }: { project: Project }) {
  const src =
    typeof project.posterTime === "number"
      ? `${project.video}#t=${project.posterTime}`
      : `${project.video}#t=0.1`;
  return (
    <video
      src={src}
      muted
      playsInline
      preload="metadata"
      style={{
        width: "100%",
        aspectRatio: "16/10",
        objectFit: "cover",
        display: "block",
        background: "#1e1e1e",
      }}
    />
  );
}

function CardInner({ project }: { project: Project }) {
  return (
    <>
      <div style={{ borderBottom: `0.5px solid ${LINE}`, overflow: "hidden" }}>
        <Thumb project={project} />
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <span
          style={{
            display: "block",
            fontSize: "clamp(18px, 2vw, 22px)",
            fontWeight: 700,
            color: INK,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            fontFamily: MANROPE,
          }}
        >
          {project.title}
        </span>
        <span
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            color: DIM,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: WORK_SANS,
            marginTop: 8,
          }}
        >
          {project.tag}
        </span>
      </div>
    </>
  );
}

export default function HackDavisMoreProjects() {
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const cardBase: React.CSSProperties = {
    background: CARD,
    border: `0.5px solid ${LINE}`,
    borderRadius: 16,
    overflow: "hidden",
    display: "block",
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <div
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: isMobile ? "80px 20px 96px" : "128px 48px 120px",
      }}
    >
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
        More Projects
      </span>

      <h2
        style={{
          fontSize: "clamp(26px, 2.2vw, 32px)",
          fontWeight: 600,
          color: INK,
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
          margin: "0 0 48px 0",
          maxWidth: 720,
          fontFamily: MANROPE,
        }}
      >
        Explore more of my work
      </h2>

      {isMobile ? (
        // MOBILE: clean tappable vertical stack
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {PROJECTS.map((p) => (
            <Link key={p.title} href={p.href} style={cardBase}>
              <CardInner project={p} />
            </Link>
          ))}
        </div>
      ) : (
        // DESKTOP: overlapping spread deck with hover-nudge
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: 20,
            minHeight: 340,
          }}
        >
          {PROJECTS.map((p, i) => {
            const isHovered = hovered === i;
            const isDimmed = hovered !== null && !isHovered;
            const baseRotate = (i - 1) * 4; // -4°, 0°, 4°
            return (
              <Link
                key={p.title}
                href={p.href}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                style={{
                  ...cardBase,
                  width: 340,
                  marginLeft: i === 0 ? 0 : -80, // overlap
                  transform: isHovered
                    ? `translateY(-24px) rotate(0deg) scale(1.03)`
                    : `translateY(0) rotate(${baseRotate}deg)`,
                  opacity: isDimmed ? 0.55 : 1,
                  zIndex: isHovered ? 10 : i,
                  boxShadow: isHovered
                    ? "0 30px 80px rgba(0,0,0,0.55)"
                    : "0 10px 40px rgba(0,0,0,0.35)",
                  transition:
                    "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease, box-shadow 0.4s ease",
                  transformOrigin: "bottom center",
                }}
              >
                <CardInner project={p} />
              </Link>
            );
          })}
        </div>
      )}

      {/* Back to top */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: isMobile ? 64 : 96,
        }}
      >
        <button
          onClick={scrollToTop}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: `0.5px solid ${LINE}`,
            borderRadius: 999,
            padding: "12px 22px",
            cursor: "pointer",
            fontFamily: WORK_SANS,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: DIM,
            transition: "color 0.25s ease, border-color 0.25s ease",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = ACCENT;
            e.currentTarget.style.borderColor = ACCENT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = DIM;
            e.currentTarget.style.borderColor = LINE;
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 14, height: 14 }}
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
          Back to top
        </button>
      </div>
    </div>
  );
}