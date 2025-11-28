import Link from "next/link";
import { sanityClient } from "@/sanity/config";
import { heroSettingsQuery } from "@/sanity/queries";

type HeroMessages = {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  techLine: string;
};

type MessagesFile = {
  hero: HeroMessages;
  // other namespaces allowed, we only care about hero here
};

type HeroSettings = {
  heroBadge_fi?: string | null;
  heroTitle_fi?: string | null;
  heroSubtitle_fi?: string | null;
  heroCtaPrimary_fi?: string | null;
  heroCtaSecondary_fi?: string | null;
  heroTechLine_fi?: string | null;
};

export default async function Hero({ locale }: { locale: "fi" | "en" }) {
  // 1) Load i18n messages for current locale
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.hero;

  // 2) Load optional overrides from Sanity
  const cms = (await sanityClient.fetch<HeroSettings | null>(
    heroSettingsQuery
  )) ?? {};


  // 3) Decide final text values
  const isFi = locale === "fi";

  const badge = isFi ? cms.heroBadge_fi || m.badge : m.badge;
  const title = isFi ? cms.heroTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.heroSubtitle_fi || m.subtitle : m.subtitle;
  const ctaPrimary = isFi ? cms.heroCtaPrimary_fi || m.ctaPrimary : m.ctaPrimary;
  const ctaSecondary = isFi ? cms.heroCtaSecondary_fi || m.ctaSecondary : m.ctaSecondary;
  const techLine = isFi ? cms.heroTechLine_fi || m.techLine : m.techLine;

  const href = (path: string) => `/${locale}${path}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-zinc-50"
    >
      {/* Background layer(s) – purely visual, no text */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top,_rgba(244,244,245,0.16),_transparent_55%)]
        "
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl"
      />

      {/* Content */}
      <div
        className="
          relative z-10 mx-auto flex min-h-screen max-w-6xl
          flex-col justify-center gap-10
          px-[clamp(16px,8vw,80px)] py-24
        "
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-1 text-xs font-medium text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h1
          style={{ fontFamily: "var(--font-clash-display)" }}
          className="max-w-3xl text-4xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-base text-zinc-300 sm:text-lg">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <Link
            href={href("/contact")}
            className="
              inline-flex items-center justify-center
              rounded-xl bg-zinc-50 px-6 py-3 text-sm font-medium
              text-zinc-950 shadow-lg shadow-zinc-900/40
              transition hover:bg-zinc-200 hover:shadow-zinc-900/60
            "
          >
            {ctaPrimary}
          </Link>
          <Link
            href={href("/work")}
            className="
              inline-flex items-center justify-center
              rounded-xl border border-zinc-700 px-6 py-3 text-sm font-medium
              text-zinc-100 transition hover:bg-zinc-900/60
            "
          >
            {ctaSecondary}
          </Link>
        </div>

        {/* Tech line */}
        <div className="pt-4 text-xs text-zinc-400 sm:text-sm">
          <p>{techLine}</p>
        </div>
      </div>
    </section>
  );
}
