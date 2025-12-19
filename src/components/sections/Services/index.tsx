import { sanityClient } from "@/sanity/config";
import { servicesSettingsQuery } from "@/sanity/queries";
import ServicesContent from "./Content";

type Service = {
  title: string;
  body: string;
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
  services_fi?: Service[] | null;
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

  const eyebrow = isFi ? cms.eyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.title_fi || m.title : m.title;
  const subtitle = isFi ? cms.subtitle_fi || m.subtitle : m.subtitle;

  const services = (isFi ? (cms.services_fi ?? m.items) : m.items) ?? [];

  return (
    <ServicesContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      services={services}
    />
  );
}
