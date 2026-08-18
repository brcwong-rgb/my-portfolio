"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const MOBILE_BREAKPOINT = 900;

// match the hero's entrance trigger
const START_EVENT = "site:loaded";
const FALLBACK_MS = 1500;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type Project = {
  title: string;
  tag: string;
  year: string;
  href: string;
  video: string;
  posterTime?: number;
  hoverStart?: number;
  mobileFrame?: number;
  blurb?: string;
  readTime?: string;
};

const chipStyleOnCard: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  background: "#242424",
  border: "0.5px solid #333",
  borderRadius: 999,
  padding: "6px 14px",
  fontSize: 11,
  fontWeight: 600,
  color: "#D4D4D4",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

function MetaRow({ title, tag, year }: { title: string; tag: string; year: string }) {
  const parts = tag.split("·").map((p) => p.trim()).filter(Boolean);
  return (
    <div className="card-meta">
      <span
        className="card-title"
        style={{
          fontSize: "clamp(22px, 2.2vw, 34px)",
          fontWeight: 800,
          color: "#FAFAFA",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "flex-end",
          flexShrink: 0,
        }}
      >
        {parts.map((part) => (
          <span key={part} style={chipStyleOnCard}>
            {part}
          </span>
        ))}
        <span style={{ width: 1, height: 18, background: "#404040", flexShrink: 0 }} />
        <span style={chipStyleOnCard}>{year}</span>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  entered,
  isMobile,
  onCardEnter,
  onCardLeave,
}: {
  project: Project;
  index: number;
  entered: boolean;
  isMobile: boolean;
  onCardEnter: () => void;
  onCardLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const posterTime = project.posterTime;
  const hasPoster = typeof posterTime === "number";
  const hoverStart =
    typeof project.hoverStart === "number" ? project.hoverStart : 0;
  const mobileFrame =
    typeof project.mobileFrame === "number" ? project.mobileFrame : 0;

  useEffect(() => {
    if (!isMobile) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        const clamped = Math.max(-1, Math.min(1, progress));
        setTilt(clamped * 6);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const MAX = 5;
    setMouseTilt({
      x: (0.5 - py) * MAX * 2,
      y: (px - 0.5) * MAX * 2,
    });
  };

  const handleEnter = () => {
    if (isMobile) return;
    setHovered(true);
    onCardEnter();
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = hoverStart;
    v.play().catch(() => {});
  };

  const handleLeave = () => {
    if (isMobile) return;
    setHovered(false);
    setMouseTilt({ x: 0, y: 0 });
    onCardLeave();
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = hasPoster ? (posterTime as number) : 0;
  };

  const desktopSrc = hasPoster
    ? `${project.video}#t=${posterTime}`
    : project.video;
  const mobileSrc = `${project.video}#t=${mobileFrame}`;

  const cardStyle: React.CSSProperties = {
    background: "#1e1e1e",
    border: "0.5px solid #2a2a2a",
    borderRadius: 16,
    overflow: "hidden",
  };

  // one-time entrance (on first load, same as hero) — never re-triggers on scroll
  const entranceTransform = entered ? "translateY(0px)" : "translateY(24px)";
  const mobileTiltTransform = `perspective(1200px) rotateX(${tilt}deg)`;
  const desktopTiltTransform = `perspective(1000px) rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`;

  return (
    <div className="card-slot" style={{ perspective: isMobile ? 1200 : 1000 }}>
      <Link href={project.href} style={{ textDecoration: "none" }}>
        <div
          ref={ref}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseMove={handleMouseMove}
          style={{
            opacity: entered ? 1 : 0,
            transform: isMobile
              ? `${mobileTiltTransform} ${entranceTransform}`
              : `${desktopTiltTransform} ${entranceTransform}`,
            transformOrigin: "center center",
            transition: isMobile
              ? `opacity 0.6s ${EASE} ${0.2 + index * 0.08}s, transform 0.2s ease-out`
              : `opacity 0.6s ${EASE} ${0.2 + index * 0.08}s, transform 0.25s ease-out`,
            display: "flex",
            flexDirection: "column",
            cursor: isMobile ? "pointer" : "none",
            willChange: "transform, opacity",
            ...cardStyle,
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/10",
              background: "#1e1e1e",
              borderBottom: "0.5px solid #2a2a2a",
              overflow: "hidden",
            }}
          >
            <video
              ref={videoRef}
              src={isMobile ? mobileSrc : desktopSrc}
              loop={!isMobile}
              muted
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 50%",
                display: "block",
                transform: !isMobile && hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>

          <div style={{ padding: "0 18px 18px 18px" }}>
            <MetaRow title={project.title} tag={project.tag} year={project.year} />

            {(project.blurb || project.readTime) && (
              <div style={{ paddingTop: 2 }}>
                {project.blurb && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      lineHeight: 1.45,
                      fontWeight: 500,
                      color: "#8A8A8A",
                      letterSpacing: "0.005em",
                    }}
                  >
                    {project.blurb}
                  </p>
                )}
                {project.readTime && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#CDFE88",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#707070",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.readTime}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function PortfolioSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [entered, setEntered] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  // one-time entrance trigger — same event + fallback as the hero
  useEffect(() => {
    let fired = false;
    const go = () => {
      if (fired) return;
      fired = true;
      setEntered(true);
    };
    window.addEventListener(START_EVENT, go);
    const fb = setTimeout(go, FALLBACK_MS);
    return () => {
      window.removeEventListener(START_EVENT, go);
      clearTimeout(fb);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      posRef.current.x += (target.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (target.current.y - posRef.current.y) * 0.18;
      const d = dotRef.current;
      if (d) {
        d.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%) scale(${cursorActive ? 1 : 0})`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, cursorActive]);

  const projects: Project[] = [
    {
      title: "Curve Biosciences",
      tag: "Digital Design",
      year: "2026",
      href: "/curve",
      video: "/curve.mp4",
      posterTime: 6.5,
      mobileFrame: 7.9,
      blurb: "Translating complex life-science research into clear experiences for patients, providers, and labs.",
      readTime: "3 min read",
    },
    {
      title: "HackDavis",
      tag: "UX/UI · Mobile",
      year: "2025",
      href: "/hackdavis",
      video: "/hackdavis.mp4",
      hoverStart: 0.7,
      mobileFrame: 0.7,
      blurb: "A judging app built for speed, tested live with judges scoring 100+ projects in a day.",
      readTime: "5 min read",
    },
    {
      title: "Treevah",
      tag: "UX/UI · AI Integration",
      year: "2025",
      href: "/treevah",
      video: "/treevah.mp4",
      mobileFrame: 1,
      blurb: "Bringing trust and structure to AI-assisted file management.",
      readTime: "4 min read",
    },
    {
      title: "San Jose City College",
      tag: "Motion · Video Production",
      year: "2023",
      href: "/sjcc",
      video: "/sjcc.mp4",
      posterTime: 0.9,
      mobileFrame: 1,
      blurb: "A promotional video for the Basic Needs department, from concept to final cut.",
      readTime: "2 min watch",
    },
  ];

  return (
    <div
      id="projects"
      className="projects-grid"
      style={{ width: "100%", background: "#121212", boxSizing: "border-box" }}
    >
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 32px;
          row-gap: 48px;
          padding: 48px 48px 120px;
        }
        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0 12px 0;
        }
        .card-title {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 1100px) {
          .projects-grid { row-gap: 40px; }
        }
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr;
            row-gap: 28px;
            padding: 40px 20px 80px;
          }
          .card-slot { position: static; }
          .card-meta { padding: 16px 0 12px 0; gap: 12px; }
          .card-meta > span:first-child { font-size: 24px; }
        }
        @media (max-width: 520px) {
          .card-meta { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {!isMobile && (
        <div
          ref={dotRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#FAFAFA",
            pointerEvents: "none",
            zIndex: 9999,
            mixBlendMode: "difference",
            transform: "translate(-50%, -50%) scale(0)",
            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
            willChange: "transform",
          }}
        />
      )}

      {projects.map((p, i) => (
        <ProjectCard
          key={p.title}
          project={p}
          index={i}
          entered={entered}
          isMobile={isMobile}
          onCardEnter={() => setCursorActive(true)}
          onCardLeave={() => setCursorActive(false)}
        />
      ))}
    </div>
  );
}