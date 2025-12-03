import Link from "next/link";
import { sanityClient } from "@/sanity/config";
import { heroSettingsQuery } from "@/sanity/queries";
import HeroAdjective from "@/components/HeroAdjective";

type HeroMessages = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  techLine: string;
};

type MessagesFile = {
  hero: HeroMessages;
};

type HeroSettings = {
  heroTitle_fi?: string | null;
  heroSubtitle_fi?: string | null;
  heroCtaPrimary_fi?: string | null;
  heroCtaSecondary_fi?: string | null;
  heroTechLine_fi?: string | null;
};

export default async function Hero({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.hero;

  const cms =
    (await sanityClient.fetch<HeroSettings | null>(heroSettingsQuery)) ?? {};

  const isFi = locale === "fi";
  const title = isFi ? cms.heroTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.heroSubtitle_fi || m.subtitle : m.subtitle;
  const ctaPrimary = isFi
    ? cms.heroCtaPrimary_fi || m.ctaPrimary
    : m.ctaPrimary;
  const ctaSecondary = isFi
    ? cms.heroCtaSecondary_fi || m.ctaSecondary
    : m.ctaSecondary;
  const techLine = isFi ? cms.heroTechLine_fi || m.techLine : m.techLine;

  const href = (path: string) => `/${locale}${path}`;

  // --- ROTATING ADJECTIVE SETUP ---
  const rotatingWords = isFi
    ? ["Modernit", "Luotettavat", "Tyylikkäät", "Optimoidut"]
    : ["Modern", "Reliable", "Stylish", "Optimized"];

  // Drop the first word from the CMS title
  const [, ...restWords] = title.split(" ");
  const restTitle = restWords.join(" ");

  const techIcons: Record<string, string> = {
    animaatiot: "/tech/gsap.svg",
    nextjs: "/tech/nextjs.svg",
    monikielisyys: "/tech/monikielisyys.svg",
    tailwind: "/tech/tailwind.svg",
    typescript: "/tech/typescript.svg",
    sanity: "/tech/sanity.svg",
    node: "/tech/node.svg",
    vercel: "/tech/vercel.svg",
  };

  function renderTechWithIcons(text: string) {
    const words = text.split(/(\s+)/); // keep spaces intact

    return words.map((word, i) => {
      const clean = word.toLowerCase().replace(/[^a-zäöå]/g, "");

      if (techIcons[clean]) {
        return (
          <span key={i} className="inline-flex items-center gap-1">
            <img
              src={techIcons[clean]}
              alt={clean}
              className="h-4 w-4 opacity-80 object-contain"
            />
            {word}
          </span>
        );
      }

      return <span key={i}>{word}</span>;
    });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-zinc-50"
    >
      {/* Background VIDEO */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/media/hero2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay on top of video for readability */}
      <div className="absolute inset-0 bg-black/70" aria-hidden />

      {/* Gradient glows */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top,_rgba(244,244,245,0.16),_transparent_55%)]
        "
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-fuchsia-600/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-10 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl"
      />

      {/* Content */}
      <div
        className="
          relative z-10 mx-auto flex min-h-screen max-w-6xl
          flex-col justify-center gap-10
          px-[clamp(16px,8vw,80px)] py-24
        "
      >
        {/* Title with rotating first word */}
        <h1
          style={{ fontFamily: "var(--font-clash-display)" }}
          className="flex flex-col gap-2 text-4xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {/* Row 1: The Rotating Adjective */}
          <span className="block w-fit">
            <HeroAdjective words={rotatingWords} />
          </span>

          {/* Row 2 & 3: The Rest of the Title */}
          {/* max-w-[17em] ensures it breaks into 2 lines regardless of screen size */}
          <span className="block max-w-[17em] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {restTitle}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-base text-zinc-200 sm:text-lg">
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
        <div className="pt-4 text-xs text-zinc-300 sm:text-sm flex items-center gap-2 flex-wrap">
          {renderTechWithIcons(techLine)}
        </div>
      </div>
    </section>
  );
}