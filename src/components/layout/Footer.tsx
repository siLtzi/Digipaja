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
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020203] text-zinc-400">
      {/* === TOP "DATA BEAM" === */}
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-[#ff8a3c]/70 to-transparent" />
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-[#ff8a3c] to-transparent opacity-30 blur-sm" />

      {/* === BACKGROUND DECOR === */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size-[26px_26px] opacity-20" />
        <div className="absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.08)_4px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020203_72%)]" />
        <div className="absolute left-1/2 bottom-0 h-[320px] w-[720px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#ff8a3c]/7 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-16 lg:pt-24">
        {/* === TOP SECTION: BRAND + CTA === */}
        <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-6">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 group">
              <div className="h-8 w-auto text-white transition-transform duration-300 group-hover:scale-[1.03]">
                <LogoMark />
              </div>

              {/* was pill -> make it a hard "system tag" */}
              <span className="border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-300">
                {t("Järjestelmä: ONLINE", "System: ONLINE")}
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
              {t(
                "Rakennamme huippunopeita verkkopalveluita moderneilla teknologioilla. Ei turhaa säätöä, vain tuloksia.",
                "Building high-performance web solutions with modern tech. No nonsense, just results."
              )}
            </p>

            {/* Tiny tech metadata row — remove rounding to avoid “pill” feel */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
              {["NEXT", "SANITY", "GSAP", "LIGHTHOUSE 90+"].map((x) => (
                <span
                  key={x}
                  className="border border-white/10 bg-white/5 px-2 py-1"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>

          {/* CTA block */}
          <div className="flex flex-col items-start justify-center lg:items-end">
            <h2
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-2xl font-bold uppercase leading-tight text-white sm:text-3xl lg:text-4xl lg:text-right"
            >
              {t("Valmiina aloittamaan?", "Ready to start?")}
            </h2>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href={`/${locale}/contact`}
                className="
                  group relative inline-flex items-center justify-center overflow-hidden rounded-sm
                  border border-[#ff8a3c]/50 bg-[#ff8a3c]/10 px-5 py-3
                  text-xs font-bold uppercase tracking-widest text-white
                  transition hover:border-[#ff8a3c] hover:bg-[#ff8a3c]/15
                "
                style={{ fontFamily: "var(--font-goldman)" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("Pyydä tarjous", "Get a Quote")}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
                </span>

                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent group-hover:animate-[shimmer_1.1s_infinite]" />
              </Link>

              {/* ✅ removed “Katso case” */}
            </div>
          </div>
        </div>

        {/* === LINKS GRID === */}
        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-12 md:grid-cols-4">
          {/* Nav */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              {t("Navigaatio", "Navigation")}
            </h3>

            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  {/* add group here so group-hover works */}
                  <Link
                    href={withLocale(link.href)}
                    className="group inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
                  >
                    <span className="h-px w-3 bg-[#ff8a3c]/50 opacity-0 transition group-hover:opacity-100" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#ff8a3c]/70 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              {t("Seuraa meitä", "Follow Us")}
            </h3>
            <ul className="space-y-2 text-sm">
              {SOCIALS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-zinc-400 transition hover:text-[#ff8a3c]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 space-y-4 md:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              {t("Yhteystiedot", "Contact Info")}
            </h3>

            <div className="grid gap-2 text-sm">
              <a
                href="mailto:contact@digipaja.fi"
                className="font-mono text-zinc-400 hover:text-[#ff8a3c] transition"
              >
                contact@digipaja.fi
              </a>
              <a
                href="tel:+358401234567"
                className="font-mono text-zinc-400 hover:text-[#ff8a3c] transition"
              >
                +358 40 123 4567
              </a>

              <div className="pt-2 text-xs text-zinc-600">
                <span className="font-mono uppercase tracking-widest">ID:</span>{" "}
                Y-tunnus 1234567-8
                <br />
                <span className="font-mono uppercase tracking-widest">LOC:</span>{" "}
                Oulu, Finland
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM BAR === */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-zinc-600 md:flex-row">
          <p className="font-mono">
            © {currentYear} DIGIPAJA //{" "}
            {t("Kaikki oikeudet pidätetään.", "All rights reserved.")}
          </p>

          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={withLocale(link.href)}
                className="font-mono uppercase tracking-widest text-zinc-600 hover:text-zinc-300 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </footer>
  );
}
