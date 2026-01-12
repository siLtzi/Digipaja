import { sanityClient } from "@/sanity/config";
import { servicesSettingsQuery, servicesOverviewQuery } from "@/sanity/queries";
import dynamic from "next/dynamic";

const ServicesContent = dynamic(() => import("./Content"));

type GalleryItem = {
  type: "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
};

type Service = {
  title: string;
  body: string;
  slug?: string;
  imageUrl?: string;
  videoUrl?: string;
  gallery?: GalleryItem[];
};

type MessagesFile = {
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Service[];
  };
};

type ServicesSettings = {
  eyebrow_fi?: string | null;
  title_fi?: string | null;
  subtitle_fi?: string | null;
  services_fi?: { title: string; body: string; slug?: string }[] | null;
};

type ServicesOverview = {
  services?: {
    slug: string;
    imageUrl?: string;
    videoUrl?: string;
    gallery?: GalleryItem[];
  }[] | null;
};

export default async function Services({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.services;

  // Fetch both settings and overview data
  const [cms, overview] = await Promise.all([
    sanityClient.fetch<ServicesSettings | null>(servicesSettingsQuery),
    sanityClient.fetch<ServicesOverview | null>(servicesOverviewQuery, { locale }),
  ]);

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms?.eyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms?.title_fi || m.title : m.title;
  const subtitle = isFi ? cms?.subtitle_fi || m.subtitle : m.subtitle;

  // Primary source: servicesOverview (has full content)
  // Fallback: servicesSettings.services_fi or JSON
  const overviewServices = overview?.services;
  
  let services: Service[];
  
  if (overviewServices && overviewServices.length > 0) {
    // Use servicesOverview as primary source (it has title, body, media, etc.)
    services = overviewServices.map((s: any) => ({
      title: s.title || '',
      body: s.shortDescription || '',
      slug: s.slug,
      imageUrl: s.imageUrl,
      videoUrl: s.videoUrl,
      gallery: s.gallery,
    }));
  } else {
    // Fallback to servicesSettings or JSON
    const baseServices = (isFi ? (cms?.services_fi ?? m.items) : m.items) ?? [];
    services = baseServices.map((service) => ({
      ...service,
      imageUrl: undefined,
      videoUrl: undefined,
      gallery: undefined,
    }));
  }

  return (
    <ServicesContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      services={services}
      locale={locale}
    />
  );
}