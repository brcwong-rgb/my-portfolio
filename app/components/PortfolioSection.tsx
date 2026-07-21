"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID";

type Project = {
  title: string;
  tag: string;
  year: string;
  href: string;
  video: string;
  posterTime?: number; // seconds — frame shown before hover
  hoverStart?: number; // seconds — where playback begins on hover
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {parts.map((part) => (
          <span key={part} style={chipStyle}>
            {part}
          </span>
        ))}
        <span
          style={{
            width: 1,
            height: 18,
            background: "#404040",
            flexShrink: 0,
          }}
        />
        <span style={chipStyle}>{year}</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const posterTime = project.posterTime;
  const hasPoster = typeof posterTime === "number";
  const hoverStart =
    typeof project.hoverStart === "number" ? project.hoverStart : 0;

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
    setHovered(true);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = hoverStart;
    v.play().catch(() => {});
  };

  const handleLeave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = hasPoster ? (posterTime as number) : 0;
  };

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
              src={hasPoster ? `${project.video}#t=${posterTime}` : project.video}
              loop
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
  const [hovered, setHovered] = useState(false);
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
          cursor: "pointer",
          background: "#121212",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => window.open(YOUTUBE_URL, "_blank")}
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#333",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Showreel Thumbnail
          </span>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: "1.5px solid #FAFAFA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: hovered ? "scale(1)" : "scale(0.85)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FAFAFA">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </div>

        <MetaRow title="Showreel" tag="Motion" year="2026" />
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const projects: Project[] = [
    {
      title: "Curve Biosciences",
      tag: "Digital Design",
      year: "2026",
      href: "/curve",
      video: "/curve.mp4",
      posterTime: 6.5,
    },
    {
      title: "HackDavis",
      tag: "UX/UI · Mobile",
      year: "2025",
      href: "/hackdavis",
      video: "/hackdavis.mp4",
      hoverStart: 0.7,
    },
    {
      title: "Treevah",
      tag: "UX/UI · AI Integration",
      year: "2025",
      href: "/treevah",
      video: "/treevah.mp4",
    },
    {
      title: "San Jose City College",
      tag: "Motion · Video Production",
      year: "2023",
      href: "/sjcc",
      video: "/sjcc.mp4",
      posterTime: 0.9,
    },
  ];

  return (
    <div
      id="projects"
      className="projects-grid"
      style={{
        width: "100%",
        background: "#121212",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 32px;
          row-gap: 104px;
          padding: 96px 48px 120px;
        }

        .showreel-slot {
          grid-column: 1 / -1;
        }

        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 4px 0 4px;
        }

        @media (max-width: 1100px) {
          .projects-grid {
            row-gap: 80px;
          }
        }

        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr;
            row-gap: 0;
            padding: 56px 20px 80px;
          }

          /* each card sticks, the next one slides over it */
          .card-slot {
            position: sticky;
            top: 80px;
            padding-bottom: 56px;
          }

          .card-meta {
            padding-top: 16px;
            gap: 12px;
          }

          .card-meta > span:first-child {
            font-size: 24px;
          }
        }

        @media (max-width: 520px) {
          .card-meta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} />
      ))}
      <ShowreelCard index={5} />
    </div>
  );
}