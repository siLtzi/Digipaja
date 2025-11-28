import { groq } from "next-sanity";

export const heroSettingsQuery = groq/* groq */ `
*[_type == "siteSettings"][0]{
  heroBadge_fi,
  heroTitle_fi,
  heroSubtitle_fi,
  heroCtaPrimary_fi,
  heroCtaSecondary_fi,
  heroTechLine_fi
}
`;
export const brothersSettingsQuery = groq/* groq */ `
*[_type == "siteSettings"][0]{
  brothersEyebrow_fi,
  brothersTitle_fi,
  brothersSubtitle_fi,
  brothersTechTitle_fi,
  brothersTechBody_fi,
  brothersBizTitle_fi,
  brothersBizBody_fi,
  brothersNote_fi
}
`;