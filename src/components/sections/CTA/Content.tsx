"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CTAProps = {
  ctaText: string;
  ctaLink?: string;
};

export default function CTAContent({ ctaText, ctaLink = "/yhteydenotto" }: CTAProps) {
  const containerRef = useRef<HTMLElement>(null);

  const goldmanStyle = { fontFamily: "var(--font-goldman)" } as const;

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      // Laser separator animation
      const laserTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      laserTl
        .fromTo(
          ".cta-laser-blur",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.4, duration: 0.6, ease: "expo.out" }
        )
        .fromTo(
          ".cta-laser-line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: "expo.out" },
          "-=0.5"
        )
        .fromTo(
          ".cta-laser-highlight",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.6, duration: 0.6, ease: "expo.out" },
          "-=0.5"
        )
        // CTA button pops up
        .fromTo(
          ".cta-button",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.3)" },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="cta"
      className="cta-section relative overflow-hidden bg-[#050609] py-16 lg:py-20"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="cta-laser-blur h-[4px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 origin-center scale-x-0" />
        <div className="cta-laser-line absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 origin-center scale-x-0" />
        <div className="cta-laser-highlight absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 origin-center scale-x-0" />
      </div>

      {/* CTA Content */}
      <div className="relative z-10 flex justify-center px-6">
        <Link
          href={ctaLink}
          style={goldmanStyle}
          className="cta-button group/btn relative flex items-center justify-center gap-2 px-10 py-5 text-base font-bold uppercase tracking-[0.16em] transition-all duration-300 text-[#ff8a3c] hover:text-white hover:shadow-[0_0_25px_rgba(255,138,60,0.2)]"
        >
          {/* Corner brackets */}
          <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
          <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />

          {/* Background hover effect */}
          <span className="pointer-events-none absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />

          <span className="relative z-10">{ctaText}</span>
          <svg
            className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M1 6H11M11 6L6 1M11 6L6 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
