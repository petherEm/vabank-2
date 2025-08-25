import { getAllWorks } from "@/sanity/lib/queries/getAllWorks";
import { OurWorkClient } from "./OurWorkClient";

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

export default async function OurWorkPage() {
  let projects: Project[] = [];

  try {
    projects = await getAllWorks();
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  // Extract unique categories from the actual projects
  const uniqueCategories = projects
    .filter((project) => project.category?.title)
    .reduce(
      (acc, project) => {
        const categoryTitle = project.category!.title;
        if (!acc.some((cat) => cat.title === categoryTitle)) {
          acc.push({
            id: project.category!._ref,
            title: categoryTitle,
          });
        }
        return acc;
      },
      [] as { id: string; title: string }[]
    );

  // Add "All Projects" category at the beginning
  const categories = [
    { id: "all", title: "All Projects" },
    ...uniqueCategories,
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 40px,
                  rgba(208, 56, 75, 0.2) 40px,
                  rgba(208, 56, 75, 0.2) 43px
                )
              `,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              OUR <span className="text-secondary">WORK</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Explore our portfolio of innovative projects across web
              development, AI integration, automation, and analytics. Each
              project represents our commitment to excellence and cutting-edge
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Client Component with Projects and Categories */}
      <OurWorkClient projects={projects} categories={categories} />

      {/* CTA Section */}
      {/* <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your project?
            </h2>
            <p className="text-white/70 mb-8">
              Let's discuss how we can help you achieve your business goals with
              our expertise in web development, AI, automation, and analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary hover:bg-secondary/90 px-6 py-3 rounded-lg font-medium transition-colors">
                Schedule a Consultation
              </button>
              <button className="border border-white/20 text-white hover:bg-white/5 px-6 py-3 rounded-lg font-medium transition-colors">
                View Our Services
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
