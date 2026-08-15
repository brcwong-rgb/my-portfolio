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

const CONTENT = {
  sectionLabel: "DESIGN",
  headline: "User Flow",
  bodyBefore: "Judges get about ",
  bodyBold: "five minutes per project",
  bodyAfter:
    ", and most of it is spent walking. The flow had to move them from their queue to the right table to a finished score with as little friction as possible.",
  steps: [
    "Assigned Projects",
    "Venue Map",
    "Score the Project",
    "Next Project",
  ],
  branchLabel: "Report Missing Team",
  branchNote:
    "If nobody is at the table, judges flag the team as missing. It moves into a separate missing category so the round keeps moving and organizers can follow up.",
};

function Chip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: CARD,
        border: `0.5px solid ${LINE}`,
        borderRadius: 999,
        padding: "12px 20px",
        fontSize: "clamp(13px, 1.3vw, 16px)",
        fontWeight: 500,
        color: INK,
        fontFamily: WORK_SANS,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function Arrow({ vertical }: { vertical: boolean }) {
  return (
    <span
      style={{
        color: DIM,
        fontSize: 16,
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {vertical ? "↓" : "→"}
    </span>
  );
}

export default function HackDavisDesign() {
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
      id="design"
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
        <div id="user-flow">
          <span
            style={{
              display: "block",
              fontSize: isMobile ? 18 : 22,
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
              fontSize: isMobile ? 17 : 19,
              fontWeight: 400,
              color: "#D4D4D4",
              lineHeight: 1.65,
              margin: isMobile ? "24px 0 0 0" : "48px 0 0 0",
              maxWidth: 960,
              fontFamily: WORK_SANS,
            }}
          >
            {CONTENT.bodyBefore}
            <strong style={{ fontWeight: 600, color: INK }}>
              {CONTENT.bodyBold}
            </strong>
            {CONTENT.bodyAfter}
          </p>

          {/* ---- the flow ---- */}
          <div style={{ marginTop: isMobile ? 40 : 56 }}>
            {/* main path — horizontal on desktop, stacked vertical on mobile */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                flexWrap: isMobile ? "nowrap" : "wrap",
                alignItems: isMobile ? "flex-start" : "center",
                gap: isMobile ? 12 : "14px 12px",
              }}
            >
              {CONTENT.steps.map((step, i) => (
                <span
                  key={step}
                  style={{
                    display: "inline-flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: 12,
                  }}
                >
                  <Chip label={step} />
                  {i < CONTENT.steps.length - 1 ? (
                    <Arrow vertical={isMobile} />
                  ) : null}
                </span>
              ))}
            </div>

            {/* branch — exception path */}
            <div
              style={{
                marginTop: 32,
                paddingLeft: 20,
                borderLeft: `1px solid ${LINE}`,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: DIM,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: WORK_SANS,
                }}
              >
                Exception path
              </span>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: CARD,
                  border: `0.5px solid ${ACCENT}`,
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontSize: "clamp(12px, 1.2vw, 15px)",
                  fontWeight: 500,
                  color: ACCENT,
                  fontFamily: WORK_SANS,
                  whiteSpace: "nowrap",
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: ACCENT,
                    flexShrink: 0,
                  }}
                />
                {CONTENT.branchLabel}
              </span>

              <span
                style={{
                  fontSize: isMobile ? 15 : 16,
                  fontWeight: 400,
                  color: DIM,
                  lineHeight: 1.6,
                  fontFamily: WORK_SANS,
                  maxWidth: 640,
                }}
              >
                {CONTENT.branchNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}