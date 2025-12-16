"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link
// import Image from "next/image"; 

type Service = {
  title: string;
  body: string;
  slug?: string; // Added optional slug
  icon?: string;
};

type ServicesProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  services: Service[];
  locale?: string; // Add locale prop so we build the link correctly (e.g. /fi/services/...)
};

export default function ServicesContent({
  eyebrow,
  title,
  subtitle,
  services,
  locale = "fi", // Default to 'fi' if not provided
}: ServicesProps) {
  const [isHoveringHook, setIsHoveringHook] = useState(false);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050609] py-24 lg:py-32 text-zinc-100"
    >
      {/* === TOP SEPARATOR === */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center">
        <div className="h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c]/50 to-transparent" />
        <div className="absolute top-0 h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-80" />
      </div>

      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image/BG4.webp"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover z-0 opacity-80"
        />
        <div className="absolute inset-0 z-10 bg-[#050609]/30" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ff8a3c1a_1px,transparent_1px),linear-gradient(to_bottom,#ff8a3c1a_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#050609_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* === HEADER === */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#ff8a3c]/20 bg-[#ff8a3c]/5 px-4 py-1.5 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#ffcc80]">
              {eyebrow}
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

        {/* === SERVICES GRID === */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard 
              key={i} 
              index={i} 
              title={s.title} 
              body={s.body} 
              slug={s.slug} // Pass the slug
              locale={locale} // Pass the locale
            />
          ))}
        </div>

        {/* === THE HOOK === */}
        <div
          className="group mt-16 relative overflow-hidden rounded-xl border border-[#ff8a3c]/20 bg-[#0a0b10]/80 backdrop-blur-xl transition-all duration-500 hover:border-[#ff8a3c]/50"
          onMouseEnter={() => setIsHoveringHook(true)}
          onMouseLeave={() => setIsHoveringHook(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff8a3c]/5 to-transparent -skew-x-12 translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%]" />

          <div className="flex flex-col gap-10 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-[#ff8a3c]/10 text-[#ff8a3c]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <h3 style={{ fontFamily: "var(--font-goldman)" }} className="text-xl uppercase tracking-wider text-white">
                  The Digipaja Guarantee
                </h3>
              </div>
              <p className="text-zinc-400">
                Emme vain "tee sivuja". Me rakennamme suorituskykyä. Jos sivustosi Google Lighthouse -arvosana (Performance) ei ole vihreällä (<span className="text-[#4ade80]">90+</span>) julkaisuhetkellä, jatkamme optimointia veloituksetta.
              </p>
            </div>

            <div className="relative shrink-0">
              <div className="flex items-center gap-6 rounded-lg border border-white/5 bg-black/60 p-4 px-6 backdrop-blur-md">
                <div className="relative h-20 w-20">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-[#4ade80] transition-all duration-1000 ease-out" strokeDasharray={isHoveringHook ? "98, 100" : "0, 100"} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span style={{ fontFamily: "var(--font-goldman)" }} className="text-lg font-bold text-white">98</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Google Score</p>
                  <p style={{ fontFamily: "var(--font-goldman)" }} className="text-2xl text-[#4ade80]">PASS</p>
                  <p className="text-[10px] text-zinc-500">Core Web Vitals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === SUB-COMPONENT: SERVICE CARD ===
function ServiceCard({
  title,
  body,
  index,
  slug,
  locale,
}: {
  title: string;
  body: string;
  index: number;
  slug?: string;
  locale: string;
}) {
  const num = (index + 1).toString().padStart(2, "0");
  
  // Create a fallback slug if one isn't provided by Sanity
  const finalSlug = slug || title.toLowerCase().replace(/\s+/g, '-');
  const href = `/${locale}/services/${finalSlug}`;

  return (
    <Link 
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-[#ff8a3c]/10 bg-[#0a0b10]/90 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8a3c]/40 hover:bg-[#120b08]"
    >
      <span
        style={{ fontFamily: "var(--font-goldman)" }}
        className="absolute -right-4 -top-6 text-[80px] font-bold text-[#ff8a3c]/5 transition-colors group-hover:text-[#ff8a3c]/10"
      >
        {num}
      </span>

      <div>
        <div className="mb-6 h-[2px] w-8 bg-[#ff8a3c]/50 transition-all duration-300 group-hover:w-16 group-hover:bg-[#ff8a3c]" />
        <h3
          className="mb-4 text-2xl font-bold text-[#ff8a3c] group-hover:text-white"
          style={{ fontFamily: "var(--font-goldman)" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300">
          {body}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
        <span
          className="text-[10px] uppercase tracking-wider text-[#ff8a3c]/60 group-hover:text-[#ff8a3c]"
          style={{ fontFamily: "var(--font-goldman)" }}
        >
          Explore
        </span>
        <svg
          className="h-4 w-4 text-[#ff8a3c]/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#ff8a3c]"
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
      </div>

      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-[#ff8a3c]/20 group-hover:border-[#ff8a3c]/50" />
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#ff8a3c]/20 group-hover:border-[#ff8a3c]/50" />
    </Link>
  );
}