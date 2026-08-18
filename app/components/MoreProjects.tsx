"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const INK = "#FAFAFA";
const DIM = "#757575";
const PANEL = "#171717";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const ACCENT = "#CDFE88";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

const MOBILE_BREAKPOINT = 900;
const PANEL_MAXW = 1300; // panel no longer runs edge-to-edge

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Project = {
  key: string;
  title: string;
  tag: string;
  href: string;
  video: string;
  posterTime?: number;
};

const ALL: Project[] = [
  { key: "curve", title: "Curve Biosciences", tag: "Digital Design", href: "/curve", video: "/curve.mp4", posterTime: 6.5 },
  { key: "hackdavis", title: "HackDavis", tag: "UX/UI · Mobile", href: "/hackdavis", video: "/hackdavis.mp4", posterTime: 0.7 },
  { key: "treevah", title: "Treevah", tag: "UX/UI · AI Integration", href: "/treevah", video: "/treevah.mp4" },
  { key: "sjcc", title: "San Jose City College", tag: "Motion · Video Production", href: "/sjcc", video: "/sjcc.mp4", posterTime: 0.9 },
];

function Thumb({ project }: { project: Project }) {
  const src =
    typeof project.posterTime === "number"
      ? `${project.video}#t=${project.posterTime}`
      : `${project.video}#t=0.1`;
  return (
    <video
      src={src}
      muted
      playsInline
      preload="metadata"
      style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block", background: "#1e1e1e" }}
    />
  );
}

function CardInner({ project }: { project: Project }) {
  return (
    <>
      <div style={{ borderBottom: `0.5px solid ${LINE}`, overflow: "hidden" }}>
        <Thumb project={project} />
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <span style={{ display: "block", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: INK, letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: MANROPE }}>
          {project.title}
        </span>
        <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: DIM, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: WORK_SANS, marginTop: 8 }}>
          {project.tag}
        </span>
      </div>
    </>
  );
}

function CompactCard({ project }: { project: Project }) {
  return (
    <>
      <div style={{ borderRadius: 14, overflow: "hidden", border: `0.5px solid ${LINE}`, background: CARD }}>
        <Thumb project={project} />
      </div>
      <span style={{ display: "block", fontSize: 18, fontWeight: 700, color: INK, letterSpacing: "-0.02em", lineHeight: 1.2, fontFamily: MANROPE, marginTop: 12 }}>
        {project.title}
      </span>
    </>
  );
}

