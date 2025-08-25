import ProjectDetailPage from "@/components/our-work/OurWorkDetailed";
import { getWorkBySlug } from "@/sanity/lib/queries/getWorkBySlug";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const work = await getWorkBySlug(params.slug);

  if (!work) {
    return {
      title: "Project Not Found | Vabank",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${work.name} | Vabank`,
    description:
      work.shortDescription ||
      "Detailed case study of our web development, AI integration, and digital transformation projects.",
  };
}

export default async function Page({ params }: PageProps) {
  const work = await getWorkBySlug(params.slug);

  if (!work) {
    notFound();
  }

  return <ProjectDetailPage work={work} />;
}
