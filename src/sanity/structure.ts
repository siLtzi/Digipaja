import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Digipaja CMS')
    .items([
      // ==================== SITE SETTINGS ====================
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // ==================== PAGE SECTIONS ====================
      S.listItem()
        .title('🏠 Homepage Sections')
        .child(
          S.list()
            .title('Homepage Sections')
            .items([
              S.listItem()
                .title('Hero Section')
                .child(
                  S.document()
                    .schemaType('heroSettings')
                    .documentId('heroSettings')
                    .title('Hero Section')
                ),
              S.listItem()
                .title('About Us Section')
                .child(
                  S.document()
                    .schemaType('aboutUsSettings')
                    .documentId('aboutUsSettings')
                    .title('About Us Section')
                ),
              S.listItem()
                .title('Services Section')
                .child(
                  S.document()
                    .schemaType('servicesSettings')
                    .documentId('servicesSettings')
                    .title('Services Section')
                ),
              S.listItem()
                .title('References Section')
                .child(
                  S.document()
                    .schemaType('referencesSettings')
                    .documentId('referencesSettings')
                    .title('References Section')
                ),
              S.listItem()
                .title('Process Section')
                .child(
                  S.document()
                    .schemaType('processSettings')
                    .documentId('processSettings')
                    .title('Process Section')
                ),
              S.listItem()
                .title('Why Us Section')
                .child(
                  S.document()
                    .schemaType('whyUsSettings')
                    .documentId('whyUsSettings')
                    .title('Why Us Section')
                ),
              S.listItem()
                .title('Pricing Section')
                .child(
                  S.document()
                    .schemaType('pricingSettings')
                    .documentId('pricingSettings')
                    .title('Pricing Section')
                ),
              S.listItem()
                .title('CTA Section')
                .child(
                  S.document()
                    .schemaType('ctaSettings')
                    .documentId('ctaSettings')
                    .title('CTA Section')
                ),
            ])
        ),

      S.divider(),

      // ==================== CONTENT COLLECTIONS ====================
      S.listItem()
        .title('📁 Projects')
        .child(S.documentTypeList('project').title('Projects')),

      S.listItem()
        .title('🛠️ Services')
        .child(S.documentTypeList('service').title('Services')),

      S.listItem()
        .title('📚 Services Overview')
        .child(S.documentTypeList('servicesOverview').title('Services Overview')),

      S.divider(),

      // ==================== CONTACT PAGE ====================
      S.listItem()
        .title('📬 Contact Page')
        .child(
          S.document()
            .schemaType('contactPageSettings')
            .documentId('contactPageSettings')
            .title('Contact Page Settings')
        ),
    ])
