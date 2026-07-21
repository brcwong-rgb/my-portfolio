"use client";

import React, { useState, useEffect, useRef } from "react";

// ---- swap this one line to change the Curve logo ----
const CURVE_LOGO = "/curve-logo-2.svg";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const LINE = "#262626";
const PANEL = "#171717";
const ACCENT = "#CDFE88";
const MOBILE_BREAKPOINT = 768;

const PHOTO_SRC = "/brandon.jpg";

const LOGOS: Record<string, string | null> = {
  "Curve Biosciences": CURVE_LOGO,
  Treevah: "/treevah-logo.png",
  "San Jose City College": "/sjcc-logo.svg",
  BRIDGEGOOD: "/bridgegood-logo.png",
};

const EXPERIENCE = [
  {
    org: "Curve Biosciences",
    role: "Digital Designer",
    period: "Dec 2025 — Present",
    place: "San Mateo, CA",
  },
  {
    org: "Curve Biosciences",
    role: "Graphic Design Marketing Intern",
    period: "Jul 2025 — Dec 2025",
    place: "San Mateo, CA",
  },
  {
    org: "Treevah",
    role: "UX/UI Intern",
    period: "Jun 2024 — Aug 2024",
    place: "Chicago, IL",
  },
  {
    org: "San Jose City College",
    role: "Graphic Design Intern",
    period: "Mar 2023 — Jul 2024",
    place: "San Jose, CA",
  },
  {
    org: "BRIDGEGOOD",
    role: "UX Design Apprentice",
    period: "Jun 2023 — Sep 2023",
    place: "Oakland, CA",
  },
];

const EDUCATION = [
  {
    school: "Arizona State University",
    degree: "M.S. User Experience",
    period: "Aug 2026 — Present",
  },
  {
    school: "UC Davis",
    degree: "B.A. Design",
    period: "Sep 2024 — Jun 2026",
  },
  {
    school: "San Jose City College",
    degree: "A.S. UX & Interaction Design",
    period: "Aug 2022 — Jun 2024",
  },
];

const FACTS = [
  { label: "Based", value: "SF Bay Area" },
  { label: "Focus", value: "UX + Motion" },
  { label: "Tools", value: "Figma, After Effects, Illustrator" },
  { label: "Status", value: "Open to opportunities" },
];

