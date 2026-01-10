import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaSettings",
  title: "CTA Section",
  type: "document",
  fields: [
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "object",
      fields: [
        { name: "fi", title: "Finnish", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
      description: "Link path, e.g. '/yhteydenotto' or '/contact'",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "CTA Section Settings",
      };
    },
  },
});
