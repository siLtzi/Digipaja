import { groq } from "next-sanity";

export const heroSettingsQuery = groq /* groq */ `
*[_type == "siteSettings"][0]{
  heroBadge_fi,
  heroTitle_fi,
  heroSubtitle_fi,
  heroCtaPrimary_fi,
  heroCtaSecondary_fi,
  heroTechLine_fi
}
`;
export const brothersSettingsQuery = groq /* groq */ `
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
export const whyUsSettingsQuery = groq /* groq */ `
*[_type == "siteSettings"][0]{
  whyUsEyebrow_fi,
  whyUsTitle_fi,
  whyUsSubtitle_fi,
  whyUsPoint1Title_fi,
  whyUsPoint1Body_fi,
  whyUsPoint2Title_fi,
  whyUsPoint2Body_fi,
  whyUsPoint3Title_fi,
  whyUsPoint3Body_fi,
  whyUsPoint4Title_fi,
  whyUsPoint4Body_fi
}
`;
export const processSettingsQuery = groq /* groq */ `
*[_type == "siteSettings"][0]{
  processEyebrow_fi,
  processTitle_fi,
  processSubtitle_fi,
  processStep1Label_fi,
  processStep1Title_fi,
  processStep1Body_fi,
  processStep2Label_fi,
  processStep2Title_fi,
  processStep2Body_fi,
  processStep3Label_fi,
  processStep3Title_fi,
  processStep3Body_fi,
  processStep4Label_fi,
  processStep4Title_fi,
  processStep4Body_fi
}
`;
export const servicesSettingsQuery = groq /* groq */ `
*[_type == "siteSettings"][0]{
  servicesEyebrow_fi,
  servicesTitle_fi,
  servicesSubtitle_fi,
  servicesService1Label_fi,
  servicesService1Title_fi,
  servicesService1Body_fi,
  servicesService2Label_fi,
  servicesService2Title_fi,
  servicesService2Body_fi,
  servicesService3Label_fi,
  servicesService3Title_fi,
  servicesService3Body_fi
}
`;
export const projectsQuery = groq /* groq */ `
*[_type == "project"] | order(_createdAt desc)[0...8]{
  _id,
  title,
  tag,
  url,
  "imageUrl": image.asset->url
}
`;
export const workSettingsQuery = groq /* groq */ `
*[_type == "siteSettings"][0]{
  workEyebrow_fi,
  workTitle_fi,
  workSubtitle_fi,
  workCtaLabel_fi
}
`;
export const pricingSettingsQuery = groq /* groq */ `
*[_type == "siteSettings"][0]{
  pricingEyebrow_fi,
  pricingTitle_fi,
  pricingSubtitle_fi,
  pricingPlan1Name_fi,
  pricingPlan1Price_fi,
  pricingPlan1Body_fi,
  pricingPlan1Includes_fi,
  pricingPlan2Name_fi,
  pricingPlan2Price_fi,
  pricingPlan2Body_fi,
  pricingPlan2Includes_fi,
  pricingPlan3Name_fi,
  pricingPlan3Price_fi,
  pricingPlan3Body_fi,
  pricingPlan3Includes_fi,
  pricingNote_fi
}
`;
export const contactSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    contactEyebrow_fi,
    contactTitle_fi,
    contactSubtitle_fi,
    contactEmailLabel_fi,
    contactNote_fi,
    contactEmail,
    contactPhone
  }
`;
