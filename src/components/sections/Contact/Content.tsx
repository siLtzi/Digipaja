"use client";

import { useEffect, useRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function ContactContent(props: ContactProps) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32 text-zinc-100"
    >
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center overflow-hidden">
        <div className="h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_rgba(255,138,60,0.8),0_0_40px_rgba(255,138,60,0.4)]" />
        <div className="absolute top-0 h-[3px] w-1/2 max-w-2xl bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] opacity-70" />
        <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-[#ff8a3c]/0 via-[#ff8a3c]/40 to-[#ff8a3c]/0" />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none select-none">
         <div className="absolute inset-0 z-0 opacity-20"> 
            <Image
              src="/image/BG4.webp"
              alt="Contact Background"
              fill
              className="object-cover object-center"
              quality={100}
              priority
            />
         </div>

         <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050609] via-[#050609]/70 to-[#050609]/40" />
         
         <div className="absolute inset-0 z-20 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
         
         <div
           className="absolute left-1/2 top-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
           style={{
             background: "radial-gradient(ellipse at center, rgba(255,138,60,0.08) 0%, rgba(255,138,60,0.02) 40%, transparent 70%)",
           }}
         />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <ContactInner {...props} />
      </div>
    </section>
  );
}

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
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") || "";

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
    });

    if (headerRef.current) {
      const eyebrow = headerRef.current.querySelector(".eyebrow");
      const title = headerRef.current.querySelector("h2");
      const subtitle = headerRef.current.querySelector("p");

      tl.from(eyebrow, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power3.out",
      })
      .from(title, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.3")
      .from(subtitle, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3");
    }

    tl.from(formRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
    }, "-=0.2")
    .from(detailsRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
    }, "<0.1");

  }, []);

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
        
        <div ref={headerRef} className="mb-20 flex flex-col items-center text-center">
          <div className="eyebrow inline-flex items-center gap-3 mb-6">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
            </span>
            <span style={{ fontFamily: "var(--font-goldman)" }} className="text-[11px] uppercase tracking-[0.2em] text-[#ff8a3c] flex items-center gap-2">
              <span className="h-[1px] w-3 bg-[#ff8a3c]" />
              {eyebrow}
              <span className="h-[1px] w-3 bg-[#ff8a3c]" />
            </span>
          </div>
          <h2 className="max-w-3xl text-balance text-4xl font-bold leading-none sm:text-5xl lg:text-[4rem]" style={{ fontFamily: "var(--font-goldman)" }}>
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            
            <ContactForm 
                ref={formRef}
                initialPackage={initialPackage}
                formTitle={formTitle}
                formSubtitle={formSubtitle}
                formCta={formCta}
                formNameLabel={formNameLabel}
                formEmailLabel={formEmailLabel}
                formCompanyLabel={formCompanyLabel}
                formMessageLabel={formMessageLabel}
            />
            
            <div ref={detailsRef} className="space-y-10 lg:pt-6">
                <div className="relative group overflow-hidden rounded-lg border border-[#ff8a3c]/20 bg-[#0a0a0a]/60 p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#ff8a3c]/40 hover:bg-[#0f0f12]/80">
                  <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-500 group-hover:h-6 group-hover:w-6" />
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-[#ff8a3c] transition-all duration-500 group-hover:h-6 group-hover:w-6" />
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff8a3c]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="relative space-y-6">
                    <div className="space-y-3">
                      <h3 style={{ fontFamily: "var(--font-goldman)" }} className="text-2xl font-bold text-white">
                        {contactTitle}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-400">{contactSubtitle}</p>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <ContactDetail link={`mailto:${email}`} label="Email" value={email} />
                      <ContactDetail link={`tel:${phone}`} label="Puhelin" value={phone} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="group relative overflow-hidden rounded-lg border border-white/5 bg-[#0a0a0a]/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#ff8a3c]/20 hover:bg-[#0f0f12]/60">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8a3c]/10 transition-all duration-300 group-hover:bg-[#ff8a3c]/20">
                        <svg className="h-5 w-5 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "var(--font-goldman)" }} className="text-sm font-bold text-white mb-1">
                          Nopea vastaus
                        </h4>
                        <p className="text-xs text-zinc-500">Vastaamme 24 tunnin sisällä</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-lg border border-white/5 bg-[#0a0a0a]/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#ff8a3c]/20 hover:bg-[#0f0f12]/60">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8a3c]/10 transition-all duration-300 group-hover:bg-[#ff8a3c]/20">
                        <svg className="h-5 w-5 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "var(--font-goldman)" }} className="text-sm font-bold text-white mb-1">
                          Luottamuksellista
                        </h4>
                        <p className="text-xs text-zinc-500">NDA-sopimus pyynnöstä</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  );
}

