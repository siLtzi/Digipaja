"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register the plugin
gsap.registerPlugin(useGSAP);

type HeroProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  desktopVideo: string;
  mobileVideo: string;
  metricsLabel?: string;
  metricsSubtitle?: string;
  metricsFootnote?: string;
};

const STACK_ICONS = [
  { name: "Next.js", src: "/tech/nextjs.svg" },
  { name: "Sanity", src: "/tech/sanity.svg" },
  { name: "Vercel", src: "/tech/vercel.svg" },
  { name: "Tailwind", src: "/tech/tailwind.svg" },
  { name: "GSAP", src: "/tech/gsap.svg" },
  { name: "i18n", src: "/tech/monikielisyys.svg" },
];

export default function HeroContent({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  subtitle,
  primaryCta,
  secondaryCta,
  desktopVideo,
  mobileVideo,
}: HeroProps) {
  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  
  // === 1. MAIN ENTRANCE ANIMATION ===
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // A. Text & Button Entrance
    tl.fromTo(".animate-in", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
    );

    // B. Tech Card Slide-in
    tl.fromTo(".hero-card",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  const scrollTo = (id: string) => {
    const el = document.querySelector<HTMLElement>(`#${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      ref={containerRef} // Scope for GSAP
      className="relative min-h-[100vh] overflow-hidden bg-[#050609]"
    >
      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="block h-full w-full object-cover opacity-40 lg:hidden"
        >
          <source src={mobileVideo} type="video/mp4" />
        </video>

        <video
          autoPlay
          muted
          loop
          playsInline
          className="hidden h-full w-full object-cover opacity-40 lg:block"
        >
          <source src={desktopVideo} type="video/mp4" />
        </video>
      </div>

      {/* === SMOOTH AMBIENT GLOW === */}
      <div 
        className="pointer-events-none absolute left-0 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle at center, rgba(255,138,60,0.08) 0%, rgba(255,138,60,0) 70%)"
        }}
      />

      {/* === CONTENT LAYER === */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 pt-32 lg:flex-row lg:items-center lg:justify-between lg:pb-32 lg:pt-40">
        
        {/* --- LEFT COLUMN: COPY --- */}
        <div className="max-w-2xl space-y-10">
          
          {/* Eyebrow */}
          <div className="animate-in inline-flex items-center gap-4 opacity-0">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-[#090b12]/80 px-4 py-1.5 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff8a3c]"></span>
              </span>
              <span
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-[10px] uppercase tracking-[0.2em] text-zinc-300"
              >
                {eyebrow}
              </span>
            </div>
            <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-[#ff8a3c] to-transparent opacity-50" />
          </div>

          {/* Title */}
          <h1
            style={{ fontFamily: "var(--font-goldman)" }}
            className="animate-in text-balance text-5xl font-bold leading-none text-white opacity-0 sm:text-6xl lg:text-[4.5rem]"
          >
            {titleStart}{" "}
            <span className="bg-gradient-to-r from-[#ffb347] via-[#ff8a3c] to-[#ff6b00] bg-clip-text text-transparent">
              {titleAccent}
            </span>{" "}
            {titleEnd}
          </h1>

          {/* Subtitle */}
          <div className="animate-in border-l-2 border-zinc-800 pl-6 opacity-0">
            <p className="max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="animate-in flex flex-wrap items-center gap-5 pt-4 opacity-0">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="group relative isolate flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] cursor-pointer"
            >
              <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              <span className="relative z-10">{primaryCta}</span>
              <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none"><path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("work")}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="group flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-sm transition-all hover:border-[#ff8a3c]/50 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span>{secondaryCta}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="animate-in flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 text-[11px] text-zinc-500 opacity-0">
            <div className="flex items-center gap-3">
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15171f] font-bold text-[#ffb347] ring-1 ring-white/10">
                 98
               </div>
               <span className="max-w-[120px] leading-tight">Lighthouse-pisteet tyypillisesti 95–100</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-3">
               <div className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
               <span className="max-w-[140px] leading-tight">Valmiit sivut 2–4 viikossa pienille yrityksille</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: TECH GRID --- */}
        <aside className="relative w-full max-w-[280px] lg:mt-0">
           
           <div className="hero-card relative p-2 opacity-0">
              <div className="relative z-10 mb-6 text-center">
                  {/* Updated Text Color to Orange */}
                  <h3 style={{ fontFamily: "var(--font-goldman)" }} className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#ff8a3c]">
                      SYSTEM STACK
                  </h3>
              </div>

             {/* Grid */}
             <div className="relative z-10 grid grid-cols-2 gap-4">
               {STACK_ICONS.map((tech) => (
                 <div 
                    key={tech.name}
                    className="
                      group/icon relative flex aspect-square w-full cursor-pointer items-center justify-center 
                      bg-white/[0.03] rounded-sm p-1
                      transition-all duration-300 ease-out
                      hover:shadow-[0_0_20px_rgba(255,138,60,0.15)]
                    "
                 >
                    {/* Inner Corners: Zinc-500 by default, Orange on Hover */}
                    <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-zinc-500 rounded-tl-sm transition-all duration-300 group-hover/icon:h-full group-hover/icon:w-full group-hover/icon:border-[#ff8a3c]" />
                    <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-zinc-500 rounded-tr-sm transition-all duration-300 group-hover/icon:h-full group-hover/icon:w-full group-hover/icon:border-[#ff8a3c]" />
                    <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-zinc-500 rounded-br-sm transition-all duration-300 group-hover/icon:h-full group-hover/icon:w-full group-hover/icon:border-[#ff8a3c]" />
                    <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-zinc-500 rounded-bl-sm transition-all duration-300 group-hover/icon:h-full group-hover/icon:w-full group-hover/icon:border-[#ff8a3c]" />
                    
                    {/* Hover Fill */}
                    <span className="absolute inset-0 bg-[#ff8a3c]/0 transition-all duration-300 group-hover/icon:bg-[#ff8a3c]/5 rounded-sm" />

                    {/* Tooltip */}
                    <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 ease-out group-hover/icon:top-[-42px] group-hover/icon:opacity-100 z-20">
                        <div className="whitespace-nowrap border border-[#ff8a3c] bg-[#090b12] px-3 py-1.5 shadow-[0_0_10px_rgba(255,138,60,0.2)] rounded-sm">
                            <span style={{ fontFamily: "var(--font-goldman)" }} className="text-[9px] uppercase tracking-wider text-[#ff8a3c]">
                                {tech.name}
                            </span>
                        </div>
                         <div className="absolute left-1/2 -bottom-2 h-2 w-px -translate-x-1/2 bg-[#ff8a3c]"></div>
                    </div>

                    {/* Icon */}
                    <div className="relative h-10 w-10 opacity-80 transition-all duration-300 ease-out group-hover/icon:opacity-100 grayscale brightness-200 contrast-125 group-hover/icon:grayscale-0 group-hover/icon:brightness-100 group-hover/icon:contrast-100 group-hover/icon:drop-shadow-[0_0_8px_rgba(255,138,60,0.8)]">
                      <Image 
                        src={tech.src} 
                        alt={tech.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                 </div>
               ))}
             </div>
             
             {/* Outer HUD Corners: Updated to Orange */}
             <div className="pointer-events-none absolute -top-2 -left-2 h-8 w-8 border-t border-l border-[#ff8a3c] rounded-tl-sm" />
             <div className="pointer-events-none absolute -top-2 -right-2 h-8 w-8 border-t border-r border-[#ff8a3c] rounded-tr-sm" />
             <div className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 border-b border-l border-[#ff8a3c] rounded-bl-sm" />
             <div className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b border-r border-[#ff8a3c] rounded-br-sm" />
             
           </div>
        </aside>

      </div>
    </section>
  );
}