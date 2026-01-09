import { sanityClient } from "@/sanity/config";
import { aboutUsSettingsQuery } from "@/sanity/queries";
import dynamic from "next/dynamic";

const AboutUsContent = dynamic(() => import("./ContentV2"));

// --- TYPES FOR MESSAGES FILE ---
type Value = {
  title: string;
  description: string;
};

type AboutUsMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description2: string;
  bulletPoint: string;
  cta: string;
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  values: Value[];
  statsTitle: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
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

  aboutUsDescription2_fi?: string | null;
  aboutUsDescription2_en?: string | null;
  aboutUsBulletPoint_fi?: string | null;
  aboutUsBulletPoint_en?: string | null;
  aboutUsCta_fi?: string | null;
  aboutUsCta_en?: string | null;

  // Mission & Values
  missionTitle_fi?: string | null;
  missionTitle_en?: string | null;
  missionText_fi?: string | null;
  missionText_en?: string | null;
  valuesTitle_fi?: string | null;
  valuesTitle_en?: string | null;
  values_fi?: Value[] | null;
  values_en?: Value[] | null;

  // Stats
  statsTitle_fi?: string | null;
  statsTitle_en?: string | null;
  stat1Value?: string | null;
  stat1Label_fi?: string | null;
  stat1Label_en?: string | null;
  stat2Value?: string | null;
  stat2Label_fi?: string | null;
  stat2Label_en?: string | null;
  stat3Value?: string | null;
  stat3Label_fi?: string | null;
  stat3Label_en?: string | null;
  stat4Value?: string | null;
  stat4Label_fi?: string | null;
  stat4Label_en?: string | null;

  // Team - Samuli
  aboutUsTechTitle_fi?: string | null;
  aboutUsTechTitle_en?: string | null;
  aboutUsTechBody_fi?: string | null;
  aboutUsTechBody_en?: string | null;
  samuliRole_fi?: string | null;
  samuliRole_en?: string | null;
  samuliQuote_fi?: string | null;
  samuliQuote_en?: string | null;
  samuliPhoto?: string | null;

  // Team - Jouko
  aboutUsBizTitle_fi?: string | null;
  aboutUsBizTitle_en?: string | null;
  aboutUsBizBody_fi?: string | null;
  aboutUsBizBody_en?: string | null;
  joukoRole_fi?: string | null;
  joukoRole_en?: string | null;
  joukoQuote_fi?: string | null;
  joukoQuote_en?: string | null;
  joukoPhoto?: string | null;
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

  const description2 = isFi
    ? cms.aboutUsDescription2_fi || m.description2
    : cms.aboutUsDescription2_en || m.description2;

  const bulletPoint = isFi
    ? cms.aboutUsBulletPoint_fi || m.bulletPoint
    : cms.aboutUsBulletPoint_en || m.bulletPoint;

  const ctaText = isFi
    ? cms.aboutUsCta_fi || m.cta
    : cms.aboutUsCta_en || m.cta;

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

  const values = isFi
    ? cms.values_fi || m.values
    : cms.values_en || m.values;

  // Stats
  const stats = [
    {
      value: cms.stat1Value || m.stat1Value,
      label: isFi
        ? cms.stat1Label_fi || m.stat1Label
        : cms.stat1Label_en || m.stat1Label,
    },
    {
      value: cms.stat2Value || m.stat2Value,
      label: isFi
        ? cms.stat2Label_fi || m.stat2Label
        : cms.stat2Label_en || m.stat2Label,
    },
    {
      value: cms.stat3Value || m.stat3Value,
      label: isFi
        ? cms.stat3Label_fi || m.stat3Label
        : cms.stat3Label_en || m.stat3Label,
    },
    {
      value: cms.stat4Value || m.stat4Value,
      label: isFi
        ? cms.stat4Label_fi || m.stat4Label
        : cms.stat4Label_en || m.stat4Label,
    },
  ];

  // Team
  const team = [
    {
      name: m.samuliName,
      role: isFi
        ? cms.samuliRole_fi || m.samuliRole
        : cms.samuliRole_en || m.samuliRole,
      title: isFi
        ? cms.aboutUsTechTitle_fi || m.samuliTitle
        : cms.aboutUsTechTitle_en || m.samuliTitle,
      bio: isFi
        ? cms.aboutUsTechBody_fi || m.samuliBio
        : cms.aboutUsTechBody_en || m.samuliBio,
      quote: isFi
        ? cms.samuliQuote_fi || m.samuliQuote
        : cms.samuliQuote_en || m.samuliQuote,
      photo: cms.samuliPhoto || "/image/Samuli.png",
      color: "#ff8a3c",
      stack: [],
    },
    {
      name: m.joukoName,
      role: isFi
        ? cms.joukoRole_fi || m.joukoRole
        : cms.joukoRole_en || m.joukoRole,
      title: isFi
        ? cms.aboutUsBizTitle_fi || m.joukoTitle
        : cms.aboutUsBizTitle_en || m.joukoTitle,
      bio: isFi
        ? cms.aboutUsBizBody_fi || m.joukoBio
        : cms.aboutUsBizBody_en || m.joukoBio,
      quote: isFi
        ? cms.joukoQuote_fi || m.joukoQuote
        : cms.joukoQuote_en || m.joukoQuote,
      photo: cms.joukoPhoto || "/image/Jouko.png",
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
      statsTitle={isFi ? cms.statsTitle_fi || "" : cms.statsTitle_en || ""}
      stats={stats}
      team={team}
    />
  );
}
