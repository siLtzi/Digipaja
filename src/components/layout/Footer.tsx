import { sanityClient } from "@/sanity/config";
import { contactSettingsQuery } from "@/sanity/queries";
import FooterUI from "./FooterUI";

type FooterMessages = {
  companyName: string;
  tagline: string;
  navigationTitle: string;
  contactTitle: string;
  heroLink: string;
  whyUsLink: string;
  processLink: string;
  servicesLink: string;
  workLink: string;
  pricingLink: string;
  contactLink: string;
  rights: string;
  madeIn: string;
};

type MessagesFile = {
  footer: FooterMessages;
};

type ContactSettings = {
  contactEmail?: string | null;
  contactPhone?: string | null;
};

export default async function Footer({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.footer;

  const cms =
    (await sanityClient.fetch<ContactSettings | null>(
      contactSettingsQuery
    )) ?? {};

  const email = cms.contactEmail || "hello@digipaja.fi";
  const phone = cms.contactPhone || "";
  const currentYear = new Date().getFullYear();
  const basePath = `/${locale}`;

  const navLinks = [
    { href: `${basePath}#hero`, label: m.heroLink },
    { href: `${basePath}#why-us`, label: m.whyUsLink },
    { href: `${basePath}#process`, label: m.processLink },
    { href: `${basePath}#services`, label: m.servicesLink },
    { href: `${basePath}#work`, label: m.workLink },
    { href: `${basePath}#pricing`, label: m.pricingLink },
    { href: `${basePath}#contact`, label: m.contactLink },
  ];

  return (
    <FooterUI 
        data={{
            m,
            email,
            phone,
            navLinks,
            currentYear
        }}
    />
  );
}