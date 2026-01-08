"use client";

import React, { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TestimonialProps = {
  quote: string;
  author?: string;
};

function splitGraphemes(text: string) {
  // Robust-ish: keeps emojis/surrogates intact. (Not perfect for every combined glyph,
  // but much better than .split("") and works great for typical copy.)
  return Array.from(text);
}

export default function Testimonial({ quote, author }: TestimonialProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const chars = useMemo(() => splitGraphemes(quote ?? ""), [quote]);
  const hasQuote = (quote ?? "").trim().length > 0;

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root || !hasQuote) return;

      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      const lasers = gsap.utils.toArray<HTMLElement>(q(".t-laser"));
      const card = (q(".t-card")[0] as HTMLElement | undefined) ?? null;
      const icon = (q(".t-icon")[0] as HTMLElement | undefined) ?? null;
      const letters = gsap.utils.toArray<HTMLElement>(q(".t-letter"));
      const authorEl = (q(".t-author")[0] as HTMLElement | undefined) ?? null;
      const corners = (q(".t-corners")[0] as HTMLElement | undefined) ?? null;
      const grid = (q(".t-grid")[0] as HTMLElement | undefined) ?? null;

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lasers, { scaleX: 1, opacity: 1 });
        if (card) gsap.set(card, { opacity: 1, y: 0, scale: 1, rotateX: 0 });
        if (icon) gsap.set(icon, { opacity: 1, y: 0, scale: 1 });
        gsap.set(letters, { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" });
        if (authorEl) gsap.set(authorEl, { opacity: 1, y: 0, filter: "blur(0px)" });
        if (grid) gsap.set(grid, { opacity: 0.25 });
        if (corners) gsap.set(corners, { opacity: 1 });
        return () => {};
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Initial states
        gsap.set(lasers, { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" });

        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 18,
            scale: 0.985,
            rotateX: 8,
            transformPerspective: 900,
            transformOrigin: "50% 80%",
            willChange: "transform, opacity",
          });
        }

        if (icon) gsap.set(icon, { opacity: 0, y: 10, scale: 0.9, filter: "blur(6px)" });

        // Letter reveal: do NOT use ScrambleText. We animate per-letter spans.
        gsap.set(letters, {
          opacity: 0,
          y: 10,
          rotateX: 35,
          transformPerspective: 800,
          transformOrigin: "50% 100%",
          filter: "blur(8px)",
          willChange: "transform, opacity, filter",
        });

        if (authorEl) gsap.set(authorEl, { opacity: 0, y: 10, filter: "blur(8px)" });

        if (corners) gsap.set(corners, { opacity: 0 });
        if (grid) gsap.set(grid, { opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        // Lasers
        tl.to(lasers, { scaleX: 1, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.08 }, 0);

        // Card + framing
        if (card) tl.to(card, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.6, ease: "power3.out" }, 0.12);
        if (corners) tl.to(corners, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.22);
        if (grid) tl.to(grid, { opacity: 0.25, duration: 0.35, ease: "power2.out" }, 0.28);

        // Quote icon
        if (icon) tl.to(icon, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(2.0)" }, 0.26);

        // Letter-by-letter reveal (readable, not too fast)
        tl.to(
          letters,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            stagger: { each: 0.018, from: "start" }, // ~18ms/char -> readable even for short quotes
          },
          0.34
        );

        if (authorEl) {
          tl.to(authorEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }, ">-0.15");
        }

        // Laser afterglow pulse
        tl.to(
          lasers,
          {
            opacity: (i) => (i === 2 ? 0.95 : 0.55),
            duration: 0.22,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
            stagger: 0.06,
          },
          0.48
        );

        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 88%",
          once: true,
          onEnter: () => tl.play(0),
        });

        // Hover: subtle lift + grid/corners/edge glow (no cursor changes)
        const cleanup: Array<() => void> = [];
        if (card) {
          const onEnter = () => {
            gsap.to(card, { y: -4, scale: 1.01, duration: 0.18, ease: "power3.out" });
            gsap.to(card, { boxShadow: "0 0 0 1px rgba(255,138,60,0.14), 0 22px 70px rgba(0,0,0,0.55)", duration: 0.18, ease: "power3.out" });
            if (grid) gsap.to(grid, { opacity: 0.35, duration: 0.2, ease: "power2.out" });
            if (corners) gsap.to(corners, { opacity: 1, duration: 0.2, ease: "power2.out" });
          };
          const onLeave = () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.22, ease: "power3.out" });
            gsap.to(card, { boxShadow: "none", duration: 0.22, ease: "power3.out" });
            if (grid) gsap.to(grid, { opacity: 0.25, duration: 0.2, ease: "power2.out" });
          };

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          cleanup.push(() => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          });
        }

        return () => {
          st.kill();
          tl.kill();
          cleanup.forEach((fn) => fn());
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [hasQuote, chars.length, author ?? ""] }
  );

  if (!hasQuote) return null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050609] py-16 lg:py-24">
      {/* Top laser beam separator (same vibe as other dark sections) */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="t-laser h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40 scale-x-0" />
        <div className="t-laser absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] scale-x-0" />
        <div className="t-laser absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90 scale-x-0" />
      </div>

      {/* Dark background (no glare stripes) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:52px_52px] opacity-25" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,60,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_70%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="t-card group relative rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 lg:p-12 text-center">
          {/* Corners */}
          <div className="t-corners absolute inset-0 pointer-events-none opacity-0">
            <div className="absolute top-0 left-0 h-6 w-6 border-l-2 border-t-2 border-[#ff8a3c]/60" />
            <div className="absolute top-0 right-0 h-6 w-6 border-r-2 border-t-2 border-[#ff8a3c]/60" />
            <div className="absolute bottom-0 left-0 h-6 w-6 border-l-2 border-b-2 border-[#ff8a3c]/60" />
            <div className="absolute bottom-0 right-0 h-6 w-6 border-r-2 border-b-2 border-[#ff8a3c]/60" />
          </div>

          {/* Blueprint grid (used in GSAP hover + reveal) */}
          <div
            className="t-grid absolute inset-0 opacity-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,138,60,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,138,60,0.10) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10">
            {/* Quote icon */}
            <div className="t-icon">
              <svg
                className="mx-auto h-12 w-12 text-[#ff8a3c]/45 mb-7"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Letter-by-letter quote */}
            <blockquote className="text-xl lg:text-2xl text-zinc-200 leading-relaxed italic mb-8">
              <span className="sr-only">{quote}</span>
              <span aria-hidden="true" className="inline">
                <span className="text-zinc-300">&ldquo;</span>
                {chars.map((ch, i) => (
                  <span
                    key={`${ch}-${i}`}
                    className="t-letter inline-block whitespace-pre"
                  >
                    {ch}
                  </span>
                ))}
                <span className="text-zinc-300">&rdquo;</span>
              </span>
            </blockquote>

            {author && (
              <div className="t-author flex items-center justify-center gap-3">
                <cite
                  style={{ fontFamily: "var(--font-goldman)" }}
                  className="text-sm text-[#ff8a3c] not-italic uppercase tracking-[0.15em]"
                >
                  {author}
                </cite>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
