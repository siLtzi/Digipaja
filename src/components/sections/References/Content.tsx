"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type ReferenceProject = {
  title: string;
  category: string;
  description: string;
  image: string;
  mobileImage: string;
  slug: string;
  tags: string[];
  liveUrl?: string;
};

type ReferencesProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  projects: ReferenceProject[];
  locale: "fi" | "en";
  translations: {
    viewCase: string;
    viewCaseStudy: string;
    scrollToExplore: string;
    projectStatus: string;
    online: string;
    mobile: string;
    visitWebsite: string;
  };
};

export default function ReferencesContent({
  eyebrow,
  title,
  subtitle,
  projects,
  locale,
  translations,
}: ReferencesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // === GSAP: LASER BEAM ANIMATION ===
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".laser-beam:nth-child(1)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.4, duration: 0.3, ease: "expo.out" }
      )
      .fromTo(
        ".laser-beam:nth-child(2)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.3, ease: "expo.out" },
        "-=0.25"
      )
      .fromTo(
        ".laser-beam:nth-child(3)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.9, duration: 0.3, ease: "expo.out" },
        "-=0.25"
      );
    },
    { scope: sectionRef }
  );

  // === GSAP: SCANLINE & SCROLL RESET ===
  useGSAP(
    () => {
      if (!viewportRef.current) return;

      const tl = gsap.timeline();

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: "auto",
        });
        setHasScrolled(false);
      }

      if (mobileScrollRef.current) {
        mobileScrollRef.current.scrollTo({
          top: 0,
          behavior: "auto",
        });
      }

      tl.fromTo(
        scanlineRef.current,
        { top: "-10%", opacity: 0 },
        { top: "110%", opacity: 0.5, duration: 0.25, ease: "power2.inOut" }
      );
    },
    { dependencies: [activeIndex], scope: viewportRef }
  );

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setHasScrolled(scrollContainerRef.current.scrollTop > 50);
    }
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="references"
      className="relative overflow-hidden bg-[#08090C] py-24 lg:py-32 text-zinc-100"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-[4px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 scale-x-0" />
      </div>

      {/* === LIGHT GRID BACKGROUND === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090C] via-transparent to-[#08090C]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#ff8a3c]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 space-y-6 md:w-2/3">
          <span
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold"
          >
            [ {eyebrow} ]
          </span>
          <h2
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-balance text-4xl font-bold leading-none text-white sm:text-5xl"
          >
            {title}
          </h2>
          <div className="relative border-l-2 border-[#ff8a3c]/30 pl-6">
            <p className="max-w-xl text-base text-zinc-300 sm:text-lg">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* === MOBILE: Expandable Cards (Hidden on LG) === */}
          <div className="flex flex-col gap-4 lg:hidden">
            {projects.map((project, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div 
                  key={project.slug} 
                  className="rounded-xl border border-white/10 bg-[#0a0a0c] overflow-hidden transition-all duration-300"
                >
                  {/* Header - Always visible */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className={`text-2xl font-bold ${isExpanded ? 'text-[#ff8a3c]' : 'text-zinc-700'}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className={`font-bold transition-colors ${isExpanded ? 'text-white' : 'text-zinc-300'}`}>
                          {project.title}
                        </h3>
                        <p className="text-xs text-zinc-500">{project.category}</p>
                      </div>
                    </div>
                    <svg 
                      className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expandable Content */}
                  <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4">
                        {/* Phone Mockup */}
                        <div className="relative mx-auto w-[200px] rounded-[28px] border-4 border-[#1a1c23] bg-[#0a0a0a] p-1 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                          {/* Notch */}
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-black z-20" />
                          {/* Screen - Scrollable */}
                          <div 
                            className="relative w-full rounded-[22px] overflow-y-auto bg-[#050609] touch-pan-y overscroll-y-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
                            style={{ aspectRatio: '9/19' }}
                          >
                            <Image 
                              src={project.mobileImage || project.image} 
                              alt={project.title}
                              width={400}
                              height={1000}
                              className="w-full h-auto object-cover object-top select-none"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-sm text-zinc-400 text-center">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] uppercase tracking-wider text-zinc-500 bg-white/5 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex gap-2 justify-center">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 rounded-lg bg-[#ff8a3c] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-white"
                            >
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              {translations.visitWebsite}
                            </a>
                          )}
                          <Link
                            href={`/${locale}/projects/${project.slug}`}
                            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                          >
                            {translations.viewCase}
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* === DESKTOP: Project List (Hidden on Mobile) === */}
          <div className="hidden lg:flex flex-col gap-2 lg:col-span-5">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={project.slug} className="group relative">
                  {/* WRAPPER: Handles Desktop Logic */}
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`
                      w-full flex flex-col gap-4 overflow-hidden rounded-lg text-left transition-all duration-300 cursor-pointer
                      p-6 border bg-gradient-to-br from-white/[0.03] to-transparent
                      ${
                        isActive
                          ? "border-[#ff8a3c]/20 scale-[1.02]"
                          : "border-white/5 hover:border-[#ff8a3c]/20 hover:scale-[1.02]"
                      }
                    `}
                  >
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,rgba(255,138,60,0.1)_0%,transparent_70%)] transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    
                    {/* Top border glow */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                      <div className={`absolute bottom-0 right-0 w-[1px] bg-gradient-to-t from-[#ff8a3c]/40 to-transparent transition-all duration-300 ${isActive ? 'h-10 from-[#ff8a3c]/60' : 'h-6 group-hover:h-10 group-hover:from-[#ff8a3c]/60'}`} />
                      <div className={`absolute bottom-0 right-0 h-[1px] bg-gradient-to-l from-[#ff8a3c]/40 to-transparent transition-all duration-300 ${isActive ? 'w-10 from-[#ff8a3c]/60' : 'w-6 group-hover:w-10 group-hover:from-[#ff8a3c]/60'}`} />
                    </div>

                    {/* === TEXT CONTENT === */}
                    <div className="flex flex-col gap-2 relative z-10">
                        {/* Active Indicator Line */}
                        <div
                          className={`absolute -left-6 top-0 bottom-0 w-1 bg-[#ff8a3c] transition-transform duration-300 ${
                            isActive ? "scale-y-100" : "scale-y-0"
                          }`}
                        />
                        
                        <div className="flex items-center justify-between w-full">
                          <span
                            style={{ fontFamily: "var(--font-goldman)" }}
                            className={`text-xs uppercase tracking-widest ${
                              isActive ? "text-[#ff8a3c]" : "text-zinc-500"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="flex gap-2">
                            {project.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] uppercase tracking-wider text-zinc-600 bg-white/5 px-1.5 py-0.5 rounded-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3
                          className={`mt-2 text-xl font-bold transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-zinc-400 group-hover:text-zinc-200"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={`text-sm line-clamp-2 leading-relaxed transition-colors ${
                            isActive ? "text-zinc-300" : "text-zinc-500"
                          }`}
                        >
                          {project.description}
                        </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT: INTERACTIVE MONITORS (Desktop Only) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-32">
              
              <div ref={viewportRef} className="group relative w-full">
                
                {/* 1. DESKTOP MONITOR WRAPPER */}
                <div className="relative flex flex-col w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                  
                  {/* Browser-like top bar */}
                  <div className="flex items-center gap-3 border-b border-white/5 bg-[#0f0f12] px-4 py-3">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                      <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                      <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    {/* URL bar */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-1.5 max-w-sm w-full">
                        <svg className="h-3 w-3 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <span className="text-[11px] text-zinc-400 truncate">
                          {activeProject.liveUrl ? activeProject.liveUrl.replace(/^https?:\/\//, '') : `${activeProject.slug}.digipaja.fi`}
                        </span>
                      </div>
                    </div>
                    {/* Visit Website button */}
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-md bg-[#ff8a3c]/10 border border-[#ff8a3c]/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ff8a3c] transition-all hover:bg-[#ff8a3c] hover:text-black"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {translations.visitWebsite}
                      </a>
                    )}
                    {/* Status indicator */}
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-[10px] text-[#4ade80]">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]"></span>
                        </span>
                        {translations.online}
                      </span>
                    </div>
                  </div>
                  
                  {/* --- THE SCREEN (Image) --- */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050609]">
                    
                    {/* SCROLLABLE CONTAINER */}
                    <div
                      ref={scrollContainerRef}
                      onScroll={handleScroll}
                      onWheel={(e) => e.stopPropagation()}
                      className="absolute inset-0 h-full w-full overflow-y-auto bg-[#050609] overscroll-y-contain pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                      <div className="relative w-full min-h-[101%]">
                        <Image
                          src={activeProject.image}
                          alt={activeProject.title}
                          width={1600}
                          height={3000}
                          className="w-full h-auto object-cover object-top"
                          priority
                        />
                      </div>
                    </div>

                    {/* VISUAL OVERLAYS */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div
                        ref={scanlineRef}
                        className="absolute left-0 right-0 h-[20%] bg-gradient-to-b from-transparent via-[#ff8a3c]/10 to-transparent pointer-events-none"
                      />

                      {/* Scroll Hint */}
                      <div
                        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 pointer-events-none ${
                          hasScrolled
                            ? "opacity-0 translate-y-4"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        <span
                          style={{ fontFamily: "var(--font-goldman)" }}
                          className="text-[10px] font-bold uppercase tracking-widest text-[#ff8a3c] bg-black/80 px-3 py-1 rounded-full border border-[#ff8a3c]/30 shadow-lg"
                        >
                          {translations.scrollToExplore}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button - Below monitor */}
                <div className="mt-8 flex justify-start">
                  <Link
                    href={`/${locale}/projects/${activeProject.slug}`}
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="group relative isolate flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)]"
                  >
                    <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                    <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                    <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                    <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                    <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                    <span className="relative z-10">{translations.viewCaseStudy}</span>
                    <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none"><path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>

                {/* 2. MOBILE SATELLITE (Desktop Visual Decor) */}
                <div
                  className="absolute -bottom-4 -right-4 z-50 w-[130px] overflow-hidden rounded-[20px] border-2 border-white/10 bg-gradient-to-br from-[#1a1c23] to-[#0a0a0a] shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_20px_rgba(255,138,60,0.1)] transition-all duration-300 hover:scale-105 hover:border-[#ff8a3c]/30 hover:shadow-[0_0_40px_rgba(255,138,60,0.2)]"
                  style={{ aspectRatio: "9/19" }}
                >
                  {/* Phone notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-black/80 z-50" />
                  
                  {/* Corner accent glow */}
                  <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-4 h-[1px] bg-gradient-to-r from-[#ff8a3c]/40 to-transparent" />
                    <div className="absolute top-0 left-0 h-4 w-[1px] bg-gradient-to-b from-[#ff8a3c]/40 to-transparent" />
                  </div>
                  
                  <div
                    ref={mobileScrollRef}
                    className="absolute inset-1 z-30 h-[calc(100%-8px)] w-[calc(100%-8px)] overflow-y-auto rounded-[16px] bg-[#050609] overscroll-y-contain pointer-events-auto touch-pan-y [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    <div className="relative w-full min-h-[101%]">
                      <Image
                        src={activeProject.mobileImage || activeProject.image}
                        alt={`${activeProject.title} Mobile View`}
                        width={800}
                        height={2000}
                        className="w-full h-auto object-cover object-top opacity-90 select-none"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 z-40 flex justify-center pointer-events-none">
                    <span className="text-[8px] font-bold text-[#ff8a3c]/70 uppercase tracking-widest bg-black/70 px-2 py-0.5 rounded-full border border-[#ff8a3c]/20 backdrop-blur">
                      {translations.mobile}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}