import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "heroVideo",
      title: "Hero Video (Replaces Image)",
      description:
        "Upload a short, looping MP4 (max 10MB recommended). Ideally 1:1 aspect ratio, but others work too.",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
    }),

    defineField({
      name: "mainImage",
      title: "Main Image / Graphic",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "Finnish", value: "fi" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "fi",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Full Description (Detail Page)",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "body",
      title: "Short Summary (Card Preview)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "features",
      title: "Features List",
      description: "Placeholder/Fallback",
      type: "array",
      of: [{ type: "string" }],
    }),

    // =========================
    // NEW: SpeechDeck (GSAP section)
    // =========================
    defineField({
      name: "speechDeck",
      title: "Speech Deck (GSAP / Lottie)",
      type: "object",
      fields: [
        defineField({
          name: "beats",
          title: "Beats",
          type: "array",
          of: [
            {
              type: "object",
              name: "speechBeat",
              title: "Beat",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),

                // IMPORTANT: dropdown so anim always matches your component
                defineField({
                  name: "anim",
                  title: "Animation",
                  type: "string",
                  initialValue: "split-reveal",
                  options: {
                    list: [
                      {
                        title: "Split Reveal (SplitText chars)",
                        value: "split-reveal",
                      },
                      { title: "Scramble (ScrambleText)", value: "scramble" },
                      {
                        title: "Kinetic Words (SplitText words)",
                        value: "kinetic-words",
                      },
                      { title: "Flip 3D", value: "flip-3d" },
                      { title: "Blur Reveal", value: "blur-reveal" },
                      { title: "Flash", value: "flash" },
                      { title: "Scale Up", value: "scale-up" },
                      { title: "Underline Sweep", value: "underline-sweep" },
                      { title: "Neon Flicker", value: "neon-flicker" },
                      { title: "Clip Reveal", value: "clip-reveal" },
                      {
                        title: "Rise Stagger (SplitText lines)",
                        value: "rise-stagger",
                      },

                      // fallback should stay last
                      { title: "Wipe Up (fallback)", value: "wipe-up" },
                    ],
                    layout: "dropdown",
                  },
                  validation: (rule) => rule.required(),
                }),

                // ICON: matches your component's `/icons/${name}.svg`
                defineField({
                  name: "iconName",
                  title: "Icon name (from /public/icons)",
                  type: "string",
                  validation: (rule) => rule.required().min(1),
                }),
                defineField({
                  name: "iconThemeHint",
                  title: "Icon search hint (optional)",
                  description:
                    "Write the vibe/style you want so you remember what to search for later (e.g. 'tech-noir outline, stroke-only').",
                  type: "string",
                }),

                // Optional image: you can use Sanity image OR keep it empty.
                defineField({
                  name: "image",
                  title: "Optional Image (Sanity image)",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "imageAlt",
                  title: "Image alt text",
                  type: "string",
                  hidden: ({ parent }) => !parent?.image,
                  validation: (rule) =>
                    rule.custom((val, ctx) => {
                      // @ts-ignore
                      if (ctx?.parent?.image && !val)
                        return "Alt text is required when an image is set.";
                      return true;
                    }),
                }),

                // Optional Lottie: either a URL/path OR upload file
                defineField({
                  name: "lottiePath",
                  title: "Optional Lottie path (from /public/lottie)",
                  description:
                    "Example: '/lottie/sparks.json'. If you use this, you don't need to upload a file.",
                  type: "string",
                }),
                defineField({
                  name: "lottieFile",
                  title: "Optional Lottie file upload",
                  description:
                    "Upload a .json Lottie if you prefer. If both path + file exist, you can choose which to use in your query.",
                  type: "file",
                  options: {
                    accept: "application/json,.json,application/lottie+json",
                  },
                }),
                defineField({
                  name: "lottieLoop",
                  title: "Lottie loop",
                  type: "boolean",
                  initialValue: true,
                }),
                defineField({
                  name: "lottieSpeed",
                  title: "Lottie speed",
                  type: "number",
                  initialValue: 1,
                  validation: (rule) => rule.min(0.1).max(3),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "anim",
                },
                prepare({ title, subtitle }) {
                  return {
                    title,
                    subtitle: subtitle
                      ? `Anim: ${subtitle}`
                      : "Anim: (missing)",
                  };
                },
              },
            },
          ],
        }),

        defineField({
          name: "ctaTitleHtml",
          title: "CTA Title (HTML allowed)",
          description: "This maps to cta.titleHtml in your component.",
          type: "string",
        }),
        defineField({
          name: "ctaBody",
          title: "CTA Body",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare(selection) {
      const { title, language } = selection;
      return {
        title,
        subtitle: language === "fi" ? "Finnish" : "English",
      };
    },
  },
});
