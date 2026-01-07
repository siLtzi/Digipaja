import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { sanityClient } from "@/sanity/config";
import { serviceBySlugQuery } from "@/sanity/queries";
import ServiceClientAnimation from "./client-animation";

type ServiceDetailProps = {
  params: Promise<{
    locale: "fi" | "en";
    slug: string;
  }>;
};

type ServiceData = {
  title: string;
  slug: string;
  language: string;
  description?: string;
  body: string;
  features?: string[];
  imageUrl?: string;
  videoUrl?: string;
  speechDeck?: {
    ctaTitleHtml?: string;
    ctaBody?: string;
    beats?: Array<{
      _key: string;
      title: string;
      body: string;
      anim?: string;
      iconName?: string;
      iconThemeHint?: string;
      imageUrl?: string;
      imageAlt?: string;
      lottiePath?: string;
      lottieFileUrl?: string;
      lottieLoop?: boolean;
      lottieSpeed?: number;
    }>;
  };
};

const BASE_URL = "https://digipajaoulu.fi";

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  const service = await sanityClient.fetch<ServiceData | null>(serviceBySlugQuery, {
    slug,
    locale,
  });
  
  if (!service) {
    return {
      title: locale === "fi" ? "Palvelu ei löytynyt" : "Service not found",
    };
  }
  
  const isFi = locale === "fi";
  
  return {
    title: service.title,
    description: service.description || service.body?.substring(0, 160),
    alternates: {
      canonical: `${BASE_URL}/${locale}/services/${slug}`,
      languages: {
        fi: `${BASE_URL}/fi/services/${slug}`,
        en: `${BASE_URL}/en/services/${slug}`,
      },
    },
    openGraph: {
      title: `${service.title} | Digipaja`,
      description: service.description || service.body?.substring(0, 160),
      url: `${BASE_URL}/${locale}/services/${slug}`,
      siteName: "Digipaja",
      locale: isFi ? "fi_FI" : "en_US",
      type: "article",
      images: service.imageUrl ? [{ url: service.imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Digipaja`,
      description: service.description || service.body?.substring(0, 160),
      images: service.imageUrl ? [service.imageUrl] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { locale, slug } = await params;

  const service = await sanityClient.fetch<ServiceData | null>(serviceBySlugQuery, {
    slug,
    locale,
  });

  if (!service) {
    notFound();
  }

  const isFi = locale === "fi";

  // JSON-LD Service schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description || service.body?.substring(0, 160),
    url: `${BASE_URL}/${locale}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Digipaja",
      url: BASE_URL,
      logo: `${BASE_URL}/icons/favicon-196x196.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Oulu",
        addressCountry: "FI",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Finland",
    },
    serviceType: service.title,
    ...(service.imageUrl && { image: service.imageUrl }),
  };

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isFi ? "Etusivu" : "Home",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isFi ? "Palvelut" : "Services",
        item: `${BASE_URL}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${BASE_URL}/${locale}/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceClientAnimation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#050609] pt-32 pb-20 lg:pt-40 lg:pb-28 text-zinc-100">
        {/* Multi-layer laser separator */}
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-center overflow-hidden">
          <div className="h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_rgba(255,138,60,0.8),0_0_40px_rgba(255,138,60,0.4)]" />
          <div className="absolute top-0 h-[3px] w-1/2 max-w-2xl bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] opacity-70" />
          <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-[#ff8a3c]/0 via-[#ff8a3c]/40 to-[#ff8a3c]/0" />
        </div>

        {/* Tech grid background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
          
          {/* Spotlight gradient */}
          <div
            className="absolute left-1/2 top-1/2 h-[900px] w-[1400px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,138,60,0.12) 0%, rgba(255,138,60,0.04) 40%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Back button */}
          <div className="animate-hero mb-12 opacity-0">
            <Link
              href={`/${locale}/#services`}
              className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-[#ff8a3c]"
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              TAKAISIN PALVELUIHIN
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
            {/* Left column - Content */}
            <div className="space-y-8">
              {/* Title */}
              <h1
                className="animate-hero text-balance text-4xl font-bold leading-none text-white opacity-0 sm:text-5xl lg:text-[4rem]"
                style={{ fontFamily: "var(--font-goldman)" }}
              >
                {service.title}
              </h1>

              {/* Description */}
              {service.description && (
                <div className="animate-hero relative border-l-2 border-[#ff8a3c]/30 pl-6 py-1 opacity-0">
                  <div className="absolute left-0 top-0 h-16 w-[2px] bg-[#ff8a3c] shadow-[0_0_10px_rgba(255,138,60,0.4)]" />
                  <p className="text-lg leading-relaxed text-zinc-400 italic">
                    "{service.description}"
                  </p>
                </div>
              )}

              {/* Body */}
              <div className="animate-hero prose prose-invert max-w-none opacity-0">
                <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                  {service.body}
                </p>
              </div>
            </div>

            {/* Right column - Features card */}
            {service.features && service.features.length > 0 && (
              <div className="animate-hero opacity-0">
                <div className="group relative overflow-hidden rounded-lg border border-[#ff8a3c]/20 bg-gradient-to-b from-[#0a0a0a] to-[#050609] p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#ff8a3c]/40 hover:shadow-[0_0_40px_rgba(255,138,60,0.15)]">
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c]/30 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#ff8a3c]/60" />
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#ff8a3c]/30 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#ff8a3c]/60" />
                  <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/5 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-white/10" />
                  <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/5 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-white/10" />
                  
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="relative space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="h-[1px] w-6 bg-gradient-to-r from-[#ff8a3c] to-transparent" />
                      <h3
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className="text-lg font-bold uppercase tracking-wider text-[#ff8a3c]"
                      >
                        Keskeiset ominaisuudet
                      </h3>
                    </div>

                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="animate-feature group/feat flex items-start gap-3 opacity-0"
                        >
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-[#ff8a3c] shadow-[0_0_8px_rgba(255,138,60,0.8)] transition-shadow duration-300 group-hover/feat:shadow-[0_0_12px_rgba(255,138,60,1)]" />
                          <span className="text-sm leading-relaxed text-zinc-300 transition-colors duration-300 group-hover/feat:text-white">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Content Section - Speech Deck */}
      {service.speechDeck?.beats && service.speechDeck.beats.length > 0 && (
        <section className="relative overflow-hidden bg-[#0a0a0a] py-24 lg:py-32 text-zinc-100">
          {/* Tech grid background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            {/* Section header */}
            {service.speechDeck.ctaTitleHtml && (
              <div className="mb-16 text-center">
                <h2
                  className="text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-goldman)" }}
                  dangerouslySetInnerHTML={{ __html: service.speechDeck.ctaTitleHtml }}
                />
                {service.speechDeck.ctaBody && (
                  <p className="mt-6 mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">
                    {service.speechDeck.ctaBody}
                  </p>
                )}
              </div>
            )}

            {/* Beats grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {service.speechDeck.beats.map((beat, idx) => (
                <div
                  key={beat._key}
                  className="group relative overflow-hidden rounded-lg border border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#050609] p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#ff8a3c]/30 hover:translate-y-[-4px] hover:shadow-[0_0_30px_rgba(255,138,60,0.1)]"
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c]/20 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-[#ff8a3c]/50" />
                  <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c]/20 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-[#ff8a3c]/50" />

                  {/* Number badge */}
                  <div className="mb-4 inline-flex items-center justify-center rounded border border-[#ff8a3c]/30 bg-[#ff8a3c]/10 px-3 py-1">
                    <span
                      style={{ fontFamily: "var(--font-goldman)" }}
                      className="text-xs font-bold text-[#ff8a3c]"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Image if available */}
                  {beat.imageUrl && (
                    <div className="relative mb-4 h-40 w-full overflow-hidden rounded">
                      <Image
                        src={beat.imageUrl}
                        alt={beat.imageAlt || beat.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <h3
                    className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#ff8a3c]"
                    style={{ fontFamily: "var(--font-goldman)" }}
                  >
                    {beat.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-400">
                    {beat.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#050609] py-20 lg:py-24 text-zinc-100">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,138,60,0.08),transparent_70%)]" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2
            className="mb-6 text-3xl font-bold leading-none text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            Kiinnostuitko?
          </h2>
          <p className="mb-8 text-base text-zinc-400 sm:text-lg">
            Ota yhteyttä ja keskustellaan, miten voimme auttaa sinua saavuttamaan tavoitteesi.
          </p>
          
          <Link
            href={`/${locale}/yhteydenotto`}
            style={{ fontFamily: "var(--font-goldman)" }}
            className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] cursor-pointer"
          >
            <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
            <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
            <span className="relative z-10">OTA YHTEYTTÄ</span>
            <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
