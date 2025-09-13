"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { GitlabIcon as GitHubIcon } from "lucide-react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

// Practice type definition
export type Practice = {
  _id: string;
  name: string | null;
  slug: { current?: string | undefined } | null;
  shortDescription?: string | null;
  longDescription?: any;
  url?: string | null;
  tags?: string[] | null;
  techTags?: string[] | null;
  mainImage?: any;
  secondaryImage?: any;
  lastUpdated?: string | null;
  progress?: number | null;
  repositoryUrl?: string | null;
  category?: {
    _ref: string;
    _key?: string | null;
    title: string | null;
  } | null;
};


interface Category {
  id: string;
  title: string;
}

interface TechPracticeClientProps {
  practices: Practice[];
  categories: Category[];
}

export function TechPracticeClient({ practices, categories }: TechPracticeClientProps) {
  // State for filtering, search, and hover
  const [activeTechCategory, setActiveTechCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleTechProjects, setVisibleTechProjects] = useState(6);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Filter projects based on category and search query
  const filteredTechProjects = practices.filter((practice) => {
    // Category filtering
    const matchesCategory =
      activeTechCategory === "all" ||
      (practice.category && practice.category._ref === activeTechCategory);

    // Search filtering
    const matchesSearch =
      searchQuery === "" ||
      (practice.name && practice.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (practice.shortDescription &&
        practice.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (practice.tags &&
        practice.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
      (practice.techTags &&
        practice.techTags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    return matchesCategory && matchesSearch;
  });

  // Load more projects
  const loadMoreTechProjects = () => {
    setVisibleTechProjects((prev) =>
      Math.min(prev + 6, filteredTechProjects.length)
    );
  };

  // Reset filters
  const resetFilters = () => {
    setActiveTechCategory("all");
    setSearchQuery("");
    setVisibleTechProjects(6);
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
      {/* Filters Section */}
      <section className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-y border-white/10 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Category Filters - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTechCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeTechCategory === category.id
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FunnelIcon className="w-4 h-4" />
              <span>Filter Projects</span>
            </button>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search practices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-secondary"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTechCategory(category.id);
                    setShowFilters(false);
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    activeTechCategory === category.id
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}

          {/* Active Filters */}
          {(activeTechCategory !== "all" || searchQuery) && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-white/50">Active filters:</span>
              {activeTechCategory !== "all" && (
                <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                  {categories.find((c) => c.id === activeTechCategory)?.title}
                </span>
              )}
              {searchQuery && (
                <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                  &quot;{searchQuery}&quot;
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-white/50 hover:text-white flex items-center gap-1"
              >
                <XMarkIcon className="w-3 h-3" /> Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filteredTechProjects.length > 0 ? (
            <>
              {/* Mobile Swipeable Grid */}
              <div className="md:hidden">
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  {filteredTechProjects
                    .slice(0, visibleTechProjects)
                    .map((practice) => (
                      <motion.div
                        key={practice._id}
                        className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/30 transition-all flex-shrink-0 w-80 snap-start flex flex-col"
                        variants={itemVariants}
                        onMouseEnter={() => setActiveProject(practice._id)}
                        onMouseLeave={() => setActiveProject(null)}
                      >
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden bg-black flex-shrink-0">
                          {practice.mainImage ? (
                            <Image
                              src={urlFor(practice.mainImage).url()}
                              alt={practice.mainImage.alt || practice.name || "Practice image"}
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
                            <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">
                              {practice.category.title}
                            </div>
                          )}
                        </div>

                        {/* Project Content */}
                        <div className="p-6 space-y-4 flex flex-col flex-grow">
                          <div className="h-14">
                            <h3 className="text-xl font-bold mb-1 line-clamp-2">
                              {practice.name || "Untitled Practice"}
                            </h3>
                            {practice.lastUpdated && (
                              <span className="text-xs text-white/50">
                                Updated:{" "}
                                {new Date(
                                  practice.lastUpdated
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>

                          <div className="h-16 overflow-hidden">
                            <p className="text-white/70 text-sm line-clamp-3">
                              {practice.shortDescription ||
                                practice.longDescription ||
                                "No description available"}
                            </p>
                          </div>

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
                          <div className="flex flex-wrap gap-2">
                            {(practice.techTags || practice.tags || [])
                              .slice(0, 3)
                              .map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60"
                                >
                                  {tag}
                                </span>
                              ))}
                            {(practice.techTags || practice.tags || []).length >
                              3 && (
                              <span className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60">
                                +
                                {(practice.techTags || practice.tags || [])
                                  .length - 3}{" "}
                                more
                              </span>
                            )}
                          </div>

                          {/* Links - Justified on one line */}
                          <div className="mt-auto">
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
                                  Live Demo{" "}
                                  <ArrowUpRightIcon className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <motion.div
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                      onMouseEnter={() => setActiveProject(practice._id)}
                      onMouseLeave={() => setActiveProject(null)}
                    >
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden bg-black flex-shrink-0">
                        {practice.mainImage ? (
                          <Image
                            src={urlFor(practice.mainImage).url()}
                            alt={practice.mainImage.alt || practice.name || "Practice image"}
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
                          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">
                            {practice.category.title}
                          </div>
                        )}
                      </div>

                      {/* Project Content */}
                      <div className="p-6 space-y-4 flex flex-col flex-grow">
                        <div className="h-16">
                          <h3 className="text-xl font-bold mb-1 line-clamp-2">
                            {practice.name || "Untitled Practice"}
                          </h3>
                          {practice.lastUpdated && (
                            <span className="text-xs text-white/50">
                              Updated:{" "}
                              {new Date(
                                practice.lastUpdated
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <div className="h-20 overflow-hidden">
                          <p className="text-white/70 text-sm line-clamp-4">
                            {practice.shortDescription ||
                              practice.longDescription ||
                              "No description available"}
                          </p>
                        </div>

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
                        <div className="flex flex-wrap gap-2">
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
                              {(practice.techTags || practice.tags || [])
                                .length - 4}{" "}
                              more
                            </span>
                          )}
                        </div>

                        {/* Links - Justified on one line */}
                        <div className="mt-auto">
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
                                Live Demo{" "}
                                <ArrowUpRightIcon className="w-3 h-3" />
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
                <h3 className="text-2xl font-bold mb-4">No practices found</h3>
                <p className="text-white/70 mb-6">
                  {practices.length === 0
                    ? "No practices available. Add some practices to your Sanity CMS to see them here."
                    : "We couldn't find any practices matching your current filters. Try adjusting your search criteria."}
                </p>
                {practices.length > 0 && (
                  <Button
                    onClick={resetFilters}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-black to-secondary/20 border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-left">
            <h3 className="text-2xl font-bold mb-2">
              Interested in our technical approach?
            </h3>
            <p className="text-white/70 max-w-xl">
              Our team regularly contributes to open-source projects and
              develops innovative technical solutions. Let&apos;s discuss how
              our expertise can benefit your next project.
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
