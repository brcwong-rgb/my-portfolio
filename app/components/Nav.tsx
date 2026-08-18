"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ContactReceipt from "./ContactReceipt";

const LINKEDIN_URL = "https://www.linkedin.com/in/brandon-wong-43449827a/";
const RESUME_URL = "/brandon-wong-resume.pdf";
const MOBILE_BREAKPOINT = 900;

// case-study routes — the dropdown only appears on these pages
const PROJECTS = [
  { key: "curve", label: "Curve Biosciences", href: "/curve" },
  { key: "hackdavis", label: "HackDavis", href: "/hackdavis" },
  { key: "treevah", label: "Treevah", href: "/treevah" },
  { key: "sjcc", label: "San Jose City College", href: "/sjcc" },
];
const PROJECT_ROUTES = PROJECTS.map((p) => p.href);

export default function Nav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"home" | "projects">("home");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const onCaseStudy = PROJECT_ROUTES.includes(pathname);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const measure = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({ left: r.left, top: r.bottom });
  }, []);

  useEffect(() => {
    if (!projectsOpen) return;
    measure();
    const onResize = () => measure();
    const onScroll = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [projectsOpen, measure]);

  useEffect(() => {
    if (!projectsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProjectsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [projectsOpen]);

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
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAction = (link: { type: string; target: string }) => {
    if (link.type === "home") goHome();
    else if (link.type === "section") goToSection(link.target);
    else if (link.type === "page") router.push(link.target);
    else if (link.type === "external") openExternal(link.target);
    else if (link.type === "contact") window.dispatchEvent(new Event("open-contact"));
    setMenuOpen(false);
    setProjectsOpen(false);
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
  const allLinks = [...row1, ...row2];

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

  const openProjects = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    measure();
    setProjectsOpen(true);
  };
  const scheduleCloseProjects = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProjectsOpen(false), 160);
  };

  const renderLink = (link: { label: string; type: string; target: string }) => {
    const hoverProps = {
      onMouseEnter: () => setHoveredLink(link.label),
      onMouseLeave: () => setHoveredLink(null),
      style: linkStyle(link),
    };

    // Projects: dropdown ONLY on case-study pages. Kept inline so it aligns with the other links.
    if (link.type === "section" && link.target === "projects" && onCaseStudy) {
      return (
        <span
          key={link.label}
          ref={triggerRef}
          role="button"
          tabIndex={0}
          aria-haspopup="menu"
          aria-expanded={projectsOpen}
          onMouseEnter={() => {
            setHoveredLink(link.label);
            openProjects();
          }}
          onMouseLeave={() => {
            setHoveredLink(null);
            scheduleCloseProjects();
          }}
          onClick={() => handleAction(link)}
          onFocus={openProjects}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleAction(link);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              openProjects();
              requestAnimationFrame(() => {
                const first = panelRef.current?.querySelector<HTMLElement>("[data-menuitem]");
                first?.focus();
              });
            }
          }}
          style={linkStyle(link)}
        >
          {link.label}
        </span>
      );
    }

    if (link.type === "page") {
      return (
        <Link key={link.label} href={link.target} {...hoverProps}>
          {link.label}
        </Link>
      );
    }

    return (
      <span key={link.label} onClick={() => handleAction(link)} {...hoverProps}>
        {link.label}
      </span>
    );
  };

  // Minimal dropdown — just the four names, portaled out of the blend-mode nav
  const projectsPortal =
    mounted && onCaseStudy && coords
      ? createPortal(
          <div
            ref={panelRef}
            role="menu"
            aria-label="Projects"
            onMouseEnter={openProjects}
            onMouseLeave={scheduleCloseProjects}
            style={{
              position: "fixed",
              top: coords.top + 12,
              left: coords.left,
              minWidth: 200,
              background: "rgba(20,20,20,0.88)",
              backdropFilter: "blur(16px) saturate(140%)",
              WebkitBackdropFilter: "blur(16px) saturate(140%)",
              border: "0.5px solid #2e2e2e",
              borderRadius: 12,
              padding: 5,
              boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
              opacity: projectsOpen ? 1 : 0,
              transform: projectsOpen ? "translateY(0)" : "translateY(-6px)",
              pointerEvents: projectsOpen ? "auto" : "none",
              transition: "opacity 0.2s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              fontFamily: "Manrope, sans-serif",
              zIndex: 9999,
            }}
          >
            {PROJECTS.map((p) => {
              const current = pathname === p.href;

              if (current) {
                return (
                  <div
                    key={p.key}
                    role="menuitem"
                    aria-current="page"
                    aria-disabled="true"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "#5c5c5c",
                      padding: "9px 12px",
                      cursor: "default",
                    }}
                  >
                    {p.label}
                  </div>
                );
              }

              return (
                <Link
                  key={p.key}
                  href={p.href}
                  role="menuitem"
                  data-menuitem
                  onClick={() => setProjectsOpen(false)}
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "#FAFAFA",
                    textDecoration: "none",
                    padding: "9px 12px",
                    borderRadius: 8,
                    transition: "background 0.16s ease",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {p.label}
                </Link>
              );
            })}
          </div>,
          document.body
        )
      : null;

  const frostLayer = (
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
  );

  // ---------- MOBILE / TABLET ----------
  if (isMobile) {
    return (
      <>
        {!menuOpen && frostLayer}

        <div
          style={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            background: "transparent",
            mixBlendMode: menuOpen ? "normal" : "difference",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
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

          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "Manrope, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "#FAFAFA",
              padding: 0,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "#121212",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 24px",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {allLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleAction(link)}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "Manrope, sans-serif",
                fontSize: "clamp(34px, 11vw, 60px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                color: isActive(link) ? "#707070" : "#FAFAFA",
                padding: "1px 0",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {link.label}
            </button>
          ))}

          <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#FAFAFA",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#FAFAFA",
                letterSpacing: "0.01em",
              }}
            >
              SF Bay Area
            </span>
          </div>
        </div>

        <ContactReceipt />
      </>
    );
  }

  // ---------- DESKTOP ----------
  return (
    <>
      {frostLayer}

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

      {projectsPortal}

      <ContactReceipt />
    </>
  );
}