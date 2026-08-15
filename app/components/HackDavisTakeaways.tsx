"use client";

import { useEffect, useState } from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const MOBILE_BREAKPOINT = 900;

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
      id="takeaways"
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: isMobile ? "64px 20px 96px" : "96px 48px 120px",
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
          Takeaways
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
          What I took away from shipping this
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            marginTop: isMobile ? 48 : 64,
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
                marginTop: i === 0 ? 0 : 40,
                borderTop: i === 0 ? "none" : `1px solid ${"#2a2a2a"}`,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: DIM,
                  letterSpacing: "0.06em",
                  fontFamily: WORK_SANS,
                  marginTop: 5,
                  flexShrink: 0,
                }}
              >
                0{i + 1}
              </span>
              <div>
                <h3
                  style={{
                    fontSize: "clamp(19px, 1.8vw, 24px)",
                    fontWeight: 600,
                    color: INK,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.35,
                    margin: 0,
                    fontFamily: MANROPE,
                  }}
                >
                  {t.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? 17 : 18,
                    fontWeight: 400,
                    color: "#D4D4D4",
                    lineHeight: 1.65,
                    margin: "14px 0 0 0",
                    maxWidth: 640,
                    fontFamily: WORK_SANS,
                  }}
                >
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: "clamp(22px, 2vw, 28px)",
            fontWeight: 500,
            color: INK,
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            margin: isMobile ? "64px 0 0 0" : "80px 0 0 0",
            maxWidth: 760,
            fontFamily: MANROPE,
          }}
        >
          Most of all, a judging app is a{" "}
          <span style={{ color: ACCENT }}>routing tool</span>, not just a scoring form. The best insight did not come from a mockup. It came from watching real judges move through a real venue.
        </p>
      </div>
    </div>
  );
}