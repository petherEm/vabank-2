import { getAllPractices } from "@/sanity/lib/queries/getAllPractices";
import { TechPracticeClient } from "./TechPracticeClient";

export default async function TechPracticesSection() {
  // Fetch practices data
  const practices = await getAllPractices();

  // Extract unique categories from the actual practices
  const uniqueCategories = practices
    .filter((practice) => practice.category?.title)
    .reduce(
      (acc, practice) => {
        const categoryTitle = practice.category!.title!;
        if (!acc.some((cat) => cat.title === categoryTitle)) {
          acc.push({
            id: practice.category!._ref,
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
    <section className="py-24 relative overflow-hidden" id="tech-practices">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="tech-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="0.5"
                />
              </pattern>
              <pattern
                id="tech-circuit"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="100" cy="100" r="2" fill="rgba(208, 56, 75, 0.5)" />
                <circle cx="0" cy="100" r="1" fill="rgba(255, 255, 255, 0.3)" />
                <circle
                  cx="200"
                  cy="100"
                  r="1"
                  fill="rgba(255, 255, 255, 0.3)"
                />
                <circle cx="100" cy="0" r="1" fill="rgba(255, 255, 255, 0.3)" />
                <circle
                  cx="100"
                  cy="200"
                  r="1"
                  fill="rgba(255, 255, 255, 0.3)"
                />
                <line
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="200"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1="100"
                  x2="200"
                  y2="100"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-grid)" />
            <rect width="100%" height="100%" fill="url(#tech-circuit)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            TECH <span className="text-secondary">PRACTICES</span>
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            Explore our open-source contributions, experimental projects, and
            technology practices. These non-commercial projects showcase our
            technical expertise and commitment to innovation.
          </p>
        </div>

        {/* Client Component */}
        <TechPracticeClient practices={practices} categories={categories} />
      </div>
    </section>
  );
}
