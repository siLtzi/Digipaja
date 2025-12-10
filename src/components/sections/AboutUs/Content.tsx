"use client";

import Image from "next/image";

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

// Define the full stack with icons
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
  return (
    <section
      id="about-us"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center">
        <div className="h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c]/50 to-transparent blur-sm" />
        <div className="absolute top-0 h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-50" />
      </div>

      {/* --- TECH BACKGROUND ELEMENTS --- */}
      {/* 1. Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* 2. Top Spotlight (NATURAL FALLOFF) */}
      {/* Increased size to 1200px and added an intermediate color stop for softer fade */}
      <div
        className="absolute left-1/2 top-0 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,138,60,0.15) 0%, rgba(255,138,60,0.05) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        {/* === LEFT SIDE: TEXT === */}
        <div className="relative max-w-xl space-y-8">
          {/* Decor: Corner Plus Sign */}
          <div className="absolute -left-8 -top-8 hidden text-zinc-800 lg:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
            </svg>
          </div>

          {/* Eyebrow / System Status */}
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

          {/* Title */}
          <h2
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-balance text-4xl font-bold leading-none text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {title}
          </h2>

          {/* Subtitle */}
          <div className="relative border-l-2 border-zinc-800 pl-6">
            <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
              {subtitle}
            </p>
          </div>

          {/* Note */}
          <div className="flex items-center gap-3 rounded-sm border border-white/5 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <span className="text-[#ff8a3c]">⚠</span>
            <p className="text-xs font-medium text-zinc-400">{note}</p>
          </div>
        </div>

        {/* === RIGHT SIDE: CARDS === */}
        <div className="grid w-full max-w-xl gap-6 lg:max-w-none lg:flex lg:flex-col">
          {/* === SAMULI CARD (Tech Stack) === */}
          <TechCard
            img={samuliPhoto}
            role="Development & UX"
            roleColor="text-[#ff8a3c]"
            name={techTitle}
            body={techBody}
            tags={SAMULI_STACK}
          />

          {/* === JOUKO CARD (Business) === */}
          <TechCard
            img={joukoPhoto}
            role="Strategy & Relationships"
            roleColor="text-[#38bdf8]"
            name={bizTitle}
            body={bizBody}
            tags={JOUKO_STACK}
          />
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
    <article className="group relative isolate overflow-hidden rounded-sm bg-[#090b12] transition-all duration-300 hover:-translate-y-1">
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/10 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-[1px] -z-10 bg-[#090b12]" />

      {/* Hover Glow Effect (NATURAL FALLOFF) */}
      {/* Increased size to 500px so the gradient has room to fade out completely */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,138,60,0.08) 0%, rgba(255,138,60,0.02) 40%, transparent 70%)",
        }}
      />

      <div className="p-6 sm:p-8">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* PHOTO */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 shadow-lg transition-colors group-hover:border-[#ff8a3c]/40">
              <Image
                src={img}
                alt={name}
                fill
                sizes="80px"
                className="object-cover opacity-90 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
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

        <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300">
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
                className="flex items-center gap-1.5 rounded-sm bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400 transition-colors group-hover:bg-white/10 group-hover:text-zinc-200"
              >
                {!isString && (
                  <div className="relative h-3 w-3 opacity-70">
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

      {/* Decorative Corner Lines */}
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/10 group-hover:border-[#ff8a3c]/50" />
      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/10 group-hover:border-[#ff8a3c]/50" />
    </article>
  );
}
