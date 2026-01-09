"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  HammerStrike,
  type HammerStrikeHandle,
} from "./HammerStrike";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
}

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[] | null;
  cta: string;
  highlight?: boolean;
};

type PricingProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  tiers: PricingTier[];
};

export default function PricingContent({
  eyebrow,
  title,
  subtitle,
  tiers,
}: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".laser-beam:nth-child(1)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.4, duration: 0.3, ease: "expo.out" }
      )
      .fromTo(
        ".laser-beam:nth-child(2)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.3, ease: "expo.out" },
        "-=0.25"
      )
      .fromTo(
        ".laser-beam:nth-child(3)",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.9, duration: 0.3, ease: "expo.out" },
        "-=0.25"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32 text-zinc-100"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-[4px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 scale-x-0" />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Tech grid pattern */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_80%_60%_at_50%_50%,#000_50%,transparent_100%)]" />
        
        {/* Spotlight gradient */}
        <div
          className="absolute left-1/2 top-1/2 h-[900px] w-[1400px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,138,60,0.10) 0%, rgba(255,138,60,0.03) 40%, transparent 70%)",
          }}
        />
        
        {/* Right accent glow */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/4 translate-x-1/3 bg-[radial-gradient(circle_closest-side,rgba(255,138,60,0.08),transparent)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-center text-center">
          <span
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold mb-6"
          >
            [ {eyebrow} ]
          </span>
          <h2
            className="max-w-3xl text-balance text-4xl font-bold leading-none sm:text-5xl lg:text-[3.5rem]"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {tiers.map((tier, i) => (
            <PricingCard key={i} tier={tier} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 opacity-60">
            * Hinnat alv 0% • Laskutus 50/50 tai sopimuksen mukaan
          </p>
        </div>
      </div>
    </section>
  );
}

export type { PricingTier };

export function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const isHighlight = tier.highlight;
  const tierId = `SYS.0${index + 1}`;

  const cardRef = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const strikeRef = useRef<HammerStrikeHandle>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleSelectPackage = useCallback(() => {
    contextSafe(() => {
      const onDone = () => {
        window.dispatchEvent(
          new CustomEvent("packageSelected", {
            detail: { package: tier.name },
          })
        );
      };

      if (strikeRef.current) {
        strikeRef.current.strike({ onComplete: onDone });
      } else {
        onDone();
      }
    })();
  }, [contextSafe, tier.name]);

  const handleMouseEnter = useCallback(() => {
    contextSafe(() => {
      if (priceRef.current) {
        gsap.to(priceRef.current, {
          textShadow:
            "0 0 20px rgba(255,138,60,0.8), 0 0 40px rgba(255,138,60,0.4)",
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      strikeRef.current?.show();
    })();
  }, [contextSafe]);

  const handleMouseLeave = useCallback(() => {
    contextSafe(() => {
      if (priceRef.current) {
        gsap.to(priceRef.current, {
          textShadow: "0 0 0px rgba(255,138,60,0)",
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      strikeRef.current?.hide();
    })();
  }, [contextSafe]);

  useGSAP(() => {
    if (!isHighlight || !cardRef.current) return;
    gsap.to(cardRef.current, {
      boxShadow: "0 0 50px rgba(255,138,60,0.15)",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });
  }, [isHighlight]);

  const cornerColor = isHighlight
    ? "border-[#ff8a3c]"
    : "border-zinc-700 group-hover:border-[#ff8a3c]";

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between rounded-lg p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 border ${
        isHighlight
          ? "bg-linear-to-b from-[#0a0a0a] to-[#050609] border-[#ff8a3c]/30 shadow-[0_0_40px_rgba(255,138,60,0.15)]"
          : "bg-linear-to-b from-[#0a0a0a]/80 to-[#050609]/60 border-white/5 hover:border-[#ff8a3c]/20 hover:bg-linear-to-b hover:from-[#0f0f12] hover:to-[#0a0a0a]"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`}
      />
      <span
        className={`absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`}
      />
      <span
        className={`absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`}
      />
      <span
        className={`absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`}
      />
      <div
        className={`absolute inset-0 pointer-events-none rounded-lg bg-linear-to-b from-white/2 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${
          isHighlight ? "opacity-100" : ""
        }`}
      />
      {isHighlight && (
        <div className="absolute inset-0 pointer-events-none rounded-lg bg-[radial-gradient(circle_at_top,rgba(255,138,60,0.05),transparent_60%)] opacity-60" />
      )}

      <div className="relative z-10">
        <div className="mb-4 sm:mb-8 flex items-start justify-between">
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`text-[10px] font-bold tracking-widest uppercase ${
                  isHighlight
                    ? "text-[#ff8a3c]"
                    : "text-zinc-600 group-hover:text-[#ff8a3c]"
                }`}
                style={{ fontFamily: "var(--font-goldman)" }}
              >
                {isHighlight ? "POPULAR" : "STANDARD"}
              </span>
            </div>
            <h3
              className={`text-xl sm:text-2xl font-bold uppercase transition-colors ${
                isHighlight
                  ? "text-white"
                  : "text-white group-hover:text-[#ff8a3c]"
              }`}
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              {tier.name}
            </h3>
          </div>
          <div
            className={`rounded border px-1.5 py-0.5 text-[9px] font-mono tracking-widest ${
              isHighlight
                ? "border-[#ff8a3c]/30 text-[#ff8a3c]"
                : "border-white/10 text-zinc-600 group-hover:text-[#ff8a3c] group-hover:border-[#ff8a3c]/30"
            }`}
          >
            {tierId}
          </div>
        </div>

        <div className="mb-4 sm:mb-8 relative h-px w-full">
          <div className={`absolute inset-0 transition-all duration-500 ${
            isHighlight
              ? "bg-linear-to-r from-[#ff8a3c] via-[#ff8a3c]/50 to-transparent shadow-[0_0_8px_rgba(255,138,60,0.4)]"
              : "bg-linear-to-r from-white/10 to-transparent group-hover:from-[#ff8a3c]/30 group-hover:shadow-[0_0_6px_rgba(255,138,60,0.3)]"
          }`} />
        </div>
        <div className="mb-4 flex items-baseline gap-1">
          <span
            ref={priceRef}
            style={{ fontFamily: "var(--font-goldman)" }}
            className={`text-4xl sm:text-5xl font-bold inline-block min-w-[120px] sm:min-w-[150px] ${
              isHighlight ? "text-[#ff8a3c]" : "text-white"
            }`}
          >
            {tier.price}
          </span>
          <span className="text-sm text-zinc-500 font-medium">/ alkaen</span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-center text-xs uppercase tracking-widest text-[#ff8a3c] mb-4 sm:hidden flex items-center justify-center gap-2"
        >
          {isExpanded ? "Hide Details" : "Show Details"}
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div className={`${isExpanded ? "block" : "hidden"} sm:block`}>
          <p className="mb-8 text-sm leading-relaxed text-zinc-300 min-h-10">
            {tier.description}
          </p>
          <ul className="space-y-4 mb-8">
            {(tier.features ?? []).map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm text-zinc-300"
              >
                <div
                  className={`h-1.5 w-1.5 rounded-sm transition-all duration-300 shrink-0 ${
                    isHighlight
                      ? "bg-[#ff8a3c] shadow-[0_0_8px_rgba(255,138,60,0.8)]"
                      : "bg-zinc-700 shadow-[0_0_4px_rgba(113,113,122,0.5)] group-hover:bg-[#ff8a3c] group-hover:shadow-[0_0_8px_rgba(255,138,60,0.8)]"
                  }`}
                />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto relative z-10 pt-4 w-full">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleSelectPackage}
          style={{ fontFamily: "var(--font-goldman)" }}
          className={`group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer duration-300 ${
            isHighlight
              ? "text-[#ff8a3c] hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)]"
              : "text-[#ff8a3c] hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)]"
          }`}
        >
          {/* Corner brackets */}
          <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${isHighlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
          <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${isHighlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
          <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${isHighlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
          <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${isHighlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
          
          {/* Background hover effect */}
          <span className="pointer-events-none absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
          
          {/* Shimmer effect for highlighted cards */}
          {isHighlight && (
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[#ff8a3c]/20 to-transparent group-hover/btn:animate-[shimmer_1s_infinite]" />
          )}

          <span className="relative z-10">{tier.cta}</span>
          <svg
            className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <HammerStrike
          ref={strikeRef}
          targetRef={buttonRef}
          className="absolute inset-0"
        />
      </div>
    </article>
  );
}