"use client";

import { useState, useEffect } from "react";

const EMAIL_USER = "bwong127";
const EMAIL_DOMAIN = "asu.edu";
const LINKEDIN_URL = "https://www.linkedin.com/in/brandon-wong-43449827a/";
const INSTAGRAM_URL = "https://instagram.com/bcw.png";

export default function Ending({
  showBackToTop = true,
}: {
  showBackToTop?: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [topHover, setTopHover] = useState(false);
  const [time, setTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const links = [
    { label: "Email", type: "email" as const },
    { label: "LinkedIn", type: "external" as const, url: LINKEDIN_URL },
    { label: "Instagram", type: "external" as const, url: INSTAGRAM_URL },
  ];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const updateTime = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openLink = (link: { label: string; type: string; url?: string }) => {
    if (link.type === "email") {
      window.location.href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
    } else if (link.url) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const linkStyle = (label: string): React.CSSProperties => ({
    fontSize: isMobile ? 44 : 48,
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    marginBottom: 6,
    color: hovered === label ? "#CDFE88" : "#FAFAFA",
    transition: "transform 0.25s ease, color 0.25s ease",
    transform: hovered === label ? "translateX(-8px)" : "translateX(0px)",
    display: "block",
    cursor: "pointer",
    userSelect: "none",
  });

  const backToTop = showBackToTop ? (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setTopHover(true)}
      onMouseLeave={() => setTopHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        color: topHover ? "#CDFE88" : "#757575",
        transition: "color 0.25s ease",
        whiteSpace: "nowrap",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={topHover ? "#CDFE88" : "#757575"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          width: 14,
          height: 14,
          transition: "stroke 0.25s ease, transform 0.25s ease",
          transform: topHover ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
      Back to top
    </button>
  ) : null;

  return (
    <section
      style={{
        width: "100%",
        background: "#121212",
        borderTop: "1px solid #404040",
        boxSizing: "border-box",
        padding: isMobile ? "32px 20px 56px" : "48px 48px 72px",
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP ROW — back-to-top (left) + social block (right), same baseline */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {backToTop || <div />}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#757575",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            (SOCIAL)
          </span>
          {links.map((link) => (
            <span
              key={link.label}
              onClick={() => openLink(link)}
              onMouseEnter={() => setHovered(link.label)}
              onMouseLeave={() => setHovered(null)}
              style={linkStyle(link.label)}
            >
              {link.label}
            </span>
          ))}
        </div>
      </div>

      {/* BOTTOM ROW — clock + open to work */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 80,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#757575",
            letterSpacing: "0.02em",
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: isMobile ? 5 : 4,
            flexShrink: 0,
          }}
        >
          <span>{time}</span>
          <span>{isMobile ? "PT" : "Pacific Standard Time"}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
            <div
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#CDFE88",
                animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#CDFE88",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#757575",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            Open to new opportunities
          </span>
        </div>
      </div>

      <style>{`@keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 75%, 100% { transform: scale(2.5); opacity: 0; } }`}</style>
    </section>
  );
}