"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother"; // Import this!

// Register the plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollSmoother);
}

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

    // Text & Button Entrance (skip h1 for LCP)
    tl.fromTo(".animate-in", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }
    );
  }, { scope: containerRef });

  // 🔥 FIX: Use ScrollSmoother to prevent empty space bug
  const scrollTo = (id: string) => {
    const el = document.querySelector<HTMLElement>(`#${id}`);
    if (!el) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      // 1. GSAP Scroll (keeps layout synced)
      smoother.scrollTo(el, true, "start");
    } else {
      // 2. Native Fallback (mobile)
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef} // Scope for GSAP
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#050609] pt-24 md:pt-0"
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
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* --- LEFT COLUMN: COPY --- */}
        <div className="max-w-2xl space-y-8">
          
          {/* Eyebrow */}
          <div className="animate-in inline-flex items-center gap-3 opacity-0">
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

          {/* Title */}
          <h1
            style={{ 
              fontFamily: "var(--font-goldman)",
              animation: "fadeInUpHero 0.6s ease-out"
            }}
            className="text-balance text-5xl font-bold leading-none text-white sm:text-6xl lg:text-[4.5rem]"
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
              // Updated to scroll to "references"
              onClick={() => scrollTo("references")}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="group flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-sm transition-all hover:border-[#ff8a3c]/50 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span>{secondaryCta}</span>
            </button>
          </div>

          {/* Tech Stack */}
          <div className="animate-in flex flex-wrap items-center gap-x-5 gap-y-5 pt-8 opacity-0">
            <div className="flex items-center gap-4">
              <span style={{ fontFamily: "var(--font-goldman)" }} className="text-[10px] uppercase tracking-[0.25em] text-[#ff8a3c]/70">Tech Stack</span>
              <div className="h-5 w-px bg-gradient-to-b from-[#ff8a3c]/50 to-transparent" />
            </div>
            {STACK_ICONS.map((tech, idx) => (
              <div 
                key={tech.name} 
                className="group/tech relative"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative flex h-12 w-12 items-center justify-center rounded-sm border border-white/5 bg-white/[0.02] p-2 backdrop-blur-sm transition-all duration-500 ease-out group-hover/tech:-translate-y-2 group-hover/tech:border-[#ff8a3c]/50 group-hover/tech:bg-[#ff8a3c]/10 group-hover/tech:shadow-[0_0_30px_rgba(255,138,60,0.3)]">
                  <div className="relative h-full w-full opacity-60 transition-all duration-500 ease-out grayscale group-hover/tech:opacity-100 group-hover/tech:grayscale-0 group-hover/tech:scale-110">
                    <Image 
                      src={tech.src} 
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Glow effect behind */}
                  <div className="absolute inset-0 -z-10 rounded-sm bg-[#ff8a3c] opacity-0 blur-xl transition-opacity duration-500 group-hover/tech:opacity-20" />
                </div>
                
                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 ease-out group-hover/tech:-top-14 group-hover/tech:opacity-100 z-20">
                  <div className="relative whitespace-nowrap border border-[#ff8a3c]/40 bg-[#090b12]/95 px-3 py-1.5 shadow-[0_0_15px_rgba(255,138,60,0.3)] rounded backdrop-blur-md">
                    <span style={{ fontFamily: "var(--font-goldman)" }} className="text-[10px] uppercase tracking-wider text-[#ff8a3c]">
                      {tech.name}
                    </span>
                    {/* Arrow */}
                    <div className="absolute left-1/2 -bottom-1 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[#ff8a3c]/40 bg-[#090b12]/95" />
                  </div>
                </div>
              </div>
            ))}
            <div className="h-6 w-px bg-gradient-to-b from-white/10 to-transparent hidden sm:block" />
            <div className="flex items-center gap-3">
               <div className="h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80] animate-pulse" />
               <span className="max-w-[160px] leading-tight text-[11px] text-zinc-400">Valmiit sivut 2–4 viikossa pienille yrityksille</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: REMOVED TECH GRID --- */}
        <aside className="relative w-full max-w-[280px] lg:mt-0 hidden">
           
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
                   {/* Inner Corners */}
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
             
             {/* Outer HUD Corners */}
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