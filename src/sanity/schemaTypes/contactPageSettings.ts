import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPageSettings",
  title: "Contact Page Settings",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "title",
          title: "Title",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "titleAccent",
          title: "Title Accent (colored word)",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "subtitle",
          title: "Subtitle",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "text" },
            { name: "en", title: "English", type: "text" },
          ],
        },
      ],
    }),

    // Steps
    defineField({
      name: "steps",
      title: "Form Steps",
      type: "object",
      fields: [
        {
          name: "contact",
          title: "Contact Step Title",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "package",
          title: "Package Step Title",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "project",
          title: "Project Step Title",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "features",
          title: "Features Step Title",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "details",
          title: "Details Step Title",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
      ],
    }),

    // Section Headers
    defineField({
      name: "sectionHeaders",
      title: "Section Headers",
      type: "object",
      fields: [
        {
          name: "contact",
          title: "Contact Section",
          type: "object",
          fields: [
            { name: "number", title: "Number", type: "string" },
            {
              name: "title",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "text" },
                { name: "en", title: "English", type: "text" },
              ],
            },
          ],
        },
        {
          name: "package",
          title: "Package Section",
          type: "object",
          fields: [
            { name: "number", title: "Number", type: "string" },
            {
              name: "title",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "text" },
                { name: "en", title: "English", type: "text" },
              ],
            },
          ],
        },
        {
          name: "project",
          title: "Project Section",
          type: "object",
          fields: [
            { name: "number", title: "Number", type: "string" },
            {
              name: "title",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "text" },
                { name: "en", title: "English", type: "text" },
              ],
            },
          ],
        },
        {
          name: "features",
          title: "Features Section",
          type: "object",
          fields: [
            { name: "number", title: "Number", type: "string" },
            {
              name: "title",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "text" },
                { name: "en", title: "English", type: "text" },
              ],
            },
          ],
        },
        {
          name: "details",
          title: "Details Section",
          type: "object",
          fields: [
            { name: "number", title: "Number", type: "string" },
            {
              name: "title",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "text" },
                { name: "en", title: "English", type: "text" },
              ],
            },
          ],
        },
      ],
    }),

    // Form Labels
    defineField({
      name: "formLabels",
      title: "Form Labels",
      type: "object",
      fields: [
        {
          name: "name",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "namePlaceholder",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "email",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "emailPlaceholder",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "phone",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "phonePlaceholder",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "company",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "companyPlaceholder",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "pageCount",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "timeline",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "budget",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "currentWebsite",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "currentWebsitePlaceholder",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "competitors",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "competitorsPlaceholder",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "message",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "messagePlaceholder",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "howFound",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
      ],
    }),

    // Project Types
    defineField({
      name: "projectTypes",
      title: "Project Types",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "icon", title: "Icon (emoji)", type: "string" },
            {
              name: "label",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // Features
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            {
              name: "label",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // Timeline Options
    defineField({
      name: "timelineOptions",
      title: "Timeline Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            {
              name: "label",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            {
              name: "description",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // Budget Ranges
    defineField({
      name: "budgetRanges",
      title: "Budget Ranges",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            {
              name: "label",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // How Found Options
    defineField({
      name: "howFoundOptions",
      title: "How Did You Find Us Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            {
              name: "label",
              type: "object",
              fields: [
                { name: "fi", title: "Finnish", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // Buttons
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "object",
      fields: [
        {
          name: "next",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "previous",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "submit",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "submitting",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "selectPackage",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "selected",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "backToHome",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
      ],
    }),

    // Success Messages
    defineField({
      name: "success",
      title: "Success Messages",
      type: "object",
      fields: [
        {
          name: "title",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "message",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "text" },
            { name: "en", title: "English", type: "text" },
          ],
        },
      ],
    }),

    // Sidebar Labels
    defineField({
      name: "sidebar",
      title: "Sidebar Labels",
      type: "object",
      fields: [
        {
          name: "summaryTitle",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "summarySubtitle",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "projectTypeLabel",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "packageLabel",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "pageCountLabel",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "timelineLabel",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "budgetLabel",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "featuresLabel",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "noSelection",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "pagesUnit",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "contactTitle",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "contactSubtitle",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "notProvided",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
      ],
    }),

    // Popular Badge
    defineField({
      name: "popularBadge",
      title: "Popular Badge Text",
      type: "object",
      fields: [
        { name: "fi", title: "Finnish", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page Settings" };
    },
  },
});
