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

export default function Navbar({ locale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Helper: Are we on the homepage? (root "/" or "/fi" or "/en")
  const isHomePage = pathname === `/${locale}` || pathname === "/" || pathname === `/${locale}/`;

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

        {/* RIGHT: CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          
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