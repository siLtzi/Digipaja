import { sanityClient } from "@/sanity/config";
import { processSettingsQuery } from "@/sanity/queries";
import ProcessContent from "./Content";

type ProcessStep = {
  title_fi: string;
  title_en: string;
  description_fi: string;
  description_en: string;
};

type ProcessSettings = {
  processEyebrow_fi?: string;
  processEyebrow_en?: string;
  processTitle_fi?: string;
  processTitle_en?: string;
  processSubtitle_fi?: string;
  processSubtitle_en?: string;
  steps?: ProcessStep[];
};

type MessagesFile = {
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Array<{ title: string; description: string }>;
  };
};

export default async function Process({ locale }: { locale: "fi" | "en" }) {
  // 1. Get Fallback Strings (JSON)
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.process;

  // 2. Get CMS Settings
  const cms =
    (await sanityClient.fetch<ProcessSettings | null>(processSettingsQuery)) ?? {};

  const isFi = locale === "fi";

  // 3. Resolve Content
  const eyebrow = isFi ? cms.processEyebrow_fi || m.eyebrow : cms.processEyebrow_en || m.eyebrow;
  const title = isFi ? cms.processTitle_fi || m.title : cms.processTitle_en || m.title;
  const subtitle = isFi ? cms.processSubtitle_fi || m.subtitle : cms.processSubtitle_en || m.subtitle;

  // Map steps from CMS or fallback to JSON
  const rawSteps = cms.steps || [];
  const steps = rawSteps.length > 0
    ? rawSteps.map((s) => ({
        title: isFi ? s.title_fi : s.title_en,
        description: isFi ? s.description_fi : s.description_en,
      }))
    : m.steps;

  return (
    <ProcessContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      steps={steps}
    />
  );
}