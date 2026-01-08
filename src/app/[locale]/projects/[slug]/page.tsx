import { notFound } from "next/navigation";
import { Metadata } from "next";
import { sanityClient } from "@/sanity/config";
import { projectBySlugQuery, allProjectSlugsQuery } from "@/sanity/queries";
import { getTranslations } from "next-intl/server";
import {
  ProjectHero,
  TechStack,
  ProjectContent,
  KeyFeatures,
  ProjectGallery,
  Testimonial,
  ProjectCTA,
  LighthouseScores,
} from "./components";

type ProjectPageProps = {
  params: Promise<{
    locale: "fi" | "en";
    slug: string;
  }>;
};

type LighthouseScore = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type ProjectData = {
  title: string;
  slug: string;
  category?: string;
  clientName?: string;
  projectYear?: string;
  projectDuration?: string;
  description_fi?: string;
  description_en?: string;
  challenge_fi?: string;
  challenge_en?: string;
  solution_fi?: string;
  solution_en?: string;
  results_fi?: string;
  results_en?: string;
  testimonial_fi?: string;
  testimonial_en?: string;
  testimonialAuthor?: string;
  keyFeatures_fi?: string[];
  keyFeatures_en?: string[];
  metrics?: Array<{
    label_fi?: string;
    label_en?: string;
    value: string;
  }>;
  lighthouseMobile?: LighthouseScore;
  lighthouseDesktop?: LighthouseScore;
  mainImage: string;
  mobileImage?: string;
  gallery?: string[];
  liveUrl?: string;
  technologies?: string[];
  publishedAt?: string;
};

const BASE_URL = "https://digipajaoulu.fi";

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(allProjectSlugsQuery);
  
  const params: { locale: "fi" | "en"; slug: string }[] = [];
  
  for (const slug of slugs) {
    params.push({ locale: "fi", slug });
    params.push({ locale: "en", slug });
  }
  
  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  const project = await sanityClient.fetch<ProjectData | null>(projectBySlugQuery, { slug });
  
  if (!project) {
    return {
      title: locale === "fi" ? "Projekti ei löytynyt" : "Project not found",
    };
  }
  
  const isFi = locale === "fi";
  const description = isFi ? project.description_fi : project.description_en;
  
  return {
    title: `${project.title} | Digipaja`,
    description: description || `${project.title} - ${project.category}`,
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects/${slug}`,
      languages: {
        fi: `${BASE_URL}/fi/projects/${slug}`,
        en: `${BASE_URL}/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${project.title} | Digipaja`,
      description: description || `${project.title} - ${project.category}`,
      url: `${BASE_URL}/${locale}/projects/${slug}`,
      siteName: "Digipaja",
      locale: isFi ? "fi_FI" : "en_US",
      type: "article",
      images: project.mainImage ? [{ url: project.mainImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Digipaja`,
      description: description || `${project.title} - ${project.category}`,
      images: project.mainImage ? [project.mainImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations("projectDetail");

  const project = await sanityClient.fetch<ProjectData | null>(projectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  const isFi = locale === "fi";
  const description = isFi ? project.description_fi : project.description_en;
  const challenge = isFi ? project.challenge_fi : project.challenge_en;
  const solution = isFi ? project.solution_fi : project.solution_en;
  const results = isFi ? project.results_fi : project.results_en;
  const testimonial = isFi ? project.testimonial_fi : project.testimonial_en;
  const keyFeatures = isFi ? project.keyFeatures_fi : project.keyFeatures_en;

  // Transform metrics for the component
  const metrics = project.metrics?.map((m) => ({
    value: m.value,
    label: isFi ? m.label_fi || "" : m.label_en || "",
  }));

  // Content sections for Challenge/Solution/Results
  const contentSections = [
    { title: t("sections.challenge"), content: challenge || "", icon: "challenge" as const },
    { title: t("sections.solution"), content: solution || "", icon: "solution" as const },
    { title: t("sections.results"), content: results || "", icon: "results" as const },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: description,
    url: `${BASE_URL}/${locale}/projects/${slug}`,
    image: project.mainImage,
    creator: {
      "@type": "Organization",
      name: "Digipaja",
      url: BASE_URL,
    },
    datePublished: project.publishedAt,
    ...(project.clientName && {
      about: {
        "@type": "Organization",
        name: project.clientName,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-[#08090C] text-white">
        <ProjectHero
          locale={locale}
          title={project.title}
          category={project.category}
          projectYear={project.projectYear}
          description={description}
          clientName={project.clientName}
          projectDuration={project.projectDuration}
          liveUrl={project.liveUrl}
          mainImage={project.mainImage}
          translations={{
            breadcrumbHome: t("breadcrumb.home"),
            breadcrumbProjects: t("breadcrumb.projects"),
            metaClient: t("meta.client"),
            metaDuration: t("meta.duration"),
            metaWebsite: t("meta.website"),
            visitWebsite: t("visitWebsite"),
          }}
        />

        <TechStack 
          technologies={project.technologies || []} 
          title={t("techStack")} 
        />

        <ProjectContent sections={contentSections} />

        <KeyFeatures 
          features={keyFeatures || []} 
          title={t("sections.keyFeatures")} 
        />

        {(project.lighthouseMobile || project.lighthouseDesktop) && (
          <LighthouseScores
            mobile={project.lighthouseMobile}
            desktop={project.lighthouseDesktop}
            title={t("sections.lighthouse")}
          />
        )}

        <ProjectGallery
          images={project.gallery || []}
          projectTitle={project.title}
          title={t("sections.gallery")}
        />

        <Testimonial
          quote={testimonial || ""}
          author={project.testimonialAuthor}
        />

        <ProjectCTA
          locale={locale}
          title={t("cta.title")}
          description={t("cta.description")}
          buttonText={t("cta.button")}
          backText={t("cta.backToProjects")}
        />
      </main>
    </>
  );
}
