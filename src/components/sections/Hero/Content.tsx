"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother"; // Import this!
import ParticleBackground from "@/components/ui/ParticleBackground";

// Register the plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollSmoother);
}

type Banner = {
  id: string;
  message: string;
  link?: string;
  linkText?: string;
  variant: "info" | "warning" | "success" | "urgent" | "promo";
  icon: "none" | "info" | "warning" | "megaphone" | "sparkles" | "clock";
};

type HeroProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  rotatingWords: string[];
  titleEnd: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  banners?: Banner[];
  heroDesktopVideo?: string | null;
  heroMobileVideo?: string | null;
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
  banners = [],
  heroDesktopVideo,
  heroMobileVideo,
}: HeroProps) {
  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const stackButtonRef = useRef<HTMLButtonElement>(null);
  const rotatingWordRef = useRef<HTMLSpanElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "fi";
  
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Text & Button Entrance (skip h1 for LCP)
    tl.fromTo(".animate-in", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }
    );
  }, { scope: containerRef });

  useEffect(() => {
    if (!rotatingWords || rotatingWords.length === 0) return;
    
    // Initial highlight expand on mount
    const highlightEl = highlightRef.current;
    const wordEl = rotatingWordRef.current;
    if (highlightEl && wordEl) {
      // Start with word hidden
      gsap.set(wordEl, { opacity: 0 });
      // Expand highlight, then show word
      gsap.to(highlightEl, {
        scaleX: 1,
        duration: 0.25,
        ease: "power2.out",
        delay: 0.5,
        onComplete: () => {
          gsap.to(wordEl, { opacity: 1, duration: 0.15 });
        }
      });
    }
    
    const interval = setInterval(() => {
      const wordEl = rotatingWordRef.current;
      const highlightEl = highlightRef.current;
      if (!wordEl || !highlightEl) return;

      // Create timeline for smooth sequence
      const tl = gsap.timeline();
      
      // Phase 1: Fade out word
      tl.to(wordEl, {
        opacity: 0,
        duration: 0.12,
        ease: "power2.in",
      })
      // Phase 2: Collapse highlight to center
      .to(highlightEl, {
        scaleX: 0,
        duration: 0.18,
        ease: "power2.in",
      })
      // Phase 3: Update word
      .call(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
      })
      // Phase 4: Expand highlight from center
      .to(highlightEl, {
        scaleX: 1,
        duration: 0.18,
        ease: "power2.out",
      })
      // Phase 5: Fade in word
      .to(wordEl, {
        opacity: 1,
        duration: 0.12,
        ease: "power2.out",
      });
      
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [rotatingWords]);

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

  const toggleStack = () => {
    const techStack = techStackRef.current;
    const button = stackButtonRef.current;
    if (!techStack || !button) return;

    const items = gsap.utils.toArray<HTMLElement>(techStack.querySelectorAll('.tech-item'));
    const layers = button.querySelectorAll('.stack-layer');
    const backdrop = techStack.querySelector('.stack-backdrop');
    const container = techStack.querySelector('.stack-container');

    if (!isStackOpen) {
      // OPEN animation
      setIsStackOpen(true);
      
      // Animate button layers to spread apart
      gsap.to(layers[0], { y: -8, duration: 0.3, ease: 'back.out(2)' });
      gsap.to(layers[1], { y: 0, duration: 0.3, ease: 'back.out(2)' });
      gsap.to(layers[2], { y: 8, duration: 0.3, ease: 'back.out(2)' });
      
      // Show the tech stack container
      gsap.set(techStack, { display: 'flex' });
      
      // Fade in backdrop (mobile only)
      if (backdrop) {
        gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      }
      
      // Slide in container (mobile only)
      if (container) {
        gsap.fromTo(container, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' }
        );
      }
      
      // Animate each tech item
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { 
            x: window.innerWidth < 1024 ? 0 : 80, 
            y: window.innerWidth < 1024 ? 20 : 0,
            opacity: 0, 
            scale: window.innerWidth < 1024 ? 0.9 : 0.8,
            rotation: 0
          },
          { 
            x: 0, 
            y: 0,
            opacity: 1, 
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: i * 0.06,
            ease: 'back.out(1.7)'
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
      
      // Animate items
      items.forEach((item, i) => {
        gsap.to(item, { 
          y: 20,
          opacity: 0, 
          scale: 0.9,
          duration: 0.3,
          delay: (items.length - 1 - i) * 0.03,
          ease: 'power2.in'
        });
      });
      
      // Fade out backdrop and container
      if (backdrop) {
        gsap.to(backdrop, { opacity: 0, duration: 0.3, delay: 0.2 });
      }
      if (container) {
        gsap.to(container, { y: 30, opacity: 0, duration: 0.3, delay: 0.1 });
      }
      
      // Hide container after animation
      gsap.to(techStack, { 
        duration: 0.01, 
        delay: 0.5,
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

  // Banner variant styles
  const bannerStyles: Record<Banner["variant"], { bg: string; border: string; text: string; accent: string }> = {
    info: { 
      bg: "bg-blue-500/10", 
      border: "border-blue-500/30", 
      text: "text-blue-100", 
      accent: "text-blue-400" 
    },
    warning: { 
      bg: "bg-orange-500/10", 
      border: "border-orange-500/30", 
      text: "text-orange-100", 
      accent: "text-orange-400" 
    },
    success: { 
      bg: "bg-emerald-500/10", 
      border: "border-emerald-500/30", 
      text: "text-emerald-100", 
      accent: "text-emerald-400" 
    },
    urgent: { 
      bg: "bg-red-500/15", 
      border: "border-red-500/40", 
      text: "text-red-100", 
      accent: "text-red-400" 
    },
    promo: { 
      bg: "bg-purple-500/10", 
      border: "border-purple-500/30", 
      text: "text-purple-100", 
      accent: "text-purple-400" 
    },
  };

  // Banner icon components
  const BannerIcon = ({ icon, className }: { icon: Banner["icon"]; className?: string }) => {
    switch (icon) {
      case "info":
        return (
          <svg className={className} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
        );
      case "warning":
        return (
          <svg className={className} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
      case "megaphone":
        return (
          <svg className={className} viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.92 3.845a19.361 19.361 0 01-6.3 1.98C6.765 5.942 5.89 6 5 6a4 4 0 00-.504 7.969 15.974 15.974 0 001.271 3.341c.397.77 1.342 1 2.05.59l.867-.5c.726-.42.94-1.321.588-2.021-.166-.33-.315-.666-.448-1.004 1.8.358 3.511.964 5.096 1.78A17.964 17.964 0 0015 10c0-2.161-.381-4.234-1.08-6.155zM15.243 3.097A19.456 19.456 0 0116.5 10c0 2.431-.445 4.758-1.257 6.903l-.018.047a.5.5 0 00.575.687 17.48 17.48 0 002.443-.857.5.5 0 00.305-.503A18.967 18.967 0 0018.5 10c0-2.156-.359-4.231-1.02-6.168a.5.5 0 00-.305-.503 17.46 17.46 0 00-2.443-.857.5.5 0 00-.546.742l.057.083z" />
          </svg>
        );
      case "sparkles":
        return (
          <svg className={className} viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
          </svg>
        );
      case "clock":
        return (
          <svg className={className} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef} // Scope for GSAP
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#050609] pt-24 lg:pt-28"
    >
      {/* === URGENT BANNERS === */}
      {banners.length > 0 && (
        <div className="absolute top-16 left-0 right-0 z-50 flex flex-col gap-2 px-4 sm:px-6 lg:top-20">
          {banners.map((banner) => {
            const style = bannerStyles[banner.variant];
            const content = (
              <div
                key={banner.id}
                className={`
                  mx-auto max-w-4xl w-full rounded-lg border backdrop-blur-md
                  ${style.bg} ${style.border}
                  px-4 py-3 sm:px-6
                  flex items-center justify-center gap-3
                  animate-in
                  shadow-lg
                `}
              >
                {banner.icon !== "none" && (
                  <BannerIcon 
                    icon={banner.icon} 
                    className={`h-5 w-5 flex-shrink-0 ${style.accent}`} 
                  />
                )}
                <p className={`text-sm sm:text-base font-medium ${style.text} text-center`}>
                  {banner.message}
                </p>
                {banner.link && banner.linkText && (
                  <span className={`text-sm font-semibold ${style.accent} whitespace-nowrap hover:underline`}>
                    {banner.linkText} →
                  </span>
                )}
              </div>
            );

            if (banner.link) {
              return (
                <a
                  key={banner.id}
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-[1.01]"
                >
                  {content}
                </a>
              );
            }

            return content;
          })}
        </div>
      )}

      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0 z-0">
        {/* Video Background (takes priority if available) */}
        {(heroDesktopVideo || heroMobileVideo) ? (
          <>
            {/* Desktop Video */}
            {heroDesktopVideo && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="hidden md:block absolute inset-0 h-full w-full object-cover"
              >
                <source src={heroDesktopVideo} type="video/mp4" />
              </video>
            )}
            {/* Mobile Video */}
            {heroMobileVideo && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="md:hidden absolute inset-0 h-full w-full object-cover"
              >
                <source src={heroMobileVideo} type="video/mp4" />
              </video>
            )}
            {/* Video overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          /* Particle Background Effect (fallback when no video) */
          <ParticleBackground />
        )}
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
            <span className="relative inline-block">
              {/* Highlight bar - stays visible */}
              <span
                ref={highlightRef}
                className="absolute inset-y-0 -inset-x-3 bg-gradient-to-r from-[#ff6b00] via-[#ff8a3c] to-[#ffb347] rounded-md"
                style={{ 
                  transform: "scaleX(0)",
                  transformOrigin: "center",
                }}
              />
              {/* The rotating word - dark text on orange highlight */}
              <span 
                ref={rotatingWordRef}
                className="relative inline-block px-1 text-zinc-900 font-bold"
              >
                {rotatingWords && rotatingWords.length > 0 
                  ? rotatingWords[currentWordIndex] 
                  : titleAccent}
              </span>
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

        {/* Tech Stack - Modal on mobile, sidebar on desktop */}
        <div 
          ref={techStackRef}
          className="hidden fixed inset-0 z-50 lg:fixed lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:inset-auto xl:right-12"
        >
          {/* Backdrop - mobile only */}
          <div 
            className="stack-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm lg:hidden"
            onClick={toggleStack}
          />
          
          {/* Container - modal on mobile, sidebar on desktop */}
          <div className="stack-container absolute inset-x-4 top-1/2 -translate-y-1/2 max-h-[80vh] overflow-y-auto rounded-lg border border-[#ff8a3c]/30 bg-[#08090C]/95 p-6 backdrop-blur-md lg:relative lg:inset-auto lg:translate-y-0 lg:max-h-none lg:overflow-visible lg:rounded-xl lg:border-[#ff8a3c]/30 lg:bg-gradient-to-b lg:from-[#111113] lg:to-[#0a0a0c] lg:p-8 lg:shadow-2xl lg:shadow-black/60 lg:backdrop-blur-xl">
            {/* Glow effect - desktop only */}
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top,rgba(255,138,60,0.08),transparent_60%)] pointer-events-none hidden lg:block" />
            
            {/* Close button */}
            <button
              onClick={toggleStack}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#ff8a3c]/30 bg-[#ff8a3c]/10 text-[#ff8a3c] transition-colors hover:bg-[#ff8a3c]/20 lg:right-6 lg:top-6 cursor-pointer"
              aria-label="Close"
            >
              <svg className="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Title */}
            <h3 
              className="mb-6 text-xl font-bold uppercase tracking-wider text-[#ff8a3c] relative z-10"
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              Tech Stack
            </h3>
            
            {/* Tech items */}
            <div className="flex flex-col items-start gap-5 lg:items-center">
              {STACK_ICONS.map((tech, idx) => (
                <div
                  key={`${tech.name}-${idx}`}
                  className="tech-item group/tech relative flex w-full items-center gap-5 outline-none lg:w-auto lg:cursor-default lg:select-none"
                >
                  {/* Glow behind - desktop only */}
                  <span className="tech-glow pointer-events-none absolute left-0 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,138,60,0.35)_0%,transparent_60%)] opacity-0 blur-md lg:block" />

                  <div className="tech-icon relative z-10 flex h-14 w-14 shrink-0 items-center justify-center lg:h-16 lg:w-16">
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      width={56}
                      height={56}
                      className={`object-contain ${tech.invert ? 'invert brightness-100' : ''}`}
                      draggable={false}
                    />
                  </div>

                  {/* Name and description */}
                  <div className="flex flex-col items-start gap-1">
                    <span
                      className="tech-label text-base font-bold text-white lg:text-lg lg:cursor-default"
                      style={{ fontFamily: "var(--font-goldman)" }}
                    >
                      {tech.name}
                    </span>
                    <span className="text-sm text-zinc-400 max-w-[280px] lg:max-w-[200px]">
                      {tech.desc}
                    </span>
                  </div>

                  {/* Underline - desktop only */}
                  <span className="tech-underline pointer-events-none absolute bottom-0 left-0 hidden h-[2px] w-16 bg-gradient-to-r from-[#ff8a3c] to-transparent opacity-90 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}