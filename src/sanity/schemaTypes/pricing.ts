import { defineField, defineType } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  title: "Pricing Tier",
  type: "object",
  groups: [
    { name: "finnish", title: "Finnish" },
    { name: "english", title: "English" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "name_fi",
      title: "Tier Name (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "price_fi",
      title: "Price Display (FI)",
      type: "string",
      description: "e.g. '1 800 €'",
      group: "finnish",
    }),
    defineField({
      name: "description_fi",
      title: "Description (FI)",
      type: "text",
      rows: 3,
      group: "finnish",
    }),
    defineField({
      name: "features_fi",
      title: "Features (FI)",
      type: "array",
      of: [{ type: "string" }],
      group: "finnish",
    }),
    defineField({
      name: "cta_fi",
      title: "Button Text (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "monthlyLabel_fi",
      title: "Monthly Label (FI)",
      type: "string",
      description: "e.g. 'YLLÄPITO'",
      group: "finnish",
    }),
    defineField({
      name: "monthlyValue_fi",
      title: "Monthly Value (FI)",
      type: "string",
      description: "e.g. '150 €/kk'",
      group: "finnish",
    }),
    defineField({
      name: "monthlyIncluded_fi",
      title: "Included in Maintenance (FI)",
      type: "array",
      of: [{ type: "string" }],
      group: "finnish",
    }),
    defineField({
      name: "monthlyExcluded_fi",
      title: "Excluded from Maintenance (FI)",
      type: "array",
      of: [{ type: "string" }],
      group: "finnish",
    }),

    // ENGLISH
    defineField({
      name: "name_en",
      title: "Tier Name (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "price_en",
      title: "Price Display (EN)",
      type: "string",
      description: "e.g. '€1,800'",
      group: "english",
    }),
    defineField({
      name: "description_en",
      title: "Description (EN)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "features_en",
      title: "Features (EN)",
      type: "array",
      of: [{ type: "string" }],
      group: "english",
    }),
    defineField({
      name: "cta_en",
      title: "Button Text (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "monthlyLabel_en",
      title: "Monthly Label (EN)",
      type: "string",
      description: "e.g. 'MAINTENANCE'",
      group: "english",
    }),
    defineField({
      name: "monthlyValue_en",
      title: "Monthly Value (EN)",
      type: "string",
      description: "e.g. '€150/mo'",
      group: "english",
    }),
    defineField({
      name: "monthlyIncluded_en",
      title: "Included in Maintenance (EN)",
      type: "array",
      of: [{ type: "string" }],
      group: "english",
    }),
    defineField({
      name: "monthlyExcluded_en",
      title: "Excluded from Maintenance (EN)",
      type: "array",
      of: [{ type: "string" }],
      group: "english",
    }),

    // SETTINGS
    defineField({
      name: "highlight",
      title: "Highlight (Popular)",
      type: "boolean",
      initialValue: false,
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "name_fi",
      subtitle: "price_fi",
    },
  },
});

// 2. The Pricing Section Settings
export const pricingSettings = defineType({
  name: "pricingSettings",
  title: "Pricing Section",
  type: "document",
  groups: [
    { name: "finnish", title: "Finnish Content" },
    { name: "english", title: "English Content" },
    { name: "tiers", title: "Pricing Tiers" },
  ],
  fields: [
    // FINNISH
    defineField({
      name: "eyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "title_fi",
      title: "Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "subtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 3,
      group: "finnish",
    }),

    // ENGLISH
    defineField({
      name: "eyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "title_en",
      title: "Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "subtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 3,
      group: "english",
    }),

    // TIERS
    defineField({
      name: "tiers",
      title: "Pricing Tiers",
      type: "array",
      of: [{ type: "pricingTier" }],
      group: "tiers",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Pricing Section Settings",
      };
    },
  },
});