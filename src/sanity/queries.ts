import { groq } from "next-sanity";

export const servicesOverviewQuery = groq`
  *[_type == "servicesOverview" && language == $locale][0]{
    eyebrow,
    title,
    subtitle,
    "heroVideo": heroVideo.asset->url,
    services[]{
      slug,
      title,
      shortDescription,
      longDescription,
      icon,
      features,
      benefits,
      "imageUrl": image.asset->url,
      "videoUrl": video.asset->url,
      "gallery": gallery[]{
        type,
        "imageUrl": image.asset->url,
        "videoUrl": video.asset->url
      }
    }
  }
`;

export const heroSettingsQuery = groq`
*[_type == "heroSettings"][0]{
  heroEyebrow_fi,
  heroEyebrow_en,
  heroTitleStart_fi,
  heroTitleStart_en,
  heroTitleAccent_fi,
  heroTitleAccent_en,
  heroRotatingWords_fi,
  heroRotatingWords_en,
  heroTitleEnd_fi,
  heroTitleEnd_en,
  heroSubtitle_fi,
  heroSubtitle_en,
  heroPrimaryCta_fi,
  heroPrimaryCta_en,
  heroSecondaryCta_fi,
  heroSecondaryCta_en,
  "heroDesktopVideo": heroDesktopVideo.asset->url,
  "heroMobileVideo": heroMobileVideo.asset->url,
  "metricsLabel_fi": metricsLabel.fi,
  "metricsLabel_en": metricsLabel.en,
  "metricsSubtitle_fi": metricsSubtitle.fi,
  "metricsSubtitle_en": metricsSubtitle.en,
  "metricsFootnote_fi": metricsFootnote.fi,
  "metricsFootnote_en": metricsFootnote.en
}
`;
export const aboutUsSettingsQuery = groq`
  *[_type == "aboutUsSettings"][0]{
    // Hero
    aboutUsEyebrow_fi,
    aboutUsEyebrow_en,
    aboutUsTitle_fi,
    aboutUsTitle_en,
    aboutUsSubtitle_fi,
    aboutUsSubtitle_en,
    
    // Footer
    aboutUsDescription2_fi,
    aboutUsDescription2_en,
    aboutUsBulletPoint_fi,
    aboutUsBulletPoint_en,
    "cta_fi": cta.fi,
    "cta_en": cta.en,
    
    // Team - Samuli
    samuliName,
    samuliRole_fi,
    samuliRole_en,
    aboutUsTechTitle_fi,
    aboutUsTechTitle_en,
    aboutUsTechBody_fi,
    aboutUsTechBody_en,
    samuliQuote_fi,
    samuliQuote_en,
    
    // Team - Jouko
    joukoName,
    joukoRole_fi,
    joukoRole_en,
    aboutUsBizTitle_fi,
    aboutUsBizTitle_en,
    aboutUsBizBody_fi,
    aboutUsBizBody_en,
    joukoQuote_fi,
    joukoQuote_en,
    
    // Stats
    stats[]{
      value,
      label_fi,
      label_en
    },
    
    // Values & Mission
    "missionTitle_fi": missionTitle.fi,
    "missionTitle_en": missionTitle.en,
    "missionText_fi": missionText.fi,
    "missionText_en": missionText.en,
    "valuesTitle_fi": valuesTitle.fi,
    "valuesTitle_en": valuesTitle.en,
    values[]{
      title_fi,
      title_en,
      description_fi,
      description_en
    }
  }
`;
export const servicesSettingsQuery = groq`
  *[_type == "servicesSettings"][0]{
    eyebrow_fi,
    title_fi,
    subtitle_fi,
    services_fi[]{
      title,
      body,
      "slug": slug.current // <--- CRITICAL: Needed for the link to work
    },
    // Same for English if you use it
    eyebrow_en,
    title_en,
    subtitle_en,
    services_en[]{
      title,
      body,
      "slug": slug.current
    }
  }
`;
export const referencesQuery = groq`{
  "settings": *[_type == "referencesSettings"][0] {
    eyebrow_fi, eyebrow_en,
    title_fi, title_en,
    subtitle_fi, subtitle_en
  },
  "projects": *[_type == "project"] | order(publishedAt desc)[0...5] {
    title,
    "slug": slug.current,
    category,
    description_fi,
    description_en,
    "image": mainImage.asset->url,
    "mobileImage": mobileImage.asset->url,
    liveUrl,
    technologies
  }
}`;

