// sanity/sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const singletonTypes = new Set(['siteSettings', 'localeSettings']);

export default defineConfig({
  name: 'salient-recovery',
  title: 'Salient Recovery CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Locale Settings')
              .child(S.document().schemaType('localeSettings').documentId('localeSettings')),
            S.divider(),

            // Navigation
            S.documentTypeListItem('navigationItem').title('Navigation'),
            S.divider(),

            // Platform
            S.listItem()
              .title('Platform')
              .child(
                S.list()
                  .title('Platform')
                  .items([
                    S.documentTypeListItem('platformFeature').title('Features'),
                    S.documentTypeListItem('workflowStep').title('Workflow Steps'),
                  ])
              ),

            // Sectors
            S.documentTypeListItem('sectorPage').title('Sectors'),
            S.divider(),

            // Resources
            S.listItem()
              .title('Resources')
              .child(
                S.list()
                  .title('Resources')
                  .items([
                    S.documentTypeListItem('resourceArticle').title('Articles'),
                    S.documentTypeListItem('externalSignal').title('External Signals'),
                    S.documentTypeListItem('weeklyDigest').title('Weekly Digests'),
                    S.documentTypeListItem('researchPaperSummary').title('Research Papers'),
                    S.documentTypeListItem('policyUpdate').title('Policy Updates'),
                  ])
              ),
            S.divider(),

            // Support
            S.documentTypeListItem('faqItem').title('FAQ'),
            S.documentTypeListItem('complianceStatement').title('Compliance Statements'),
            S.documentTypeListItem('page').title('Pages'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : prev,
  },
});
