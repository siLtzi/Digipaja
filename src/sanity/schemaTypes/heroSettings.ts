import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSettings",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow_fi",
      title: "Eyebrow (FI)",
      type: "string",
    }),
    defineField({
      name: "heroTitle_fi",
      title: "Title (FI)",
      type: "string",
    }),
    defineField({
      name: "heroHighlight_fi",
      title: "Highlighted word (FI)",
      type: "string",
      description: "Optional highlighted word in the title (esim. “hyvältä”).",
    }),
    defineField({
      name: "heroSubtitle_fi",
      title: "Subtitle (FI)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroDesktopVideo",
      title: "Hero video (desktop)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
    }),
    defineField({
      name: "heroMobileVideo",
      title: "Hero video (mobile, optional)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
    }),
  ],
});
