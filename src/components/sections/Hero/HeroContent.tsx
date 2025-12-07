"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { StepForward } from "lucide-react";

type HeroAnimatedBorderCTAProps = {
  text: string;
  href: string;
};

export default function HeroAnimatedBorderCTA({
  text,
  href,
}: HeroAnimatedBorderCTAProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const letters = text.split("");

  // --- GSAP LOGIC FOR TEXT & ARROW SWAP ---
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state for glow fill
      gsap.set(".btn-fill", {
        width: "0%",
        height: "0%",
        opacity: 0,
        x: "-50%",
        y: "-50%",
        top: "50%",
        left: "50%",
      });

      // Text swap initial positions
      gsap.set(".letter-secondary", {
        yPercent: -100,
        opacity: 0,
        display: "inline-block",
      });

      gsap.set(".letter-primary", {
        yPercent: 0,
        opacity: 1,
        display: "inline-block",
      });

      // Arrows
      gsap.set(".arrow-left", { x: -20, opacity: 0 });
      gsap.set(".arrow-right", { x: 0, opacity: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  const handleMouseEnter = () => {
    if (!containerRef.current) return;

    gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.to(containerRef.current, { scale: 1.05, duration: 0.3 }, 0);

      // Softer glow fill (same idea as navbar CTA)
      tl.to(
        ".btn-fill",
        {
          width: "140%",
          height: "220%",
          opacity: 0.7,
          duration: 0.5,
          ease: "circ.out",
        },
        0
      );

      // Text swap
      tl.to(
        ".letter-primary",
        { yPercent: 100, opacity: 0, duration: 0.4, stagger: 0.03 },
        0
      );
      tl.to(
        ".letter-secondary",
        { yPercent: 0, opacity: 1, duration: 0.4, stagger: 0.03 },
        0.05
      );

      // Arrow swap
      tl.to(
        ".arrow-right",
        { x: 20, opacity: 0, duration: 0.3, ease: "power2.in" },
        0
      );
      tl.to(
        ".arrow-left",
        { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
        0.1
      );
    }, containerRef);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;

    gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(containerRef.current, { scale: 1, duration: 0.3 }, 0);

      tl.to(
        ".btn-fill",
        { width: "0%", height: "0%", opacity: 0, duration: 0.4 },
        0
      );

      tl.to(
        ".letter-secondary",
        { yPercent: -100, opacity: 0, duration: 0.3, stagger: 0.02 },
        0
      );
      tl.to(
        ".letter-primary",
        { yPercent: 0, opacity: 1, duration: 0.3, stagger: 0.02 },
        0.05
      );

      tl.to(".arrow-left", { x: -20, opacity: 0, duration: 0.3 }, 0);
      tl.to(
        ".arrow-right",
        { x: 0, opacity: 1, duration: 0.3, delay: 0.1 },
        0
      );
    }, containerRef);
  };

  return (
    <Link
      ref={containerRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer flex items-center justify-center px-10 py-4 overflow-hidden rounded-sm transition-all duration-300 bg-zinc-900/50 border border-white/20"
      style={{ fontFamily: "var(--font-clash-display)" }}
    >
      {/* CSS animated border */}
      <div className="btn-border absolute inset-0 pointer-events-none opacity-100 z-0">
        <span /> <span /> <span /> <span />
      </div>

      {/* Softer GSAP glow fill */}
      <div className="btn-fill absolute rounded-full bg-fuchsia-500/40 blur-xl z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex items-center gap-3 pointer-events-none">
        <div className="arrow-left absolute -left-8 flex items-center justify-center">
          <StepForward className="w-5 h-5 stroke-[3.5] text-white" />
        </div>

        <div className="relative flex items-center justify-center overflow-hidden whitespace-nowrap">
          {/* primary text */}
          <div className="flex items-center">
            {letters.map((char, i) => (
              <span
                key={`p-${i}`}
                className="letter-primary text-lg font-semibold tracking-normal text-zinc-300 group-hover:text-white"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* secondary text */}
          <div className="absolute inset-0 flex items-center justify-center">
            {letters.map((char, i) => (
              <span
                key={`s-${i}`}
                className="letter-secondary text-lg font-semibold tracking-normal text-white"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        <div className="arrow-right flex items-center justify-center">
          <StepForward className="w-5 h-5 stroke-[3.5] text-zinc-300 group-hover:text-white" />
        </div>
      </div>
    </Link>
  );
}
