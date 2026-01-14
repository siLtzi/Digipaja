"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const techIcons: Record<string, string> = {
  animaatiot: "/tech/gsap.svg",
  nextjs: "/tech/nextjs.svg",
  monikielisyys: "/tech/monikielisyys.svg",
  tailwind: "/tech/tailwind.svg",
  typescript: "/tech/typescript.svg",
  sanity: "/tech/sanity.svg",
  node: "/tech/node.svg",
  vercel: "/tech/vercel.svg",
};

export default function TechTicker({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.to(".tech-item", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.06,
        ease: "elastic.out(1, 0.75)",
        delay: 0.3,
      });
    },
    { scope: containerRef }
  );

  const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    const icon = target.querySelector("img");
    const shimmer = target.querySelector(".shimmer-effect");

    gsap.to(target, {
      scale: 1.05,
      boxShadow: "0 0 25px -5px rgba(217, 70, 239, 0.6)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      backgroundColor: "rgba(24, 24, 27, 0.8)",
      duration: 0.3,
      ease: "power2.out",
    });

    if (icon) {
      gsap.to(icon, {
        scale: 1.2,
        rotation: 15,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }

    if (shimmer) {
        gsap.fromTo(shimmer, 
            { xPercent: -100, opacity: 1 },
            { xPercent: 100, duration: 0.6, ease: "power2.inOut" }
        );
    }
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    const icon = target.querySelector("img");
    const shimmer = target.querySelector(".shimmer-effect");

    gsap.to(target, {
      scale: 1,
      boxShadow: "none",
      borderColor: "rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(24, 24, 27, 0.4)",
      duration: 0.3,
    });

    if (icon) {
      gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
    }
    
    if (shimmer) {
        gsap.to(shimmer, { opacity: 0, duration: 0.2 });
    }
  });

  if (!text) return null;

  const words = text.split(/(\s+)/);

  return (
    <div
      ref={containerRef}
      className="pt-8 flex flex-wrap items-center gap-y-3 gap-x-2 text-sm sm:text-base text-zinc-400 [perspective:1000px]"
    >
      {words.map((word, i) => {
        const clean = word.toLowerCase().replace(/[^a-zäöå]/g, "");
        const iconPath = techIcons[clean];

        if (iconPath) {
          return (
            <span
              key={i}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="
                tech-item group relative inline-flex items-center gap-2 overflow-hidden rounded-full 
                bg-zinc-900/40 px-4 py-1.5 font-medium uppercase tracking-widest text-zinc-300 
                border border-white/10 backdrop-blur-md cursor-default select-none will-change-transform
                opacity-0 translate-y-4
              "
            >
              {/* The Shimmer Effect Layer */}
              <span className="shimmer-effect absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent will-change-transform" />
              
              <img
                src={iconPath}
                alt={clean}
                className="relative z-10 h-4 w-4 object-contain will-change-transform"
              />
              <span className="relative z-10 text-[10px] sm:text-[11px]">
                {word}
              </span>
            </span>
          );
        }

        if (!word.trim()) return <span key={i} className="whitespace-pre">{word}</span>;
        
        return (
          <span key={i} className="tech-item inline-block font-medium tracking-wide opacity-0 translate-y-4">
            {word}
          </span>
        );
      })}
    </div>
  );
}