// Single project by slug for project detail page
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    category,
    clientName,
    projectYear,
    projectDuration,
    description_fi,
    description_en,
    challenge_fi,
    challenge_en,
    solution_fi,
    solution_en,
    results_fi,
    results_en,
    testimonial_fi,
    testimonial_en,
    testimonialAuthor,
    keyFeatures_fi,
    keyFeatures_en,
    metrics[]{
      label_fi,
      label_en,
      value
    },
    lighthouseMobile{
      performance,
      accessibility,
      bestPractices,
      seo
    },
    lighthouseDesktop{
      performance,
      accessibility,
      bestPractices,
      seo
    },
    "mainImage": mainImage.asset->url,
    "mobileImage": mobileImage.asset->url,
    "gallery": gallery[].asset->url,
    liveUrl,
    technologies,
    publishedAt
  }
`;

// All project slugs for static generation
export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const processSettingsQuery = groq`
  *[_type == "processSettings"][0]{
    processEyebrow_fi,
    processEyebrow_en,
    processTitle_fi,
    processTitle_en,
    processSubtitle_fi,
    processSubtitle_en,
    steps[]{
      title_fi,
      title_en,
      description_fi,
      description_en
    }
  }
`;
export const whyUsSettingsQuery = groq`
  *[_type == "whyUsSettings"][0]{
    whyUsEyebrow_fi,
    whyUsEyebrow_en,
    whyUsTitle_fi,
    whyUsTitle_en,
    whyUsSubtitle_fi,
    whyUsSubtitle_en,
    cards[]{
      title_fi,
      title_en,
      description_fi,
      description_en,
      icon
    }
  }
`;
export const pricingSettingsQuery = `
  *[_type == "pricingSettings"][0] {
    eyebrow_fi,
    title_fi,
    subtitle_fi,
    "tiers_fi": tiers[] {
      "name": name_fi,
      "price": price_fi,
      "monthlyLabel": monthlyLabel_fi,
      "monthlyValue": monthlyValue_fi,
      "monthlyIncluded": monthlyIncluded_fi,
      "monthlyExcluded": monthlyExcluded_fi,
      "description": description_fi,
      "features": features_fi,
      "cta": cta_fi,
      highlight
    },
    eyebrow_en,
    title_en,
    subtitle_en,
    "tiers_en": tiers[] {
      "name": name_en,
      "price": price_en,
      "monthlyLabel": monthlyLabel_en,
      "monthlyValue": monthlyValue_en,
      "monthlyIncluded": monthlyIncluded_en,
      "monthlyExcluded": monthlyExcluded_en,
      "description": description_en,
      "features": features_en,
      "cta": cta_en,
      highlight
    }
  }
