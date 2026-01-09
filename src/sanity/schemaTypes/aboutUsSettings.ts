import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutUsSettings",
  title: "About Us — Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "mission", title: "Mission & Values" },
    { name: "stats", title: "Statistics" },
    { name: "team", title: "Team Members" },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: "aboutUsEyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "aboutUsEyebrow_en",
      title: "Eyebrow (EN)",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "aboutUsTitle_fi",
      title: "Title (FI)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "aboutUsTitle_en",
      title: "Title (EN)",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "aboutUsSubtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "aboutUsSubtitle_en",
      title: "Subtitle (EN)",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    defineField({
      name: "aboutUsDescription2_fi",
      title: "Description 2 (FI)",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "aboutUsDescription2_en",
      title: "Description 2 (EN)",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    defineField({
      name: "aboutUsBulletPoint_fi",
      title: "Bullet Point (FI)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "aboutUsBulletPoint_en",
      title: "Bullet Point (EN)",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "aboutUsCta_fi",
      title: "CTA Text (FI)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "aboutUsCta_en",
      title: "CTA Text (EN)",
      type: "string",
      group: "hero",
    }),

    // ==================== MISSION & VALUES ====================
    defineField({
      name: "missionTitle_fi",
      title: "Mission Title (FI)",
      type: "string",
      group: "mission",
    }),
    defineField({
      name: "missionTitle_en",
      title: "Mission Title (EN)",
      type: "string",
      group: "mission",
    }),

    defineField({
      name: "missionText_fi",
      title: "Mission Statement (FI)",
      type: "text",
      rows: 4,
      group: "mission",
    }),
    defineField({
      name: "missionText_en",
      title: "Mission Statement (EN)",
      type: "text",
      rows: 4,
      group: "mission",
    }),

    defineField({
      name: "valuesTitle_fi",
      title: "Values Title (FI)",
      type: "string",
      group: "mission",
    }),
    defineField({
      name: "valuesTitle_en",
      title: "Values Title (EN)",
      type: "string",
      group: "mission",
    }),

    defineField({
      name: "values_fi",
      title: "Core Values (FI)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Value Title" },
            { name: "description", type: "text", title: "Description", rows: 2 },
          ],
        },
      ],
      group: "mission",
    }),
    defineField({
      name: "values_en",
      title: "Core Values (EN)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Value Title" },
            { name: "description", type: "text", title: "Description", rows: 2 },
          ],
        },
      ],
      group: "mission",
    }),

    // ==================== STATISTICS ====================
    defineField({
      name: "statsTitle_fi",
      title: "Stats Section Title (FI)",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "statsTitle_en",
      title: "Stats Section Title (EN)",
      type: "string",
      group: "stats",
    }),

    defineField({
      name: "stat1Value",
      title: "Stat 1 - Value",
      type: "string",
      description: "e.g., '50+' or '100%'",
      group: "stats",
    }),
    defineField({
      name: "stat1Label_fi",
      title: "Stat 1 - Label (FI)",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "stat1Label_en",
      title: "Stat 1 - Label (EN)",
      type: "string",
      group: "stats",
    }),

    defineField({
      name: "stat2Value",
      title: "Stat 2 - Value",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "stat2Label_fi",
      title: "Stat 2 - Label (FI)",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "stat2Label_en",
      title: "Stat 2 - Label (EN)",
      type: "string",
      group: "stats",
    }),

    defineField({
      name: "stat3Value",
      title: "Stat 3 - Value",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "stat3Label_fi",
      title: "Stat 3 - Label (FI)",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "stat3Label_en",
      title: "Stat 3 - Label (EN)",
      type: "string",
      group: "stats",
    }),

    defineField({
      name: "stat4Value",
      title: "Stat 4 - Value",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "stat4Label_fi",
      title: "Stat 4 - Label (FI)",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "stat4Label_en",
      title: "Stat 4 - Label (EN)",
      type: "string",
      group: "stats",
    }),

    // ==================== TEAM - SAMULI ====================
    defineField({
      name: "samuliPhoto",
      title: "Photo – Samuli",
      type: "image",
      options: { hotspot: true },
      group: "team",
    }),
    defineField({
      name: "aboutUsTechTitle_fi",
      title: "Samuli - Title (FI)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "aboutUsTechTitle_en",
      title: "Samuli - Title (EN)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "samuliRole_fi",
      title: "Samuli - Role (FI)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "samuliRole_en",
      title: "Samuli - Role (EN)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "aboutUsTechBody_fi",
      title: "Samuli - Bio (FI)",
      type: "text",
      rows: 4,
      group: "team",
    }),
    defineField({
      name: "aboutUsTechBody_en",
      title: "Samuli - Bio (EN)",
      type: "text",
      rows: 4,
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
      name: "joukoPhoto",
      title: "Photo – Jouko",
      type: "image",
      options: { hotspot: true },
      group: "team",
    }),
    defineField({
      name: "aboutUsBizTitle_fi",
      title: "Jouko - Title (FI)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "aboutUsBizTitle_en",
      title: "Jouko - Title (EN)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "joukoRole_fi",
      title: "Jouko - Role (FI)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "joukoRole_en",
      title: "Jouko - Role (EN)",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "aboutUsBizBody_fi",
      title: "Jouko - Bio (FI)",
      type: "text",
      rows: 4,
      group: "team",
    }),
    defineField({
      name: "aboutUsBizBody_en",
      title: "Jouko - Bio (EN)",
      type: "text",
      rows: 4,
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

    // ==================== FOOTER NOTE ====================
    defineField({
      name: "aboutUsNote_fi",
      title: "Footer Note (FI)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "aboutUsNote_en",
      title: "Footer Note (EN)",
      type: "text",
      rows: 2,
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "About Us – Settings",
        subtitle: "Hero, Mission, Stats & Team content",
      };
    },
  },
});
