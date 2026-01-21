"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import {
  DIGIPAJA_LOGO_VIEWBOX,
  DOT,
  D,
  DIGIPAJA_WORDMARK_LETTERS,
  DIGIPAJA_OULU_LETTERS,
  type LetterPaths,
} from "@/components/dLogoPaths";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, MorphSVGPlugin);

export default function LogoMark() {
  const containerRef = useRef<SVGSVGElement>(null);
  const iconRef = useRef<SVGGElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const wordmarkRef = useRef<SVGGElement>(null);
  const ouluRef = useRef<SVGGElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Start invisible
      gsap.set(containerRef.current, { autoAlpha: 1 });
      gsap.set([iconRef.current, dotRef.current, wordmarkRef.current, ouluRef.current], { opacity: 0 });

      // 1. D icon draws in with stroke then fills
      tl.fromTo(
        ".logo-d-path",
        { 
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          stroke: "#ff8a3c",
          strokeWidth: 2,
          fill: "transparent"
        },
        { 
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.1
        }
      )
      .to(".logo-d-path", {
        fill: "url(#digipaja-gradient)",
        stroke: "transparent",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")
      .set(iconRef.current, { opacity: 1 }, "<");

      // 2. Dot bursts in with elastic bounce and glow
      tl.fromTo(
        dotRef.current,
        { 
          scale: 0, 
          opacity: 0,
          transformOrigin: "center center"
        },
        { 
          scale: 1.3, 
          opacity: 1, 
          duration: 0.3, 
          ease: "back.out(3)" 
        },
        "-=0.3"
      )
      .to(dotRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      })
      .to(".logo-dot", {
        filter: "drop-shadow(0 0 8px rgba(255, 138, 60, 0.8))",
        duration: 0.3
      }, "<")
      .to(".logo-dot", {
        filter: "drop-shadow(0 0 0px rgba(255, 138, 60, 0))",
        duration: 0.5
      });

      // 3. Wordmark slides and fades in with stagger per letter
      tl.fromTo(
        ".wordmark-letter",
        { 
          opacity: 0, 
          x: -20,
          y: 10,
          scale: 0.8
        },
        { 
          opacity: 1, 
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: "back.out(1.5)"
        },
        "-=0.4"
      )
      .set(wordmarkRef.current, { opacity: 1 }, "<");

      // 4. OULU fades in with blur effect
      tl.fromTo(
        ouluRef.current,
        { 
          opacity: 0,
          filter: "blur(4px)"
        },
        { 
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5 
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (isHovered) return;
    setIsHovered(true);
    
    const tl = gsap.timeline();
    
    // Container subtle scale
    tl.to(containerRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });

    // Dot goes crazy - pulsing glow and rotation
    tl.to(dotRef.current, {
      scale: 1.4,
      rotate: 360,
      duration: 0.5,
      ease: "back.out(2)",
    }, 0)
    .to(".logo-dot", {
      filter: "drop-shadow(0 0 12px rgba(255, 138, 60, 1)) drop-shadow(0 0 24px rgba(255, 77, 0, 0.6))",
      duration: 0.3,
    }, 0);

    // D icon subtle pulse
    tl.to(iconRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    }, 0);

    // Wordmark letters wave
    tl.to(".wordmark-letter", {
      y: -3,
      duration: 0.2,
      stagger: {
        each: 0.02,
        from: "start",
        yoyo: true,
        repeat: 1
      },
      ease: "power2.inOut",
    }, 0);

    // OULU brightens
    tl.to(ouluRef.current, {
      filter: "brightness(1.3)",
      duration: 0.3,
    }, 0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    const tl = gsap.timeline();
    
    tl.to(containerRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .to(dotRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0)
    .to(".logo-dot", {
      filter: "drop-shadow(0 0 0px rgba(255, 138, 60, 0))",
      duration: 0.4,
    }, 0)
    .to(iconRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut",
    }, 0)
    .to(".wordmark-letter", {
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    }, 0)
    .to(ouluRef.current, {
      filter: "brightness(1)",
      duration: 0.3,
    }, 0);
  };

  return (
    <svg
      ref={containerRef}
      viewBox={DIGIPAJA_LOGO_VIEWBOX}
      className="h-full w-auto cursor-pointer select-none origin-left"
      style={{ overflow: "visible" }}
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
        
        {/* Glow filter for hover effects */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* ICON (D) */}
      <g
        ref={iconRef}
        className="logo-part-icon"
      >
        {D.map((d, i) => (
          <path 
            key={`icon-d-${i}`} 
            d={d} 
            className="logo-d-path"
            fill="url(#digipaja-gradient)"
          />
        ))}
      </g>

      {/* DOT - Separate group for independent animation */}
      <g
        ref={dotRef}
        className="logo-part-dot"
      >
        {DOT.map((d, i) => (
          <path 
            key={`icon-dot-${i}`} 
            d={d} 
            className="logo-dot" 
            fill="url(#digipaja-gradient)"
          />
        ))}
      </g>

      {/* WORDMARK: DIGIPAJA */}
      <g
        ref={wordmarkRef}
        fill="url(#digipaja-gradient)"
        className="logo-part-wordmark"
      >
        {DIGIPAJA_WORDMARK_LETTERS.map((letter: LetterPaths) =>
          letter.paths.map((d, i) => (
            <path 
              key={`${letter.id}-${i}`} 
              d={d} 
              className="wordmark-letter"
            />
          ))
        )}
      </g>

      {/* SUBTEXT: OULU */}
      <g
        ref={ouluRef}
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
