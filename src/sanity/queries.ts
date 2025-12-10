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