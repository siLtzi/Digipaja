import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'heroVideo',
      title: 'Hero Video (Replaces Image)',
      description: 'Upload a short, looping MP4 (max 10MB recommended). Ideally 1:1 aspect ratio, but others work too.',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image / Graphic',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Finnish', value: 'fi' },
          { title: 'English', value: 'en' },
        ],
        layout: 'radio'
      },
      initialValue: 'fi',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Full Description (Detail Page)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'body',
      title: 'Short Summary (Card Preview)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const { title, language } = selection
      return {
        title: title,
        subtitle: language === 'fi' ? 'Finnish' : 'English',
      }
    },
  },
})