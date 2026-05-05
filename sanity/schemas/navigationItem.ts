// sanity/schemas/navigationItem.ts
import { defineType, defineField } from 'sanity';

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ie', title: 'Irish', type: 'string' },
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'href',
      title: 'Path',
      type: 'string',
      description: 'e.g. /platform or /sectors',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (R) => R.required().integer().positive(),
    }),
    defineField({
      name: 'children',
      title: 'Sub-Items',
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
            { name: 'href', type: 'string', title: 'Path' },
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'label.en', subtitle: 'href' },
  },
});
