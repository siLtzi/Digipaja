import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project (Reference)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. 'SaaS Platform' or 'Corporate Website'",
    }),
    defineField({
      name: "description_fi",
      title: "Short Description (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description_en",
      title: "Short Description (EN)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Main Image (Desktop)",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile View Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload a screenshot taken at mobile width (e.g. iPhone 14 size). If left empty, Desktop image will be used.",
    }),
    defineField({
      name: "technologies",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});