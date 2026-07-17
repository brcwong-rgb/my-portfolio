"use client";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

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

function ThemeList({
  label,
  items,
  accent,
}: {
  label: string;
  items: string[];
  accent: boolean;
}) {
  return (
    <div style={{ flex: "1 1 320px", minWidth: 0 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: accent ? ACCENT : DIM,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: WORK_SANS,
          display: "block",
          marginBottom: 20,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item) => (
          <div
            key={item}
            style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: accent ? ACCENT : "#404040",
                flexShrink: 0,
                marginTop: 9,
              }}
            />
            <span
              style={{
                fontSize: 17,
                fontWeight: 400,
                color: "#D4D4D4",
                lineHeight: 1.55,
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
  return (
    <div
      id="improvements"
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
        {/* ---- section header ---- */}
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
          Improvements
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
          What the judges told us after the event
        </h2>

        {/* ---- feedback summary ---- */}
        <div id="feedback">
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
            After judging ended, I sent out a feedback form and heard back
            from 11 judges. The scores were strong, but the most useful
            finding was where the friction actually lived. It was not the
            interface. It was the walk between tables.
          </p>

          {/* pull quote */}
          <blockquote
            style={{
              margin: "40px 0 0 0",
              padding: "8px 0 8px 24px",
              borderLeft: `2px solid ${ACCENT}`,
              maxWidth: 880,
            }}
          >
            <p
              style={{
                fontSize: "clamp(20px, 2vw, 26px)",
                fontWeight: 600,
                color: INK,
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                margin: 0,
                fontFamily: MANROPE,
              }}
            >
              “The judging app is the best I&rsquo;ve seen so far across all
              the hackathons I&rsquo;ve attended, both as a judge and a
              participant.”
            </p>
            <span
              style={{
                display: "block",
                fontSize: 15,
                fontWeight: 500,
                color: DIM,
                marginTop: 12,
                fontFamily: WORK_SANS,
              }}
            >
              — Judge, HackDavis 2026
            </span>
          </blockquote>

          {/* worked / to fix */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 48,
              marginTop: 56,
            }}
          >
            <ThemeList label="What worked" items={WORKED} accent />
            <ThemeList label="What to improve" items={TO_FIX} accent={false} />
          </div>

          {/* the thesis line */}
          <p
            style={{
              fontSize: "clamp(20px, 2vw, 26px)",
              fontWeight: 600,
              color: INK,
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
              margin: "64px 0 0 0",
              maxWidth: 900,
              fontFamily: MANROPE,
            }}
          >
            The takeaway reframed the product. A judging app is a routing
            tool, not just a scoring form.
          </p>
        </div>

        {/* ---- edge case subsection ---- */}
        <div id="edge-cases" style={{ marginTop: 112 }}>
          <h3
            style={{
              fontSize: "clamp(22px, 2.2vw, 30px)",
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              margin: 0,
              fontFamily: MANROPE,
            }}
          >
            Edge Case
          </h3>

          <h4
            style={{
              fontSize: "clamp(19px, 1.9vw, 25px)",
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              margin: "40px 0 0 0",
              fontFamily: MANROPE,
            }}
          >
            Two judges at one table
          </h4>

          <p
            style={{
              fontSize: 19,
              fontWeight: 400,
              color: "#D4D4D4",
              lineHeight: 1.65,
              margin: "16px 0 0 0",
              maxWidth: 800,
              fontFamily: WORK_SANS,
            }}
          >
            Sometimes two judges were assigned to the same booth at the same
            time. The flow assumed one judge per table, which left them
            unsure whether to wait or move on. When the app detects an
            overlap, it now surfaces a small note so both judges know they
            can score in parallel and keep the round moving.
          </p>

          {/* note screen + standalone notification close-up */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              marginTop: 40,
              alignItems: "flex-start",
            }}
          >
            {/* full screen with the note, captioned */}
            <figure style={{ margin: 0, flex: "1 1 260px", maxWidth: 300 }}>
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
                  fontSize: 14,
                  fontWeight: 400,
                  color: DIM,
                  lineHeight: 1.5,
                  fontFamily: WORK_SANS,
                  marginTop: 12,
                }}
              >
                The note shown when two judges share a team
              </figcaption>
            </figure>

            {/* standalone notification close-up, no caption */}
            <div style={{ flex: "1 1 260px", maxWidth: 360 }}>
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