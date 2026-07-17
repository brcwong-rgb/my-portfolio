import React from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";

const D = {
  title: "HackDavis",
  subtitle:
    "Designed and shipped a judging app used to score projects at UC Davis's collegiate hackathon",
  team: "Product Designer, 3 Developers",
  tools: "Figma",
  timeline: "4 weeks, 2026",
  role: "Product Designer",
};

export default function CaseHeroHackDavis() {
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
        }}
      >
        {D.subtitle}
      </p>

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
    </div>
  );
}