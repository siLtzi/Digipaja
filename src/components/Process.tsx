import { sanityClient } from "@/sanity/config";
import { processSettingsQuery } from "@/sanity/queries";
import ProcessReveal from "@/components/ProcessReveal";

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
    (await sanityClient.fetch<ProcessSettings | null>(
      processSettingsQuery
    )) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.processEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.processTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.processSubtitle_fi || m.subtitle : m.subtitle;

  const steps = [
    {
      label: isFi ? cms.processStep1Label_fi || m.step1Label : m.step1Label,
      title: isFi ? cms.processStep1Title_fi || m.step1Title : m.step1Title,
      body: isFi ? cms.processStep1Body_fi || m.step1Body : m.step1Body,
      icon: "discovery" as const,
    },
    {
      label: isFi ? cms.processStep2Label_fi || m.step2Label : m.step2Label,
      title: isFi ? cms.processStep2Title_fi || m.step2Title : m.step2Title,
      body: isFi ? cms.processStep2Body_fi || m.step2Body : m.step2Body,
      icon: "wireframe" as const,
    },
    {
      label: isFi ? cms.processStep3Label_fi || m.step3Label : m.step3Label,
      title: isFi ? cms.processStep3Title_fi || m.step3Title : m.step3Title,
      body: isFi ? cms.processStep3Body_fi || m.step3Body : m.step3Body,
      icon: "dev" as const,
    },
    {
      label: isFi ? cms.processStep4Label_fi || m.step4Label : m.step4Label,
      title: isFi ? cms.processStep4Title_fi || m.step4Title : m.step4Title,
      body: isFi ? cms.processStep4Body_fi || m.step4Body : m.step4Body,
      icon: "launch" as const,
    },
  ];

  const renderIcon = (type: "discovery" | "wireframe" | "dev" | "launch") => {
    switch (type) {
      case "discovery":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 ring-1 ring-sky-500/30">
            <div className="h-5 w-5 rounded-full border border-sky-300/80" />
          </div>
        );
      case "wireframe":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500/10 ring-1 ring-fuchsia-500/30">
            <div className="grid h-5 w-5 grid-cols-2 gap-[2px]">
              <div className="border border-fuchsia-300/80" />
              <div className="border border-fuchsia-300/80" />
              <div className="border border-fuchsia-300/80 col-span-2" />
            </div>
          </div>
        );
      case "dev":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <span className="text-xs font-mono text-emerald-200">&lt;/&gt;</span>
          </div>
        );
      case "launch":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/30">
            <div className="h-0 w-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-amber-300" />
          </div>
        );
    }
  };

  return (
    <ProcessReveal>
      <section
        id="process"
        className="relative border-t border-zinc-900 bg-zinc-950/95"
      >
        <div
          data-process-root
          className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-[clamp(16px,8vw,80px)] py-20 lg:py-24"
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

          {/* Steps */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {steps.map((s, i) => (
              <div
                key={i}
                data-process-step
                className="relative flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 text-[11px] text-zinc-100">
                      {s.label}
                    </span>
                    <span>Vaihe</span>
                  </div>
                  {renderIcon(s.icon)}
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
                    {s.title}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ProcessReveal>
  );
}
