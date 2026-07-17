import React from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const D4 = "#D4D4D4";

const D = {
  title: "Curve Biosciences",
  subtitle:
    "Digital Designer working on life science products, from UX product mapping to motion graphics.",
  team: "Curve Biosciences",
  tools: "Figma, After Effects, Illustrator",
  timeline: "Ongoing",
  role: "Digital Designer",
  scope: [
    "UX product mapping for the HCC test",
    "Refreshed the lab manual",
    "Motion graphics for social media",
  ],
  nda: "Details are limited due to a non-disclosure agreement (NDA).",
};

export default function CaseHeroCurve() {
  const labelStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 500,
    color: DIM,
    display: "block",
    marginBottom: 8,
    lineHeight: 1.4,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 500,
    color: INK,
    lineHeight: 1.4,
  };

  return (
    <div
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: "128px 48px 80px",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: 42,
          fontWeight: 600,
          color: INK,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {D.title}
      </h1>

      <p
        style={{
          fontSize: 32,
          fontWeight: 500,
          color: DIM,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          margin: "12px 0 0 0",
          maxWidth: 900,
        }}
      >
        {D.subtitle}
      </p>

      {/* meta row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
          marginTop: 64,
        }}
      >
        <div>
          <span style={labelStyle}>Team</span>
          <span style={valueStyle}>{D.team}</span>
        </div>
        <div>
          <span style={labelStyle}>Tools</span>
          <span style={valueStyle}>{D.tools}</span>
        </div>
        <div>
          <span style={labelStyle}>Timeline</span>
          <span style={valueStyle}>{D.timeline}</span>
        </div>
        <div>
          <span style={labelStyle}>Role</span>
          <span style={valueStyle}>{D.role}</span>
        </div>
      </div>

      {/* scope */}
      <div style={{ marginTop: 80 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: DIM,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 24,
          }}
        >
          What I work on
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {D.scope.map((item) => (
            <div
              key={item}
              style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#404040",
                  flexShrink: 0,
                  marginTop: 11,
                }}
              />
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 400,
                  color: D4,
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* NDA note */}
      <p
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: DIM,
          lineHeight: 1.6,
          margin: "64px 0 0 0",
          maxWidth: 640,
        }}
      >
        {D.nda}
      </p>
    </div>
  );
}