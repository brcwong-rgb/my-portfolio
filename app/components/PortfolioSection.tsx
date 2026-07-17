"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID";

type Project = {
  title: string;
  tag: string;
  href: string;
  video: string;
  posterTime?: number; // seconds — frame shown before hover
  hoverStart?: number; // seconds — where playback begins on hover
};

function TagChips({ tag }: { tag: string }) {
  const parts = tag.split("·").map((p) => p.trim()).filter(Boolean);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
      {parts.map((part) => (
        <span
          key={part}
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "#1e1e1e",
            border: "0.5px solid #2a2a2a",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 10,
            fontWeight: 600,
            color: "#D4D4D4",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {part}
        </span>
      ))}
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
        <div style={{ padding: "16px 4px 0 4px" }}>
          <TagChips tag={project.tag} />
          <span
            style={{
              fontSize: "clamp(18px, 2vw, 28px)",
              fontWeight: 800,
              color: "#FAFAFA",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              display: "block",
            }}
          >
            {project.title}
          </span>
        </div>
      </div>
    </Link>
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
    <div
      ref={ref}
      style={{
        gridColumn: "1 / -1",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(50px)",
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
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
      <div style={{ padding: "16px 4px 0 4px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#1e1e1e",
              border: "0.5px solid #2a2a2a",
              borderRadius: 999,
              padding: "4px 10px",
              fontSize: 10,
              fontWeight: 600,
              color: "#D4D4D4",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Motion
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#1e1e1e",
              border: "0.5px solid #2a2a2a",
              borderRadius: 999,
              padding: "4px 10px",
              fontSize: 10,
              fontWeight: 600,
              color: "#D4D4D4",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Coming Soon!
          </span>
        </div>
        <span
          style={{
            fontSize: "clamp(18px, 2vw, 28px)",
            fontWeight: 800,
            color: "#FAFAFA",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            display: "block",
          }}
        >
          Showreel
        </span>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const projects: Project[] = [
    {
      title: "Curve Biosciences",
      tag: "Digital Design",
      href: "/curve",
      video: "/curve.mp4",
      posterTime: 6.5,
    },
    {
      title: "Treevah",
      tag: "UX/UI · AI Integration",
      href: "/treevah",
      video: "/treevah.mp4",
    },
    {
      title: "HackDavis",
      tag: "UX/UI · Mobile",
      href: "/hackdavis",
      video: "/hackdavis.mp4",
      hoverStart: 0.7,
    },
    {
      title: "San Jose City College",
      tag: "Motion · Video Production",
      href: "/sjcc",
      video: "/sjcc.mp4",
      posterTime: 0.9,
    },
  ];

  return (
    <div
      id="projects"
      style={{
        width: "100%",
        background: "#121212",
        padding: "80px 48px",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
      }}
    >
      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} />
      ))}
      <ShowreelCard index={5} />
    </div>
  );
}