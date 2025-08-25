import BlogArticlePage from "@/components/blog/BlogArticlePage";
import { getPostBySlug } from "@/sanity/lib/queries/getPostBySlug";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Vabank",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Vabank`,
    description:
      post.body
        ?.find((block: any) => block._type === "block")
        ?.children?.[0]?.text?.slice(0, 160) + "..." ||
      "Read our latest insights on web development, AI integration, and digital transformation.",
  };
}

export default async function Page({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogArticlePage post={post} />;
}
