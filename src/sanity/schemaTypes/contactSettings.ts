// contactSettings.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactSettings",
  title: "Contact Section - Settings",
  type: "document",
  groups: [
    { name: "finnish", title: "Finnish Content" },
    { name: "english", title: "English Content" },
    { name: "general", title: "General Settings" },
  ],
  fields: [
    // ==================== GENERAL SETTINGS ====================
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "e.g. 'hello@digipaja.fi'",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "e.g. '+358 40 123 4567'",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),

    // ==================== FINNISH CONTENT ====================
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
    defineField({
      name: "contactTitle_fi",
      title: "Contact Details Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "contactSubtitle_fi",
      title: "Contact Details Subtitle (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),
    defineField({
      name: "ctaText_fi",
      title: "Booking Button Text (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "formTitle_fi",
      title: "Form Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "formSubtitle_fi",
      title: "Form Subtitle (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),
    defineField({
      name: "formCta_fi",
      title: "Form Submit Button (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "formNameLabel_fi",
      title: "Name Field Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "formEmailLabel_fi",
      title: "Email Field Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "formCompanyLabel_fi",
      title: "Company Field Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "formMessageLabel_fi",
      title: "Message Field Label (FI)",
      type: "string",
      group: "finnish",
    }),

    // ==================== ENGLISH CONTENT ====================
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
    defineField({
      name: "contactTitle_en",
      title: "Contact Details Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "contactSubtitle_en",
      title: "Contact Details Subtitle (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "ctaText_en",
      title: "Booking Button Text (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "formTitle_en",
      title: "Form Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "formSubtitle_en",
      title: "Form Subtitle (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "formCta_en",
      title: "Form Submit Button (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "formNameLabel_en",
      title: "Name Field Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "formEmailLabel_en",
      title: "Email Field Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "formCompanyLabel_en",
      title: "Company Field Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "formMessageLabel_en",
      title: "Message Field Label (EN)",
      type: "string",
      group: "english",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Section Settings",
      };
    },
  },
});