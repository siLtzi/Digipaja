"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";

// --- TYPES ---
type PricingPlan = {
  name: string;
  price: string;
  body: string;
  includes: string[];
  highlight: boolean;
  category: string;
  cta: string;
  href: string;
};

// --- SUB-COMPONENT: SWAPPING ARROW BUTTON ---
const PricingCTA = ({
  href,
  text,
  highlight,
}: {
  href: string;
  text: string;
  highlight: boolean;
}) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const letters = text.split("");

  // 1. Setup Initial States
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Button glow fill
      gsap.set(".btn-fill", {
        width: "0%",
        height: "0%",
        opacity: 0,
        x: "-50%",
        y: "-50%",
        top: "50%",
        left: "50%",
      });

      // Text Characters
      gsap.set(".letter-secondary", {
        yPercent: -100,
        opacity: 0,
        display: "inline-block",
      });
      gsap.set(".letter-primary", {
        yPercent: 0,
        opacity: 1,
        display: "inline-block",
      });

      // Arrows
      gsap.set(".arrow-left", { x: -40, opacity: 0 });
      gsap.set(".arrow-right", { x: 0, opacity: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  // 2. Handle Mouse Enter
  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // Fill & text animation
      tl.to(containerRef.current, { scale: 1.02, duration: 0.3 }, 0);
      tl.to(
        ".btn-fill",
        {
          width: "140%",
          height: "220%",
          opacity: 0.7,
          duration: 0.5,
          ease: "circ.out",
        },
        0
      );
      tl.to(
        ".letter-primary",
        { yPercent: 100, opacity: 0, duration: 0.4, stagger: 0.03 },
        0
      );
      tl.to(
        ".letter-secondary",
        { yPercent: 0, opacity: 1, duration: 0.4, stagger: 0.03 },
        0.05
      );

      // Arrow swap
      tl.to(
        ".arrow-right",
        { x: 40, opacity: 0, duration: 0.3, ease: "power2.in" },
        0
      );
      tl.to(
        ".arrow-left",
        { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
        0.1
      );
    }, containerRef);
  };

  // 3. Handle Mouse Leave
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Reset glow & text
      tl.to(containerRef.current, { scale: 1, duration: 0.3 }, 0);
      tl.to(
        ".btn-fill",
        { width: "0%", height: "0%", opacity: 0, duration: 0.4 },
        0
      );
      tl.to(
        ".letter-secondary",
        { yPercent: -100, opacity: 0, duration: 0.3, stagger: 0.02 },
        0
      );
      tl.to(
        ".letter-primary",
        { yPercent: 0, opacity: 1, duration: 0.3, stagger: 0.02 },
        0.05
      );

      // Reset arrows
      tl.to(".arrow-left", { x: -40, opacity: 0, duration: 0.3 }, 0);
      tl.to(
        ".arrow-right",
        { x: 0, opacity: 1, duration: 0.3, delay: 0.1 },
        0
      );
    }, containerRef);
  };

  // Color classes
  const arrowColor = highlight
    ? "text-white"
    : "text-zinc-500 group-hover:text-white";

  return (
    <Link
      href={href}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex items-center justify-center w-full py-5 overflow-hidden rounded-sm transition-all duration-300 border
        ${
          highlight
            ? "bg-zinc-900 border-white/20"
            : "bg-transparent border-white/10"
        }`}
    >
      {/* Background Fills */}
      <div
        className={`btn-border absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 ${
          highlight
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <span /> <span /> <span /> <span />
      </div>
      {/* Soft glow fill (same style as navbar/hero) */}
      <div className="btn-fill absolute rounded-full bg-fuchsia-500/40 blur-xl z-10 pointer-events-none" />

      {/* LEFT ARROW */}
      <div className="arrow-left absolute left-4 z-20 pointer-events-none flex items-center justify-center">
        <ChevronsRight
          className={`w-20 h-20 transition-colors duration-300 ${arrowColor}`}
          strokeWidth={3}
        />
      </div>

      {/* TEXT */}
      <div className="relative z-20 flex items-center justify-center overflow-hidden px-4">
        {/* Primary Text */}
        <div className="flex items-center">
          {letters.map((char, i) => (
            <span
              key={`p-${i}`}
              className="letter-primary text-lg uppercase tracking-widest text-zinc-300 group-hover:text-white"
              style={{ fontFamily: "var(--font-clash-display)" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        {/* Secondary Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          {letters.map((char, i) => (
            <span
              key={`s-${i}`}
              className="letter-secondary font-semibold text-lg uppercase tracking-widest text-white"
              style={{ fontFamily: "var(--font-clash-display)" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW */}
      <div className="arrow-right absolute right-4 z-20 pointer-events-none flex items-center justify-center">
        <ChevronsRight
          className={`w-10 h-10 transition-colors duration-300 ${arrowColor}`}
          strokeWidth={3}
        />
      </div>
    </Link>
  );
};

// --- MAIN COMPONENT ---
export default function PricingTable({
  eyebrow,
  title,
  subtitle,
  plans,
  note,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  note: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="pricing"
      className="relative w-full border-t border-white/5 bg-transparent overflow-hidden py-16 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <span
            style={{ fontFamily: "var(--font-poppins)" }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-500 mb-4 block"
          >
            {eyebrow}
          </span>
          <h2
            style={{ fontFamily: "var(--font-clash-display)" }}
            className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4"
          >
            {title}
          </h2>
          <p
            style={{ fontFamily: "var(--font-poppins)" }}
            className="text-base text-zinc-400 leading-relaxed font-light"
          >
            {subtitle}
          </p>
        </div>

        {/* Interactive Accordion */}
        <div
          className="flex flex-col gap-4 lg:h-[500px] lg:flex-row"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {plans.map((plan, idx) => {
            const isHovered = hoveredIndex === idx;
            const isExpanded =
              hoveredIndex === null ? plan.highlight : isHovered;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`group relative flex flex-col overflow-hidden rounded-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-full min-h[380px] lg:min-h-0 lg:h-full ${
                  isExpanded
                    ? "lg:flex-[2.5] bg-zinc-900"
                    : "lg:flex-[1.2] bg-zinc-900/40 hover:bg-zinc-900/60"
                }`}
              >
                <div
                  className={`absolute -inset-[1px] rounded-sm -z-10 blur-[1px] transition-opacity duration-500 ${
                    isExpanded || plan.highlight
                      ? "bg-white/60 opacity-100"
                      : "bg-white/10 opacity-30"
                  }`}
                />

                <div className="relative h-full flex flex-col p-6 lg:p-8 border border-white/5 rounded-sm bg-[#0A0A0A] overflow-hidden">
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-fuchsia-500/10 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  )}

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`inline-flex items-center gap-2 rounded-sm border px-2 py-1 backdrop-blur-md transition-colors duration-500 ${
                          plan.highlight
                            ? "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300"
                            : "border-white/10 bg-white/5 text-zinc-400"
                        }`}
                      >
                        <span
                          style={{ fontFamily: "var(--font-poppins)" }}
                          className="text-[10px] font-bold uppercase tracking-widest"
                        >
                          {plan.category}
                        </span>
                      </div>
                      {plan.highlight && (
                        <span
                          style={{ fontFamily: "var(--font-poppins)" }}
                          className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-500 animate-pulse"
                        >
                          Popular
                        </span>
                      )}
                    </div>

                    <h3
                      style={{ fontFamily: "var(--font-clash-display)" }}
                      className="text-2xl font-medium text-white mb-2"
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span
                        style={{ fontFamily: "var(--font-clash-display)" }}
                        className="text-4xl lg:text-4xl font-light text-white tracking-tight"
                      >
                        {plan.price}
                      </span>
                    </div>
                    <p
                      style={{ fontFamily: "var(--font-poppins)" }}
                      className="text-xs text-zinc-400 leading-relaxed font-light border-l border-white/10 pl-3"
                    >
                      {plan.body}
                    </p>
                  </div>

                  <div
                    className={`flex-1 grid transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100 pt-6"
                        : "grid-rows-[0fr] opacity-0 pt-0"
                    }`}
                  >
                    <div className="overflow-hidden flex flex-col justify-between min-h-0">
                      <ul className="space-y-2 mb-6">
                        {plan.includes.map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-xs text-zinc-300"
                          >
                            <Check className="h-4 w-4 text-fuchsia-500 shrink-0" />
                            <span
                              style={{ fontFamily: "var(--font-poppins)" }}
                              className="font-light"
                            >
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="group">
                        <PricingCTA
                          href={plan.href}
                          text={plan.cta}
                          highlight={plan.highlight}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <p
            style={{ fontFamily: "var(--font-poppins)" }}
            className="text-[10px] text-zinc-600 uppercase tracking-widest"
          >
            {note}
          </p>
        </div>
      </div>
    </section>
  );
}
