"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Sparkles, ArrowRight } from "lucide-react"; 
import Link from "next/link"; 

type ServiceItem = {
  label: string;
  title: string;
  body: string;
  href: string;
  image?: {
    src: string;
    alt: string;
  };
};

export default function ServicesContent({
  eyebrow = "Our Expertise",
  title = "Digital Engineering",
  subtitle = "We craft bespoke solutions that scale with your vision.",
  services,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  services: ServiceItem[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!services || services.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Content & Button Animation
      gsap.fromTo(
        ".active-content",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );

      // 2. Image Animation
      gsap.fromTo(
        ".service-image",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeIdx]);

  const activeService = services[activeIdx];
  if (!activeService) return null;

  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-transparent">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* --- LEFT COLUMN: Sticky Visual & Button --- */}
          <div
            className="relative hidden lg:flex flex-col justify-center min-h-[600px] sticky top-32"
            ref={contentRef}
          >
            {/* IMAGE AREA */}
            <div className="mb-10 w-full relative z-0">
              
              {/* --- NEW SHARP "HALO" BORDER --- */}
              {/* This sits 1px behind the image, creating a razor-sharp light edge */}
              <div className="absolute -inset-[1px] bg-white/60 rounded-sm -z-10 blur-[1px]" />
              
              {/* A second, slightly wider layer for depth (optional, keeps it premium) */}
              <div className="absolute -inset-[3px] bg-white/10 rounded-sm -z-20 blur-sm" />

              {activeService.image?.src ? (
                // Added 'border border-white/10' for extra definition
                <div className="service-image relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-white/10 bg-zinc-900">
                  <img 
                    src={activeService.image.src} 
                    alt={activeService.image.alt || activeService.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay for cinematic look */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                </div>
              ) : (
                <div className="service-image flex items-center justify-center w-full aspect-[16/10] bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm">
                  <Sparkles className="w-8 h-8 text-white/20" />
                </div>
              )}
            </div>

            {/* TEXT CONTENT & BUTTON */}
            <div className="relative z-10 flex flex-col items-start">
              <h2 
                style={{ fontFamily: "var(--font-clash-display)" }}
                className="active-content text-4xl md:text-5xl font-semibold text-white tracking-wide mb-6"
              >
                {activeService.title}
              </h2>

              <p 
                style={{ fontFamily: "var(--font-poppins)" }}
                className="active-content text-lg text-zinc-400 leading-relaxed max-w-md font-light mb-8"
              >
                {activeService.body}
              </p>

              {/* --- KINETIC CURTAIN BUTTON --- */}
              <Link 
                 href={activeService.href}
                 className="active-content group relative flex items-center gap-3 px-6 py-3 overflow-hidden rounded-sm bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10"
              >
                {/* 1. The Curtain (Background Fill) */}
                <div className="absolute inset-0 translate-y-[100%] bg-zinc-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0" />

                {/* 2. The Text (Two Layers for sliding effect) */}
                <div className="relative h-5 w-24 overflow-hidden">
                    {/* Layer 1: Exits Up */}
                    <span 
                        style={{ fontFamily: "var(--font-clash-display)" }}
                        className="absolute inset-0 flex items-center text-sm font-medium uppercase tracking-widest text-zinc-300 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full"
                    >
                        Read More
                    </span>
                    {/* Layer 2: Enters from Bottom (Dark Text) */}
                    <span 
                        style={{ fontFamily: "var(--font-clash-display)" }}
                        className="absolute inset-0 flex items-center text-sm font-medium uppercase tracking-widest text-zinc-900 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0"
                    >
                        Read More
                    </span>
                </div>

                {/* 3. The Arrow (Infinite Loop Effect) */}
                <div className="relative z-10 overflow-hidden w-4 h-4">
                    {/* Arrow 1: Flies out to Right */}
                    <ArrowRight className="absolute inset-0 w-4 h-4 text-zinc-500 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[150%] group-hover:text-zinc-900" />
                    
                    {/* Arrow 2: Flies in from Left */}
                    <ArrowRight className="absolute inset-0 w-4 h-4 text-zinc-900 -translate-x-[150%] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0" />
                </div>
              </Link>
            </div>
          </div>

          {/* --- RIGHT COLUMN: The List --- */}
          <div className="flex flex-col pt-10">
            {/* Header */}
            <div className="mb-16 lg:mb-24">
              <span 
                style={{ fontFamily: "var(--font-poppins)" }}
                className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-4 block"
              >
                {eyebrow}
              </span>
              <h2 
                style={{ fontFamily: "var(--font-clash-display)" }}
                className="text-3xl md:text-4xl font-semibold text-white mb-6"
              >
                {title}
              </h2>
              <p 
                style={{ fontFamily: "var(--font-poppins)" }}
                className="text-zinc-400 max-w-md font-light"
              >
                {subtitle}
              </p>
            </div>

            {/* LIST ITEMS */}
            <div className="relative border-l border-white/10 pl-8 space-y-12">
              {services.map((service, idx) => {
                const isActive = activeIdx === idx;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="group relative block cursor-pointer"
                  >
                    {/* Active Indicator Line */}
                    <div 
                      className={`absolute -left-[33px] top-1 w-[2px] transition-all duration-500 ease-out
                        ${isActive ? `bg-white h-8` : "bg-transparent h-0"}
                      `}
                    />

                    <div className="flex flex-col gap-2">
                      <h3
                        style={{ fontFamily: "var(--font-clash-display)" }}
                        className={`text-2xl transition-colors duration-500
                          ${isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"}
                        `}
                      >
                        {service.title}
                      </h3>
                      
                      <p
                        style={{ fontFamily: "var(--font-poppins)" }}
                        className={`text-sm leading-relaxed text-zinc-400 lg:hidden font-light transition-all duration-500 overflow-hidden ${
                          isActive ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}
                      >
                        {service.body}
                      </p>
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