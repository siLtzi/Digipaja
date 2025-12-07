import { sanityClient } from "@/sanity/config";
import { processSettingsQuery } from "@/sanity/queries";
import ProcessPipeline from "./Content";

// --- TYPES (Unchanged) ---
type ProcessMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  step1Label: string;
  step1Title: string;
  step1Body: string;
  step2Label: string;
  step2Title: string;
  step2Body: string;
  step3Label: string;
  step3Title: string;
  step3Body: string;
  step4Label: string;
  step4Title: string;
  step4Body: string;
};

type MessagesFile = {
  process: ProcessMessages;
};

type ProcessSettings = {
  processEyebrow_fi?: string | null;
  processTitle_fi?: string | null;
  processSubtitle_fi?: string | null;
  processStep1Label_fi?: string | null;
  processStep1Title_fi?: string | null;
  processStep1Body_fi?: string | null;
  processStep2Label_fi?: string | null;
  processStep2Title_fi?: string | null;
  processStep2Body_fi?: string | null;
  processStep3Label_fi?: string | null;
  processStep3Title_fi?: string | null;
  processStep3Body_fi?: string | null;
  processStep4Label_fi?: string | null;
  processStep4Title_fi?: string | null;
  processStep4Body_fi?: string | null;
};

export default async function Process({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.process;

  const cms =
    (await sanityClient.fetch<ProcessSettings | null>(processSettingsQuery)) ??
    {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.processEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.processTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.processSubtitle_fi || m.subtitle : m.subtitle;

  const steps = [
    {
      label: isFi ? cms.processStep1Label_fi || m.step1Label : m.step1Label,
      title: isFi ? cms.processStep1Title_fi || m.step1Title : m.step1Title,
      body: isFi ? cms.processStep1Body_fi || m.step1Body : m.step1Body,
      image: "/process/step-1.jpg",
    },
    {
      label: isFi ? cms.processStep2Label_fi || m.step2Label : m.step2Label,
      title: isFi ? cms.processStep2Title_fi || m.step2Title : m.step2Title,
      body: isFi ? cms.processStep2Body_fi || m.step2Body : m.step2Body,
      image: "/process/step-2.jpg",
    },
    {
      label: isFi ? cms.processStep3Label_fi || m.step3Label : m.step3Label,
      title: isFi ? cms.processStep3Title_fi || m.step3Title : m.step3Title,
      body: isFi ? cms.processStep3Body_fi || m.step3Body : m.step3Body,
      image: "/process/step-3.jpg",
    },
    {
      label: isFi ? cms.processStep4Label_fi || m.step4Label : m.step4Label,
      title: isFi ? cms.processStep4Title_fi || m.step4Title : m.step4Title,
      body: isFi ? cms.processStep4Body_fi || m.step4Body : m.step4Body,
      image: "/process/step-4.jpg",
    },
  ];

  return (
    <ProcessPipeline 
       eyebrow={eyebrow}
       title={title}
       subtitle={subtitle}
       steps={steps}
    />
  );
}