"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TechStackProps = {
  technologies: string[];
  title: string;
};

// Map tech names to their SVG files in public/tech
const techIconMap: Record<string, string> = {
  "Next.js": "/tech/nextjs.svg",
  NextJS: "/tech/nextjs.svg",
  Nextjs: "/tech/nextjs.svg",
  React: "/tech/react.svg",
  Sanity: "/tech/sanity.svg",
  Vercel: "/tech/vercel.svg",
  Tailwind: "/tech/tailwind.svg",
  "Tailwind CSS": "/tech/tailwind.svg",
  TailwindCSS: "/tech/tailwind.svg",
  GSAP: "/tech/gsap.svg",
  i18n: "/tech/monikielisyys.svg",
  Internationalization: "/tech/monikielisyys.svg",
  Monikielisyys: "/tech/monikielisyys.svg",
};

export default function TechStack({ technologies, title }: TechStackProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const validTech = useMemo(
    () => (technologies ?? []).map((t) => t?.trim()).filter(Boolean) as string[],
    [technologies]
  );

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root || validTech.length === 0) return;

      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      const lasers = gsap.utils.toArray<HTMLElement>(q(".tech-laser"));
      const header = (q(".tech-header")[0] as HTMLElement | undefined) ?? null;
      const items = gsap.utils.toArray<HTMLElement>(q(".tech-item"));

      gsap.set(items, { willChange: "transform, opacity, filter" });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lasers, { scaleX: 1, opacity: 1 });
        if (header) gsap.set(header, { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(items, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", x: 0, rotateZ: 0 });
        items.forEach((el) => {
          const underline = el.querySelector<HTMLElement>(".tech-underline");
          const glow = el.querySelector<HTMLElement>(".tech-glow");
          if (underline) gsap.set(underline, { scaleX: 1, opacity: 1 });
          if (glow) gsap.set(glow, { opacity: 0.5 });
        });
        return () => {};
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Initial
        gsap.set(lasers, { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" });
        if (header) gsap.set(header, { opacity: 0, y: 10, filter: "blur(10px)" });

        gsap.set(items, { opacity: 0, y: 14, scale: 0.985, filter: "blur(10px)" });

        items.forEach((el) => {
          const underline = el.querySelector<HTMLElement>(".tech-underline");
          const glow = el.querySelector<HTMLElement>(".tech-glow");
          if (underline) gsap.set(underline, { scaleX: 0, opacity: 0.9, transformOrigin: "50% 50%" });
          if (glow) gsap.set(glow, { opacity: 0 });
        });

        const tl = gsap.timeline({ paused: true });

        tl.to(lasers, { scaleX: 1, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.08 }, 0);

        if (header) {
          tl.to(header, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }, 0.12);
        }

        tl.to(
          items,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
            stagger: { each: 0.06, from: "center" },
          },
          0.22
        );

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
          0.38
        );

        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 88%",
          once: true,
          onEnter: () => tl.play(0),
        });

        // Hover magic (BIG scale), keep cursor default (we do not set pointer anywhere)
        const cleanups: Array<() => void> = [];

        items.forEach((item) => {
          const icon = item.querySelector<HTMLElement>(".tech-icon");
          const label = item.querySelector<HTMLElement>(".tech-label");
          const underline = item.querySelector<HTMLElement>(".tech-underline");
          const glow = item.querySelector<HTMLElement>(".tech-glow");

          const toX = gsap.quickTo(item, "x", { duration: 0.22, ease: "power3.out" });
          const toY = gsap.quickTo(item, "y", { duration: 0.22, ease: "power3.out" });
          const toR = gsap.quickTo(item, "rotateZ", { duration: 0.22, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const r = item.getBoundingClientRect();
            const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            const clamp = gsap.utils.clamp(-1, 1);
            const dx = clamp(px) * 8;
            const dy = clamp(py) * 5;
            toX(dx);
            toY(dy);
            toR(dx * 0.18);
          };

          const onEnter = () => {
            // keep it above neighbors when scaled
            gsap.set(item, { zIndex: 30 });

            item.addEventListener("mousemove", onMove);

            gsap.to(item, { scale: 1.18, duration: 0.18, ease: "power3.out" });

            if (glow) gsap.to(glow, { opacity: 1, duration: 0.2, ease: "power2.out" });
            if (underline) gsap.to(underline, { scaleX: 1, opacity: 1, duration: 0.22, ease: "power2.out" });

            if (icon) gsap.to(icon, { scale: 1.35, duration: 0.18, ease: "back.out(2.4)" });
            if (label) gsap.to(label, { letterSpacing: "0.02em", duration: 0.18, ease: "power2.out" });
          };

          const onLeave = () => {
            item.removeEventListener("mousemove", onMove);

            toX(0);
            toY(0);
            toR(0);

            gsap.to(item, { scale: 1, duration: 0.2, ease: "power3.out" });

            if (glow) gsap.to(glow, { opacity: 0, duration: 0.2, ease: "power2.out" });
            if (underline) gsap.to(underline, { scaleX: 0, opacity: 0.9, duration: 0.2, ease: "power2.out" });

            if (icon) gsap.to(icon, { scale: 1, duration: 0.2, ease: "power2.out" });
            if (label) gsap.to(label, { letterSpacing: "0em", duration: 0.2, ease: "power2.out" });

            // drop z-index after animation finishes
            gsap.delayedCall(0.22, () => gsap.set(item, { zIndex: 0 }));
          };

          const onFocus = () => onEnter();
          const onBlur = () => onLeave();

          item.addEventListener("mouseenter", onEnter);
          item.addEventListener("mouseleave", onLeave);
          item.addEventListener("focus", onFocus);
          item.addEventListener("blur", onBlur);

          cleanups.push(() => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
            item.removeEventListener("focus", onFocus);
            item.removeEventListener("blur", onBlur);
            item.removeEventListener("mousemove", onMove);
          });
        });

        return () => {
          st.kill();
          tl.kill();
          cleanups.forEach((fn) => fn());
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [validTech.length] }
  );

  if (!validTech.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050609] py-16 lg:py-20"
    >
      {/* Top laser beam separator */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="tech-laser h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40 scale-x-0" />
        <div className="tech-laser absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] scale-x-0" />
        <div className="tech-laser absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90 scale-x-0" />
      </div>

      {/* Dark background (no glare) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:52px_52px] opacity-25" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,60,0.09)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="tech-header mb-10 flex flex-col items-center text-center">
          <span
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold mb-3"
          >
            [ {title} ]
          </span>
        </div>

        {/* No boxes/containers: just icon + name */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {validTech.map((tech, i) => {
            const iconPath = techIconMap[tech];

            return (
              <div
                key={`${tech}-${i}`}
                tabIndex={0}
                aria-label={tech}
                className="tech-item cursor-default select-none relative flex items-center gap-4 outline-none"
              >
                {/* glow behind (radial only, no stripe/glare) */}
                <span className="tech-glow pointer-events-none absolute -left-3 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,138,60,0.22)_0%,transparent_60%)] blur-[3px] opacity-0" />

                <div className="tech-icon relative z-10 flex h-12 w-12 items-center justify-center">
                  {iconPath ? (
                    <Image
                      src={iconPath}
                      alt={tech}
                      width={40}
                      height={40}
                      className="object-contain"
                      draggable={false}
                    />
                  ) : (
                    <svg className="h-8 w-8 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  )}
                </div>

                <div className="relative">
                  <span
                    className="tech-label cursor-default text-lg font-semibold text-zinc-300"
                    style={{ fontFamily: "var(--font-goldman)" }}
                  >
                    {tech}
                  </span>

                  {/* underline draws in on hover (GSAP scales it) */}
                  <span className="tech-underline pointer-events-none mt-2 block h-[2px] w-24 bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-90" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
