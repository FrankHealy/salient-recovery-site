// sanity/schemas/page.ts
import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
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
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 2 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 2 },
      ],
    }),
    defineField({
      name: 'heroStatement',
      title: 'Hero Statement',
      description: 'One-sentence statement of what this page covers',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pageSection',
          title: 'Section',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'object',
              fields: [
                { name: 'en', type: 'string', title: 'English' },
                { name: 'ie', type: 'string', title: 'Irish' },
              ],
            },
            {
              name: 'body',
              title: 'Body',
              type: 'object',
              fields: [
                { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'English' },
                { name: 'ie', type: 'array', of: [{ type: 'block' }], title: 'Irish' },
              ],
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Full width prose', value: 'prose' },
                  { title: 'Two column', value: 'two-col' },
                  { title: 'Feature list', value: 'feature-list' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'heading.en' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'slug.current' },
  },
});
