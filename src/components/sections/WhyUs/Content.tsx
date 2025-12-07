"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Point = {
  title: string;
  body: string;
  image?: {
    src: string;
    alt: string;
  };
};

export default function WhyUsContent({
  eyebrow,
  title,
  subtitle,
  points,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  points: Point[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!triggerRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".deck-card");

      // 1. Initial State
      gsap.set(cards, {
        yPercent: 100,
        opacity: 0,
        scale: 0.9,
        rotateX: -10,
        transformOrigin: "center top",
      });

      // First card visible
      gsap.set(cards[0], {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${cards.length * 80}%`,
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (cards.length - 1));
            setActiveIndex(idx);
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        tl.to(
          cards[i - 1],
          {
            scale: 0.92,
            opacity: 0.5,
            yPercent: -4,
            filter: "blur(4px)",
            duration: 1,
            ease: "power2.inOut",
          },
          ">"
        );

        tl.to(
          card,
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
          },
          "<"
        );
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [points.length]);

  return (
    <section ref={triggerRef} className="relative h-screen bg-transparent">
      {/* REMOVED: The Ambient Blob Div */}

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* --- LEFT: Text Content --- */}
        <div className="flex-1 text-center md:text-left pt-20 md:pt-0">
          <span 
            style={{ fontFamily: "var(--font-poppins)" }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-6 block"
          >
            {eyebrow}
          </span>
          <h2 
            style={{ fontFamily: "var(--font-clash-display)" }}
            className="text-4xl md:text-6xl font-semibold text-white tracking-wide mb-6"
          >
            {title}
          </h2>
          <p 
            style={{ fontFamily: "var(--font-poppins)" }}
            className="text-lg text-zinc-400 leading-relaxed max-w-md mx-auto md:mx-0 font-light"
          >
            {subtitle}
          </p>

          <div className="mt-12 flex gap-3 justify-center md:justify-start">
            {points.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex ? "w-12 bg-white" : "w-2 bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* --- RIGHT: The Deck --- */}
        <div
          ref={containerRef}
          className="flex-1 w-full max-w-md h-[500px] relative perspective-[1000px]"
        >
          {points.map((p, i) => (
            <div
              key={i}
              className="deck-card absolute inset-0 w-full h-full rounded-sm"
              // Removed "overflow-hidden" and "shadow-2xl" from here so the glow can spill out
            >
              
              {/* --- NEW SHARP "HALO" LAYERS --- */}
              {/* Layer 1: The crisp 1px electric edge */}
              <div className="absolute -inset-[1px] bg-white/60 rounded-sm -z-10 blur-[1px]" />
              {/* Layer 2: The faint backing for depth */}
              <div className="absolute -inset-[3px] bg-white/10 rounded-sm -z-20 blur-sm" />

              {/* --- INNER CONTENT CONTAINER (Clips content) --- */}
              <div className="relative w-full h-full bg-[#0A0A0A] rounded-sm overflow-hidden flex flex-col border border-white/10">
                
                {/* IMAGE AREA (Top 55%) */}
                <div className="relative h-[55%] w-full overflow-hidden bg-zinc-900 group">
                  {p.image ? (
                    <img
                      src={p.image.src}
                      alt={p.image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <Sparkles className="w-12 h-12 text-white/10" />
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                </div>

                {/* TEXT AREA (Bottom 45%) */}
                <div className="relative h-[45%] p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 
                        style={{ fontFamily: "var(--font-clash-display)" }}
                        className="text-2xl font-medium text-white"
                      >
                        {p.title}
                      </h3>
                      <span className="font-mono text-xs text-white/20">0{i + 1}</span>
                    </div>
                    
                    <p 
                      style={{ fontFamily: "var(--font-poppins)" }}
                      className="text-sm text-zinc-400 font-light leading-relaxed line-clamp-3"
                    >
                      {p.body}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-white/40 uppercase tracking-widest mt-auto">
                     <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}