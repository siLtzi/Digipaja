import { Metadata } from "next";
import ContactPageContent from "./page-content";
import { sanityClient } from "@/sanity/config";
import { pricingSettingsQuery, contactPageSettingsQuery } from "@/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const BASE_URL = "https://digipajaoulu.fi";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFi = locale === "fi";
  
  return {
    title: isFi ? "Yhteydenotto" : "Contact Us",
    description: isFi 
      ? "Ota yhteyttä Digipajaan ja kerro projektistasi. Autamme sinua rakentamaan unelmiesi verkkosivuston. Ilmainen arvio projektillesi." 
      : "Contact Digipaja and tell us about your project. We help you build your dream website. Free project estimate.",
    keywords: isFi
      ? ["yhteydenotto", "tarjouspyyntö", "verkkosivut", "verkkokauppa", "Oulu", "web-kehitys"]
      : ["contact", "quote request", "websites", "e-commerce", "Oulu", "web development"],
    alternates: {
      canonical: `${BASE_URL}/${locale}/yhteydenotto`,
      languages: {
        fi: `${BASE_URL}/fi/yhteydenotto`,
        en: `${BASE_URL}/en/yhteydenotto`,
      },
    },
    openGraph: {
      title: isFi ? "Yhteydenotto | Digipaja" : "Contact Us | Digipaja",
      description: isFi 
        ? "Ota yhteyttä ja kerro projektistasi. Ilmainen arvio projektillesi." 
        : "Contact us and tell us about your project. Free project estimate.",
      url: `${BASE_URL}/${locale}/yhteydenotto`,
      siteName: "Digipaja",
      locale: isFi ? "fi_FI" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isFi ? "Yhteydenotto | Digipaja" : "Contact Us | Digipaja",
      description: isFi 
        ? "Ota yhteyttä ja kerro projektistasi." 
        : "Contact us and tell us about your project.",
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const isFi = locale === "fi";
  
  // Fetch pricing data
  const pricingCms = await sanityClient.fetch(pricingSettingsQuery) ?? {};
  const tiers: PricingTier[] = isFi 
    ? (pricingCms.tiers_fi ?? []) 
    : (pricingCms.tiers_en ?? []);
  
  // Fetch contact page settings
  const contactPageCms = await sanityClient.fetch(contactPageSettingsQuery) ?? {};
  
  return (
    <ContactPageContent 
      locale={locale} 
      pricingTiers={tiers}
      cmsContent={contactPageCms}
    />
  );
}
