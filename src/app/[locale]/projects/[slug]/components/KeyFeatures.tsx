"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

type KeyFeaturesProps = {
  features: string[];
  title: string;
};

const featureIcons = {
  responsive: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
  speed: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  seo: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  security: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  analytics: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  cloud: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  ),
  code: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  globe: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  settings: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  database: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  ),
  star: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  ),
  refresh: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  ),
};

const fallbackIconKeys = Object.keys(featureIcons) as Array<keyof typeof featureIcons>;

function pickIcon(feature: string, index: number) {
  const t = feature.toLowerCase();

  if (/(mobile|responsive|tablet)/.test(t)) return featureIcons.responsive;
  if (/(speed|fast|performance|lighthouse)/.test(t)) return featureIcons.speed;
  if (/(seo|search)/.test(t)) return featureIcons.seo;
  if (/(secure|security|ssl|gdpr|privacy)/.test(t)) return featureIcons.security;
  if (/(analytics|tracking|metrics|insights)/.test(t)) return featureIcons.analytics;
  if (/(cloud|hosting|vercel|server|cdn)/.test(t)) return featureIcons.cloud;
  if (/(code|dev|development|custom)/.test(t)) return featureIcons.code;
  if (/(i18n|translation|multilingual|language|global)/.test(t)) return featureIcons.globe;
  if (/(cms|content|manage|editor)/.test(t)) return featureIcons.settings;
  if (/(database|data|storage)/.test(t)) return featureIcons.database;
  if (/(quality|premium|polish)/.test(t)) return featureIcons.star;
  if (/(update|refresh|sync|deploy)/.test(t)) return featureIcons.refresh;

  return featureIcons[fallbackIconKeys[index % fallbackIconKeys.length]];
}

