"use client";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

// ---- content ----
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
  captionText: "Below is the full user flow",
  flowImage: "/hackdavis-user-flow.png", // put this file in /public
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

function Arrow() {
  return (
    <span
      style={{
        color: DIM,
        fontSize: 16,
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      →
    </span>
  );
}

export default function HackDavisDesign() {
  return (
    <div
      id="design"
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
        <div id="user-flow">
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
            {CONTENT.bodyBefore}
            <strong style={{ fontWeight: 600, color: INK }}>
              {CONTENT.bodyBold}
            </strong>
            {CONTENT.bodyAfter}
          </p>

          {/* ---- the flow ---- */}
          <div style={{ marginTop: 56 }}>
            {/* main path */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px 12px",
              }}
            >
              {CONTENT.steps.map((step, i) => (
                <span
                  key={step}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Chip label={step} />
                  {i < CONTENT.steps.length - 1 ? <Arrow /> : null}
                </span>
              ))}
            </div>

            {/* branch — its own row, clearly nested under the flow */}
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
                  fontSize: 16,
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

          {/* caption + flow diagram */}
          <p
            style={{
              fontSize: 19,
              fontWeight: 400,
              color: DIM,
              lineHeight: 1.65,
              margin: "64px 0 0 0",
              maxWidth: 960,
              fontFamily: WORK_SANS,
            }}
          >
            {CONTENT.captionText}
          </p>

          <div
            style={{
              marginTop: 24,
              width: "100%",
              background: CARD,
              border: `0.5px solid ${LINE}`,
              borderRadius: 4,
              overflow: "hidden",
              padding: 24,
              boxSizing: "border-box",
            }}
          >
            <img
              src={CONTENT.flowImage}
              alt="HackDavis judging app user flow"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}