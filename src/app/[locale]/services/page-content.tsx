"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: any;
  icon?: string;
  features?: string[];
  benefits?: string[];
  imageUrl?: string;
  galleryUrls?: string[];
};

type ServicesOverviewProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroVideo?: string;
  services: Service[];
  locale: string;
};

const iconComponents: Record<string, React.ReactElement> = {
  website: (
    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  ecommerce: (
    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  seo: (
    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
  ),
  technical: (
    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  code: (
    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  rocket: (
    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

function ScrollingImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    const img = containerRef.current.querySelector("img");
    if (!img) return;

    // Animate object-position to scroll the image from top to bottom
    gsap.fromTo(img, 
      { objectPosition: "50% 0%" },
      { 
        objectPosition: "50% 100%", 
        duration: 20, 
        ease: "linear", 
        repeat: -1, 
        yoyo: true,
        repeatDelay: 2
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden rounded bg-[#0a0a0a]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
}

function ServiceGallery({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Animate the incoming image
    const currentImage = containerRef.current.querySelector(`[data-index="${currentIndex}"]`);
    if (currentImage) {
      // Reset z-index for all
      const allImages = containerRef.current.querySelectorAll('[data-index]');
      allImages.forEach((img) => {
        if (img !== currentImage) {
          gsap.set(img, { zIndex: 0 });
        }
      });
      
      gsap.set(currentImage, { zIndex: 10, opacity: 0, scale: 1.1 });
      gsap.to(currentImage, { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: "power2.out" 
      });
    }
  }, { dependencies: [currentIndex], scope: containerRef });

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden rounded bg-black">
      {images.map((src, index) => (
        <div 
          key={src}
          data-index={index}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={`${title} - Image ${index + 1}`}
            fill
            className="object-cover object-top"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ))}
      
      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-[#ff8a3c]" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ServicesOverviewContent({
  eyebrow,
  title,
  subtitle,
  heroVideo,
  services,
  locale,
}: ServicesOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero parallax background effect
    gsap.to(".hero-bg", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      y: 150,
      ease: "none",
    });

    // Header animation with SplitText
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    if (headerRef.current) {
      const eyebrowEl = headerRef.current.querySelector(".eyebrow");
      const titleEl = headerRef.current.querySelector("h1");
      const subtitleEl = headerRef.current.querySelector("p");

      tl.from(eyebrowEl, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });

      // SplitText for title - character animation
      if (titleEl) {
        const splitTitle = new SplitText(titleEl, { type: "words,chars" });
        tl.from(splitTitle.chars, {
          opacity: 0,
          y: 30,
          rotateX: -90,
          stagger: 0.02,
          duration: 0.6,
          ease: "back.out(1.7)",
        }, "-=0.4");
      }

      // SplitText for subtitle - word animation
      if (subtitleEl) {
        const splitSubtitle = new SplitText(subtitleEl, { type: "words" });
        tl.from(splitSubtitle.words, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.4");
      }
    }

    // Service cards with parallax and reveals
    const cards = containerRef.current.querySelectorAll(".service-card");
    const mm = gsap.matchMedia();

    cards.forEach((card, index) => {
      const isEven = index % 2 === 0;
      
      // Main card reveal with rotation
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.92,
        rotateX: isEven ? 5 : -5,
        y: 60,
        ease: "power2.out",
      });

      // Parallax on content and image
      const contentDiv = card.querySelector(".service-content");
      const imageDiv = card.querySelector(".service-image");
      const imageInner = imageDiv?.querySelector(".service-image-inner");
      
      // DESKTOP: Complex parallax and side slides
      mm.add("(min-width: 1024px)", () => {
        if (contentDiv) {
          gsap.to(contentDiv, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
            y: isEven ? -30 : 30,
            ease: "none",
          });
        }

        if (imageDiv) {
          // Initial slide-in animation
          gsap.from(imageInner || imageDiv, {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            x: isEven ? 100 : -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });

          // Parallax scroll effect
          gsap.to(imageDiv, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
            y: isEven ? 30 : -30,
            scale: 1.1,
            ease: "none",
          });
        }
      });

      // MOBILE: Simple fade up, no overlap-causing parallax
      mm.add("(max-width: 1023px)", () => {
        if (imageDiv) {
          gsap.from(imageInner || imageDiv, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      });

      // Icon animation
      const icon = card.querySelector(".service-icon");
      if (icon) {
        gsap.from(icon, {
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          scale: 0,
          opacity: 0,
          rotation: -45,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }

      // Service title with SplitText
      const titleEl = card.querySelector("h2");
      if (titleEl) {
        const splitTitle = new SplitText(titleEl, { type: "words,chars" });
        gsap.from(splitTitle.chars, {
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          rotateY: isEven ? 90 : -90,
          stagger: 0.015,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
        });
      }

      // Service description with SplitText
      const descEl = card.querySelector(".service-description");
      if (descEl) {
        const splitDesc = new SplitText(descEl, { type: "lines" });
        gsap.from(splitDesc.lines, {
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: isEven ? -20 : 20,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Features stagger
      const features = card.querySelectorAll(".feature-item");
      if (features.length) {
        gsap.from(features, {
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: isEven ? -30 : 30,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Benefits stagger
      const benefits = card.querySelectorAll(".benefit-item");
      if (benefits.length) {
        gsap.from(benefits, {
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: isEven ? -30 : 30,
          stagger: 0.08,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        });
      }
    });

    // CTA section with SplitText
    const ctaSection = containerRef.current?.querySelector(".cta-section");
    if (ctaSection) {
      gsap.from(ctaSection, {
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.95,
        y: 50,
        ease: "power2.out",
      });

      const ctaTitle = ctaSection.querySelector("h2");
      const ctaText = ctaSection.querySelector("p");

      if (ctaTitle) {
        const splitCtaTitle = new SplitText(ctaTitle, { type: "chars" });
        gsap.from(splitCtaTitle.chars, {
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          scale: 0,
          y: 30,
          rotation: 45,
          stagger: 0.02,
          duration: 0.5,
          ease: "back.out(2)",
        });
      }

      if (ctaText) {
        const splitCtaText = new SplitText(ctaText, { type: "words" });
        gsap.from(splitCtaText.words, {
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 15,
          stagger: 0.02,
          duration: 0.4,
          delay: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef}>
      {/* Hero Section */}
      <section className="hero-section relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#050609] pt-32 pb-20 lg:pt-40 lg:pb-28 text-zinc-100">
        {/* Multi-layer laser separator */}
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-center overflow-hidden">
          <div className="h-0.5 w-3/4 max-w-4xl bg-linear-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_rgba(255,138,60,0.8),0_0_40px_rgba(255,138,60,0.4)]" />
          <div className="absolute top-0 h-[3px] w-1/2 max-w-2xl bg-linear-to-r from-transparent via-white to-transparent blur-[2px] opacity-70" />
          <div className="absolute top-0 h-px w-full bg-linear-to-r from-[#ff8a3c]/0 via-[#ff8a3c]/40 to-[#ff8a3c]/0" />
        </div>

        {/* Tech grid background */}
        <div className="hero-bg absolute inset-0 z-0 pointer-events-none select-none">
          {heroVideo ? (
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover opacity-40"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-[#050609]/80 via-[#050609]/50 to-[#050609]" />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
              
              {/* Spotlight gradient */}
              <div
                className="absolute left-1/2 top-1/2 h-[900px] w-[1400px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,138,60,0.12) 0%, rgba(255,138,60,0.04) 40%, transparent 70%)",
                }}
              />
            </>
          )}
        </div>

        <div ref={headerRef} className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Back button */}
          <div className="mb-12">
            <Link
              href={`/${locale}/#services`}
              className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-[#ff8a3c]"
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              TAKAISIN
            </Link>
          </div>

          {/* Header */}
          <div className="mb-20 flex flex-col items-center text-center">
            <div className="eyebrow inline-flex items-center gap-3 mb-6">
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
              </span>
              <span style={{ fontFamily: "var(--font-goldman)" }} className="text-[11px] uppercase tracking-[0.2em] text-[#ff8a3c] flex items-center gap-2">
                <span className="h-px w-3 bg-[#ff8a3c]" />
                {eyebrow}
                <span className="h-px w-3 bg-[#ff8a3c]" />
              </span>
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-bold leading-none sm:text-5xl lg:text-[4rem]" style={{ fontFamily: "var(--font-goldman)" }}>
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
          <button 
            onClick={() => {
              const el = document.getElementById('services-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group p-2 cursor-pointer"
            aria-label="Scroll down"
          >
            <svg 
              className="h-10 w-10 text-zinc-500/50 transition-colors duration-300 group-hover:text-[#ff8a3c] animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="relative overflow-hidden bg-[#0a0a0a] py-24 lg:py-32 text-zinc-100">
        {/* Top Separator: Glowing Line */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center">
          <div className="h-[1px] w-full max-w-6xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-50 shadow-[0_0_20px_rgba(255,138,60,0.5)]" />
          <div className="absolute top-0 h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-sm" />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] opacity-30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-24 lg:gap-32">
            {services.map((service, index) => (
              <div key={service.slug} className="relative">
                {/* Separator between items */}
                {index > 0 && (
                  <div className="absolute -top-12 lg:-top-16 left-0 right-0 flex items-center justify-center gap-4 opacity-50">
                    <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#ff8a3c]/30 to-transparent" />
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff8a3c]/50 shadow-[0_0_10px_rgba(255,138,60,0.5)]" />
                    <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#ff8a3c]/30 to-transparent" />
                  </div>
                )}

                <div
                  id={service.slug}
                  className={`service-card grid grid-cols-1 gap-12 lg:grid-cols-2 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                {/* Content */}
                <div className={`service-content ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  {/* Title with Icon */}
                  <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Title */}
                    <h2
                      className="text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl"
                      style={{ fontFamily: "var(--font-goldman)" }}
                    >
                      {service.title}
                    </h2>
                  </div>

                  {/* Short description */}
                  <p className="mb-8 text-base leading-relaxed text-zinc-400 sm:text-lg">
                    {service.shortDescription}
                  </p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-8 space-y-3">
                      <h3
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="text-sm font-bold uppercase tracking-wider text-[#ff8a3c] mb-4"
                      >
                        Ominaisuudet
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="feature-item flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-[#ff8a3c] shadow-[0_0_8px_rgba(255,138,60,0.8)]" />
                            <span className="text-sm leading-relaxed text-zinc-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="space-y-3">
                      <h3
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="text-sm font-bold uppercase tracking-wider text-[#ff8a3c] mb-4"
                      >
                        Hyödyt
                      </h3>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="benefit-item flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
                            <span className="text-sm leading-relaxed text-zinc-300">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Image */}
                <div className={`service-image ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="group relative overflow-hidden rounded-lg border border-[#ff8a3c]/20 bg-linear-to-b from-[#0a0a0a] to-[#050609] p-2 sm:p-4 backdrop-blur-sm transition-all duration-500 hover:border-[#ff8a3c]/40 hover:shadow-[0_0_30px_rgba(255,138,60,0.15)]">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c]/30 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#ff8a3c]/60" />
                    <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#ff8a3c]/30 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#ff8a3c]/60" />
                    <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/5 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-white/10" />
                    <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/5 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-white/10" />

                    {/* Number badge */}
                    <div className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded border border-[#ff8a3c]/30 bg-[#ff8a3c]/10 backdrop-blur-md">
                      <span style={{ fontFamily: "var(--font-goldman)" }} className="text-xs font-bold text-[#ff8a3c]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {service.galleryUrls && service.galleryUrls.length > 0 ? (
                      <ServiceGallery images={service.galleryUrls} title={service.title} />
                    ) : service.imageUrl ? (
                      service.icon === "technical" ? (
                        <ScrollingImage src={service.imageUrl} alt={service.title} />
                      ) : (
                        <div className="relative aspect-video overflow-hidden rounded bg-black">
                          <Image
                            src={service.imageUrl}
                            alt={service.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )
                    ) : (
                      <div className="relative aspect-video flex items-center justify-center rounded bg-linear-to-br from-[#ff8a3c]/10 to-[#ff8a3c]/5">
                        <div className="h-20 w-20 text-[#ff8a3c]/30">
                          {service.icon && iconComponents[service.icon] ? iconComponents[service.icon] : iconComponents.code}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section relative overflow-hidden bg-[#050609] py-20 lg:py-24 text-zinc-100">
        {/* Top Separator: Glowing Line */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center">
          <div className="h-[1px] w-full max-w-6xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-50 shadow-[0_0_20px_rgba(255,138,60,0.5)]" />
          <div className="absolute top-0 h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-sm" />
        </div>

        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,138,60,0.08),transparent_70%)]" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2
            className="mb-6 text-3xl font-bold leading-none text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            Kiinnostuitko?
          </h2>
          <p className="mb-8 text-base text-zinc-400 sm:text-lg">
            Ota yhteyttä ja keskustellaan, miten voimme auttaa sinua saavuttamaan tavoitteesi.
          </p>
          
          <Link
            href={`/${locale}/#contact`}
            style={{ fontFamily: "var(--font-goldman)" }}
            className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] cursor-pointer"
          >
            <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
            <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
            <span className="relative z-10">OTA YHTEYTTÄ</span>
            <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
