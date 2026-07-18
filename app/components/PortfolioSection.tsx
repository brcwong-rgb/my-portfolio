"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID";
const MOBILE_BREAKPOINT = 768;
const STICKY_TOP = 72; // px — where cards pin, below the fixed nav
const STACK_GAP = 40; // px — vertical space between stacked cards
const FOLD_SCALE = 0.08; // how much a covered card shrinks
const FOLD_DIM = 0.45; // how much a covered card darkens

type Project = {
  title: string;
  tag: string;
  href: string;
  video: string;
  posterTime?: number; // seconds — frame shown before hover
  hoverStart?: number; // seconds — where playback begins on hover
};

function Chip({ label }: { label: string }) {
  return (
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
      {label}
    </span>
  );
}

function TagChips({ tag }: { tag: string }) {
  const parts = tag.split("·").map((p) => p.trim()).filter(Boolean);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
      {parts.map((part) => (
        <Chip key={part} label={part} />
      ))}
    </div>
  );
}

function CardMeta({
  title,
  children,
  large = false,
}: {
  title: string;
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div style={{ padding: "16px 4px 0 4px" }}>
      {children}
      <span
        style={{
          fontSize: large ? "clamp(22px, 6vw, 32px)" : "clamp(18px, 2vw, 28px)",
          fontWeight: 800,
          color: "#FAFAFA",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          display: "block",
        }}
      >
        {title}
      </span>
    </div>
  );
}

/* ---------- DESKTOP ---------- */

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
        <CardMeta title={project.title}>
          <TagChips tag={project.tag} />
        </CardMeta>
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
      <CardMeta title="Showreel">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          <Chip label="Motion" />
          <Chip label="Coming Soon!" />
        </div>
      </CardMeta>
    </div>
  );
}

/* ---------- MOBILE ---------- */

const mobileFrame: React.CSSProperties = {
  width: "100%",
  aspectRatio: "16/10",
  background: "#1e1e1e",
  borderRadius: 10,
  border: "0.5px solid #2a2a2a",
  overflow: "hidden",
  position: "relative",
};

function MobileProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const posterTime = project.posterTime;
  const hasPoster = typeof posterTime === "number";

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link href={project.href} style={{ textDecoration: "none" }}>
      <div
        ref={wrapRef}
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#121212",
          paddingBottom: 8,
        }}
      >
        <div style={mobileFrame}>
          <video
            ref={videoRef}
            src={hasPoster ? `${project.video}#t=${posterTime}` : project.video}
            loop
            muted
            playsInline
            autoPlay
            preload="metadata"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              display: "block",
            }}
          />
        </div>
        <CardMeta title={project.title} large>
          <TagChips tag={project.tag} />
        </CardMeta>
      </div>
    </Link>
  );
}

function MobileShowreelCard() {
  return (
    <div
      onClick={() => window.open(YOUTUBE_URL, "_blank")}
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        background: "#121212",
        paddingBottom: 8,
      }}
    >
      <div
        style={{
          ...mobileFrame,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FAFAFA">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <CardMeta title="Showreel" large>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          <Chip label="Motion" />
          <Chip label="Coming Soon!" />
        </div>
      </CardMeta>
    </div>
  );
}

function MobileStack({ projects }: { projects: Project[] }) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [folds, setFolds] = useState<number[]>([]);
  const total = projects.length + 1; // + showreel

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const els = itemRefs.current;
      const next = els.map((el, i) => {
        const following = els[i + 1];
        if (!el || !following) return 0;
        const span = el.offsetHeight + STACK_GAP;
        if (span <= 0) return 0;
        const followingTop = following.getBoundingClientRect().top;
        const p = (STICKY_TOP + span - followingTop) / span;
        return Math.min(1, Math.max(0, p));
      });
      setFolds(next);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [total]);

  const items = [
    ...projects.map((p) => <MobileProjectCard key={p.title} project={p} />),
    <MobileShowreelCard key="showreel" />,
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: STACK_GAP }}>
      {items.map((item, i) => {
        const fold = folds[i] ?? 0;
        return (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            style={{
              position: "sticky",
              top: STICKY_TOP,
              zIndex: i + 1,
              transform: `scale(${1 - FOLD_SCALE * fold})`,
              opacity: 1 - FOLD_DIM * fold,
              transformOrigin: "50% 0%",
              willChange: "transform, opacity",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- ROOT ---------- */

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

  if (isMobile) {
    return (
      <div
        id="projects"
        style={{
          width: "100%",
          background: "#121212",
          padding: "40px clamp(20px, 4vw, 48px) 120px",
          boxSizing: "border-box",
        }}
      >
        <MobileStack projects={projects} />
      </div>
    );
  }

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