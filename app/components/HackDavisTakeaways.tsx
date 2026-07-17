"use client";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const TAKEAWAYS = [
  {
    title: "Communicating with the tech team is transparency",
    body: "Clear communication is what makes a handoff smooth. I documented notes for the developers throughout the file, calling out animation, button states, and scroll behaviors.",
  },
  {
    title: "Expect the unexpected and adapt",
    body: "Judges do not have much time, so the flow had to be seamless and quick to grade. Keeping their mindset in focus is what kept the design grounded.",
  },
];

export default function HackDavisTakeaways() {
  return (
    <div
      id="takeaways"
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: "96px 48px 120px",
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
          Takeaways
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
          What I took away from shipping this
        </h2>

        {/* the two takeaways */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            marginTop: 64,
          }}
        >
          {TAKEAWAYS.map((t, i) => (
            <div
              key={t.title}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                paddingTop: i === 0 ? 0 : 40,
                borderTop: i === 0 ? "none" : "1px solid #2a2a2a",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: DIM,
                  letterSpacing: "0.08em",
                  fontFamily: WORK_SANS,
                  marginTop: 6,
                  flexShrink: 0,
                }}
              >
                0{i + 1}
              </span>
              <div>
                <h3
                  style={{
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 700,
                    color: INK,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                    margin: 0,
                    fontFamily: MANROPE,
                  }}
                >
                  {t.title}
                </h3>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: "#D4D4D4",
                    lineHeight: 1.6,
                    margin: "12px 0 0 0",
                    maxWidth: 760,
                    fontFamily: WORK_SANS,
                  }}
                >
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* closing line — ties back to the thesis */}
        <p
          style={{
            fontSize: "clamp(22px, 2.2vw, 30px)",
            fontWeight: 600,
            color: INK,
            letterSpacing: "-0.01em",
            lineHeight: 1.35,
            margin: "72px 0 0 0",
            maxWidth: 900,
            fontFamily: MANROPE,
          }}
        >
          Most of all, a judging app is a{" "}
          <span style={{ color: ACCENT }}>routing tool</span>, not just a
          scoring form. The best insight did not come from a mockup. It came
          from watching real judges move through a real venue.
        </p>
      </div>
    </div>
  );
}