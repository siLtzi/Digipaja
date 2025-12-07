"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reuse your Project type here or import it if it's shared
type Project = {
  _id: string;
  title: string;
  tag?: string;
  imageUrl?: string;
  url?: string;
};

type WorkShowcaseProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  projects: Project[];
};

export default function WorkShowcase({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  projects,
}: WorkShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card");

      // Animate cards staggering in
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      // bg-transparent lets the global grid show.
      // border-white/5 is subtler than zinc-900.
      className="relative border-t border-white/5 bg-transparent py-24 lg:py-32"
    >

      <div className="relative mx-auto max-w-7xl px-[clamp(16px,8vw,80px)]">
        {/* --- Header --- */}
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-500">
              {eyebrow}
            </p>
            <h2
              style={{ fontFamily: "var(--font-clash-display)" }}
              className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              {subtitle}
            </p>
          </div>

          {/* Optional CTA Button */}
          {projects.length > 0 && (
            <div className="hidden md:block">
              <button className="group flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white">
                {ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>

        {/* --- Dynamic Grid --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((p, index) => {
            // Logic to make the 1st and 4th item span full width for a magazine look
            const isFullWidth = index === 0 || index === 3;

            return (
              <a
                key={p._id}
                href={p.url || "#"}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noreferrer" : undefined}
                className={`work-card group relative flex flex-col opacity-0 translate-y-12 ${
                  isFullWidth ? "md:col-span-2" : ""
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 ${
                    isFullWidth ? "aspect-[16/8]" : "aspect-[4/3]"
                  }`}
                >
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />

                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-600">
                      No Image Available
                    </div>
                  )}

                  {/* Floating Tag (Only visible on hover or always, your choice) */}
                  {p.tag && (
                    <div className="absolute right-4 top-4 z-20 overflow-hidden rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                      {p.tag}
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="mt-4 flex items-start justify-between px-2">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 transition-colors group-hover:text-fuchsia-400">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {p.url ? p.url.replace(/^https?:\/\//, "") : "Case Study"}
                    </p>
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-300 group-hover:border-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Mobile CTA (shown at bottom) */}
        {projects.length > 0 && (
          <div className="mt-12 md:hidden">
            <button className="group flex w-full justify-center items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white">
              {ctaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