export default function MoreProjects({ exclude }: { exclude?: string }) {
  const projects = ALL.filter((p) => p.key !== exclude);

  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [glow, setGlow] = useState(0);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        setGlow(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onCarouselScroll = () => {
    const el = scrollerRef.current;
    if (!el || !el.children.length) return;
    const first = el.children[0] as HTMLElement;
    const advance = first.offsetWidth + 14;
    setActive(Math.round(el.scrollLeft / advance));
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const cardBase: React.CSSProperties = {
    background: CARD,
    border: `0.5px solid ${LINE}`,
    borderRadius: 16,
    overflow: "hidden",
    display: "block",
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const deskOffset = hovered !== null ? (hovered - (projects.length - 1) / 2) * 240 : (glow - 0.5) * 100;
  // softer glow: lower base + gentler scroll gain
  const deskOpacity = 0.03 + glow * 0.045 + (hovered !== null ? 0.035 : 0);

  const glowStyle: React.CSSProperties = isMobile
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 190,
        background: "radial-gradient(140% 190px at 50% 0%, rgba(205,254,136,1), rgba(205,254,136,0) 78%)",
        opacity: 0.045 + glow * 0.05,
        pointerEvents: "none",
      }
    : {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: `translateX(calc(-50% + ${deskOffset}px))`,
        width: "min(1000px, 100%)",
        height: 560,
        background: "radial-gradient(ellipse 62% 100% at 50% 0%, rgba(205,254,136,1), rgba(205,254,136,0) 78%)",
        opacity: deskOpacity,
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease",
        pointerEvents: "none",
      };

  return (
    <div
      style={{
        width: "100%",
        background: "#121212",
        boxSizing: "border-box",
        // center the panel instead of edge-to-edge
        maxWidth: isMobile ? "100%" : PANEL_MAXW,
        margin: "0 auto",
        padding: isMobile ? 0 : "0 48px",
      }}
    >
      <div
        id="more-projects"
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          background: PANEL,
          boxSizing: "border-box",
          borderTopLeftRadius: isMobile ? 0 : 40,
          borderTopRightRadius: isMobile ? 0 : 40,
          overflow: "hidden",
          padding: isMobile ? "56px 20px 80px" : "112px 48px 120px",
          marginTop: isMobile ? 0 : 64,
        }}
      >
        <div aria-hidden style={glowStyle} />
        {/* grain */}
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: NOISE_BG, backgroundRepeat: "repeat", opacity: 0.11, pointerEvents: "none", mixBlendMode: "overlay" }} />

        <div style={{ position: "relative" }}>
          <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: DIM, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: WORK_SANS, marginBottom: 20 }}>
            More Projects
          </span>

          <h2 style={{ fontSize: "clamp(26px, 2.2vw, 32px)", fontWeight: 600, color: INK, letterSpacing: "-0.02em", lineHeight: 1.3, margin: isMobile ? "0 0 32px 0" : "0 0 48px 0", maxWidth: 720, fontFamily: MANROPE }}>
            Explore more of my work
          </h2>

          {isMobile ? (
            <>
              <div
                ref={scrollerRef}
                onScroll={onCarouselScroll}
                className="mp-scroller"
                style={{ display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
              >
                {projects.map((p) => (
                  <Link key={p.key} href={p.href} style={{ flex: "0 0 85%", scrollSnapAlign: "start", textDecoration: "none", WebkitTapHighlightColor: "transparent" }}>
                    <CompactCard project={p} />
                  </Link>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 22 }}>
                {projects.map((_, i) => (
                  <span key={i} style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 999, background: i === active ? ACCENT : "#404040", transition: "width 0.25s ease, background 0.25s ease" }} />
                ))}
              </div>

              <style>{`.mp-scroller::-webkit-scrollbar { display: none; } .mp-scroller { scrollbar-width: none; -ms-overflow-style: none; }`}</style>
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 20, minHeight: 340 }}>
              {projects.map((p, i) => {
                const isHovered = hovered === i;
                const isDimmed = hovered !== null && !isHovered;
                const baseRotate = (i - (projects.length - 1) / 2) * 4;
                return (
                  <Link
                    key={p.key}
                    href={p.href}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    style={{
                      ...cardBase,
                      width: 320,
                      marginLeft: i === 0 ? 0 : -70,
                      transform: isHovered ? `translateY(-24px) rotate(0deg) scale(1.03)` : `translateY(0) rotate(${baseRotate}deg)`,
                      opacity: isDimmed ? 0.55 : 1,
                      zIndex: isHovered ? 10 : i,
                      boxShadow: isHovered ? "0 30px 80px rgba(0,0,0,0.55), 0 0 44px rgba(205,254,136,0.13)" : "0 10px 40px rgba(0,0,0,0.35)",
                      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease, box-shadow 0.4s ease",
                      transformOrigin: "bottom center",
                    }}
                  >
                    <CardInner project={p} />
                  </Link>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 56 : 96 }}>
            <button
              onClick={scrollToTop}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "none",
                border: `0.5px solid ${LINE}`,
                borderRadius: 999,
                padding: "12px 22px",
                cursor: "pointer",
                fontFamily: WORK_SANS,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: DIM,
                transition: "color 0.25s ease, border-color 0.25s ease",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = ACCENT; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = DIM; e.currentTarget.style.borderColor = LINE; }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
              Back to top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}