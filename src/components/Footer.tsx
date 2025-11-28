import Link from "next/link";
import { sanityClient } from "@/sanity/config";
import { contactSettingsQuery } from "@/sanity/queries";

const currentYear = new Date().getFullYear();

type FooterMessages = {
  companyName: string;
  tagline: string;
  navigationTitle: string;
  contactTitle: string;
  heroLink: string;
  whyUsLink: string;
  processLink: string;
  servicesLink: string;
  workLink: string;
  pricingLink: string;
  contactLink: string;
  rights: string;
  madeIn: string;
};

type MessagesFile = {
  footer: FooterMessages;
};

type ContactSettings = {
  contactEmail?: string | null;
  contactPhone?: string | null;
};

export default async function Footer({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.footer;

  const cms =
    (await sanityClient.fetch<ContactSettings | null>(
      contactSettingsQuery
    )) ?? {};

  const email = cms.contactEmail || "hello@digipaja.fi";
  const phone = cms.contactPhone || "";

  const basePath = `/${locale}`;

  const navLinks = [
    { href: `${basePath}#hero`, label: m.heroLink },
    { href: `${basePath}#why-us`, label: m.whyUsLink },
    { href: `${basePath}#process`, label: m.processLink },
    { href: `${basePath}#services`, label: m.servicesLink },
    { href: `${basePath}#work`, label: m.workLink },
    { href: `${basePath}#pricing`, label: m.pricingLink },
    { href: `${basePath}#contact`, label: m.contactLink },
  ];

  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)] py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Brand */}
          <div className="space-y-3">
            <p
              style={{ fontFamily: "var(--font-clash-display)" }}
              className="text-lg font-medium tracking-tight text-zinc-50"
            >
              {m.companyName}
            </p>
            <p className="max-w-md text-sm text-zinc-400">{m.tagline}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {m.navigationTitle}
            </p>
            <nav className="mt-3 space-y-2 text-sm text-zinc-400">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-zinc-100"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {m.contactTitle}
            </p>
            <div className="mt-3 space-y-2 text-sm text-zinc-400">
              {email && (
                <p>
                  <span className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                    Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-zinc-200 underline underline-offset-2 hover:text-fuchsia-300"
                  >
                    {email}
                  </a>
                </p>
              )}
              {phone && (
                <p>
                  <span className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                    Puhelin
                  </span>
                  <span className="text-zinc-200">{phone}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-900 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {m.companyName}. {m.rights}
          </p>
          <p>{m.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
