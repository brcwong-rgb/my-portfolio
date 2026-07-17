import React from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";

const D = {
  heading: "Overview",
  impactTitle: "My Impact",
  impactBody:
    "Produced, animated, and delivered a promotional video through motion graphics and campus footage, creating an accessible resource for the Basic Needs Department.",
  clientTitle: "The Client",
  clientBody:
    "Dean of San Jose City College's Basic Needs Department. They support students by connecting them with resources such as food assistance and housing support.",
  challengeTitle: "The Challenge",
  challengeBody:
    "Create an engaging promotional video that educates students about the department's available resources while encouraging them to seek support.",
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
        border: "0.5px solid " + LINE,
        borderRadius: 4,
        padding: big ? "clamp(28px, 4vw, 56px)" : "clamp(24px, 3vw, 40px)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 600, color: DIM, letterSpacing: "0.08em" }}>({index})</span>
      <h3
        style={{
          fontSize: big ? "clamp(28px, 3vw, 44px)" : "clamp(24px, 2.4vw, 36px)",
          fontWeight: 800,
          color: INK,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 17, fontWeight: 500, color: INK, lineHeight: 1.6, margin: 0, maxWidth: 680 }}>{body}</p>
    </div>
  );
}

export default function CaseOverview() {
  return (
    <div
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: "96px 48px",
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
          textAlign: "center",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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