import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroBanner",
  title: "Hero Urgent Banners",
  type: "document",
  description: "Urgent messages displayed prominently at the top of the hero section",
  fields: [
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Toggle to show/hide this banner",
      initialValue: true,
    }),
    defineField({
      name: "priority",
      title: "Priority Order",
      type: "number",
      description: "Lower numbers appear first (1 = highest priority)",
      initialValue: 10,
      validation: (Rule) => Rule.min(1).max(100),
    }),
    defineField({
      name: "message_fi",
      title: "Message (Finnish)",
      type: "string",
      description: "The urgent message to display in Finnish",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "message_en",
      title: "Message (English)",
      type: "string",
      description: "The urgent message to display in English",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "link",
      title: "Link (optional)",
      type: "url",
      description: "Optional link when banner is clicked",
    }),
    defineField({
      name: "linkText_fi",
      title: "Link Text (Finnish)",
      type: "string",
      description: "Text for the link button in Finnish (e.g., 'Lue lisää')",
    }),
    defineField({
      name: "linkText_en",
      title: "Link Text (English)",
      type: "string",
      description: "Text for the link button in English (e.g., 'Learn more')",
    }),
    defineField({
      name: "variant",
      title: "Banner Style",
      type: "string",
      options: {
        list: [
          { title: "Info (Blue)", value: "info" },
          { title: "Warning (Orange)", value: "warning" },
          { title: "Success (Green)", value: "success" },
          { title: "Urgent (Red)", value: "urgent" },
          { title: "Promo (Purple)", value: "promo" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Megaphone", value: "megaphone" },
          { title: "Sparkles", value: "sparkles" },
          { title: "Clock", value: "clock" },
        ],
        layout: "dropdown",
      },
      initialValue: "info",
    }),
    defineField({
      name: "startDate",
      title: "Start Date (optional)",
      type: "datetime",
      description: "Banner will only show after this date",
    }),
    defineField({
      name: "endDate",
      title: "End Date (optional)",
      type: "datetime",
      description: "Banner will automatically hide after this date",
    }),
  ],
  orderings: [
    {
      title: "Priority",
      name: "priorityAsc",
      by: [{ field: "priority", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "message_fi",
      subtitle: "variant",
      isActive: "isActive",
    },
    prepare({ title, subtitle, isActive }) {
      return {
        title: title || "No message",
        subtitle: `${isActive ? "🟢 Active" : "🔴 Inactive"} • ${subtitle || "info"}`,
      };
    },
  },
});
