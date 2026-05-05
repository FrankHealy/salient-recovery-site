// sanity/schemas/localeSettings.ts
import { defineType, defineField } from 'sanity';

export const localeSettings = defineType({
  name: 'localeSettings',
  title: 'Locale Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'supportedLocales',
      title: 'Supported Locales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'code', title: 'Code (e.g. en, ie)', type: 'string' },
            { name: 'label', title: 'Display Label', type: 'string' },
            { name: 'isDefault', title: 'Is Default?', type: 'boolean' },
            { name: 'direction', title: 'Text Direction', type: 'string', options: { list: ['ltr', 'rtl'] } },
          ],
          preview: { select: { title: 'label', subtitle: 'code' } },
        },
      ],
    }),
    defineField({
      name: 'defaultLocale',
      title: 'Default Locale Code',
      type: 'string',
      description: 'Must match one of the supported locale codes above',
    }),
  ],
  preview: {
    select: { title: 'defaultLocale' },
    prepare: ({ title }) => ({ title: `Locale Settings (default: ${title})` }),
  },
});
