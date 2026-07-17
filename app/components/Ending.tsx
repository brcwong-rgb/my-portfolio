"use client";

import { useState, useEffect } from "react";

export default function Ending() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [time, setTime] = useState("");

  const links = [
    { label: "Email", href: "mailto:bwong127@asu.edu" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/brandon-wong-43449827a/",
    },
    { label: "Instagram", href: "https://instagram.com/bcw.png" },
  ];

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

  const linkStyle = (label: string) => ({
    fontSize: 48,
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    textDecoration: "none",
    marginBottom: 6,
    color: hovered === label ? "#CDFE88" : "#FAFAFA",
    transition: "transform 0.25s ease, color 0.25s ease",
    transform: hovered === label ? "translateX(-8px)" : "translateX(0px)",
    display: "block" as const,
  });

  return (
    <section style={{ width: "100%", background: "#121212", borderTop: "1px solid #404040", boxSizing: "border-box", padding: "96px 48px 72px", minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#757575", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>(SOCIAL)</span>
        {links.map((link) => (
          <a key={link.label} href={link.href} target={link.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer" onMouseEnter={() => setHovered(link.label)} onMouseLeave={() => setHovered(null)} style={linkStyle(link.label)}>{link.label}</a>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 80 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#757575", letterSpacing: "0.02em", display: "flex", flexDirection: "column", gap: 4 }}>
          <span>{time}</span>
          <span>Pacific Standard Time</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
            <div style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "#CDFE88", animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite", opacity: 0.6 }} />
            <div style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "#CDFE88" }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#757575", letterSpacing: "0.02em" }}>Open to new opportunities</span>
        </div>
      </div>

      <style>{`@keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 75%, 100% { transform: scale(2.5); opacity: 0; } }`}</style>
    </section>
  );
}