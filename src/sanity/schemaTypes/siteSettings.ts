import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "company", title: "Company Info" },
    { name: "contact", title: "Contact Details" },
    { name: "social", title: "Social Media" },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer Content" },
  ],
  fields: [
    // ==================== COMPANY INFO ====================
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      description: "e.g. 'Digipaja'",
      group: "company",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "businessId",
      title: "Business ID (Y-tunnus)",
      type: "string",
      description: "e.g. 'FI1234567-8'",
      group: "company",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      group: "company",
      fields: [
        { name: "city", title: "City", type: "string" },
        { name: "country", title: "Country", type: "string" },
      ],
    }),

    // ==================== CONTACT DETAILS ====================
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Primary contact email",
      group: "contact",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "e.g. '+358 40 123 4567'",
      group: "contact",
    }),

    // ==================== SOCIAL MEDIA ====================
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform Name",
              type: "string",
              description: "e.g. 'LinkedIn', 'GitHub', 'Instagram'",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    // ==================== NAVIGATION ====================
    defineField({
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      group: "navigation",
      description: "Main navigation menu items",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "ID (for scroll targeting)",
              type: "string",
              description: "e.g. 'services', 'about-us'",
            }),
            defineField({
              name: "label_fi",
              title: "Label (Finnish)",
              type: "string",
            }),
            defineField({
              name: "label_en",
              title: "Label (English)",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label_fi",
              subtitle: "id",
            },
          },
        },
      ],
    }),

    // ==================== FOOTER CONTENT ====================
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "object",
      group: "footer",
      fields: [
        { name: "fi", title: "Finnish", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "object",
      group: "footer",
      fields: [
        { name: "fi", title: "Finnish", type: "text", rows: 3 },
        { name: "en", title: "English", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "footerCta",
      title: "Footer CTA",
      type: "object",
      group: "footer",
      fields: [
        {
          name: "badge",
          title: "Badge Text",
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
          name: "description",
          title: "Description",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "text" },
            { name: "en", title: "English", type: "text" },
          ],
        },
        {
          name: "buttonText",
          title: "Button Text",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "footerSectionTitles",
      title: "Footer Section Titles",
      type: "object",
      group: "footer",
      fields: [
        {
          name: "navigation",
          title: "Navigation Section",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "social",
          title: "Social Section",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "contact",
          title: "Contact Section",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "footerLabels",
      title: "Footer Field Labels",
      type: "object",
      group: "footer",
      fields: [
        {
          name: "email",
          title: "Email Label",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "phone",
          title: "Phone Label",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "businessId",
          title: "Business ID Label",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
        {
          name: "location",
          title: "Location Label",
          type: "object",
          fields: [
            { name: "fi", title: "Finnish", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Quick Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label_fi",
              title: "Label (Finnish)",
              type: "string",
            }),
            defineField({
              name: "label_en",
              title: "Label (English)",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "e.g. '/', '/#services', '/contact'",
            }),
          ],
          preview: {
            select: {
              title: "label_fi",
              subtitle: "href",
            },
          },
        },
      ],
    }),
    defineField({
      name: "legalLinks",
      title: "Legal Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label_fi",
              title: "Label (Finnish)",
              type: "string",
            }),
            defineField({
              name: "label_en",
              title: "Label (English)",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label_fi",
              subtitle: "href",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Global site configuration",
      };
    },
  },
});
