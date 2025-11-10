// components/Work.tsx
import Container from "./Container";
import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import Link from "next/link";

type Project = {
  key: string;          // i18n key (e.g., "project1")
  href?: string;        // optional link to case page
  image: string;        // /public path, e.g. "/work/project1.jpg"
  tags?: string[];      // small chips (optional)
};

const PROJECTS: Project[] = [
  { key: "project1", image: "/work/project1.jpg", href: "/work/project-1", tags: ["Next.js", "Tailwind"] },
  { key: "project2", image: "/work/project2.jpg", href: "/work/project-2", tags: ["E-commerce", "Stripe"] },
  { key: "project3", image: "/work/project3.jpg", href: "/work/project-3", tags: ["i18n", "SEO"] },
];

export default async function Work({ locale }: { locale: "fi" | "en" }) {
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <section id="work" className="relative min-h-screen flex items-center justify-center py-20">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-600 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Centered grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.key} delay={0.05 * i} y={20}>
              <ProjectCard
                title={t(`items.${p.key}.title`)}
                desc={t(`items.${p.key}.desc`)}
                cta={t("viewCase")}
                image={p.image}
                href={p.href}
                tags={p.tags?.map((tag, idx) => t(`items.${p.key}.tags.${idx}`, { default: tag }))}
              />
            </Reveal>
          ))}
        </div>

        {/* Optional "View more" CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {t("cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** Image-first card with slide-up reveal on hover */
function ProjectCard({
  title,
  desc,
  cta,
  image,
  href,
  tags = [],
}: {
  title: string;
  desc: string;
  cta: string;
  image: string;
  href?: string;
  tags?: string[];
}) {
  const Wrapper = href ? Link : ("div" as any);

  return (
    <Wrapper
      href={href ?? undefined}
      className="
        group relative block overflow-hidden rounded-2xl
        border border-zinc-200/60 dark:border-zinc-800
        bg-zinc-50 dark:bg-zinc-900
        shadow-sm hover:shadow-lg transition-shadow
        focus:outline-none focus:ring-2 focus:ring-zinc-400/50
      "
    >
      {/* image layer */}
      <div
        className="relative h-60 sm:h-64 w-full bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* subtle dark scrim that intensifies on hover */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
      </div>

      {/* slide-up panel */}
      <div
        className="
          absolute inset-0 flex items-end
          translate-y-full group-hover:translate-y-0
          transition-transform duration-300 ease-out
        "
      >
        <div className="w-full rounded-t-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur p-5 border-t border-zinc-200/60 dark:border-zinc-800">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wide rounded-full bg-zinc-900/5 dark:bg-white/5 px-2 py-1 text-zinc-600 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-base sm:text-lg font-semibold leading-tight">{title}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{desc}</p>

          <div className="mt-3">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {cta}
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L12.586 11H4a1 1 0 110-2h8.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* top-left title chip (visible before hover) */}
      <div className="absolute left-3 top-3 rounded-full bg-black/50 text-white text-xs px-2 py-1 backdrop-blur">
        {title}
      </div>
    </Wrapper>
  );
}
