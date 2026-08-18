"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const INK = "#1A1A1A";
const PAPER = "#FAFAFA";
const MUTED = "#8A8A8A";
const LINE = "#E2E2E2";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const EMAIL = "bwong127@asu.edu";
const MOBILE_BREAKPOINT = 768;

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "6px 0",
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 500, color: MUTED, fontFamily: WORK_SANS }}>
        {label}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: INK, fontFamily: WORK_SANS, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

export default function ContactReceipt() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [now, setNow] = useState("");
  const [sendHover, setSendHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("open-contact", openIt);
    return () => window.removeEventListener("open-contact", openIt);
  }, []);

  useEffect(() => {
    if (!open) return;
    const tick = () =>
      setNow(
        new Date().toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSend = () => {
    const subject = encodeURIComponent(
      name ? `Portfolio inquiry from ${name}` : "Portfolio inquiry"
    );
    const bodyLines = [
      message,
      "",
      "—",
      name ? `From: ${name}` : "",
      from ? `Reply to: ${from}` : "",
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  if (!mounted || !open) return null;

  const rowLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    color: MUTED,
    fontFamily: WORK_SANS,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${LINE}`,
    padding: "9px 0",
    fontSize: 15,
    fontWeight: 500,
    color: INK,
    fontFamily: WORK_SANS,
    outline: "none",
    boxSizing: "border-box",
  };

  const hairline = <div style={{ borderTop: `1px solid ${LINE}`, margin: "24px 0" }} />;

  const popup = (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "stretch",
        justifyContent: isMobile ? "center" : "flex-end",
        animation: "receiptScrimIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          // wider, architectural panel on desktop
          maxWidth: isMobile ? 440 : "min(50vw, 720px)",
          height: isMobile ? "auto" : "100%",
          maxHeight: isMobile ? "92vh" : "100%",
          overflowY: "auto",
          background: PAPER,
          color: INK,
          padding: isMobile ? "40px 28px 32px" : "56px 56px 44px",
          boxSizing: "border-box",
          fontFamily: WORK_SANS,
          // squared edges on desktop · rounded top only on mobile sheet
          borderTopLeftRadius: isMobile ? 18 : 0,
          borderTopRightRadius: isMobile ? 18 : 0,
          boxShadow: isMobile
            ? "0 -12px 60px rgba(0,0,0,0.4)"
            : "-16px 0 70px rgba(0,0,0,0.45)",
          display: "flex",
          flexDirection: "column",
          animation: isMobile
            ? "receiptSlideUp 0.45s cubic-bezier(0.16,1,0.3,1)"
            : "receiptSlideLeft 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* HEADER — title left, Close text-button top-right (Champ-inspired) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div
              style={{
                fontSize: isMobile ? 26 : 40,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                fontFamily: MANROPE,
                color: INK,
                maxWidth: 380,
              }}
            >
              Let&rsquo;s work together
            </div>
            <div style={{ ...rowLabel, marginTop: 12 }}>
              Brandon Wong — UX + Motion Designer
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: WORK_SANS,
              fontSize: 14,
              fontWeight: 600,
              color: closeHover ? ACCENT === "#CDFE88" ? "#8AB84E" : ACCENT : INK,
              letterSpacing: "0.01em",
              flexShrink: 0,
              transition: "color 0.2s ease",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Close
          </button>
        </div>

        {hairline}

        <MetaRow label="Date" value={now} />
        <MetaRow label="Location" value="SF Bay Area" />
        <MetaRow label="Status" value="Open to opportunities" />

        {hairline}

        {/* FORM */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 24, flexDirection: isMobile ? "row" : "row" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...rowLabel, marginBottom: 4 }}>Name</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...rowLabel, marginBottom: 4 }}>Email</div>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="you@email.com"
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <div style={{ ...rowLabel, marginBottom: 4 }}>Message</div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What are you working on?"
              rows={isMobile ? 3 : 4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </div>
        </div>

        {/* air between form and footer — the Champ negative-space move */}
        {!isMobile && <div style={{ flex: 1, minHeight: 40 }} />}

        {hairline}

        {/* SEND */}
        <button
          onClick={handleSend}
          onMouseEnter={() => setSendHover(true)}
          onMouseLeave={() => setSendHover(false)}
          style={{
            width: "100%",
            background: sendHover ? ACCENT : INK,
            color: sendHover ? "#121212" : PAPER,
            border: "none",
            borderRadius: 0,
            padding: "16px 0",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.02em",
            fontFamily: WORK_SANS,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.25s ease, color 0.25s ease",
          }}
        >
          <span>Send message</span>
          <span
            style={{
              display: "inline-block",
              transform: sendHover ? "translateX(4px)" : "translateX(0px)",
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            →
          </span>
        </button>

        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            fontWeight: 600,
            color: MUTED,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginTop: 20,
            fontFamily: WORK_SANS,
          }}
        >
          {EMAIL}
        </div>
      </div>

      <style>{`
        @keyframes receiptScrimIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes receiptSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes receiptSlideLeft {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );

  return createPortal(popup, document.body);
}