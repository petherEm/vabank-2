"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  BeakerIcon,
  CommandLineIcon,
  ServerIcon,
} from "@heroicons/react/16/solid";
import { GitlabIcon as GitHubIcon } from "lucide-react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

// Practice type definition
export type Practice = {
  _id: string;
  name: string;
  slug: { current: string };
  shortDescription?: string;
  longDescription?: string;
  url?: string;
  tags?: string[];
  techTags?: string[];
  mainImage?: any;
  secondaryImage?: any;
  lastUpdated?: string;
  progress?: number;
  repositoryUrl?: string;
  category?: {
    _ref: string;
    _key?: string;
    title: string;
  };
};

// Project categories
const techCategories = [
  {
    id: "all",
    name: "All Projects",
    icon: <CodeBracketIcon className="w-4 h-4" />,
  },
  {
    id: "open-source",
    name: "Open Source",
    icon: <GitHubIcon className="w-4 h-4" />,
  },
  {
    id: "experiments",
    name: "Experiments",
    icon: <BeakerIcon className="w-4 h-4" />,
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: <ServerIcon className="w-4 h-4" />,
  },
  {
    id: "tools",
    name: "Developer Tools",
    icon: <CommandLineIcon className="w-4 h-4" />,
  },
];

interface TechPracticeClientProps {
  practices: Practice[];
}

export function TechPracticeClient({ practices }: TechPracticeClientProps) {
  // State for filtering
  const [activeTechCategory, setActiveTechCategory] = useState("all");
  const [visibleTechProjects, setVisibleTechProjects] = useState(6);

  // Filter projects based on category
  const filteredTechProjects = practices.filter((practice) => {
    if (activeTechCategory === "all") return true;

    // Map category names to IDs for filtering
    const categoryMapping: { [key: string]: string } = {
      "open-source": "Open Source",
      experiments: "Experiments",
      infrastructure: "Infrastructure",
      tools: "Developer Tools",
    };

    return practice.category?.title === categoryMapping[activeTechCategory];
  });

  // Load more projects
  const loadMoreTechProjects = () => {
    setVisibleTechProjects((prev) =>
      Math.min(prev + 3, filteredTechProjects.length)
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-start gap-4 mb-12">
        {techCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTechCategory(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              activeTechCategory === category.id
                ? "bg-secondary text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredTechProjects.length > 0 ? (
        <>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTechProjects
              .slice(0, visibleTechProjects)
              .map((practice) => (
                <motion.div
                  key={practice._id}
                  className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/30 transition-all flex flex-col h-full"
                  variants={itemVariants}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-black">
                    {practice.mainImage ? (
                      <Image
                        src={urlFor(practice.mainImage).url()}
                        alt={practice.mainImage.alt || practice.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <span className="text-white/50">
                          No image available
                        </span>
                      </div>
                    )}

                    {/* Category Badge */}
                    {practice.category?.title && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1.5">
                        {
                          techCategories.find(
                            (c) =>
                              c.name === practice.category?.title ||
                              (c.id !== "all" &&
                                practice.category?.title
                                  ?.toLowerCase()
                                  .includes(c.id))
                          )?.icon
                        }
                        {practice.category.title}
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4 flex flex-col flex-grow">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {practice.name}
                      </h3>
                      {practice.lastUpdated && (
                        <span className="text-xs text-white/50">
                          Updated:{" "}
                          {new Date(practice.lastUpdated).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <p className="text-white/70 text-sm line-clamp-3">
                      {practice.shortDescription ||
                        practice.longDescription ||
                        "No description available"}
                    </p>

                    {/* Progress Bar */}
                    {practice.progress !== undefined && (
                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-white/50">
                            Progress
                          </span>
                          <span className="text-xs text-secondary font-medium">
                            {practice.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${practice.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {(practice.techTags || practice.tags || [])
                        .slice(0, 4)
                        .map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      {(practice.techTags || practice.tags || []).length >
                        4 && (
                        <span className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60">
                          +
                          {(practice.techTags || practice.tags || []).length -
                            4}{" "}
                          more
                        </span>
                      )}
                    </div>

                    {/* Links - Justified on one line */}
                    <div className="pt-2 mt-auto">
                      <div className="flex justify-between items-center min-h-[24px]">
                        {practice.repositoryUrl ? (
                          <a
                            href={practice.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-white hover:text-secondary transition-colors text-sm font-medium"
                          >
                            View Repository{" "}
                            <ArrowUpRightIcon className="w-3 h-3" />
                          </a>
                        ) : (
                          <div></div>
                        )}

                        {practice.url && (
                          <a
                            href={practice.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-secondary hover:underline text-sm font-medium"
                          >
                            Live Demo <ArrowUpRightIcon className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Load More Button */}
          {visibleTechProjects < filteredTechProjects.length && (
            <div className="mt-12 text-center">
              <Button
                onClick={loadMoreTechProjects}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
              >
                Load More Projects
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="py-24 text-center">
          <div className="inline-block p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold mb-4">No projects found</h3>
            <p className="text-white/70 mb-6">
              {practices.length === 0
                ? "No practices available. Add some practices to your Sanity CMS to see them here."
                : "We couldn't find any projects in this category. Please try selecting a different category."}
            </p>
            {practices.length > 0 && (
              <Button
                onClick={() => setActiveTechCategory("all")}
                className="bg-secondary hover:bg-secondary/90"
              >
                View All Projects
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-black to-secondary/20 border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-left">
            <h3 className="text-2xl font-bold mb-2">
              Interested in our technical approach?
            </h3>
            <p className="text-white/70 max-w-xl">
              Our team regularly contributes to open-source projects and
              develops innovative technical solutions. Let's discuss how our
              expertise can benefit your next project.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/vabank"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 transition-colors rounded-full"
            >
              <GitHubIcon className="w-5 h-5" />
              Follow on GitHub
            </a>
            <Button className="bg-secondary hover:bg-secondary/90">
              Contact Our Tech Team
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
