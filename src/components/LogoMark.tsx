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

    // Container set
    tl.set(containerRef.current, { autoAlpha: 1 });

    // 1. Icon: Spin & Scale In
    tl.fromTo(
      iconRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // 2. Dot: Pop in with delay
    tl.fromTo(
      ".logo-dot",
      { scale: 0 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" },
      "-=0.4"
    );

    // 3. Wordmark: Staggered "Typewriter" style slam
    tl.fromTo(
      ".logo-part-wordmark path",
      { y: -20, opacity: 0, scale: 0.5 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        stagger: 0.04, 
        duration: 0.5, 
        ease: "back.out(2)" 
      },
      "-=0.6"
    );

    // 4. Oulu: Slide up smoothly
    tl.fromTo(
      ".logo-part-oulu path",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.02, duration: 0.5 },
      "-=0.3"
    );
  }, { scope: containerRef });

  // ================================
  //     HOVER: ENERGIZED WAVE
  // ================================
  const handleMouseEnter = () => {
    if (hoverTl.current) {
      hoverTl.current.kill();
    }

    const tl = gsap.timeline();
    hoverTl.current = tl;

    // 1. Icon: Energetic Pulse
    tl.to(iconRef.current, {
      scale: 1.1,
      rotation: 5,
      duration: 0.2,
      ease: "back.out(2)",
    })
    .to(iconRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.3)",
    });

    // 2. Dot: Flash & Jump
    tl.to(".logo-dot", {
      y: -5,
      scale: 1.3,
      fill: "#ffffff", // Flash white
      duration: 0.15,
      ease: "power2.out",
    }, 0)
    .to(".logo-dot", {
      y: 0,
      scale: 1,
      fill: "url(#digipaja-gradient)", // Return to gradient (handled by CSS/SVG fill usually, but explicit here helps)
      duration: 0.3,
      ease: "bounce.out",
    }, 0.15);

    // 3. Wordmark: The "Mexican Wave"
    tl.to(".logo-part-wordmark path", {
      y: -3,
      scale: 1.1,
      duration: 0.15,
      stagger: {
        each: 0.03,
        yoyo: true,
        repeat: 1,
      },
      ease: "sine.inOut",
    }, 0.05);

    // 4. Oulu: Subtle tracking
    tl.to(".logo-part-oulu path", {
      x: 2,
      opacity: 0.8,
      stagger: 0.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    }, 0.1);
  };

  const handleMouseLeave = () => {
    // Let the hover animation finish naturally or just ensure we reset if interrupted mid-way
    // But usually, for a "wave", it's better to let it play out or do a quick reset.
    // We'll do a safe reset check.
    
    gsap.to([iconRef.current, ".logo-dot", ".logo-part-wordmark path", ".logo-part-oulu path"], {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1, // Ensure opacity is back to 1
      fill: "", // Clear explicit fill overrides to fallback to SVG attrs
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    });
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
