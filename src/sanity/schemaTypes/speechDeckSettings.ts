import { defineField, defineType } from "sanity";

export default defineType({
  name: "speechDeckSettings",
  title: "Speech Deck Section",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Speech Deck Items",
      type: "array",
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
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            }),
            defineField({
              name: "body",
              title: "Body Text",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "text", rows: 3 },
                { name: "en", title: "English", type: "text", rows: 3 },
              ],
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
              title: "title.fi",
              subtitle: "svgType",
            },
          },
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "CTA Title",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        }),
        defineField({
          name: "body",
          title: "CTA Body",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "text" },
            { name: "en", title: "English", type: "text" },
          ],
        }),
      ],
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
