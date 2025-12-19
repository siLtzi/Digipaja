import { defineType } from "sanity";

export default defineType({
  name: "servicesOverview",
  title: "Services Overview Page",
  type: "document",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "Finnish", value: "fi" },
          { title: "English", value: "en" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
    },
    {
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Page Subtitle",
      type: "text",
    },
    {
      name: "services",
      title: "Service Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "slug",
              title: "Slug/ID",
              type: "string",
              description: "URL-friendly identifier (e.g., 'kotisivut', 'verkkokaupat')",
            },
            {
              name: "title",
              title: "Service Title",
              type: "string",
            },
            {
              name: "shortDescription",
              title: "Short Description",
              type: "text",
              description: "Brief overview shown in the card",
            },
            {
              name: "longDescription",
              title: "Detailed Description",
              type: "array",
              of: [{ type: "block" }],
              description: "Full description with rich text",
            },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Icon identifier for the service",
              options: {
                list: [
                  { title: "Website", value: "website" },
                  { title: "E-commerce", value: "ecommerce" },
                  { title: "SEO", value: "seo" },
                  { title: "Technical", value: "technical" },
                  { title: "Code", value: "code" },
                  { title: "Rocket", value: "rocket" },
                ],
              },
            },
            {
              name: "features",
              title: "Key Features",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "benefits",
              title: "Benefits",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "image",
              title: "Service Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "gallery",
              title: "Service Gallery",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              description: "Multiple images for slideshow/animation. If provided, overrides single image.",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare({ title, language }) {
      return {
        title: `${title} (${language})`,
      };
    },
  },
});
