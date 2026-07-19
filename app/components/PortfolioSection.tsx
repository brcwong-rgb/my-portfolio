"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID";
const MOBILE_BREAKPOINT = 768;
const STICKY_TOP = 72; // px — where cards pin, below the fixed nav
const STACK_GAP = 40; // px — vertical space between stacked cards
const FOLD_SCALE = 0.08; // how much a covered card shrinks
const FOLD_DIM = 0.45; // how much a covered card darkens
const COVERED_AT = 0.5; // fold value past which a card counts as buried

type Project = {
  title: string;
  tag: string;
  year: string;
  href: string;
  video: string;
  posterTime?: number; // seconds — the frame held before playback
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
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}

/* One-line meta row: title ......... chips │ year */
function MetaRow({
  title,
  chips,
  year,
  large = false,
}: {
  title: string;
  chips: string[];
  year?: string;
  large?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: 12,
        padding: "16px 4px 0 4px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontSize: large ? "clamp(17px, 4.6vw, 24px)" : "clamp(18px, 2vw, 28px)",
          fontWeight: 800,
          color: "#FAFAFA",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: 0,
          flexShrink: 1,
        }}
      >
        {title}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginLeft: "auto",
          flexShrink: 0,
        }}
      >
        {chips.map((c) => (
          <Chip key={c} label={c} />
        ))}

        {year && (
          <>
            <span
              style={{
                width: 1,
                height: 14,
                background: "#2a2a2a",
                flexShrink: 0,
                margin: "0 2px",
              }}
            />
            <Chip label={year} />
          </>
        )}
      </div>
    </div>
  );
}

/* Holds a still frame from the video without needing a poster file. */
function usePosterFrame(posterTime: number) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const seek = () => {
      try {
        // A tiny offset avoids browsers that render nothing at exactly 0.
        v.currentTime = posterTime > 0 ? posterTime : 0.05;
      } catch {}
    };

    if (v.readyState >= 1) seek();
    else v.addEventListener("loadedmetadata", seek, { once: true });

    return () => v.removeEventListener("loadedmetadata", seek);
  }, [posterTime]);

  return videoRef;
}

const splitTags = (tag: string) =>
  tag.split("·").map((p) => p.trim()).filter(Boolean);

const openReel = () => window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer");

const videoStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "50% 50%",
  display: "block",
};

/* ---------- DESKTOP ---------- */

function ProjectCard({ project }: { project: Project }) {
  const posterTime = project.posterTime ?? 0;
  const videoRef = usePosterFrame(posterTime);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    try {
      v.currentTime = posterTime > 0 ? posterTime : 0.05;
    } catch {}
  };

  return (
    <Link href={project.href} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
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
            src={project.video}
            loop
            muted
            playsInline
            preload="metadata"
            style={{
              ...videoStyle,
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
        <MetaRow
          title={project.title}
          chips={splitTags(project.tag)}
          year={project.year}
        />
      </div>
    </Link>
  );
}

function ShowreelCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Watch the showreel on YouTube"
      onClick={openReel}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openReel();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: "1 / -1",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
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
            transform: hovered ? "scale(1)" : "scale(0.85)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FAFAFA">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <MetaRow title="Showreel" chips={["Motion", "Coming Soon"]} />
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

function MobileProjectCard({
  project,
  covered,
}: {
  project: Project;
  covered: boolean;
}) {
  const posterTime = project.posterTime ?? 0;
  const videoRef = usePosterFrame(posterTime);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Only the card you're actually looking at is allowed to decode.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !covered) v.play().catch(() => {});
    else v.pause();
  }, [inView, covered, videoRef]);

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
            src={project.video}
            loop
            muted
            playsInline
            preload="metadata"
            style={videoStyle}
          />
        </div>
        <MetaRow
          title={project.title}
          chips={splitTags(project.tag)}
          year={project.year}
          large
        />
      </div>
    </Link>
  );
}

function MobileShowreelCard() {
  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Watch the showreel on YouTube"
      onClick={openReel}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openReel();
        }
      }}
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
      <MetaRow title="Showreel" chips={["Motion", "Coming Soon"]} large />
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: STACK_GAP }}>
      {projects.map((p, i) => {
        const fold = folds[i] ?? 0;
        return (
          <div
            key={p.title}
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
            <MobileProjectCard project={p} covered={fold > COVERED_AT} />
          </div>
        );
      })}

      <div
        ref={(el) => {
          itemRefs.current[projects.length] = el;
        }}
        style={{
          position: "sticky",
          top: STICKY_TOP,
          zIndex: projects.length + 1,
          transformOrigin: "50% 0%",
        }}
      >
        <MobileShowreelCard />
      </div>
    </div>
  );
}

/* ---------- ROOT ---------- */

export default function PortfolioSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    },
    {
      title: "HackDavis",
      tag: "UX/UI · Mobile",
      year: "2025",
      href: "/hackdavis",
      video: "/hackdavis.mp4",
      posterTime: 0.7,
    },
    {
      title: "Treevah",
      tag: "UX/UI · AI Integration",
      year: "2024",
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

  if (mounted && isMobile) {
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
      {projects.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
      <ShowreelCard />
    </div>
  );
}