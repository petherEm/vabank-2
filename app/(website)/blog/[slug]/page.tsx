import BlogArticlePage from "@/components/blog/BlogArticlePage";
import { getPostBySlug } from "@/sanity/lib/queries/getPostBySlug";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const baseUrl = "https://vabank.dev";

  if (!post) {
    return {
      title: "Post Not Found | Vabank",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Use SEO fields if available, fallback to content
  const title = post.seo?.metaTitle || `${post.title} | Vabank`;
  const description = post.seo?.metaDescription ||
    post.body
      ?.find((block: any) => block._type === "block")
      ?.children?.[0]?.text?.slice(0, 160) + "..." ||
    "Read our latest insights on web development, AI integration, and digital transformation.";

  const keywords = post.seo?.keywords || [];
  const ogImage = post.seo?.openGraphImage || post.mainImage;
  const canonical = post.seo?.canonical || `${baseUrl}/blog/${post.slug.current}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : [
      "web development",
      "AI integration",
      "digital transformation",
      ...(post.categories || [])
    ],
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: "Vabank.dev",
    robots: {
      index: !post.seo?.noIndex,
      follow: true,
      googleBot: {
        index: !post.seo?.noIndex,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonical,
      siteName: "Vabank.dev",
      title,
      description,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: [...(post.categories || []), ...(keywords || [])],
      images: ogImage ? [{
        url: urlFor(ogImage.asset).width(1200).height(630).format('webp').url(),
        width: 1200,
        height: 630,
        alt: ogImage.alt || post.title || '',
      }] : [{
        url: `${baseUrl}/vabank-light.png`,
        width: 1200,
        height: 630,
        alt: "Vabank.dev - AI-Powered Web Development",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vabank_dev",
      images: ogImage ? [
        urlFor(ogImage.asset).width(1200).height(630).format('webp').url()
      ] : [`${baseUrl}/vabank-light.png`],
    },
    alternates: {
      canonical,
    },
    category: post.categories?.[0] || "Technology",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticlePage post={post} />;
}
