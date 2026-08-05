"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ContactReceipt from "./ContactReceipt";

const LINKEDIN_URL = "https://www.linkedin.com/in/brandon-wong-43449827a/";
const RESUME_URL = "/brandon-wong-resume.pdf";

export default function Nav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"home" | "projects">("home");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const onScroll = () => {
      const projectsEl = document.getElementById("projects");
      if (!projectsEl) {
        setActiveSection("home");
        return;
      }
      const top = projectsEl.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.4) {
        setActiveSection("projects");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const goToSection = (id: string) => {
    if (pathname === "/") {
      scrollToId(id);
    } else {
      router.push("/#" + id);
    }
  };

  const openExternal = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const row1 = [
    { label: "Home,", type: "home", target: "" },
    { label: "Projects,", type: "section", target: "projects" },
    { label: "Showreel,", type: "page", target: "/showreel" },
  ];
  const row2 = [
    { label: "About,", type: "page", target: "/about" },
    { label: "LinkedIn,", type: "external", target: LINKEDIN_URL },
    { label: "Resume,", type: "external", target: RESUME_URL },
    { label: "Contact", type: "contact", target: "" },
  ];

  const isActive = (link: { type: string; target: string }) => {
    if (pathname === "/") {
      if (link.type === "home") return activeSection === "home";
      if (link.type === "section" && link.target === "projects")
        return activeSection === "projects";
      return false;
    }
    if (link.type === "page") return pathname === link.target;
    return false;
  };

  const linkStyle = (link: { label: string; type: string; target: string }) => {
    const active = isActive(link);
    let opacity: number;
    if (hoveredLink !== null) {
      opacity = hoveredLink === link.label ? 1 : 0.5;
    } else {
      opacity = active ? 1 : 0.5;
    }
    return {
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap" as const,
      letterSpacing: "0.01em",
      paddingRight: 4,
      textDecoration: "none",
      transition: "opacity 0.25s ease",
      color: "#FAFAFA",
      opacity,
    };
  };

  const renderLink = (link: { label: string; type: string; target: string }) => {
    const hoverProps = {
      onMouseEnter: () => setHoveredLink(link.label),
      onMouseLeave: () => setHoveredLink(null),
      style: linkStyle(link),
    };

    if (link.type === "page") {
      return (
        <Link key={link.label} href={link.target} {...hoverProps}>
          {link.label}
        </Link>
      );
    }

    return (
      <span
        key={link.label}
        onClick={() => {
          if (link.type === "home") {
            goHome();
          } else if (link.type === "section") {
            goToSection(link.target);
          } else if (link.type === "external") {
            openExternal(link.target);
          } else if (link.type === "contact") {
            window.dispatchEvent(new Event("open-contact"));
          }
        }}
        {...hoverProps}
      >
        {link.label}
      </span>
    );
  };

  return (
    <>
      {/* faint frost backing layer — sits behind the blend-mode nav, very subtle */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 92,
          zIndex: 99,
          pointerEvents: "none",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          background:
            "linear-gradient(to bottom, rgba(18,18,18,0.28) 0%, rgba(18,18,18,0.10) 60%, rgba(18,18,18,0) 100%)",
          maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
        }}
      />

      <div
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          background: "transparent",
          mixBlendMode: "difference",
          display: "grid",
          gridTemplateColumns: "2fr 1fr auto",
          alignItems: "center",
          padding: "20px 48px",
          boxSizing: "border-box",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#FAFAFA",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          (UX + Motion Designer)
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <div style={{ display: "flex", gap: 0 }}>{row1.map(renderLink)}</div>
          <div style={{ display: "flex", gap: 0 }}>{row2.map(renderLink)}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#FAFAFA",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
            }}
          >
            SF Bay Area
          </span>
          <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
            <div
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#FAFAFA",
                animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#FAFAFA",
              }}
            />
          </div>
        </div>

        <style>{`@keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 75%, 100% { transform: scale(2.5); opacity: 0; } }`}</style>
      </div>

      <ContactReceipt />
    </>
  );
}