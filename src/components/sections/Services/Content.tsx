"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Service = {
  title: string;
  body: string;
  slug?: string;
  description?: string;
  features?: string[];
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
      if (prefersReducedMotion) return;

      const section = sectionRef.current;
      if (!section) return;

      // Laser beam animation
      const laserTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      laserTl.fromTo(
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
      );

      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .from("[data-header-eyebrow]", {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power3.out",
        })
        .from(
          "[data-header-title]",
          {
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.15"
        )
        .from(
          "[data-header-subtitle]",
          {
            opacity: 0,
            x: -20,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.2"
        );

      // Cards stagger animation - single ScrollTrigger for all cards
      gsap.from("[data-service-card]", {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
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
              <p className="lg:pl-8 text-base text-zinc-400 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {services.map((service, idx) => (
            <div
              key={service.slug ?? `${service.title}-${idx}`}
              data-service-card={idx}
              className="group relative rounded-lg border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 lg:p-8 cursor-pointer transition-all duration-300 hover:border-[#ff8a3c]/20 hover:scale-[1.02]"
            >
              {/* Hover glow effect - CSS transition instead of GSAP */}
              <div
                className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,rgba(255,138,60,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />

              {/* Top border */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Number & Title Row */}
                <div className="flex items-start gap-4 mb-4">
                  <span
                    data-card-number
                    data-number
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="text-5xl lg:text-6xl font-bold text-[#ff8a3c]/15 leading-none select-none transition-colors duration-300"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 pt-2">
                    <h3
                      style={{ fontFamily: "var(--font-goldman)" }}
                      className="text-xl lg:text-2xl font-bold text-white uppercase tracking-wide group-hover:text-[#ff8a3c] transition-colors duration-300"
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm lg:text-base text-zinc-400 leading-relaxed mb-6">
                  {service.body}
                </p>

                {/* Features (if any) */}
                {service.features && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <span
                        key={`${feature}-${i}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-300 bg-white/5 rounded-full border border-white/5"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#ff8a3c]" />
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                {service.slug && (
                  <Link
                    href={`/${locale}/services`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#ff8a3c] group/link"
                  >
                    <span className="relative">
                      Lue lisää
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-[#ff8a3c] transition-all duration-300 group-hover/link:w-full" />
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                )}
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-gradient-to-t from-[#ff8a3c]/40 to-transparent transition-all duration-300 group-hover:h-10 group-hover:from-[#ff8a3c]/60" />
                <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-gradient-to-l from-[#ff8a3c]/40 to-transparent transition-all duration-300 group-hover:w-10 group-hover:from-[#ff8a3c]/60" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/services`}
            style={{ fontFamily: "var(--font-goldman)" }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white overflow-hidden rounded-sm"
          >
            {/* Button background with animated gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff8a3c]/20 via-[#ff8a3c]/10 to-[#ff8a3c]/20 border border-[#ff8a3c]/30 rounded-sm" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff8a3c]/0 via-[#ff8a3c]/20 to-[#ff8a3c]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

            <span className="relative z-10">Katso kaikki palvelut</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
