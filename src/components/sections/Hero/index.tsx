import Link from "next/link";
import { sanityClient } from "@/sanity/config";
import { heroSettingsQuery } from "@/sanity/queries";
import HeroAdjective from "./Adjective";
import TechTicker from "@/components/ui/TechTicker";
// IMPORT THE NEW COMPONENT
import HeroLinkCTA from "./HeroContent"; 

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

const BRAND_GRADIENT = "from-purple-500 via-fuchsia-500 to-cyan-500";

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

  const rotatingWords = isFi
    ? ["Modernit", "Luotettavat", "Tyylikkäät", "Optimoidut"]
    : ["Modern", "Reliable", "Stylish", "Optimized"];

  const [, ...restWords] = title.split(" ");
  const restTitle = restWords.join(" ");

  return (
    <section
      id="hero"
      className="relative h-[100dvh] w-full overflow-hidden bg-[#050505] text-zinc-50 flex flex-col justify-center"
    >
      {/* Background VIDEO */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/media/hero2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050505]" aria-hidden />

      {/* Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[40%] h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[120px]"
      />

      {/* Content Container */}
      <div 
        className="
          relative z-10 mx-auto flex h-full w-full max-w-7xl 
          flex-col justify-center 
          px-[clamp(16px,8vw,80px)]
          pt-20
          gap-6 sm:gap-8 lg:gap-10
        "
      >
        
        {/* Title */}
        <h1
          style={{ fontFamily: "var(--font-clash-display)" }}
          className="flex flex-col gap-2 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          <span className={`block w-fit bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
            <HeroAdjective words={rotatingWords} />
          </span>
          
          <span className="block max-w-[15em] text-white drop-shadow-2xl">
            {restTitle}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-base text-zinc-400 font-light leading-relaxed sm:text-lg lg:text-xl">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-5">
          
          {/* PRIMARY CTA: The animated showpiece */}
          <HeroLinkCTA 
            text={ctaPrimary} 
            href={href("/contact")} 
          />
        </div>

        {/* Tech Ticker */}
        <div className="mt-4 sm:mt-6">
            <TechTicker text={techLine} />
        </div>
      </div>
    </section>
  );
}