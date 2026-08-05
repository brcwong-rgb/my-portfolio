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

function MetaRow({ title, tag, year }: { title: string; tag: string; year: string }) {
  const parts = tag.split("·").map((p) => p.trim()).filter(Boolean);
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
          <span key={part} style={chipStyle}>
            {part}
          </span>
        ))}
        <span style={{ width: 1, height: 18, background: "#404040", flexShrink: 0 }} />
        <span style={chipStyle}>{year}</span>
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

  return (
    <div className="card-slot">
      <Link href={project.href} style={{ textDecoration: "none" }}>
        <div
          ref={ref}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(50px)",
            transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            background: "#121212",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/10",
              background: "#1e1e1e",
              borderRadius: 4,
              border: "0.5px solid #2a2a2a",
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
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>

          <MetaRow title={project.title} tag={project.tag} year={project.year} />
        </div>
      </Link>
    </div>
  );
}

function ShowreelCard({ index }: { index: number }) {
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
          background: "#121212",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "21/9",
            background: "#1e1e1e",
            borderRadius: 4,
            border: "0.5px solid #2a2a2a",
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

        <MetaRow title="Showreel" tag="Motion" year="2026" />
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
    },
    {
      title: "HackDavis",
      tag: "UX/UI · Mobile",
      year: "2025",
      href: "/hackdavis",
      video: "/hackdavis.mp4",
      hoverStart: 0.7,
      mobileFrame: 0.7,
    },
    {
      title: "Treevah",
      tag: "UX/UI · AI Integration",
      year: "2025",
      href: "/treevah",
      video: "/treevah.mp4",
      mobileFrame: 1,
    },
    {
      title: "San Jose City College",
      tag: "Motion · Video Production",
      year: "2023",
      href: "/sjcc",
      video: "/sjcc.mp4",
      posterTime: 0.9,
      mobileFrame: 1,
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
            row-gap: 0;
            padding: 40px 20px 80px;
          }
          .card-slot {
            position: sticky;
            top: 80px;
            padding-bottom: 56px;
          }
          .card-meta { padding-top: 16px; gap: 12px; }
          .card-meta > span:first-child { font-size: 24px; }
        }
        @media (max-width: 520px) {
          .card-meta { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} isMobile={isMobile} />
      ))}
      <ShowreelCard index={5} />
    </div>
  );
}