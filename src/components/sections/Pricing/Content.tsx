"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
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
  monthlyLabel?: string;
  monthlyValue?: string;
  monthlyIncluded?: string[];
  monthlyExcluded?: string[];
  description: string;
  features: string[] | null;
  cta: string;
  highlight?: boolean;
};

// Hook to detect if device is touch-based (mobile)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// Info Modal Component - Uses Portal to render at document root
function InfoModal({ 
  tier, 
  isOpen, 
  onClose 
}: { 
  tier: PricingTier; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 2147483647 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-sm bg-[#0a0a0c] border-2 border-[#ff8a3c]/50 rounded-xl overflow-hidden"
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="bg-[#0a0a0c] p-4 border-b border-[#ff8a3c]/30">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 
            className="text-lg font-bold text-white uppercase pr-10"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            {tier.name}
          </h3>
          <p className="text-sm text-[#ff8a3c] mt-1" style={{ fontFamily: "var(--font-goldman)" }}>
            {tier.monthlyLabel || "Ylläpito"}: {tier.monthlyValue}
          </p>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 100px)' }}>
          {tier.monthlyIncluded && tier.monthlyIncluded.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a3c]" />
                <div className="text-[10px] uppercase tracking-widest text-[#ff8a3c] font-bold">
                  Sisältö
                </div>
              </div>
              <ul className="space-y-2">
                {tier.monthlyIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-200">
                    <svg className="w-4 h-4 text-[#ff8a3c] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {tier.monthlyExcluded && tier.monthlyExcluded.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  Ei sisällä
                </div>
              </div>
              <ul className="space-y-2">
                {tier.monthlyExcluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <svg className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// Info Button with hover tooltip (desktop) and click modal (mobile)
function InfoButton({ 
  tier, 
  isHighlight, 
  compact = false 
}: { 
  tier: PricingTier; 
  isHighlight: boolean;
  compact?: boolean;
}) {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      setInfoModalOpen(true);
    }
  };

  return (
    <>
      <div className="relative group/tooltip">
        <button
          type="button"
          onClick={handleClick}
          className={`flex items-center justify-center cursor-help transition-all duration-300 shrink-0 ${
            compact ? "w-4 h-4" : "w-6 h-6"
          } ${
            isHighlight
              ? "text-[#ff8a3c]/70 hover:text-[#ff8a3c] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,138,60,0.6)]"
              : "text-zinc-500 group-hover:text-[#ff8a3c]/70 hover:text-[#ff8a3c] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,138,60,0.6)]"
          }`}
        >
          <img 
            src="/icons/info.svg" 
            alt="Info" 
            className={`opacity-70 hover:opacity-100 transition-opacity ${compact ? "w-3.5 h-3.5" : "w-5 h-5"}`}
            style={{ filter: isHighlight ? 'invert(60%) sepia(90%) saturate(500%) hue-rotate(350deg) brightness(100%)' : 'invert(50%)' }}
          />
        </button>
        
        {/* Hover tooltip - only shows on desktop (hidden on touch devices via CSS) */}
        <div className={`absolute top-full mt-3 transition-all duration-300 ease-out z-50 opacity-0 invisible translate-y-2 group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 pointer-events-none group-hover/tooltip:pointer-events-auto hidden md:block ${
          compact ? "right-0 w-56" : "left-1/2 -translate-x-1/2 w-72"
        }`}>
          <div className={`relative bg-linear-to-b from-[#111113] to-[#0a0a0c] border border-[#ff8a3c]/30 rounded-xl shadow-2xl shadow-black/60 backdrop-blur-xl ${
            compact ? "p-3" : "p-5"
          }`}>
            {/* Arrow */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111113] border-l border-t border-[#ff8a3c]/30 rotate-45 ${
              compact ? "-top-1.5" : "-top-[6px]"
            }`} />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top,rgba(255,138,60,0.08),transparent_60%)] pointer-events-none" />
            
            {tier.monthlyIncluded && tier.monthlyIncluded.length > 0 && (
              <div className="relative">
                <div className={`flex items-center gap-2 ${compact ? "mb-2" : "mb-3"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a3c] shadow-[0_0_8px_rgba(255,138,60,0.8)]" />
                  <div className={`uppercase tracking-[0.2em] text-[#ff8a3c] font-semibold ${compact ? "text-[8px]" : "text-[10px]"}`} style={{ fontFamily: "var(--font-goldman)" }}>
                    Sisältö
                  </div>
                </div>
                <ul className={`pl-1 ${compact ? "space-y-1 mb-3" : "space-y-2 mb-5"}`}>
                  {tier.monthlyIncluded.map((item, i) => (
                    <li key={i} className={`flex items-start gap-2 text-zinc-300 leading-relaxed ${compact ? "text-[10px]" : "text-[12px]"}`}>
                      <svg className={`text-[#ff8a3c] shrink-0 mt-0.5 ${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {tier.monthlyExcluded && tier.monthlyExcluded.length > 0 && (
              <div className={`relative border-t border-white/5 ${compact ? "pt-2" : "pt-4"}`}>
                <div className={`flex items-center gap-2 ${compact ? "mb-2" : "mb-3"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  <div className={`uppercase tracking-[0.2em] text-zinc-500 font-semibold ${compact ? "text-[8px]" : "text-[10px]"}`} style={{ fontFamily: "var(--font-goldman)" }}>
                    Ei sisällä
                  </div>
                </div>
                <ul className={`pl-1 ${compact ? "space-y-1" : "space-y-2"}`}>
                  {tier.monthlyExcluded.map((item, i) => (
                    <li key={i} className={`flex items-start gap-2 text-zinc-500 leading-relaxed ${compact ? "text-[10px]" : "text-[12px]"}`}>
                      <svg className={`text-zinc-600 shrink-0 mt-0.5 ${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal for mobile */}
      <InfoModal tier={tier} isOpen={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
    </>
  );
}

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

      {/* === DARK GRID BACKGROUND === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050609] via-transparent to-[#050609]" />
        {/* Spotlight gradient */}
        <div
          className="absolute left-1/2 top-1/2 h-[900px] w-[1400px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,138,60,0.10) 0%, rgba(255,138,60,0.03) 40%, transparent 70%)",
          }}
        />
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-center">
          {tiers.map((tier, i) => (
            <PricingCard key={i} tier={tier} index={i} totalTiers={tiers.length} />
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

export function PricingCard({ tier, index, totalTiers = 3 }: { tier: PricingTier; index: number; totalTiers?: number }) {
  const isHighlight = tier.highlight;
  // Middle card is taller, outer cards are shorter
  const isMiddle = totalTiers === 3 && index === 1;

  const cardRef = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const strikeRef = useRef<HammerStrikeHandle>(null);
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleSelectPackage = useCallback(() => {
    contextSafe(() => {
      const onDone = () => {
        // Navigate to contact page with package as query param
        router.push(`/fi/yhteydenotto?package=${encodeURIComponent(tier.name)}`);
      };

      if (strikeRef.current) {
        strikeRef.current.strike({ onComplete: onDone });
      } else {
        onDone();
      }
    })();
  }, [contextSafe, tier.name, router]);

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
        isMiddle 
          ? "lg:scale-105 lg:z-10" 
          : "lg:scale-[0.97] lg:opacity-90 hover:opacity-100"
      } ${
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
          {tier.monthlyValue && (
            <div className="flex items-center gap-3">
              {/* Info button with hover tooltip (desktop) and modal (mobile) */}
              <InfoButton tier={tier} isHighlight={isHighlight ?? false} />
              
              {/* Badge */}
              <div
                className={`rounded-lg border px-4 py-2 text-right ${
                  isHighlight
                    ? "border-[#ff8a3c]/30 bg-[#ff8a3c]/5"
                    : "border-white/10 group-hover:border-[#ff8a3c]/30 group-hover:bg-[#ff8a3c]/5"
                }`}
                style={{ fontFamily: "var(--font-goldman)" }}
              >
                <div className={`text-[10px] font-medium tracking-wider uppercase ${
                  isHighlight
                    ? "text-[#ff8a3c]/70"
                    : "text-zinc-600 group-hover:text-[#ff8a3c]/70"
                }`}>
                  {tier.monthlyLabel || "YLLÄPITO"}
                </div>
                <div className={`text-base font-bold tracking-wide ${
                  isHighlight
                    ? "text-[#ff8a3c]"
                    : "text-zinc-400 group-hover:text-[#ff8a3c]"
                }`}>
                  {tier.monthlyValue}
                </div>
              </div>
            </div>
          )}
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

// Expandable card wrapper for contact form - flex-based expansion animation
export function ExpandablePricingCards({
  tiers,
  selectedId,
  onSelect,
  packageToId,
}: {
  tiers: PricingTier[];
  selectedId: string;
  onSelect: (id: string) => void;
  packageToId: (index: number) => string;
}) {
  // Find which card should be initially expanded
  const getInitialExpanded = () => {
    // If a card is selected, expand that one
    const selectedIndex = tiers.findIndex((_, i) => packageToId(i) === selectedId);
    if (selectedIndex !== -1) return selectedIndex;
    // Otherwise expand the middle card (index 1 for 3 cards)
    return 1;
  };

  const [expandedIndex, setExpandedIndex] = useState<number>(getInitialExpanded());

  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      {/* Tab headers - themed cards with corner brackets */}
      <div className="flex gap-1.5 sm:gap-2">
        {tiers.map((tier, index) => {
          const isExpanded = expandedIndex === index;
          const isSelected = selectedId === packageToId(index);
          const isHighlight = tier.highlight;
          
          // Determine corner color based on state
          const cornerColor = isExpanded || isSelected
            ? "border-[#ff8a3c]"
            : isHighlight
            ? "border-[#ff8a3c]/40 group-hover:border-[#ff8a3c]/60"
            : "border-zinc-700/50 group-hover:border-zinc-600";
          
          return (
            <button
              key={index}
              onClick={() => setExpandedIndex(index)}
              className={`group flex-1 relative px-2 sm:px-4 py-2.5 sm:py-3.5 transition-all duration-300 cursor-pointer ${
                isExpanded
                  ? "bg-gradient-to-b from-[#ff8a3c]/10 to-[#ff8a3c]/5"
                  : isSelected
                  ? "bg-gradient-to-b from-[#0a0a0a] to-[#050609]"
                  : isHighlight
                  ? "bg-gradient-to-b from-[#0a0a0a]/60 to-[#050609]/40"
                  : "bg-gradient-to-b from-[#0a0a0a]/40 to-transparent"
              }`}
            >
              {/* Corner brackets - themed look */}
              <span className={`absolute left-0 top-0 h-2.5 w-2.5 border-l border-t transition-all duration-300 ${cornerColor}`} />
              <span className={`absolute right-0 top-0 h-2.5 w-2.5 border-r border-t transition-all duration-300 ${cornerColor}`} />
              <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r transition-all duration-300 ${cornerColor}`} />
              <span className={`absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l transition-all duration-300 ${cornerColor}`} />
              
              {/* Top edge glow for expanded/selected */}
              {(isExpanded || isSelected) && (
                <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#ff8a3c]/60 to-transparent" />
              )}
              
              {/* Background hover glow */}
              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,138,60,0.08)_0%,transparent_70%)] transition-opacity duration-300 pointer-events-none ${
                isExpanded || isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`} />
              
              {/* Selected dot indicator (instead of checkmark) */}
              {isSelected && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ff8a3c] shadow-[0_0_6px_rgba(255,138,60,0.8)]" />
              )}
              
              <div className="relative z-10 flex items-center justify-between gap-1">
                <span
                  className={`font-bold uppercase text-[10px] sm:text-sm tracking-wider truncate transition-colors ${
                    isExpanded || isSelected
                      ? "text-[#ff8a3c]"
                      : isHighlight
                      ? "text-white group-hover:text-[#ff8a3c]"
                      : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
                  style={{ fontFamily: "var(--font-goldman)" }}
                >
                  {tier.name}
                </span>
                <span
                  className={`font-bold text-xs sm:text-base shrink-0 transition-colors ${
                    isExpanded || isSelected
                      ? "text-[#ff8a3c]"
                      : "text-white"
                  }`}
                  style={{ fontFamily: "var(--font-goldman)" }}
                >
                  {tier.price}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded card - full original design */}
      <ExpandedPricingCard
        tier={tiers[expandedIndex]}
        isSelected={selectedId === packageToId(expandedIndex)}
        onSelect={() => onSelect(packageToId(expandedIndex))}
      />
    </div>
  );
}

// Full expanded card - matches original pricing card design
function ExpandedPricingCard({
  tier,
  isSelected,
  onSelect,
}: {
  tier: PricingTier;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const isHighlight = tier.highlight;
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const strikeRef = useRef<HammerStrikeHandle>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleSelectPackage = useCallback(() => {
    contextSafe(() => {
      const onDone = () => {
        onSelect();
      };

      if (strikeRef.current) {
        strikeRef.current.strike({ onComplete: onDone });
      } else {
        onDone();
      }
    })();
  }, [contextSafe, onSelect]);

  const handleButtonMouseEnter = useCallback(() => {
    strikeRef.current?.show();
  }, []);

  const handleButtonMouseLeave = useCallback(() => {
    strikeRef.current?.hide();
  }, []);

  const cornerColor = isSelected
    ? "border-[#ff8a3c]"
    : isHighlight
    ? "border-[#ff8a3c]"
    : "border-zinc-700 group-hover:border-[#ff8a3c]";

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-lg border p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 ${
        isSelected
          ? "bg-linear-to-b from-[#0a0a0a] to-[#050609] border-[#ff8a3c]/50 shadow-[0_0_40px_rgba(255,138,60,0.25)]"
          : isHighlight
          ? "bg-linear-to-b from-[#0a0a0a] to-[#050609] border-[#ff8a3c]/30 shadow-[0_0_40px_rgba(255,138,60,0.15)]"
          : "bg-linear-to-b from-[#0a0a0a]/80 to-[#050609]/60 border-white/5 hover:border-[#ff8a3c]/20"
      }`}
    >
      {/* Corner brackets */}
      <span className={`absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`} />
      <span className={`absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`} />
      <span className={`absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`} />
      <span className={`absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`} />

      {/* Background gradient overlay */}
      <div className={`absolute inset-0 pointer-events-none rounded-lg bg-linear-to-b from-white/2 to-transparent ${
        isHighlight || isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      } transition-opacity duration-700`} />
      {(isHighlight || isSelected) && (
        <div className="absolute inset-0 pointer-events-none rounded-lg bg-[radial-gradient(circle_at_top,rgba(255,138,60,0.05),transparent_60%)] opacity-60" />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`text-[10px] font-bold tracking-widest uppercase ${
                  isHighlight || isSelected
                    ? "text-[#ff8a3c]"
                    : "text-zinc-600"
                }`}
                style={{ fontFamily: "var(--font-goldman)" }}
              >
                {isHighlight ? "POPULAR" : "STANDARD"}
              </span>
            </div>
            <h3
              className={`text-2xl sm:text-3xl font-bold uppercase transition-colors ${
                isHighlight || isSelected
                  ? "text-white"
                  : "text-white group-hover:text-[#ff8a3c]"
              }`}
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              {tier.name}
            </h3>
          </div>
          {tier.monthlyValue && (
            <div className="flex items-center gap-3">
              {/* Info button with hover tooltip (desktop) and modal (mobile) */}
              <InfoButton tier={tier} isHighlight={isHighlight || isSelected || false} />
              
              {/* Monthly badge */}
              <div
                className={`rounded-lg border px-4 py-2 text-right ${
                  isHighlight || isSelected
                    ? "border-[#ff8a3c]/30 bg-[#ff8a3c]/5"
                    : "border-white/10 group-hover:border-[#ff8a3c]/30 group-hover:bg-[#ff8a3c]/5"
                }`}
                style={{ fontFamily: "var(--font-goldman)" }}
              >
                <div className={`text-[10px] font-medium tracking-wider uppercase ${
                  isHighlight || isSelected
                    ? "text-[#ff8a3c]/70"
                    : "text-zinc-600"
                }`}>
                  {tier.monthlyLabel || "YLLÄPITO"}
                </div>
                <div className={`text-base font-bold tracking-wide ${
                  isHighlight || isSelected
                    ? "text-[#ff8a3c]"
                    : "text-zinc-400"
                }`}>
                  {tier.monthlyValue}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mb-6 relative h-px w-full">
          <div className={`absolute inset-0 transition-all duration-500 ${
            isHighlight || isSelected
              ? "bg-linear-to-r from-[#ff8a3c] via-[#ff8a3c]/50 to-transparent shadow-[0_0_8px_rgba(255,138,60,0.4)]"
              : "bg-linear-to-r from-white/10 to-transparent group-hover:from-[#ff8a3c]/30 group-hover:shadow-[0_0_6px_rgba(255,138,60,0.3)]"
          }`} />
        </div>

        {/* Price */}
        <div className="mb-6 flex items-baseline gap-1">
          <span
            style={{ fontFamily: "var(--font-goldman)" }}
            className={`text-4xl sm:text-5xl font-bold ${
              isHighlight || isSelected ? "text-[#ff8a3c]" : "text-white"
            }`}
          >
            {tier.price}
          </span>
          <span className="text-sm text-zinc-500 font-medium">/ alkaen</span>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-zinc-300">
          {tier.description}
        </p>

        {/* Features - 2 column grid on larger screens */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {(tier.features ?? []).map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
              <div
                className={`h-1.5 w-1.5 rounded-sm transition-all duration-300 shrink-0 ${
                  isHighlight || isSelected
                    ? "bg-[#ff8a3c] shadow-[0_0_8px_rgba(255,138,60,0.8)]"
                    : "bg-zinc-700"
                }`}
              />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div 
          className="relative w-full"
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
        >
          <button
            ref={buttonRef}
            type="button"
            onClick={handleSelectPackage}
            style={{ fontFamily: "var(--font-goldman)" }}
            className={`group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer duration-300 ${
              isSelected
                ? "text-white bg-[#ff8a3c]/20 shadow-[0_0_20px_rgba(255,138,60,0.3)]"
                : "text-[#ff8a3c] hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)]"
            }`}
          >
            {/* Corner brackets */}
            <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${isSelected ? "border-[#ff8a3c] h-full w-full" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
            <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${isSelected ? "border-[#ff8a3c] h-full w-full" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
            <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${isSelected ? "border-[#ff8a3c] h-full w-full" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
            <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${isSelected ? "border-[#ff8a3c] h-full w-full" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
            
            {/* Background hover effect */}
            <span className="pointer-events-none absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
            
            <span className="relative z-10">{isSelected ? "Valittu ✓" : tier.cta}</span>
            {!isSelected && (
              <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <HammerStrike
            ref={strikeRef}
            targetRef={buttonRef}
            className="absolute inset-0"
          />
        </div>
      </div>
    </div>
  );
}

// Selectable variant for contact form - uses same styling but with selection state
export function SelectablePricingCard({ 
  tier, 
  index, 
  totalTiers = 3,
  isSelected,
  onSelect,
  compact = false,
  isExpanded = false,
  onExpand,
  hasExpandedSibling = false,
}: { 
  tier: PricingTier; 
  index: number; 
  totalTiers?: number;
  isSelected: boolean;
  onSelect: () => void;
  compact?: boolean;
  isExpanded?: boolean;
  onExpand?: () => void;
  hasExpandedSibling?: boolean;
}) {
  const isHighlight = tier.highlight;
  const isMiddle = totalTiers === 3 && index === 1;

  const cardRef = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const strikeRef = useRef<HammerStrikeHandle>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });
  const handleSelectPackage = useCallback(() => {
    contextSafe(() => {
      const onDone = () => {
        onSelect();
      };

      if (strikeRef.current) {
        strikeRef.current.strike({ onComplete: onDone });
      } else {
        onDone();
      }
    })();
  }, [contextSafe, onSelect]);

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

  const cornerColor = isSelected
    ? "border-[#ff8a3c]"
    : isHighlight
    ? "border-[#ff8a3c]"
    : "border-zinc-700 group-hover:border-[#ff8a3c]";

  // Compact mode with expand/collapse behavior
  const isCompactCollapsed = compact && !isExpanded;
  const isCompactExpanded = compact && isExpanded;

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={compact && onExpand ? onExpand : undefined}
      className={`group relative flex flex-col justify-between rounded-lg backdrop-blur-sm border cursor-pointer ${
        compact 
          ? `transition-all duration-500 ease-out ${
              isCompactExpanded 
                ? "p-5 col-span-2 row-span-1 z-20" 
                : hasExpandedSibling 
                  ? "p-3 col-span-1 opacity-60 scale-95" 
                  : "p-4 col-span-1 hover:-translate-y-1"
            }`
          : "p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2"
      } ${
        isMiddle && !compact
          ? "lg:scale-105 lg:z-10" 
          : !compact ? "lg:scale-[0.97] lg:opacity-90 hover:opacity-100" : ""
      } ${
        isSelected
          ? "bg-linear-to-b from-[#0a0a0a] to-[#050609] border-[#ff8a3c]/50 shadow-[0_0_40px_rgba(255,138,60,0.25)] -translate-y-1"
          : isHighlight
          ? "bg-linear-to-b from-[#0a0a0a] to-[#050609] border-[#ff8a3c]/30 shadow-[0_0_40px_rgba(255,138,60,0.15)]"
          : "bg-linear-to-b from-[#0a0a0a]/80 to-[#050609]/60 border-white/5 hover:border-[#ff8a3c]/20 hover:bg-linear-to-b hover:from-[#0f0f12] hover:to-[#0a0a0a]"
      }`}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className={`absolute z-20 flex items-center justify-center rounded-full bg-[#ff8a3c] shadow-[0_0_20px_rgba(255,138,60,0.6)] ${
          compact ? "-top-2 -right-2 h-6 w-6" : "-top-3 -right-3 h-8 w-8"
        }`}>
          <svg className={compact ? "h-3 w-3 text-white" : "h-4 w-4 text-white"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <span
        className={`absolute left-0 top-0 border-l-2 border-t-2 transition-all duration-500 ${
          compact ? "h-3 w-3 group-hover:h-5 group-hover:w-5" : "h-4 w-4 group-hover:h-8 group-hover:w-8"
        } ${cornerColor}`}
      />
      <span
        className={`absolute right-0 top-0 border-r-2 border-t-2 transition-all duration-500 ${
          compact ? "h-3 w-3 group-hover:h-5 group-hover:w-5" : "h-4 w-4 group-hover:h-8 group-hover:w-8"
        } ${cornerColor}`}
      />
      <span
        className={`absolute bottom-0 right-0 border-b-2 border-r-2 transition-all duration-500 ${
          compact ? "h-3 w-3 group-hover:h-5 group-hover:w-5" : "h-4 w-4 group-hover:h-8 group-hover:w-8"
        } ${cornerColor}`}
      />
      <span
        className={`absolute bottom-0 left-0 border-b-2 border-l-2 transition-all duration-500 ${
          compact ? "h-3 w-3 group-hover:h-5 group-hover:w-5" : "h-4 w-4 group-hover:h-8 group-hover:w-8"
        } ${cornerColor}`}
      />
      <div
        className={`absolute inset-0 pointer-events-none rounded-lg bg-linear-to-b from-white/2 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${
          isHighlight || isSelected ? "opacity-100" : ""
        }`}
      />
      {(isHighlight || isSelected) && (
        <div className="absolute inset-0 pointer-events-none rounded-lg bg-[radial-gradient(circle_at_top,rgba(255,138,60,0.05),transparent_60%)] opacity-60" />
      )}

      <div className="relative z-10">
        {/* Collapsed compact view - just name and price */}
        {isCompactCollapsed && (
          <div className="flex flex-col items-center text-center py-2">
            <span
              className={`font-bold tracking-widest uppercase text-[8px] mb-1 ${
                isHighlight || isSelected ? "text-[#ff8a3c]" : "text-zinc-600"
              }`}
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              {isHighlight ? "POPULAR" : "STANDARD"}
            </span>
            <h3
              className={`font-bold uppercase text-lg mb-2 ${
                isHighlight || isSelected ? "text-white" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              {tier.name}
            </h3>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-2" />
            <span
              ref={priceRef}
              style={{ fontFamily: "var(--font-goldman)" }}
              className={`font-bold text-2xl ${
                isHighlight || isSelected ? "text-[#ff8a3c]" : "text-white"
              }`}
            >
              {tier.price}
            </span>
            <span className="text-zinc-500 text-[10px] mt-0.5">/ alkaen</span>
            {tier.monthlyValue && (
              <div className="mt-2 text-[10px] text-zinc-400">
                <span className="text-[#ff8a3c]/70">{tier.monthlyLabel || "Kuukausimaksu"}: </span>
                {tier.monthlyValue}
              </div>
            )}
            <div className="mt-3 text-[9px] text-zinc-500 flex items-center gap-1">
              <span>Klikkaa nähdäksesi lisää</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}

        {/* Expanded compact view or normal view */}
        {(!compact || isCompactExpanded) && (
          <>
            <div className={`flex items-start justify-between ${compact ? "mb-3" : "mb-4 sm:mb-8"}`}>
              <div className="flex flex-col">
                <div className={`flex items-center gap-2 ${compact ? "mb-1" : "mb-2"}`}>
                  <span
                    className={`font-bold tracking-widest uppercase ${
                      compact ? "text-[8px]" : "text-[10px]"
                    } ${
                      isHighlight || isSelected
                        ? "text-[#ff8a3c]"
                        : "text-zinc-600 group-hover:text-[#ff8a3c]"
                    }`}
                    style={{ fontFamily: "var(--font-goldman)" }}
                  >
                    {isHighlight ? "POPULAR" : "STANDARD"}
                  </span>
                </div>
                <h3
                  className={`font-bold uppercase transition-colors ${
                    compact ? "text-base" : "text-xl sm:text-2xl"
                  } ${
                    isHighlight || isSelected
                      ? "text-white"
                      : "text-white group-hover:text-[#ff8a3c]"
                  }`}
                  style={{ fontFamily: "var(--font-goldman)" }}
                >
                  {tier.name}
                </h3>
              </div>
              {tier.monthlyValue && (
                <div className={`flex items-center ${compact ? "gap-1.5" : "gap-3"}`}>
                  {/* Info button with hover tooltip (desktop) and modal (mobile) */}
                  <InfoButton tier={tier} isHighlight={isHighlight || isSelected || false} compact={compact} />
                  
                  <div className="flex flex-col items-end">
                    <div className={`uppercase tracking-[0.15em] ${
                      compact ? "text-[7px]" : "text-[9px]"
                    } ${
                      isHighlight || isSelected
                        ? "text-[#ff8a3c]/70"
                        : "text-zinc-500 group-hover:text-[#ff8a3c]/70"
                    }`}>
                      {tier.monthlyLabel || "Kuukausimaksu"}
                    </div>
                    <div className={`font-bold tracking-wide ${
                      compact ? "text-xs" : "text-base"
                    } ${
                      isHighlight || isSelected
                        ? "text-[#ff8a3c]"
                        : "text-zinc-400 group-hover:text-[#ff8a3c]"
                    }`}>
                      {tier.monthlyValue}
                    </div>
                  </div>
                </div>
              )}
            </div>

        <div className={`relative h-px w-full ${compact ? "mb-3" : "mb-4 sm:mb-8"}`}>
          <div className={`absolute inset-0 transition-all duration-500 ${
            isHighlight || isSelected
              ? "bg-linear-to-r from-[#ff8a3c] via-[#ff8a3c]/50 to-transparent shadow-[0_0_8px_rgba(255,138,60,0.4)]"
              : "bg-linear-to-r from-white/10 to-transparent group-hover:from-[#ff8a3c]/30 group-hover:shadow-[0_0_6px_rgba(255,138,60,0.3)]"
          }`} />
        </div>
        <div className={`flex items-baseline gap-1 ${compact ? "mb-2" : "mb-4"}`}>
          <span
            ref={priceRef}
            style={{ fontFamily: "var(--font-goldman)" }}
            className={`font-bold inline-block ${
              compact ? "text-xl" : "text-4xl sm:text-5xl min-w-[120px] sm:min-w-[150px]"
            } ${
              isHighlight || isSelected ? "text-[#ff8a3c]" : "text-white"
            }`}
          >
            {tier.price}
          </span>
          <span className={`text-zinc-500 font-medium ${compact ? "text-[10px]" : "text-sm"}`}>/ alkaen</span>
        </div>

        <div>
          <p className={`leading-relaxed text-zinc-300 ${
            compact ? "mb-2 text-[11px]" : "mb-8 text-sm min-h-10"
          }`}>
            {tier.description}
          </p>
          <ul className={compact ? "space-y-1 mb-2" : "space-y-4 mb-8"}>
            {(tier.features ?? []).map((feature, i) => (
              <li
                key={i}
                className={`flex items-center text-zinc-300 ${
                  compact ? "gap-1.5 text-[10px]" : "gap-3 text-sm"
                }`}
              >
                <div
                  className={`rounded-sm transition-all duration-300 shrink-0 ${
                    compact ? "h-1 w-1" : "h-1.5 w-1.5"
                  } ${
                    isHighlight || isSelected
                      ? "bg-[#ff8a3c] shadow-[0_0_8px_rgba(255,138,60,0.8)]"
                      : "bg-zinc-700 shadow-[0_0_4px_rgba(113,113,122,0.5)] group-hover:bg-[#ff8a3c] group-hover:shadow-[0_0_8px_rgba(255,138,60,0.8)]"
                  }`}
                />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`mt-auto relative z-10 w-full ${compact ? "pt-2" : "pt-4"}`}>
          <button
            ref={buttonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectPackage();
            }}
            style={{ fontFamily: "var(--font-goldman)" }}
            className={`group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden font-bold uppercase tracking-[0.16em] transition-all cursor-pointer duration-300 ${
              compact ? "px-3 py-2 text-[10px]" : "px-6 py-4 text-xs"
            } ${
              isSelected
                ? "text-white bg-[#ff8a3c]/20 shadow-[0_0_20px_rgba(255,138,60,0.3)]"
                : "text-[#ff8a3c] hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)]"
            }`}
          >
            <span className={`pointer-events-none absolute left-0 top-0 border-l-2 border-t-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${compact ? "h-2 w-2" : "h-3 w-3"} ${isSelected ? "border-[#ff8a3c] h-full w-full" : isHighlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
            <span className={`pointer-events-none absolute right-0 top-0 border-r-2 border-t-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${compact ? "h-2 w-2" : "h-3 w-3"} ${isSelected ? "border-[#ff8a3c] h-full w-full" : isHighlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
            <span className={`pointer-events-none absolute bottom-0 right-0 border-b-2 border-r-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${compact ? "h-2 w-2" : "h-3 w-3"} ${isSelected ? "border-[#ff8a3c] h-full w-full" : isHighlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
            <span className={`pointer-events-none absolute bottom-0 left-0 border-b-2 border-l-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${compact ? "h-2 w-2" : "h-3 w-3"} ${isSelected ? "border-[#ff8a3c] h-full w-full" : isHighlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
            
            <span className="pointer-events-none absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
            
            {(isHighlight && !isSelected) && (
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[#ff8a3c]/20 to-transparent group-hover/btn:animate-[shimmer_1s_infinite]" />
            )}

            <span className="relative z-10">{isSelected ? "Valittu ✓" : tier.cta}</span>
            {!isSelected && (
              <svg
                className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          <HammerStrike
            ref={strikeRef}
            targetRef={buttonRef}
            className="absolute inset-0"
          />
        </div>
      </>
      )}
    </div>
    </article>
  );
}