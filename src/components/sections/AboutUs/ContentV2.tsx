"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Value = {
  title: string;
  description: string;
};

type Stat = {
  value: string;
  label: string;
};

type TeamMember = {
  name: string;
  role: string;
  title: string;
  bio: string;
  quote: string;
  photo: string;
  color: string;
  stack: { name: string; icon: string }[];
};

type AboutUsProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description2: string;
  bulletPoint: string;
  ctaText: string;
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  values: Value[];
  statsTitle: string;
  stats: Stat[];
  team: TeamMember[];
};

export default function AboutUsContent({
  eyebrow,
  title,
  subtitle,
  description2,
  bulletPoint,
  ctaText,
  missionTitle,
  missionText,
  valuesTitle,
  values,
  statsTitle,
  stats,
  team,
}: AboutUsProps) {
  const containerRef = useRef<HTMLElement>(null);

  const goldmanStyle = { fontFamily: "var(--font-goldman)" } as const;

  const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const stripLeadingName = (rawTitle: string, fullName: string) => {
    const titleText = rawTitle?.trim();
    const nameText = fullName?.trim();
    if (!titleText || !nameText) return titleText;

    if (titleText.toLowerCase() === nameText.toLowerCase()) return "";

    const namePattern = escapeRegExp(nameText);
    const stripped = titleText.replace(
      new RegExp(`^${namePattern}\\s*(?:\\u2013|\\u2014|-|:|\\|)\\s*`, "i"),
      ""
    );
    return stripped.trim();
  };

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      // Check if mobile for earlier trigger points
      const isMobile = window.innerWidth < 768;

      // Hero animations - trigger earlier on mobile
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-hero",
          start: isMobile ? "top 98%" : "top 90%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      heroTl
        .fromTo(
          ".laser-beam:nth-child(1)",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.4, duration: 0.25, ease: "expo.out" }
        )
        .fromTo(
          ".laser-beam:nth-child(2)",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.25, ease: "expo.out" },
          "-=0.2"
        )
        .fromTo(
          ".laser-beam:nth-child(3)",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.6, duration: 0.25, ease: "expo.out" },
          "-=0.2"
        );

      // Team section timeline - container expands first, then header + image pop up together
      const teamTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".team-container",
          start: isMobile ? "top 100%" : "top 98%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      teamTl
        // Container expands from center first
        .fromTo(
          ".team-container",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.inOut" }
        )
        // Laser beam glow animates in
        .fromTo(
          ".container-laser-blur",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.4, duration: 0.3, ease: "expo.out" },
          "-=0.25"
        )
        .fromTo(
          ".container-laser-line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.3, ease: "expo.out" },
          "-=0.25"
        )
        .fromTo(
          ".container-laser-highlight",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.6, duration: 0.3, ease: "expo.out" },
          "-=0.25"
        )
        // Header text pops up from the left
        .fromTo(
          ".hero-content",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
          "-=0.1"
        )
        // Image rises up from the right at the same time
        .fromTo(
          ".team-photo-group",
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
          "<" // same time as header
        )
        // Team content fades in after
        .fromTo(
          ".team-content",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.06 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  // Sorting team to have Jouko first, Samuli second based on name or role if possible
  // Assuming the array order is roughly correct or we find them. 
  // In fi.json, Jouko is listed, Samuli is listed.
  // The design specifically puts Jouko on Left, Samuli on Right.
  const jouko = team.find(m => m.name.toLowerCase().includes('jouko')) || team[1];
  const samuli = team.find(m => m.name.toLowerCase().includes('samuli')) || team[0];

  const joukoTitle = jouko ? stripLeadingName(jouko.title, jouko.name) : "";
  const samuliTitle = samuli ? stripLeadingName(samuli.title, samuli.name) : "";

  return (
    <section
      ref={containerRef}
      id="about-us"
      className="relative overflow-hidden bg-[#050609] pt-24 lg:pt-32 pb-0"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-[4px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 scale-x-0" />
      </div>

       {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Main Glow */}
      <div
        className="absolute right-0 top-20 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/4 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,138,60,0.15) 0%, rgba(255,138,60,0.02) 60%, transparent 80%)",
        }}
      />


      {/* === HERO SECTION: Text Left, Image Right === */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 about-hero">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          
          {/* LEFT: Text Content */}
          <div className="hero-content flex flex-col gap-4">
            <span
              style={goldmanStyle}
              className="text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold"
            >
              [ {eyebrow} ]
            </span>
            
            <h2
              style={goldmanStyle}
              className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]"
            >
              {title}
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* RIGHT: Team Photo */}
          <div className="team-photo-group relative w-full flex justify-center lg:justify-end overflow-visible">
            <div
              className="relative w-full max-w-[600px] h-[320px] sm:h-[380px] lg:h-[420px] overflow-visible"
              style={{
                filter:
                  "drop-shadow(0 0 5px rgba(255,138,60,0.9)) drop-shadow(0 0 12px rgba(255,138,60,0.6)) drop-shadow(0 0 24px rgba(255,138,60,0.3))",
              }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src="/image/joukojasamuli5.png" 
                  alt="Jouko ja Samuli"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === FULL-WIDTH TEAM INFO CONTAINER === */}
      <div className="team-container relative z-20 w-full origin-center" style={{ transformOrigin: 'center center' }}>
        {/* Top edge laser separator */}
        <div className="absolute -top-[2px] left-0 right-0 z-30 flex flex-col items-center">
          <div className="container-laser-blur h-[4px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md origin-center" />
          <div className="container-laser-line absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] origin-center" />
          <div className="container-laser-highlight absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen origin-center" />
        </div>
        
        {/* Container background */}
        <div className="relative w-full bg-[#080a0d]">

          {/* Content wrapper */}
          <div className="max-w-6xl mx-auto px-8 py-14 lg:py-18">
            
            {/* Team bios grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
              
              {/* JOUKO */}
              {jouko && (
                <div className="team-content group relative">
                  {/* Vertical accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#ff8a3c] via-[#ff8a3c]/50 to-transparent rounded-full" />
                  
                  <div className="pl-6">
                    <h3
                      style={goldmanStyle}
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#ff8a3c] tracking-[0.12em] mb-2"
                    >
                      {jouko.name}
                    </h3>
                  
                    {joukoTitle ? (
                      <p style={goldmanStyle} className="text-white/70 font-semibold text-xl lg:text-2xl mb-4">
                        {joukoTitle}
                      </p>
                    ) : null}
                    <p className="text-gray-400 leading-relaxed text-lg lg:text-xl">
                      {jouko.bio}
                    </p>
                  </div>
                </div>
              )}

              {/* SAMULI */}
              {samuli && (
                <div className="team-content group relative">
                  {/* Vertical accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#ff8a3c] via-[#ff8a3c]/50 to-transparent rounded-full" />
                  
                  <div className="pl-6">
                    <h3
                      style={goldmanStyle}
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#ff8a3c] tracking-[0.12em] mb-2"
                    >
                      {samuli.name}
                    </h3>

                    {samuliTitle ? (
                      <p style={goldmanStyle} className="text-white/70 font-semibold text-xl lg:text-2xl mb-4">
                        {samuliTitle}
                      </p>
                    ) : null}
                    <p className="text-gray-400 leading-relaxed text-lg lg:text-xl">
                      {samuli.bio}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional info row */}
            <div className="team-content mt-14 pt-10 border-t border-white/[0.06] text-center max-w-3xl mx-auto">
              <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">{description2}</p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#ff8a3c]/50" />
                <span className="text-[#ff8a3c] text-base">✓</span>
                <p className="text-gray-200 font-medium italic text-lg lg:text-xl">{bulletPoint}</p>
                <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#ff8a3c]/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
