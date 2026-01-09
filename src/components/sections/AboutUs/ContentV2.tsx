"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

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

      // Hero animations
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      heroTl
        .fromTo(
          ".laser-beam",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.2 }
        )
        .fromTo(
          ".hero-eyebrow",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".hero-text",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.6"
        );

      // Team section timeline - container expands first, then image rises up from behind
      const teamTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".team-container",
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      teamTl
        // Container expands from center first
        .fromTo(
          ".team-container",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.inOut" }
        )
        // Laser beam glow animates in
        .fromTo(
          ".container-laser-blur",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.4, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(
          ".container-laser-line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.4, ease: "expo.out" },
          "-=0.35"
        )
        // Image rises up dramatically from behind - starts much lower
        .fromTo(
          ".team-photo-group",
          { 
            y: 180, 
            opacity: 0, 
            scale: 0.88,
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 0.7, 
            ease: "back.out(1.4)"
          },
          "-=0.15"
        )
        // Team content fades in after
        .fromTo(
          ".team-content",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.08 },
          "-=0.35"
        );
      
      // CTA Button
       gsap.fromTo(
        ".cta-button",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".cta-wrapper",
            start: "top 95%",
          },
        }
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
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-1 w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0" />
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


      {/* === HEADER SECTION === */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 about-hero text-center mb-8">
        <span
          style={goldmanStyle}
          className="hero-eyebrow text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold inline-block"
        >
          [ {eyebrow} ]
        </span>
        
        <h2
          style={goldmanStyle}
          className="hero-title text-balance text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mt-6"
        >
          {title}
        </h2>

        <div className="hero-text max-w-3xl mx-auto mt-8 space-y-4 text-zinc-300 text-lg sm:text-xl leading-relaxed">
          <p>{subtitle}</p>
        </div>
      </div>

      {/* === TEAM PHOTO - CENTERED === */}
      <div className="team-photo-group relative z-10 w-full flex justify-center overflow-visible -mb-1">
        <div
          className="relative w-full max-w-[850px] h-[380px] sm:h-[440px] lg:h-[500px] overflow-visible"
          style={{
            filter:
              "drop-shadow(0 0 5px rgba(255,138,60,0.9)) drop-shadow(0 0 12px rgba(255,138,60,0.6)) drop-shadow(0 0 24px rgba(255,138,60,0.3))",
          }}
        >
          {/* Inner container - NO bottom fade since container will cover it */}
          <div className="relative w-full h-full">
            <Image 
              src="/image/joukojasamuli5.png" 
              alt="Jouko ja Samuli"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 100vw, 850px"
              priority
            />
          </div>
        </div>
      </div>

      {/* === FULL-WIDTH TEAM INFO CONTAINER === */}
      <div className="team-container relative z-20 w-full origin-center" style={{ transformOrigin: 'center center' }}>
        {/* Top edge laser separator - clean sharp line */}
        <div className="absolute -top-[2px] left-0 right-0 z-30 flex flex-col items-center">
          <div className="container-laser-blur h-1 w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md origin-center" />
          <div className="container-laser-line absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent origin-center" />
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
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#ff8a3c] tracking-[0.12em] mb-1"
                    >
                      {jouko.name}
                    </h3>
                    <span className="text-white/60 font-medium text-base lg:text-lg tracking-wide block mb-4">
                      {jouko.role}
                    </span>
                  
                    {joukoTitle ? (
                      <p style={goldmanStyle} className="text-white font-semibold text-lg lg:text-xl mb-3">
                        {joukoTitle}
                      </p>
                    ) : null}
                    <p className="text-gray-400 leading-relaxed text-base lg:text-lg">
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
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#ff8a3c] tracking-[0.12em] mb-1"
                    >
                      {samuli.name}
                    </h3>
                    <span className="text-white/60 font-medium text-base lg:text-lg tracking-wide block mb-4">
                      {samuli.role}
                    </span>

                    {samuliTitle ? (
                      <p style={goldmanStyle} className="text-white font-semibold text-lg lg:text-xl mb-3">
                        {samuliTitle}
                      </p>
                    ) : null}
                    <p className="text-gray-400 leading-relaxed text-base lg:text-lg">
                      {samuli.bio}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional info row */}
            <div className="team-content mt-14 pt-10 border-t border-white/[0.06] text-center max-w-3xl mx-auto">
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed">{description2}</p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#ff8a3c]/50" />
                <span className="text-[#ff8a3c] text-sm">✓</span>
                <p className="text-gray-200 font-medium italic text-base lg:text-lg">{bulletPoint}</p>
                <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#ff8a3c]/50" />
              </div>
            </div>
          </div>

          {/* Bottom subtle line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>

      {/* === CTA BUTTON === */}
      <div className="cta-wrapper relative z-10 flex justify-center mt-12 lg:mt-14 px-6">
         <Link 
           href="/yhteydenotto" 
           style={goldmanStyle}
           className="cta-button group/btn relative flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] transition-all duration-300 text-[#ff8a3c] hover:text-white hover:shadow-[0_0_25px_rgba(255,138,60,0.2)]"
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
              <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </Link>
      </div>
    </section>
  );
}
