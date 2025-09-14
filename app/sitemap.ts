import { MetadataRoute } from 'next'
import { getAllPosts } from '@/sanity/lib/queries/getAllPosts'
import { getAllWorks } from '@/sanity/lib/queries/getAllWorks'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vabank.dev'

  // Get dynamic content
  const [posts, works] = await Promise.all([
    getAllPosts(),
    getAllWorks(),
  ])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/our-work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Dynamic blog posts
  const postPages: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug?.current && !post.seo?.noIndex)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: post.isFeatured ? 0.9 : 0.6,
    }))

  // Dynamic work projects
  const workPages: MetadataRoute.Sitemap = works
    .filter((work) => work.slug?.current && !work.seo?.noIndex)
    .map((work) => ({
      url: `${baseUrl}/our-work/${work.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...staticPages, ...postPages, ...workPages]
}
