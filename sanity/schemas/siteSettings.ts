// sanity/schemas/siteSettings.ts
import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ie', title: 'Irish', type: 'string' },
      ],
    }),
    defineField({
      name: 'siteTagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ie', title: 'Irish', type: 'string' },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (R) => R.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'object',
      fields: [
        { name: 'line1', type: 'string', title: 'Line 1' },
        { name: 'line2', type: 'string', title: 'Line 2' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'country', type: 'string', title: 'Country' },
        { name: 'postcode', type: 'string', title: 'Postcode / Eircode' },
      ],
    }),
    defineField({
      name: 'footerStatement',
      title: 'Footer Regulatory Statement',
      type: 'object',
      description: 'Short regulatory/compliance statement shown in footer',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 2 },
        { name: 'ie', title: 'Irish', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'siteName.en' },
  },
});
