import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesSettings",
  title: "Services – Settings",
  type: "document",
  groups: [
    { name: "finnish", title: "Finnish Content" },
    { name: "english", title: "English Content" },
  ],
  fields: [
    // FINNISH CONTENT
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

    // ENGLISH CONTENT
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
  ],
  preview: {
    prepare() {
      return {
        title: "Services Section Settings",
      };
    },
  },
});