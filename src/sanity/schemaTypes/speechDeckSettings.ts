import { defineField, defineType } from "sanity";

export default defineType({
  name: "speechDeckSettings",
  title: "Speech Deck Section",
  type: "document",
  groups: [
    { name: "items", title: "Speech Deck Items" },
    { name: "cta", title: "CTA Section" },
  ],
  fields: [
    // ==================== ITEMS ====================
    defineField({
      name: "items",
      title: "Speech Deck Items",
      type: "array",
      group: "items",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
              description: "Unique identifier for this item",
            }),
            defineField({
              name: "title_fi",
              title: "Title (FI)",
              type: "string",
            }),
            defineField({
              name: "title_en",
              title: "Title (EN)",
              type: "string",
            }),
            defineField({
              name: "body_fi",
              title: "Body Text (FI)",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "body_en",
              title: "Body Text (EN)",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "svgType",
              title: "SVG/Icon Type",
              type: "string",
              description: "Icon name: Tailor, Fingerprint, Arrow, Speed, Graph, etc.",
            }),
          ],
          preview: {
            select: {
              title: "title_fi",
              subtitle: "svgType",
            },
          },
        },
      ],
    }),

    // ==================== CTA ====================
    defineField({
      name: "ctaTitle_fi",
      title: "CTA Title (FI)",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaTitle_en",
      title: "CTA Title (EN)",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaBody_fi",
      title: "CTA Body (FI)",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "ctaBody_en",
      title: "CTA Body (EN)",
      type: "text",
      rows: 3,
      group: "cta",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Speech Deck Settings",
      };
    },
  },
});
