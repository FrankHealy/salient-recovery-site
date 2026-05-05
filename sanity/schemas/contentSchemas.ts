// sanity/schemas/sectorPage.ts
import { defineType, defineField } from 'sanity';

export const sectorPage = defineType({
  name: 'sectorPage',
  title: 'Sector Page',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name.en' }, validation: (R) => R.required() }),
    defineField({
      name: 'name',
      title: 'Sector Name',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 3 },
      ],
    }),
    defineField({
      name: 'regulatoryContext',
      title: 'Regulatory Context',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 4 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 4 },
      ],
    }),
    defineField({
      name: 'applicableFeatures',
      title: 'Applicable Platform Features',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }],
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name.en' } },
});

// sanity/schemas/resourceArticle.ts
export const resourceArticle = defineType({
  name: 'resourceArticle',
  title: 'Resource Article',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.en' }, validation: (R) => R.required() }),
    defineField({
      name: 'title',
      type: 'object',
      title: 'Title',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
    }),
    defineField({
      name: 'summary',
      type: 'object',
      title: 'Summary',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 3 },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'English' },
        { name: 'ie', type: 'array', of: [{ type: 'block' }], title: 'Irish' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Regulatory Guide', value: 'regulatory' },
          { title: 'Clinical Practice', value: 'clinical' },
          { title: 'Platform Documentation', value: 'platform' },
          { title: 'Policy Summary', value: 'policy' },
          { title: 'Sector Overview', value: 'sector' },
        ],
      },
    }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'date' }),
    defineField({ name: 'readingTimeMinutes', title: 'Reading Time (minutes)', type: 'number' }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'category' } },
});

// sanity/schemas/externalSignal.ts
export const externalSignal = defineType({
  name: 'externalSignal',
  title: 'External Signal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Neutral summary of the external content. Do not editorialize.',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 4 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 4 },
      ],
      validation: (R) => R.required(),
    }),
    defineField({ name: 'sourceName', title: 'Source Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'sourceUrl', title: 'Source URL', type: 'url', validation: (R) => R.required() }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date', validation: (R) => R.required() }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      options: {
        list: [
          { title: 'Residential Care', value: 'residential-care' },
          { title: 'Mental Health', value: 'mental-health' },
          { title: 'Addiction Recovery', value: 'addiction-recovery' },
          { title: 'Regulatory / Inspection', value: 'regulatory' },
          { title: 'Digital Health', value: 'digital-health' },
          { title: 'Workforce', value: 'workforce' },
          { title: 'Policy', value: 'policy' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Ireland', value: 'IE' },
          { title: 'Northern Ireland', value: 'NI' },
          { title: 'United Kingdom', value: 'UK' },
          { title: 'European Union', value: 'EU' },
          { title: 'International', value: 'INT' },
        ],
      },
    }),
    defineField({
      name: 'language',
      title: 'Language of Source',
      type: 'string',
      options: { list: ['en', 'ie', 'fr', 'de', 'es'] },
      initialValue: 'en',
    }),
    defineField({
      name: 'relevanceNote',
      title: 'Relevance Note',
      description: 'Brief internal note explaining why this is relevant to Salient Recovery users',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 2 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 2 },
      ],
    }),
    defineField({ name: 'isReviewed', title: 'Reviewed by Editor?', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'sourceName', media: 'isReviewed' },
    prepare: ({ title, subtitle }) => ({ title, subtitle }),
  },
});

// sanity/schemas/weeklyDigest.ts
export const weeklyDigest = defineType({
  name: 'weeklyDigest',
  title: 'Weekly Digest',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Digest Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
    }),
    defineField({ name: 'weekEnding', title: 'Week Ending', type: 'date', validation: (R) => R.required() }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 4 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 4 },
      ],
    }),
    defineField({
      name: 'signals',
      title: 'Included Signals',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'externalSignal' }] }],
    }),
    defineField({
      name: 'editorNote',
      title: 'Editor Note',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 3 },
      ],
    }),
    defineField({ name: 'isPublished', title: 'Published?', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'weekEnding' }, prepare: ({ title }) => ({ title: `Digest: ${title}` }) },
});

// sanity/schemas/researchPaperSummary.ts
export const researchPaperSummary = defineType({
  name: 'researchPaperSummary',
  title: 'Research Paper Summary',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'paperTitle' } }),
    defineField({ name: 'paperTitle', title: 'Paper Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'authors', title: 'Authors', type: 'string' }),
    defineField({ name: 'journal', title: 'Journal / Publication', type: 'string' }),
    defineField({ name: 'publishedYear', title: 'Published Year', type: 'number' }),
    defineField({ name: 'doi', title: 'DOI or URL', type: 'url' }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 5 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 5 },
      ],
    }),
    defineField({
      name: 'relevanceNote',
      title: 'Relevance to Sector',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 3 },
      ],
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'isReviewed', title: 'Reviewed?', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'paperTitle', subtitle: 'journal' } },
});

// sanity/schemas/policyUpdate.ts
export const policyUpdate = defineType({
  name: 'policyUpdate',
  title: 'Policy Update',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.en' } }),
    defineField({
      name: 'title',
      type: 'object',
      title: 'Title',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
    }),
    defineField({ name: 'effectiveDate', title: 'Effective / Published Date', type: 'date' }),
    defineField({ name: 'issuingBody', title: 'Issuing Body', type: 'string' }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 4 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 4 },
      ],
    }),
    defineField({ name: 'sourceUrl', title: 'Source URL', type: 'url' }),
    defineField({
      name: 'impactAssessment',
      title: 'Impact Assessment',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 3 },
      ],
    }),
    defineField({
      name: 'affectedSectors',
      title: 'Affected Sectors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sectorPage' }] }],
    }),
    defineField({ name: 'isReviewed', title: 'Reviewed?', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'issuingBody' } },
});

// sanity/schemas/faqItem.ts
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'object',
      fields: [
        { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'English' },
        { name: 'ie', type: 'array', of: [{ type: 'block' }], title: 'Irish' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Platform', value: 'platform' },
          { title: 'Implementation', value: 'implementation' },
          { title: 'Compliance', value: 'compliance' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Data', value: 'data' },
        ],
      },
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question.en', subtitle: 'category' } },
});

// sanity/schemas/complianceStatement.ts
export const complianceStatement = defineType({
  name: 'complianceStatement',
  title: 'Compliance Statement',
  type: 'document',
  fields: [
    defineField({ name: 'statementId', title: 'Statement ID', type: 'slug', options: { source: 'framework' } }),
    defineField({ name: 'framework', title: 'Regulatory Framework', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'issuingBody', title: 'Issuing Body', type: 'string' }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 4 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 4 },
      ],
    }),
    defineField({ name: 'lastReviewedDate', title: 'Last Reviewed', type: 'date' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'framework', subtitle: 'issuingBody' } },
});
