"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type ReferenceProject = {
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
  tags: string[];
};

type ReferencesProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  projects: ReferenceProject[];
};

export default function ReferencesContent({
  eyebrow,
  title,
  subtitle,
  projects,
}: ReferencesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // === GSAP: GLITCH & SCROLL RESET ===
  useGSAP(
    () => {
      if (!viewportRef.current) return;

      const tl = gsap.timeline();

      // Reset Scroll Positions
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
        setHasScrolled(false);
      }
      if (mobileScrollRef.current) {
        mobileScrollRef.current.scrollTop = 0;
      }

      // Scanline sweep
      tl.fromTo(
        scanlineRef.current,
        { top: "-10%", opacity: 0 },
        { top: "110%", opacity: 0.5, duration: 0.4, ease: "power2.inOut" }
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
      id="references"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32 text-zinc-100"
    >
      {/* Top Separator & Background */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center">
        <div className="h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c]/50 to-transparent blur-sm" />
        <div className="absolute top-0 h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-50" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#ff8a3c]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 space-y-6 md:w-2/3">
          <div className="inline-flex items-center gap-3">
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
            className="text-balance text-4xl font-bold leading-none text-white sm:text-5xl"
          >
            {title}
          </h2>
          <div className="relative border-l-2 border-zinc-800 pl-6">
            <p className="max-w-xl text-base text-zinc-400 sm:text-lg">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: Project List */}
          <div className="flex flex-col gap-2 lg:col-span-5">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={project.slug}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`
                    group relative flex flex-col gap-2 overflow-hidden rounded-sm border p-6 text-left transition-all duration-300
                    ${
                      isActive
                        ? "border-[#ff8a3c] bg-[#ff8a3c]/5"
                        : "border-white/5 bg-transparent hover:border-white/20 hover:bg-white/[0.02]"
                    }
                  `}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-[#ff8a3c] transition-transform duration-300 ${
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
                </button>
              );
            })}
          </div>

          {/* RIGHT: INTERACTIVE MONITORS */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-32">
              <div ref={viewportRef} className="group relative w-full">
                {/* ======================================= */}
                {/* 1. DESKTOP MONITOR (Main View)         */}
                {/* ======================================= */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl">
                  {/* SCROLLABLE CONTAINER — NOW ON TOP (z-30) */}
                  <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="absolute inset-0 z-30 h-full w-full overflow-y-auto bg-[#050609] overscroll-contain pointer-events-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    <div className="relative w-full min-h-[101%]">
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        width={1600}
                        height={3000}
                        className="w-full h-auto object-cover object-top opacity-90"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
                    </div>
                  </div>

                  {/* VISUAL OVERLAYS — NO LONGER BLOCK WHEEL */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* Scanline */}
                    <div
                      ref={scanlineRef}
                      className="absolute left-0 right-0 h-[20%] bg-gradient-to-b from-transparent via-[#ff8a3c]/10 to-transparent pointer-events-none"
                    />
                    {/* Top light gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />

                    {/* Scroll Hint */}
                    <div
                      className={`absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 pointer-events-none ${
                        hasScrolled
                          ? "opacity-0 translate-y-4"
                          : "opacity-100 translate-y-0"
                      }`}
                    >
                      <span
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="text-[10px] font-bold uppercase tracking-widest text-[#ff8a3c] bg-black/80 px-3 py-1 rounded-full border border-[#ff8a3c]/30 shadow-lg"
                      >
                        Scroll to Explore
                      </span>
                      <div className="rounded-full bg-[#ff8a3c]/20 p-2 border border-[#ff8a3c]/30 animate-bounce">
                        <svg
                          className="h-5 w-5 text-[#ff8a3c]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* HUD */}
                  <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-white/10 bg-black/90 p-4 backdrop-blur-md pointer-events-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                        Project Status
                      </span>
                      <span className="flex items-center gap-2 text-xs font-bold text-[#4ade80]">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]"></span>
                        </span>
                        ONLINE
                      </span>
                    </div>

                    <Link
                      href={`/work/${activeProject.slug}`}
                      className="group flex items-center gap-2 rounded-sm bg-[#ff8a3c] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-white hover:text-black cursor-pointer"
                    >
                      View Case Study
                      <svg
                        className="h-3 w-3 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute top-2 left-2 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c]/50 pointer-events-none z-40" />
                  <div className="absolute top-2 right-2 h-4 w-4 border-r-2 border-t-2 border-[#ff8a3c]/50 pointer-events-none z-40" />
                </div>

                {/* ======================================= */}
                {/* 2. MOBILE SATELLITE (Bottom Right)     */}
                {/* ======================================= */}
                <div
                  className="absolute -bottom-8 -right-8 z-50 w-[140px] overflow-hidden rounded-xl border-4 border-[#1a1c23] bg-black shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 hover:z-[60]"
                  style={{ aspectRatio: "9/19" }}
                >
                  {/* Mobile Scroll Container — now on top */}
                  <div
                    ref={mobileScrollRef}
                    className="absolute inset-0 z-30 h-full w-full overflow-y-auto bg-[#050609] pointer-events-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    <div className="relative w-full min-h-[101%]">
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        width={800}
                        height={2000}
                        className="w-full h-auto object-cover object-top opacity-90"
                      />
                    </div>
                  </div>

                  {/* Mobile Visuals — non-blocking */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute inset-0 border-[3px] border-white/5 rounded-lg">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-16 bg-[#1a1c23] rounded-b-md" />
                    </div>
                  </div>

                  {/* Mobile Label */}
                  <div className="absolute bottom-2 left-0 right-0 z-40 flex justify-center pointer-events-none">
                    <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur">
                      Mobile
                    </span>
                  </div>
                </div>

                {/* Tech Deco */}
                <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-600 uppercase tracking-widest">
                  <span>Sys.Ref: {activeProject.slug.toUpperCase()}</span>
                  <span>Lat: 65.0121° N</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}