import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'tag', type: 'string' }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({ name: 'url', type: 'url', title: 'Link (optional)' })
  ]
});
