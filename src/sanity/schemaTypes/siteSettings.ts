import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "company", title: "🏢 Company Info", default: true },
    { name: "social", title: "📱 Social Media" },
    { name: "navigation", title: "🧭 Navigation" },
    { name: "footer", title: "📄 Footer Content" },
  ],
  fields: [
    // ══════════════════════════════════════════════════════════════════════
    // COMPANY INFO
    // These are the core company details used across the site
    // ══════════════════════════════════════════════════════════════════════
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      description: "Your company name. Used in copyright text and throughout the site.",
      group: "company",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "📧 Primary contact email - shown in Footer contact section",
      group: "company",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phoneMain",
      title: "Phone - Main Contact (Jouko)",
      type: "string",
      description: "📞 Primary contact phone - shown first in Footer (e.g. '+358 40 123 4567')",
      group: "company",
    }),
    defineField({
      name: "phoneTechnical",
      title: "Phone - Technical Contact",
      type: "string",
      description: "🔧 Technical inquiries phone - shown second in Footer",
      group: "company",
    }),
    defineField({
      name: "businessId",
      title: "Business ID (Y-tunnus)",
      type: "string",
      description: "🏷️ VAT/Business ID - shown in Footer contact section (e.g. 'FI1234567-8')",
      group: "company",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      description: "📍 City name - shown in Footer location (e.g. 'Oulu')",
      group: "company",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      description: "📍 Country name - shown in Footer location (e.g. 'Finland')",
      group: "company",
    }),

    // ══════════════════════════════════════════════════════════════════════
    // SOCIAL MEDIA LINKS
    // Links displayed in the Footer social section
    // ══════════════════════════════════════════════════════════════════════
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      group: "social",
      description: "🔗 Social media links shown in Footer 'Social' section",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform Name",
              type: "string",
              description: "Display name (e.g. 'LinkedIn', 'GitHub', 'Instagram')",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "Full URL to your profile",
              validation: (Rule) => Rule.required(),
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

    // ══════════════════════════════════════════════════════════════════════
    // NAVIGATION
    // Main navbar items and footer links
    // ══════════════════════════════════════════════════════════════════════
    defineField({
      name: "navItems",
      title: "Main Navigation (Navbar)",
      type: "array",
      group: "navigation",
      description: "🧭 Main menu items in the top Navbar. Each item scrolls to a section.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Section ID",
              type: "string",
              description: "ID of the section to scroll to (e.g. 'services', 'about-us', 'pricing')",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label_fi",
              title: "Label (Finnish)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label_en",
              title: "Label (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label_fi",
              subtitle: "id",
            },
            prepare({ title, subtitle }) {
              return {
                title: title,
                subtitle: `→ #${subtitle}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Navigation Links",
      type: "array",
      group: "navigation",
      description: "📄 Quick links shown in Footer 'Navigation' column",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label_fi",
              title: "Label (Finnish)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label_en",
              title: "Label (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link URL",
              type: "string",
              description: "Path or anchor (e.g. '/', '/#services', '/contact')",
              validation: (Rule) => Rule.required(),
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
      description: "⚖️ Legal page links shown at the bottom of the Footer (Privacy, Terms, etc.)",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label_fi",
              title: "Label (Finnish)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label_en",
              title: "Label (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link URL",
              type: "string",
              description: "Path to the legal page (e.g. '/tietosuoja', '/kayttoehdot')",
              validation: (Rule) => Rule.required(),
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

    // ══════════════════════════════════════════════════════════════════════
    // FOOTER CONTENT
    // Text content displayed in the footer sections
    // ══════════════════════════════════════════════════════════════════════
    defineField({
      name: "footerTagline_fi",
      title: "Footer Tagline (Finnish)",
      type: "string",
      group: "footer",
      description: "🎯 Large headline text in Footer left section (e.g. 'Rakennamme digitaalista ylivoimaa.')",
    }),
    defineField({
      name: "footerTagline_en",
      title: "Footer Tagline (English)",
      type: "string",
      group: "footer",
      description: "🎯 Large headline text in Footer left section (e.g. 'We build digital superiority.')",
    }),
    defineField({
      name: "footerDescription_fi",
      title: "Footer Description (Finnish)",
      type: "text",
      rows: 3,
      group: "footer",
      description: "📝 Paragraph text below the tagline in Footer left section",
    }),
    defineField({
      name: "footerDescription_en",
      title: "Footer Description (English)",
      type: "text",
      rows: 3,
      group: "footer",
      description: "📝 Paragraph text below the tagline in Footer left section",
    }),
    defineField({
      name: "footerCtaBadge_fi",
      title: "CTA Badge Text (Finnish)",
      type: "string",
      group: "footer",
      description: "🏷️ Small badge text above CTA title (e.g. 'Valmis aloittamaan?')",
    }),
    defineField({
      name: "footerCtaBadge_en",
      title: "CTA Badge Text (English)",
      type: "string",
      group: "footer",
      description: "🏷️ Small badge text above CTA title (e.g. 'Ready to start?')",
    }),
    defineField({
      name: "footerCtaTitle_fi",
      title: "CTA Title (Finnish)",
      type: "string",
      group: "footer",
      description: "📣 Main CTA heading on right side of Footer (e.g. 'Pyydä tarjous')",
    }),
    defineField({
      name: "footerCtaTitle_en",
      title: "CTA Title (English)",
      type: "string",
      group: "footer",
      description: "📣 Main CTA heading on right side of Footer (e.g. 'Get a Quote')",
    }),
    defineField({
      name: "footerCtaDescription_fi",
      title: "CTA Description (Finnish)",
      type: "text",
      rows: 2,
      group: "footer",
      description: "💬 Short description below CTA title",
    }),
    defineField({
      name: "footerCtaDescription_en",
      title: "CTA Description (English)",
      type: "text",
      rows: 2,
      group: "footer",
      description: "💬 Short description below CTA title",
    }),
    defineField({
      name: "footerCtaButton_fi",
      title: "CTA Button Text (Finnish)",
      type: "string",
      group: "footer",
      description: "🔘 Text on the CTA button (e.g. 'Aloita tästä')",
    }),
    defineField({
      name: "footerCtaButton_en",
      title: "CTA Button Text (English)",
      type: "string",
      group: "footer",
      description: "🔘 Text on the CTA button (e.g. 'Start here')",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Company info, social links, navigation & footer content",
      };
    },
  },
});
