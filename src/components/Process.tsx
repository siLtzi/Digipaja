import { sanityClient } from "@/sanity/config";
import { processSettingsQuery } from "@/sanity/queries";
import ProcessReveal from "@/components/ProcessReveal";
import Image from "next/image";

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
    <ProcessReveal>
      <section
        id="process"
        data-process-section
        className="relative overflow-hidden border-t border-zinc-900 bg-zinc-950/95"
      >
        <div
          data-process-root
          // h-screen so the section matches viewport height during pin
          className="mx-auto flex h-screen max-w-6xl flex-col justify-center px-[clamp(16px,8vw,80px)]"
        >
          {/* Eyebrow */}
          <p
            data-process-eyebrow
            className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-400"
          >
            {eyebrow}
          </p>

          {/* Title & subtitle */}
          <div className="mt-4 max-w-3xl space-y-4">
            <h2
              data-process-title
              style={{ fontFamily: "var(--font-clash-display)" }}
              className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p
              data-process-subtitle
              className="text-sm text-zinc-300 sm:text-base"
            >
              {subtitle}
            </p>
          </div>

          {/* Horizontal track wrapper */}
          <div data-process-wrapper className="relative mt-10 w-full">
            <div
              data-process-track
              className="relative flex w-max gap-10 md:gap-16"
            >
              {steps.map((s, i) => (
                <div
                  key={i}
                  data-process-step
                  className="relative flex h-[280px] w-[300px] flex-shrink-0 flex-col justify-center rounded-3xl bg-zinc-900/60 px-6 py-6 backdrop-blur-sm sm:w-[380px] md:w-[420px]"
                >
                  {/* Image header */}
                  <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                    <div className="relative h-28 w-full">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                      {/* Dark gradient for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      {/* Label chip on top of image */}
                      <div className="absolute bottom-2 left-3">
                        <span className="inline-flex h-6 items-center justify-center rounded-full bg-black/60 px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-100">
                          {s.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-300">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ProcessReveal>
  );
}
