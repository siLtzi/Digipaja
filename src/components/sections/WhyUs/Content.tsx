"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Card = {
  title: string;
  description: string;
  icon: string;
};

type WhyUsProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: Card[];
};

export default function WhyUsContent({
  eyebrow,
  title,
  subtitle,
  cards,
}: WhyUsProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // TRIGGER POINT: Starts when the top of the section is 95% down the screen
          start: "top 95%", 
          // REMOVED "scrub" to prevent cards from getting stuck halfway
          toggleActions: "play none none reverse",
        },
      });

      // 1. LASER HORIZON (Fast Expansion)
      tl.fromTo(
        ".laser-beam:nth-child(1)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.4, duration: 0.3, ease: "power4.out" }
      )
      .fromTo(
        ".laser-beam:nth-child(2)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.3, ease: "power4.out" },
        "-=0.25"
      )
      .fromTo(
        ".laser-beam:nth-child(3)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.9, duration: 0.3, ease: "power4.out" },
        "-=0.25"
      )
        // 2. TEXT REVEAL (Snappy)
        .fromTo(
          ".reveal-text",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.2"
        )
        // 3. CARDS SEQUENCE (Strict Left->Right, Top->Bottom)
        .fromTo(
          ".tech-card-item",
          {
            y: 40, 
            opacity: 0,
            rotationX: -25, // Tilted back
            scale: 0.9,
            transformOrigin: "top center",
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0, // Snaps flat
            scale: 1,
            duration: 0.08,
            // STAGGER: 0.05s delay between each card. 
            // GSAP uses DOM order, so this naturally does Row 1 (L->R) then Row 2.
            stagger: 0.05, 
            ease: "back.out(1.5)", // The "Mechanical Snap" feel
            clearProps: "transform, opacity, filter", // Clean up after animation to prevent blurriness
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="why-us"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 scale-x-0" />
      </div>

      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/image/BGWhyUs2.png"
            alt="Background"
            fill
            className="object-cover object-center opacity-20 mix-blend-screen"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050609] via-[#050609]/85 to-[#050609]" />
        
        {/* Active Scanline Grid */}
        <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
            }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* === HEADER === */}
        <div className="mb-20 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="reveal-text mb-6 inline-flex items-center gap-3">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
            </span>
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-[12px] uppercase tracking-[0.2em] text-[#ff8a3c]"
            >
              [ {eyebrow} ]
            </span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-goldman)" }}
            className="reveal-text max-w-5xl text-balance text-4xl font-bold leading-none text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {title}
          </h2>

          <p className="reveal-text mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* === TECH GRID === */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 perspective-[1000px]">
          {cards.map((card, i) => {
            const isLast = i === cards.length - 1;
            return (
              <GridItem
                key={i}
                card={card}
                index={i}
                variant={isLast ? "highlight" : "default"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- SUB-COMPONENT ---
function GridItem({
  card,
  index,
  variant = "default",
}: {
  card: Card;
  index: number;
  variant?: "default" | "highlight";
}) {
  const isHighlight = variant === "highlight";
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      // Added will-change-transform to prevent browser stutter during the flip
      className={`tech-card-item group relative flex flex-col p-6 transition-all duration-500 rounded-sm border cursor-pointer sm:cursor-default overflow-hidden will-change-transform
      ${
        isHighlight
          ? "bg-[#0a0b10] border-[#ff8a3c] shadow-[0_0_30px_-5px_rgba(255,138,60,0.2)] hover:shadow-[0_0_50px_-5px_rgba(255,138,60,0.4)]"
          : "bg-[#0a0a0a]/90 border-white/10 hover:border-[#ff8a3c]/50 hover:bg-[#0f0f12] hover:shadow-[0_0_30px_-10px_rgba(255,138,60,0.15)]"
      }
      hover:-translate-y-2 hover:scale-[1.05] hover:z-10
      `}
    >
      {/* Blueprint Grid Hover */}
      <div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(to right, #ff8a3c1a 1px, transparent 1px), linear-gradient(to bottom, #ff8a3c1a 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Rising Heat Gradient */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#ff8a3c]/10 via-transparent to-transparent transition-transform duration-500 ease-out z-0
       ${
         isHighlight
           ? "translate-y-0 opacity-100"
           : "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
       }`}
      />

      {/* Tech Corner Decorations */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isHighlight ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } transition-opacity duration-300 z-20`}
      >
        <div className="absolute top-0 left-0 h-3 w-3 border-l border-t border-[#ff8a3c]" />
        <div className="absolute top-0 right-0 h-3 w-3 border-r border-t border-[#ff8a3c]" />
        <div className="absolute bottom-0 left-0 h-3 w-3 border-l border-b border-[#ff8a3c]" />
        <div className="absolute bottom-0 right-0 h-3 w-3 border-r border-b border-[#ff8a3c]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            {/* Icon Container */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border transition-all duration-500 ${
                isHighlight
                  ? "border-[#ff8a3c] bg-[#ff8a3c]/10 text-[#ff8a3c]"
                  : "border-white/10 bg-white/5 text-[#ff8a3c] group-hover:border-[#ff8a3c] group-hover:bg-[#ff8a3c]/10 group-hover:text-[#ff8a3c] group-hover:shadow-[0_0_20px_-5px_#ff8a3c]"
              } group-hover:scale-110`}
            >
              {/* ICONS */}
              {card.icon === "forge" && (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4V20H18V9H16V6H6V9ZM10 9H14V6H10V9ZM16 20H18V18H16V20ZM4 20H6V18H4V20ZM6 18H16V9H6V18Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
              {card.icon === "speed" && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              )}
              {card.icon === "tech" && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              )}
              {card.icon === "local" && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
              {card.icon === "shield" && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              )}
              {card.icon === "fingerprint" && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.578-4.18M7 9a1 1 0 012 0v1h2v-1a1 1 0 112 0v1h2v-1a1 1 0 112 0" /></svg>
              )}
              {card.icon === "rocket" && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              )}
              {card.icon === "trophy" && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              )}
            </div>

            <div className="sm:hidden text-zinc-500">
              <svg
                className={`h-5 w-5 transition-transform duration-300 ${
                  isExpanded ? "rotate-45 text-[#ff8a3c]" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>

          <h3
            style={{ fontFamily: "var(--font-goldman)" }}
            className={`text-xl font-bold leading-tight ${
              isHighlight ? "text-white" : "text-white group-hover:text-[#ff8a3c] transition-colors duration-300"
            }`}
          >
            {card.title}
          </h3>
        </div>

        <div
          className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0 mt-0"} 
          sm:max-h-none sm:opacity-100 sm:mt-4
        `}
        >
          <p
            className={`text-sm leading-relaxed ${
              isHighlight ? "text-zinc-200" : "text-zinc-300 group-hover:text-zinc-200 transition-colors"
            }`}
          >
            {card.description}
          </p>
        </div>
      </div>

      <div
        className={`absolute top-4 right-4 text-[10px] font-bold opacity-30 ${
          isHighlight ? "text-[#ff8a3c]" : "text-zinc-600 group-hover:text-[#ff8a3c]"
        }`}
      >
        0{index + 1}
      </div>
    </div>
  );
}