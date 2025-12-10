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

      // 1. LINE FILL ANIMATION
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
            scrub: 0.5,
          },
        }
      );

      // 2. ACTIVATE STEPS
      stepsElements.forEach((step) => {
        const marker = step.querySelector(".step-marker");
        const text = step.querySelector(".step-text");
        const icon = step.querySelector(".step-icon");

        ScrollTrigger.create({
          trigger: step,
          start: "top center", // Activates when step hits center of viewport
          end: "bottom center",
          onEnter: () => {
            // Marker glows orange
            gsap.to(marker, {
              backgroundColor: "#ff8a3c",
              boxShadow: "0 0 20px rgba(255,138,60,0.6)",
              scale: 1.2,
              duration: 0.3,
            });
            // Text becomes fully visible
            gsap.to(text, { opacity: 1, x: 0, duration: 0.4 });
            // Icon pops in (Full Opacity, Scale 1)
            gsap.to(icon, { 
                scale: 1, 
                opacity: 1, 
                duration: 0.4, 
                ease: "back.out(1.7)" 
            });
          },
          onLeaveBack: () => {
            // Reset marker
            gsap.to(marker, {
              backgroundColor: "#1a1c23",
              boxShadow: "none",
              scale: 1,
              duration: 0.3,
            });
            // Dim text
            gsap.to(text, { opacity: 0.5, x: 0, duration: 0.4 });
            // Dim icon (Opacity 0.5, Scale 0.8)
            gsap.to(icon, { 
                scale: 0.8, 
                opacity: 0.5, 
                duration: 0.4 
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
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#ff8a3c]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          
          {/* === LEFT: STICKY HEADER === */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="inline-flex items-center gap-3">
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
                className="text-balance text-4xl font-bold leading-none text-white sm:text-5xl"
              >
                {title}
              </h2>

              <div className="relative border-l-2 border-zinc-800 pl-6">
                <p className="max-w-xl text-base text-zinc-400 sm:text-lg">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* === RIGHT: TIMELINE === */}
          <div className="lg:col-span-7" ref={containerRef}>
            <div className="relative pl-8 sm:pl-12">
              
              {/* TIMELINE LINES */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-800" />
              
              <div 
                ref={lineRef}
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-[#ff8a3c] to-[#ffb347]" 
              />

              {/* STEPS */}
              <div className="flex flex-col gap-20 py-12">
                {steps.map((step, index) => (
                  <div key={index} className="process-step relative">
                    
                    {/* The Dot on the line */}
                    <div 
                      className="step-marker absolute -left-[39px] sm:-left-[55px] top-2 h-5 w-5 rounded-full border-4 border-[#050609] bg-[#1a1c23] transition-colors"
                    >
                      <div className="absolute inset-0 m-auto h-1 w-1 rounded-full bg-white/20" />
                    </div>

                    {/* Content Card */}
                    <div className="step-text opacity-50 transition-opacity">
                      
                      <div className="flex items-center gap-4 mb-4">
                        <span 
                           style={{ fontFamily: "var(--font-goldman)" }}
                           className="block text-4xl font-bold text-zinc-800"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        
                        {/* ICON CONTAINER */}
                        {/* No color filters applied, just opacity for inactive state */}
                        <div className="step-icon relative h-8 w-8 opacity-50">
                           <Image 
                              src={getIconPath(step.icon, index)}
                              alt={step.title}
                              fill
                              className="object-contain"
                           />
                        </div>
                      </div>
                      
                      <h3 
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="mb-4 text-xl font-bold text-white sm:text-2xl"
                      >
                        {step.title}
                      </h3>
                      
                      <p className="max-w-lg text-base leading-relaxed text-zinc-400">
                        {step.description}
                      </p>
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