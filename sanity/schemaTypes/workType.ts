import {CaseIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const workType = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
      group: 'settings',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
      group: 'settings',
    }),
    defineField({
      name: 'techTags',
      title: 'Technology Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
      group: 'settings',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      group: 'media',
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      group: 'media',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to control the order in which works are displayed',
      validation: (Rule) => Rule.integer().min(0),
      group: 'settings',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Media',
      type: 'seo',
      description: 'Settings for search engines and social media sharing',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'clientName',
      media: 'mainImage',
    },
    prepare(selection) {
      const {subtitle} = selection
      return {...selection, subtitle: subtitle && `Client: ${subtitle}`}
    },
  },
})