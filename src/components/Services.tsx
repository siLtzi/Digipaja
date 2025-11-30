import { sanityClient } from "@/sanity/config";
import { servicesSettingsQuery } from "@/sanity/queries";
import ServicesReveal from "@/components/ServicesReveal";

type ServicesMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  service1Label: string;
  service1Title: string;
  service1Body: string;
  service2Label: string;
  service2Title: string;
  service2Body: string;
  service3Label: string;
  service3Title: string;
  service3Body: string;
};

type MessagesFile = {
  services: ServicesMessages;
};

type ServicesSettings = {
  servicesEyebrow_fi?: string | null;
  servicesTitle_fi?: string | null;
  servicesSubtitle_fi?: string | null;
  servicesService1Label_fi?: string | null;
  servicesService1Title_fi?: string | null;
  servicesService1Body_fi?: string | null;
  servicesService2Label_fi?: string | null;
  servicesService2Title_fi?: string | null;
  servicesService2Body_fi?: string | null;
  servicesService3Label_fi?: string | null;
  servicesService3Title_fi?: string | null;
  servicesService3Body_fi?: string | null;
};

export default async function Services({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.services;

  const cms =
    (await sanityClient.fetch<ServicesSettings | null>(
      servicesSettingsQuery
    )) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.servicesEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.servicesTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.servicesSubtitle_fi || m.subtitle : m.subtitle;

  const services = [
    {
      label: isFi
        ? cms.servicesService1Label_fi || m.service1Label
        : m.service1Label,
      title: isFi
        ? cms.servicesService1Title_fi || m.service1Title
        : m.service1Title,
      body: isFi
        ? cms.servicesService1Body_fi || m.service1Body
        : m.service1Body,
    },
    {
      label: isFi
        ? cms.servicesService2Label_fi || m.service2Label
        : m.service2Label,
      title: isFi
        ? cms.servicesService2Title_fi || m.service2Title
        : m.service2Title,
      body: isFi
        ? cms.servicesService2Body_fi || m.service2Body
        : m.service2Body,
    },
    {
      label: isFi
        ? cms.servicesService3Label_fi || m.service3Label
        : m.service3Label,
      title: isFi
        ? cms.servicesService3Title_fi || m.service3Title
        : m.service3Title,
      body: isFi
        ? cms.servicesService3Body_fi || m.service3Body
        : m.service3Body,
    },
  ];

  return (
    <ServicesReveal>
      <section
        id="services"
        className="relative border-t border-zinc-900 bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)] py-20 lg:py-24">
          {/* Eyebrow */}
          <p
            data-services-eyebrow
            className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-400"
          >
            {eyebrow}
          </p>

          {/* Title & subtitle */}
          <div className="mt-4 max-w-3xl space-y-4">
            <h2
              data-services-title
              style={{ fontFamily: "var(--font-clash-display)" }}
              className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p
              data-services-subtitle
              className="text-sm text-zinc-300 sm:text-base"
            >
              {subtitle}
            </p>
          </div>

          {/* Service cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={i}
                data-services-card
                className="relative flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-7 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  {s.label}
                </div>
                <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
                  {s.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicesReveal>
  );
}
