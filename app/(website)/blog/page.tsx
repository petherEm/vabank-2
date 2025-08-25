import BlogPage from "@/components/blog/BlogPage";
import { getAllPosts } from "@/sanity/lib/queries/getAllPosts";

export const metadata = {
  title: "Blog | Vabank",
  description:
    "Insights, tutorials, and thought leadership on web development, AI integration, and digital transformation.",
};

export default async function Page() {
  const posts = await getAllPosts();

  return <BlogPage posts={posts} />;
}
