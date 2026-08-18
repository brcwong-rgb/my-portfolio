"use client";

import { useEffect, useState } from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const FONT = "Manrope, sans-serif";
const WORK_SANS = "'Work Sans', sans-serif";

const MOBILE_BREAKPOINT = 900;

const D = {
  heading: "Overview",
  impactTitle: "My Impact",
  impactBody:
    "Designed and shipped the judging app that scored 100+ projects at UC Davis's hackathon.",
  clientTitle: "The Client",
  clientBody:
    "UC Davis's collegiate hackathon. 500+ students build 100+ projects in 24 hours — and every one needs judging.",
  challengeTitle: "The Challenge",
  challengeBody:
    "Judges get ~5 minutes per project. The app had to be mobile-first: a map to find teams, and fast scoring across every award category.",
};

function Card({
  index,
  title,
  body,
  big = false,
}: {
  index: string;
  title: string;
  body: string;
  big?: boolean;
}) {
  return (
    <div
      style={{
        background: CARD,
        border: `0.5px solid ${LINE}`,
        borderRadius: 4,
        padding: big ? "clamp(28px, 4vw, 56px)" : "clamp(24px, 3vw, 40px)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: DIM,
          letterSpacing: "0.08em",
          fontFamily: WORK_SANS,
        }}
      >
        ({index})
      </span>
      <h3
        style={{
          fontSize: big
            ? "clamp(26px, 2.8vw, 40px)"
            : "clamp(22px, 2.2vw, 30px)",
          fontWeight: 700,
          color: INK,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          margin: 0,
          fontFamily: FONT,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: big ? 18 : 16,
          fontWeight: 400,
          color: "#D4D4D4",
          lineHeight: 1.6,
          margin: 0,
          maxWidth: 620,
          fontFamily: WORK_SANS,
        }}
      >
        {body}
      </p>
    </div>
  );
}

export default function HackDavisOverview() {
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
        fontFamily: FONT,
        boxSizing: "border-box",
        padding: isMobile ? "64px 20px" : "96px 48px",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(32px, 3.5vw, 56px)",
          fontWeight: 800,
          color: INK,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          margin: "0 0 48px 0",
          textAlign: isMobile ? "left" : "center",
          fontFamily: FONT,
        }}
      >
        {D.heading}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Card index="01" title={D.impactTitle} body={D.impactBody} big />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          <Card index="02" title={D.clientTitle} body={D.clientBody} />
          <Card index="03" title={D.challengeTitle} body={D.challengeBody} />
        </div>
      </div>
    </div>
  );
}