// sanity/schemas/platformFeature.ts
import { defineType, defineField } from 'sanity';

export const platformFeature = defineType({
  name: 'platformFeature',
  title: 'Platform Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'featureId',
      title: 'Feature ID',
      type: 'slug',
      description: 'Unique identifier. Matches platform system (e.g. resident-management, incident-reporting)',
      options: { source: 'title.en' },
      validation: (R) => R.required(),
    }),
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
      name: 'shortDescription',
      title: 'Short Description',
      description: 'One or two sentences. What this feature is and what it does.',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 2 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 2 },
      ],
    }),
    defineField({
      name: 'associatedEntity',
      title: 'Associated System Entity',
      type: 'string',
      description: 'The core system entity this feature relates to',
      options: {
        list: [
          { title: 'Resident', value: 'resident' },
          { title: 'Unit', value: 'unit' },
          { title: 'Programme', value: 'programme' },
          { title: 'Event', value: 'event' },
          { title: 'Incident', value: 'incident' },
          { title: 'Audit', value: 'audit' },
          { title: 'Form', value: 'form' },
          { title: 'Facility', value: 'facility' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      description: 'Specific, concrete things this feature enables — no vague claims',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'object',
              title: 'Label',
              fields: [
                { name: 'en', type: 'string', title: 'English' },
                { name: 'ie', type: 'string', title: 'Irish' },
              ],
            },
          ],
          preview: { select: { title: 'label.en' } },
        },
      ],
    }),
    defineField({
      name: 'regulatoryRelevance',
      title: 'Regulatory Relevance',
      description: 'Which frameworks or standards this feature addresses',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'HIQA Standards',
          'Mental Health Commission',
          'HSE Requirements',
          'GDPR / Data Protection',
          'Tusla Inspection',
          'ISO 27001',
          'NI RQIA',
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'associatedEntity' },
  },
});
