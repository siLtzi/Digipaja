import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Services from "@/components/sections/Services";
import References from "@/components/sections/References"; 
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Pricing from "@/components/sections/Pricing"
import Contact from "@/components/sections/Contact";

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFi = locale === "fi";

  const title = isFi
    ? "Modernit Verkkosivut & Web-kehitys – Digipaja"
    : "Modern Websites & Web Development – Digipaja";

  const description = isFi
    ? "Digipaja rakentaa moderneja, nopeita ja SEO-optimoituja verkkosivuja yrityksille Next.js:llä, Reactilla ja Sanityllä."
    : "Digipaja builds modern, fast, and SEO-optimized websites for businesses using Next.js, React, and Sanity.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale,
      url: "https://digipajaoulu.fi",
      siteName: "Digipaja",
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: title,
        description: description,
        provider: {
          "@type": "Organization",
          name: "Digipaja",
          url: "https://digipajaoulu.fi",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Oulu",
            addressCountry: "FI",
          },
        },
        serviceType: isFi ? "Verkkosivujen kehitys" : "Web Development",
        areaServed: "Finland",
      }),
    },
  };
}

// --- MAIN PAGE COMPONENT ---
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <main className="relative min-h-screen selection:bg-[#ff8a3c]/30 selection:text-[#ff8a3c]">
      <div className="relative z-10">
        <Hero locale={locale} />
        <AboutUs locale={locale} />
        <Services locale={locale} />
        <References locale={locale} />
        <Process locale={locale} />    
        <WhyUs locale={locale} />
        <Pricing locale={locale} />
        <Contact locale={locale} />
      </div>
    </main>
  );
}