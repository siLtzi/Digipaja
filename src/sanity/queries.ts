import { groq } from "next-sanity";

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
    aboutUsEyebrow_fi,
    aboutUsEyebrow_en,
    aboutUsTitle_fi,
    aboutUsTitle_en,
    aboutUsSubtitle_fi,
    aboutUsSubtitle_en,
    aboutUsTechTitle_fi,
    aboutUsTechTitle_en,
    aboutUsTechBody_fi,
    aboutUsTechBody_en,
    aboutUsBizTitle_fi,
    aboutUsBizTitle_en,
    aboutUsBizBody_fi,
    aboutUsBizBody_en,
    aboutUsNote_fi,
    aboutUsNote_en,
    // image URLs:
    "samuliPhoto": samuliPhoto.asset->url,
    "joukoPhoto": joukoPhoto.asset->url
  }
`;
export const servicesSettingsQuery = groq`
  *[_type == "servicesSettings"][0]{
    eyebrow_fi,
    title_fi,
    subtitle_fi,
    services_fi[]{
      title,
      body
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
    "mobileImage": mobileImage.asset->url, // <--- ADD THIS LINE
    technologies
  }
}`;
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