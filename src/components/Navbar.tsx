"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type NavbarProps = {
  locale: "fi" | "en";
};

export default function Navbar({ locale }: NavbarProps) {
  const base = `/${locale}`;
  const sectionHref = (hash: string) => `${base}#${hash}`;

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

  // NOTE: no "home", no "contact" here → keeps it minimal
  const links = [
    { key: "whyUs", href: sectionHref("why-us") },
    { key: "process", href: sectionHref("process") },
    { key: "services", href: sectionHref("services") },
    { key: "work", href: sectionHref("work") },
    { key: "pricing", href: sectionHref("pricing") },
  ];

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
              <Link
                key={link.key}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400 whitespace-nowrap transition hover:text-zinc-50"
              >
                {tNav(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right: CTA + burger */}
          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <div className="hidden sm:flex">
              <Link
                href={sectionHref("contact")}
                className="inline-flex items-center justify-center rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-medium text-zinc-950 shadow-sm ring-1 ring-zinc-900/10 transition hover:-translate-y-[1px] hover:shadow-md dark:bg-zinc-100"
              >
                {tCta("primary")}
              </Link>
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
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={closeMenu}
                  className="py-1 text-sm font-medium text-zinc-200 transition hover:text-zinc-50"
                >
                  {tNav(link.key)}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href={sectionHref("contact")}
                  onClick={closeMenu}
                  className="inline-flex w-full items-center justify-center rounded-full bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-950 shadow-sm ring-1 ring-zinc-900/10"
                >
                  {tCta("primary")}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
