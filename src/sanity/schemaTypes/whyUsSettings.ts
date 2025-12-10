import { defineField, defineType } from "sanity";

export default defineType({
  name: "whyUsSettings",
  title: "Why Us — Settings",
  type: "document",
  fields: [
    // HEADERS
    defineField({
      name: "whyUsEyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "whyUsEyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
    }),
    defineField({
      name: "whyUsTitle_fi",
      title: "Title (FI)",
      type: "string",
    }),
    defineField({
      name: "whyUsTitle_en",
      title: "Title (EN)",
      type: "string",
    }),
    defineField({
      name: "whyUsSubtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "whyUsSubtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 2,
    }),

    // CARDS
    defineField({
      name: "cards",
      title: "Benefit Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
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
              name: "description_fi",
              title: "Description (FI)",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "description_en",
              title: "Description (EN)",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "icon",
              title: "Icon Name (e.g. 'speed', 'code', 'local')",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Why Us Settings",
      };
    },
  },
});