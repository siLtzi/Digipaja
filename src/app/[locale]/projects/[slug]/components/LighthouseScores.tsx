"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Club/bonus plugin you DO like
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

type LighthouseScore = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type LighthouseScoresProps = {
  mobile?: LighthouseScore;
  desktop?: LighthouseScore;
  title: string;
};

const scoreLabels = {
  performance: "Performance",
  accessibility: "Accessibility",
  bestPractices: "Best Practices",
  seo: "SEO",
};

function getScoreColor(score: number) {
  if (score >= 90) return "#0cce6b";
  if (score >= 50) return "#ffa400";
  return "#ff4e42";
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const color = getScoreColor(score);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (score / 100) * circumference;

  return (
    <div data-score-item className="group flex flex-col items-center gap-3">
      <div className="relative w-[100px] h-[100px]">
        <svg
          width="100"
          height="100"
          className="absolute inset-0 -rotate-90"
          style={{ filter: "blur(10px)" }}
        >
          <circle
            data-score-glow
            data-circumference={circumference}
            data-target-offset={targetOffset}
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            opacity="0.0"
          />
        </svg>

        <svg width="100" height="100" className="relative -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#1a1a1f"
            strokeWidth="6"
          />
          <circle
            data-score-circle
            data-circumference={circumference}
            data-target-offset={targetOffset}
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span
            data-score-number
            data-score={score}
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-2xl font-bold text-white tabular-nums"
          >
            0
          </span>
        </div>
      </div>

      <span className="text-xs text-zinc-400 uppercase tracking-wider text-center">
        {label}
      </span>
    </div>
  );
}

