"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const INK = "#1A1A1A";
const PAPER = "#FAFAFA";
const MUTED = "#8A8A8A";
const LINE = "#D8D8D8";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const EMAIL = "bwong127@asu.edu";

function Divider() {
  return <div style={{ borderTop: "1px dashed #C8C8C8", margin: "16px 0" }} />;
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "4px 0",
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: MUTED,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: WORK_SANS,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: INK,
          fontFamily: WORK_SANS,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Barcode() {
  const widths = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 2,
        height: 40,
      }}
    >
      {widths.map((w, i) => (
        <div
          key={i}
          style={{
            width: w,
            height: "100%",
            background: i % 2 === 0 ? INK : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export default function ContactReceipt() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [now, setNow] = useState("");
  const [sendHover, setSendHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  useEffect(() => {
    setMounted(true);
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
          second: "2-digit",
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
    fontSize: 10,
    fontWeight: 600,
    color: MUTED,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: WORK_SANS,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${LINE}`,
    padding: "7px 0",
    fontSize: 15,
    fontWeight: 500,
    color: INK,
    fontFamily: WORK_SANS,
    outline: "none",
    boxSizing: "border-box",
  };

  const popup = (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-start",
        animation: "receiptScrimIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 460,
          height: "100%",
          overflowY: "auto",
          background: PAPER,
          color: INK,
          padding: "36px 32px 28px",
          boxSizing: "border-box",
          fontFamily: WORK_SANS,
          boxShadow: "20px 0 80px rgba(0,0,0,0.5)",
          animation: "receiptSlideIn 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* circular close button */}
        <button
          onClick={() => setOpen(false)}
          onMouseEnter={() => setCloseHover(true)}
          onMouseLeave={() => setCloseHover(false)}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#121212",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            transform: closeHover ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="#FAFAFA"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" />
            <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" />
          </svg>
        </button>

        {/* header — left aligned, Champ style */}
        <div style={{ paddingTop: 2, paddingRight: 48 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              fontFamily: MANROPE,
              color: INK,
            }}
          >
            BRANDON WONG
          </div>
          <div style={{ ...rowLabel, marginTop: 6 }}>UX + Motion Designer</div>
        </div>

        <Divider />

        <MetaRow label="Date" value={now} />
        <MetaRow label="Location" value="SF Bay Area" />
        <MetaRow label="Status" value="Open to opportunities" />

        <Divider />

        {/* form — name + email share a row */}
        <div style={{ ...rowLabel, marginBottom: 12 }}>Order details</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...rowLabel, marginBottom: 3 }}>Name</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...rowLabel, marginBottom: 3 }}>Email</div>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="you@email.com"
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <div style={{ ...rowLabel, marginBottom: 3 }}>Message</div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What are you working on?"
              rows={3}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </div>
        </div>

        <Divider />

        {/* send button — green hover */}
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
            padding: "13px 0",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: WORK_SANS,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.25s ease, color 0.25s ease",
          }}
        >
          <span>Send Message</span>
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

        {/* barcode + footer */}
        <div style={{ marginTop: 20 }}>
          <Barcode />
          <div
            style={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: 600,
              color: MUTED,
              letterSpacing: "0.3em",
              marginTop: 6,
              fontFamily: WORK_SANS,
            }}
          >
            {EMAIL.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "0.24em",
            marginTop: 16,
            fontFamily: MANROPE,
            color: INK,
          }}
        >
          THANK YOU
        </div>
      </div>

      <style>{`
        @keyframes receiptScrimIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes receiptSlideIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );

  return createPortal(popup, document.body);
}