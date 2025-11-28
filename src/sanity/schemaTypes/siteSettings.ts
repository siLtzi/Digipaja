import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Digipaja" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "contactEmail", type: "string" }),

    // HERO – FI
    defineField({
      name: "heroBadge_fi",
      title: "Hero badge (FI)",
      type: "string",
    }),
    defineField({
      name: "heroTitle_fi",
      title: "Hero title (FI)",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle_fi",
      title: "Hero subtitle (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroCtaPrimary_fi",
      title: "Hero CTA primary (FI)",
      type: "string",
    }),
    defineField({
      name: "heroCtaSecondary_fi",
      title: "Hero CTA secondary (FI)",
      type: "string",
    }),
    defineField({
      name: "heroTechLine_fi",
      title: "Hero tech line (FI)",
      type: "string",
    }),

    // BROTHERS – FI
    defineField({
      name: "brothersEyebrow_fi",
      title: "Brothers eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "brothersTitle_fi",
      title: "Brothers title (FI)",
      type: "string",
    }),
    defineField({
      name: "brothersSubtitle_fi",
      title: "Brothers subtitle (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "brothersTechTitle_fi",
      title: "Brothers tech title (FI)",
      type: "string",
    }),
    defineField({
      name: "brothersTechBody_fi",
      title: "Brothers tech body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "brothersBizTitle_fi",
      title: "Brothers biz title (FI)",
      type: "string",
    }),
    defineField({
      name: "brothersBizBody_fi",
      title: "Brothers biz body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "brothersNote_fi",
      title: "Brothers note (FI)",
      type: "text",
      rows: 3,
    }),

    // WHY US – FI
    defineField({
      name: "whyUsEyebrow_fi",
      title: "Why Us eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "whyUsTitle_fi",
      title: "Why Us title (FI)",
      type: "string",
    }),
    defineField({
      name: "whyUsSubtitle_fi",
      title: "Why Us subtitle (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whyUsPoint1Title_fi",
      title: "Why Us point 1 title (FI)",
      type: "string",
    }),
    defineField({
      name: "whyUsPoint1Body_fi",
      title: "Why Us point 1 body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whyUsPoint2Title_fi",
      title: "Why Us point 2 title (FI)",
      type: "string",
    }),
    defineField({
      name: "whyUsPoint2Body_fi",
      title: "Why Us point 2 body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whyUsPoint3Title_fi",
      title: "Why Us point 3 title (FI)",
      type: "string",
    }),
    defineField({
      name: "whyUsPoint3Body_fi",
      title: "Why Us point 3 body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whyUsPoint4Title_fi",
      title: "Why Us point 4 title (FI)",
      type: "string",
    }),
    defineField({
      name: "whyUsPoint4Body_fi",
      title: "Why Us point 4 body (FI)",
      type: "text",
      rows: 3,
    }),

    // PROCESS – FI
    defineField({
      name: "processEyebrow_fi",
      title: "Process eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "processTitle_fi",
      title: "Process title (FI)",
      type: "string",
    }),
    defineField({
      name: "processSubtitle_fi",
      title: "Process subtitle (FI)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "processStep1Label_fi",
      title: "Step 1 label (FI)",
      type: "string",
    }),
    defineField({
      name: "processStep1Title_fi",
      title: "Step 1 title (FI)",
      type: "string",
    }),
    defineField({
      name: "processStep1Body_fi",
      title: "Step 1 body (FI)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "processStep2Label_fi",
      title: "Step 2 label (FI)",
      type: "string",
    }),
    defineField({
      name: "processStep2Title_fi",
      title: "Step 2 title (FI)",
      type: "string",
    }),
    defineField({
      name: "processStep2Body_fi",
      title: "Step 2 body (FI)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "processStep3Label_fi",
      title: "Step 3 label (FI)",
      type: "string",
    }),
    defineField({
      name: "processStep3Title_fi",
      title: "Step 3 title (FI)",
      type: "string",
    }),
    defineField({
      name: "processStep3Body_fi",
      title: "Step 3 body (FI)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "processStep4Label_fi",
      title: "Step 4 label (FI)",
      type: "string",
    }),
    defineField({
      name: "processStep4Title_fi",
      title: "Step 4 title (FI)",
      type: "string",
    }),
    defineField({
      name: "processStep4Body_fi",
      title: "Step 4 body (FI)",
      type: "text",
      rows: 3,
    }),

    // SERVICES – FI
    defineField({
      name: "servicesEyebrow_fi",
      title: "Services eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "servicesTitle_fi",
      title: "Services title (FI)",
      type: "string",
    }),
    defineField({
      name: "servicesSubtitle_fi",
      title: "Services subtitle (FI)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "servicesService1Label_fi",
      title: "Service 1 label (FI)",
      type: "string",
    }),
    defineField({
      name: "servicesService1Title_fi",
      title: "Service 1 title (FI)",
      type: "string",
    }),
    defineField({
      name: "servicesService1Body_fi",
      title: "Service 1 body (FI)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "servicesService2Label_fi",
      title: "Service 2 label (FI)",
      type: "string",
    }),
    defineField({
      name: "servicesService2Title_fi",
      title: "Service 2 title (FI)",
      type: "string",
    }),
    defineField({
      name: "servicesService2Body_fi",
      title: "Service 2 body (FI)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "servicesService3Label_fi",
      title: "Service 3 label (FI)",
      type: "string",
    }),
    defineField({
      name: "servicesService3Title_fi",
      title: "Service 3 title (FI)",
      type: "string",
    }),
    defineField({
      name: "servicesService3Body_fi",
      title: "Service 3 body (FI)",
      type: "text",
      rows: 3,
    }),

    // WORK / PORTFOLIO – FI
    defineField({
      name: "workEyebrow_fi",
      title: "Work eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "workTitle_fi",
      title: "Work title (FI)",
      type: "string",
    }),
    defineField({
      name: "workSubtitle_fi",
      title: "Work subtitle (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "workCtaLabel_fi",
      title: "Work CTA label (FI)",
      type: "string",
    }),

    // PRICING – FI
    defineField({
      name: "pricingEyebrow_fi",
      title: "Pricing eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "pricingTitle_fi",
      title: "Pricing title (FI)",
      type: "string",
    }),
    defineField({
      name: "pricingSubtitle_fi",
      title: "Pricing subtitle (FI)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "pricingPlan1Name_fi",
      title: "Plan 1 name (FI)",
      type: "string",
    }),
    defineField({
      name: "pricingPlan1Price_fi",
      title: "Plan 1 price (FI)",
      type: "string",
    }),
    defineField({
      name: "pricingPlan1Body_fi",
      title: "Plan 1 body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pricingPlan1Includes_fi",
      title: "Plan 1 includes (FI)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "pricingPlan2Name_fi",
      title: "Plan 2 name (FI)",
      type: "string",
    }),
    defineField({
      name: "pricingPlan2Price_fi",
      title: "Plan 2 price (FI)",
      type: "string",
    }),
    defineField({
      name: "pricingPlan2Body_fi",
      title: "Plan 2 body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pricingPlan2Includes_fi",
      title: "Plan 2 includes (FI)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "pricingPlan3Name_fi",
      title: "Plan 3 name (FI)",
      type: "string",
    }),
    defineField({
      name: "pricingPlan3Price_fi",
      title: "Plan 3 price (FI)",
      type: "string",
    }),
    defineField({
      name: "pricingPlan3Body_fi",
      title: "Plan 3 body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pricingPlan3Includes_fi",
      title: "Plan 3 includes (FI)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "pricingNote_fi",
      title: "Pricing note (FI)",
      type: "text",
      rows: 3,
    }),

    // CONTACT – FI
    defineField({
      name: "contactEyebrow_fi",
      title: "Contact – Eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "contactTitle_fi",
      title: "Contact – Title (FI)",
      type: "string",
    }),
    defineField({
      name: "contactSubtitle_fi",
      title: "Contact – Subtitle (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contactEmailLabel_fi",
      title: "Contact – Email label (FI)",
      type: "string",
    }),
    defineField({
      name: "contactNote_fi",
      title: "Contact – Note (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email (global)",
      type: "string",
      description: "Shown as main contact email & used in mailto: link",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone (global)",
      type: "string",
      description: "Shown in the contact card if set",
    }),
  ],
});