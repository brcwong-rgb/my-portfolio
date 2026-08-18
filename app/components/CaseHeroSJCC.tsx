"use client";

import { useEffect, useState } from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const LINE = "#2a2a2a";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const MOBILE_BREAKPOINT = 900;
const MAXW = 1100; // matches the Overview box

const D = {
  title: "San Jose City College",
  subtitle:
    "A promotional video for SJCC's Basic Needs Department, built to connect students with campus resources.",
  workLabel: "What I built",
  work: [
    "Motion graphics + campus footage",
    "Full promo video, start to finish",
    "Accessible resource for students",
  ],
  meta: [
    { label: "Role", value: "Video Production Intern" },
    { label: "Timeline", value: "3 weeks, 2023" },
    { label: "Team", value: "Faculty Advisor, Video Production Intern" },
    { label: "Tools", value: "After Effects, Illustrator, Figma" },
  ],
};

export default function CaseHeroSJCC() {
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
        padding: isMobile ? "112px 20px 56px" : "128px 48px 96px",
      }}
    >
      <div
        style={{
          maxWidth: MAXW,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 300px",
          gap: isMobile ? 48 : 72,
          alignItems: "start",
        }}
      >
        {/* LEFT — title, subtitle, what I built */}
        <div style={{ width: "100%", minWidth: 0 }}>
          <h1
            style={{
              fontSize: isMobile
                ? "clamp(34px, 9vw, 44px)"
                : "clamp(40px, 4vw, 56px)",
              fontWeight: 600,
              color: INK,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              fontFamily: MANROPE,
            }}
          >
            {D.title}
          </h1>

          <p
            style={{
              fontSize: isMobile
                ? "clamp(20px, 5.5vw, 26px)"
                : "clamp(22px, 1.9vw, 28px)",
              fontWeight: 500,
              color: DIM,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              margin: "16px 0 0 0",
              maxWidth: 560,
              fontFamily: MANROPE,
            }}
          >
            {D.subtitle}
          </p>

          <div style={{ marginTop: isMobile ? 40 : 56 }}>
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
              {D.workLabel}
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {D.work.map((item) => (
                <div key={item} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: DIM,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: isMobile ? 18 : 19,
                      fontWeight: 400,
                      color: INK,
                      lineHeight: 1.4,
                      fontFamily: WORK_SANS,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — meta rail */}
        <div style={{ width: "100%" }}>
          {D.meta.map((m, i) => (
            <div
              key={m.label}
              style={{
                paddingTop: i === 0 ? 0 : 18,
                paddingBottom: 18,
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  color: DIM,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: WORK_SANS,
                  marginBottom: 8,
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: INK,
                  lineHeight: 1.4,
                  fontFamily: WORK_SANS,
                }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}