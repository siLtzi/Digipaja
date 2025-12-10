"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  DIGIPAJA_LOGO_VIEWBOX,
  DOT,
  D,
  DIGIPAJA_WORDMARK_LETTERS,
  DIGIPAJA_OULU_LETTERS,
  type LetterPaths,
} from "@/components/dLogoPaths";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, MotionPathPlugin);

export default function LogoMark() {
  const containerRef = useRef<SVGSVGElement>(null);
  const iconRef = useRef<SVGGElement>(null);

  const hoverTl = useRef<gsap.core.Timeline | null>(null);

  // ================================
  //      ENTRANCE ANIMATION
  // ================================
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(containerRef.current, { autoAlpha: 0, y: 8, scale: 0.96 });

    tl.to(containerRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
    });

    // Icon fade-up
    tl.fromTo(
      iconRef.current,
      { y: 10, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5 },
      "-=0.3"
    );

    // Dot pop
    tl.fromTo(
      ".logo-dot",
      { scale: 0, transformOrigin: "center center" },
      { scale: 1, duration: 0.4, ease: "back.out(3)" },
      "-=0.25"
    );

    // DIGIPAJA
    tl.fromTo(
      ".logo-part-wordmark path",
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.025, duration: 0.45 },
      "-=0.3"
    );

    // OULU
    tl.fromTo(
      ".logo-part-oulu path",
      { x: 8, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.04 },
      "-=0.2"
    );
  }, { scope: containerRef });

  // ================================
  //     HOVER: DOT ORBIT ANIMATION
  // ================================
  const handleMouseEnter = () => {
    if (hoverTl.current) {
      hoverTl.current.kill();
      hoverTl.current = null;
    }

    const tl = gsap.timeline();
    hoverTl.current = tl;

    // ICON slight bump
    tl.to(
      iconRef.current,
      {
        scale: 1.03,
        y: -1,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        transformOrigin: "center",
      },
      0
    );

    // DOT orbit (circular-ish path)
    tl.to(
      ".logo-dot",
      {
        duration: 0.65,
        ease: "power1.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 6, y: -2 },
            { x: 0, y: -6 },
            { x: -6, y: -2 },
            { x: 0, y: 0 },
          ],
          curviness: 1.4,
        },
        transformOrigin: "center center",
      },
      0.05
    );

    // MICRO jitter on DIGIPAJA letters
    tl.to(
      ".logo-part-wordmark path",
      {
        y: -1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        stagger: 0.01,
        ease: "power1.inOut",
      },
      0.05
    );

    // OULU tiny tick
    tl.to(
      ".logo-part-oulu path",
      {
        y: -0.6,
        duration: 0.14,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      },
      0.06
    );
  };

  const handleMouseLeave = () => {
    if (hoverTl.current) {
      hoverTl.current.kill();
      hoverTl.current = null;
    }

    // Reset transforms
    gsap.to(
      [".logo-dot", iconRef.current, ".logo-part-wordmark path", ".logo-part-oulu path"],
      {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      }
    );
  };

  return (
    <svg
      ref={containerRef}
      viewBox={DIGIPAJA_LOGO_VIEWBOX}
      className="h-full w-auto cursor-pointer select-none"
      role="img"
      aria-label="Digipaja Oulu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        <linearGradient
          id="digipaja-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#ff8a3c" />
          <stop offset="50%" stopColor="#ff4d00" />
          <stop offset="100%" stopColor="#ffcc80" />
        </linearGradient>

        <linearGradient
          id="digipaja-subtext"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>

      {/* ICON (D + DOT) */}
      <g
        ref={iconRef}
        fill="url(#digipaja-gradient)"
        className="logo-part-icon"
      >
        {D.map((d, i) => (
          <path key={`icon-d-${i}`} d={d} />
        ))}
        {DOT.map((d, i) => (
          <path key={`icon-dot-${i}`} d={d} className="logo-dot" />
        ))}
      </g>

      {/* WORDMARK: DIGIPAJA */}
      <g
        fill="url(#digipaja-gradient)"
        className="logo-part-wordmark"
      >
        {DIGIPAJA_WORDMARK_LETTERS.map((letter: LetterPaths) =>
          letter.paths.map((d, i) => (
            <path key={`${letter.id}-${i}`} d={d} />
          ))
        )}
      </g>

      {/* SUBTEXT: OULU */}
      <g
        fill="url(#digipaja-subtext)"
        className="logo-part-oulu"
      >
        {DIGIPAJA_OULU_LETTERS.map((letter: LetterPaths) =>
          letter.paths.map((d, i) => (
            <path key={`oulu-${letter.id}-${i}`} d={d} />
          ))
        )}
      </g>
    </svg>
  );
}
