"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  DIGIPAJA_LOGO_VIEWBOX,
  DOT,
  D,
  DIGIPAJA_WORDMARK_LETTERS,
  DIGIPAJA_OULU_LETTERS,
  type LetterPaths,
} from "@/components/dLogoPaths";

gsap.registerPlugin(useGSAP);

export default function LogoMark() {
  const containerRef = useRef<SVGSVGElement>(null);
  const iconRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Container set
    tl.set(containerRef.current, { autoAlpha: 1 });

    // 1. Fade in icon
    tl.fromTo(
      iconRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5 }
    );

    // 2. Dot: Simple pop
    tl.fromTo(
      ".logo-dot",
      { scale: 0 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" },
      "-=0.3"
    );

    // 3. Wordmark: Fade in together
    tl.fromTo(
      ".logo-part-wordmark",
      { opacity: 0, x: -5 },
      { opacity: 1, x: 0, duration: 0.4 },
      "-=0.2"
    );

    // 4. Oulu: Fade in
    tl.fromTo(
      ".logo-part-oulu",
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      "-=0.2"
    );
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      scale: 1.05,
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(".logo-dot", {
      scale: 1.2,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to([iconRef.current, ".logo-dot"], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
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
