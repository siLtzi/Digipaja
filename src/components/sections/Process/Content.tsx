"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Step = {
  title: string;
  description: string;
  icon?: string;
};

type ProcessProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: Step[];
};

// Helper to get icon path
const getIconPath = (iconName: string | undefined, index: number) => {
  // Default mapping based on the order of steps
  const defaultIcons = ["chat", "plan2", "code", "launch"];
  // Use the provided icon name, or fallback to the default based on index
  const name = iconName || defaultIcons[index] || "code"; 
  return `/icons/${name}.svg`;
};

export default function ProcessContent({
  eyebrow,
  title,
  subtitle,
  steps,
}: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current) return;

      const stepsElements = gsap.utils.toArray<HTMLElement>(".process-step");

      // ENTRANCE ANIMATIONS
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      // Laser beam animation
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
      )
      .fromTo(
        ".process-eyebrow",
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" }
      )
      .fromTo(
        ".process-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
        "-=0.15"
      )
      .fromTo(
        ".process-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
        "-=0.2"
      );

      // 1. LINE FILL ANIMATION - Smoother
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      // 2. ACTIVATE STEPS - Enhanced animations
      stepsElements.forEach((step, index) => {
        const marker = step.querySelector(".step-marker");
        const text = step.querySelector(".step-text");
        const icon = step.querySelector(".step-icon");
        const card = step.querySelector(".step-card");
        const number = step.querySelector(".step-number");

        ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            // Marker glows
            gsap.to(marker, {
              backgroundColor: "#ff8a3c",
              boxShadow: "0 0 25px rgba(255,138,60,0.7), 0 0 40px rgba(255,138,60,0.3)",
              scale: 1.3,
              duration: 0.5,
              ease: "back.out(2)",
            });
            // Card activates
            gsap.to(card, {
              borderColor: "rgba(255,138,60,0.2)",
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out"
            });
            // Text fully visible
            gsap.to(text, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });
            // Number highlights
            gsap.to(number, {
              color: "#ff8a3c",
              scale: 1.1,
              duration: 0.5,
              ease: "back.out(2)"
            });
            // Icon pops in
            gsap.to(icon, {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
            });
          },
          onLeaveBack: () => {
            // Reset marker
            gsap.to(marker, {
              backgroundColor: "#1a1c23",
              boxShadow: "none",
              scale: 1,
              duration: 0.4,
            });
            // Reset card
            gsap.to(card, {
              borderColor: "rgba(255,255,255,0.05)",
              scale: 1,
              duration: 0.3,
            });
            // Dim text
            gsap.to(text, { opacity: 0.4, x: 0, duration: 0.4 });
            // Reset number
            gsap.to(number, {
              color: "#27272a",
              scale: 1,
              duration: 0.4,
            });
            // Dim icon
            gsap.to(icon, {
              scale: 0.85,
              opacity: 0.3,
              rotation: -10,
              duration: 0.4,
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 scale-x-0" />
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#ff8a3c]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          
          {/* === LEFT: STICKY HEADER === */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="process-eyebrow inline-flex items-center gap-3">
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
                style={{ fontFamily: "var(--font-goldman)" }}
                className="process-title text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.2rem]"
              >
                {title}
              </h2>

              <div className="process-subtitle relative border-l-2 border-[#ff8a3c]/30 pl-6">
                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#ff8a3c] to-transparent opacity-50" />
                <p className="max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* === RIGHT: TIMELINE === */}
          <div className="lg:col-span-7" ref={containerRef}>
            <div className="relative pl-8 sm:pl-12">
              
              {/* TIMELINE LINES - Enhanced */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-900" />
              
              {/* Active line with glow */}
              <div 
                ref={lineRef}
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-[#ff8a3c] via-[#ff8a3c] to-[#ffb347]"
                style={{
                  boxShadow: "0 0 10px rgba(255,138,60,0.5), 0 0 20px rgba(255,138,60,0.2)"
                }}
              />

              {/* STEPS */}
              <div className="flex flex-col gap-16 py-12">
                {steps.map((step, index) => (
                  <div key={index} className="process-step group relative">
                    
                    {/* Enhanced marker */}
                    <div 
                      className="step-marker absolute -left-[39px] sm:-left-[55px] top-4 h-5 w-5 rounded-full border-4 border-[#050609] bg-[#1a1c23] transition-all duration-500 will-change-transform z-10"
                    >
                      <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white/30" />
                    </div>

                    {/* Card Container with hover effect */}
                    <div className="step-card relative rounded-lg border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:p-8 transition-all duration-300 hover:border-[#ff8a3c]/20 hover:scale-[1.02]">
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,rgba(255,138,60,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Top border glow */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Corner accent - matching Services style */}
                      <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-gradient-to-t from-[#ff8a3c]/40 to-transparent transition-all duration-300 group-hover:h-10 group-hover:from-[#ff8a3c]/60" />
                        <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-gradient-to-l from-[#ff8a3c]/40 to-transparent transition-all duration-300 group-hover:w-10 group-hover:from-[#ff8a3c]/60" />
                      </div>
                      
                      <div className="step-text relative opacity-40 transition-all duration-500">
                        
                        <div className="flex items-center gap-5 mb-6">
                          {/* Enhanced number */}
                          <span 
                             style={{ fontFamily: "var(--font-goldman)" }}
                             className="step-number block text-5xl font-bold text-zinc-800 transition-all duration-500 will-change-transform sm:text-6xl"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          
                          {/* Enhanced icon container */}
                          <div className="step-icon relative h-10 w-10 opacity-30 transition-all duration-700 will-change-transform sm:h-12 sm:w-12 group-hover:scale-110">
                             <div className="absolute inset-0 rounded-lg bg-[#ff8a3c]/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                             <Image 
                                src={getIconPath(step.icon, index)}
                                alt={step.title}
                                fill
                                className="object-contain transition-all duration-700 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(255,138,60,0.4)]"
                             />
                          </div>
                        </div>
                        
                        <h3 
                          style={{ fontFamily: "var(--font-goldman)" }}
                          className="mb-4 text-2xl font-bold text-white transition-colors duration-500 group-hover:text-[#ff8a3c]/90 sm:text-3xl"
                        >
                          {step.title}
                        </h3>
                        
                        <p className="max-w-lg text-base leading-relaxed text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300">
                          {step.description}
                        </p>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}