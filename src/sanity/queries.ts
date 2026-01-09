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
  heroTitle_fi,
  heroHighlight_fi,
  heroSubtitle_fi,
  "heroDesktopVideo": heroDesktopVideo.asset->url,
  "heroMobileVideo": heroMobileVideo.asset->url
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
    aboutUsDescription2_fi,
    aboutUsDescription2_en,
    aboutUsBulletPoint_fi,
    aboutUsBulletPoint_en,
    aboutUsCta_fi,
    aboutUsCta_en,
    
    // Mission & Values
    missionTitle_fi,
    missionTitle_en,
    missionText_fi,
    missionText_en,
    valuesTitle_fi,
    valuesTitle_en,
    values_fi,
    values_en,
    
    // Statistics
    statsTitle_fi,
    statsTitle_en,
    stat1Value,
    stat1Label_fi,
    stat1Label_en,
    stat2Value,
    stat2Label_fi,
    stat2Label_en,
    stat3Value,
    stat3Label_fi,
    stat3Label_en,
    stat4Value,
    stat4Label_fi,
    stat4Label_en,
    
    // Team - Samuli
    aboutUsTechTitle_fi,
    aboutUsTechTitle_en,
    aboutUsTechBody_fi,
    aboutUsTechBody_en,
    samuliRole_fi,
    samuliRole_en,
    samuliQuote_fi,
    samuliQuote_en,
    "samuliPhoto": samuliPhoto.asset->url,
    
    // Team - Jouko
    aboutUsBizTitle_fi,
    aboutUsBizTitle_en,
    aboutUsBizBody_fi,
    aboutUsBizBody_en,
    joukoRole_fi,
    joukoRole_en,
    joukoQuote_fi,
    joukoQuote_en,
    "joukoPhoto": joukoPhoto.asset->url,
    
    // Footer
    aboutUsNote_fi,
    aboutUsNote_en
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
    "eyebrow_fi": eyebrow.fi,
    "title_fi": title.fi,
    "subtitle_fi": subtitle.fi,
    "tiers_fi": tiers[] {
      "name": name.fi,
      "price": price.fi,
      "monthlyLabel": monthlyPayment.label_fi,
      "monthlyValue": monthlyPayment.value_fi,
      "monthlyIncluded": monthlyPayment.included_fi,
      "monthlyExcluded": monthlyPayment.excluded_fi,
      "description": description.fi,
      "features": features.fi,
      "cta": cta.fi,
      highlight
    },
    "eyebrow_en": eyebrow.en,
    "title_en": title.en,
    "subtitle_en": subtitle.en,
    "tiers_en": tiers[] {
      "name": name.en,
      "price": price.en,
      "monthlyLabel": monthlyPayment.label_en,
      "monthlyValue": monthlyPayment.value_en,
      "monthlyIncluded": monthlyPayment.included_en,
      "monthlyExcluded": monthlyPayment.excluded_en,
      "description": description.en,
      "features": features.en,
      "cta": cta.en,
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