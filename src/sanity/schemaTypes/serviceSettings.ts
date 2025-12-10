import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesSettings",
  title: "Services – Settings",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "title_fi",
      title: "Title (FI)",
      type: "string",
    }),
    defineField({
      name: "subtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
    }),
    defineField({
      name: "services_fi",
      title: "Services List (FI)",
      type: "array",
      of: [
        defineField({
          name: "service",
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", title: "Description" },
          ],
        }),
      ],
    }),
  ],
});
