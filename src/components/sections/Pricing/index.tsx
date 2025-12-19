import { sanityClient } from "@/sanity/config";
import { pricingSettingsQuery } from "@/sanity/queries";
import dynamic from "next/dynamic";

const PricingContent = dynamic(() => import("./Content"));

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

type MessagesFile = {
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tiers: PricingTier[];
  };
};

type PricingSettings = {
  eyebrow_fi?: string | null;
  title_fi?: string | null;
  subtitle_fi?: string | null;
  tiers_fi?: PricingTier[] | null;
  eyebrow_en?: string | null;
  title_en?: string | null;
  subtitle_en?: string | null;
  tiers_en?: PricingTier[] | null;
};

export default async function Pricing({ locale }: { locale: "fi" | "en" }) {
  // 1. Load Local JSON (Fallback)
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.pricing;

  // 2. Fetch CMS Data
  const cms =
    (await sanityClient.fetch<PricingSettings | null>(pricingSettingsQuery)) ?? {};

  const isFi = locale === "fi";

  // 3. Merge Data: Prefer CMS, fallback to JSON
  const eyebrow = isFi 
    ? cms.eyebrow_fi || m.eyebrow 
    : cms.eyebrow_en || m.eyebrow;

  const title = isFi 
    ? cms.title_fi || m.title 
    : cms.title_en || m.title;

  const subtitle = isFi 
    ? cms.subtitle_fi || m.subtitle 
    : cms.subtitle_en || m.subtitle;

  const tiers = isFi 
    ? cms.tiers_fi || m.tiers 
    : cms.tiers_en || m.tiers;

  return (
    <PricingContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      tiers={tiers}
    />
  );
}