import ProjectDetailPage from "@/components/our-work/OurWorkDetailed";
import { getWorkBySlug } from "@/sanity/lib/queries/getWorkBySlug";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  const baseUrl = "https://vabank.dev";

  if (!work) {
    return {
      title: "Project Not Found | Vabank.dev",
      description: "The requested project could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Use SEO fields if available, fallback to content
  const title = work.seo?.metaTitle || `${work.name} | Vabank.dev`;
  const description = work.seo?.metaDescription ||
    work.shortDescription ||
    "Detailed case study of our web development, AI integration, and digital transformation projects.";

  const keywords = work.seo?.keywords || [];
  const ogImage = work.seo?.openGraphImage || work.mainImage;
  const canonical = work.seo?.canonical || `${baseUrl}/our-work/${work.slug.current}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : [
      "web development project",
      "case study",
      "digital transformation",
      "AI integration",
      ...(work.tags || []),
      ...(work.techTags || [])
    ],
    authors: [{ name: "Vabank Development Team" }],
    creator: "Vabank.dev",
    publisher: "Vabank.dev",
    robots: {
      index: !work.seo?.noIndex,
      follow: true,
      googleBot: {
        index: !work.seo?.noIndex,
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
      tags: [...(work.tags || []), ...(work.techTags || []), ...(keywords || [])],
      images: ogImage ? [{
        url: urlFor(ogImage.asset).width(1200).height(630).format('webp').url(),
        width: 1200,
        height: 630,
        alt: ogImage.alt || work.name || '',
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
    category: work.category?.title || "Technology",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return <ProjectDetailPage work={work} />;
}