function DeviceScores({
  scores,
  deviceType,
  icon,
}: {
  scores: LighthouseScore;
  deviceType: "mobile" | "desktop";
  icon: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const iconWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // === TUNING KNOBS (adjust these only) ===
      const SPEED = {
        cardIn: 0.42, // card entrance
        itemsIn: 0.32, // individual score items
        arc: 1.15, // arc draw duration (MAKE READABLE)
        count: 1.15, // number count duration (MAKE READABLE)
        stagger: 0.10, // time between each score’s start
        arcDelay: 0.16, // when arc/count begins relative to card entrance
      };

      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(el);

      const items = gsap.utils.toArray<HTMLElement>(q("[data-score-item]"));
      const circles = gsap.utils.toArray<SVGCircleElement>(q("[data-score-circle]"));
      const glows = gsap.utils.toArray<SVGCircleElement>(q("[data-score-glow]"));
      const numbers = gsap.utils.toArray<HTMLSpanElement>(q("[data-score-number]"));

      const circumfs = circles.map((c) => Number(c.dataset.circumference || 0));
      const targets = circles.map((c) => Number(c.dataset.targetOffset || 0));
      const scoreVals = numbers.map((n) => Number(n.dataset.score || 0));

      gsap.set(el, { transformPerspective: 900, willChange: "transform" });
      gsap.set([...circles, ...glows], { willChange: "stroke-dashoffset, opacity" });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        circles.forEach((c, i) => gsap.set(c, { strokeDashoffset: targets[i] }));
        glows.forEach((g, i) => gsap.set(g, { strokeDashoffset: targets[i], opacity: 0.28 }));
        numbers.forEach((n, i) => (n.textContent = String(scoreVals[i])));
        return () => {};
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hidden-ish initial states (fast but visible)
        gsap.set(el, { opacity: 0, y: 14, filter: "blur(8px)" });
        gsap.set(items, { opacity: 0, y: 10, scale: 0.985 });
        circles.forEach((c, i) => gsap.set(c, { strokeDashoffset: circumfs[i] }));
        glows.forEach((g, i) => gsap.set(g, { strokeDashoffset: circumfs[i], opacity: 0 }));
        numbers.forEach((n) => (n.textContent = "0"));

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        // Card in (still responsive)
        tl.to(el, { opacity: 1, y: 0, filter: "blur(0px)", duration: SPEED.cardIn }, 0);

        // Icon pop (tiny, premium)
        if (iconWrapRef.current) {
          tl.fromTo(
            iconWrapRef.current,
            { scale: 0.92, rotate: -4, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.28, ease: "back.out(1.9)" },
            0.04
          );
        }

        // Items appear
        tl.to(
          items,
          { opacity: 1, y: 0, scale: 1, duration: SPEED.itemsIn, stagger: 0.06 },
          0.08
        );

        // Arcs + Numbers (slower so you can actually see counting)
        circles.forEach((c, i) => {
          const glow = glows[i];
          const num = numbers[i];
          const score = scoreVals[i];

          // Start times per metric
          const t0 = SPEED.arcDelay + i * SPEED.stagger;

          // Arc draw (readable)
          tl.to(
            c,
            { strokeDashoffset: targets[i], duration: SPEED.arc, ease: "power2.out" },
            t0
          );
          tl.to(
            glow,
            { strokeDashoffset: targets[i], duration: SPEED.arc, ease: "power2.out" },
            t0
          );

          // Glow comes in and settles (subtle)
          tl.to(glow, { opacity: 0.45, duration: 0.18, ease: "sine.out" }, t0 + 0.06);
          tl.to(glow, { opacity: 0.24, duration: 0.32, ease: "sine.inOut" }, t0 + 0.28);

          // Number count (readable, integer snap)
          const obj = { v: 0 };
          tl.to(
            obj,
            {
              v: score,
              duration: SPEED.count,
              ease: "power2.out",
              snap: { v: 1 },
              onUpdate: () => {
                num.textContent = String(obj.v | 0);
              },
            },
            t0
          );

          // Number fade/settle (no “blink”)
          tl.fromTo(
            num,
            { y: 6, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            t0 + 0.02
          );
        });

        // One trigger per card. Responsive start point.
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 86%",
          once: true,
          onEnter: () => tl.play(0),
        });

        // Hover (fast response, not “laggy”)
        const hoverTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        hoverTl.to(el, { y: -2, duration: 0.16 }, 0);
        hoverTl.to(
          el,
          {
            boxShadow:
              "0 0 0 1px rgba(255,138,60,0.18), 0 18px 50px rgba(0,0,0,0.45)",
            duration: 0.16,
          },
          0
        );
        if (gridRef.current) hoverTl.to(gridRef.current, { opacity: 0.34, duration: 0.16 }, 0);
        if (cornersRef.current) hoverTl.to(cornersRef.current, { opacity: 1, duration: 0.16 }, 0);

        // Subtle tilt follow (still responsive)
        const rx = gsap.quickTo(el, "rotateX", { duration: 0.20, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotateY", { duration: 0.20, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 6);
          rx(-(py - 0.5) * 6);
        };

        const onEnter = () => {
          hoverTl.play();
          el.addEventListener("mousemove", onMove);
        };
        const onLeave = () => {
          hoverTl.reverse();
          el.removeEventListener("mousemove", onMove);
          rx(0);
          ry(0);
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        return () => {
          st.kill();
          tl.kill();
          hoverTl.kill();
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.removeEventListener("mousemove", onMove);
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="lighthouse-card group relative rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 lg:p-8"
    >
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0 pointer-events-none rounded-sm"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ff8a3c08 1px, transparent 1px), linear-gradient(to bottom, #ff8a3c08 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div ref={cornersRef} className="absolute inset-0 pointer-events-none opacity-0">
        <div className="absolute top-0 left-0 h-4 w-4 border-l border-t border-[#ff8a3c]" />
        <div className="absolute top-0 right-0 h-4 w-4 border-r border-t border-[#ff8a3c]" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-l border-b border-[#ff8a3c]" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-r border-b border-[#ff8a3c]" />
      </div>

      <div className="relative z-10 flex items-center gap-3 mb-8">
        <div
          ref={iconWrapRef}
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#ff8a3c]/10 text-[#ff8a3c]"
        >
          {icon}
        </div>
        <h3
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-lg font-bold text-white uppercase tracking-wider"
        >
          {deviceType === "mobile" ? "Mobile" : "Desktop"}
        </h3>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {(Object.keys(scoreLabels) as Array<keyof typeof scoreLabels>).map((key) => (
          <ScoreCircle key={key} score={scores[key]} label={scoreLabels[key]} />
        ))}
      </div>
    </div>
  );
}

export default function LighthouseScores({ mobile, desktop, title }: LighthouseScoresProps) {
  if (!mobile && !desktop) return null;

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lasers = gsap.utils.toArray<HTMLElement>(".lighthouse-laser");
        gsap.set(lasers, { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" });

        // No scramble: just a clean premium reveal
        const tl = gsap.timeline({ paused: true });

        tl.to(lasers, {
          scaleX: 1,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
        });

        if (eyebrowRef.current) {
          gsap.set(eyebrowRef.current, { opacity: 0, y: 6 });
          tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.10);
        }

        let split: SplitText | null = null;
        if (titleRef.current) {
          split = new SplitText(titleRef.current, { type: "chars" });
          gsap.set(split.chars, { yPercent: 105, opacity: 0, filter: "blur(10px)" });

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
            0.16
          );
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 88%",
          once: true,
          onEnter: () => tl.play(0),
        });

        return () => {
          tl.kill();
          split?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const mobileIcon = (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  const desktopIcon = (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="lighthouse-laser h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40 scale-x-0" />
        <div className="lighthouse-laser absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] scale-x-0" />
        <div className="lighthouse-laser absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90 scale-x-0" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,60,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
            </span>
            <span
              ref={eyebrowRef}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-[12px] uppercase tracking-[0.2em] text-[#ff8a3c]"
            >
              [ Lighthouse Scores ]
            </span>
          </div>

          <h2
            ref={titleRef}
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
          >
            {title}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {mobile && <DeviceScores scores={mobile} deviceType="mobile" icon={mobileIcon} />}
          {desktop && <DeviceScores scores={desktop} deviceType="desktop" icon={desktopIcon} />}
        </div>
      </div>
    </section>
  );
}
