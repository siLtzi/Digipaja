import { sanityClient } from "@/sanity/config";
import { projectsQuery, workSettingsQuery } from "@/sanity/queries";

type WorkMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
};

type MessagesFile = {
  work: WorkMessages;
};

type WorkSettings = {
  workEyebrow_fi?: string | null;
  workTitle_fi?: string | null;
  workSubtitle_fi?: string | null;
  workCtaLabel_fi?: string | null;
};

type Project = {
  _id: string;
  title: string;
  tag?: string;
  imageUrl?: string;
  url?: string;
};

export default async function Work({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.work;

  const [settings, projects] = await Promise.all([
    sanityClient.fetch<WorkSettings | null>(workSettingsQuery),
    sanityClient.fetch<Project[]>(projectsQuery),
  ]);

  const cms = settings ?? {};
  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.workEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.workTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.workSubtitle_fi || m.subtitle : m.subtitle;
  const ctaLabel = isFi ? cms.workCtaLabel_fi || m.ctaLabel : m.ctaLabel;

  return (
    <section
      id="work"
      className="relative border-t border-zinc-900 bg-zinc-950/95"
    >
      <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)] py-20 lg:py-24">
        {/* Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-400">
          {eyebrow}
        </p>

        {/* Header row */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-3">
            <h2
              style={{ fontFamily: "var(--font-clash-display)" }}
              className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="text-sm text-zinc-300 sm:text-base">
              {subtitle}
            </p>
          </div>

          {projects.length > 0 && (
            <div className="sm:text-right">
              <button
                type="button"
                className="inline-flex items-center rounded-2xl border border-zinc-700 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-100 hover:bg-zinc-900"
              >
                {ctaLabel}
              </button>
            </div>
          )}
        </div>

        {/* Projects grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p._id}
              href={p.url || "#"}
              target={p.url ? "_blank" : undefined}
              rel={p.url ? "noreferrer" : undefined}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-800">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                    {p.title}
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-semibold text-zinc-50">
                  {p.title}
                </h3>
                {p.tag && (
                  <p className="text-xs text-zinc-400">
                    {p.tag}
                  </p>
                )}
              </div>
            </a>
          ))}

          {projects.length === 0 && (
            <p className="text-sm text-zinc-500">
              Lisää projekteja tulossa pian.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
