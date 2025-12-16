"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import {
  HammerStrike,
  type HammerStrikeHandle,
} from "./HammerStrike";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin, ScrollSmoother);
}

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
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
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32 text-zinc-100"
    >
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center">
        <div className="h-px w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c]/50 to-transparent" />
        <div className="absolute top-0 h-px w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-80" />
      </div>

      {/* --- BACKGROUND FIX START --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* CHANGED: 
            1. Increased size to h-[800px] w-[800px] for a wider spread.
            2. Swapped 'bg-color + blur' for 'radial-gradient'.
            3. Lowered opacity slightly for better blending.
        */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 bg-[radial-gradient(circle_closest-side,rgba(255,138,60,0.15),transparent)] blur-3xl opacity-50" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ff8a3c1a_1px,transparent_1px),linear-gradient(to_bottom,#ff8a3c1a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10" />
        
        {/* Vignette fade */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#050609_100%)]" />
      </div>
      {/* --- BACKGROUND FIX END --- */}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
            </span>
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-[12px] uppercase tracking-[0.2em] text-[#ff8a3c]"
            >
              [ {eyebrow} ]
            </span>
          </div>
          <h2
            className="max-w-3xl text-balance text-4xl font-bold leading-none sm:text-5xl lg:text-[3.5rem]"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
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

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const isHighlight = tier.highlight;
  const tierId = `SYS.0${index + 1}`;
  const originalPrice = tier.price;

  const cardRef = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const strikeRef = useRef<HammerStrikeHandle>(null);

  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleSelectPackage = contextSafe(() => {
    const onDone = () => {
      router.push(`?package=${encodeURIComponent(tier.name)}`, {
        scroll: false,
      });

      const smoother = ScrollSmoother.get();
      const contactSection = document.querySelector("#contact");

      if (smoother && contactSection) {
        smoother.scrollTo(contactSection, true, "center");
      } else if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    if (strikeRef.current) {
      strikeRef.current.strike({ onComplete: onDone });
    } else {
      onDone();
    }
  });

  const handleMouseEnter = contextSafe(() => {
    if (priceRef.current) {
      // @ts-ignore
      if (gsap.plugins.scrambleText) {
        gsap.to(priceRef.current, {
          duration: 0.5,
          scrambleText: { text: originalPrice, chars: "0123456789" },
        });
      }
    }

    strikeRef.current?.show();
  });

  const handleMouseLeave = contextSafe(() => {
    strikeRef.current?.hide();
  });

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
      className={`group relative flex flex-col justify-between rounded-sm p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${
        isHighlight
          ? "bg-[#ff8a3c]/5 shadow-[0_0_40px_rgba(255,138,60,0.08)]"
          : "bg-[#0a0b10]/80 hover:bg-[#0f1115]"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 rounded-tl-sm transition-all duration-300 group-hover:h-full group-hover:w-full ${cornerColor}`}
      />
      <span
        className={`absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 rounded-tr-sm transition-all duration-300 group-hover:h-full group-hover:w-full ${cornerColor}`}
      />
      <span
        className={`absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 rounded-br-sm transition-all duration-300 group-hover:h-full group-hover:w-full ${cornerColor}`}
      />
      <span
        className={`absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 rounded-bl-sm transition-all duration-300 group-hover:h-full group-hover:w-full ${cornerColor}`}
      />
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          isHighlight ? "opacity-100" : ""
        }`}
      />

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

        <div
          className={`mb-4 sm:mb-8 h-px w-full transition-colors ${
            isHighlight
              ? "bg-gradient-to-r from-[#ff8a3c]/50 to-transparent"
              : "bg-white/5 group-hover:bg-[#ff8a3c]/20"
          }`}
        />
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
          <p className="mb-8 text-sm leading-relaxed text-zinc-400 min-h-[40px]">
            {tier.description}
          </p>
          <ul className="space-y-4 mb-8">
            {tier.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm text-zinc-300"
              >
                <div
                  className={`h-1.5 w-1.5 rounded-[1px] shadow-[0_0_5px_currentColor] transition-colors flex-shrink-0 ${
                    isHighlight
                      ? "bg-[#ff8a3c] text-[#ff8a3c]"
                      : "bg-zinc-700 text-zinc-700 group-hover:bg-[#ff8a3c] group-hover:text-[#ff8a3c]"
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
          className={`group/btn relative flex w-full items-center justify-center overflow-hidden rounded-sm border px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer duration-300 ${
            isHighlight
              ? "border-[#ff8a3c] bg-[#ff8a3c] text-black"
              : "border-zinc-800 bg-transparent text-zinc-400 hover:border-[#ff8a3c] hover:text-white"
          }`}
        >
          {isHighlight && (
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-[shimmer_1s_infinite]" />
          )}
          {!isHighlight && (
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-10 transition-opacity bg-[linear-gradient(to_right,#ff8a3c_1px,transparent_1px),linear-gradient(to_bottom,#ff8a3c_1px,transparent_1px)] bg-[size:10px_10px]" />
          )}

          <span
            className="relative z-10 flex items-center gap-2"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            <span className={isHighlight ? "text-black" : "text-white"}>
              {tier.cta}
            </span>
            <svg
              className={`h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
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