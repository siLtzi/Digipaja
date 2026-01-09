"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectGalleryProps = {
  images: string[];
  projectTitle: string;
  title: string;
};

export default function ProjectGallery({ images, projectTitle, title }: ProjectGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !images || images.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate laser beam - fast
      gsap.fromTo(
        ".gallery-laser",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate header - immediate
      gsap.fromTo(
        ".gallery-header",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate gallery items - fast with minimal stagger
      gsap.fromTo(
        ".gallery-item",
        { 
          opacity: 0, 
          y: 20,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden">
      {/* Laser beam separator at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="gallery-laser h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40 scale-x-0" />
        <div className="gallery-laser absolute h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] scale-x-0" />
        <div className="gallery-laser absolute h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90 scale-x-0" />
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header with eyebrow */}
        <div className="gallery-header mb-10 flex flex-col items-start">
          <span
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold mb-4"
          >
            [ Gallery ]
          </span>
          <h2
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-2xl sm:text-3xl font-bold text-white"
          >
            {title}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item group relative overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0c] transition-all duration-500 hover:border-[#ff8a3c]/30 hover:shadow-[0_0_30px_-10px_rgba(255,138,60,0.2)]"
            >
              {/* Corner decorations */}
              <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c]" />
                <div className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-[#ff8a3c]" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-[#ff8a3c]" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-[#ff8a3c]" />
              </div>

              {/* Image number */}
              <span className="absolute top-3 left-3 z-20 text-xs font-bold text-white/50 group-hover:text-[#ff8a3c] transition-colors">
                0{index + 1}
              </span>

              <Image
                src={image}
                alt={`${projectTitle} screenshot ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
