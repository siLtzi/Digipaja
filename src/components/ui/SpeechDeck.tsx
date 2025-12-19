"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, ScrambleTextPlugin);
}

/** =========================
 * Types
 * ========================= */
export type SpeechBeatAnim =
  | "split-reveal"
  | "scramble"
  | "kinetic-words"
  | "flip-3d"
  | "blur-reveal"
  | "flash"
  | "scale-up"
  | "wipe-up"
  | "underline-sweep"
  | "neon-flicker"
  | "clip-reveal"
  | "rise-stagger";

export type SpeechBeat = {
  id: string;
  title: string;
  body: string;
  anim: string;

  icon: { name: string; themeHint?: string };

  image?: { src: string; alt: string };
};

type SpeechDeckProps = {
  items: SpeechBeat[];
  cta: { titleHtml: string; body: string };
};

/** =========================
 * Helpers
 * ========================= */
function normalizeAnim(input: string | undefined | null): SpeechBeatAnim {
  const v = (input ?? "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");

  const map: Record<string, SpeechBeatAnim> = {
    typewriter: "scramble",
    scramble: "scramble",
    "split-reveal": "split-reveal",
    split: "split-reveal",
    "kinetic-words": "kinetic-words",
    kinetic: "kinetic-words",

    "slide-left": "flip-3d",
    "slide-right": "flip-3d",
    "flip-3d": "flip-3d",

    blur: "blur-reveal",
    "blur-reveal": "blur-reveal",

    flash: "flash",
    "scale-up": "scale-up",
    scale: "scale-up",

    "wipe-up": "wipe-up",
    wipe: "wipe-up",

    "underline-sweep": "underline-sweep",
    underline: "underline-sweep",

    "neon-flicker": "neon-flicker",
    flicker: "neon-flicker",

    "clip-reveal": "clip-reveal",
    clip: "clip-reveal",

    "rise-stagger": "rise-stagger",
    rise: "rise-stagger",
  };

  return map[v] ?? "wipe-up";
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

/** =========================
 * Inline SVG loader (inline = animatable)
 * ========================= */
function InlineSvg({
  src,
  className,
  "data-role": dataRole,
}: {
  src: string;
  className?: string;
  "data-role"?: string;
}) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let alive = true;

    fetch(src)
      .then((r) => r.text())
      .then((txt) => {
        if (!alive) return;
        setSvg(txt);
        requestAnimationFrame(() => {
          try {
            ScrollTrigger.refresh();
          } catch {}
        });
      })
      .catch(() => setSvg(""));

    return () => {
      alive = false;
    };
  }, [src]);

  return (
    <div
      className={className}
      data-role={dataRole}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/** =========================
 * Component
 * ========================= */
export default function SpeechDeck({ items, cta }: SpeechDeckProps) {
  const container = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const reducedMotion = usePrefersReducedMotion();

  const normalized = useMemo(
    () => items.map((b) => ({ ...b, _anim: normalizeAnim(b.anim) })),
    [items]
  );

  useGSAP(
    () => {
      ScrollTrigger.config({ ignoreMobileResize: true });

      // Laser progress line (spine height)
      if (progressBarRef.current && spineRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: spineRef.current,
              start: "top 70%",
              end: "bottom 40%",
              scrub: 0.6,
            },
          }
        );
      }

      const sections = gsap.utils.toArray<HTMLElement>(".beat-section");

      sections.forEach((section) => {
        const anim = normalizeAnim(section.dataset.anim);
        const fromRight = (section.dataset.side ?? "") === "right";

        const title = section.querySelector<HTMLElement>("[data-role='title']");
        const body = section.querySelector<HTMLElement>("[data-role='body']");
        const node = section.querySelector<HTMLElement>("[data-role='node']");
        const brackets = section.querySelectorAll<HTMLElement>("[data-role='bracket']");
        const decorLine = section.querySelector<HTMLElement>("[data-role='decor-line']");
        const underline = section.querySelector<HTMLElement>("[data-role='underline']");

        const svg = section.querySelector<SVGSVGElement>("[data-role='icon'] svg");

        const imgWrap = section.querySelector<HTMLElement>("[data-role='image-wrap']");
        const imgInner = section.querySelector<HTMLElement>("[data-role='image-inner']");

        // initial states
        gsap.set([title, body], { autoAlpha: 0 });
        gsap.set(body, { y: 26 });

        gsap.set(node, { scale: 0, autoAlpha: 0 });
        gsap.set(brackets, { scale: 0.88, autoAlpha: 0 });

        gsap.set(decorLine, {
          scaleX: 0,
          transformOrigin: fromRight ? "right center" : "left center",
        });

        if (underline)
          gsap.set(underline, {
            scaleX: 0,
            transformOrigin: fromRight ? "right center" : "left center",
            autoAlpha: 0.7,
          });

        if (imgWrap) {
          gsap.set(imgWrap, { autoAlpha: 0, clipPath: "inset(0 0 100% 0 round 28px)" });
          gsap.set(imgInner, { y: 18, scale: 1.06 });
        }

        // SVG prep
        let canDrawSvg = false;
        if (svg) {
          const shapes = svg.querySelectorAll<SVGGraphicsElement>(
            "path, circle, rect, line, polyline, polygon"
          );
          shapes.forEach((s) => {
            const stroke = (s as any).getAttribute?.("stroke");
            if (stroke && stroke !== "none") canDrawSvg = true;
          });

          if (canDrawSvg) {
            shapes.forEach((s) => gsap.set(s, { drawSVG: "0% 0%" }));
          } else {
            gsap.set(svg, { autoAlpha: 0, scale: 0.9 });
          }
        }

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        });

        // base: node + brackets
        tl.to(node, { scale: 1, autoAlpha: 1, duration: 0.32, ease: "back.out(1.7)" })
          .to(brackets, { scale: 1, autoAlpha: 1, duration: 0.32, stagger: 0.08 }, "<0.06");

        // icon draw/pop
        if (svg && canDrawSvg) {
          const shapes = svg.querySelectorAll<SVGGraphicsElement>(
            "path, circle, rect, line, polyline, polygon"
          );
          tl.to(shapes, { drawSVG: "0% 100%", duration: 0.95, stagger: 0.03, ease: "power2.inOut" }, "<0.05")
            .to(svg, { scale: 1.03, rotate: fromRight ? 0.6 : -0.6, duration: 0.16 }, "<0.10")
            .to(svg, { scale: 1, rotate: 0, duration: 0.35, ease: "elastic.out(1, 0.6)" }, "<")
            .fromTo(
              svg,
              { filter: "drop-shadow(0 0 0px rgba(255,138,60,0))" },
              { filter: "drop-shadow(0 0 26px rgba(255,138,60,0.55))", duration: 0.6, ease: "power2.out" },
              "<0.05"
            );
        } else if (svg) {
          tl.to(svg, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, "<0.05").fromTo(
            svg,
            { filter: "drop-shadow(0 0 0px rgba(255,138,60,0))" },
            { filter: "drop-shadow(0 0 20px rgba(255,138,60,0.45))", duration: 0.6 },
            "<0.05"
          );
        }

        // image reveal
        if (imgWrap && imgInner) {
          tl.to(imgWrap, { autoAlpha: 1, duration: 0.01 }, "<")
            .to(imgWrap, { clipPath: "inset(0 0 0% 0 round 28px)", duration: 0.95, ease: "expo.out" }, "<0.08")
            .to(imgInner, { y: 0, scale: 1, duration: 1.15, ease: "power3.out" }, "<0.05");
        }

        // text
        if (!title || !body) return;

        if (reducedMotion) {
          tl.fromTo(title, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.38 }, "<0.06").to(
            body,
            { autoAlpha: 1, y: 0, duration: 0.38 },
            "<0.12"
          );
        } else if (anim === "split-reveal") {
          const split = new SplitText(title, { type: "words,chars" });
          gsap.set(split.chars, { yPercent: 120, rotate: 2, autoAlpha: 0 });

          tl.to(title, { autoAlpha: 1, duration: 0.01 }, "<0.1")
            .to(
              split.chars,
              {
                yPercent: 0,
                rotate: 0,
                autoAlpha: 1,
                duration: 0.85,
                ease: "power4.out",
                stagger: { each: 0.012, from: "start" },
              },
              "<0.05"
            )
            .to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.18");
        } else if (anim === "scramble") {
          const original = title.textContent ?? "";
          tl.set(title, { autoAlpha: 1 })
            .to(
              title,
              {
                duration: 1.05,
                scrambleText: {
                  text: original,
                  chars: "█▓▒░<>/\\—_",
                  revealDelay: 0.05,
                  speed: 0.7,
                },
                ease: "none",
              },
              "<0.05"
            )
            .to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.2");
        } else if (anim === "kinetic-words") {
          const split = new SplitText(title, { type: "words" });
          gsap.set(split.words, { y: 22, autoAlpha: 0, filter: "blur(10px)" });

          tl.to(title, { autoAlpha: 1, duration: 0.01 }, "<0.1")
            .to(
              split.words,
              { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.09, ease: "power3.out" },
              "<0.05"
            )
            .to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.1");
        } else if (anim === "flip-3d") {
          gsap.set(title, {
            transformPerspective: 900,
            transformOrigin: fromRight ? "right center" : "left center",
          });

          tl.fromTo(
            title,
            { rotationY: fromRight ? -55 : 55, x: fromRight ? 18 : -18, autoAlpha: 0 },
            { rotationY: 0, x: 0, autoAlpha: 1, duration: 0.9, ease: "back.out(1.15)" },
            "<0.05"
          ).to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.25");
        } else if (anim === "blur-reveal") {
          tl.fromTo(
            title,
            { autoAlpha: 0, y: 10, scale: 1.02, filter: "blur(18px)" },
            { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
            "<0.05"
          ).to(body, { autoAlpha: 1, y: 0, duration: 0.7 }, "<0.35");
        } else if (anim === "flash") {
          tl.set(title, { autoAlpha: 1 })
            .fromTo(title, { opacity: 0, x: 6 }, { opacity: 1, x: 0, duration: 0.08, repeat: 4, yoyo: true }, "<0.05")
            .to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.1");
        } else if (anim === "scale-up") {
          tl.fromTo(
            title,
            { autoAlpha: 0, scale: 0.78, y: 10 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.75, ease: "back.out(1.9)" },
            "<0.05"
          ).to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.22");
        } else if (anim === "underline-sweep") {
          tl.fromTo(title, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, "<0.05")
            .to(underline, { scaleX: 1, duration: 0.8, ease: "expo.out" }, "<0.12")
            .to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.12");
        } else if (anim === "neon-flicker") {
          tl.set(title, { autoAlpha: 1 })
            .fromTo(
              title,
              { opacity: 0, filter: "blur(6px)" },
              { opacity: 1, filter: "blur(0px)", duration: 0.18, repeat: 4, yoyo: true, ease: "power1.inOut" },
              "<0.05"
            )
            .to(title, { opacity: 1, duration: 0.15 }, "<")
            .to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.15");
        } else if (anim === "clip-reveal") {
          tl.fromTo(
            title,
            { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.out" },
            "<0.05"
          ).to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.2");
        } else if (anim === "rise-stagger") {
          const split = new SplitText(title, { type: "lines" });
          gsap.set(split.lines, { y: 22, autoAlpha: 0 });

          tl.to(title, { autoAlpha: 1, duration: 0.01 }, "<0.1")
            .to(split.lines, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "<0.05")
            .to(body, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.1");
        } else {
          // wipe-up default
          tl.fromTo(
            title,
            { autoAlpha: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
            { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power4.out" },
            "<0.05"
          ).to(body, { autoAlpha: 1, y: 0, duration: 0.65 }, "<0.22");
        }

        if (decorLine) {
          tl.to(
            decorLine,
            {
              scaleX: 1,
              duration: 0.9,
              ease: "expo.out",
            },
            "<0.1"
          );
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: container, dependencies: [normalized, reducedMotion] }
  );

  /** Layout notes:
   * - Full-width with clamped gutter
   * - 12-col grid per beat
   * - spine sits around center columns
   */
  return (
    <div
      ref={container}
      className="relative w-full px-[clamp(20px,6vw,110px)] py-24 md:py-28"
    >
      {/* Spine wrapper: the vertical track is full height of beats */}
      <div ref={spineRef} className="relative">
        {/* Track (full height) */}
        <div className="pointer-events-none absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
        {/* Active laser */}
        <div
          ref={progressBarRef}
          className="pointer-events-none absolute left-6 md:left-1/2 top-0 w-0.5 bg-[#ff8a3c] md:-translate-x-1/2 shadow-[0_0_22px_rgba(255,138,60,0.75)] z-10"
        />

        {normalized.map((beat, index) => {
          const right = index % 2 === 1;

          return (
            <section
              key={beat.id}
              className="beat-section relative grid grid-cols-12 items-center min-h-[78vh] py-16 md:py-20"
              data-anim={beat._anim}
              data-side={right ? "right" : "left"}
            >
              {/* Node on spine */}
              <div
                data-role="node"
                className="absolute left-6 md:left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ff8a3c] bg-[#050609] z-20"
              />

              {/* Content block: spans most of the width */}
              <div
                className={[
                  "col-span-12",
                  "md:col-span-5",
                  right ? "md:col-start-8 md:text-left" : "md:col-start-1 md:text-right",
                  "relative",
                ].join(" ")}
              >
                {/* Media row (icon / lottie / image) */}
                <div
                  className={[
                    "mb-10 flex items-center gap-6",
                    right ? "md:justify-start" : "md:justify-end",
                  ].join(" ")}
                >
                  <div className="h-24 w-24 md:h-28 md:w-28 text-[#ff8a3c] drop-shadow-[0_0_28px_rgba(255,138,60,0.55)]">
                    <InlineSvg
                      data-role="icon"
                      src={`/icons/${beat.icon.name}.svg`}
                      className="h-full w-full [&_svg]:h-full [&_svg]:w-full [&_svg]:stroke-current [&_svg]:fill-none"
                    />
                  </div>
                </div>

                {/* Big title */}
                <h2
                  data-role="title"
                  className="text-5xl md:text-7xl xl:text-8xl font-bold text-white leading-[1.02] tracking-tight"
                  style={{ fontFamily: "var(--font-goldman)" }}
                >
                  {beat.title}
                </h2>

                {/* underline (for underline-sweep) */}
                <div
                  data-role="underline"
                  className={[
                    "mt-5 h-px w-full max-w-[30rem] bg-[#ff8a3c] opacity-70 origin-left scale-x-0",
                    right ? "" : "md:ml-auto",
                  ].join(" ")}
                />

                {/* decor line */}
                <div
                  data-role="decor-line"
                  className={[
                    "mt-8 h-0.5 w-36 md:w-44 bg-[#ff8a3c]",
                    right ? "" : "md:ml-auto",
                  ].join(" ")}
                />

                {/* Body copy (bigger) */}
                <p
                  data-role="body"
                  className={[
                    "mt-8 text-2xl md:text-[1.6rem] leading-relaxed text-zinc-300/90 font-light",
                    "max-w-[52ch]",
                    right ? "" : "md:ml-auto",
                  ].join(" ")}
                >
                  {beat.body}
                </p>

                {/* Optional image (wide, cinematic) */}
                {beat.image && (
                  <div
                    data-role="image-wrap"
                    className="relative mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
                  >
                    <div data-role="image-inner" className="relative">
                      <Image
                        src={beat.image.src}
                        alt={beat.image.alt}
                        width={1600}
                        height={900}
                        className="h-auto w-full object-cover"
                        priority={index === 0}
                        onLoadingComplete={() => {
                          try {
                            ScrollTrigger.refresh();
                          } catch {}
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/40" />
                    </div>
                  </div>
                )}

                {/* Brackets */}
                <div
                  data-role="bracket"
                  className={[
                    "absolute top-[-18px] h-10 w-10 border-t-2 border-[#ff8a3c]/55",
                    right ? "left-[-18px] border-l-2" : "right-[-18px] border-r-2",
                  ].join(" ")}
                />
                <div
                  data-role="bracket"
                  className={[
                    "absolute bottom-[-18px] h-10 w-10 border-b-2 border-[#ff8a3c]/55",
                    right ? "left-[-18px] border-l-2" : "right-[-18px] border-r-2",
                  ].join(" ")}
                />
              </div>

              {/* Optional: a faint “counterweight” empty column to keep balance.
                  We keep the layout breathable. */}
              <div className="hidden md:block md:col-span-5 md:col-start-1" />
            </section>
          );
        })}
      </div>

      {/* CTA (full width, centered) */}
      <section className="beat-section relative mt-10 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h2
          data-role="title"
          className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[1.02] max-w-[18ch]"
          style={{ fontFamily: "var(--font-goldman)" }}
          dangerouslySetInnerHTML={{ __html: cta.titleHtml }}
        />
        <p
          data-role="body"
          className="mt-10 text-2xl md:text-3xl text-zinc-300/90 max-w-4xl mx-auto font-light leading-relaxed"
        >
          {cta.body}
        </p>
      </section>
    </div>
  );
}
