import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Digipaja" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "contactEmail", type: "string" }),

    // HERO – FI
    defineField({
      name: "heroBadge_fi",
      title: "Hero badge (FI)",
      type: "string",
    }),
    defineField({
      name: "heroTitle_fi",
      title: "Hero title (FI)",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle_fi",
      title: "Hero subtitle (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroCtaPrimary_fi",
      title: "Hero CTA primary (FI)",
      type: "string",
    }),
    defineField({
      name: "heroCtaSecondary_fi",
      title: "Hero CTA secondary (FI)",
      type: "string",
    }),
    defineField({
      name: "heroTechLine_fi",
      title: "Hero tech line (FI)",
      type: "string",
    }),

    // BROTHERS – FI
    defineField({
      name: "brothersEyebrow_fi",
      title: "Brothers eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "brothersTitle_fi",
      title: "Brothers title (FI)",
      type: "string",
    }),
    defineField({
      name: "brothersSubtitle_fi",
      title: "Brothers subtitle (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "brothersTechTitle_fi",
      title: "Brothers tech title (FI)",
      type: "string",
    }),
    defineField({
      name: "brothersTechBody_fi",
      title: "Brothers tech body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "brothersBizTitle_fi",
      title: "Brothers biz title (FI)",
      type: "string",
    }),
    defineField({
      name: "brothersBizBody_fi",
      title: "Brothers biz body (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "brothersNote_fi",
      title: "Brothers note (FI)",
      type: "text",
      rows: 3,
    }),
  ],
});
