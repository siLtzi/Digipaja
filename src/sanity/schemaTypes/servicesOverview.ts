import { defineType, defineField } from "sanity";

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
      name: "heroVideo",
      title: "Hero Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description: "Background video for the hero section",
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
              name: "video",
              title: "Service Video",
              type: "file",
              options: {
                accept: "video/mp4,video/webm",
              },
              description: "Video to display instead of image. If provided, takes priority over image.",
            },
            {
              name: "gallery",
              title: "Service Gallery",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "galleryItem",
                  title: "Gallery Item",
                  fields: [
                    defineField({
                      name: "type",
                      title: "Media Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Image", value: "image" },
                          { title: "Video", value: "video" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "image",
                    }),
                    defineField({
                      name: "image",
                      title: "Image",
                      type: "image",
                      options: { hotspot: true },
                      hidden: ({ parent }) => parent?.type === "video",
                    }),
                    defineField({
                      name: "video",
                      title: "Video",
                      type: "file",
                      options: {
                        accept: "video/mp4,video/webm",
                      },
                      hidden: ({ parent }) => parent?.type !== "video",
                    }),
                  ],
                  preview: {
                    select: {
                      type: "type",
                      media: "image",
                    },
                    prepare({ type, media }) {
                      return {
                        title: type === "video" ? "Video" : "Image",
                        media: type !== "video" ? media : undefined,
                      };
                    },
                  },
                },
              ],
              description: "Multiple images/videos for slideshow. If provided, overrides single image/video.",
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
