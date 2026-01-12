import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSettings",
  title: "Hero Section",
  type: "document",
  groups: [
    { name: "finnish", title: "Finnish Content" },
    { name: "english", title: "English Content" },
    { name: "media", title: "Media & Videos" },
    { name: "metrics", title: "Metrics Section" },
  ],
  fields: [
    // ==================== FINNISH CONTENT ====================
    defineField({
      name: "heroEyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
      description: "Small text above the title, e.g. 'Digitaalinen työpaja Oulusta'",
      group: "finnish",
    }),
    defineField({
      name: "heroTitleStart_fi",
      title: "Title Start (FI)",
      type: "string",
      description: "First part of the title, e.g. 'Kotisivut, jotka näyttävät'",
      group: "finnish",
    }),
    defineField({
      name: "heroTitleAccent_fi",
      title: "Title Accent Word (FI)",
      type: "string",
      description: "Default highlighted word in gradient, e.g. 'hyvältä'",
      group: "finnish",
    }),
    defineField({
      name: "heroRotatingWords_fi",
      title: "Rotating Accent Words (FI)",
      type: "array",
      of: [{ type: "string" }],
      description: "Words that rotate in the hero title. Example: hyvältä, modernilta, nopealta, ammattimaisilta",
      group: "finnish",
    }),
    defineField({
      name: "heroTitleEnd_fi",
      title: "Title End (FI)",
      type: "string",
      description: "End of title, e.g. 'ja tuntuvat nopeilta.'",
      group: "finnish",
    }),
    defineField({
      name: "heroSubtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 3,
      group: "finnish",
    }),
    defineField({
      name: "heroPrimaryCta_fi",
      title: "Primary CTA Button (FI)",
      type: "string",
      description: "e.g. 'Ota yhteyttä'",
      group: "finnish",
    }),
    defineField({
      name: "heroSecondaryCta_fi",
      title: "Secondary CTA Button (FI)",
      type: "string",
      description: "e.g. 'Katso referenssit'",
      group: "finnish",
    }),

    // ==================== ENGLISH CONTENT ====================
    defineField({
      name: "heroEyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
      description: "Small text above the title",
      group: "english",
    }),
    defineField({
      name: "heroTitleStart_en",
      title: "Title Start (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "heroTitleAccent_en",
      title: "Title Accent Word (EN)",
      type: "string",
      description: "Default highlighted word in gradient",
      group: "english",
    }),
    defineField({
      name: "heroRotatingWords_en",
      title: "Rotating Accent Words (EN)",
      type: "array",
      of: [{ type: "string" }],
      description: "Words that rotate in the hero title. Example: great, modern, fast, professional",
      group: "english",
    }),
    defineField({
      name: "heroTitleEnd_en",
      title: "Title End (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "heroSubtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "heroPrimaryCta_en",
      title: "Primary CTA Button (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "heroSecondaryCta_en",
      title: "Secondary CTA Button (EN)",
      type: "string",
      group: "english",
    }),

    // ==================== MEDIA ====================
    defineField({
      name: "heroDesktopVideo",
      title: "Hero Video (Desktop)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      group: "media",
    }),
    defineField({
      name: "heroMobileVideo",
      title: "Hero Video (Mobile)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      group: "media",
    }),

    // ==================== METRICS SECTION ====================
    defineField({
      name: "metricsLabel",
      title: "Metrics Section Label",
      type: "object",
      group: "metrics",
      fields: [
        { name: "fi", title: "Finnish", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "metricsSubtitle",
      title: "Metrics Subtitle",
      type: "object",
      group: "metrics",
      fields: [
        { name: "fi", title: "Finnish", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "metricsFootnote",
      title: "Metrics Footnote",
      type: "object",
      group: "metrics",
      fields: [
        { name: "fi", title: "Finnish", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Hero Section Settings",
      };
    },
  },
});
