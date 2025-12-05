import Link from "next/link";
import { sanityClient } from "@/sanity/config";
import { heroSettingsQuery } from "@/sanity/queries";
import HeroAdjective from "@/components/HeroAdjective";
import TechTicker from "@/components/TechTicker";
import { ArrowRight } from "lucide-react";

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

// --- NEW COMPONENT: The "Circle Expand & Arrow Swap" Button (Fixed Physics) ---
const AnimatedHeroButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link
      href={href}
      className={`
        group relative flex items-center justify-center gap-2 overflow-hidden
        
        /* MATCHING CSS: Padding & Base Shape */
        px-9 py-4 
        rounded-[100px] /* Fixed pixel value allows smooth interpolation */
        bg-transparent
        
        /* MATCHING CSS: Typography */
        text-base font-semibold uppercase tracking-widest text-zinc-100
        
        /* MATCHING CSS: Box Shadow Border Logic */
        /* Initial: 2px border simulation */
        shadow-[0_0_0_2px_theme('colors.zinc.200/20')]
        
        /* MATCHING CSS: Transition (0.6s for container) */
        transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
        
        /* --- HOVER STATES --- */
        /* Morph shape to 12px */
        hover:rounded-[12px] 
        /* "Explode" the shadow border outwards to transparent (12px spread) */
        hover:shadow-[0_0_0_12px_transparent]
        /* Text color change */
        hover:text-white
        
        /* --- ACTIVE STATE --- */
        active:scale-95
        active:shadow-[0_0_0_4px_theme('colors.fuchsia.500')]
      `}
    >
      {/* 1. The Expanding Circle Background */
       /* MATCHING CSS: .animated-button .circle */
      }
      <span
        className={`
          absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2
          h-5 w-5 rounded-full bg-gradient-to-r ${BRAND_GRADIENT} opacity-0
          
          /* Transition: 0.8s for children */
          transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          
          /* Hover: Expand to 220px+ and fade in */
          group-hover:h-[300px] group-hover:w-[300px] group-hover:opacity-100
        `}
      />

      {/* 2. The Text */
       /* MATCHING CSS: .animated-button .text (translateX -12px to 12px) */
      }
      <span className="
        relative z-10 -translate-x-3
        transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
        group-hover:translate-x-3
      ">
        {text}
      </span>

      {/* 3. Arrow 1 (Right Arrow) */
       /* MATCHING CSS: .animated-button .arr-1 */
      }
      <ArrowRight
        className="
          absolute right-4 z-10 h-5 w-5
          transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:-right-[25%]
        "
      />

      {/* 4. Arrow 2 (Left Arrow) */
       /* MATCHING CSS: .animated-button .arr-2 */
      }
      <ArrowRight
        className="
          absolute -left-[25%] z-10 h-5 w-5
          transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:left-4
        "
      />
    </Link>
  );
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
          
          {/* PRIMARY CTA: Using the fixed Animated Button */}
          <AnimatedHeroButton 
            text={ctaPrimary} 
            href={href("/contact")} 
          />

          {/* SECONDARY CTA: Glassmorphic Ghost Pill */}
          <Link
            href={href("/work")}
            className="
              group relative inline-flex items-center gap-2 overflow-hidden rounded-full
              border border-white/10 bg-white/5 px-8 py-4
              text-sm font-bold uppercase tracking-widest text-zinc-300
              backdrop-blur-md transition-all duration-300 cubic-bezier(0.23, 1, 0.32, 1)
              hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
              active:scale-95
            "
          >
            {ctaSecondary}
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 transition-colors group-hover:bg-cyan-400" />
          </Link>
        </div>

        {/* Tech Ticker */}
        <div className="mt-4 sm:mt-6">
            <TechTicker text={techLine} />
        </div>
      </div>
    </section>
  );
}