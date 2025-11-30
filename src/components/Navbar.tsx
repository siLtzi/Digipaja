"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollSmoother);

type NavbarProps = {
  locale: "fi" | "en";
};

export default function Navbar({ locale }: NavbarProps) {
  const base = `/${locale}`;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const links = [
    { key: "whyUs", id: "why-us" },
    { key: "process", id: "process" },
    { key: "services", id: "services" },
    { key: "work", id: "work" },
    { key: "pricing", id: "pricing" },
  ];

  const scrollToSection = (id: string) => {
    const selector = `#${id}`;
    const smoother = ScrollSmoother.get();
    const target = document.querySelector(selector) as HTMLElement | null;

    if (smoother && target) {
      smoother.scrollTo(target, true, "top top"); // smooth scroll with GSAP
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Update URL hash without full navigation
    if (typeof window !== "undefined") {
      const newUrl = `${base}#${id}`;
      window.history.pushState(null, "", newUrl);
    }
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    closeMenu();
  };

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? "border-b border-zinc-900 bg-black/80 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        }
      `}
    >
      <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)]">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-18">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href={base} className="flex items-center gap-2">
              <span
                style={{ fontFamily: "var(--font-clash-display)" }}
                className="text-base font-medium tracking-tight text-zinc-50 sm:text-lg"
              >
                Digipaja
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400 whitespace-nowrap transition hover:text-zinc-50 cursor-pointer"
              >
                {tNav(link.key)}
              </button>
            ))}
          </nav>

          {/* Right: CTA + burger */}
          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <div className="hidden sm:flex">
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="inline-flex items-center justify-center rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-medium text-zinc-950 shadow-sm ring-1 ring-zinc-900/10 transition hover:-translate-y-[1px] hover:shadow-md dark:bg-zinc-100 cursor-pointer"
              >
                {tCta("primary")}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="ml-1 inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 p-1.5 text-zinc-200 hover:border-zinc-500 hover:text-zinc-50 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="flex flex-col gap-[3px]">
                <span
                  className={`h-[2px] w-4 rounded-full bg-current transition ${
                    menuOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-[2px] w-4 rounded-full bg-current transition ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-[2px] w-4 rounded-full bg-current transition ${
                    menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-zinc-900 bg-black/95 md:hidden">
          <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)]">
            <nav className="flex flex-col gap-2 py-4 text-sm">
              {links.map((link) => (
                <button
                  key={link.key}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className="py-1 text-left text-sm font-medium text-zinc-200 transition hover:text-zinc-50"
                >
                  {tNav(link.key)}
                </button>
              ))}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleNavClick("contact")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-950 shadow-sm ring-1 ring-zinc-900/10"
                >
                  {tCta("primary")}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
