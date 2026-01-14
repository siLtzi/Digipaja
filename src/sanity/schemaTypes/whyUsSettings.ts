import { defineField, defineType } from "sanity";

export default defineType({
  name: "whyUsSettings",
  title: "Why Us — Settings",
  type: "document",
  groups: [
    { name: "finnish", title: "Finnish Content" },
    { name: "english", title: "English Content" },
    { name: "cards", title: "Benefit Cards" },
  ],
  fields: [
    // FINNISH CONTENT
    defineField({
      name: "whyUsEyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "whyUsTitle_fi",
      title: "Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "whyUsSubtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),

    // ENGLISH CONTENT
    defineField({
      name: "whyUsEyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "whyUsTitle_en",
      title: "Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "whyUsSubtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),

    // CARDS
    defineField({
      name: "cards",
      title: "Benefit Cards",
      type: "array",
      group: "cards",
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
          preview: {
            select: {
              title: "title_fi",
              subtitle: "icon",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Why Us Section Settings",
      };
    },
  },
});