"use client";

import { useEffect, useRef, useState } from "react";

const MIN_DURATION = 600;
const MAX_WAIT = 3000;
const HOLD = 300;
const WIPE = 700;
const FALLBACK_AFTER = 5000; // show contact/PDF fallback if still loading after 5s

const EMAIL_USER = "bwong127";
const EMAIL_DOMAIN = "asu.edu";
const WORK_SAMPLE_URL = "/treevah-work-sample.pdf";

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const readyRef = useRef(false);
  const doneRef = useRef(false);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();
    let cancelled = false;

    const waits: Promise<unknown>[] = [];

    waits.push(
      document.readyState === "loading"
        ? new Promise<void>((r) =>
            document.addEventListener("DOMContentLoaded", () => r(), { once: true })
          )
        : Promise.resolve()
    );

    if ("fonts" in document) {
      waits.push(
        Promise.race([
          (document as Document & { fonts: FontFaceSet }).fonts.ready,
          new Promise((r) => setTimeout(r, MAX_WAIT)),
        ])
      );
    }

    waits.push(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          const imgs = Array.from(document.images);
          if (!imgs.length) return resolve();
          let left = imgs.length;
          const one = () => (--left <= 0 ? resolve() : undefined);
          imgs.forEach((img) => {
            if (img.complete) one();
            else {
              img.addEventListener("load", one, { once: true });
              img.addEventListener("error", one, { once: true });
            }
          });
        }, 50);
      })
    );

    Promise.all(waits).then(() => {
      if (!cancelled) readyRef.current = true;
    });

    const cap = setTimeout(() => (readyRef.current = true), MAX_WAIT);

    // if we're somehow STILL on the loader after 5s, surface the fallback
    const fallbackTimer = setTimeout(() => {
      if (!doneRef.current) setShowFallback(true);
    }, FALLBACK_AFTER);

    const lift = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setPct(100);
      setTimeout(() => {
        setLifting(true);
        setTimeout(() => setHidden(true), WIPE);
      }, HOLD);
    };

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const minMet = elapsed >= MIN_DURATION;

      setPct((prev) => {
        const ceiling = readyRef.current && minMet ? 100 : 88;
        if (prev >= ceiling) return prev;
        const next = prev + Math.max(1, (ceiling - prev) * 0.1);
        return Math.min(ceiling, next);
      });

      if (readyRef.current && minMet) {
        setPct((prev) => {
          if (prev >= 99 && !doneRef.current) lift();
          return prev;
        });
      }
      if (!doneRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const backstop = setTimeout(lift, MAX_WAIT + MIN_DURATION + 600);

    return () => {
      cancelled = true;
      clearTimeout(cap);
      clearTimeout(fallbackTimer);
      clearTimeout(backstop);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (hidden) return null;

  const shown = Math.min(100, Math.round(pct));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: lifting ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.7s cubic-bezier(0.76,0,0.24,1)",
        pointerEvents: lifting ? "none" : "auto",
      }}
    >
      {/* centered counter */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 2,
          fontFamily: "Manrope, sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#FAFAFA",
        }}
      >
        <span
          style={{
            fontSize: "clamp(56px, 12vw, 150px)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {shown}
        </span>
        <span
          style={{
            fontSize: "clamp(20px, 4vw, 44px)",
            color: "#CDFE88",
            transform: "translateY(-0.15em)",
          }}
        >
          %
        </span>
      </div>

      {/* subtle fallback — only appears if loading drags past 5s */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(28px, 6vw, 56px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          width: "min(90%, 420px)",
          textAlign: "center",
          opacity: showFallback ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: showFallback ? "auto" : "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "#757575",
            letterSpacing: "0.01em",
            lineHeight: 1.5,
          }}
        >
          Taking a while? Your network may be blocking parts of this site.
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() =>
              window.open(WORK_SAMPLE_URL, "_blank", "noopener,noreferrer")
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#CDFE88",
              color: "#121212",
              border: "none",
              borderRadius: 999,
              padding: "10px 18px",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            View Work Sample (PDF)
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#121212"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 13, height: 13 }}
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </button>

          <button
            onClick={() => {
              window.location.href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
            }}
            style={{
              background: "none",
              border: "0.5px solid #404040",
              borderRadius: 999,
              padding: "10px 18px",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: "#FAFAFA",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}