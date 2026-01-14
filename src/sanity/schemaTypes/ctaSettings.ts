import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaSettings",
  title: "CTA Section",
  type: "document",
  groups: [
    { name: "finnish", title: "Finnish Content" },
    { name: "english", title: "English Content" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // FINNISH CONTENT
    defineField({
      name: "eyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
      description: "Small text above the title",
      group: "finnish",
    }),
    defineField({
      name: "title_fi",
      title: "Title (FI)",
      type: "string",
      description: "Main heading",
      group: "finnish",
    }),
    defineField({
      name: "subtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 3,
      group: "finnish",
    }),
    defineField({
      name: "ctaText_fi",
      title: "CTA Button Text (FI)",
      type: "string",
      description: "e.g. 'Ota yhteyttä'",
      group: "finnish",
    }),

    // ENGLISH CONTENT
    defineField({
      name: "eyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
      description: "Small text above the title",
      group: "english",
    }),
    defineField({
      name: "title_en",
      title: "Title (EN)",
      type: "string",
      description: "Main heading",
      group: "english",
    }),
    defineField({
      name: "subtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "ctaText_en",
      title: "CTA Button Text (EN)",
      type: "string",
      description: "e.g. 'Contact Us'",
      group: "english",
    }),

    // SETTINGS
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
      description: "Link path, e.g. '/yhteydenotto'",
      group: "settings",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "CTA Section Settings",
      };
    },
  },
});
