import { defineField, defineType } from "sanity";

export default defineType({
  name: "referencesSettings",
  title: "References – Settings",
  type: "document",
  fields: [
    // --- FINNISH ---
    defineField({
      name: "eyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "title_fi",
      title: "Title (FI)",
      type: "string",
    }),
    defineField({
      name: "subtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
    }),

    // --- ENGLISH ---
    defineField({
      name: "eyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
    }),
    defineField({
      name: "title_en",
      title: "Title (EN)",
      type: "string",
    }),
    defineField({
      name: "subtitle_en",
      title: "Subtitle (EN)",
      type: "text",
    }),
  ],
});