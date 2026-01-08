"use client";

import React, { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ContentSection = {
  title: string;
  content: string;
  icon: "challenge" | "solution" | "results";
};

type ProjectContentProps = {
  sections: ContentSection[];
};

const icons = {
  challenge: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  solution: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  results: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

export default function ProjectContent({ sections }: ProjectContentProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const validSections = useMemo(
    () => (sections ?? []).filter((s) => s?.content && s.content.trim().length > 0),
    [sections]
  );

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root || validSections.length === 0) return;

      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      const lasers = gsap.utils.toArray<HTMLElement>(q(".content-laser"));
      const cards = gsap.utils.toArray<HTMLElement>(q(".content-card"));
      const iconsEls = gsap.utils.toArray<HTMLElement>(q(".content-icon"));
      const titles = gsap.utils.toArray<HTMLElement>(q(".content-title"));
      const bodies = gsap.utils.toArray<HTMLElement>(q(".content-body"));
      const accents = gsap.utils.toArray<HTMLElement>(q(".content-accent"));

      // Hover (GSAP instead of clunky CSS transitions)
      const cleanupHover: Array<() => void> = [];

      const bindHover = () => {
        cards.forEach((card) => {
          const grid = card.querySelector<HTMLElement>(".content-grid");
          const corners = card.querySelector<HTMLElement>(".content-corners");
          const iconWrap = card.querySelector<HTMLElement>(".content-icon");
          const accent = card.querySelector<HTMLElement>(".content-accent");

          gsap.set([grid, corners], { opacity: 0 });
          gsap.set(accent, { scaleX: 0.35, opacity: 0.35, transformOrigin: "50% 50%" });

          const onEnter = () => {
            gsap.to(card, { y: -4, scale: 1.01, duration: 0.18, ease: "power3.out" });
            gsap.to(card, {
              boxShadow: "0 0 0 1px rgba(255,138,60,0.14), 0 16px 45px rgba(0,0,0,0.18)",
              duration: 0.18,
              ease: "power3.out",
            });
            gsap.to(grid, { opacity: 0.9, duration: 0.22, ease: "power2.out" });
            gsap.to(corners, { opacity: 1, duration: 0.18, ease: "power2.out" });
            gsap.to(accent, { scaleX: 1, opacity: 1, duration: 0.22, ease: "power2.out" });
            gsap.to(iconWrap, { scale: 1.08, duration: 0.18, ease: "back.out(2.2)" });
          };

          const onLeave = () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.2, ease: "power3.out" });
            gsap.to(card, { boxShadow: "none", duration: 0.2, ease: "power3.out" });
            gsap.to(grid, { opacity: 0, duration: 0.2, ease: "power2.out" });
            gsap.to(corners, { opacity: 0, duration: 0.2, ease: "power2.out" });
            gsap.to(accent, { scaleX: 0.35, opacity: 0.35, duration: 0.2, ease: "power2.out" });
            gsap.to(iconWrap, { scale: 1, duration: 0.2, ease: "power2.out" });
          };

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);

          cleanupHover.push(() => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          });
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lasers, { scaleX: 1, opacity: 1 });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotateX: 0 });
        gsap.set(iconsEls, { opacity: 1, scale: 1 });
        gsap.set(titles, { opacity: 1, y: 0 });
        gsap.set(bodies, { opacity: 1, y: 0 });
        gsap.set(accents, { scaleX: 1, opacity: 0.6 });
        bindHover();
        return () => cleanupHover.forEach((fn) => fn());
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Initial states
        gsap.set(lasers, { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" });

        gsap.set(cards, {
          opacity: 0,
          y: 16,
          scale: 0.985,
          rotateX: 7,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        });

        gsap.set(iconsEls, { opacity: 0, scale: 0.88 });
        gsap.set(titles, { opacity: 0, y: 8, filter: "blur(8px)" });
        gsap.set(bodies, { opacity: 0, y: 10, filter: "blur(6px)" });
        gsap.set(accents, { scaleX: 0.2, opacity: 0.25, transformOrigin: "50% 50%" });

        const tl = gsap.timeline({ paused: true });

        // Laser ignite + micro “pulse”
        tl.to(lasers, { scaleX: 1, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.08 }, 0)
          .to(
            lasers,
            { opacity: (i) => (i === 2 ? 0.95 : 0.55), duration: 0.22, ease: "sine.inOut", yoyo: true, repeat: 1, stagger: 0.06 },
            0.22
          );

        // Cards + title + body (readable pace)
        tl.to(cards, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.55, ease: "power3.out", stagger: 0.12 }, 0.22)
          .to(iconsEls, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.2)", stagger: 0.12 }, 0.34)
          .to(titles, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out", stagger: 0.12 }, 0.36)
          .to(bodies, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out", stagger: 0.12 }, 0.42)
          .to(accents, { scaleX: 1, opacity: 0.6, duration: 0.45, ease: "power2.out", stagger: 0.12 }, 0.48);

        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 88%",
          once: true,
          onEnter: () => tl.play(0),
        });

        bindHover();

        return () => {
          st.kill();
          tl.kill();
          cleanupHover.forEach((fn) => fn());
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [validSections.length] }
  );

  if (validSections.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative py-14 lg:py-20">
      {/* Laser beam separator at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="content-laser h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40" />
        <div className="content-laser absolute h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.55)]" />
        <div className="content-laser absolute h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90" />
      </div>

      {/* Keep background “light” (minimal change) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff8a3c]/[0.02] to-transparent" />
        {/* a tiny touch of tech texture, still light */}
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {validSections.map((item, index) => (
            <div
              key={`${item.icon}-${index}`}
              className="content-card group relative overflow-hidden rounded-sm border border-black/10 bg-white/[0.03] p-6 lg:p-8"
            >
              {/* Blueprint grid (GSAP hover) */}
              <div
                className="content-grid absolute inset-0 opacity-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,138,60,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,138,60,0.12) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Corners (GSAP hover) */}
              <div className="content-corners absolute inset-0 pointer-events-none opacity-0">
                <div className="absolute top-0 left-0 h-4 w-4 border-l border-t border-[#ff8a3c]" />
                <div className="absolute top-0 right-0 h-4 w-4 border-r border-t border-[#ff8a3c]" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-l border-b border-[#ff8a3c]" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-r border-b border-[#ff8a3c]" />
              </div>

              {/* Index */}
              <span className="pointer-events-none absolute top-3 right-4 text-2xl font-bold text-black/10">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="content-icon flex h-10 w-10 items-center justify-center rounded-sm border border-black/10 bg-[#ff8a3c]/10 text-[#ff8a3c]">
                    {icons[item.icon]}
                  </span>

                  <h2
                    className="content-title text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-goldman)" }}
                  >
                    {item.title}
                  </h2>
                </div>

                <p className="content-body text-zinc-300/80 leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Bottom accent (animated) */}
              <div className="content-accent pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
