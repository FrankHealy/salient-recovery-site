// sanity/schemas/shared/localeString.ts
// Reusable locale-aware string/text/block content field builder

export const localeString = (name: string, title: string) => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'string' },
    { name: 'ie', title: 'Irish (Gaeilge)', type: 'string' },
  ],
});

export const localeText = (name: string, title: string) => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'text' },
    { name: 'ie', title: 'Irish (Gaeilge)', type: 'text' },
  ],
});

export const localeBlock = (name: string, title: string) => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
    { name: 'ie', title: 'Irish (Gaeilge)', type: 'array', of: [{ type: 'block' }] },
  ],
});
