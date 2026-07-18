"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ContactReceipt from "./ContactReceipt";

const LINKEDIN_URL = "https://www.linkedin.com/in/brandon-wong-43449827a/";
const RESUME_URL = "/brandon-wong-resume.pdf";
const MOBILE_BREAKPOINT = 768;

type NavLink = { label: string; type: string; target: string };

export default function Nav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close the menu if the viewport grows back to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // lock scroll + escape to close while the menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

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

  const row1: NavLink[] = [
    { label: "Home,", type: "home", target: "" },
    { label: "Projects,", type: "section", target: "projects" },
    { label: "Showreel,", type: "page", target: "/showreel" },
  ];
  const row2: NavLink[] = [
    { label: "About,", type: "page", target: "/about" },
    { label: "LinkedIn,", type: "external", target: LINKEDIN_URL },
    { label: "Resume,", type: "external", target: RESUME_URL },
    { label: "Contact", type: "contact", target: "" },
  ];
  const allLinks: NavLink[] = [...row1, ...row2];

  const activateLink = (link: NavLink) => {
    if (link.type === "home") {
      goHome();
    } else if (link.type === "section") {
      goToSection(link.target);
    } else if (link.type === "external") {
      openExternal(link.target);
    } else if (link.type === "page") {
      router.push(link.target);
    } else if (link.type === "contact") {
      window.dispatchEvent(new Event("open-contact"));
    }
  };

  const isCurrent = (link: NavLink) => {
    if (link.type === "home") return pathname === "/";
    if (link.type === "page") return pathname === link.target;
    return false;
  };

  const linkStyle = (label: string) => ({
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    letterSpacing: "0.01em",
    paddingRight: 4,
    textDecoration: "none",
    transition: "color 0.2s ease",
    color:
      hoveredLink === null
        ? "#FAFAFA"
        : hoveredLink === label
        ? "#FAFAFA"
        : "#707070",
  });

  const renderLink = (link: NavLink) => {
    const hoverProps = {
      onMouseEnter: () => setHoveredLink(link.label),
      onMouseLeave: () => setHoveredLink(null),
      style: linkStyle(link.label),
    };

    if (link.type === "page") {
      return (
        <Link key={link.label} href={link.target} {...hoverProps}>
          {link.label}
        </Link>
      );
    }

    return (
      <span key={link.label} onClick={() => activateLink(link)} {...hoverProps}>
        {link.label}
      </span>
    );
  };

  const StatusDot = () => (
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
  );

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: "#FAFAFA",
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
  };

  const keyframes = `
    @keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 75%, 100% { transform: scale(2.5); opacity: 0; } }
    @keyframes menuFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes menuItemIn {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;

  // ---------- MOBILE ----------
  if (mounted && isMobile) {
    return (
      <>
        <div
          style={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 160,
            background: scrolled && !menuOpen ? "#121212" : "transparent",
            transition: "background 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px clamp(20px, 4vw, 48px)",
            boxSizing: "border-box",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          <span style={labelStyle}>(UX + Motion Designer)</span>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 44,
              height: 24,
              ...labelStyle,
            }}
          >
            {menuOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 12 12"
                fill="none"
                stroke="#FAFAFA"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" />
                <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" />
              </svg>
            ) : (
              <span style={{ ...labelStyle, textAlign: "right", width: "100%" }}>
                Menu
              </span>
            )}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 150,
              background: "#121212",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "88px clamp(20px, 4vw, 48px) 40px",
              boxSizing: "border-box",
              fontFamily: "Manrope, sans-serif",
              overflowY: "auto",
              animation: "menuFadeIn 0.25s ease",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {allLinks.map((link, i) => (
                <span
                  key={link.label}
                  onClick={() => {
                    setMenuOpen(false);
                    activateLink(link);
                  }}
                  style={{
                    fontSize: "clamp(38px, 11vw, 68px)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.06,
                    color: isCurrent(link) ? "#707070" : "#FAFAFA",
                    cursor: "pointer",
                    userSelect: "none",
                    animation: `menuItemIn 0.5s cubic-bezier(0.16,1,0.3,1) ${
                      0.04 + i * 0.05
                    }s both`,
                  }}
                >
                  {link.label}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 40,
              }}
            >
              <StatusDot />
              <span style={labelStyle}>SF Bay Area</span>
            </div>
          </div>
        )}

        <style>{keyframes}</style>
        <ContactReceipt />
      </>
    );
  }

  // ---------- DESKTOP ----------
  return (
    <>
      <div
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          background: scrolled ? "#121212" : "transparent",
          transition: "background 0.2s ease",
          display: "grid",
          gridTemplateColumns: "2fr 1fr auto",
          alignItems: "center",
          padding: "20px 48px",
          boxSizing: "border-box",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        <span style={labelStyle}>(UX + Motion Designer)</span>

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
          <span style={labelStyle}>SF Bay Area</span>
          <StatusDot />
        </div>

        <style>{keyframes}</style>
      </div>

      <ContactReceipt />
    </>
  );
}