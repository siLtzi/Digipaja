"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = {
  label: string;
  title: string;
  body: string;
  image: string;
};

export default function ProcessContent({
  eyebrow,
  title,
  subtitle,
  steps,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: Step[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const items = gsap.utils.toArray<HTMLElement>(".process-step");
      
      const scrollDistance = track.offsetHeight - window.innerHeight + 200; 

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance + 200}`, 
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
             const idx = Math.min(
               steps.length - 1,
               Math.floor(self.progress * steps.length)
             );
             setActiveStep(idx);
          }
        },
      });

      tl.to(track, { y: -scrollDistance, ease: "none" }, 0);
      tl.to(lineRef.current, { height: "100%", ease: "none" }, 0);
      
      items.forEach((item) => {
         const img = item.querySelector("img");
         if(img) tl.to(img, { y: "15%", ease: "none" }, 0);
      });

    }, containerRef);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden flex flex-col bg-transparent">
      
      {/* REMOVED: Global Ambient Glow */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 h-full">
        
        {/* --- LEFT COLUMN --- */}
        <div className="hidden lg:flex lg:col-span-4 flex-col justify-center h-full">
           <div className="space-y-8">
              {/* Eyebrow: Poppins */}
              <span 
                style={{ fontFamily: "var(--font-poppins)" }}
                className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 block"
              >
                  {eyebrow}
              </span>
              
              {/* Title: Clash Display */}
              <h2 
                style={{ fontFamily: "var(--font-clash-display)" }}
                className="text-5xl md:text-6xl font-semibold text-white tracking-wide"
              >
                  {title}
              </h2>
              
              {/* Subtitle: Poppins */}
              <p 
                style={{ fontFamily: "var(--font-poppins)" }}
                className="text-zinc-400 leading-relaxed text-lg font-light max-w-sm"
              >
                  {subtitle}
              </p>
           </div>
           
           {/* Counter: Clash Display */}
           <div className="mt-20 flex items-end gap-3 text-zinc-600">
              <span 
                style={{ fontFamily: "var(--font-clash-display)" }}
                className="text-7xl text-white font-medium leading-none"
              >
                0{activeStep + 1}
              </span>
              <span 
                style={{ fontFamily: "var(--font-clash-display)" }}
                className="text-2xl mb-1"
              >
                / 0{steps.length}
              </span>
           </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="lg:col-span-8 relative h-full overflow-hidden">
          <div ref={trackRef} className="absolute top-[20vh] left-0 w-full pb-[50vh]">
              
              <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/10" />
              <div 
                ref={lineRef}
                className="absolute left-6 md:left-12 top-0 w-[1px] bg-gradient-to-b from-white via-white/50 to-transparent z-10 h-0"
              />

              <div className="space-y-32">
                 {steps.map((step, i) => {
                    const isActive = i === activeStep;
                    return (
                       <div 
                         key={i} 
                         className={`process-step relative flex items-start gap-8 md:gap-16 transition-all duration-700 
                           ${isActive ? "opacity-100 translate-x-0" : "opacity-30 translate-x-4 blur-[2px]"}`}
                       >
                          {/* Node Dot */}
                          <div className="mt-10 relative z-20 flex-shrink-0 ml-[20px] md:ml-[44px]">
                             <div className={`h-2 w-2 rounded-full transition-all duration-500 
                                ${isActive ? "bg-white scale-150 shadow-[0_0_20px_rgba(255,255,255,0.5)]" : "bg-zinc-800"}`} 
                             />
                          </div>

                          {/* Card Wrapper */}
                          <div className="relative w-full group">
                             
                             {/* --- NEW SHARP "HALO" LAYERS --- */}
                             {/* These sit behind the card. Since the parent div fades opacity, these will fade too. */}
                             <div className="absolute -inset-[1px] bg-white/60 rounded-sm -z-10 blur-[1px]" />
                             <div className="absolute -inset-[3px] bg-white/10 rounded-sm -z-20 blur-sm" />

                             <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#0A0A0A] shadow-2xl transition-colors duration-500">
                                
                                {/* Image Area */}
                                <div className="relative h-48 md:h-72 w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                                   {step.image ? (
                                      <Image 
                                        src={step.image} 
                                        alt={step.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 ease-out scale-105"
                                      />
                                   ) : (
                                      <div className="w-full h-full bg-white/5" />
                                   )}
                                   <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                                </div>

                                {/* Text Area */}
                                <div className="p-8">
                                   <div className="flex items-center gap-3 mb-4">
                                      {/* Badge: Poppins */}
                                      <span 
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded-sm"
                                      >
                                         {step.label}
                                      </span>
                                   </div>
                                   
                                   {/* Card Title: Clash Display */}
                                   <h3 
                                     style={{ fontFamily: "var(--font-clash-display)" }}
                                     className="text-2xl font-medium text-white mb-3"
                                   >
                                      {step.title}
                                   </h3>
                                   
                                   {/* Card Body: Poppins */}
                                   <p 
                                     style={{ fontFamily: "var(--font-poppins)" }}
                                     className="text-sm text-zinc-400 font-light leading-relaxed max-w-lg"
                                   >
                                      {step.body}
                                   </p>
                                </div>
                             </div>
                          </div>
                       </div>
                    );
                 })}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}