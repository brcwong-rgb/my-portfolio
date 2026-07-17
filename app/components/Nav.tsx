"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ContactReceipt from "./ContactReceipt";

const LINKEDIN_URL = "https://www.linkedin.com/in/brandon-wong-43449827a/";
const RESUME_URL = "/brandon-wong-resume.pdf";

export default function Nav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const renderLink = (link: { label: string; type: string; target: string }) => {
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
          <div
            style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}
          >
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