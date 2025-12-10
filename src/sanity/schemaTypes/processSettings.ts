import { defineField, defineType } from "sanity";

export default defineType({
  name: "processSettings",
  title: "Process — Settings",
  type: "document",
  fields: [
    // --- SECTION HEADER ---
    defineField({
      name: "processEyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "processEyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
    }),
    defineField({
      name: "processTitle_fi",
      title: "Title (FI)",
      type: "string",
    }),
    defineField({
      name: "processTitle_en",
      title: "Title (EN)",
      type: "string",
    }),
    defineField({
      name: "processSubtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "processSubtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 2,
    }),

    // --- STEPS ARRAY ---
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title_fi",
              title: "Step Title (FI)",
              type: "string",
            }),
            defineField({
              name: "title_en",
              title: "Step Title (EN)",
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
          ],
          preview: {
            select: {
              title: "title_fi",
              subtitle: "title_en",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Process Section Settings",
      };
    },
  },
});