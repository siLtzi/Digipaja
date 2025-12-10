import { sanityClient } from "@/sanity/config";
import { whyUsSettingsQuery } from "@/sanity/queries";
import WhyUsContent from "./Content";

type Card = {
  title_fi: string;
  title_en: string;
  description_fi: string;
  description_en: string;
  icon: string;
};

type WhyUsSettings = {
  whyUsEyebrow_fi?: string;
  whyUsEyebrow_en?: string;
  whyUsTitle_fi?: string;
  whyUsTitle_en?: string;
  whyUsSubtitle_fi?: string;
  whyUsSubtitle_en?: string;
  cards?: Card[];
};

type MessagesFile = {
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: Array<{ title: string; description: string; icon: string }>;
  };
};

export default async function WhyUs({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.whyUs;

  const cms =
    (await sanityClient.fetch<WhyUsSettings | null>(whyUsSettingsQuery)) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.whyUsEyebrow_fi || m.eyebrow : cms.whyUsEyebrow_en || m.eyebrow;
  const title = isFi ? cms.whyUsTitle_fi || m.title : cms.whyUsTitle_en || m.title;
  const subtitle = isFi ? cms.whyUsSubtitle_fi || m.subtitle : cms.whyUsSubtitle_en || m.subtitle;

  const rawCards = cms.cards || [];
  const cards = rawCards.length > 0
    ? rawCards.map((c) => ({
        title: isFi ? c.title_fi : c.title_en,
        description: isFi ? c.description_fi : c.description_en,
        icon: c.icon,
      }))
    : m.cards;

  return (
    <WhyUsContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      cards={cards}
    />
  );
}