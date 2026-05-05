// sanity/schemas/workflowStep.ts
import { defineType, defineField } from 'sanity';

export const workflowStep = defineType({
  name: 'workflowStep',
  title: 'Workflow Step',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (R) => R.required().integer().positive(),
    }),
    defineField({
      name: 'workflowType',
      title: 'Workflow',
      type: 'string',
      options: {
        list: [
          { title: 'Resident Admission', value: 'admission' },
          { title: 'Incident Reporting', value: 'incident' },
          { title: 'Audit Process', value: 'audit' },
          { title: 'Programme Delivery', value: 'programme' },
          { title: 'Discharge', value: 'discharge' },
          { title: 'Platform Onboarding', value: 'onboarding' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 3 },
        { name: 'ie', type: 'text', title: 'Irish', rows: 3 },
      ],
    }),
    defineField({
      name: 'actor',
      title: 'Actor / Role',
      description: 'Who performs this step',
      type: 'string',
      options: {
        list: [
          { title: 'Clinician', value: 'clinician' },
          { title: 'Key Worker', value: 'key-worker' },
          { title: 'Manager', value: 'manager' },
          { title: 'Administrator', value: 'administrator' },
          { title: 'System', value: 'system' },
          { title: 'Auditor', value: 'auditor' },
        ],
      },
    }),
    defineField({
      name: 'systemAction',
      title: 'System Action',
      description: 'What the platform does at this step',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ie', type: 'string', title: 'Irish' },
      ],
    }),
  ],
  orderings: [
    { title: 'Step Number', name: 'stepAsc', by: [{ field: 'stepNumber', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'workflowType' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Step', subtitle }),
  },
});
