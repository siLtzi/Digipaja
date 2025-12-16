"use client";

import Link from "next/link";
import LogoMark from "@/components/LogoMark";

type FooterProps = {
  locale: "fi" | "en";
};

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = (fi: string, en: string) => (locale === "fi" ? fi : en);

  const FOOTER_LINKS = [
    { label: t("Etusivu", "Home"), href: "/" },
    { label: t("Palvelut", "Services"), href: "/#services" },
    { label: t("Työt", "Work"), href: "/work" },
    { label: t("Meistä", "About"), href: "/#about-us" },
    { label: t("Ota yhteyttä", "Contact"), href: "/contact" },
  ];

  const LEGAL_LINKS = [
    { label: t("Tietosuoja", "Privacy Policy"), href: "/privacy" },
    { label: t("Ehdot", "Terms of Service"), href: "/terms" },
  ];

  const SOCIALS = [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ];

  const withLocale = (href: string) => {
    if (href === "/") return `/${locale}`;
    if (href.startsWith("http")) return href;
    if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
    return `/${locale}${href}`;
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050609] text-zinc-400">
      
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* 1. Base Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
         
         {/* 2. Massive Watermark Text */}
         <div 
           className="absolute -bottom-10 left-0 w-full text-center text-[20vw] font-bold leading-none text-white/[0.02] select-none pointer-events-none"
           style={{ fontFamily: "var(--font-goldman)" }}
         >
           DIGIPAJA
         </div>

         {/* 3. Radial Glow from bottom */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ff8a3c] opacity-[0.03] blur-[120px]" />
      </div>

      {/* === TOP "DATA BEAM" BORDER (Animated) === */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10 overflow-hidden">
        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent animate-[shimmer_3s_infinite_linear]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-20">
        
        {/* === MAIN CONTENT ROW === */}
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] mb-20">
          
          {/* LEFT: Brand & Statement */}
          <div className="space-y-8">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 group">
              <div className="h-10 w-auto text-white transition-transform duration-300 group-hover:scale-105">
                <LogoMark />
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                   {t("Järjestelmä: ONLINE", "System: ONLINE")}
                 </span>
              </div>
            </Link>

            <div className="max-w-md space-y-6">
               <h2 className="text-2xl md:text-3xl text-white leading-tight">
                  {t(
                    "Rakennamme digitaalista ylivoimaa.",
                    "We build digital superiority."
                  )}
               </h2>
               <p className="text-sm leading-relaxed text-zinc-500">
                 {t(
                   "Emme vain koodaa. Me luomme liiketoimintakriittisiä ratkaisuja, jotka ovat nopeampia, turvallisempia ja näyttävämpiä kuin kilpailijoillasi.",
                   "We don't just code. We create business-critical solutions that are faster, more secure, and more impressive than your competitors'."
                 )}
               </p>
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-2">
               {["Next.js 14", "React", "TypeScript", "Sanity", "Vercel"].map(tech => (
                 <span key={tech} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500 border border-white/5 bg-white/[0.02]">
                   {tech}
                 </span>
               ))}
            </div>
          </div>

          {/* RIGHT: The "Action" Area */}
          <div className="flex flex-col items-start lg:items-end justify-center space-y-8">
             <div className="text-left lg:text-right space-y-2">
                <p className="font-mono text-xs text-[#ff8a3c] tracking-widest uppercase">
                  {t("// Aloita projekti", "// Start Project")}
                </p>
                <h3 
                  className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-goldman)" }}
                >
                  {t("Oletko valmis?", "Are you ready?")}
                </h3>
             </div>

             {/* THE COOL TECH BUTTON */}
             <Link
                href={`/${locale}/contact`}
                style={{ fontFamily: "var(--font-goldman)" }}
                className="group relative isolate flex items-center gap-4 px-8 py-5 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_30px_rgba(255,138,60,0.15)]"
              >
                {/* Tech Corners */}
                <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                
                {/* Background Fade */}
                <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                
                <span className="relative z-10">{t("Pyydä tarjous", "Get a Quote")}</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
                   <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
          </div>
        </div>

        {/* === LINKS GRID (Technical Style) === */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-16">
           
           {/* Column 1 */}
           <div className="space-y-6">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                 <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
                 {t("Sivukartta", "Sitemap")}
              </h4>
              <ul className="space-y-3">
                 {FOOTER_LINKS.map(link => (
                    <li key={link.href}>
                       <Link href={withLocale(link.href)} className="group flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white">
                          <span className="h-px w-2 bg-[#ff8a3c] scale-x-0 transition-transform group-hover:scale-x-100 origin-left" />
                          <span>{link.label}</span>
                       </Link>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Column 2 */}
           <div className="space-y-6">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                 <span className="h-1.5 w-1.5 rounded-full bg-zinc-700"></span>
                 {t("Sosiaalinen", "Social")}
              </h4>
              <ul className="space-y-3">
                 {SOCIALS.map(link => (
                    <li key={link.label}>
                       <a href={link.href} target="_blank" rel="noopener" className="group flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white">
                          <span>{link.label}</span>
                          <svg className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                       </a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Column 3 & 4 (Contact) */}
           <div className="col-span-2 md:pl-12 space-y-6">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                 <span className="h-1.5 w-1.5 rounded-full bg-zinc-700"></span>
                 {t("Yhteystiedot", "Contact Data")}
              </h4>
              <div className="grid sm:grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600">Email</p>
                    <a href="mailto:contact@digipaja.fi" className="block text-sm text-zinc-300 hover:text-[#ff8a3c] transition-colors font-mono">
                       contact@digipaja.fi
                    </a>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600">Phone</p>
                    <a href="tel:+358401234567" className="block text-sm text-zinc-300 hover:text-[#ff8a3c] transition-colors font-mono">
                       +358 40 123 4567
                    </a>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600">Business ID</p>
                    <p className="text-sm text-zinc-500 font-mono">FI1234567-8</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600">Location</p>
                    <p className="text-sm text-zinc-500 font-mono">Oulu, Finland</p>
                 </div>
              </div>
           </div>

        </div>

        {/* === BOTTOM BAR === */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
           <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">
              © {currentYear} Digipaja Oulu. {t("All rights reserved.", "Kaikki oikeudet pidätetään.")}
           </p>
           
           <div className="flex items-center gap-8">
              {LEGAL_LINKS.map(link => (
                 <Link key={link.href} href={withLocale(link.href)} className="text-[10px] text-zinc-600 hover:text-white uppercase tracking-wider transition-colors">
                    {link.label}
                 </Link>
              ))}
           </div>
        </div>
      </div>
      
      {/* Global styles for animations if not tailwind configured */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </footer>
  );
}