`;
export const contactSettingsQuery = `
  *[_type == "contactSettings"][0] {
    // General Details
    "email": general.email,
    "phone": general.phone,

    // Finnish Content 
    "eyebrow_fi": finnishContent.eyebrow_fi,
    "title_fi": finnishContent.title_fi,
    "subtitle_fi": finnishContent.subtitle_fi,
    "contactTitle_fi": finnishContent.contactTitle_fi,
    "contactSubtitle_fi": finnishContent.contactSubtitle_fi,
    "ctaText_fi": finnishContent.ctaText_fi,
    "formTitle_fi": finnishContent.formTitle_fi,
    "formSubtitle_fi": finnishContent.formSubtitle_fi,
    "formCta_fi": finnishContent.formCta_fi,
    "formNameLabel_fi": finnishContent.formNameLabel_fi,
    "formEmailLabel_fi": finnishContent.formEmailLabel_fi,
    "formCompanyLabel_fi": finnishContent.formCompanyLabel_fi,
    "formMessageLabel_fi": finnishContent.formMessageLabel_fi,

    // English Content 
    "eyebrow_en": englishContent.eyebrow_en,
    "title_en": englishContent.title_en,
    "subtitle_en": englishContent.subtitle_en,
    "contactTitle_en": englishContent.contactTitle_en,
    "contactSubtitle_en": englishContent.contactSubtitle_en,
    "ctaText_en": englishContent.ctaText_en,
    "formTitle_en": englishContent.formTitle_en,
    "formSubtitle_en": englishContent.formSubtitle_en,
    "formCta_en": englishContent.formCta_en,
    "formNameLabel_en": englishContent.formNameLabel_en,
    "formEmailLabel_en": englishContent.formEmailLabel_en,
    "formCompanyLabel_en": englishContent.formCompanyLabel_en,
    "formMessageLabel_en": englishContent.formMessageLabel_en,
  }
`;
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug && language == $locale][0]{
    title,
    "slug": slug.current,
    language,
    description,
    body,
    features,
    "imageUrl": mainImage.asset->url,
    "videoUrl": heroVideo.asset->url,
    speechDeck{
      ctaTitleHtml,
      ctaBody,
      beats[]{
        _key,
        title,
        body,
        anim,
        iconName,
        iconThemeHint,
        "imageUrl": image.asset->url,
        imageAlt,
        lottiePath,
        "lottieFileUrl": lottieFile.asset->url,
        lottieLoop,
        lottieSpeed
      }
    }
  }
`;

export const contactPageSettingsQuery = `
  *[_type == "contactPageSettings"][0] {
    hero {
      eyebrow,
      title,
      titleAccent,
      subtitle
    },
    steps {
      contact,
      package,
      project,
      features,
      details
    },
    sectionHeaders {
      contact {
        number,
        title,
        description
      },
      package {
        number,
        title,
        description
      },
      project {
        number,
        title,
        description
      },
      features {
        number,
        title,
        description
      },
      details {
        number,
        title,
        description
      }
    },
    formLabels,
    projectTypes[] {
      id,
      icon,
      label,
      description
    },
    features[] {
      id,
      label,
      description
    },
    timelineOptions[] {
      id,
      label,
      description
    },
    budgetRanges[] {
      id,
      label
    },
    howFoundOptions[] {
      id,
      label
    },
    buttons,
    success,
    sidebar,
    popularBadge
  }
`;

// SITE SETTINGS
export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    companyName,
    businessId,
    city,
    country,
    email,
    phoneMain,
    phoneTechnical,
    
    // Footer content
    footerTagline_fi,
    footerTagline_en,
    footerDescription_fi,
    footerDescription_en,
    footerCtaBadge_fi,
    footerCtaBadge_en,
    footerCtaTitle_fi,
    footerCtaTitle_en,
    footerCtaDescription_fi,
    footerCtaDescription_en,
    footerCtaButton_fi,
    footerCtaButton_en,
    
    // Links
    socialLinks[]{
      platform,
      url
    },
    navItems[]{
      id,
      label_fi,
      label_en
    },
    footerLinks[]{
      label_fi,
      label_en,
      href
    },
    legalLinks[]{
      label_fi,
      label_en,
      href
    }
  }
`;

// CTA SETTINGS
export const ctaSettingsQuery = groq`
  *[_type == "ctaSettings"][0]{
    "ctaText_fi": ctaText.fi,
    "ctaText_en": ctaText.en,
    ctaLink
  }
`;

// SPEECH DECK SETTINGS
export const speechDeckSettingsQuery = groq`
  *[_type == "speechDeckSettings"][0]{
    items[]{
      id,
      "title_fi": title.fi,
      "title_en": title.en,
      "body_fi": body.fi,
      "body_en": body.en,
      svgType
    },
    cta{
      "title_fi": title.fi,
      "title_en": title.en,
      "body_fi": body.fi,
      "body_en": body.en
    }
  }
`;
