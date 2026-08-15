"use client";

import { useEffect, useRef, useState } from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const MOBILE_BREAKPOINT = 900;

type Photo = { src: string; caption: string; span: number };

const CONTENT = {
  sectionLabel: "Live at HackDavis",
  headline: "Stress testing with 50+ judges",
  body: "The app ran live at HackDavis 2026. Over 50 judges used it on their phones, walking the venue and scoring 100+ projects in real time.",
  photos: [
    { src: "/hackdavis-live-venue.jpeg", caption: "The venue during judging", span: 4 },
    { src: "/hackdavis-live-grading.jpeg", caption: "A judge grading a project", span: 2 },
    { src: "/hackdavis-live-home.jpeg", caption: "Home page directing the judge to their next project", span: 2 },
    { src: "/hackdavis-live-judge.jpeg", caption: "A judge reviewing their queue", span: 2 },
    { src: "/hackdavis-live-judging.jpeg", caption: "A judge scoring a hacker's project", span: 2 },
  ] as Photo[],
};

function GridPhoto({ src, caption, span }: Photo) {
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
          borderRadius: 8,
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
          fontSize: 13,
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

function Carousel({ photos }: { photos: Photo[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(idx);
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          gap: 12,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {photos.map((p) => (
          <figure
            key={p.src}
            style={{
              margin: 0,
              flex: "0 0 100%",
              scrollSnapAlign: "start",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                background: CARD,
                border: `0.5px solid ${LINE}`,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <img
                src={p.src}
                alt={p.caption}
                style={{
                  width: "100%",
                  aspectRatio: "3/2",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <figcaption
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: DIM,
                lineHeight: 1.5,
                fontFamily: WORK_SANS,
              }}
            >
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 18 }}>
        {photos.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 999,
              background: i === active ? ACCENT : "#404040",
              transition: "width 0.25s ease, background 0.25s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HackDavisLive() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

        <div style={{ marginTop: isMobile ? 40 : 56 }}>
          {isMobile ? (
            <Carousel photos={CONTENT.photos} />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 24,
              }}
            >
              {CONTENT.photos.map((p) => (
                <GridPhoto key={p.src} {...p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}