import { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/config";

const BASE_URL = "https://digipajaoulu.fi";

// Query to get all service slugs from Sanity
const servicesQuery = `*[_type == "service"] {
  "slugFi": slug_fi.current,
  "slugEn": slug_en.current,
  _updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic service pages
  const services = await sanityClient.fetch<Array<{
    slugFi: string;
    slugEn: string;
    _updatedAt: string;
  }>>(servicesQuery);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    // Finnish pages
    {
      url: `${BASE_URL}/fi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi`,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/fi/yhteydenotto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi/yhteydenotto`,
          en: `${BASE_URL}/en/yhteydenotto`,
        },
      },
    },
    {
      url: `${BASE_URL}/fi/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi/services`,
          en: `${BASE_URL}/en/services`,
        },
      },
    },
    // English pages
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi`,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/yhteydenotto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi/yhteydenotto`,
          en: `${BASE_URL}/en/yhteydenotto`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi/services`,
          en: `${BASE_URL}/en/services`,
        },
      },
    },
    // Legal pages - Finnish
    {
      url: `${BASE_URL}/fi/tietosuoja`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi/tietosuoja`,
          en: `${BASE_URL}/en/tietosuoja`,
        },
      },
    },
    {
      url: `${BASE_URL}/fi/kayttoehdot`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi/kayttoehdot`,
          en: `${BASE_URL}/en/kayttoehdot`,
        },
      },
    },
    // Legal pages - English
    {
      url: `${BASE_URL}/en/tietosuoja`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi/tietosuoja`,
          en: `${BASE_URL}/en/tietosuoja`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/kayttoehdot`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          fi: `${BASE_URL}/fi/kayttoehdot`,
          en: `${BASE_URL}/en/kayttoehdot`,
        },
      },
    },
  ];

  // Dynamic service pages
  const servicePages: MetadataRoute.Sitemap = services.flatMap((service) => {
    const pages: MetadataRoute.Sitemap = [];
    
    if (service.slugFi) {
      pages.push({
        url: `${BASE_URL}/fi/services/${service.slugFi}`,
        lastModified: new Date(service._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            fi: `${BASE_URL}/fi/services/${service.slugFi}`,
            en: service.slugEn ? `${BASE_URL}/en/services/${service.slugEn}` : undefined,
          },
        },
      });
    }
    
    if (service.slugEn) {
      pages.push({
        url: `${BASE_URL}/en/services/${service.slugEn}`,
        lastModified: new Date(service._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            fi: service.slugFi ? `${BASE_URL}/fi/services/${service.slugFi}` : undefined,
            en: `${BASE_URL}/en/services/${service.slugEn}`,
          },
        },
      });
    }
    
    return pages;
  });

  return [...staticPages, ...servicePages];
}
