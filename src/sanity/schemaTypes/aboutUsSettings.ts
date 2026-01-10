import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutUsSettings",
  title: "About Us — Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "team", title: "Team Members" },
    { name: "stats", title: "Statistics" },
    { name: "values", title: "Values & Mission" },
    { name: "footer", title: "Footer Info" },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: "aboutUsEyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
      description: "Small text above the title, e.g. 'Meistä'",
      group: "hero",
    }),
    defineField({
      name: "aboutUsEyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
      description: "Small text above the title, e.g. 'About Us'",
      group: "hero",
    }),

    defineField({
      name: "aboutUsTitle_fi",
      title: "Title (FI)",
      type: "string",
      description: "Main heading",
      group: "hero",
    }),
    defineField({
      name: "aboutUsTitle_en",
      title: "Title (EN)",
      type: "string",
      description: "Main heading",
      group: "hero",
    }),

    defineField({
      name: "aboutUsSubtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 3,
      description: "Short description below the title",
      group: "hero",
    }),
    defineField({
      name: "aboutUsSubtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 3,
      description: "Short description below the title",
      group: "hero",
    }),

    // ==================== TEAM - SAMULI ====================
    defineField({
      name: "samuliName",
      title: "Samuli - Name",
      type: "string",
      description: "Full name displayed",
      group: "team",
    }),
    defineField({
      name: "samuliRole_fi",
      title: "Samuli - Role (FI)",
      type: "string",
      description: "e.g. 'Tekniikka & Laatu'",
      group: "team",
    }),
    defineField({
      name: "samuliRole_en",
      title: "Samuli - Role (EN)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "aboutUsTechTitle_fi",
      title: "Samuli - Title (FI)",
      type: "string",
      description: "Job title, e.g. 'Pidän huolen, että se toimii 3 vuoden päästäkin.'",
      group: "team",
    }),
    defineField({
      name: "aboutUsTechTitle_en",
      title: "Samuli - Title (EN)",
      type: "string",
      description: "Job title",
      group: "team",
    }),
    defineField({
      name: "aboutUsTechBody_fi",
      title: "Samuli - Bio (FI)",
      type: "text",
      rows: 4,
      description: "Short biography",
      group: "team",
    }),
    defineField({
      name: "aboutUsTechBody_en",
      title: "Samuli - Bio (EN)",
      type: "text",
      rows: 4,
      description: "Short biography",
      group: "team",
    }),
    defineField({
      name: "samuliQuote_fi",
      title: "Samuli - Quote (FI)",
      type: "text",
      rows: 2,
      group: "team",
    }),
    defineField({
      name: "samuliQuote_en",
      title: "Samuli - Quote (EN)",
      type: "text",
      rows: 2,
      group: "team",
    }),

    // ==================== TEAM - JOUKO ====================
    defineField({
      name: "joukoName",
      title: "Jouko - Name",
      type: "string",
      description: "Full name displayed",
      group: "team",
    }),
    defineField({
      name: "joukoRole_fi",
      title: "Jouko - Role (FI)",
      type: "string",
      description: "e.g. 'Yritykset & kasvu'",
      group: "team",
    }),
    defineField({
      name: "joukoRole_en",
      title: "Jouko - Role (EN)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "aboutUsBizTitle_fi",
      title: "Jouko - Title (FI)",
      type: "string",
      description: "Job title",
      group: "team",
    }),
    defineField({
      name: "aboutUsBizTitle_en",
      title: "Jouko - Title (EN)",
      type: "string",
      description: "Job title",
      group: "team",
    }),
    defineField({
      name: "aboutUsBizBody_fi",
      title: "Jouko - Bio (FI)",
      type: "text",
      rows: 4,
      description: "Short biography",
      group: "team",
    }),
    defineField({
      name: "aboutUsBizBody_en",
      title: "Jouko - Bio (EN)",
      type: "text",
      rows: 4,
      description: "Short biography",
      group: "team",
    }),
    defineField({
      name: "joukoQuote_fi",
      title: "Jouko - Quote (FI)",
      type: "text",
      rows: 2,
      group: "team",
    }),
    defineField({
      name: "joukoQuote_en",
      title: "Jouko - Quote (EN)",
      type: "text",
      rows: 2,
      group: "team",
    }),

    // ==================== STATISTICS ====================
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "e.g. '100%', '< 1s', '90+'",
            }),
            defineField({
              name: "label_fi",
              title: "Label (FI)",
              type: "string",
            }),
            defineField({
              name: "label_en",
              title: "Label (EN)",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "label_fi",
            },
          },
        },
      ],
    }),

    // ==================== VALUES & MISSION ====================
    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "object",
      group: "values",
      fields: [
        { name: "fi", title: "Finnish", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "missionText",
      title: "Mission Text",
      type: "object",
      group: "values",
      fields: [
        { name: "fi", title: "Finnish", type: "text", rows: 4 },
        { name: "en", title: "English", type: "text", rows: 4 },
      ],
    }),
    defineField({
      name: "valuesTitle",
      title: "Values Section Title",
      type: "object",
      group: "values",
      fields: [
        { name: "fi", title: "Finnish", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "values",
      title: "Company Values",
      type: "array",
      group: "values",
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
              rows: 2,
            }),
            defineField({
              name: "description_en",
              title: "Description (EN)",
              type: "text",
              rows: 2,
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

    // ==================== FOOTER INFO ====================
    defineField({
      name: "aboutUsDescription2_fi",
      title: "Footer Description (FI)",
      type: "text",
      rows: 3,
      description: "Text shown at the bottom of the section",
      group: "footer",
    }),
    defineField({
      name: "aboutUsDescription2_en",
      title: "Footer Description (EN)",
      type: "text",
      rows: 3,
      description: "Text shown at the bottom of the section",
      group: "footer",
    }),

    defineField({
      name: "aboutUsBulletPoint_fi",
      title: "Highlight Text (FI)",
      type: "string",
      description: "Italic text with checkmark, e.g. 'Aina saatavilla'",
      group: "footer",
    }),
    defineField({
      name: "aboutUsBulletPoint_en",
      title: "Highlight Text (EN)",
      type: "string",
      description: "Italic text with checkmark, e.g. 'Always available'",
      group: "footer",
    }),

    defineField({
      name: "cta",
      title: "CTA Button Text",
      type: "object",
      group: "footer",
      fields: [
        { name: "fi", title: "Finnish", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "About Us – Settings",
        subtitle: "Hero, Team, Stats, Values & Footer content",
      };
    },
  },
});
