import { sanityClient } from "@/sanity/config";
import { projectsQuery, workSettingsQuery } from "@/sanity/queries";
import WorkShowcase from "./Content"; // Triggers the Client Component

// --- TYPES ---
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
  // 1. Fetch Translations
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;
  const m = messages.work;

  // 2. Fetch CMS Data
  const [settings, projects] = await Promise.all([
    sanityClient.fetch<WorkSettings | null>(workSettingsQuery),
    sanityClient.fetch<Project[]>(projectsQuery),
  ]);

  const cms = settings ?? {};
  const isFi = locale === "fi";

  // 3. Prepare Props
  const eyebrow = isFi ? cms.workEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.workTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.workSubtitle_fi || m.subtitle : m.subtitle;
  const ctaLabel = isFi ? cms.workCtaLabel_fi || m.ctaLabel : m.ctaLabel;

  // 4. Render the Client Component with Data
  return (
    <WorkShowcase
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      ctaLabel={ctaLabel}
      projects={projects}
    />
  );
}