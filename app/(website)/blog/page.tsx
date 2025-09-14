import BlogPage from "@/components/blog/BlogPage";
import { getAllPosts } from "@/sanity/lib/queries/getAllPosts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Vabank.dev - AI & Web Development Insights",
  description:
    "Insights, tutorials, and thought leadership on web development, AI integration, and digital transformation from the Vabank development team.",
  keywords: [
    "web development blog",
    "AI integration tutorials",
    "digital transformation insights",
    "Next.js tutorials",
    "React development",
    "TypeScript guides",
    "modern web development",
    "software engineering blog"
  ],
  authors: [{ name: "Vabank Development Team" }],
  creator: "Vabank.dev",
  publisher: "Vabank.dev",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vabank.dev/blog",
    siteName: "Vabank.dev",
    title: "Blog | Vabank.dev - AI & Web Development Insights",
    description: "Insights, tutorials, and thought leadership on web development, AI integration, and digital transformation from the Vabank development team.",
    images: [{
      url: "https://vabank.dev/vabank-light.png",
      width: 1200,
      height: 630,
      alt: "Vabank.dev Blog - AI & Web Development Insights",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Vabank.dev - AI & Web Development Insights",
    description: "Insights, tutorials, and thought leadership on web development, AI integration, and digital transformation.",
    images: ["https://vabank.dev/vabank-light.png"],
    creator: "@vabank_dev",
  },
  alternates: {
    canonical: "https://vabank.dev/blog",
  },
  category: "Technology",
};

export default async function Page() {
  const posts = await getAllPosts();

  // Extract unique categories from the actual posts
  const uniqueCategories = posts
    .flatMap((post) => post.categories || [])
    .filter((category, index, array) => array.indexOf(category) === index)
    .filter(Boolean) // Remove any null/undefined categories
    .map((category) => ({
      id: category,
      title: category,
    }));

  // Add "All Articles" category at the beginning
  const categories = [
    { id: "all", title: "All Articles" },
    ...uniqueCategories,
  ];

  return <BlogPage posts={posts} categories={categories} />;
}
