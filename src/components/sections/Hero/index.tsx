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
  metricsLabel: string;
  metricsSubtitle: string;
  metricsFootnote: string;
};

type MessagesFile = {
  hero: HeroMessages;
};

// --- TYPES FOR SANITY SETTINGS ---
type HeroSettings = {
  heroEyebrow_fi?: string | null;
  heroTitleStart_fi?: string | null;
  heroTitleAccent_fi?: string | null;
  heroTitleEnd_fi?: string | null;
  heroSubtitle_fi?: string | null;
  heroPrimaryCta_fi?: string | null;
  heroSecondaryCta_fi?: string | null;
  heroMetricsLabel_fi?: string | null;
  heroMetricsSubtitle_fi?: string | null;
  heroMetricsFootnote_fi?: string | null;
  // video urls resolved in heroSettingsQuery
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

  const eyebrow = isFi ? cms.heroEyebrow_fi || m.eyebrow : m.eyebrow;
  const titleStart = isFi ? cms.heroTitleStart_fi || m.titleStart : m.titleStart;
  const titleAccent = isFi
    ? cms.heroTitleAccent_fi || m.titleAccent
    : m.titleAccent;
  const titleEnd = isFi ? cms.heroTitleEnd_fi || m.titleEnd : m.titleEnd;
  const subtitle = isFi ? cms.heroSubtitle_fi || m.subtitle : m.subtitle;

  const primaryCta = isFi
    ? cms.heroPrimaryCta_fi || m.primaryCta
    : m.primaryCta;
  const secondaryCta = isFi
    ? cms.heroSecondaryCta_fi || m.secondaryCta
    : m.secondaryCta;

  const metricsLabel = isFi
    ? cms.heroMetricsLabel_fi || m.metricsLabel
    : m.metricsLabel;
  const metricsSubtitle = isFi
    ? cms.heroMetricsSubtitle_fi || m.metricsSubtitle
    : m.metricsSubtitle;
  const metricsFootnote = isFi
    ? cms.heroMetricsFootnote_fi || m.metricsFootnote
    : m.metricsFootnote;

  // Video sources (fallback to local file if Sanity is empty)
  const desktopVideo =
    cms.heroDesktopVideo || "/video/hero.mp4";
  const mobileVideo = 
    cms.heroMobileVideo || "/video/heromobile.mp4";

  return (
    <HeroContent
      eyebrow={eyebrow}
      titleStart={titleStart}
      titleAccent={titleAccent}
      titleEnd={titleEnd}
      subtitle={subtitle}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      metricsLabel={metricsLabel}
      metricsSubtitle={metricsSubtitle}
      metricsFootnote={metricsFootnote}
      desktopVideo={desktopVideo}
      mobileVideo={mobileVideo}
    />
  );
}
