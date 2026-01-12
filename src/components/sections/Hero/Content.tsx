"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  rotatingWords: string[];
  titleEnd: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  desktopVideo: string;
  mobileVideo: string;
};

const STACK_ICONS = [
  { name: "Next.js", src: "/tech/nextjs.svg", desc: "React-pohjainen ohjelmistokehys", invert: true },
  { name: "Astro", src: "/tech/astro.svg", desc: "Kevyet & nopeat staattiset sivut", invert: false },
  { name: "Sanity", src: "/tech/sanity.svg", desc: "Moderni sisällönhallinta", invert: false },
  { name: "Vercel", src: "/tech/vercel.svg", desc: "Nopea globaali hosting", invert: true },
  { name: "Tailwind", src: "/tech/tailwind.svg", desc: "Tehokas CSS-tyylitys", invert: false },
  { name: "GSAP", src: "/tech/gsap.svg", desc: "Sulava animaatiokirjasto", invert: false },
  { name: "i18n", src: "/tech/monikielisyys.svg", desc: "Monikielisyystuki", invert: false },
];

export default function HeroContent({
  eyebrow,
  titleStart,
  titleAccent,
  rotatingWords,
  titleEnd,
  subtitle,
  primaryCta,
  secondaryCta,
  desktopVideo,
  mobileVideo,
}: HeroProps) {
  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const stackButtonRef = useRef<HTMLButtonElement>(null);
  const rotatingWordRef = useRef<HTMLSpanElement>(null);
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "fi";
  
  // === 1. MAIN ENTRANCE ANIMATION ===
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Text & Button Entrance (skip h1 for LCP)
    tl.fromTo(".animate-in", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }
    );
  }, { scope: containerRef });

  // === 2. ROTATING WORDS ANIMATION ===
  useEffect(() => {
    if (!rotatingWords || rotatingWords.length === 0) return;
    
    const interval = setInterval(() => {
      const wordEl = rotatingWordRef.current;
      if (!wordEl) return;

      // Animate out: slide up and fade
      gsap.to(wordEl, {
        y: -20,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          // Update to next word
          setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
          
          // Reset position to below and animate in
          gsap.set(wordEl, { y: 20 });
          gsap.to(wordEl, {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [rotatingWords]);

  // === 3. TECH STACK HOVER ANIMATIONS ===
  useEffect(() => {
    const techStack = techStackRef.current;
    if (!techStack) return;

    const items = gsap.utils.toArray<HTMLElement>(techStack.querySelectorAll('.tech-item'));
    const cleanups: Array<() => void> = [];

    items.forEach((item) => {
      const icon = item.querySelector<HTMLElement>('.tech-icon');
      const label = item.querySelector<HTMLElement>('.tech-label');
      const underline = item.querySelector<HTMLElement>('.tech-underline');
      const glow = item.querySelector<HTMLElement>('.tech-glow');

      // Initial states
      gsap.set(underline, { scaleX: 0, opacity: 0.9, transformOrigin: '50% 50%' });
      gsap.set(glow, { opacity: 0 });

      const toX = gsap.quickTo(item, 'x', { duration: 0.22, ease: 'power3.out' });
      const toY = gsap.quickTo(item, 'y', { duration: 0.22, ease: 'power3.out' });
      const toR = gsap.quickTo(item, 'rotateZ', { duration: 0.22, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        const r = item.getBoundingClientRect();
        const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        const clamp = gsap.utils.clamp(-1, 1);
        const dx = clamp(px) * 6;
        const dy = clamp(py) * 4;
        toX(dx);
        toY(dy);
        toR(dx * 0.15);
      };

      const onEnter = () => {
        gsap.set(item, { zIndex: 30 });
        item.addEventListener('mousemove', onMove);
        gsap.to(item, { scale: 1.15, duration: 0.18, ease: 'power3.out' });
        if (glow) gsap.to(glow, { opacity: 1, duration: 0.2, ease: 'power2.out' });
        if (underline) gsap.to(underline, { scaleX: 1, opacity: 1, duration: 0.22, ease: 'power2.out' });
        if (icon) gsap.to(icon, { scale: 1.25, duration: 0.18, ease: 'back.out(2.4)' });
        if (label) gsap.to(label, { letterSpacing: '0.02em', duration: 0.18, ease: 'power2.out' });
      };

      const onLeave = () => {
        item.removeEventListener('mousemove', onMove);
        toX(0);
        toY(0);
        toR(0);
        gsap.to(item, { scale: 1, duration: 0.2, ease: 'power3.out' });
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.2, ease: 'power2.out' });
        if (underline) gsap.to(underline, { scaleX: 0, opacity: 0.9, duration: 0.2, ease: 'power2.out' });
        if (icon) gsap.to(icon, { scale: 1, duration: 0.2, ease: 'power2.out' });
        if (label) gsap.to(label, { letterSpacing: '0em', duration: 0.2, ease: 'power2.out' });
        gsap.delayedCall(0.22, () => gsap.set(item, { zIndex: 0 }));
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
        item.removeEventListener('mousemove', onMove);
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  // === 3. TOGGLE TECH STACK ANIMATION ===
  const toggleStack = () => {
    const techStack = techStackRef.current;
    const button = stackButtonRef.current;
    if (!techStack || !button) return;

    const items = gsap.utils.toArray<HTMLElement>(techStack.querySelectorAll('.tech-item'));
    const layers = button.querySelectorAll('.stack-layer');

    if (!isStackOpen) {
      // OPEN animation
      setIsStackOpen(true);
      
      // Animate button layers to spread apart
      gsap.to(layers[0], { y: -8, duration: 0.3, ease: 'back.out(2)' });
      gsap.to(layers[1], { y: 0, duration: 0.3, ease: 'back.out(2)' });
      gsap.to(layers[2], { y: 8, duration: 0.3, ease: 'back.out(2)' });
      
      // Show the tech stack container
      gsap.set(techStack, { display: 'flex', opacity: 0 });
      gsap.to(techStack, { opacity: 1, duration: 0.3 });
      
      // Animate each tech item flying in from the left (where the button is)
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { 
            x: -600, 
            y: 100,
            opacity: 0, 
            scale: 0.2,
            rotation: -30
          },
          { 
            x: 0, 
            y: 0,
            opacity: 1, 
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'back.out(1.2)'
          }
        );
      });
    } else {
      // CLOSE animation
      setIsStackOpen(false);
      
      // Animate button layers back together
      gsap.to(layers[0], { y: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(layers[1], { y: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(layers[2], { y: 0, duration: 0.3, ease: 'power2.inOut' });
      
      // Animate items flying back to the button
      items.forEach((item, i) => {
        gsap.to(item, { 
          x: -600, 
          y: 100,
          opacity: 0, 
          scale: 0.2,
          rotation: -30,
          duration: 0.4,
          delay: (items.length - 1 - i) * 0.04,
          ease: 'power3.in'
        });
      });
      
      // Hide container after animation
      gsap.to(techStack, { 
        opacity: 0, 
        duration: 0.2, 
        delay: 0.25,
        onComplete: () => { gsap.set(techStack, { display: 'none' }); }
      });
    }
  };

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
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#050609] pt-24 lg:pt-28"
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
          <span
            style={{ fontFamily: "var(--font-goldman)" }}
            className="animate-in text-[#ff8a3c] text-[10px] sm:text-[13px] uppercase tracking-[0.15em] sm:tracking-[0.25em] font-semibold opacity-0"
          >
            [ {eyebrow} ]
          </span>

          {/* Title */}
          <h1
            style={{ 
              fontFamily: "var(--font-goldman)",
              animation: "fadeInUpHero 0.6s ease-out"
            }}
            className="text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-[4.5rem]"
          >
            {titleStart}
            <br />
            <span 
              ref={rotatingWordRef}
              className="inline-block bg-gradient-to-r from-[#ffb347] via-[#ff8a3c] to-[#ff6b00] bg-clip-text text-transparent"
            >
              {rotatingWords && rotatingWords.length > 0 
                ? rotatingWords[currentWordIndex] 
                : titleAccent}
            </span>
            <br />
            {titleEnd}
          </h1>

          {/* Subtitle */}
          <div className="animate-in border-l-2 border-[#ff8a3c]/30 pl-6 opacity-0">
            <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {subtitle}
            </p>
          </div>

          {/* CTAs + Stack Button */}
          <div className="animate-in flex flex-wrap items-center gap-5 pt-4 opacity-0">
            <Link
              href={`/${locale}/yhteydenotto`}
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
            </Link>

            <button
              type="button"
              onClick={() => scrollTo("references")}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="group flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-sm transition-all hover:border-[#ff8a3c]/50 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span>{secondaryCta}</span>
            </button>

            {/* Stack Layers Button - orange themed */}
            <button
              ref={stackButtonRef}
              type="button"
              onClick={toggleStack}
              className="group relative flex h-16 w-16 items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer overflow-visible"
              aria-label="Toggle tech stack"
            >
              {/* Stacked layers SVG - monochrome orange */}
              <svg 
                viewBox="0 0 48 48" 
                className="h-10 w-10 drop-shadow-lg overflow-visible"
                fill="none"
                style={{ overflow: 'visible' }}
              >
                {/* Top layer */}
                <path 
                  className="stack-layer transition-all duration-300"
                  d="M24 8L40 18L24 28L8 18L24 8Z" 
                  fill={isStackOpen ? "#ff8a3c" : "#ff6b00"}
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Middle layer */}
                <path 
                  className="stack-layer transition-all duration-300"
                  d="M8 24L24 34L40 24" 
                  fill="none"
                  stroke={isStackOpen ? "#ffb347" : "#ff8a3c"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Bottom layer */}
                <path 
                  className="stack-layer transition-all duration-300"
                  d="M8 32L24 42L40 32" 
                  fill="none"
                  stroke={isStackOpen ? "#ffd699" : "#ffb347"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tech Stack - positioned on the right side of hero */}
        <div 
          ref={techStackRef}
          className="hidden absolute right-8 top-1/2 -translate-y-1/2 lg:right-16 xl:right-24 flex-col items-center gap-5"
        >
          {STACK_ICONS.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="tech-item group/tech cursor-default select-none relative flex items-center gap-5 outline-none"
            >
              {/* Glow behind */}
              <span className="tech-glow pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,138,60,0.35)_0%,transparent_60%)] blur-md opacity-0" />

              <div className="tech-icon relative z-10 flex h-16 w-16 items-center justify-center">
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={56}
                  height={56}
                  className={`object-contain ${tech.invert ? 'invert brightness-100' : ''}`}
                  draggable={false}
                />
              </div>

              {/* Name and description on the right */}
              <div className="flex flex-col items-start gap-1">
                <span
                  className="tech-label cursor-default text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-goldman)" }}
                >
                  {tech.name}
                </span>
                <span className="text-sm text-zinc-400 max-w-[200px]">
                  {tech.desc}
                </span>
              </div>

              {/* Underline draws in on hover */}
              <span className="tech-underline pointer-events-none absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#ff8a3c] to-transparent opacity-90" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}