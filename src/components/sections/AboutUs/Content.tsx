"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AboutUsProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  techTitle: string;
  techBody: string;
  bizTitle: string;
  bizBody: string;
  note: string;
  samuliPhoto: string;
  joukoPhoto: string;
};

const SAMULI_STACK = [
  { name: "Next.js", icon: "/tech/nextjs.svg" },
  { name: "React", icon: "/tech/react.svg" },
  { name: "Sanity", icon: "/tech/sanity.svg" },
  { name: "Tailwind", icon: "/tech/tailwind.svg" },
  { name: "GSAP", icon: "/tech/gsap.svg" },
  { name: "Vercel", icon: "/tech/vercel.svg" },
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
  techTitle,
  techBody,
  bizTitle,
  bizBody,
  note,
  samuliPhoto,
  joukoPhoto,
}: AboutUsProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".laser-beam",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          stagger: 0.1,
        }
      )
        .fromTo(
          ".tech-grid",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "<"
        )
        .fromTo(
          ".animate-text",
          { y: 20, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            stagger: 0.05,
          },
          "-=0.4"
        )
        .fromTo(
          ".tech-card",
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(2.5)",
            stagger: 0.1,
          },
          "-=0.2"
        );
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
        <div className="laser-beam h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40 will-change-transform" />
        <div className="laser-beam absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] will-change-transform" />
        <div className="laser-beam absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent opacity-90 mix-blend-screen will-change-transform" />
      </div>

      {/* --- TECH BACKGROUND ELEMENTS --- */}
      <div className="tech-grid absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] will-change-transform" />

      <div
        className="tech-grid absolute left-1/2 top-0 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,138,60,0.15) 0%, rgba(255,138,60,0.05) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        {/* === LEFT SIDE: TEXT === */}
        <div className="relative max-w-xl space-y-8">
          <div className="animate-text absolute -left-8 -top-8 hidden text-zinc-800 lg:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
            </svg>
          </div>

          <div className="animate-text inline-flex items-center gap-3">
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
            className="animate-text text-balance text-4xl font-bold leading-none text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {title}
          </h2>

          <div className="animate-text relative border-l-2 border-zinc-800 pl-6">
            <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="animate-text flex items-center gap-3 rounded-sm border border-white/5 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <span className="text-[#ff8a3c]">⚠</span>
            <p className="text-xs font-medium text-zinc-400">{note}</p>
          </div>
        </div>

        {/* === RIGHT SIDE: CARDS === */}
        <div className="grid w-full max-w-xl gap-6 lg:max-w-none lg:flex lg:flex-col perspective-[1000px]">
          <div className="tech-card will-change-transform">
            <TechCard
              img={samuliPhoto}
              role="Samuli"
              roleColor="text-[#ff8a3c]"
              name={techTitle}
              body={techBody}
              tags={SAMULI_STACK}
            />
          </div>

          <div className="tech-card will-change-transform">
            <TechCard
              img={joukoPhoto}
              role="Jouko"
              roleColor="text-[#38bdf8]"
              name={bizTitle}
              body={bizBody}
              tags={JOUKO_STACK}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SUB-COMPONENT ---
type Tag = string | { name: string; icon: string };

function TechCard({
  img,
  role,
  roleColor,
  name,
  body,
  tags,
}: {
  img: string;
  role: string;
  roleColor: string;
  name: string;
  body: string;
  tags: Tag[];
}) {
  return (
    <article className="group relative isolate overflow-hidden rounded-sm bg-[#090b12] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,138,60,0.15)]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/10 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-[1px] -z-10 bg-[#090b12]" />

      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,138,60,0.1) 0%, rgba(255,138,60,0.02) 50%, transparent 70%)",
        }}
      />

      <div className="p-6 sm:p-8">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* PHOTO CONTAINER */}
            {/* Added: group-hover:scale-[1.35] and rotate for the "Pop" effect */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 shadow-lg transition-all duration-500 ease-out group-hover:z-10 group-hover:border-[#ff8a3c] group-hover:scale-[1.35] group-hover:-rotate-3 group-hover:shadow-[0_0_20px_rgba(255,138,60,0.5)]">
              <Image
                src={img}
                alt={name}
                fill
                sizes="80px"
                className="object-cover opacity-90 transition-all duration-500 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
            </div>

            <div className="space-y-1">
              <p
                style={{ fontFamily: "var(--font-goldman)" }}
                className={`text-[10px] uppercase tracking-[0.1em] ${roleColor}`}
              >
                {role}
              </p>
              <h3
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-xl text-white sm:text-2xl"
              >
                {name}
              </h3>
            </div>
          </div>
        </header>

        <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
          {body}
        </p>

        {/* Footer Tags */}
        <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-white/5">
          {tags.map((tag: Tag, i: number) => {
            const isString = typeof tag === "string";
            const label = isString ? tag : tag.name;

            return (
              <span
                key={i}
                // Added: group-hover:scale-110 to enlarge stacks on card hover
                className="flex items-center gap-1.5 rounded-sm bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white"
              >
                {!isString && (
                  <div className="relative h-3 w-3 opacity-70 group-hover:opacity-100">
                    <Image
                      src={tag.icon}
                      alt={label}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/10 transition-colors duration-300 group-hover:border-[#ff8a3c]" />
      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/10 transition-colors duration-300 group-hover:border-[#ff8a3c]" />
    </article>
  );
}