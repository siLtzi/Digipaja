"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
};

export default function ContactContent(props: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-[#050609] py-20 lg:py-24 text-zinc-100"
    >
      {/* === TOP SEPARATOR: LASER HORIZON === */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="laser-beam h-[4px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)] opacity-0 scale-x-0" />
        <div className="laser-beam absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-0 scale-x-0" />
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
}: ContactProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full">
        
        {/* Header - inline layout */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8">
          <div className="flex-1">
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="eyebrow text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold mb-4 block"
            >
              [ {eyebrow} ]
            </span>
            <h2 className="text-4xl font-bold leading-none sm:text-5xl lg:text-[3.5rem]" style={{ fontFamily: "var(--font-goldman)" }}>
              {title}
            </h2>
          </div>
          <p className="lg:max-w-lg text-base text-zinc-400 lg:text-right">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
            
            {/* Contact Info Card */}
            <div className="relative group overflow-hidden rounded-lg border border-[#ff8a3c]/20 bg-[#0a0b10]/90 p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#ff8a3c]/40">
              <div className="absolute top-0 left-0 h-5 w-5 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-500 group-hover:h-7 group-hover:w-7" />
              <div className="absolute bottom-0 right-0 h-5 w-5 border-r-2 border-b-2 border-[#ff8a3c] transition-all duration-500 group-hover:h-7 group-hover:w-7" />
              
              <div className="relative space-y-6">
                <div className="space-y-3">
                  <h3 style={{ fontFamily: "var(--font-goldman)" }} className="text-2xl font-bold text-white">
                    {contactTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{contactSubtitle}</p>
                </div>
                
                <div className="space-y-4">
                  <ContactDetail link={`mailto:${email}`} label="Email" value={email} />
                  <ContactDetail link={`tel:${phone}`} label="Puhelin" value={phone} />
                </div>

                {/* Info badges */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8a3c]/10">
                      <svg className="h-5 w-5 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-goldman)" }} className="text-sm font-bold text-white">Nopea vastaus</h4>
                      <p className="text-xs text-zinc-500">24h sisällä</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8a3c]/10">
                      <svg className="h-5 w-5 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-goldman)" }} className="text-sm font-bold text-white">Luottamuksellista</h4>
                      <p className="text-xs text-zinc-500">NDA pyynnöstä</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative group overflow-hidden rounded-lg border border-[#ff8a3c]/30 bg-gradient-to-br from-[#ff8a3c]/10 to-[#ff8a3c]/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#ff8a3c]/50">
              <div className="absolute top-0 left-0 h-5 w-5 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-500 group-hover:h-7 group-hover:w-7" />
              <div className="absolute bottom-0 right-0 h-5 w-5 border-r-2 border-b-2 border-[#ff8a3c] transition-all duration-500 group-hover:h-7 group-hover:w-7" />
              
              <div className="relative flex flex-col items-center text-center space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff8a3c]/20 ring-2 ring-[#ff8a3c]/30">
                  <svg className="h-8 w-8 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 style={{ fontFamily: "var(--font-goldman)" }} className="text-2xl font-bold text-white">
                    Aloitetaan projekti?
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-sm">
                    Kerro projektistasi ja saat tarjouksen 24 tunnin sisällä. Konsultaatio on aina ilmainen.
                  </p>
                </div>

                <Link
                  href="/fi/yhteydenotto"
                  style={{ fontFamily: "var(--font-goldman)" }}
                  className="group/btn relative flex items-center justify-center gap-3 px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white cursor-pointer"
                >
                  <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                  <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                  <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
                  
                  <span className="relative z-10">{ctaText}</span>
                  <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
        </div>
    </div>
  );
}

function ContactDetail({ link, label, value }: { link: string, label: string, value: string }) {
    return (
        <Link href={link} className="group relative flex items-center justify-between overflow-hidden rounded-md border border-white/5 bg-[#050609]/50 px-4 py-3.5 transition-all duration-300 hover:border-[#ff8a3c]/30 hover:bg-[#0a0a0a]/80">
            <div className="absolute left-0 top-0 h-full w-1 bg-[#ff8a3c] scale-y-0 transition-transform duration-300 origin-top group-hover:scale-y-100" />
            <span className="text-[10px] uppercase tracking-wider text-zinc-600 transition-colors duration-300 group-hover:text-zinc-500">{label}</span>
            <span style={{ fontFamily: "var(--font-goldman)" }} className="text-base font-bold text-white transition-all duration-300 group-hover:text-[#ff8a3c]">
                {value}
            </span>
        </Link>
    );
}
