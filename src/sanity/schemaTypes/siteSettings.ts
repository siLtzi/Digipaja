import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "finnish", title: "Finnish Content" },
    { name: "english", title: "English Content" },
    { name: "company", title: "Company Info" },
    { name: "navigation", title: "Navigation" },
    { name: "social", title: "Social Media" },
  ],
  fields: [
    // ==================== FINNISH CONTENT ====================
    defineField({
      name: "footerTagline_fi",
      title: "Footer Tagline (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "footerDescription_fi",
      title: "Footer Description (FI)",
      type: "text",
      rows: 3,
      group: "finnish",
    }),
    defineField({
      name: "footerCtaBadge_fi",
      title: "Footer CTA - Badge (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "footerCtaTitle_fi",
      title: "Footer CTA - Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "footerCtaDescription_fi",
      title: "Footer CTA - Description (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),
    defineField({
      name: "footerCtaButton_fi",
      title: "Footer CTA - Button (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "footerNavTitle_fi",
      title: "Footer Section - Navigation (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "footerSocialTitle_fi",
      title: "Footer Section - Social (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "footerContactTitle_fi",
      title: "Footer Section - Contact (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelEmail_fi",
      title: "Label - Email (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelPhone_fi",
      title: "Label - Phone (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelBusinessId_fi",
      title: "Label - Business ID (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelLocation_fi",
      title: "Label - Location (FI)",
      type: "string",
      group: "finnish",
    }),

    // ==================== ENGLISH CONTENT ====================
    defineField({
      name: "footerTagline_en",
      title: "Footer Tagline (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "footerDescription_en",
      title: "Footer Description (EN)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "footerCtaBadge_en",
      title: "Footer CTA - Badge (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "footerCtaTitle_en",
      title: "Footer CTA - Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "footerCtaDescription_en",
      title: "Footer CTA - Description (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "footerCtaButton_en",
      title: "Footer CTA - Button (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "footerNavTitle_en",
      title: "Footer Section - Navigation (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "footerSocialTitle_en",
      title: "Footer Section - Social (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "footerContactTitle_en",
      title: "Footer Section - Contact (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelEmail_en",
      title: "Label - Email (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelPhone_en",
      title: "Label - Phone (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelBusinessId_en",
      title: "Label - Business ID (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelLocation_en",
      title: "Label - Location (EN)",
      type: "string",
      group: "english",
    }),

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
      name: "city",
      title: "City",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Primary contact email",
      group: "company",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "e.g. '+358 40 123 4567'",
      group: "company",
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
    defineField({
      name: "footerLinks",
      title: "Footer Quick Links",
      type: "array",
      group: "navigation",
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
      group: "navigation",
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
