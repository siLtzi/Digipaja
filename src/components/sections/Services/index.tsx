import { sanityClient } from "@/sanity/config"; // or "@/sanity/lib/client" based on your tree
import { servicesSettingsQuery } from "@/sanity/queries";
import ServicesShowcase from "./Content";

// --- TYPES ---

// Matches your GROQ query: asset->{url}
type ServiceImage = {
  alt?: string;
  asset: {
    url: string;
  };
};

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
  servicesService1Image?: ServiceImage | null;

  servicesService2Label_fi?: string | null;
  servicesService2Title_fi?: string | null;
  servicesService2Body_fi?: string | null;
  servicesService2Image?: ServiceImage | null;

  servicesService3Label_fi?: string | null;
  servicesService3Title_fi?: string | null;
  servicesService3Body_fi?: string | null;
  servicesService3Image?: ServiceImage | null;
};

// Helper to safely transform Sanity images
function transformImage(sanityImage: ServiceImage | null | undefined) {
  if (!sanityImage?.asset?.url) return undefined;
  return {
    src: sanityImage.asset.url,
    alt: sanityImage.alt || "",
  };
}

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

  // --- ADDING LINKS HERE ---
  const services = [
    {
      label: isFi ? cms.servicesService1Label_fi || m.service1Label : m.service1Label,
      title: isFi ? cms.servicesService1Title_fi || m.service1Title : m.service1Title,
      body: isFi ? cms.servicesService1Body_fi || m.service1Body : m.service1Body,
      image: transformImage(cms.servicesService1Image),
      href: "/nettisivut", 
    },
    {
      label: isFi ? cms.servicesService2Label_fi || m.service2Label : m.service2Label,
      title: isFi ? cms.servicesService2Title_fi || m.service2Title : m.service2Title,
      body: isFi ? cms.servicesService2Body_fi || m.service2Body : m.service2Body,
      image: transformImage(cms.servicesService2Image),
      href: "/verkkokaupat",
    },
    {
      label: isFi ? cms.servicesService3Label_fi || m.service3Label : m.service3Label,
      title: isFi ? cms.servicesService3Title_fi || m.service3Title : m.service3Title,
      body: isFi ? cms.servicesService3Body_fi || m.service3Body : m.service3Body,
      image: transformImage(cms.servicesService3Image),
      href: "/seo",
    },
  ];

  return (
    <ServicesShowcase
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      services={services}
    />
  );
}