export default function KeyFeatures({ features, title }: KeyFeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(section);

      const lasers = gsap.utils.toArray<HTMLElement>(q(".features-laser"));
      const header = ((q(".features-header")[0] as HTMLElement | undefined) ?? null) as HTMLElement | null;
      const titleEl = ((q(".features-title")[0] as HTMLElement | undefined) ?? null) as HTMLElement | null;
      const cards = gsap.utils.toArray<HTMLElement>(q(".feature-card"));
      const gridLayer = ((q(".features-grid")[0] as HTMLElement | undefined) ?? null) as HTMLElement | null;
      const dotsLayer = ((q(".features-dots")[0] as HTMLElement | undefined) ?? null) as HTMLElement | null;

      gsap.set(section, { willChange: "transform" });
      gsap.set(cards, { willChange: "transform, opacity" });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lasers, { scaleX: 1, opacity: 1 });
        if (header) gsap.set(header, { opacity: 1, y: 0, filter: "blur(0px)" });
        if (titleEl) gsap.set(titleEl, { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotateX: 0 });
        return () => {};
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(lasers, { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" });
        if (header) gsap.set(header, { opacity: 0, y: 10, filter: "blur(10px)" });

        let split: SplitText | null = null;
        if (titleEl) {
          split = new SplitText(titleEl, { type: "chars" });
          gsap.set(split.chars, { yPercent: 105, opacity: 0, filter: "blur(10px)" });
        }

        gsap.set(cards, { opacity: 0, y: 16, scale: 0.985, rotateX: 8, transformOrigin: "50% 100%" });

        // subtle background drift
        if (gridLayer) gsap.set(gridLayer, { backgroundPosition: "0px 0px" });
        if (dotsLayer) gsap.set(dotsLayer, { backgroundPosition: "0px 0px" });

        let gridTween: gsap.core.Tween | null = null;
        let dotsTween: gsap.core.Tween | null = null;

        if (gridLayer) {
          gridTween = gsap.to(gridLayer, { backgroundPosition: "96px 96px", duration: 18, ease: "none", repeat: -1 });
          gridTween.pause();
        }
        if (dotsLayer) {
          dotsTween = gsap.to(dotsLayer, { backgroundPosition: "-140px 120px", duration: 26, ease: "none", repeat: -1 });
          dotsTween.pause();
        }

        const tl = gsap.timeline({ paused: true });

        tl.to(lasers, { scaleX: 1, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.08 }, 0);

        if (header) {
          tl.to(header, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }, 0.10);
        }

        if (split?.chars?.length) {
          tl.to(
            split.chars,
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.75,
              ease: "power3.out",
              stagger: { each: 0.02, from: "center" },
            },
            0.18
          );
        }

        tl.to(
          cards,
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.52, ease: "power3.out", stagger: 0.075 },
          0.32
        );

        tl.to(
          lasers,
          { opacity: (i) => (i === 2 ? 0.95 : 0.55), duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1, stagger: 0.06 },
          0.40
        );

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top 88%",
          end: "bottom 12%",
          onEnter: () => {
            tl.play(0);
            gridTween?.play();
            dotsTween?.play();
          },
          onEnterBack: () => {
            gridTween?.play();
            dotsTween?.play();
          },
          onLeave: () => {
            gridTween?.pause();
            dotsTween?.pause();
          },
          onLeaveBack: () => {
            gridTween?.pause();
            dotsTween?.pause();
          },
          once: true,
        });

        // hover
        const cleanups: Array<() => void> = [];
        cards.forEach((card) => {
          const glow = card.querySelector<HTMLElement>(".feature-glow");
          const grid = card.querySelector<HTMLElement>(".feature-grid");
          const corners = card.querySelector<HTMLElement>(".feature-corners");
          const iconWrap = card.querySelector<HTMLElement>(".feature-icon");
          const accent = card.querySelector<HTMLElement>(".feature-accent");

          if (glow) gsap.set(glow, { opacity: 0 });
          if (grid) gsap.set(grid, { opacity: 0 });
          if (corners) gsap.set(corners, { opacity: 0.35 });
          if (accent) gsap.set(accent, { scaleX: 0.3, opacity: 0.35, transformOrigin: "50% 50%" });

          const hoverIn = () => {
            gsap.to(card, { y: -4, scale: 1.01, duration: 0.18, ease: "power3.out" });
            gsap.to(card, { boxShadow: "0 0 0 1px rgba(255,138,60,0.16), 0 18px 55px rgba(0,0,0,0.55)", duration: 0.18, ease: "power3.out" });
            if (glow) gsap.to(glow, { opacity: 1, duration: 0.22, ease: "power2.out" });
            if (grid) gsap.to(grid, { opacity: 0.45, duration: 0.22, ease: "power2.out" });
            if (corners) gsap.to(corners, { opacity: 1, duration: 0.18, ease: "power2.out" });
            if (accent) gsap.to(accent, { scaleX: 1, opacity: 1, duration: 0.22, ease: "power2.out" });
            if (iconWrap) gsap.to(iconWrap, { scale: 1.08, duration: 0.18, ease: "back.out(2.2)" });
          };

          const hoverOut = () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.2, ease: "power3.out" });
            gsap.to(card, { boxShadow: "none", duration: 0.2, ease: "power3.out" });
            if (glow) gsap.to(glow, { opacity: 0, duration: 0.2, ease: "power2.out" });
            if (grid) gsap.to(grid, { opacity: 0, duration: 0.2, ease: "power2.out" });
            if (corners) gsap.to(corners, { opacity: 0.35, duration: 0.2, ease: "power2.out" });
            if (accent) gsap.to(accent, { scaleX: 0.3, opacity: 0.35, duration: 0.2, ease: "power2.out" });
            if (iconWrap) gsap.to(iconWrap, { scale: 1, duration: 0.2, ease: "power2.out" });
          };

          card.addEventListener("mouseenter", hoverIn);
          card.addEventListener("mouseleave", hoverOut);
          cleanups.push(() => {
            card.removeEventListener("mouseenter", hoverIn);
            card.removeEventListener("mouseleave", hoverOut);
          });
        });

        return () => {
          st.kill();
          tl.kill();
          gridTween?.kill();
          dotsTween?.kill();
          split?.revert();
          cleanups.forEach((fn) => fn());
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  if (!features || features.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050609] py-16 lg:py-20 border-y border-white/5">
      {/* Top laser beam separator */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="features-laser h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40 scale-x-0" />
        <div className="features-laser absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] scale-x-0" />
        <div className="features-laser absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90 scale-x-0" />
      </div>

      {/* Background (no glare) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="features-grid absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div
          className="features-dots absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,138,60,0.10) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,60,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.70)_74%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header (condensed) */}
        <div className="features-header mb-8 flex flex-col items-center text-center">
          <span style={{ fontFamily: "var(--font-goldman)" }} className="text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold mb-2">
            [ Key Features ]
          </span>

          <h2 className="features-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-goldman)" }}>
            {title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="feature-card relative overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent">
              <div className="feature-glow pointer-events-none absolute inset-0 opacity-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,138,60,0.14)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]" />
              </div>

              <div
                className="feature-grid pointer-events-none absolute inset-0 opacity-0"
                style={{
                  backgroundImage: "linear-gradient(to right, #ff8a3c10 1px, transparent 1px), linear-gradient(to bottom, #ff8a3c10 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              <div className="feature-corners pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-0 h-4 w-4 border-l border-t border-[#ff8a3c]/70" />
                <div className="absolute top-0 right-0 h-4 w-4 border-r border-t border-[#ff8a3c]/70" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-l border-b border-[#ff8a3c]/70" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-r border-b border-[#ff8a3c]/70" />
              </div>

              <div className="pointer-events-none absolute right-4 top-3 text-3xl font-bold text-white/5">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10 p-6">
                <div className="flex items-start gap-4">
                  <div className="feature-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#ff8a3c]/10 text-[#ff8a3c]">
                    {pickIcon(feature, index)}
                  </div>

                  <p className="text-zinc-300 leading-relaxed pt-1">{feature}</p>
                </div>
              </div>

              <div className="feature-accent pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
