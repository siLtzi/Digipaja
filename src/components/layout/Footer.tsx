"use client";

import Link from "next/link";
import LogoMark from "@/components/LogoMark";

type SiteSettings = {
  companyName?: string;
  businessId?: string;
  city?: string;
  country?: string;
  email?: string;
  phoneMain?: string;
  phoneTechnical?: string;
  footerTagline_fi?: string;
  footerTagline_en?: string;
  footerDescription_fi?: string;
  footerDescription_en?: string;
  footerCtaBadge_fi?: string;
  footerCtaBadge_en?: string;
  footerCtaTitle_fi?: string;
  footerCtaTitle_en?: string;
  footerCtaDescription_fi?: string;
  footerCtaDescription_en?: string;
  footerCtaButton_fi?: string;
  footerCtaButton_en?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  footerLinks?: Array<{ label_fi: string; label_en: string; href: string }>;
  legalLinks?: Array<{ label_fi: string; label_en: string; href: string }>;
};

type FooterProps = {
  locale: "fi" | "en";
  settings?: SiteSettings | null;
};

export default function Footer({ locale, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = <T,>(fi: T, en: T): T => (locale === "fi" ? fi : en);

  // Use Sanity data with fallbacks
  const companyName = settings?.companyName || "Digipaja";
  const email = settings?.email || "contact@digipaja.fi";
  const phoneMain = settings?.phoneMain || "";
  const phoneTechnical = settings?.phoneTechnical || "";
  const businessId = settings?.businessId || "";
  const location = [settings?.city, settings?.country].filter(Boolean).join(", ") || "Oulu, Finland";

  const tagline = t(
    settings?.footerTagline_fi || "Rakennamme digitaalista ylivoimaa.",
    settings?.footerTagline_en || "We build digital superiority."
  );

  const description = t(
    settings?.footerDescription_fi || "Emme vain koodaa. Me luomme liiketoimintakriittisiä ratkaisuja, jotka ovat nopeampia, turvallisempia ja näyttävämpiä kuin kilpailijoillasi.",
    settings?.footerDescription_en || "We don't just code. We create business-critical solutions that are faster, more secure, and more impressive than your competitors'."
  );

  const ctaBadge = t(
    settings?.footerCtaBadge_fi || "Valmis aloittamaan?",
    settings?.footerCtaBadge_en || "Ready to start?"
  );

  const ctaTitle = t(
    settings?.footerCtaTitle_fi || "Pyydä tarjous",
    settings?.footerCtaTitle_en || "Get a Quote"
  );

  const ctaDescription = t(
    settings?.footerCtaDescription_fi || "Kerro meille projektistasi ja saat tarjouksen 24 tunnissa.",
    settings?.footerCtaDescription_en || "Tell us about your project and get a quote within 24 hours."
  );

  const ctaButton = t(
    settings?.footerCtaButton_fi || "Aloita tästä",
    settings?.footerCtaButton_en || "Start here"
  );

  // Use Sanity links or fallback to defaults
  const FOOTER_LINKS = settings?.footerLinks?.length
    ? settings.footerLinks.map((link) => ({
        label: t(link.label_fi, link.label_en),
        href: link.href,
      }))
    : [
        { label: t("Etusivu", "Home"), href: "/" },
        { label: t("Palvelut", "Services"), href: "/#services" },
        { label: t("Työt", "Work"), href: "/work" },
        { label: t("Meistä", "About"), href: "/#about-us" },
        { label: t("Ota yhteyttä", "Contact"), href: "/yhteydenotto" },
      ];

  const LEGAL_LINKS = settings?.legalLinks?.length
    ? settings.legalLinks.map((link) => ({
        label: t(link.label_fi, link.label_en),
        href: link.href,
      }))
    : [
        { label: t("Tietosuoja", "Privacy Policy"), href: "/tietosuoja" },
        { label: t("Käyttöehdot", "Terms of Service"), href: "/kayttoehdot" },
      ];

  const SOCIALS = settings?.socialLinks?.length
    ? settings.socialLinks.map((link) => ({
        label: link.platform,
        href: link.url,
      }))
    : [
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
    <footer className="relative overflow-hidden bg-[#050609] text-zinc-400">
      
      {/* === TOP LASER SEPARATOR === */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center overflow-hidden">
        <div className="h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_rgba(255,138,60,0.8),0_0_40px_rgba(255,138,60,0.4)] will-change-transform" />
        <div className="absolute top-0 h-[3px] w-1/2 max-w-2xl bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] opacity-70 will-change-transform" />
        <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-[#ff8a3c]/0 via-[#ff8a3c]/40 to-[#ff8a3c]/0 will-change-transform" />
      </div>
      
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
         {/* Tech Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_30%,#000_40%,transparent_100%)]" />
         
         {/* Top Spotlight */}
         <div
           className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
           style={{
             background:
               "radial-gradient(ellipse at center, rgba(255,138,60,0.08) 0%, rgba(255,138,60,0.02) 40%, transparent 70%)",
           }}
         />
         
         {/* Bottom Glow */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ff8a3c] opacity-[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-24">
        
        {/* === TOP ROW: BRAND & CTA === */}
        <div className="mb-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
            
            {/* Left: Brand */}
            <div className="space-y-6">
              <Link href={`/${locale}`} className="inline-block group">
                <div className="h-12 w-auto text-white transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(255,138,60,0.3)]">
                  <LogoMark />
                </div>
              </Link>

              <h2 
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                {tagline}
              </h2>
              
              <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                {description}
              </p>
            </div>

            {/* Right: CTA Card */}
            <div className="flex justify-start lg:justify-end">
              <Link
                href={`/${locale}/yhteydenotto`}
                className="group relative isolate flex flex-col gap-5 border-l-2 border-[#ff8a3c]/30 pl-6 transition-all duration-500 hover:border-[#ff8a3c] hover:pl-8"
              >
                {/* Eyebrow - bracket style */}
                <span
                  style={{ fontFamily: "var(--font-goldman)" }}
                  className="text-[#ff8a3c] text-[11px] uppercase tracking-[0.2em] font-semibold"
                >
                  [ {ctaBadge} ]
                </span>
                
                <div className="space-y-3">
                  <h3 
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="text-3xl font-bold text-white transition-colors duration-500 group-hover:text-[#ff8a3c]"
                  >
                    {ctaTitle}
                  </h3>
                  
                  <p className="max-w-sm text-sm leading-relaxed text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300">
                    {ctaDescription}
                  </p>
                </div>
                
                {/* CTA Button - corner bracket style like hero */}
                <div className="inline-flex">
                  <div className="group/btn relative isolate flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] cursor-pointer">
                    <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
                    <span className="relative z-10" style={{ fontFamily: "var(--font-goldman)" }}>{ctaButton}</span>
                    <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none"><path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* === SEPARATOR LINE === */}
        <div className="relative mb-16 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff8a3c]/30 to-transparent" />
        </div>

        {/* === MIDDLE ROW: NAVIGATION & CONTACT === */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-16">
           
           {/* Navigation */}
           <div className="space-y-5">
              <h4 
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-[11px] uppercase tracking-[0.2em] text-[#ff8a3c] flex items-center gap-2"
              >
                <span className="h-[1px] w-3 bg-[#ff8a3c]" />
                {t("Navigaatio", "Navigation")}
              </h4>
              <ul className="space-y-3">
                 {FOOTER_LINKS.map(link => (
                    <li key={link.href}>
                       <Link 
                         href={withLocale(link.href)} 
                         className="group relative inline-flex items-center gap-2 text-sm text-zinc-400 transition-all duration-300 hover:text-white hover:translate-x-1"
                       >
                          <span className="h-1 w-1 rounded-full bg-zinc-700 transition-all duration-300 group-hover:bg-[#ff8a3c] group-hover:scale-125" />
                          {link.label}
                       </Link>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Social */}
           <div className="space-y-5">
              <h4 
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-[11px] uppercase tracking-[0.2em] text-[#ff8a3c] flex items-center gap-2"
              >
                <span className="h-[1px] w-3 bg-[#ff8a3c]" />
                {t("Sosiaalinen", "Social")}
              </h4>
              <ul className="space-y-3">
                 {SOCIALS.map(link => (
                    <li key={link.label}>
                       <a 
                         href={link.href} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="group relative inline-flex items-center gap-2 text-sm text-zinc-400 transition-all duration-300 hover:text-white hover:translate-x-1"
                       >
                          <span className="h-1 w-1 rounded-full bg-zinc-700 transition-all duration-300 group-hover:bg-[#ff8a3c] group-hover:scale-125" />
                          {link.label}
                       </a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Contact Info */}
           <div className="col-span-2 space-y-5">
              <h4 
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-[11px] uppercase tracking-[0.2em] text-[#ff8a3c] flex items-center gap-2"
              >
                <span className="h-[1px] w-3 bg-[#ff8a3c]" />
                {t("Yhteystiedot", "Contact")}
              </h4>
              <div className="grid gap-6 sm:grid-cols-2">
                 <div className="group space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">{t("Sähköposti", "Email")}</p>
                    <a 
                      href={`mailto:${email}`} 
                      className="block text-sm text-white transition-colors duration-300 hover:text-[#ff8a3c]"
                    >
                       {email}
                    </a>
                 </div>
                 {phoneMain && (
                   <div className="group space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-600">{t("Puhelin", "Phone")}</p>
                      <a 
                        href={`tel:${phoneMain.replace(/\s/g, "")}`} 
                        className="block text-sm text-white transition-colors duration-300 hover:text-[#ff8a3c]"
                      >
                         {phoneMain}
                      </a>
                   </div>
                 )}
                 {phoneTechnical && (
                   <div className="group space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-600">{t("Tekninen tuki", "Technical")}</p>
                      <a 
                        href={`tel:${phoneTechnical.replace(/\s/g, "")}`} 
                        className="block text-sm text-white transition-colors duration-300 hover:text-[#ff8a3c]"
                      >
                         {phoneTechnical}
                      </a>
                   </div>
                 )}
                 {businessId && (
                   <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-600">{t("Y-tunnus", "Business ID")}</p>
                      <p className="text-sm text-zinc-400">{businessId}</p>
                   </div>
                 )}
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">{t("Sijainti", "Location")}</p>
                    <p className="text-sm text-zinc-400">{location}</p>
                 </div>
              </div>
           </div>

        </div>

        {/* === BOTTOM ROW: COPYRIGHT & LEGAL === */}
        <div className="relative pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
           
            {/* Left: Copyright */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff8a3c] opacity-40 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff8a3c]" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-600">
                  System Online
                </span>
              </div>
              <span className="text-zinc-800">•</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-600">
                © {currentYear} {companyName}
              </span>
            </div>

            {/* Right: Legal Links */}
            <div className="flex items-center gap-6">
               {LEGAL_LINKS.map(link => (
                  <Link 
                    key={link.href} 
                    href={withLocale(link.href)} 
                    className="text-[10px] uppercase tracking-wider text-zinc-600 transition-colors duration-300 hover:text-[#ff8a3c]"
                  >
                     {link.label}
                  </Link>
               ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}