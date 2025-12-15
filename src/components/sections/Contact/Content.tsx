"use client";

import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

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

// 1. WRAPPER COMPONENT
export default function ContactContent(props: ContactProps) {
  return (
    <section
      id="contact"
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
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <ContactInner {...props} />
        </Suspense>
      </div>
    </section>
  );
}

// 2. INNER COMPONENT
function ContactInner({
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
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") || "";

  // Scroll logic if you are keeping it on the same page
  useEffect(() => {
    if (initialPackage && containerRef.current) {
      setTimeout(() => {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(containerRef.current, true, "center");
        } else {
          containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [initialPackage]);

  return (
    <div ref={containerRef} className="w-full">
        
        {/* === HEADER === */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
            </span>
            <span style={{ fontFamily: "var(--font-goldman)" }} className="text-[12px] uppercase tracking-[0.2em] text-[#ff8a3c]">
              [ {eyebrow} ]
            </span>
          </div>
          <h2 className="max-w-3xl text-balance text-4xl font-bold leading-none sm:text-5xl lg:text-[3.5rem]" style={{ fontFamily: "var(--font-goldman)" }}>
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* === CONTENT GRID === */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {/* === COLUMN 1: FORM === */}
            <ContactForm 
                initialPackage={initialPackage}
                formTitle={formTitle}
                formSubtitle={formSubtitle}
                formCta={formCta}
                formNameLabel={formNameLabel}
                formEmailLabel={formEmailLabel}
                formCompanyLabel={formCompanyLabel}
                formMessageLabel={formMessageLabel}
            />
            
            {/* === COLUMN 2: DETAILS === */}
            <div className="space-y-12 pt-6">
                <div className="space-y-4">
                    <h3 style={{ fontFamily: "var(--font-goldman)" }} className="text-3xl font-bold uppercase text-white">
                        {contactTitle}
                    </h3>
                    <p className="max-w-md text-zinc-400">{contactSubtitle}</p>
                </div>
                <div className="space-y-6">
                    <ContactDetail link={`mailto:${email}`} label="Email" value={email} />
                    <ContactDetail link={`tel:${phone}`} label="Puhelin" value={phone} />
                </div>
                {/* Side CTA removed since we have the main form here */}
            </div>
        </div>
    </div>
  );
}

// === SUB-COMPONENT: CONTACT FORM ===
function ContactForm({ 
    initialPackage,
    formTitle, 
    formSubtitle, 
    formCta,
    formNameLabel,
    formEmailLabel,
    formCompanyLabel,
    formMessageLabel,
}: {
    initialPackage: string;
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
            {/* Inner Glow */}
            <div className="absolute inset-0 pointer-events-none rounded-sm bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <header className="mb-6 space-y-2">
                <h3 style={{ fontFamily: "var(--font-goldman)" }} className="text-xl uppercase tracking-wider text-[#ff8a3c]">
                    {formTitle}
                </h3>
                <p className="text-sm text-zinc-400">{formSubtitle}</p>
            </header>

            <form className="relative z-10 space-y-5">
                
                {/* SELECTED PACKAGE CARD */}
                {initialPackage && (
                    <div className="mb-2 flex items-center justify-between rounded-sm border border-[#ff8a3c]/30 bg-[#ff8a3c]/5 p-4 backdrop-blur-sm">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[#ff8a3c] opacity-80">Valittu Paketti</span>
                            <span style={{ fontFamily: "var(--font-goldman)" }} className="text-lg text-white tracking-wide">
                                {decodeURIComponent(initialPackage)}
                            </span>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff8a3c]/10 text-[#ff8a3c]">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <input type="hidden" name="package" value={initialPackage} />
                    </div>
                )}

                {/* ROW 1: Name & Company */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormInput label={formNameLabel} type="text" placeholder="Matti Meikäläinen" />
                    <FormInput label={formCompanyLabel} type="text" placeholder="Yritys Oy" />
                </div>
                
                {/* ROW 2: Email & Phone (NEW) */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormInput label={formEmailLabel} type="email" placeholder="matti@esimerkki.fi" />
                    {/* New Phone Field */}
                    <FormInput label="Puhelinnumero (Valinnainen)" type="tel" placeholder="+358 40..." />
                </div>

                {/* ROW 3: Preferred Method (NEW) */}
                <FormSelect 
                    label="Toivottu yhteydenottotapa"
                    options={["Sähköposti", "Puhelinsoitto", "WhatsApp"]}
                    defaultValue="Sähköposti"
                />

                <FormTextarea 
                    label={formMessageLabel} 
                    placeholder={initialPackage 
                        ? `Olen kiinnostunut ${decodeURIComponent(initialPackage)} -paketista...`
                        : "Kerro lyhyesti projektistasi..."
                    } 
                />
                
                {/* TECHY SUBMIT BUTTON */}
                <div className="pt-2">
                    <button
                        type="submit"
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="group/btn relative flex w-full items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] cursor-pointer"
                    >
                        {/* Animated Corners */}
                        <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                        <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                        <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                        <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                        
                        {/* Background Glow */}
                        <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
                        
                        <span className="relative z-10">{formCta}</span>
                        <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none">
                            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </form>

            {/* Card Outer Corners */}
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#ff8a3c]/20 group-hover:border-[#ff8a3c]/50" />
            <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-[#ff8a3c]/20 group-hover:border-[#ff8a3c]/50" />
        </article>
    )
}

// === FORM COMPONENTS ===

function FormInput({ label, type, placeholder }: { label: string, type: string, placeholder: string }) {
    return (
        <div className="group/input relative">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors group-focus-within/input:text-[#ff8a3c]">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full rounded-sm border border-zinc-800 bg-[#050609] p-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:ring-0 focus:outline-none"
            />
        </div>
    );
}

function FormSelect({ label, options, defaultValue }: { label: string, options: string[], defaultValue?: string }) {
    const safeDefault = options.includes(defaultValue || "") ? defaultValue : "";
    return (
        <div className="group/input relative">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors group-focus-within/input:text-[#ff8a3c]">{label}</label>
            <div className="relative">
                <select
                    defaultValue={safeDefault}
                    className="w-full appearance-none rounded-sm border border-zinc-800 bg-[#050609] p-3 text-sm text-white transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:ring-0 focus:outline-none"
                >
                    <option value="" disabled>Valitse...</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1L5 5L9 1" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

function FormTextarea({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <div className="group/input relative">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors group-focus-within/input:text-[#ff8a3c]">{label}</label>
            <textarea
                placeholder={placeholder}
                rows={4}
                className="w-full rounded-sm border border-zinc-800 bg-[#050609] p-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:ring-0 focus:outline-none resize-none"
            />
        </div>
    );
}

function ContactDetail({ link, label, value }: { link: string, label: string, value: string }) {
    return (
        <Link href={link} className="group flex items-center justify-between border-b border-zinc-800 py-3 transition-colors hover:border-[#ff8a3c]/50">
            <span className="text-xs uppercase tracking-wider text-zinc-500">{label}</span>
            <span style={{ fontFamily: "var(--font-goldman)" }} className="text-lg font-bold text-white transition-colors group-hover:text-[#ff8a3c]">
                {value}
            </span>
        </Link>
    );
}