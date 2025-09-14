import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title for search engines and social media (recommended: 50-60 characters)',
      validation: (Rule) => Rule.max(60).warning('Keep meta titles under 60 characters for best SEO results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO description for search engines and social media (recommended: 150-160 characters)',
      validation: (Rule) => Rule.max(160).warning('Keep meta descriptions under 160 characters for best SEO results'),
    }),
    defineField({
      name: 'keywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Primary keywords for this content (3-5 recommended)',
      validation: (Rule) => Rule.max(10).warning('Consider using fewer keywords for better focus'),
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Social Media Image',
      type: 'image',
      description: 'Custom image for social media sharing (recommended: 1200x630px)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for accessibility and SEO',
        })
      ]
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Check this to prevent search engines from indexing this content',
      initialValue: false,
    }),
    defineField({
      name: 'canonical',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override the canonical URL if this content exists elsewhere',
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
      media: 'openGraphImage',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'SEO Settings',
        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : 'No description set',
      }
    },
  },
})