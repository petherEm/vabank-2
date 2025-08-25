import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { getAllWorks } from "@/sanity/lib/queries/getAllWorks";
import { ProjectsGrid } from "./ProjectsGrid";
import Link from "next/link";

// Project type definition to match Sanity schema
export type Project = {
  _id: string;
  name: string;
  slug: { current: string };
  shortDescription?: string;
  longDescription?: any;
  clientName?: string;
  url?: string;
  tags?: string[];
  techTags?: string[];
  mainImage?: {
    asset: any;
    alt?: string;
  };
  secondaryImage?: {
    asset: any;
    alt?: string;
  };
  category?: {
    _ref: string;
    _key: string;
    title: string;
  };
};

export default async function OurProjects() {
  let featuredProjects: Project[] = [];

  try {
    const works = await getAllWorks();
    // Take first 3 projects as featured, or all if less than 3
    featuredProjects = works.slice(0, 3);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <section
      className="relative bg-black text-white py-24 overflow-hidden"
      id="work"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              OUR <span className="text-secondary">WORK</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl">
              We turn ambitious ideas into intelligent digital experiences that
              inspire users and accelerate business growth.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link href="/our-work" className="inline-block">
              <Button
                variant="ghost"
                className="text-white px-6 py-3 text-lg font-semibold group transition-colors border-b-2 border-secondary hover:bg-transparent"
              >
                View All
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Grid Component */}
        <ProjectsGrid projects={featuredProjects} />

        {/* Empty State */}
        {featuredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/70 mb-6">
              No projects found. Add some work to your Sanity CMS to see them
              here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
