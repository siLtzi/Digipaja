"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GalleryItem = {
  type: "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
};

type Service = {
  title: string;
  body: string;
  slug?: string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  videoUrl?: string;
  gallery?: GalleryItem[];
};

type ServicesProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  services?: Service[];
  locale?: "fi" | "en";
};

export default function ServicesContent({
  eyebrow,
  title,
  subtitle,
  services = [],
  locale = "fi",
}: ServicesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const prefersReducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      )?.matches;
      
      const section = sectionRef.current;
      if (!section) return;

      // Always ensure elements are visible first (prevents flash of invisible content)
      gsap.set(".laser-beam", { scaleX: 1, opacity: 1 });
      gsap.set("[data-header-eyebrow], [data-header-title], [data-header-subtitle]", { opacity: 1, y: 0, x: 0 });
      gsap.set("[data-service-card]", { opacity: 1, y: 0 });

      if (prefersReducedMotion) return;

      // Check if we're on actual mobile (not just narrow viewport)
      const isMobile = window.innerWidth < 768 || 
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

      // On mobile, keep elements visible without animation
      if (isMobile) return;

      // Reset for animation on desktop
      gsap.set(".laser-beam", { scaleX: 0, opacity: 0 });
      gsap.set("[data-header-eyebrow]", { opacity: 0, y: 20 });
      gsap.set("[data-header-title]", { opacity: 0, y: 30 });
      gsap.set("[data-header-subtitle]", { opacity: 0, x: -20 });
      gsap.set("[data-service-card]", { opacity: 0, y: 40 });

      // Laser beam animation
      const laserTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      laserTl.to(
        ".laser-beam:nth-child(1)",
        { scaleX: 1, opacity: 0.4, duration: 0.3, ease: "expo.out" }
      )
      .to(
        ".laser-beam:nth-child(2)",
        { scaleX: 1, opacity: 1, duration: 0.3, ease: "expo.out" },
        "-=0.25"
      )
      .to(
        ".laser-beam:nth-child(3)",
        { scaleX: 1, opacity: 0.9, duration: 0.3, ease: "expo.out" },
        "-=0.25"
      );

      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      headerTl
        .to("[data-header-eyebrow]", {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
        })
        .to(
          "[data-header-title]",
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.15"
        )
        .to(
          "[data-header-subtitle]",
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.2"
        );

      // Cards stagger animation - single ScrollTrigger for all cards
      gsap.to("[data-service-card]", {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: "power3.out",
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef, dependencies: [services.length] }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 lg:py-32 bg-[#050609] text-zinc-100 overflow-hidden"
    >


      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] opacity-50" />

      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 scale-x-0" />
      </div>

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,60,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <div
            data-header-eyebrow
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff8a3c] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff8a3c]" />
            </span>
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-xs uppercase tracking-[0.25em] text-[#ff8a3c]"
            >
              {eyebrow}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <h2
              data-header-title
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {title}
            </h2>

            <div data-header-subtitle className="relative lg:pt-2">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff8a3c] via-[#ff8a3c]/30 to-transparent hidden lg:block" />
              <p className="lg:pl-8 text-base text-zinc-300 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {services.map((service, idx) => (
            <ServiceCard 
              key={service.slug ?? `${service.title}-${idx}`}
              service={service}
              idx={idx}
              locale={locale}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/services`}
            style={{ fontFamily: "var(--font-goldman)" }}
            className="group relative isolate inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)]"
          >
            <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            <span className="relative z-10">{locale === "fi" ? "Katso kaikki palvelut" : "View all services"}</span>
            <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none"><path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

// Separate component for service card with gallery support
function ServiceCard({ service, idx, locale }: { service: Service; idx: number; locale: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  // Get all media from gallery or single image/video - more permissive matching
  const allMedia = React.useMemo(() => {
    const media: { type: "image" | "video"; url: string }[] = [];
    
    // Add gallery items first (handle both image and video types)
    if (service.gallery && Array.isArray(service.gallery) && service.gallery.length > 0) {
      service.gallery.forEach(item => {
        // Check for image
        if (item.imageUrl) {
          media.push({ type: "image", url: item.imageUrl });
        }
        // Check for video
        if (item.videoUrl) {
          media.push({ type: "video", url: item.videoUrl });
        }
      });
    }
    
    // Add main image if exists and not already included
    if (service.imageUrl && !media.some(m => m.url === service.imageUrl)) {
      media.unshift({ type: "image", url: service.imageUrl });
    }
    
    // Add main video if exists and not already included
    if (service.videoUrl && !media.some(m => m.url === service.videoUrl)) {
      media.unshift({ type: "video", url: service.videoUrl });
    }
    
    return media;
  }, [service.gallery, service.imageUrl, service.videoUrl]);
  
  // Filter just images for cycling
  const allImages = allMedia.filter(m => m.type === "image").map(m => m.url);
  
  // Cycle through images for gallery
  useEffect(() => {
    if (allImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % allImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [allImages.length]);

  // Special animation for "tekninen-toteutus" - scrolling code effect
  const isCodeCard = service.slug === "tekninen-toteutus";
  
  // Check if has media - use allMedia array which includes gallery items
  const hasVideo = !!service.videoUrl || allMedia.some(m => m.type === "video");
  const firstVideo = service.videoUrl || allMedia.find(m => m.type === "video")?.url;
  const hasImages = allImages.length > 0;
  const hasMedia = hasVideo || hasImages;

  return (
    <Link
      ref={cardRef}
      href={`/${locale}/services`}
      data-service-card={idx}
      className="group relative block rounded-lg rounded-br-none border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 lg:p-8 transition-all duration-500 hover:border-[#ff8a3c]/20 overflow-hidden"
    >
      {/* Full card background media */}
      {hasMedia && (
        <div className="absolute inset-0 z-0">
          {hasVideo && firstVideo ? (
            <video
              src={firstVideo}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
            />
          ) : isCodeCard && allImages[0] ? (
            // Special 3D scrolling animation for code image - "gliding over code"
            <div className="absolute inset-0 overflow-hidden" style={{ perspective: "600px" }}>
              <div 
                className="absolute inset-x-[-30%] h-[400%] animate-scroll-code"
                style={{
                  transform: "rotateX(55deg)",
                  transformOrigin: "center 15%",
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={allImages[0]}
                  alt={service.title}
                  fill
                  className="object-cover object-top transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Light vignette only at very edges for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#050609]/40 via-transparent to-[#050609]/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050609]/30 via-transparent to-[#050609]/30" />
            </div>
          ) : (
            // Regular image or gallery
            <>
              {allImages.map((img, i) => (
                <Image
                  key={img}
                  src={img}
                  alt={service.title}
                  fill
                  className={`object-cover transition-all duration-1000 ${
                    i === currentImageIndex 
                      ? "opacity-40 group-hover:opacity-55" 
                      : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0 && idx < 2}
                />
              ))}
            </>
          )}
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050609] via-[#050609]/70 to-[#050609]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050609]/30 to-transparent" />
        </div>
      )}

      {/* Hover glow effect from corner */}
      <div className="absolute inset-0 rounded-lg rounded-br-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,138,60,0.12)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]" />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff8a3c]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Number & Title Row */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <span
            data-card-number
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ff8a3c]/15 leading-none select-none transition-colors duration-300 shrink-0"
          >
            {String(idx + 1).padStart(2, "0")}
          </span>
          
          <div className="flex-1 pt-2 min-w-0">
            <h3
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-base sm:text-xl lg:text-2xl font-bold text-white uppercase tracking-wide group-hover:text-[#ff8a3c] transition-colors duration-300"
            >
              {service.title.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {word}
                  {i < arr.length - 1 && (
                    <><span className="hidden sm:inline"> </span><br className="sm:hidden" /></>
                  )}
                </span>
              ))}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm lg:text-base text-zinc-300 leading-relaxed mb-4">
          {service.body}
        </p>

      </div>

      {/* Gallery dots indicator */}
      {allImages.length > 1 && !isCodeCard && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {allImages.map((_, i) => (
            <div 
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentImageIndex 
                  ? "bg-[#ff8a3c] w-4" 
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      {/* Corner arrow indicator - sharp corner lights up on hover */}
      <div className="absolute bottom-0 right-0 w-20 h-20 overflow-visible pointer-events-none z-[2]">
        {/* Vertical line */}
        <div className="absolute bottom-0 right-0 w-[2px] h-6 bg-gradient-to-t from-[#ff8a3c]/20 to-transparent transition-all duration-500 group-hover:h-16 group-hover:from-[#ff8a3c] group-hover:shadow-[0_0_12px_rgba(255,138,60,0.8)]" />
        {/* Horizontal line */}
        <div className="absolute bottom-0 right-0 h-[2px] w-6 bg-gradient-to-l from-[#ff8a3c]/20 to-transparent transition-all duration-500 group-hover:w-16 group-hover:from-[#ff8a3c] group-hover:shadow-[0_0_12px_rgba(255,138,60,0.8)]" />
      </div>
    </Link>
  );
}
