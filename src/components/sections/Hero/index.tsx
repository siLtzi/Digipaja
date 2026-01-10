import { sanityClient } from "@/sanity/config";
import { heroSettingsQuery } from "@/sanity/queries";
import HeroContent from "./Content";

// --- TYPES FOR MESSAGES FILE ---
type HeroMessages = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

type MessagesFile = {
  hero: HeroMessages;
};

// --- TYPES FOR SANITY SETTINGS ---
type HeroSettings = {
  heroEyebrow_fi?: string | null;
  heroEyebrow_en?: string | null;
  heroTitleStart_fi?: string | null;
  heroTitleStart_en?: string | null;
  heroTitleAccent_fi?: string | null;
  heroTitleAccent_en?: string | null;
  heroTitleEnd_fi?: string | null;
  heroTitleEnd_en?: string | null;
  heroSubtitle_fi?: string | null;
  heroSubtitle_en?: string | null;
  heroPrimaryCta_fi?: string | null;
  heroPrimaryCta_en?: string | null;
  heroSecondaryCta_fi?: string | null;
  heroSecondaryCta_en?: string | null;

  heroDesktopVideo?: string | null;
  heroMobileVideo?: string | null;
};

export default async function Hero({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.hero;

  const cms =
    (await sanityClient.fetch<HeroSettings | null>(heroSettingsQuery)) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi 
    ? cms.heroEyebrow_fi || m.eyebrow 
    : cms.heroEyebrow_en || m.eyebrow;
  const titleStart = isFi 
    ? cms.heroTitleStart_fi || m.titleStart 
    : cms.heroTitleStart_en || m.titleStart;
  const titleAccent = isFi 
    ? cms.heroTitleAccent_fi || m.titleAccent 
    : cms.heroTitleAccent_en || m.titleAccent;
  const titleEnd = isFi 
    ? cms.heroTitleEnd_fi || m.titleEnd 
    : cms.heroTitleEnd_en || m.titleEnd;
  const subtitle = isFi 
    ? cms.heroSubtitle_fi || m.subtitle 
    : cms.heroSubtitle_en || m.subtitle;

  const primaryCta = isFi 
    ? cms.heroPrimaryCta_fi || m.primaryCta 
    : cms.heroPrimaryCta_en || m.primaryCta;
  const secondaryCta = isFi 
    ? cms.heroSecondaryCta_fi || m.secondaryCta 
    : cms.heroSecondaryCta_en || m.secondaryCta;

  const desktopVideo = cms.heroDesktopVideo || "/video/hero.mp4";
  const mobileVideo = cms.heroMobileVideo || "/video/heromobile3.mp4";

  return (
    <HeroContent
      eyebrow={eyebrow}
      titleStart={titleStart}
      titleAccent={titleAccent}
      titleEnd={titleEnd}
      subtitle={subtitle}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      desktopVideo={desktopVideo}
      mobileVideo={mobileVideo}
    />
  );
}