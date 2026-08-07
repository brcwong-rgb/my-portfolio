"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const MOBILE_BREAKPOINT = 900;

type Project = {
  title: string;
  tag: string;
  year: string;
  href: string;
  video: string;
  posterTime?: number;
  hoverStart?: number;
  mobileFrame?: number;
  blurb?: string;    // short one-line description (mobile)
  readTime?: string; // e.g. "4 min read" (mobile)
};

const chipStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  background: "#1e1e1e",
  border: "0.5px solid #2a2a2a",
  borderRadius: 999,
  padding: "6px 14px",
  fontSize: 11,
  fontWeight: 600,
  color: "#D4D4D4",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

const chipStyleOnCard: React.CSSProperties = {
  ...chipStyle,
  background: "#242424",
  border: "0.5px solid #333",
};

function MetaRow({
  title,
  tag,
  year,
  onCard,
}: {
  title: string;
  tag: string;
  year: string;
  onCard?: boolean;
}) {
  const parts = tag.split("·").map((p) => p.trim()).filter(Boolean);
  const chip = onCard ? chipStyleOnCard : chipStyle;
  return (
    <div className="card-meta">
      <span
        style={{
          fontSize: "clamp(22px, 2.2vw, 34px)",
          fontWeight: 800,
          color: "#FAFAFA",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        {parts.map((part) => (
          <span key={part} style={chip}>
            {part}
          </span>
        ))}
        <span style={{ width: 1, height: 18, background: "#404040", flexShrink: 0 }} />
        <span style={chip}>{year}</span>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  isMobile,
}: {
  project: Project;
  index: number;
  isMobile: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const posterTime = project.posterTime;
  const hasPoster = typeof posterTime === "number";
  const hoverStart =
    typeof project.hoverStart === "number" ? project.hoverStart : 0;
  const mobileFrame =
    typeof project.mobileFrame === "number" ? project.mobileFrame : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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

  const handleEnter = () => {
    if (isMobile) return;
    setHovered(true);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = hoverStart;
    v.play().catch(() => {});
  };

  const handleLeave = () => {
    if (isMobile) return;
    setHovered(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = hasPoster ? (posterTime as number) : 0;
  };

  const desktopSrc = hasPoster
    ? `${project.video}#t=${posterTime}`
    : project.video;
  const mobileSrc = `${project.video}#t=${mobileFrame}`;

  const cardStyle: React.CSSProperties = isMobile
    ? {
        background: "#1e1e1e",
        border: "0.5px solid #2a2a2a",
        borderRadius: 16,
        overflow: "hidden",
      }
    : {};

  const entranceTransform = visible ? "translateY(0px)" : "translateY(50px)";
  const mobileTiltTransform = `perspective(1200px) rotateX(${tilt}deg)`;

  return (
    <div
      className="card-slot"
      style={isMobile ? { perspective: 1200 } : undefined}
    >
      <Link href={project.href} style={{ textDecoration: "none" }}>
        <div
          ref={ref}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{
            opacity: visible ? 1 : 0,
            transform: isMobile
              ? `${mobileTiltTransform} ${entranceTransform}`
              : entranceTransform,
            transformOrigin: "center center",
            transition: isMobile
              ? `opacity 0.8s ease ${index * 0.15}s, transform 0.2s ease-out`
              : `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            willChange: isMobile ? "transform" : undefined,
            ...cardStyle,
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/10",
              background: "#1e1e1e",
              borderRadius: isMobile ? 0 : 4,
              border: isMobile ? "none" : "0.5px solid #2a2a2a",
              borderBottom: isMobile ? "0.5px solid #2a2a2a" : undefined,
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

          <div style={isMobile ? { padding: "0 14px 14px 14px" } : undefined}>
            <MetaRow
              title={project.title}
              tag={project.tag}
              year={project.year}
              onCard={isMobile}
            />

            {/* mobile-only: short blurb + read time */}
            {isMobile && (project.blurb || project.readTime) && (
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

function ShowreelCard({ index, isMobile }: { index: number; isMobile: boolean }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cardStyle: React.CSSProperties = isMobile
    ? {
        background: "#1e1e1e",
        border: "0.5px solid #2a2a2a",
        borderRadius: 16,
        overflow: "hidden",
      }
    : {};

  return (
    <div className="card-slot showreel-slot">
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(50px)",
          transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
          display: "flex",
          flexDirection: "column",
          ...cardStyle,
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "21/9",
            background: "#1e1e1e",
            borderRadius: isMobile ? 0 : 4,
            border: isMobile ? "none" : "0.5px solid #2a2a2a",
            borderBottom: isMobile ? "0.5px solid #2a2a2a" : undefined,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#CDFE88",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#CDFE88",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Coming Soon
            </span>
          </div>

          <span
            style={{
              fontSize: "clamp(20px, 3vw, 34px)",
              fontWeight: 800,
              color: "#FAFAFA",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Showreel in the works
          </span>

          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#757575",
              letterSpacing: "0.01em",
              textAlign: "center",
              maxWidth: 380,
              padding: "0 24px",
            }}
          >
            A motion reel is currently in production. Check back soon.
          </span>
        </div>

        <div style={isMobile ? { padding: "0 14px 14px 14px" } : undefined}>
          <MetaRow title="Showreel" tag="Motion" year="2026" onCard={isMobile} />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
      readTime: "4 min read",
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
          row-gap: 104px;
          padding: 48px 48px 120px;
        }
        .showreel-slot { grid-column: 1 / -1; }
        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 4px 0 4px;
        }
        @media (max-width: 1100px) {
          .projects-grid { row-gap: 80px; }
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

      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} isMobile={isMobile} />
      ))}
      <ShowreelCard index={5} isMobile={isMobile} />
    </div>
  );
}