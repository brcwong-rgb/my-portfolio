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

type Screen = { src: string; caption: string };
type Decision = {
  title: string;
  problem: string;
  solution: string;
  body: string;
  screens: Screen[];
};

const DECISIONS: Decision[] = [
  {
    title: "Flagging a missing team",
    problem: "Judges arrived at empty tables and stalled.",
    solution: "Flag the team as missing and keep moving.",
    body: "Instead of stalling the round, judges flag an empty table as missing. It moves to a separate category so organizers can follow up.",
    screens: [
      { src: "/hackdavis-missing-1.png", caption: "Empty table" },
      { src: "/hackdavis-missing-2.png", caption: "Flag as missing" },
      { src: "/hackdavis-missing-3.png", caption: "Missing category" },
    ],
  },
  {
    title: "A venue map",
    problem: "Last year, judges couldn't find the tables.",
    solution: "A map on the home screen, expandable to full view.",
    body: "The map sits on the home screen and expands when judges need a closer look.",
    screens: [
      { src: "/hackdavis-map-1.png", caption: "Map on the home screen" },
      { src: "/hackdavis-map-2.png", caption: "Expanded map view" },
    ],
  },
  {
    title: "Knowing when you're done",
    problem: "Judges were unsure if they'd finished.",
    solution: "A clear done state and a scored list.",
    body: "The unjudged list ends with a clear done state, and a scored section confirms what's complete.",
    screens: [
      { src: "/hackdavis-done-1.png", caption: "You're done" },
      { src: "/hackdavis-done-2.png", caption: "Scored projects" },
    ],
  },
];

function ProblemSolution({ problem, solution }: { problem: string; solution: string }) {
  const row: React.CSSProperties = {
    display: "flex",
    gap: 12,
    alignItems: "baseline",
  };
  const tag = (accent: boolean): React.CSSProperties => ({
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: WORK_SANS,
    color: accent ? ACCENT : DIM,
    flexShrink: 0,
    width: 72,
  });
  const text: React.CSSProperties = {
    fontSize: 15,
    fontWeight: 400,
    color: "#D4D4D4",
    lineHeight: 1.5,
    fontFamily: WORK_SANS,
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginTop: 20,
        paddingLeft: 16,
        borderLeft: `2px solid ${LINE}`,
      }}
    >
      <div style={row}>
        <span style={tag(false)}>Problem</span>
        <span style={text}>{problem}</span>
      </div>
      <div style={row}>
        <span style={tag(true)}>Solution</span>
        <span style={text}>{solution}</span>
      </div>
    </div>
  );
}

function Mockup({ src, caption }: Screen) {
  return (
    <figure style={{ margin: 0, width: "100%" }}>
      <div
        style={{
          background: CARD,
          border: `0.5px solid ${LINE}`,
          borderRadius: 8,
          padding: 16,
          boxSizing: "border-box",
        }}
      >
        <img
          src={src}
          alt={caption}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 6,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        />
      </div>
      <figcaption
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: DIM,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: WORK_SANS,
          marginTop: 12,
          textAlign: "center",
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function MockupRow({ screens }: { screens: Screen[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 24,
        marginTop: 40,
        justifyContent: "flex-start",
      }}
    >
      {screens.map((s) => (
        <div key={s.src} style={{ flex: "0 1 240px", maxWidth: 260 }}>
          <Mockup {...s} />
        </div>
      ))}
    </div>
  );
}

function MockupCarousel({ screens }: { screens: Screen[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div style={{ marginTop: 32 }}>
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
        {screens.map((s) => (
          <div
            key={s.src}
            style={{
              flex: "0 0 78%",
              scrollSnapAlign: "center",
              margin: "0 auto",
            }}
          >
            <Mockup {...s} />
          </div>
        ))}
      </div>

      {screens.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 16 }}>
          {screens.map((_, i) => (
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
      )}
    </div>
  );
}

export default function HackDavisDecisions() {
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
        <div id="design-decisions">
          <h3
            style={{
              fontSize: "clamp(20px, 1.9vw, 25px)",
              fontWeight: 600,
              color: INK,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              margin: 0,
              fontFamily: MANROPE,
            }}
          >
            Design Decisions
          </h3>

          <p
            style={{
              fontSize: isMobile ? 17 : 18,
              fontWeight: 400,
              color: "#D4D4D4",
              lineHeight: 1.65,
              margin: "24px 0 0 0",
              maxWidth: 640,
              fontFamily: WORK_SANS,
            }}
          >
            Three changes, each from something judges told us.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 72 : 112,
              marginTop: isMobile ? 56 : 72,
            }}
          >
            {DECISIONS.map((d) => (
              <div key={d.title}>
                <h4
                  style={{
                    fontSize: "clamp(19px, 1.7vw, 22px)",
                    fontWeight: 600,
                    color: INK,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                    margin: 0,
                    fontFamily: MANROPE,
                  }}
                >
                  {d.title}
                </h4>

                <ProblemSolution problem={d.problem} solution={d.solution} />

                <p
                  style={{
                    fontSize: isMobile ? 17 : 18,
                    fontWeight: 400,
                    color: "#D4D4D4",
                    lineHeight: 1.65,
                    margin: "24px 0 0 0",
                    maxWidth: 640,
                    fontFamily: WORK_SANS,
                  }}
                >
                  {d.body}
                </p>

                {isMobile ? (
                  <MockupCarousel screens={d.screens} />
                ) : (
                  <MockupRow screens={d.screens} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}