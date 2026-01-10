import { sanityClient } from "@/sanity/config";
import { aboutUsSettingsQuery } from "@/sanity/queries";
import dynamic from "next/dynamic";

const AboutUsContent = dynamic(() => import("./ContentV2"));

// --- TYPES FOR MESSAGES FILE ---
type ValueItem = {
  title: string;
  description: string;
};

type AboutUsMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description2: string;
  bulletPoint: string;
  samuliName: string;
  samuliRole: string;
  samuliTitle: string;
  samuliBio: string;
  samuliQuote: string;
  joukoName: string;
  joukoRole: string;
  joukoTitle: string;
  joukoBio: string;
  joukoQuote: string;
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  values: ValueItem[];
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  cta: string;
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
  cta_fi?: string | null;
  cta_en?: string | null;

  // Team - Samuli
  samuliName?: string | null;
  samuliRole_fi?: string | null;
  samuliRole_en?: string | null;
  aboutUsTechTitle_fi?: string | null;
  aboutUsTechTitle_en?: string | null;
  aboutUsTechBody_fi?: string | null;
  aboutUsTechBody_en?: string | null;
  samuliQuote_fi?: string | null;
  samuliQuote_en?: string | null;

  // Team - Jouko
  joukoName?: string | null;
  joukoRole_fi?: string | null;
  joukoRole_en?: string | null;
  aboutUsBizTitle_fi?: string | null;
  aboutUsBizTitle_en?: string | null;
  aboutUsBizBody_fi?: string | null;
  aboutUsBizBody_en?: string | null;
  joukoQuote_fi?: string | null;
  joukoQuote_en?: string | null;

  // Stats
  stats?: {
    value: string;
    label_fi: string;
    label_en: string;
  }[] | null;

  // Values & Mission
  missionTitle_fi?: string | null;
  missionTitle_en?: string | null;
  missionText_fi?: string | null;
  missionText_en?: string | null;
  valuesTitle_fi?: string | null;
  valuesTitle_en?: string | null;
  values?: {
    title_fi: string;
    title_en: string;
    description_fi: string;
    description_en: string;
  }[] | null;
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

  const ctaText = isFi
    ? cms.cta_fi || m.cta
    : cms.cta_en || m.cta;

  // Mission & Values
  const missionTitle = isFi
    ? cms.missionTitle_fi || m.missionTitle
    : cms.missionTitle_en || m.missionTitle;

  const missionText = isFi
    ? cms.missionText_fi || m.missionText
    : cms.missionText_en || m.missionText;

  const valuesTitle = isFi
    ? cms.valuesTitle_fi || m.valuesTitle
    : cms.valuesTitle_en || m.valuesTitle;

  // Values - prefer CMS, fallback to messages
  const values = cms.values && cms.values.length > 0
    ? cms.values.map(v => ({
        title: isFi ? v.title_fi : v.title_en,
        description: isFi ? v.description_fi : v.description_en,
      }))
    : m.values || [];

  // Stats - prefer CMS, fallback to messages
  const stats = cms.stats && cms.stats.length > 0
    ? cms.stats.map(s => ({
        value: s.value,
        label: isFi ? s.label_fi : s.label_en,
      }))
    : [
        { value: m.stat1Value, label: m.stat1Label },
        { value: m.stat2Value, label: m.stat2Label },
        { value: m.stat3Value, label: m.stat3Label },
        { value: m.stat4Value, label: m.stat4Label },
      ];

  // Team
  const team = [
    {
      name: cms.samuliName || m.samuliName,
      role: isFi 
        ? cms.samuliRole_fi || m.samuliRole || ""
        : cms.samuliRole_en || m.samuliRole || "",
      title: isFi
        ? cms.aboutUsTechTitle_fi || m.samuliTitle
        : cms.aboutUsTechTitle_en || m.samuliTitle,
      bio: isFi
        ? cms.aboutUsTechBody_fi || m.samuliBio
        : cms.aboutUsTechBody_en || m.samuliBio,
      quote: isFi
        ? cms.samuliQuote_fi || m.samuliQuote || ""
        : cms.samuliQuote_en || m.samuliQuote || "",
      photo: "/image/Samuli.png",
      color: "#ff8a3c",
      stack: [],
    },
    {
      name: cms.joukoName || m.joukoName,
      role: isFi 
        ? cms.joukoRole_fi || m.joukoRole || ""
        : cms.joukoRole_en || m.joukoRole || "",
      title: isFi
        ? cms.aboutUsBizTitle_fi || m.joukoTitle
        : cms.aboutUsBizTitle_en || m.joukoTitle,
      bio: isFi
        ? cms.aboutUsBizBody_fi || m.joukoBio
        : cms.aboutUsBizBody_en || m.joukoBio,
      quote: isFi
        ? cms.joukoQuote_fi || m.joukoQuote || ""
        : cms.joukoQuote_en || m.joukoQuote || "",
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
      ctaText={ctaText}
      missionTitle={missionTitle}
      missionText={missionText}
      valuesTitle={valuesTitle}
      values={values}
      statsTitle=""
      stats={stats}
      team={team}
    />
  );
}
