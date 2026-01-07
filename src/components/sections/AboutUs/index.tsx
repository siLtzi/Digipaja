import { sanityClient } from "@/sanity/config";
import { aboutUsSettingsQuery } from "@/sanity/queries";
import dynamic from "next/dynamic";

const AboutUsContent = dynamic(() => import("./Content"));

// --- TYPES FOR MESSAGES FILE ---
type AboutUsMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  techTitle: string;
  techBody: string;
  bizTitle: string;
  bizBody: string;
};

type MessagesFile = {
  aboutUs: AboutUsMessages;
};

// --- TYPES FOR SANITY SETTINGS ---
type AboutUsSettings = {
  aboutUsEyebrow_fi?: string | null;
  aboutUsEyebrow_en?: string | null;

  aboutUsTitle_fi?: string | null;
  aboutUsTitle_en?: string | null;

  aboutUsSubtitle_fi?: string | null;
  aboutUsSubtitle_en?: string | null;

  aboutUsTechTitle_fi?: string | null;
  aboutUsTechTitle_en?: string | null;
  aboutUsTechBody_fi?: string | null;
  aboutUsTechBody_en?: string | null;

  aboutUsBizTitle_fi?: string | null;
  aboutUsBizTitle_en?: string | null;
  aboutUsBizBody_fi?: string | null;
  aboutUsBizBody_en?: string | null;

  samuliPhoto?: string | null;
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

  const eyebrow = isFi
    ? cms.aboutUsEyebrow_fi || m.eyebrow
    : cms.aboutUsEyebrow_en || m.eyebrow;

  const title = isFi
    ? cms.aboutUsTitle_fi || m.title
    : cms.aboutUsTitle_en || m.title;

  const subtitle = isFi
    ? cms.aboutUsSubtitle_fi || m.subtitle
    : cms.aboutUsSubtitle_en || m.subtitle;

  const techTitle = isFi
    ? cms.aboutUsTechTitle_fi || m.techTitle
    : cms.aboutUsTechTitle_en || m.techTitle;

  const techBody = isFi
    ? cms.aboutUsTechBody_fi || m.techBody
    : cms.aboutUsTechBody_en || m.techBody;

  const bizTitle = isFi
    ? cms.aboutUsBizTitle_fi || m.bizTitle
    : cms.aboutUsBizTitle_en || m.bizTitle;

  const bizBody = isFi
    ? cms.aboutUsBizBody_fi || m.bizBody
    : cms.aboutUsBizBody_en || m.bizBody;

  // Sanity → fallback to local files if empty
  const samuliPhoto =
    cms.samuliPhoto || "/image/Samuli.png";

  const joukoPhoto =
    cms.joukoPhoto || "/image/Jouko.png";

  return (
    <AboutUsContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      techTitle={techTitle}
      techBody={techBody}
      bizTitle={bizTitle}
      bizBody={bizBody}
      samuliPhoto={samuliPhoto}
      joukoPhoto={joukoPhoto}
    />
  );
}
