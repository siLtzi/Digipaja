"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

type Service = {
  title: string;
  body: string;
  slug?: string;
  description?: string;
  features?: string[];
};

type ServicesProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  services?: Service[];
  locale?: "fi" | "en";
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ServicesContent({
  eyebrow,
  title,
  subtitle,
  services = [],
  locale = "fi",
}: ServicesProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (!services.length) return;

      const reduce = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      )?.matches;
      if (reduce) return;

      const smoother = ScrollSmoother.get();
      const scroller: any = smoother ? smoother.wrapper() : window;

      const root = rootRef.current;
      if (!root) return;

      const panels = gsap.utils.toArray<HTMLDivElement>("[data-panel]");

      // Measure real header height and store in CSS var (used by layout + styles)
      const measureHeader = () => {
        const raw = headerRef.current?.getBoundingClientRect().height ?? 180;
        // clamp so it never eats the whole viewport
        const headerH = clamp(Math.round(raw), 150, 260);
        root.style.setProperty("--services-header-h", `${headerH}px`);
        return headerH;
      };

      let HEADER_H = measureHeader();

      // ---- Layout Constants ----
      const COLLAPSED = 104; // tab height
      const OVERLAP = 0;
      const GAP = 0;

      const initLayout = () => {
        HEADER_H = measureHeader();
        const MAX_H = Math.max(420, window.innerHeight - HEADER_H);

        panels.forEach((p, i) => {
          gsap.set(p, {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            y: 0,
            height: i === 0 ? MAX_H : COLLAPSED,
            zIndex: services.length + 10 - i,
            willChange: "transform, height",
            transform: "translate3d(0,0,0)",
          });
        });

        return MAX_H;
      };

      let MAX_H = initLayout();

      const setY = panels.map((p) => gsap.quickSetter(p, "y", "px"));
      const setH = panels.map((p) => gsap.quickSetter(p, "height", "px"));

      const applyState = (progress: number) => {
        const n = panels.length;
        const t = progress * (n - 1);
        const active = clamp(Math.floor(t), 0, n - 1);
        const frac = t - active;

        // keep MAX_H fresh if viewport/header changes
        MAX_H = Math.max(420, window.innerHeight - (HEADER_H || 180));

        const heights = new Array(n).fill(COLLAPSED);

        if (n === 1) heights[0] = MAX_H;
        else {
          heights[active] = lerp(MAX_H, COLLAPSED, frac);
          if (active + 1 < n)
            heights[active + 1] = lerp(COLLAPSED, MAX_H, frac);
        }

        let y = 0;
        for (let i = 0; i < n; i++) {
          setY[i](y);
          setH[i](heights[i]);
          y += heights[i] - OVERLAP + GAP;
        }
      };

      // Pin the ROOT section
      const st = ScrollTrigger.create({
        trigger: root,
        scroller,
        start: "top top",
        end: () => `+=${window.innerHeight * panels.length * 1.5}`,
        pin: true,
        scrub: 1, // smoother than 0
        invalidateOnRefresh: true,
        onUpdate: (self) => applyState(self.progress),
        onRefreshInit: () => {
          // when ScrollTrigger refreshes (fonts/layout), re-measure + re-init
          MAX_H = initLayout();
        },
        onRefresh: (self) => {
          applyState(self.progress);
        },
      });

      applyState(0);
      ScrollTrigger.refresh();

      return () => {
        st.kill();
      };
    },
    { scope: rootRef, dependencies: [services.length] }
  );

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative h-[100svh] w-full overflow-hidden bg-[#050609] text-zinc-100 isolate"
      style={{
        // fallback if JS hasn’t set it yet
        ["--services-header-h" as any]: "190px",
      }}
    >
      {/* === MULTI-LAYER LASER SEPARATOR === */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center overflow-hidden">
        <div className="h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_rgba(255,138,60,0.8),0_0_40px_rgba(255,138,60,0.4)]" />
        <div className="absolute top-0 h-[3px] w-1/2 max-w-2xl bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] opacity-70" />
        <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-[#ff8a3c]/0 via-[#ff8a3c]/40 to-[#ff8a3c]/0" />
      </div>

      {/* === TECH GRID BACKGROUND === */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />

      {/* === SPOTLIGHT GRADIENT === */}
      <div
        className="absolute left-1/2 top-0 h-[900px] w-[1400px] -translate-x-1/2 -translate-y-1/4 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,138,60,0.12) 0%, rgba(255,138,60,0.04) 40%, transparent 70%)",
        }}
      />

      {/* === HEADER (auto height, measured) === */}
      <div
        ref={headerRef}
        className="absolute top-0 left-0 right-0 z-50 px-6 pt-20 pb-10 pointer-events-none"
      >
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-3 mb-4 pointer-events-auto">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
            </span>
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-[11px] uppercase tracking-[0.2em] text-[#ff8a3c] flex items-center gap-2"
            >
              <span className="h-[1px] w-3 bg-[#ff8a3c]" />
              {eyebrow}
              <span className="h-[1px] w-3 bg-[#ff8a3c]" />
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,1.2fr] pointer-events-auto">
            <h2
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-balance text-4xl font-bold leading-none text-white sm:text-5xl lg:text-[3.5rem]"
            >
              {title}
            </h2>

            <div className="relative border-l-2 border-[#ff8a3c]/30 pl-6 hidden lg:block">
              <div className="absolute left-0 top-0 h-12 w-[2px] bg-[#ff8a3c] shadow-[0_0_10px_rgba(255,138,60,0.5)]" />
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* === CARDS CONTAINER (starts AFTER measured header) === */}
      <div
        className="absolute inset-x-0 bottom-0 z-10"
        style={{ top: "var(--services-header-h)" }}
      >
        <div className="relative w-full h-full">
          {services.map((it, idx) => (
            <div
              key={it.slug ?? `${it.title}-${idx}`}
              data-panel
              className="group overflow-hidden border-t-2 border-[#ff8a3c]/20 shadow-2xl bg-gradient-to-b from-[#0a0a0a] to-[#050609] backdrop-blur-sm"
            >
              {/* Orange spotlight glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,138,60,0.08),transparent_50%)] opacity-80" />
              {/* Subtle shimmer overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Enhanced corner brackets with expansion */}
              <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#ff8a3c]/30 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#ff8a3c]/60" />
              <div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[#ff8a3c]/30 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#ff8a3c]/60" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/5 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-white/10" />
              <div className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/5 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-white/10" />

              <div className="mx-auto max-w-7xl h-full relative">
                <div className="relative flex items-center gap-6 px-4 py-8 lg:px-8">
                  <div className="relative flex items-center justify-center w-16 lg:w-24 shrink-0">
                    <span
                      style={{ fontFamily: "var(--font-goldman)" }}
                      className="absolute text-8xl font-bold text-[#ff8a3c]/[0.04] select-none -translate-x-2 translate-y-1 scale-150 group-hover:text-[#ff8a3c]/[0.08] transition-colors duration-700"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div
                      style={{ fontFamily: "var(--font-goldman)" }}
                      className="truncate text-2xl tracking-tight text-white sm:text-4xl uppercase group-hover:text-[#ff8a3c] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,138,60,0.5)]"
                    >
                      {it.title}
                    </div>
                  </div>

                  {it.slug ? (
                    <Link
                      href={`/${locale}/services#${it.slug}`}
                      style={{ fontFamily: "var(--font-goldman)" }}
                      className="hidden shrink-0 lg:inline-flex items-center gap-2 border border-[#ff8a3c]/20 px-5 py-2.5 rounded-sm bg-[#ff8a3c]/5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8a3c] hover:bg-[#ff8a3c]/10 hover:border-[#ff8a3c]/40 hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] transition-all duration-300 group/btn relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Lue lisää 
                        <svg className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none">
                          <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </Link>
                  ) : null}
                </div>

                <div className="relative px-4 pb-10 lg:px-8 lg:pl-40 pt-2">
                  <p className="max-w-3xl text-base leading-relaxed text-zinc-300/90 sm:text-lg">
                    {it.body}
                  </p>

                  {it.description ? (
                    <div className="mt-8 max-w-3xl border-l-2 border-[#ff8a3c]/30 pl-6 py-1 relative">
                      <div className="absolute left-0 top-0 h-16 w-[2px] bg-[#ff8a3c] shadow-[0_0_10px_rgba(255,138,60,0.4)]" />
                      <p className="text-sm leading-relaxed text-zinc-400 sm:text-base italic">
                        “{it.description}”
                      </p>
                    </div>
                  ) : null}

                  {it.features?.length ? (
                    <div className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 max-w-4xl">
                      {it.features.map((f, i) => (
                        <div
                          key={`${f}-${i}`}
                          className="group/feat flex items-center gap-3 border border-white/5 bg-white/[0.015] px-4 py-3 rounded-sm hover:border-[#ff8a3c]/30 hover:bg-[#ff8a3c]/5 transition-all duration-300"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-[#ff8a3c] shadow-[0_0_6px_rgba(255,138,60,0.6)] group-hover/feat:shadow-[0_0_12px_rgba(255,138,60,0.8)] transition-shadow duration-300" />
                          <div className="text-sm font-medium text-zinc-200/90 group-hover/feat:text-white transition-colors duration-300">
                            {f}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {it.slug ? (
                    <Link
                      href={`/${locale}/services#${it.slug}`}
                      style={{ fontFamily: "var(--font-goldman)" }}
                      className="mt-8 inline-flex items-center gap-2 rounded-sm border border-[#ff8a3c]/20 bg-[#ff8a3c]/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8a3c] hover:bg-[#ff8a3c]/10 hover:border-[#ff8a3c]/40 hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] transition-all duration-300 lg:hidden group/btn"
                    >
                      <span className="flex items-center gap-2">
                        Lue lisää
                        <svg className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none">
                          <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </Link>
                  ) : null}

                  <div className="h-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