const ContactForm = forwardRef<HTMLElement, {
    initialPackage: string;
    formTitle: string;
    formSubtitle: string;
    formCta: string;
    formNameLabel: string;
    formEmailLabel: string;
    formCompanyLabel: string;
    formMessageLabel: string;
}>(function ContactForm({ 
    initialPackage,
    formTitle, 
    formSubtitle, 
    formCta,
    formNameLabel,
    formEmailLabel,
    formCompanyLabel,
    formMessageLabel,
}, ref) {
    return (
        <article ref={ref} className="group relative isolate flex flex-col justify-between rounded-lg border border-[#ff8a3c]/20 bg-[#0a0b10]/90 p-8 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-[#ff8a3c]/40 hover:shadow-[0_0_60px_-10px_rgba(255,138,60,0.2)]">
            <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <header className="mb-8 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-6 bg-gradient-to-r from-[#ff8a3c] to-transparent" />
                  <h3 style={{ fontFamily: "var(--font-goldman)" }} className="text-lg font-bold uppercase tracking-wider text-[#ff8a3c]">
                      {formTitle}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{formSubtitle}</p>
            </header>

            <form className="relative z-10 space-y-5">
                
                {initialPackage && (
                    <div className="mb-4 flex items-center justify-between rounded-lg border border-[#ff8a3c]/40 bg-gradient-to-br from-[#ff8a3c]/10 to-[#ff8a3c]/5 p-5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,138,60,0.1)]">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-[#ff8a3c]/90">Valittu Paketti</span>
                            <span style={{ fontFamily: "var(--font-goldman)" }} className="text-lg font-bold text-white tracking-wide">
                                {decodeURIComponent(initialPackage)}
                            </span>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff8a3c]/20 text-[#ff8a3c] shadow-[0_0_20px_rgba(255,138,60,0.3)]">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <input type="hidden" name="package" value={initialPackage} />
                    </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormInput label={formNameLabel} type="text" placeholder="Matti Meikäläinen" />
                    <FormInput label={formCompanyLabel} type="text" placeholder="Yritys Oy" />
                </div>
                
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormInput label={formEmailLabel} type="email" placeholder="matti@esimerkki.fi" />
                    <FormInput label="Puhelinnumero (Valinnainen)" type="tel" placeholder="+358 40..." />
                </div>

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
                
                <div className="pt-2">
                    <button
                        type="submit"
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="group/btn relative flex w-full items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] cursor-pointer"
                    >
                        <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                        <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                        <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                        <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                        
                        <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
                        
                        <span className="relative z-10">{formCta}</span>
                        <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none">
                            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </form>

            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#ff8a3c]/30 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-[#ff8a3c]/60" />
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[#ff8a3c]/30 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-[#ff8a3c]/60" />
        </article>
    )
});

function FormInput({ label, type, placeholder }: { label: string, type: string, placeholder: string }) {
    return (
        <div className="group/input relative">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-focus-within/input:text-[#ff8a3c]">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full rounded-md border border-zinc-800 bg-[#050609] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none"
            />
        </div>
    );
}

function FormSelect({ label, options, defaultValue }: { label: string, options: string[], defaultValue?: string }) {
    const safeDefault = options.includes(defaultValue || "") ? defaultValue : "";
    return (
        <div className="group/input relative">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-focus-within/input:text-[#ff8a3c]">{label}</label>
            <div className="relative">
                <select
                    defaultValue={safeDefault}
                    className="w-full appearance-none rounded-md border border-zinc-800 bg-[#050609] px-4 py-3 text-sm text-white transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none"
                >
                    <option value="" disabled>Valitse...</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors duration-300 group-focus-within/input:text-[#ff8a3c]">
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
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-focus-within/input:text-[#ff8a3c]">{label}</label>
            <textarea
                placeholder={placeholder}
                rows={5}
                className="w-full rounded-md border border-zinc-800 bg-[#050609] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none resize-none"
            />
        </div>
    );
}

function ContactDetail({ link, label, value }: { link: string, label: string, value: string }) {
    return (
        <Link href={link} className="group relative flex items-center justify-between overflow-hidden rounded-md border border-white/5 bg-[#050609]/50 px-4 py-4 transition-all duration-300 hover:border-[#ff8a3c]/30 hover:bg-[#0a0a0a]/80 hover:shadow-[0_0_20px_rgba(255,138,60,0.1)]">
            <div className="absolute left-0 top-0 h-full w-1 bg-[#ff8a3c] scale-y-0 transition-transform duration-300 origin-top group-hover:scale-y-100" />
            <span className="text-[10px] uppercase tracking-wider text-zinc-600 transition-colors duration-300 group-hover:text-zinc-500">{label}</span>
            <span style={{ fontFamily: "var(--font-goldman)" }} className="text-base font-bold text-white transition-all duration-300 group-hover:text-[#ff8a3c] group-hover:translate-x-1">
                {value}
            </span>
        </Link>
    );
}
