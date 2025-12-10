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
  metricsLabel: string;
  metricsSubtitle: string;
  metricsFootnote: string;
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
  metricsLabel,
  metricsSubtitle,
  metricsFootnote,
  desktopVideo,
  mobileVideo,
}: HeroProps) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  
  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null); // For the 98/100
  const lcpRef = useRef<HTMLParagraphElement>(null); // For the 0.7s

  // === 1. MAIN ENTRANCE ANIMATION ===
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // A. Text & Button Entrance (Staggered)
    tl.fromTo(".animate-in", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
    );

    // B. Tech Card Slide-in (From right)
    tl.fromTo(".hero-card",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" },
      "-=0.6"
    );

    // C. Number Counters
    tl.from(scoreRef.current, {
      textContent: 0,
      duration: 2,
      ease: "power1.out",
      snap: { textContent: 1 },
      stagger: 1,
    }, "-=0.8");

    tl.from(lcpRef.current, {
      textContent: 0,
      duration: 1.5,
      ease: "power1.out",
      snap: { textContent: 0.1 },
    }, "-=2");

  }, { scope: containerRef });

  // === 2. HOVER LABEL ANIMATION ===
  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    if (activeTech) {
      const tl = gsap.timeline();
      tl.set(el, { y: 5, opacity: 0 })
        .to(el, { duration: 0.3, y: 0, opacity: 1, ease: "back.out(2)", overwrite: true });
    } else {
      gsap.to(el, { duration: 0.3, y: 0, opacity: 1, ease: "power2.out", overwrite: true });
    }
  }, [activeTech]);

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
        {/* Mobile Video: Visible up to lg (1024px), then hidden */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="block h-full w-full object-cover opacity-40 lg:hidden"
        >
          <source src={mobileVideo} type="video/mp4" />
        </video>

        {/* Desktop Video: Hidden on mobile, visible on lg (1024px) and up */}
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
            {/* === TECH BRACKET BUTTON (UPDATED) === */}
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              style={{ fontFamily: "var(--font-goldman)" }}
              // Updated: Reduced hover shadow to 20px / 0.2 opacity. Added cursor-pointer.
              className="group relative isolate flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] cursor-pointer"
            >
              {/* Corner 1: Top Left */}
              <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              
              {/* Corner 2: Top Right */}
              <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />

              {/* Corner 3: Bottom Right */}
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />

              {/* Corner 4: Bottom Left */}
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />

              {/* Hover Fill Background - Reduced to opacity-10 to let borders show */}
              <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

              {/* Button Content */}
              <span className="relative z-10">{primaryCta}</span>
              <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none"><path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Secondary Button - Added cursor-pointer */}
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

        {/* --- RIGHT COLUMN: TECH CARD --- */}
        <aside className="relative w-full max-w-md">
           
           {/* Card Glow */}
           <div 
             className="hero-card absolute -inset-[2px] rounded-sm opacity-0"
             style={{
               background: "radial-gradient(circle at 50% 0%, rgba(255,138,60,0.5) 0%, transparent 60%)"
             }}
           />
           
           {/* Card Container */}
           <div className="hero-card relative overflow-visible rounded-sm border border-white/10 bg-[#090b12] p-1 shadow-2xl opacity-0">
             
             {/* Tech Card Header */}
             <div className="relative overflow-hidden rounded-sm bg-[#050609] p-6 border-b border-white/5">
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <p style={{ fontFamily: "var(--font-goldman)" }} className="text-[10px] uppercase tracking-[0.2em] text-[#ff8a3c]">
                            {metricsLabel}
                        </p>
                        <h3 className="mt-1 text-sm font-medium text-white">{metricsSubtitle}</h3>
                    </div>
                    <div className="rounded-sm border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-400">
                        v1.0.4
                    </div>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[#4ade80]"></span>
                        Operational
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[#ff8a3c]"></span>
                        High Performance
                    </span>
                </div>
             </div>

             {/* Metrics Grid */}
             <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
                {/* Cell 1: LCP */}
                <div className="bg-[#0b0d14] p-5 transition-colors hover:bg-[#10121b]">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">LCP</p>
                    <p style={{ fontFamily: "var(--font-goldman)" }} className="mt-2 text-2xl text-white">
                        <span ref={lcpRef}>0.7</span>s
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-500">Tyypillinen lataus</p>
                </div>

                {/* Cell 2: Score */}
                <div className="relative bg-[#0b0d14] p-5 transition-colors hover:bg-[#10121b]">
                    <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
                    <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Score</p>
                    <p style={{ fontFamily: "var(--font-goldman)" }} className="mt-2 text-2xl text-[#ff8a3c]">
                        <span ref={scoreRef}>98</span>/100
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-500">Performance</p>
                </div>

                {/* Cell 3: POP-OUT STACK DISPLAY */}
                <div className="bg-[#0b0d14] p-4 transition-colors hover:bg-[#10121b]">
                    <p 
                        ref={labelRef}
                        className={`mb-3 text-[9px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                            activeTech ? "text-[#ff8a3c]" : "text-zinc-500"
                        }`}
                    >
                        {activeTech || "Stack"}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2">
                        {STACK_ICONS.map((tech) => (
                            <div 
                                key={tech.name} 
                                onMouseEnter={() => setActiveTech(tech.name)}
                                onMouseLeave={() => setActiveTech(null)}
                                className={`
                                    group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm 
                                    border border-white/5 bg-white/5 
                                    transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                    hover:z-50 hover:scale-[1.4] hover:bg-[#090b12] hover:border-[#ff8a3c] 
                                    hover:shadow-[0_10px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(255,138,60,0.3)]
                                `}
                            >
                                <div className="relative h-4 w-4 opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                                    <Image 
                                        src={tech.src} 
                                        alt={tech.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:mb-3">
                                   <div className="whitespace-nowrap rounded-sm border border-[#ff8a3c]/30 bg-[#090b12]/90 px-2 py-1 backdrop-blur-md">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff8a3c] shadow-sm">
                                        {tech.name}
                                      </span>
                                   </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cell 4: Security */}
                <div className="bg-[#0b0d14] p-5 transition-colors hover:bg-[#10121b]">
                     <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Security</p>
                     <div className="mt-4 flex items-center gap-2 text-[#4ade80]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        <span className="text-xs font-medium tracking-wide">Enterprise</span>
                     </div>
                </div>
             </div>

             <div className="bg-[#090b12] p-4 text-center">
                 <p className="text-[10px] text-zinc-600">{metricsFootnote}</p>
             </div>
             
             <div className="absolute top-0 right-0 h-6 w-6 border-t border-r border-[#ff8a3c]/40 pointer-events-none" />
             <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-[#ff8a3c]/40 pointer-events-none" />
           </div>
        </aside>

      </div>
    </section>
  );
}