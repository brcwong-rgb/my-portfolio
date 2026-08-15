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
const BODY_MAX = 640; // ~68 characters — comfortable reading measure

const WORKED = [
  "Navigation scored 7.8/10 across 11 judges",
  "The in-app scoring rubric was the most-praised feature",
  "Editable scores and feedback felt smooth and intuitive",
];

const TO_FIX = [
  "The route through the venue, not the interface, was the real friction",
  "A fixed queue stalls when another judge is already at a table",
  "Teams with 5 to 8 tracks made the scoring screen a long scroll",
];

function ThemeList({ label, items, accent }: { label: string; items: string[]; accent: boolean }) {
  return (
    <div style={{ flex: "1 1 300px", minWidth: 0 }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: accent ? ACCENT : DIM,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: WORK_SANS,
          display: "block",
          marginBottom: 24,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {items.map((item) => (
          <div key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent ? ACCENT : "#404040",
                flexShrink: 0,
                marginTop: 10,
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: "#D4D4D4",
                lineHeight: 1.6,
                fontFamily: WORK_SANS,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HackDavisImprovements() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const label: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: DIM,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: WORK_SANS,
    marginBottom: 20,
  };

  const h2: React.CSSProperties = {
    fontSize: "clamp(26px, 2.2vw, 32px)",
    fontWeight: 600,
    color: INK,
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
    margin: 0,
    maxWidth: 720,
    fontFamily: MANROPE,
  };

  const body: React.CSSProperties = {
    fontSize: isMobile ? 17 : 18,
    fontWeight: 400,
    color: "#D4D4D4",
    lineHeight: 1.65,
    margin: "28px 0 0 0",
    maxWidth: BODY_MAX,
    fontFamily: WORK_SANS,
  };

  return (
    <div
      id="improvements"
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
        <span style={label}>Improvements</span>
        <h2 style={h2}>What the judges told us after the event</h2>

        <div id="feedback">
          <p style={body}>
            After judging ended, I sent out a feedback form and heard back from 11 judges. The scores were strong, but the most useful finding was where the friction actually lived. It was not the interface. It was the walk between tables.
          </p>

          <blockquote
            style={{
              margin: "48px 0 0 0",
              padding: "4px 0 4px 24px",
              borderLeft: `2px solid ${ACCENT}`,
              maxWidth: 720,
            }}
          >
            <p
              style={{
                fontSize: "clamp(19px, 1.8vw, 24px)",
                fontWeight: 500,
                color: INK,
                letterSpacing: "-0.01em",
                lineHeight: 1.45,
                margin: 0,
                fontFamily: MANROPE,
              }}
            >
              &ldquo;The judging app is the best I&rsquo;ve seen so far across all the hackathons I&rsquo;ve attended, both as a judge and a participant.&rdquo;
            </p>
            <span
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 500,
                color: DIM,
                marginTop: 16,
                fontFamily: WORK_SANS,
              }}
            >
              — Judge, HackDavis 2026
            </span>
          </blockquote>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: isMobile ? 40 : 56,
              marginTop: 64,
            }}
          >
            <ThemeList label="What worked" items={WORKED} accent />
            <ThemeList label="What to improve" items={TO_FIX} accent={false} />
          </div>

          <p
            style={{
              fontSize: "clamp(19px, 1.8vw, 24px)",
              fontWeight: 500,
              color: INK,
              letterSpacing: "-0.01em",
              lineHeight: 1.45,
              margin: "72px 0 0 0",
              maxWidth: 720,
              fontFamily: MANROPE,
            }}
          >
            The takeaway reframed the product. A judging app is a routing tool, not just a scoring form.
          </p>
        </div>

        <div id="edge-cases" style={{ marginTop: isMobile ? 80 : 112 }}>
          <span style={label}>Edge Case</span>

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
            Two judges at one table
          </h3>

          <p style={{ ...body, margin: "24px 0 0 0" }}>
            Sometimes two judges were assigned to the same booth at the same time. The flow assumed one judge per table, which left them unsure whether to wait or move on. When the app detects an overlap, it now surfaces a small note so both judges know they can score in parallel and keep the round moving.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              marginTop: 48,
              alignItems: "flex-start",
            }}
          >
            <figure style={{ margin: 0, flex: "1 1 240px", maxWidth: 300 }}>
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
                  src="/hackdavis-judge-note.png"
                  alt="In-app note telling judges another judge is at the table"
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
                  fontSize: 13,
                  fontWeight: 400,
                  color: DIM,
                  lineHeight: 1.5,
                  fontFamily: WORK_SANS,
                  marginTop: 14,
                }}
              >
                The note shown when two judges share a team
              </figcaption>
            </figure>

            <div style={{ flex: "1 1 240px", maxWidth: 360 }}>
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
                  src="/hackdavis-judge-notification.png"
                  alt="Close-up of the judge notification"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: 6,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}