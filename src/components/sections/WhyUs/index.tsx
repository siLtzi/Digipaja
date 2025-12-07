import { sanityClient } from "@/sanity/config";
import { whyUsSettingsQuery } from "@/sanity/queries";
import WhyUsDeck from "./Content";

// --- TYPES ---
type WhyUsMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  point1Title: string;
  point1Body: string;
  point2Title: string;
  point2Body: string;
  point3Title: string;
  point3Body: string;
  point4Title: string;
  point4Body: string;
};

type MessagesFile = {
  whyUs: WhyUsMessages;
};

type WhyUsSettings = {
  whyUsEyebrow_fi?: string | null;
  whyUsTitle_fi?: string | null;
  whyUsSubtitle_fi?: string | null;
  whyUsPoint1Title_fi?: string | null;
  whyUsPoint1Body_fi?: string | null;
  whyUsPoint2Title_fi?: string | null;
  whyUsPoint2Body_fi?: string | null;
  whyUsPoint3Title_fi?: string | null;
  whyUsPoint3Body_fi?: string | null;
  whyUsPoint4Title_fi?: string | null;
  whyUsPoint4Body_fi?: string | null;
};

export default async function WhyUs({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.whyUs;

  const cms =
    (await sanityClient.fetch<WhyUsSettings | null>(whyUsSettingsQuery)) ?? {};

  const isFi = locale === "fi";

  // Data Helper
  const eyebrow = isFi ? cms.whyUsEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.whyUsTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.whyUsSubtitle_fi || m.subtitle : m.subtitle;

  const points = [
    {
      title: isFi ? cms.whyUsPoint1Title_fi || m.point1Title : m.point1Title,
      body: isFi ? cms.whyUsPoint1Body_fi || m.point1Body : m.point1Body,
    },
    {
      title: isFi ? cms.whyUsPoint2Title_fi || m.point2Title : m.point2Title,
      body: isFi ? cms.whyUsPoint2Body_fi || m.point2Body : m.point2Body,
    },
    {
      title: isFi ? cms.whyUsPoint3Title_fi || m.point3Title : m.point3Title,
      body: isFi ? cms.whyUsPoint3Body_fi || m.point3Body : m.point3Body,
    },
    {
      title: isFi ? cms.whyUsPoint4Title_fi || m.point4Title : m.point4Title,
      body: isFi ? cms.whyUsPoint4Body_fi || m.point4Body : m.point4Body,
    },
  ];

  return (
    <WhyUsDeck 
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      points={points}
    />
  );
}