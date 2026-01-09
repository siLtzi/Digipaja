import { sanityClient } from "@/sanity/config";
import { aboutUsSettingsQuery } from "@/sanity/queries";
import dynamic from "next/dynamic";

const AboutUsContent = dynamic(() => import("./ContentV2"));

// --- TYPES FOR MESSAGES FILE ---
type AboutUsMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description2: string;
  bulletPoint: string;
  samuliName: string;
  samuliTitle: string;
  samuliBio: string;
  joukoName: string;
  joukoTitle: string;
  joukoBio: string;
};

type MessagesFile = {
  aboutUs: AboutUsMessages;
};

// --- TYPES FOR SANITY SETTINGS ---
type AboutUsSettings = {
  // Hero
  aboutUsEyebrow_fi?: string | null;
  aboutUsEyebrow_en?: string | null;
  aboutUsTitle_fi?: string | null;
  aboutUsTitle_en?: string | null;
  aboutUsSubtitle_fi?: string | null;
  aboutUsSubtitle_en?: string | null;

  // Footer
  aboutUsDescription2_fi?: string | null;
  aboutUsDescription2_en?: string | null;
  aboutUsBulletPoint_fi?: string | null;
  aboutUsBulletPoint_en?: string | null;

  // Team - Samuli
  samuliName?: string | null;
  aboutUsTechTitle_fi?: string | null;
  aboutUsTechTitle_en?: string | null;
  aboutUsTechBody_fi?: string | null;
  aboutUsTechBody_en?: string | null;

  // Team - Jouko
  joukoName?: string | null;
  aboutUsBizTitle_fi?: string | null;
  aboutUsBizTitle_en?: string | null;
  aboutUsBizBody_fi?: string | null;
  aboutUsBizBody_en?: string | null;
};

export default async function AboutUs({
  locale,
}: {
  locale: "fi" | "en";
}) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.aboutUs;

  const cms =
    (await sanityClient.fetch<AboutUsSettings | null>(
      aboutUsSettingsQuery
    )) ?? {};

  const isFi = locale === "fi";

  // Hero
  const eyebrow = isFi
    ? cms.aboutUsEyebrow_fi || m.eyebrow
    : cms.aboutUsEyebrow_en || m.eyebrow;

  const title = isFi
    ? cms.aboutUsTitle_fi || m.title
    : cms.aboutUsTitle_en || m.title;

  const subtitle = isFi
    ? cms.aboutUsSubtitle_fi || m.subtitle
    : cms.aboutUsSubtitle_en || m.subtitle;

  // Footer
  const description2 = isFi
    ? cms.aboutUsDescription2_fi || m.description2
    : cms.aboutUsDescription2_en || m.description2;

  const bulletPoint = isFi
    ? cms.aboutUsBulletPoint_fi || m.bulletPoint
    : cms.aboutUsBulletPoint_en || m.bulletPoint;

  // Team
  const team = [
    {
      name: cms.samuliName || m.samuliName,
      role: "",
      title: isFi
        ? cms.aboutUsTechTitle_fi || m.samuliTitle
        : cms.aboutUsTechTitle_en || m.samuliTitle,
      bio: isFi
        ? cms.aboutUsTechBody_fi || m.samuliBio
        : cms.aboutUsTechBody_en || m.samuliBio,
      quote: "",
      photo: "/image/Samuli.png",
      color: "#ff8a3c",
      stack: [],
    },
    {
      name: cms.joukoName || m.joukoName,
      role: "",
      title: isFi
        ? cms.aboutUsBizTitle_fi || m.joukoTitle
        : cms.aboutUsBizTitle_en || m.joukoTitle,
      bio: isFi
        ? cms.aboutUsBizBody_fi || m.joukoBio
        : cms.aboutUsBizBody_en || m.joukoBio,
      quote: "",
      photo: "/image/Jouko.png",
      color: "#38bdf8",
      stack: [],
    },
  ];

  return (
    <AboutUsContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      description2={description2}
      bulletPoint={bulletPoint}
      ctaText=""
      missionTitle=""
      missionText=""
      valuesTitle=""
      values={[]}
      statsTitle=""
      stats={[]}
      team={team}
    />
  );
}
