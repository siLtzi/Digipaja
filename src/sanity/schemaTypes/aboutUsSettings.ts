import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutUsSettings",
  title: "About Us — Settings",
  type: "document",
  fields: [
    // EYEBROW
    defineField({
      name: "aboutUsEyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "aboutUsEyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
    }),

    // TITLE
    defineField({
      name: "aboutUsTitle_fi",
      title: "Title (FI)",
      type: "string",
    }),
    defineField({
      name: "aboutUsTitle_en",
      title: "Title (EN)",
      type: "string",
    }),

    // SUBTITLE
    defineField({
      name: "aboutUsSubtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "aboutUsSubtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 2,
    }),

    // TECH COLUMN
    defineField({
      name: "aboutUsTechTitle_fi",
      title: "Tech Title (FI)",
      type: "string",
    }),
    defineField({
      name: "aboutUsTechTitle_en",
      title: "Tech Title (EN)",
      type: "string",
    }),
    defineField({
      name: "aboutUsTechBody_fi",
      title: "Tech Body (FI)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutUsTechBody_en",
      title: "Tech Body (EN)",
      type: "text",
      rows: 4,
    }),

    // BUSINESS COLUMN
    defineField({
      name: "aboutUsBizTitle_fi",
      title: "Business Title (FI)",
      type: "string",
    }),
    defineField({
      name: "aboutUsBizTitle_en",
      title: "Business Title (EN)",
      type: "string",
    }),
    defineField({
      name: "aboutUsBizBody_fi",
      title: "Business Body (FI)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutUsBizBody_en",
      title: "Business Body (EN)",
      type: "text",
      rows: 4,
    }),

    // PHOTOS
    defineField({
      name: "samuliPhoto",
      title: "Photo – Samuli",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "joukoPhoto",
      title: "Photo – Jouko",
      type: "image",
      options: { hotspot: true },
    }),

    // FOOTER NOTE
    defineField({
      name: "aboutUsNote_fi",
      title: "Note (FI)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "aboutUsNote_en",
      title: "Note (EN)",
      type: "text",
      rows: 2,
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "About Us – Settings",
        subtitle: "FI / EN content for About Us section",
      };
    },
  },
});
