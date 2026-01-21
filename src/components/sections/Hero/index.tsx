import { sanityClient } from "@/sanity/config";
import { heroSettingsQuery, heroBannersQuery } from "@/sanity/queries";
import HeroContent from "./Content";

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

type HeroBanner = {
  _id: string;
  message_fi: string;
  message_en: string;
  link?: string;
  linkText_fi?: string;
  linkText_en?: string;
  variant: "info" | "warning" | "success" | "urgent" | "promo";
  icon: "none" | "info" | "warning" | "megaphone" | "sparkles" | "clock";
};

type HeroSettings = {
  heroEyebrow_fi?: string | null;
  heroEyebrow_en?: string | null;
  heroTitleStart_fi?: string | null;
  heroTitleStart_en?: string | null;
  heroTitleAccent_fi?: string | null;
  heroTitleAccent_en?: string | null;
  heroRotatingWords_fi?: string[] | null;
  heroRotatingWords_en?: string[] | null;
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

  // Fetch hero settings and banners in parallel
  const [cms, banners] = await Promise.all([
    sanityClient.fetch<HeroSettings | null>(heroSettingsQuery),
    sanityClient.fetch<HeroBanner[]>(heroBannersQuery),
  ]);

  const heroSettings = cms ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi 
    ? heroSettings.heroEyebrow_fi || m.eyebrow 
    : heroSettings.heroEyebrow_en || m.eyebrow;
  const titleStart = isFi 
    ? heroSettings.heroTitleStart_fi || m.titleStart 
    : heroSettings.heroTitleStart_en || m.titleStart;
  const titleAccent = isFi 
    ? heroSettings.heroTitleAccent_fi || m.titleAccent 
    : heroSettings.heroTitleAccent_en || m.titleAccent;
  
  // Rotating words - fallback to some defaults if not set in Sanity
  const defaultWordsFi = ["hyvältä", "modernilta", "nopealta", "ammattimaisilta"];
  const defaultWordsEn = ["great", "modern", "fast", "professional"];
  const rotatingWords = isFi
    ? (heroSettings.heroRotatingWords_fi?.length ? heroSettings.heroRotatingWords_fi : defaultWordsFi)
    : (heroSettings.heroRotatingWords_en?.length ? heroSettings.heroRotatingWords_en : defaultWordsEn);
    
  const titleEnd = isFi 
    ? heroSettings.heroTitleEnd_fi || m.titleEnd 
    : heroSettings.heroTitleEnd_en || m.titleEnd;
  const subtitle = isFi 
    ? heroSettings.heroSubtitle_fi || m.subtitle 
    : heroSettings.heroSubtitle_en || m.subtitle;

  const primaryCta = isFi 
    ? heroSettings.heroPrimaryCta_fi || m.primaryCta 
    : heroSettings.heroPrimaryCta_en || m.primaryCta;
  const secondaryCta = isFi 
    ? heroSettings.heroSecondaryCta_fi || m.secondaryCta 
    : heroSettings.heroSecondaryCta_en || m.secondaryCta;

  // Get video URLs from CMS
  const heroDesktopVideo = heroSettings.heroDesktopVideo || null;
  const heroMobileVideo = heroSettings.heroMobileVideo || null;

  // Transform banners for the current locale
  const localizedBanners = (banners || []).map((banner) => ({
    id: banner._id,
    message: isFi ? banner.message_fi : banner.message_en,
    link: banner.link,
    linkText: isFi ? banner.linkText_fi : banner.linkText_en,
    variant: banner.variant,
    icon: banner.icon,
  }));

  return (
    <HeroContent
      eyebrow={eyebrow}
      titleStart={titleStart}
      titleAccent={titleAccent}
      rotatingWords={rotatingWords}
      titleEnd={titleEnd}
      subtitle={subtitle}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      banners={localizedBanners}
      heroDesktopVideo={heroDesktopVideo}
      heroMobileVideo={heroMobileVideo}
    />
  );
}