const LINKS = [
  {
    label: "bwong127@asu.edu",
    href: "mailto:bwong127@asu.edu",
    color: ACCENT,
    external: false,
  },
  {
    label: "Download resume",
    href: "/brandon-wong-resume.pdf",
    color: DIM,
    external: true,
  },
];

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateRm = () => setReduced(rm.matches);
    updateRm();
    rm.addEventListener("change", updateRm);

    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", updateRm);
    };
  }, []);

  // The kinetic wall: hero lines shear apart, photo counter-scrolls.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const drift = Math.min(y * (isMobile ? 0.12 : 0.22), isMobile ? 90 : 260);

      if (line1Ref.current)
        line1Ref.current.style.transform = `translateX(${-drift}px)`;
      if (line2Ref.current)
        line2Ref.current.style.transform = `translateX(${drift * 0.65}px)`;
      if (photoRef.current)
        photoRef.current.style.transform = `translateY(${Math.min(
          y * 0.06,
          60
        )}px)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile, reduced]);

  const micro: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 600,
    color: DIM,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    lineHeight: 1.3,
  };

  const sectionHead = (index: string, label: string) => (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <span style={{ ...micro, color: ACCENT }}>{index}</span>
      <span style={micro}>{label}</span>
    </div>
  );

  const logoPlate = (org: string) => {
    const src = failedLogos[org] ? null : LOGOS[org];
    return (
      <div
        style={{
          width: isMobile ? 40 : 52,
          height: isMobile ? 40 : 52,
          flexShrink: 0,
          background: src ? "#FAFAFA" : PANEL,
          border: src ? "none" : `1px solid ${LINE}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {src ? (
          <img
            src={src}
            alt=""
            onError={() =>
              setFailedLogos((prev) => ({ ...prev, [org]: true }))
            }
            style={{
              width: "70%",
              height: "70%",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          <span
            style={{
              fontSize: isMobile ? 14 : 17,
              fontWeight: 800,
              color: DIM,
            }}
          >
            {org.charAt(0)}
          </span>
        )}
      </div>
    );
  };

  const shell: React.CSSProperties = {
    width: "100%",
    background: BG,
    boxSizing: "border-box",
    paddingTop: isMobile ? 104 : 140,
    paddingBottom: isMobile ? 72 : 120,
    paddingLeft: isMobile ? "clamp(20px, 4vw, 48px)" : 48,
    paddingRight: isMobile ? "clamp(20px, 4vw, 48px)" : 48,
    fontFamily: "Manrope, sans-serif",
    overflowX: "hidden",
  };

  return (
    <div style={shell}>
      {/* ---- kinetic hero ---- */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: isMobile ? 10 : 16,
          }}
        >
          <span style={micro}>(About)</span>
          <span style={micro}>37.54°N — 121.98°W</span>
        </div>

        <h1
          style={{
            fontSize: isMobile
              ? "clamp(56px, 17.5vw, 100px)"
              : "clamp(88px, 11.5vw, 190px)",
            fontWeight: 800,
            color: INK,
            letterSpacing: "-0.05em",
            lineHeight: 0.92,
            margin: 0,
            paddingBottom: "0.1em",
          }}
        >
          <span
            ref={line1Ref}
            style={{
              display: "block",
              whiteSpace: "nowrap",
              willChange: "transform",
            }}
          >
            <span
              style={{
                display: "block",
                animation: "wallIn 1s cubic-bezier(0.76,0,0.24,1) 0.05s both",
              }}
            >
              BRANDON
            </span>
          </span>

          <span
            ref={line2Ref}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "0.14em" : "0.16em",
              whiteSpace: "nowrap",
              willChange: "transform",
              marginLeft: isMobile ? "0.6em" : "1.1em",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "block",
                height: isMobile ? 7 : 14,
                width: isMobile ? "0.7em" : "0.85em",
                flexShrink: 0,
                background: ACCENT,
                transformOrigin: "left",
                animation: "ruleDraw 0.7s cubic-bezier(0.76,0,0.24,1) 0.45s both",
              }}
            />
            <span
              style={{
                display: "block",
                animation: "wallIn 1s cubic-bezier(0.76,0,0.24,1) 0.6s both",
              }}
            >
              WONG
            </span>
          </span>
        </h1>
      </div>

      {/* ---- photo, broken grid ---- */}
      <div
        style={{
          position: "relative",
          marginTop: isMobile ? 36 : -20,
          display: "flex",
          justifyContent: isMobile ? "stretch" : "flex-end",
        }}
      >
        <div
          ref={photoRef}
          style={{
            width: isMobile ? "100%" : "54%",
            maxWidth: isMobile ? "none" : 680,
            willChange: "transform",
            animation: "fadeUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.85s both",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/11",
              background: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <img
              src={PHOTO_SRC}
              alt="Brandon Wong"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 30%",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: isMobile ? 12 : "-14%",
              bottom: isMobile ? -18 : 28,
              background: BG,
              border: `1px solid ${LINE}`,
              borderRadius: 8,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <span style={{ ...micro, display: "block" }}>UX + Motion</span>
            <span
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: INK,
                letterSpacing: "-0.01em",
                marginTop: 4,
              }}
            >
              SF Bay Area
            </span>
          </div>
        </div>
      </div>

      {/* ---- statement ---- */}
      <p
        style={{
          fontSize: isMobile
            ? "clamp(22px, 6vw, 30px)"
            : "clamp(30px, 3.2vw, 50px)",
          fontWeight: 700,
          color: DIM,
          letterSpacing: "-0.03em",
          lineHeight: 1.16,
          marginTop: isMobile ? 72 : 140,
          marginBottom: 0,
          maxWidth: 820,
        }}
      >
        <span style={{ color: INK }}>Design is a form of communication.</span>{" "}
        Motion is how it speaks.
      </p>

      {/* ---- 01 experience ---- */}
      <div style={{ marginTop: isMobile ? 72 : 130 }}>
        {sectionHead("01", "Experience")}

        <div style={{ borderTop: `1px solid ${LINE}` }}>
          {EXPERIENCE.map((job, i) => (
            <div
              key={`${job.org}-${job.period}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 14 : 24,
                paddingTop: isMobile ? 18 : 26,
                paddingBottom: isMobile ? 18 : 26,
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              {!isMobile && (
                <span style={{ ...micro, width: 26, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}

              {logoPlate(job.org)}

              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: isMobile ? 19 : "clamp(24px, 2.6vw, 40px)",
                    fontWeight: 800,
                    color: INK,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {job.org}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 500,
                    color: DIM,
                    marginTop: 3,
                  }}
                >
                  {job.role} · {job.place}
                </span>
              </div>

              <span style={{ ...micro, flexShrink: 0, textAlign: "right" }}>
                {job.period}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- 02 education ---- */}
      <div style={{ marginTop: isMobile ? 64 : 110 }}>
        {sectionHead("02", "Education")}

        <div style={{ borderTop: `1px solid ${LINE}` }}>
          {EDUCATION.map((ed) => (
            <div
              key={ed.school}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                paddingTop: 16,
                paddingBottom: 16,
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: isMobile ? 16 : 20,
                    fontWeight: 700,
                    color: INK,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {ed.school}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 500,
                    color: DIM,
                    marginTop: 3,
                  }}
                >
                  {ed.degree}
                </span>
              </div>
              <span style={{ ...micro, flexShrink: 0, textAlign: "right" }}>
                {ed.period}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- 03 details ---- */}
      <div style={{ marginTop: isMobile ? 64 : 110 }}>
        {sectionHead("03", "Details")}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 0 : 48,
            borderTop: `1px solid ${LINE}`,
          }}
        >
          <div>
            {FACTS.map((f) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                  paddingTop: 14,
                  paddingBottom: 14,
                  borderBottom: `1px solid ${LINE}`,
                }}
              >
                <span style={{ ...micro, flexShrink: 0 }}>{f.label}</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: INK,
                    letterSpacing: "-0.01em",
                    textAlign: "right",
                  }}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 10,
              paddingTop: isMobile ? 24 : 14,
              paddingBottom: 14,
            }}
          >
            {LINKS.map((link) =>
              React.createElement(
                "a",
                {
                  key: link.label,
                  href: link.href,
                  target: link.external ? "_blank" : undefined,
                  rel: link.external ? "noopener noreferrer" : undefined,
                  style: {
                    fontSize: isMobile ? 16 : 20,
                    fontWeight: 700,
                    color: link.color,
                    letterSpacing: "-0.02em",
                    textDecoration: "none",
                  },
                },
                link.label
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wallIn {
          from { opacity: 0; clip-path: inset(-20% 100% -20% 0); }
          to   { opacity: 1; clip-path: inset(-20% 0 -20% 0); }
        }
        @keyframes ruleDraw {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}