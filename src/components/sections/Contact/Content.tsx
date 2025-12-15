"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
}

type ContactProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  email: string;
  phone: string;
  ctaText: string;
  formNameLabel: string;
  formEmailLabel: string;
  formCompanyLabel: string;
  formMessageLabel: string;
  formTitle: string;
  formSubtitle: string;
  formCta: string;
};

export default function ContactContent({
  eyebrow,
  title,
  subtitle,
  contactTitle,
  contactSubtitle,
  email,
  phone,
  ctaText,
  formNameLabel,
  formEmailLabel,
  formCompanyLabel,
  formMessageLabel,
  formTitle,
  formSubtitle,
  formCta,
}: ContactProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP: Entrance Animation (Optimized for speed and smoothness)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // 1. Header elements
    if (headerRef.current) {
      tl.from(headerRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
      });
    }

    // 2. Content columns stagger in
    if (contentRef.current) {
      tl.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "Expo.out",
        stagger: 0.2,
      }, "-=0.4");
    }
  }, { scope: containerRef });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32 text-zinc-100"
    >
      {/* === TOP SEPARATOR === */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center">
        <div className="h-px w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c]/50 to-transparent" />
        <div className="absolute top-0 h-px w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-80" />
      </div>

      {/* === BACKGROUND DECOR === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute left-0 bottom-0 h-[500px] w-[500px] translate-y-1/2 -translate-x-1/2 rounded-full bg-[#ff8a3c]/5 blur-[100px]" />
         <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ff8a3c1a_1px,transparent_1px),linear-gradient(to_bottom,#ff8a3c1a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10" />
         <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#050609_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* === HEADER === */}
        <div ref={headerRef} className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 mb-6">
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
            className="max-w-3xl text-balance text-4xl font-bold leading-none sm:text-5xl lg:text-[3.5rem]"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            {title}
          </h2>

          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* === CONTENT GRID: FORM + INFO === */}
        <div ref={contentRef} className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {/* === COLUMN 1: CONTACT FORM (Tech Card Style) === */}
            <ContactForm 
                formTitle={formTitle}
                formSubtitle={formSubtitle}
                formCta={formCta}
                formNameLabel={formNameLabel}
                formEmailLabel={formEmailLabel}
                formCompanyLabel={formCompanyLabel}
                formMessageLabel={formMessageLabel}
            />
            
            {/* === COLUMN 2: CONTACT DETAILS === */}
            <div className="space-y-12 pt-6">
                <div className="space-y-4">
                    <h3
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="text-3xl font-bold uppercase text-white"
                    >
                        {contactTitle}
                    </h3>
                    <p className="max-w-md text-zinc-400">{contactSubtitle}</p>
                </div>

                <div className="space-y-6">
                    <ContactDetail link={`mailto:${email}`} label="Email" value={email} />
                    <ContactDetail link={`tel:${phone}`} label="Puhelin" value={phone} />
                </div>
                
                {/* Custom CTA */}
                <div className="pt-4">
                    <Link
                        href="/contact"
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="group relative flex w-fit items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] cursor-pointer"
                    >
                        {/* Hero CTA Corner Animation */}
                        <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                        <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                        <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                        <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                        <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                        
                        <span className="relative z-10">{ctaText}</span>
                        <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none"><path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

// === SUB-COMPONENT: CONTACT FORM ===
function ContactForm({ 
    formTitle, 
    formSubtitle, 
    formCta,
    formNameLabel,
    formEmailLabel,
    formCompanyLabel,
    formMessageLabel,
}: {
    formTitle: string;
    formSubtitle: string;
    formCta: string;
    formNameLabel: string;
    formEmailLabel: string;
    formCompanyLabel: string;
    formMessageLabel: string;
}) {
    return (
        <article className="group relative isolate flex flex-col justify-between rounded-sm border border-[#ff8a3c]/10 bg-[#0a0b10]/80 p-8 shadow-xl">
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 pointer-events-none rounded-sm bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Card Title */}
            <header className="mb-6 space-y-2">
                <h3
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="text-xl uppercase tracking-wider text-[#ff8a3c]"
                >
                    {formTitle}
                </h3>
                <p className="text-sm text-zinc-400">{formSubtitle}</p>
            </header>

            <form className="relative z-10 space-y-4">
                <FormInput label={formNameLabel} type="text" placeholder="Sami E. Koodari" />
                <FormInput label={formEmailLabel} type="email" placeholder="sami@esimerkki.fi" />
                <FormInput label={formCompanyLabel} type="text" placeholder="Digipaja Oulu Oy" />
                <FormTextarea label={formMessageLabel} placeholder="Tarvitsen uudet Next.js-sivut..." />
                
                {/* Submit Button (Pulsating Highlight Style) */}
                <button
                    type="submit"
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className={`group/btn relative flex w-full items-center justify-center overflow-hidden rounded-sm border px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 
                    border-[#ff8a3c] bg-[#ff8a3c] text-black hover:bg-[#ff9f5e] mt-6`}
                >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-[shimmer_1s_infinite]" />
                    <span className="relative z-10">{formCta}</span>
                </button>
            </form>

            {/* Corner Markers */}
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#ff8a3c]/20 group-hover:border-[#ff8a3c]/50" />
            <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-[#ff8a3c]/20 group-hover:border-[#ff8a3c]/50" />
        </article>
    )
}

// === SUB-COMPONENT: FORM INPUT ===
function FormInput({ label, type, placeholder }: { label: string, type: string, placeholder: string }) {
    return (
        <div className="group/input relative">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-zinc-400">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full rounded-sm border border-zinc-700 bg-[#0a0b10] p-3 text-sm text-white placeholder-zinc-500 transition-all duration-300 focus:border-[#ff8a3c] focus:ring-0"
            />
        </div>
    );
}

// === SUB-COMPONENT: FORM TEXTAREA ===
function FormTextarea({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <div className="group/input relative">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-zinc-400">{label}</label>
            <textarea
                placeholder={placeholder}
                rows={4}
                className="w-full rounded-sm border border-zinc-700 bg-[#0a0b10] p-3 text-sm text-white placeholder-zinc-500 transition-all duration-300 focus:border-[#ff8a3c] focus:ring-0"
            />
        </div>
    );
}

// === SUB-COMPONENT: CONTACT DETAIL LINE ===
function ContactDetail({ link, label, value }: { link: string, label: string, value: string }) {
    return (
        <Link href={link} className="group flex items-center justify-between border-b border-zinc-800 py-3 transition-colors hover:border-[#ff8a3c]/50">
            <span className="text-xs uppercase tracking-wider text-zinc-500">{label}</span>
            <span 
                style={{ fontFamily: "var(--font-goldman)" }} 
                className="text-lg font-bold text-white transition-colors group-hover:text-[#ff8a3c]"
            >
                {value}
            </span>
        </Link>
    );
}