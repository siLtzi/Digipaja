import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutUsSettings",
  title: "About Us — Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "team", title: "Team Members" },
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
      name: "aboutUsTechTitle_fi",
      title: "Samuli - Title (FI)",
      type: "string",
      description: "Job title, e.g. 'Tekninen johtaja'",
      group: "team",
    }),
    defineField({
      name: "aboutUsTechTitle_en",
      title: "Samuli - Title (EN)",
      type: "string",
      description: "Job title, e.g. 'Technical Lead'",
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

    // ==================== TEAM - JOUKO ====================
    defineField({
      name: "joukoName",
      title: "Jouko - Name",
      type: "string",
      description: "Full name displayed",
      group: "team",
    }),
    defineField({
      name: "aboutUsBizTitle_fi",
      title: "Jouko - Title (FI)",
      type: "string",
      description: "Job title, e.g. 'Myynti & asiakkuudet'",
      group: "team",
    }),
    defineField({
      name: "aboutUsBizTitle_en",
      title: "Jouko - Title (EN)",
      type: "string",
      description: "Job title, e.g. 'Sales & Client Relations'",
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
  ],

  preview: {
    prepare() {
      return {
        title: "About Us – Settings",
        subtitle: "Hero, Team & Footer content",
      };
    },
  },
});
