import { sanityClient } from "@/sanity/config";
import { whyUsSettingsQuery } from "@/sanity/queries";
import WhyUsReveal from "@/components/WhyUsReveal";

type WhyUsMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  point1Title: string;
  point1Body: string;
  point2Title: string;
  point2Body: string;
  point3Title: string;
  point3Body: string;
  point4Title: string;
  point4Body: string;
};

type MessagesFile = {
  whyUs: WhyUsMessages;
};

type WhyUsSettings = {
  whyUsEyebrow_fi?: string | null;
  whyUsTitle_fi?: string | null;
  whyUsSubtitle_fi?: string | null;
  whyUsPoint1Title_fi?: string | null;
  whyUsPoint1Body_fi?: string | null;
  whyUsPoint2Title_fi?: string | null;
  whyUsPoint2Body_fi?: string | null;
  whyUsPoint3Title_fi?: string | null;
  whyUsPoint3Body_fi?: string | null;
  whyUsPoint4Title_fi?: string | null;
  whyUsPoint4Body_fi?: string | null;
};

export default async function WhyUs({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.whyUs;

  const cms =
    (await sanityClient.fetch<WhyUsSettings | null>(whyUsSettingsQuery)) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.whyUsEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.whyUsTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.whyUsSubtitle_fi || m.subtitle : m.subtitle;

  const points = [
    {
      title: isFi ? cms.whyUsPoint1Title_fi || m.point1Title : m.point1Title,
      body: isFi ? cms.whyUsPoint1Body_fi || m.point1Body : m.point1Body,
    },
    {
      title: isFi ? cms.whyUsPoint2Title_fi || m.point2Title : m.point2Title,
      body: isFi ? cms.whyUsPoint2Body_fi || m.point2Body : m.point2Body,
    },
    {
      title: isFi ? cms.whyUsPoint3Title_fi || m.point3Title : m.point3Title,
      body: isFi ? cms.whyUsPoint3Body_fi || m.point3Body : m.point3Body,
    },
    {
      title: isFi ? cms.whyUsPoint4Title_fi || m.point4Title : m.point4Title,
      body: isFi ? cms.whyUsPoint4Body_fi || m.point4Body : m.point4Body,
    },
  ];

  return (
    <WhyUsReveal>
      <section
        id="why-us"
        className="relative border-t border-zinc-900 bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)] py-20 lg:py-24">
          {/* Eyebrow */}
          <p
            data-whyus-eyebrow
            className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-400"
          >
            {eyebrow}
          </p>

          {/* Title & subtitle */}
          <div className="mt-4 max-w-3xl space-y-4">
            <h2
              data-whyus-title
              style={{ fontFamily: "var(--font-clash-display)" }}
              className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p
              data-whyus-subtitle
              className="text-sm text-zinc-300 sm:text-base"
            >
              {subtitle}
            </p>
          </div>

          {/* Value props */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {points.map((p, i) => (
              <div
                key={i}
                data-whyus-card
                className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-7 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
              >
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
                    i % 2 === 0 ? "bg-sky-500/20" : "bg-fuchsia-500/20"
                  }`}
                />
                <div className="relative space-y-2">
                  <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </WhyUsReveal>
  );
}
