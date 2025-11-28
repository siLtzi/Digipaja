import { sanityClient } from "@/sanity/config";
import { pricingSettingsQuery } from "@/sanity/queries";

type PricingMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  plan1Name: string;
  plan1Price: string;
  plan1Body: string;
  plan1Includes: string[];
  plan2Name: string;
  plan2Price: string;
  plan2Body: string;
  plan2Includes: string[];
  plan3Name: string;
  plan3Price: string;
  plan3Body: string;
  plan3Includes: string[];
  note: string;
};

type MessagesFile = {
  pricing: PricingMessages;
};

type PricingSettings = {
  pricingEyebrow_fi?: string | null;
  pricingTitle_fi?: string | null;
  pricingSubtitle_fi?: string | null;

  pricingPlan1Name_fi?: string | null;
  pricingPlan1Price_fi?: string | null;
  pricingPlan1Body_fi?: string | null;
  pricingPlan1Includes_fi?: string[] | null;

  pricingPlan2Name_fi?: string | null;
  pricingPlan2Price_fi?: string | null;
  pricingPlan2Body_fi?: string | null;
  pricingPlan2Includes_fi?: string[] | null;

  pricingPlan3Name_fi?: string | null;
  pricingPlan3Price_fi?: string | null;
  pricingPlan3Body_fi?: string | null;
  pricingPlan3Includes_fi?: string[] | null;

  pricingNote_fi?: string | null;
};

export default async function Pricing({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.pricing;

  const cms =
    (await sanityClient.fetch<PricingSettings | null>(
      pricingSettingsQuery
    )) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.pricingEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.pricingTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.pricingSubtitle_fi || m.subtitle : m.subtitle;

  const plans = [
    {
      name: isFi ? cms.pricingPlan1Name_fi || m.plan1Name : m.plan1Name,
      price: isFi ? cms.pricingPlan1Price_fi || m.plan1Price : m.plan1Price,
      body: isFi ? cms.pricingPlan1Body_fi || m.plan1Body : m.plan1Body,
      includes: isFi
        ? cms.pricingPlan1Includes_fi || m.plan1Includes
        : m.plan1Includes,
      highlight: false,
    },
    {
      name: isFi ? cms.pricingPlan2Name_fi || m.plan2Name : m.plan2Name,
      price: isFi ? cms.pricingPlan2Price_fi || m.plan2Price : m.plan2Price,
      body: isFi ? cms.pricingPlan2Body_fi || m.plan2Body : m.plan2Body,
      includes: isFi
        ? cms.pricingPlan2Includes_fi || m.plan2Includes
        : m.plan2Includes,
      highlight: true, // middle plan highlighted
    },
    {
      name: isFi ? cms.pricingPlan3Name_fi || m.plan3Name : m.plan3Name,
      price: isFi ? cms.pricingPlan3Price_fi || m.plan3Price : m.plan3Price,
      body: isFi ? cms.pricingPlan3Body_fi || m.plan3Body : m.plan3Body,
      includes: isFi
        ? cms.pricingPlan3Includes_fi || m.plan3Includes
        : m.plan3Includes,
      highlight: false,
    },
  ];

  const note = isFi ? cms.pricingNote_fi || m.note : m.note;

  return (
    <section
      id="pricing"
      className="relative border-t border-zinc-900 bg-zinc-950"
    >
      <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)] py-20 lg:py-24">
        {/* Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-400">
          {eyebrow}
        </p>

        {/* Title & subtitle */}
        <div className="mt-4 max-w-3xl space-y-4">
          <h2
            style={{ fontFamily: "var(--font-clash-display)" }}
            className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="text-sm text-zinc-300 sm:text-base">{subtitle}</p>
        </div>

        {/* Plans */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col rounded-3xl border p-6 sm:p-7 backdrop-blur-xl shadow-[0_14px_45px_rgba(0,0,0,0.45)] ${
                plan.highlight
                  ? "border-fuchsia-500/60 bg-zinc-900/90"
                  : "border-zinc-800 bg-zinc-900/80"
              }`}
            >
              {plan.highlight && (
                <div className="absolute right-4 top-4 rounded-full bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-fuchsia-200">
                  Suosituin
                </div>
              )}

              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  {idx === 0
                    ? "Pienempi projekti"
                    : idx === 1
                    ? "Kasvava yritys"
                    : "Jatkuva yhteistyö"}
                </div>
                <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
                  {plan.name}
                </h3>
                <p className="text-lg font-semibold text-zinc-50">
                  {plan.price}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {plan.body}
                </p>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {plan.includes.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[3px] inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-8 max-w-3xl text-xs text-zinc-400 sm:text-sm">
          {note}
        </p>
      </div>
    </section>
  );
}
