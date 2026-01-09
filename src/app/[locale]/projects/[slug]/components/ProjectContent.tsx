"use client";

import React, { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
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
      const frame = (q(".content-frame")[0] as HTMLElement | undefined) ?? null;

      const modules = gsap.utils.toArray<HTMLElement>(q(".content-module"));
      const iconWraps = gsap.utils.toArray<HTMLElement>(q(".content-iconWrap"));
      const titles = gsap.utils.toArray<HTMLElement>(q(".content-title"));
      const bodies = gsap.utils.toArray<HTMLElement>(q(".content-body"));

      const circuitPaths = gsap.utils.toArray<SVGPathElement>(q(".content-circuitPath"));
      const circuitNodes = gsap.utils.toArray<SVGCircleElement>(q(".content-circuitNode"));
      const circuitNodeGlows = gsap.utils.toArray<SVGCircleElement>(q(".content-circuitNodeGlow"));

      const cleanupHover: Array<() => void> = [];

      const bindHover = () => {
        modules.forEach((mod) => {
          const glow = mod.querySelector<HTMLElement>(".module-glow");
          const chip = mod.querySelector<HTMLElement>(".module-chip");
          const idx = mod.getAttribute("data-index") ?? "";

          // highlight matching node (desktop or mobile rail)
          const node = root.querySelector<SVGCircleElement>(`.content-circuitNode[data-index="${idx}"]`);
          const nodeGlow = root.querySelector<SVGCircleElement>(
            `.content-circuitNodeGlow[data-index="${idx}"]`
          );

          gsap.set(glow, { opacity: 0 });
          if (nodeGlow) gsap.set(nodeGlow, { opacity: 0 });

          const onEnter = () => {
            gsap.to(mod, { y: -2, duration: 0.18, ease: "power3.out" });
            gsap.to(chip, { scale: 1.03, duration: 0.18, ease: "power3.out" });
            gsap.to(glow, { opacity: 1, duration: 0.2, ease: "power2.out" });

            if (node) gsap.to(node, { r: 6, duration: 0.18, ease: "power2.out" });
            if (nodeGlow) gsap.to(nodeGlow, { opacity: 0.9, duration: 0.2, ease: "power2.out" });
          };

          const onLeave = () => {
            gsap.to(mod, { y: 0, duration: 0.2, ease: "power3.out" });
            gsap.to(chip, { scale: 1, duration: 0.2, ease: "power3.out" });
            gsap.to(glow, { opacity: 0, duration: 0.2, ease: "power2.out" });

            if (node) gsap.to(node, { r: 4.8, duration: 0.2, ease: "power2.out" });
            if (nodeGlow) gsap.to(nodeGlow, { opacity: 0, duration: 0.2, ease: "power2.out" });
          };

          mod.addEventListener("mouseenter", onEnter);
          mod.addEventListener("mouseleave", onLeave);

          cleanupHover.push(() => {
            mod.removeEventListener("mouseenter", onEnter);
            mod.removeEventListener("mouseleave", onLeave);
          });
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lasers, { scaleX: 1, opacity: 1 });
        if (frame) gsap.set(frame, { opacity: 1, y: 0 });

        gsap.set(modules, { opacity: 1, y: 0 });
        gsap.set(iconWraps, { opacity: 1, scale: 1 });
        gsap.set(titles, { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(bodies, { opacity: 1, y: 0, filter: "blur(0px)" });

        gsap.set(circuitPaths, { opacity: 1, drawSVG: "100%" as any });
        gsap.set(circuitNodes, { opacity: 1, scale: 1, transformOrigin: "50% 50%" });
        gsap.set(circuitNodeGlows, { opacity: 0 });

        bindHover();
        return () => cleanupHover.forEach((fn) => fn());
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // initial
        gsap.set(lasers, { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" });
        if (frame) gsap.set(frame, { opacity: 0, y: 10, willChange: "transform, opacity" });

        gsap.set(modules, { opacity: 0, y: 12, willChange: "transform, opacity" });
        gsap.set(iconWraps, { opacity: 0, scale: 0.9 });
        gsap.set(titles, { opacity: 0, y: 10, filter: "blur(10px)" });
        gsap.set(bodies, { opacity: 0, y: 12, filter: "blur(8px)" });

        gsap.set(circuitPaths, { opacity: 0.75, drawSVG: "0%" as any });
        gsap.set(circuitNodes, { opacity: 0, scale: 0.82, transformOrigin: "50% 50%" });
        gsap.set(circuitNodeGlows, { opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        // lasers
        tl.to(lasers, { scaleX: 1, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.08 }, 0).to(
          lasers,
          {
            opacity: (i) => (i === 2 ? 0.95 : 0.55),
            duration: 0.22,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
            stagger: 0.06,
          },
          0.18
        );

        // frame
        if (frame) tl.to(frame, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.18);

        // circuit
        tl.to(circuitPaths, { drawSVG: "100%" as any, duration: 0.75, ease: "power2.out" }, 0.22).to(
          circuitNodes,
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.2)", stagger: 0.12 },
          0.34
        );

        // modules
        tl.to(modules, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.12 }, 0.28)
          .to(iconWraps, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.2)", stagger: 0.12 }, 0.36)
          .to(titles, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.48, ease: "power3.out", stagger: 0.12 }, 0.38)
          .to(bodies, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.52, ease: "power3.out", stagger: 0.12 }, 0.44);

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

      {/* same background + thin grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff8a3c]/[0.02] to-transparent" />
        <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.22)_0%,transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ONE coherent frame */}
        <div className="content-frame relative overflow-hidden rounded-md border border-white/10 bg-white/[0.02]">
          {/* subtle inner tech texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.10] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* ===== Desktop connector rail (separate band, NOT over content) ===== */}
          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative px-10 pt-7 pb-6">
              <svg className="h-10 w-full" viewBox="0 0 1000 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="content-circuitPath"
                  d="M140 40 H860"
                  stroke="rgba(255,138,60,0.45)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="content-circuitPath"
                  d="M140 40 H860"
                  stroke="rgba(255,232,214,0.35)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />

                {/* centers of 3 columns: ~1/6, 3/6, 5/6 */}
                {[166, 500, 834].map((x, i) => (
                  <g key={i}>
                    <circle
                      className="content-circuitNodeGlow"
                      data-index={String(i)}
                      cx={x}
                      cy="40"
                      r="16"
                      fill="rgba(255,138,60,0.18)"
                    />
                    <circle
                      className="content-circuitNode"
                      data-index={String(i)}
                      cx={x}
                      cy="40"
                      r="4.8"
                      fill="rgba(255,138,60,0.95)"
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* ===== Mobile left rail (in a gutter) ===== */}
          <div className="pointer-events-none absolute left-6 top-10 bottom-10 lg:hidden">
            <svg className="h-full w-10" viewBox="0 0 80 900" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="content-circuitPath"
                d="M40 40 V860"
                stroke="rgba(255,138,60,0.45)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                className="content-circuitPath"
                d="M40 40 V860"
                stroke="rgba(255,232,214,0.35)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {[140, 450, 760].map((y, i) => (
                <g key={i}>
                  <circle
                    className="content-circuitNodeGlow"
                    data-index={String(i)}
                    cx="40"
                    cy={y}
                    r="18"
                    fill="rgba(255,138,60,0.16)"
                  />
                  <circle
                    className="content-circuitNode"
                    data-index={String(i)}
                    cx="40"
                    cy={y}
                    r="5"
                    fill="rgba(255,138,60,0.95)"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* ===== Modules ===== */}
          <div className="grid lg:grid-cols-3">
            {validSections.map((item, index) => (
              <article
                key={`${item.icon}-${index}`}
                data-index={index}
                className="content-module relative px-6 py-8 lg:px-10 lg:py-10"
              >
                {/* desktop separators */}
                {index !== 0 && (
                  <div className="pointer-events-none absolute left-0 top-8 bottom-8 hidden lg:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}

                {/* hover glow */}
                <div className="module-glow pointer-events-none absolute inset-0 opacity-0">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,138,60,0.14)_0%,transparent_55%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,138,60,0.06),transparent_55%)]" />
                </div>

                {/* mobile gutter padding so rail never crosses text */}
                <div className="module-chip relative z-10 pl-10 lg:pl-0">
                  <div className="flex items-center gap-4">
                    <span className="content-iconWrap flex h-12 w-12 items-center justify-center rounded-sm border border-white/10 bg-[#ff8a3c]/10 text-[#ff8a3c]">
                      {icons[item.icon]}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h2
                          className="content-title text-2xl lg:text-3xl font-bold text-white"
                          style={{ fontFamily: "var(--font-goldman)" }}
                        >
                          {item.title}
                        </h2>

                        <span className="select-none text-[10px] uppercase tracking-[0.22em] text-[#ff8a3c]/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="mt-2 h-px w-16 bg-gradient-to-r from-[#ff8a3c]/60 to-transparent opacity-70" />
                    </div>
                  </div>

                  <p className="content-body mt-5 text-[15px] lg:text-[16px] text-zinc-300/80 leading-relaxed">
                    {item.content}
                  </p>

                  <div className="pointer-events-none mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c]/70 to-transparent opacity-60" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
