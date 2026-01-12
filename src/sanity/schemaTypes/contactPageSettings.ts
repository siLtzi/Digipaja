import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPageSettings",
  title: "Contact Page Settings",
  type: "document",
  groups: [
    { name: "finnish", title: "Finnish Content" },
    { name: "english", title: "English Content" },
    { name: "formOptions", title: "Form Options" },
  ],
  fields: [
    // ==================== FINNISH CONTENT ====================
    // Hero Section
    defineField({
      name: "heroEyebrow_fi",
      title: "Hero - Eyebrow (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "heroTitle_fi",
      title: "Hero - Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "heroTitleAccent_fi",
      title: "Hero - Title Accent (FI)",
      type: "string",
      description: "Colored word in the title",
      group: "finnish",
    }),
    defineField({
      name: "heroSubtitle_fi",
      title: "Hero - Subtitle (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),

    // Step Titles
    defineField({
      name: "stepContact_fi",
      title: "Step - Contact (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "stepPackage_fi",
      title: "Step - Package (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "stepProject_fi",
      title: "Step - Project (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "stepFeatures_fi",
      title: "Step - Features (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "stepDetails_fi",
      title: "Step - Details (FI)",
      type: "string",
      group: "finnish",
    }),

    // Section Headers
    defineField({
      name: "sectionContactTitle_fi",
      title: "Section Contact - Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sectionContactDescription_fi",
      title: "Section Contact - Description (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),
    defineField({
      name: "sectionPackageTitle_fi",
      title: "Section Package - Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sectionPackageDescription_fi",
      title: "Section Package - Description (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),
    defineField({
      name: "sectionProjectTitle_fi",
      title: "Section Project - Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sectionProjectDescription_fi",
      title: "Section Project - Description (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),
    defineField({
      name: "sectionFeaturesTitle_fi",
      title: "Section Features - Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sectionFeaturesDescription_fi",
      title: "Section Features - Description (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),
    defineField({
      name: "sectionDetailsTitle_fi",
      title: "Section Details - Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sectionDetailsDescription_fi",
      title: "Section Details - Description (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),

    // Form Labels
    defineField({
      name: "labelName_fi",
      title: "Label - Name (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "placeholderName_fi",
      title: "Placeholder - Name (FI)",
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
      name: "placeholderEmail_fi",
      title: "Placeholder - Email (FI)",
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
      name: "placeholderPhone_fi",
      title: "Placeholder - Phone (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelCompany_fi",
      title: "Label - Company (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "placeholderCompany_fi",
      title: "Placeholder - Company (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelPageCount_fi",
      title: "Label - Page Count (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelTimeline_fi",
      title: "Label - Timeline (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelBudget_fi",
      title: "Label - Budget (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelCurrentWebsite_fi",
      title: "Label - Current Website (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "placeholderCurrentWebsite_fi",
      title: "Placeholder - Current Website (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelCompetitors_fi",
      title: "Label - Competitors (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "placeholderCompetitors_fi",
      title: "Placeholder - Competitors (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelMessage_fi",
      title: "Label - Message (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "placeholderMessage_fi",
      title: "Placeholder - Message (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "labelHowFound_fi",
      title: "Label - How Found (FI)",
      type: "string",
      group: "finnish",
    }),

    // Buttons
    defineField({
      name: "buttonNext_fi",
      title: "Button - Next (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "buttonPrevious_fi",
      title: "Button - Previous (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "buttonSubmit_fi",
      title: "Button - Submit (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "buttonSubmitting_fi",
      title: "Button - Submitting (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "buttonSelectPackage_fi",
      title: "Button - Select Package (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "buttonSelected_fi",
      title: "Button - Selected (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "buttonBackToHome_fi",
      title: "Button - Back to Home (FI)",
      type: "string",
      group: "finnish",
    }),

    // Success Messages
    defineField({
      name: "successTitle_fi",
      title: "Success - Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "successMessage_fi",
      title: "Success - Message (FI)",
      type: "text",
      rows: 2,
      group: "finnish",
    }),

    // Sidebar Labels
    defineField({
      name: "sidebarSummaryTitle_fi",
      title: "Sidebar - Summary Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarSummarySubtitle_fi",
      title: "Sidebar - Summary Subtitle (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarProjectTypeLabel_fi",
      title: "Sidebar - Project Type Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarPackageLabel_fi",
      title: "Sidebar - Package Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarPageCountLabel_fi",
      title: "Sidebar - Page Count Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarTimelineLabel_fi",
      title: "Sidebar - Timeline Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarBudgetLabel_fi",
      title: "Sidebar - Budget Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarFeaturesLabel_fi",
      title: "Sidebar - Features Label (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarNoSelection_fi",
      title: "Sidebar - No Selection (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarPagesUnit_fi",
      title: "Sidebar - Pages Unit (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarContactTitle_fi",
      title: "Sidebar - Contact Title (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarContactSubtitle_fi",
      title: "Sidebar - Contact Subtitle (FI)",
      type: "string",
      group: "finnish",
    }),
    defineField({
      name: "sidebarNotProvided_fi",
      title: "Sidebar - Not Provided (FI)",
      type: "string",
      group: "finnish",
    }),

    // Badge
    defineField({
      name: "popularBadge_fi",
      title: "Popular Badge (FI)",
      type: "string",
      group: "finnish",
    }),

    // ==================== ENGLISH CONTENT ====================
    // Hero Section
    defineField({
      name: "heroEyebrow_en",
      title: "Hero - Eyebrow (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "heroTitle_en",
      title: "Hero - Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "heroTitleAccent_en",
      title: "Hero - Title Accent (EN)",
      type: "string",
      description: "Colored word in the title",
      group: "english",
    }),
    defineField({
      name: "heroSubtitle_en",
      title: "Hero - Subtitle (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),

    // Step Titles
    defineField({
      name: "stepContact_en",
      title: "Step - Contact (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "stepPackage_en",
      title: "Step - Package (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "stepProject_en",
      title: "Step - Project (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "stepFeatures_en",
      title: "Step - Features (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "stepDetails_en",
      title: "Step - Details (EN)",
      type: "string",
      group: "english",
    }),

    // Section Headers
    defineField({
      name: "sectionContactTitle_en",
      title: "Section Contact - Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sectionContactDescription_en",
      title: "Section Contact - Description (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "sectionPackageTitle_en",
      title: "Section Package - Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sectionPackageDescription_en",
      title: "Section Package - Description (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "sectionProjectTitle_en",
      title: "Section Project - Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sectionProjectDescription_en",
      title: "Section Project - Description (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "sectionFeaturesTitle_en",
      title: "Section Features - Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sectionFeaturesDescription_en",
      title: "Section Features - Description (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "sectionDetailsTitle_en",
      title: "Section Details - Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sectionDetailsDescription_en",
      title: "Section Details - Description (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),

    // Form Labels
    defineField({
      name: "labelName_en",
      title: "Label - Name (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "placeholderName_en",
      title: "Placeholder - Name (EN)",
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
      name: "placeholderEmail_en",
      title: "Placeholder - Email (EN)",
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
      name: "placeholderPhone_en",
      title: "Placeholder - Phone (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelCompany_en",
      title: "Label - Company (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "placeholderCompany_en",
      title: "Placeholder - Company (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelPageCount_en",
      title: "Label - Page Count (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelTimeline_en",
      title: "Label - Timeline (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelBudget_en",
      title: "Label - Budget (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelCurrentWebsite_en",
      title: "Label - Current Website (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "placeholderCurrentWebsite_en",
      title: "Placeholder - Current Website (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelCompetitors_en",
      title: "Label - Competitors (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "placeholderCompetitors_en",
      title: "Placeholder - Competitors (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelMessage_en",
      title: "Label - Message (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "placeholderMessage_en",
      title: "Placeholder - Message (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "labelHowFound_en",
      title: "Label - How Found (EN)",
      type: "string",
      group: "english",
    }),

    // Buttons
    defineField({
      name: "buttonNext_en",
      title: "Button - Next (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "buttonPrevious_en",
      title: "Button - Previous (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "buttonSubmit_en",
      title: "Button - Submit (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "buttonSubmitting_en",
      title: "Button - Submitting (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "buttonSelectPackage_en",
      title: "Button - Select Package (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "buttonSelected_en",
      title: "Button - Selected (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "buttonBackToHome_en",
      title: "Button - Back to Home (EN)",
      type: "string",
      group: "english",
    }),

    // Success Messages
    defineField({
      name: "successTitle_en",
      title: "Success - Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "successMessage_en",
      title: "Success - Message (EN)",
      type: "text",
      rows: 2,
      group: "english",
    }),

    // Sidebar Labels
    defineField({
      name: "sidebarSummaryTitle_en",
      title: "Sidebar - Summary Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarSummarySubtitle_en",
      title: "Sidebar - Summary Subtitle (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarProjectTypeLabel_en",
      title: "Sidebar - Project Type Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarPackageLabel_en",
      title: "Sidebar - Package Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarPageCountLabel_en",
      title: "Sidebar - Page Count Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarTimelineLabel_en",
      title: "Sidebar - Timeline Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarBudgetLabel_en",
      title: "Sidebar - Budget Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarFeaturesLabel_en",
      title: "Sidebar - Features Label (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarNoSelection_en",
      title: "Sidebar - No Selection (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarPagesUnit_en",
      title: "Sidebar - Pages Unit (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarContactTitle_en",
      title: "Sidebar - Contact Title (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarContactSubtitle_en",
      title: "Sidebar - Contact Subtitle (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "sidebarNotProvided_en",
      title: "Sidebar - Not Provided (EN)",
      type: "string",
      group: "english",
    }),

    // Badge
    defineField({
      name: "popularBadge_en",
      title: "Popular Badge (EN)",
      type: "string",
      group: "english",
    }),

    // ==================== FORM OPTIONS ====================
    // Section Numbers
    defineField({
      name: "sectionContactNumber",
      title: "Section Contact - Number",
      type: "string",
      group: "formOptions",
    }),
    defineField({
      name: "sectionPackageNumber",
      title: "Section Package - Number",
      type: "string",
      group: "formOptions",
    }),
    defineField({
      name: "sectionProjectNumber",
      title: "Section Project - Number",
      type: "string",
      group: "formOptions",
    }),
    defineField({
      name: "sectionFeaturesNumber",
      title: "Section Features - Number",
      type: "string",
      group: "formOptions",
    }),
    defineField({
      name: "sectionDetailsNumber",
      title: "Section Details - Number",
      type: "string",
      group: "formOptions",
    }),

    // Project Types
    defineField({
      name: "projectTypes",
      title: "Project Types",
      type: "array",
      group: "formOptions",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "icon", title: "Icon (emoji)", type: "string" },
            { name: "label_fi", title: "Label (FI)", type: "string" },
            { name: "label_en", title: "Label (EN)", type: "string" },
            { name: "description_fi", title: "Description (FI)", type: "string" },
            { name: "description_en", title: "Description (EN)", type: "string" },
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

    // Features
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      group: "formOptions",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "label_fi", title: "Label (FI)", type: "string" },
            { name: "label_en", title: "Label (EN)", type: "string" },
            { name: "description_fi", title: "Description (FI)", type: "string" },
            { name: "description_en", title: "Description (EN)", type: "string" },
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

    // Timeline Options
    defineField({
      name: "timelineOptions",
      title: "Timeline Options",
      type: "array",
      group: "formOptions",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "label_fi", title: "Label (FI)", type: "string" },
            { name: "label_en", title: "Label (EN)", type: "string" },
            { name: "description_fi", title: "Description (FI)", type: "string" },
            { name: "description_en", title: "Description (EN)", type: "string" },
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

    // Budget Ranges
    defineField({
      name: "budgetRanges",
      title: "Budget Ranges",
      type: "array",
      group: "formOptions",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "label_fi", title: "Label (FI)", type: "string" },
            { name: "label_en", title: "Label (EN)", type: "string" },
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

    // How Found Options
    defineField({
      name: "howFoundOptions",
      title: "How Did You Find Us Options",
      type: "array",
      group: "formOptions",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "label_fi", title: "Label (FI)", type: "string" },
            { name: "label_en", title: "Label (EN)", type: "string" },
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
  ],
  preview: {
    prepare() {
      return { title: "Contact Page Settings" };
    },
  },
});
