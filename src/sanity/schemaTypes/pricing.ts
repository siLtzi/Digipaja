import { defineField, defineType } from "sanity";

// 1. The individual Pricing Card object
export const pricingTier = defineType({
  name: "pricingTier",
  title: "Pricing Tier",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Tier Name",
      type: "object",
      fields: [
        { name: "fi", type: "string", title: "FI" },
        { name: "en", type: "string", title: "EN" },
      ],
    }),
    defineField({
      name: "price",
      title: "Price Display (e.g. '1 800 €')",
      type: "object",
      fields: [
        { name: "fi", type: "string", title: "FI" },
        { name: "en", type: "string", title: "EN" },
      ],
    }),
    defineField({
      name: "monthlyPayment",
      title: "Monthly Payment",
      description: "The monthly maintenance/hosting fee shown on the card",
      type: "object",
      fields: [
        { 
          name: "label_fi", 
          type: "string", 
          title: "Label (FI)", 
          description: "e.g. 'YLLÄPITO' or 'KK-MAKSU'",
          initialValue: "YLLÄPITO"
        },
        { 
          name: "label_en", 
          type: "string", 
          title: "Label (EN)", 
          description: "e.g. 'MAINTENANCE' or 'MONTHLY'",
          initialValue: "MAINTENANCE"
        },
        { 
          name: "value_fi", 
          type: "string", 
          title: "Value (FI)", 
          description: "e.g. '150 €/kk' or 'Sisältyy'" 
        },
        { 
          name: "value_en", 
          type: "string", 
          title: "Value (EN)", 
          description: "e.g. '150 €/mo' or 'Included'" 
        },
        {
          name: "included_fi",
          type: "array",
          title: "Included Items (FI)",
          description: "What's included in maintenance (shown in tooltip)",
          of: [{ type: "string" }],
        },
        {
          name: "included_en",
          type: "array",
          title: "Included Items (EN)",
          of: [{ type: "string" }],
        },
        {
          name: "excluded_fi",
          type: "array",
          title: "Excluded Items (FI)",
          description: "What's NOT included (shown in tooltip)",
          of: [{ type: "string" }],
        },
        {
          name: "excluded_en",
          type: "array",
          title: "Excluded Items (EN)",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "fi", type: "text", title: "FI" },
        { name: "en", type: "text", title: "EN" },
      ],
    }),
    defineField({
      name: "features",
      title: "Features List",
      type: "object",
      fields: [
        {
          name: "fi",
          title: "Features (FI)",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "en",
          title: "Features (EN)",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "Button Text",
      type: "object",
      fields: [
        { name: "fi", type: "string", title: "FI" },
        { name: "en", type: "string", title: "EN" },
      ],
    }),
    defineField({
      name: "highlight",
      title: "Highlight (Popular)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name.fi",
      subtitle: "price.fi",
    },
  },
});

// 2. The Pricing Section Settings
export const pricingSettings = defineType({
  name: "pricingSettings",
  title: "Pricing Section",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "object",
      fields: [
        { name: "fi", type: "string", title: "FI" },
        { name: "en", type: "string", title: "EN" },
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "fi", type: "string", title: "FI" },
        { name: "en", type: "string", title: "EN" },
      ],
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "object",
      fields: [
        { name: "fi", type: "text", title: "FI" },
        { name: "en", type: "text", title: "EN" },
      ],
    }),
    defineField({
      name: "tiers",
      title: "Pricing Tiers",
      type: "array",
      of: [{ type: "pricingTier" }],
    }),
  ],
});