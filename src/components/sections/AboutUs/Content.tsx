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
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  values: Value[];
  statsTitle: string;
  stats: Stat[];
  team: TeamMember[];
};

const SAMULI_STACK = [
  { name: "Next.js", icon: "/tech/nextjs.svg" },
  { name: "React", icon: "/tech/react.svg" },
  { name: "TypeScript", icon: "/tech/typescript.svg" },
  { name: "Sanity", icon: "/tech/sanity.svg" },
  { name: "Tailwind", icon: "/tech/tailwind.svg" },
  { name: "GSAP", icon: "/tech/gsap.svg" },
];

const JOUKO_STACK = [
  { name: "Sales", icon: "/tech/sales.svg" },
  { name: "Planning", icon: "/tech/planning.svg" },
  { name: "Management", icon: "/tech/management.svg" },
];

export default function AboutUsContent({
  eyebrow,
  title,
  subtitle,
  missionTitle,
  missionText,
  valuesTitle,
  values,
  statsTitle,
  stats,
  team,
}: AboutUsProps) {
  const containerRef = useRef<HTMLElement>(null);

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
          ".laser-beam:nth-child(1)",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.4, duration: 0.4, ease: "expo.out" }
        )
        .fromTo(
          ".laser-beam:nth-child(2)",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.4, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(
          ".laser-beam:nth-child(3)",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.9, duration: 0.4, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-eyebrow",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2"
        )
        .fromTo(
          ".hero-title",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".hero-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        );

      // Stats animation with counter effect
      gsap.fromTo(
        ".stat-item",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Mission section
      const missionTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      missionTl
        .fromTo(
          ".mission-title",
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7 }
        )
        .fromTo(
          ".mission-text",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".mission-line",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );

      // Values animation
      gsap.fromTo(
        ".value-card",
        { y: 40, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Team cards animation
      gsap.fromTo(
        ".team-card",
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".team-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation for decorative elements
      gsap.to(".float-element", {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about-us"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-[4px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 scale-x-0" />
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div
        className="absolute left-1/2 top-0 h-[1000px] w-[1400px] -translate-x-1/2 -translate-y-1/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,138,60,0.12) 0%, rgba(255,138,60,0.03) 50%, transparent 70%)",
        }}
      />

      {/* Floating decorative elements */}
      <div className="float-element absolute top-40 left-[10%] w-2 h-2 rounded-full bg-[#ff8a3c]/30 blur-sm" />
      <div className="float-element absolute top-60 right-[15%] w-3 h-3 rounded-full bg-[#ff8a3c]/20 blur-sm" />
      <div className="float-element absolute top-[40%] left-[5%] w-1.5 h-1.5 rounded-full bg-[#ff8a3c]/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ==================== HERO SECTION ==================== */}
        <div className="about-hero text-center max-w-4xl mx-auto mb-20 lg:mb-28">
          <div className="hero-eyebrow inline-flex items-center gap-3 mb-6 opacity-0">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
            </span>
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#ff8a3c]"
            >
              [ {eyebrow} ]
            </span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-goldman)" }}
            className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white mb-8 opacity-0"
          >
            {title}
          </h2>

          <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto opacity-0">
            {subtitle}
          </p>
        </div>

        {/* ==================== STATS SECTION ==================== */}
        <div className="stats-section mb-20 lg:mb-28">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item group relative p-6 lg:p-8 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm transition-all duration-500 hover:border-[#ff8a3c]/30 hover:scale-[1.02]"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,rgba(255,138,60,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#ff8a3c]/30 rounded-tl-xl transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-[#ff8a3c]/60" />
                
                <div className="relative z-10">
                  <span
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff8a3c] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left"
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== MISSION SECTION ==================== */}
        <div className="mission-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28 items-center">
          <div className="relative">
            {/* Decorative line */}
            <div className="mission-line absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff8a3c] via-[#ff8a3c]/50 to-transparent rounded-full origin-top" />
            
            <h3
              style={{ fontFamily: "var(--font-goldman)" }}
              className="mission-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 pl-4 opacity-0"
            >
              {missionTitle}
            </h3>
            
            <p className="mission-text text-base lg:text-lg text-zinc-300 leading-relaxed pl-4 opacity-0">
              {missionText}
            </p>
          </div>

          {/* Values Grid */}
          <div className="values-section">
            <h4
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-sm uppercase tracking-[0.2em] text-[#ff8a3c] mb-6"
            >
              {valuesTitle}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-card group relative p-5 rounded-lg border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent transition-all duration-300 hover:border-[#ff8a3c]/20 hover:bg-white/[0.03]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Number indicator */}
                  <span
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="absolute top-3 right-3 text-[10px] text-zinc-600 font-mono"
                  >
                    0{index + 1}
                  </span>
                  
                  <h5
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="text-white font-medium mb-2 group-hover:text-[#ff8a3c] transition-colors"
                  >
                    {value.title}
                  </h5>
                  <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== TEAM SECTION ==================== */}
        <div className="team-section">
          <div className="text-center mb-12">
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-sm uppercase tracking-[0.2em] text-[#ff8a3c]"
            >
              [ Tiimi ]
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <TeamCard
                key={index}
                member={member}
                stack={index === 0 ? SAMULI_STACK : JOUKO_STACK}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== TEAM CARD COMPONENT ====================
function TeamCard({
  member,
  stack,
  index,
}: {
  member: TeamMember;
  stack: { name: string; icon: string }[];
  index: number;
}) {
  const isFirst = index === 0;
  const accentColor = isFirst ? "#ff8a3c" : "#38bdf8";

  return (
    <article className="team-card group relative rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:p-8 transition-all duration-500 hover:border-[#ff8a3c]/20 overflow-hidden">
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${isFirst ? "top left" : "top right"}, ${accentColor}10 0%, transparent 60%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ color: accentColor }}
      />

      {/* Corner brackets */}
      <span
        className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 transition-all duration-500 group-hover:h-8 group-hover:w-8"
        style={{ borderColor: `${accentColor}50` }}
      />
      <span
        className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 transition-all duration-500 group-hover:h-8 group-hover:w-8"
        style={{ borderColor: `${accentColor}50` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-start gap-5 mb-6">
          {/* Photo */}
          <div
            className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-[-3deg]"
            style={{
              borderColor: `${accentColor}30`,
              boxShadow: `0 0 0 0 ${accentColor}00`,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: `0 0 30px ${accentColor}40`,
              }}
            />
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="120px"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <p
              style={{ fontFamily: "var(--font-goldman)", color: accentColor }}
              className="text-[10px] uppercase tracking-[0.15em] mb-1"
            >
              {member.role}
            </p>
            <h3
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-xl sm:text-2xl text-white group-hover:text-[#ff8a3c] transition-colors duration-300 mb-1"
            >
              {member.name}
            </h3>
            <p className="text-sm text-zinc-500">{member.title}</p>
          </div>
        </header>

        {/* Bio */}
        <p className="text-sm sm:text-base leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors mb-6">
          {member.bio}
        </p>

        {/* Quote */}
        {member.quote && (
          <blockquote className="relative pl-4 py-3 mb-6 border-l-2 border-zinc-700 group-hover:border-[#ff8a3c]/50 transition-colors">
            <p className="text-sm italic text-zinc-500 group-hover:text-zinc-400 transition-colors">
              &ldquo;{member.quote}&rdquo;
            </p>
          </blockquote>
        )}

        {/* Tech Stack */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {stack.map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 border border-white/5 transition-all duration-300 group-hover:bg-white/10 group-hover:text-zinc-200 group-hover:border-white/10"
              >
                <div className="relative h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                </div>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}