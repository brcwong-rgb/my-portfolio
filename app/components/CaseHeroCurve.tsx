"use client";

import React, { useState, useEffect } from "react";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const D4 = "#D4D4D4";
const LINE = "#262626";
const PANEL = "#171717";
const MOBILE_BREAKPOINT = 768;

// Blue SVG on a transparent background — sits on the light plate below.
const LOGO_SRC = "/curve-logo.svg";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const microLabel: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 600,
    color: DIM,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    display: "block",
    lineHeight: 1.3,
  };

  const meta = [
    { label: "Role", value: D.role },
    { label: "Timeline", value: D.timeline },
    { label: "Team", value: D.team },
    { label: "Tools", value: D.tools },
  ];

  /* ---- blocks ---- */

  const head = (
    <>
      <h1
        style={{
          fontSize: isMobile ? "clamp(30px, 8.4vw, 42px)" : 42,
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
          fontSize: isMobile ? "clamp(19px, 5vw, 26px)" : 32,
          fontWeight: 500,
          color: DIM,
          letterSpacing: "-0.01em",
          lineHeight: isMobile ? 1.3 : 1.2,
          margin: "12px 0 0 0",
          maxWidth: 900,
        }}
      >
        {D.subtitle}
      </p>
    </>
  );

  const scope = (
    <div>
      <span
        style={{
          ...microLabel,
          fontSize: 11,
          letterSpacing: "0.08em",
          marginBottom: isMobile ? 18 : 24,
        }}
      >
        What I work on
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 12 : 14,
        }}
      >
        {D.scope.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              gap: isMobile ? 12 : 14,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#404040",
                flexShrink: 0,
                marginTop: isMobile ? 9 : 11,
              }}
            />
            <span
              style={{
                fontSize: isMobile ? 16 : 19,
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
  );

  const ndaNote = (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        background: PANEL,
        border: `1px solid ${LINE}`,
        borderRadius: 10,
        padding: isMobile ? "16px 16px" : "18px 20px",
        maxWidth: 560,
        boxSizing: "border-box",
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke={DIM}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0, marginTop: 2 }}
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <div>
        <span style={{ ...microLabel, marginBottom: 6 }}>Restricted</span>
        <span
          style={{
            fontSize: isMobile ? 14 : 15,
            fontWeight: 400,
            color: D4,
            lineHeight: 1.55,
            display: "block",
          }}
        >
          {D.nda}
        </span>
      </div>
    </div>
  );

  const rail = (
    <aside
      style={{
        position: isMobile ? "static" : "sticky",
        top: 128,
        borderTop: isMobile ? `1px solid ${LINE}` : "none",
        borderLeft: isMobile ? "none" : `1px solid ${LINE}`,
        paddingTop: isMobile ? 28 : 6,
        paddingLeft: isMobile ? 0 : 28,
      }}
    >
      {/* logo plate */}
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? 260 : "none",
          aspectRatio: isMobile ? "16/6" : "16/7",
          background: "#FAFAFA",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 18px",
          boxSizing: "border-box",
          marginBottom: isMobile ? 22 : 28,
        }}
      >
        <img
          src={LOGO_SRC}
          alt={`${D.title} logo`}
          style={{
            width: "100%",
            maxWidth: 200,
            maxHeight: "62%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* meta rows */}
      <div style={{ borderTop: `1px solid ${LINE}` }}>
        {meta.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              justifyContent: isMobile ? "space-between" : "flex-start",
              alignItems: isMobile ? "baseline" : "stretch",
              gap: isMobile ? 16 : 6,
              padding: isMobile ? "12px 0" : "14px 0",
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <span style={{ ...microLabel, flexShrink: 0 }}>{item.label}</span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: INK,
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                textAlign: isMobile ? "right" : "left",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );

  /* ---- layout ---- */

  const shell: React.CSSProperties = {
    width: "100%",
    background: BG,
    boxSizing: "border-box",
    padding: isMobile
      ? "104px clamp(20px, 4vw, 48px) 56px"
      : "128px 48px 80px",
    minHeight: isMobile ? 0 : "100vh",
  };

  if (isMobile) {
    return (
      <div style={shell}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {head}
          <div style={{ marginTop: 40 }}>{rail}</div>
          <div style={{ marginTop: 48 }}>{scope}</div>
          <div style={{ marginTop: 40 }}>{ndaNote}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={shell}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        <div>
          {head}
          <div style={{ marginTop: 80 }}>{scope}</div>
          <div style={{ marginTop: 64 }}>{ndaNote}</div>
        </div>
        {rail}
      </div>
    </div>
  );
}