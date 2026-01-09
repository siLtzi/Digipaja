import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import CTA from "@/components/sections/CTA";
import Services from "@/components/sections/Services";
import References from "@/components/sections/References"; 
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Pricing from "@/components/sections/Pricing"

const BASE_URL = "https://digipajaoulu.fi";

// Disable caching for this page to always fetch fresh Sanity data
export const dynamic = 'force-dynamic';

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFi = locale === "fi";

  const title = isFi
    ? "Digipaja – Modernit verkkosivut yrityksille | Web-kehitys Oulu"
    : "Digipaja – Modern Websites for Businesses | Web Development";

  const description = isFi
    ? "Digipaja rakentaa moderneja, nopeita ja hakukoneystävällisiä verkkosivuja suomalaisille yrityksille. Next.js, React ja Sanity CMS erikoisosaamista Oulussa."
    : "Digipaja builds modern, fast, and SEO-optimized websites for businesses using Next.js, React, and Sanity CMS.";

  const keywords = isFi 
    ? ["verkkosivut yritykselle", "kotisivut", "web-kehitys Oulu", "Next.js kehitys", "React verkkosivut", "verkkokauppa", "SEO optimointi", "nopeat verkkosivut", "moderni web design"]
    : ["business websites", "web development", "Next.js development", "React websites", "e-commerce", "SEO optimization", "fast websites", "modern web design"];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "fi-FI": `${BASE_URL}/fi`,
        "en-US": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isFi ? "fi_FI" : "en_US",
      alternateLocale: isFi ? "en_US" : "fi_FI",
      url: `${BASE_URL}/${locale}`,
      siteName: "Digipaja",
      images: [
        {
          url: "/image/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/og-image.png"],
    },
  };
}

// JSON-LD Structured Data Component
function JsonLd({ locale }: { locale: string }) {
  const isFi = locale === "fi";
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Digipaja",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/image/digipaja-logo.png`,
      width: 512,
      height: 512,
    },
    description: isFi 
      ? "Digipaja rakentaa moderneja verkkosivuja suomalaisille yrityksille"
      : "Digipaja builds modern websites for businesses",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Oulu",
      addressCountry: "FI",
    },
    areaServed: {
      "@type": "Country",
      name: "Finland",
    },
    sameAs: [
      "https://linkedin.com/company/digipaja",
      "https://github.com/digipaja",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Finnish", "English"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Digipaja",
    description: isFi 
      ? "Modernit verkkosivut yrityksille"
      : "Modern websites for businesses",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: [
      { "@type": "Language", name: "Finnish", alternateName: "fi" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/#service`,
    name: isFi ? "Verkkosivujen kehitys" : "Web Development",
    description: isFi
      ? "Modernit, nopeat ja hakukoneystävälliset verkkosivut yrityksille"
      : "Modern, fast, and SEO-optimized websites for businesses",
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    serviceType: isFi ? "Verkkosivujen suunnittelu ja kehitys" : "Website Design and Development",
    areaServed: {
      "@type": "Country",
      name: "Finland",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isFi ? "Verkkosivupalvelut" : "Web Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFi ? "Startti-paketti" : "Starter Package",
            description: isFi ? "Nopea landing page" : "Quick landing page",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFi ? "Kasvu-paketti" : "Growth Package",
            description: isFi ? "Ammattimainen verkkosivusto" : "Professional website",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFi ? "Pro-paketti" : "Pro Package",
            description: isFi ? "Täysi digitaalinen ratkaisu" : "Full digital solution",
          },
        },
      ],
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Digipaja",
    description: isFi 
      ? "Web-kehitysyritys Oulussa"
      : "Web development company in Oulu",
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Oulu",
      addressRegion: "Pohjois-Pohjanmaa",
      addressCountry: "FI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 65.0121,
      longitude: 25.4651,
    },
    priceRange: "€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isFi ? "Etusivu" : "Home",
        item: `${BASE_URL}/${locale}`,
      },
    ],
  };

  const schemas = [
    organizationSchema,
    websiteSchema,
    serviceSchema,
    localBusinessSchema,
    breadcrumbSchema,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// --- MAIN PAGE COMPONENT ---
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <>
      <JsonLd locale={locale} />
      <article className="relative min-h-screen selection:bg-[#ff8a3c]/30 selection:text-[#ff8a3c]">
        <div className="relative z-10">
          <Hero locale={locale} />
          <AboutUs locale={locale} />
          <CTA locale={locale} />
          <Services locale={locale} />
          <References locale={locale} />
          <Process locale={locale} />    
          <WhyUs locale={locale} />
          <Pricing locale={locale} />
        </div>
      </article>
    </>
  );
}