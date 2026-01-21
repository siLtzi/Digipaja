"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Only used for logo to reset URL if needed
import { usePathname, useRouter } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother"; // Import GSAP Smoother
import LogoMark from "@/components/LogoMark";

type NavbarProps = {
  locale: "fi" | "en";
};

type NavItem = {
  id: string;
  href: string; // This is an ID like "services"
  labelFi: string;
  labelEn: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "about-us", href: "about-us", labelFi: "Meistä", labelEn: "About" },
  { id: "services", href: "services", labelFi: "Palvelut", labelEn: "Services" },
  { id: "references", href: "references", labelFi: "Työt", labelEn: "Work" },
  { id: "process", href: "process", labelFi: "Prosessi", labelEn: "Process" },
  { id: "why-us", href: "why-us", labelFi: "Miksi Me?", labelEn: "Why Us?" },
  { id: "pricing", href: "pricing", labelFi: "Hinnasto", labelEn: "Pricing" },
];

// Flag components
// Corner bracket style language button (matches hero CTA)
function LanguageButton({ 
  isActive, 
  onClick, 
  label, 
  title,
  children,
  scrolled 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  label: string;
  title: string;
  children: React.ReactNode;
  scrolled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative cursor-pointer isolate
        transition-all duration-200
        ${scrolled ? "h-5 w-7 p-0.5" : "h-6 w-8 p-0.5"}
        ${isActive ? "" : "opacity-50 hover:opacity-90"}
      `}
      aria-label={label}
      title={title}
    >
      {/* Corner brackets */}
      <span className={`absolute left-0 top-0 h-1.5 w-1.5 border-l border-t transition-all duration-300 ${isActive ? "border-[#ff8a3c]" : "border-white/30 group-hover:border-white/60"} group-hover:h-full group-hover:w-full`} />
      <span className={`absolute right-0 top-0 h-1.5 w-1.5 border-r border-t transition-all duration-300 ${isActive ? "border-[#ff8a3c]" : "border-white/30 group-hover:border-white/60"} group-hover:h-full group-hover:w-full`} />
      <span className={`absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r transition-all duration-300 ${isActive ? "border-[#ff8a3c]" : "border-white/30 group-hover:border-white/60"} group-hover:h-full group-hover:w-full`} />
      <span className={`absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l transition-all duration-300 ${isActive ? "border-[#ff8a3c]" : "border-white/30 group-hover:border-white/60"} group-hover:h-full group-hover:w-full`} />
      
      {/* Background glow on hover/active */}
      <span className={`absolute inset-0 -z-10 transition-opacity duration-300 ${isActive ? "bg-[#ff8a3c]/10 opacity-100" : "bg-white/5 opacity-0 group-hover:opacity-100"}`} />
      
      {/* Flag content */}
      <div className="relative z-10 w-full h-full overflow-hidden rounded-[1px]">
        {children}
      </div>
    </button>
  );
}

function FinnishFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
      <rect width="36" height="24" fill="#fff" />
      <rect x="10" width="6" height="24" fill="#003580" />
      <rect y="9" width="36" height="6" fill="#003580" />
    </svg>
  );
}

function UKFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <clipPath id="uk-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export default function Navbar({ locale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Helper: Are we on the homepage? (root "/" or "/fi" or "/en")
  const isHomePage = pathname === `/${locale}` || pathname === "/" || pathname === `/${locale}/`;

  // Language switcher: swap locale in current path
  const switchLocale = (newLocale: "fi" | "en") => {
    if (newLocale === locale) return;
    
    // Replace current locale with new one in the path
    const segments = pathname.split("/");
    if (segments[1] === "fi" || segments[1] === "en") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTo = (targetId: string) => {
    setMenuOpen(false);

    // 1. If not on homepage, go there first
    if (!isHomePage) {
      router.push(`/${locale}#${targetId}`);
      return;
    }

    // 2. Find element
    const el = document.getElementById(targetId);
    if (!el) return;

    // 3. Use GSAP Smoother if available (Fixes the sync bug)
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(el, true, "top 100px"); // Offset for header height
    } else {
      // Mobile / Fallback
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const t = (fi: string, en: string) => (locale === "fi" ? fi : en);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-300 ease-in-out
        border-b
        ${
          scrolled || menuOpen
            ? "border-white/10 bg-[#050609]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "border-transparent bg-transparent"
        }
      `}
    >
      <div
        className={`
          mx-auto flex max-w-7xl items-center justify-between px-6 
          transition-all duration-300 ease-in-out
          ${scrolled ? "py-2.5" : "py-5"} 
        `}
      >
        {/* LEFT: Logo */}
        <button
          onClick={() => {
            if (isHomePage) {
              // On homepage, scroll to top and refresh
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => {
                window.location.reload();
              }, 500);
            } else {
              // Not on homepage, navigate there
              router.push(`/${locale}`);
            }
          }}
          className="group flex items-center gap-2 focus:outline-none cursor-pointer min-w-0"
          aria-label="Digipaja – etusivu"
        >
          <div
            className={`
              relative flex items-center
              transition-all duration-300 ease-in-out
              text-white fill-current
              max-w-[60vw]
              overflow-visible
              ${scrolled ? "h-9 w-auto" : "h-16 w-auto"}
            `}
          >
            <LogoMark />
          </div>
        </button>

        {/* CENTER: Desktop Nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label={t("Päävalikko", "Main navigation")}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollTo(item.href)}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="group relative cursor-pointer text-[13px] font-semibold uppercase tracking-[0.15em] text-zinc-300 transition-colors duration-300 hover:text-white"
            >
              {t(item.labelFi, item.labelEn)}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#ff8a3c] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* RIGHT: Language Switcher, CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* LANGUAGE SWITCHER - Hidden on mobile, shown in dropdown instead */}
          <div className="hidden md:flex items-center gap-1">
            <LanguageButton
              isActive={locale === "fi"}
              onClick={() => switchLocale("fi")}
              label="Vaihda suomeksi"
              title="Suomi"
              scrolled={scrolled}
            >
              <FinnishFlag className="h-full w-full" />
            </LanguageButton>
            <LanguageButton
              isActive={locale === "en"}
              onClick={() => switchLocale("en")}
              label="Switch to English"
              title="English"
              scrolled={scrolled}
            >
              <UKFlag className="h-full w-full" />
            </LanguageButton>
          </div>
          
          {/* DESKTOP CONTACT BUTTON - Hero style with corner brackets */}
          <Link
            href={`/${locale}/yhteydenotto`}
            style={{ fontFamily: "var(--font-goldman)" }}
            className={`
              group relative isolate hidden md:flex items-center gap-2 cursor-pointer
              font-bold uppercase tracking-[0.12em] text-[#ff8a3c] 
              transition-colors duration-300 hover:text-white
              ${scrolled ? "text-[10px] px-4 py-2" : "text-[11px] px-5 py-2.5"}
            `}
          >
            <span className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            <span className="relative z-10">{t("Ota yhteyttä", "Contact")}</span>
            <svg className="relative z-10 h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none"><path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`
              group flex items-center justify-center
              cursor-pointer shrink-0
              rounded-sm border border-white/10
              bg-white/5
              text-zinc-200
              transition-all duration-300
              hover:border-[#ff8a3c] hover:text-[#ff8a3c]
              md:hidden
              ${scrolled ? "h-8 w-8" : "h-10 w-10"}
            `}
            aria-label={t("Avaa valikko", "Toggle menu")}
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`
          overflow-hidden border-b border-white/10 bg-[#050609] transition-all duration-300 md:hidden
          ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollTo(item.href)}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="cursor-pointer border-l-2 border-transparent py-3 pl-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 transition-all hover:border-[#ff8a3c] hover:bg-white/5 hover:text-white"
            >
              {t(item.labelFi, item.labelEn)}
            </button>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="mt-4 flex items-center justify-center gap-3 border-t border-white/10 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
              {t("Kieli", "Language")}
            </span>
            <div className="flex gap-2">
              <LanguageButton
                isActive={locale === "fi"}
                onClick={() => {
                  switchLocale("fi");
                  setMenuOpen(false);
                }}
                label="Vaihda suomeksi"
                title="Suomi"
              >
                <FinnishFlag className="h-full w-full scale-125" />
              </LanguageButton>
              <LanguageButton
                isActive={locale === "en"}
                onClick={() => {
                  switchLocale("en");
                  setMenuOpen(false);
                }}
                label="Switch to English"
                title="English"
              >
                <UKFlag className="h-full w-full scale-125" />
              </LanguageButton>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center border-t border-white/10 pt-6">
            <Link
              href={`/${locale}/yhteydenotto`}
              className="cyber-btn text-[14px]"
            >
              {t("Ota yhteyttä", "Contact")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}