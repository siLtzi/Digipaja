"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "fi";

  const goldmanStyle = { fontFamily: "var(--font-goldman)" } as const;

  const content = locale === "en" ? {
    title: "404",
    subtitle: "Page Not Found",
    description: "The page you're looking for has been moved, deleted, or never existed.",
    homeButton: "Back to Home",
    contactButton: "Contact Us",
  } : {
    title: "404",
    subtitle: "Sivua ei löytynyt",
    description: "Etsimääsi sivua on siirretty, poistettu tai sitä ei ole koskaan ollut olemassa.",
    homeButton: "Takaisin etusivulle",
    contactButton: "Ota yhteyttä",
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".glitch-number",
      { opacity: 0, scale: 0.8, rotationY: 45 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 0.8, ease: "back.out(1.7)" }
    )
    .fromTo(
      ".error-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      "-=0.4"
    )
    .fromTo(
      ".error-button",
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
      "-=0.3"
    );

    // Glitch effect on 404 number
    const glitchInterval = setInterval(() => {
      gsap.to(".glitch-number", {
        x: gsap.utils.random(-3, 3),
        y: gsap.utils.random(-3, 3),
        duration: 0.05,
        repeat: 3,
        yoyo: true,
        onComplete: () => {
          gsap.set(".glitch-number", { x: 0, y: 0 });
        }
      });
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#08090C] px-6 py-24"
    >
      {/* Background grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090C] via-transparent to-[#08090C]" />
      </div>

      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(255,138,60,0.2) 0%, rgba(255,138,60,0.05) 50%, transparent 70%)",
        }}
      />

      {/* Laser lines */}
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-40" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl">
        {/* 404 Number */}
        <div
          className="glitch-number mb-8 text-[clamp(120px,20vw,200px)] font-bold leading-none tracking-tighter opacity-0"
          style={{
            ...goldmanStyle,
            color: "#ff8a3c",
            textShadow: "0 0 30px rgba(255,138,60,0.5), 0 0 60px rgba(255,138,60,0.3)",
          }}
        >
          {content.title}
        </div>

        {/* Error message */}
        <h1
          className="error-text mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white opacity-0"
          style={goldmanStyle}
        >
          {content.subtitle}
        </h1>

        <p className="error-text mb-12 max-w-md text-base sm:text-lg text-zinc-400 opacity-0">
          {content.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href={`/${locale}`}
            className="error-button group relative isolate flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] opacity-0"
            style={goldmanStyle}
          >
            <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            <span className="relative z-10">{content.homeButton}</span>
            <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link
            href={`/${locale}/yhteydenotto`}
            className="error-button group flex items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-sm transition-all hover:border-[#ff8a3c]/50 hover:bg-white/10 hover:text-white opacity-0"
            style={goldmanStyle}
          >
            <span>{content.contactButton}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
