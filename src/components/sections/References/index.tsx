import { sanityClient } from "@/sanity/config";
import { referencesQuery } from "@/sanity/queries";
import type { ReferenceProject } from "./Content";
import dynamic from "next/dynamic";

const ReferencesContent = dynamic(() => import("./Content"));

type MessagesFile = {
  references: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewCase: string;
    viewCaseStudy: string;
    scrollToExplore: string;
    projectStatus: string;
    online: string;
    mobile: string;
    visitWebsite: string;
  };
};

const FALLBACK_PROJECTS: ReferenceProject[] = [
  {
    title: "Nordic Health App",
    category: "Web Application",
    description: "A comprehensive health tracking platform built for the Nordic market.",
    image: "/image/project1.jpg", 
    mobileImage: "/image/project1.jpg",
    slug: "nordic-health",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    liveUrl: "https://nordic-health.fi",
  },
  {
    title: "Oulu Tech Hub",
    category: "Corporate Website",
    description: "Modern corporate identity and high-performance website.",
    image: "/image/project2.jpg", 
    mobileImage: "/image/project2.jpg",
    slug: "oulu-tech",
    tags: ["React", "Sanity", "GSAP"],
    liveUrl: "https://oulu-tech.fi",
  },
  {
    title: "Arctic Logistics",
    category: "SaaS Platform",
    description: "Logistics management system optimized for harsh environments.",
    image: "/image/project3.jpg",
    mobileImage: "/image/project3.jpg",
    slug: "arctic-logistics",
    tags: ["Next.js", "Node.js"],
    liveUrl: "https://arctic-logistics.fi",
  }
];

export default async function References({ locale }: { locale: "fi" | "en" }) {
  const isFi = locale === "fi";

  // LOAD TEXT FROM JSON
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;
  const m = messages.references;

  // FETCH DATA FROM SANITY
  const data = await sanityClient.fetch(referencesQuery);
  const settings = data?.settings;
  const cmsProjects = data?.projects;

  // MERGE
  const projects: ReferenceProject[] = (cmsProjects && cmsProjects.length > 0)
    ? cmsProjects.map((p: any) => ({
        title: p.title,
        slug: p.slug,
        category: p.category || "Case Study",
        description: isFi ? p.description_fi : p.description_en || "",
        image: p.image || "/image/project-placeholder.jpg",
        mobileImage: p.mobileImage || p.image || "/image/project-placeholder.jpg", 
        tags: p.technologies || [],
        liveUrl: p.liveUrl || null,
      }))
    : FALLBACK_PROJECTS;

  // DETERMINE TEXT
  const eyebrow = isFi
    ? settings?.eyebrow_fi || m.eyebrow
    : settings?.eyebrow_en || m.eyebrow;

  const title = isFi
    ? settings?.title_fi || m.title
    : settings?.title_en || m.title;

  const subtitle = isFi
    ? settings?.subtitle_fi || m.subtitle
    : settings?.subtitle_en || m.subtitle;

  return (
    <ReferencesContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      projects={projects}
      locale={locale}
      translations={{
        viewCase: m.viewCase,
        viewCaseStudy: m.viewCaseStudy,
        scrollToExplore: m.scrollToExplore,
        projectStatus: m.projectStatus,
        online: m.online,
        mobile: m.mobile,
        visitWebsite: m.visitWebsite,
      }}
    />
  );
}