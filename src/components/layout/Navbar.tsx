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
// Styled language button with sharp angular frame
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
      className="group relative cursor-pointer"
      aria-label={label}
      title={title}
    >
      {/* Outer angular frame */}
      <div 
        className={`
          relative flex items-center justify-center
          transition-all duration-300
          ${scrolled ? "h-7 w-10" : "h-8 w-11"}
        `}
        style={{
          clipPath: "polygon(12% 0%, 100% 0%, 100% 75%, 88% 100%, 0% 100%, 0% 25%)",
        }}
      >
        {/* Background glow for active */}
        <div 
          className={`
            absolute inset-0 transition-opacity duration-300
            ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
          `}
          style={{
            background: "linear-gradient(135deg, rgba(255,138,60,0.3) 0%, rgba(255,138,60,0.1) 100%)",
          }}
        />
        
        {/* Border frame */}
        <div 
          className={`
            absolute inset-0 transition-all duration-300
            ${isActive 
              ? "bg-gradient-to-br from-[#ff8a3c] via-[#ff8a3c]/60 to-[#ff8a3c]" 
              : "bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-600 group-hover:from-[#ff8a3c]/50 group-hover:to-[#ff8a3c]/50"
            }
          `}
          style={{
            clipPath: "polygon(12% 0%, 100% 0%, 100% 75%, 88% 100%, 0% 100%, 0% 25%)",
          }}
        />
        
        {/* Inner content area */}
        <div 
          className={`
            absolute inset-[2px] flex items-center justify-center overflow-hidden
            bg-[#0a0c10] transition-all duration-300
            ${!isActive && "group-hover:bg-[#0f1218]"}
          `}
          style={{
            clipPath: "polygon(12% 0%, 100% 0%, 100% 75%, 88% 100%, 0% 100%, 0% 25%)",
          }}
        >
          {/* Flag content */}
          <div className={`
            w-full h-full transition-all duration-300
            ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"}
          `}>
            {children}
          </div>
        </div>
        
        {/* Active indicator dot */}
        {isActive && (
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#ff8a3c] shadow-[0_0_6px_rgba(255,138,60,0.8)]" />
        )}
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

  // --- THE SCROLL HANDLER (Prevents Empty Space Bug) ---
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
              className="group relative cursor-pointer text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              {t(item.labelFi, item.labelEn)}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#ff8a3c] transition-all duration-300 group-hover:w-full" />
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
              <FinnishFlag className="h-full w-full scale-125" />
            </LanguageButton>
            <LanguageButton
              isActive={locale === "en"}
              onClick={() => switchLocale("en")}
              label="Switch to English"
              title="English"
              scrolled={scrolled}
            >
              <UKFlag className="h-full w-full scale-125" />
            </LanguageButton>
          </div>
          
          {/* DESKTOP CONTACT BUTTON */}
          <Link
            href={`/${locale}/yhteydenotto`}
            className={`
               cyber-btn relative place-content-center hidden md:inline-grid 
               ${scrolled ? "text-[12px]" : "text-[15px]"}
            `}
          >
            {t("Ota yhteyttä", "Contact")}
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