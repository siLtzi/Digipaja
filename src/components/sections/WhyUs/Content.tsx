"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Card = {
  title: string;
  description: string;
  icon: string;
};

type WhyUsProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: Card[];
};

export default function WhyUsContent({
  eyebrow,
  title,
  subtitle,
  cards,
}: WhyUsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const finalCardRef = useRef<HTMLDivElement>(null);

  // Separate regular cards from highlight card (last one)
  const regularCards = cards.slice(0, -1);
  const highlightCard = cards[cards.length - 1];

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const horizontal = horizontalRef.current;
      const finalCard = finalCardRef.current;
      if (!horizontal) return;

      // Calculate the total width to scroll (just the cards, no extra space)
      const totalWidth = horizontal.scrollWidth - window.innerWidth;

      // Only create scroll trigger if there's content to scroll
      if (totalWidth > 0) {
        // Horizontal scroll timeline
        gsap.to(horizontal, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 0.3, // Faster scrub for quick scrolling
            anticipatePin: 1,
          },
        });
      }

      // Final card reveal animation (separate scroll trigger)
      if (finalCard) {
        gsap.fromTo(finalCard, 
          { 
            y: 100, 
            opacity: 0, 
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: finalCard,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Glow pulse animation
        gsap.fromTo(".final-glow",
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 0.3,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: finalCard,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="why-us"
      className="relative bg-[#050609] overflow-hidden"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="h-[4px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40" />
        <div className="absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)]" />
        <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90" />
      </div>

      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/image/BGWhyUs2.png"
            alt="Background"
            fill
            className="object-cover object-center opacity-20 mix-blend-screen"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050609] via-[#050609]/85 to-[#050609]" />
        
        {/* Active Scanline Grid */}
        <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
            }}
        />
      </div>

      {/* === HORIZONTAL SCROLL CONTAINER === */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-16">
        {/* Header */}
        <div className="pb-8 px-6 flex flex-col items-center text-center">
          <span
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold mb-4"
          >
            [ {eyebrow} ]
          </span>

          <h2
            style={{ fontFamily: "var(--font-goldman)" }}
            className="max-w-5xl text-balance text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>

          <p className="mt-4 max-w-3xl text-sm text-zinc-300 sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Horizontal scrolling cards - no extra padding */}
        <div className="flex items-center overflow-hidden">
          <div 
            ref={horizontalRef}
            className="flex gap-6 px-8 will-change-transform"
          >
            {regularCards.map((card, i) => (
              <HorizontalCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* === FINAL HIGHLIGHT CARD - Separate section === */}
      {highlightCard && (
        <div className="relative z-10 py-24 px-6">
          <div 
            ref={finalCardRef}
            className="max-w-2xl mx-auto relative"
          >
            {/* Glow effect */}
            <div className="final-glow absolute -inset-8 bg-[#ff8a3c] rounded-full blur-[100px] opacity-0" />
            <FinalCard card={highlightCard} index={regularCards.length} />
          </div>
        </div>
      )}
    </section>
  );
}

// --- HORIZONTAL CARD (Big cards for sideways scroll) ---
function HorizontalCard({
  card,
  index,
}: {
  card: Card;
  index: number;
}) {
  return (
    <div
      className="horizontal-card flex-shrink-0 w-[350px] sm:w-[400px] h-[50vh] max-h-[400px] group relative flex flex-col p-8 transition-all duration-500 rounded-lg rounded-br-none border cursor-default overflow-hidden will-change-transform
      bg-[#0a0a0a]/95 border-[#ff8a3c]/20 hover:border-[#ff8a3c]/50 hover:bg-[#0f0f12] hover:shadow-[0_0_40px_-10px_rgba(255,138,60,0.25)]"
    >
      {/* Large Background Icon */}
      <div className="absolute bottom-6 right-6 opacity-[0.04] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.08]">
        <CardIcon icon={card.icon} className="w-32 h-32" />
      </div>

      {/* Rising Heat Gradient on Hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#ff8a3c]/15 via-transparent to-transparent transition-all duration-500 ease-out z-0
        translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
      />

      {/* Card Number - Top */}
      <div className="text-[#ff8a3c]/30 text-xs font-bold mb-4">
        0{index + 1}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <h3
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-[#ff8a3c] transition-colors duration-300 mb-4"
        >
          {card.title}
        </h3>

        <p className="text-sm sm:text-base leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors flex-1">
          {card.description}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#ff8a3c]/20 group-hover:border-[#ff8a3c]/50 transition-colors" />
    </div>
  );
}

// --- FINAL CARD (Dramatic reveal at end) ---
function FinalCard({
  card,
  index,
}: {
  card: Card;
  index: number;
}) {
  return (
    <div
      className="final-card-content relative flex flex-col p-10 sm:p-12 transition-all duration-500 rounded-lg rounded-br-none border overflow-hidden will-change-transform
      bg-[#0a0b10]/95 border-[#ff8a3c] shadow-[0_0_60px_-10px_rgba(255,138,60,0.4)]"
    >
      {/* Large Background Icon */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-[0.06] pointer-events-none">
        <CardIcon icon={card.icon} className="w-40 h-40" />
      </div>

      {/* Permanent Heat Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#ff8a3c]/15 via-transparent to-transparent z-0" />

      {/* Card Number */}
      <div className="text-[#ff8a3c]/50 text-sm font-bold mb-4">
        0{index + 1}
      </div>

      <div className="relative z-10">
        <h3
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-3xl sm:text-4xl font-bold leading-tight text-white mb-4"
        >
          {card.title}
        </h3>

        <p className="text-base sm:text-lg leading-relaxed text-zinc-200 max-w-xl">
          {card.description}
        </p>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[#ff8a3c]" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#ff8a3c]" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[#ff8a3c]" />
    </div>
  );
}

// --- ICON COMPONENT ---
function CardIcon({ icon, className }: { icon: string; className?: string }) {
  const baseClass = className || "w-6 h-6";
  
  switch (icon) {
    case "forge":
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9H4V20H18V9H16V6H6V9ZM10 9H14V6H10V9ZM16 20H18V18H16V20ZM4 20H6V18H4V20ZM6 18H16V9H6V18Z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "speed":
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "tech":
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "local":
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "shield":
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "fingerprint":
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.578-4.18" />
        </svg>
      );
    case "rocket":
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "trophy":
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    default:
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}