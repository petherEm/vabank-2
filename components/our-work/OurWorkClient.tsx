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
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "./OurWorkAll";

interface Category {
  id: string;
  title: string;
}

interface OurWorkClientProps {
  projects: Project[];
  categories: Category[];
}

export function OurWorkClient({ projects, categories }: OurWorkClientProps) {
  // State for filtering and search
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "all" ||
      (project.category && project.category._ref === activeCategory);

    const matchesSearch =
      searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.shortDescription &&
        project.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (project.tags &&
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
      (project.techTags &&
        project.techTags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    return matchesCategory && matchesSearch;
  });

  // Load more projects
  const loadMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 6, filteredProjects.length));
  };

  // Reset filters
  const resetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setVisibleProjects(6);
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
      <section className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-y border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Category Filters - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category.id
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
                placeholder="Search projects..."
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
                    setActiveCategory(category.id);
                    setShowFilters(false);
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    activeCategory === category.id
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
          {(activeCategory !== "all" || searchQuery) && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-white/50">Active filters:</span>
              {activeCategory !== "all" && (
                <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                  {categories.find((c) => c.id === activeCategory)?.title}
                </span>
              )}
              {searchQuery && (
                <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                  "{searchQuery}"
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filteredProjects.length > 0 ? (
            <>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.slice(0, visibleProjects).map((project) => (
                  <motion.div
                    key={project._id}
                    className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
                    variants={itemVariants}
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      {project.mainImage ? (
                        <Image
                          src={urlFor(project.mainImage).url()}
                          alt={project.mainImage.alt || project.name}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

                      {/* Category Badge */}
                      {project.category?.title && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 rounded-full text-xs font-medium">
                          {project.category.title}
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold">{project.name}</h3>
                      </div>

                      <p className="text-white/70 text-sm line-clamp-3">
                        {project.shortDescription || "No description available"}
                      </p>

                      {/* Client */}
                      {project.clientName && (
                        <div className="text-sm">
                          <span className="text-white/50">Client:</span>{" "}
                          <span className="text-white/90">
                            {project.clientName}
                          </span>
                        </div>
                      )}

                      {/* Tags - Show tech tags if available, otherwise show regular tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {(project.techTags || project.tags || [])
                          .slice(0, 3)
                          .map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        {(project.techTags || project.tags || []).length >
                          3 && (
                          <span className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60">
                            +
                            {(project.techTags || project.tags || []).length -
                              3}{" "}
                            more
                          </span>
                        )}
                      </div>

                      {/* View Project Link */}
                      {project.url && (
                        <div className="pt-2">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-secondary hover:underline text-sm font-medium"
                          >
                            View Project{" "}
                            <ArrowUpRightIcon className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {visibleProjects < filteredProjects.length && (
                <div className="mt-12 text-center">
                  <Button
                    onClick={loadMoreProjects}
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
                  {projects.length === 0
                    ? "No projects available. Add some work to your Sanity CMS to see them here."
                    : "We couldn't find any projects matching your current filters. Try adjusting your search criteria."}
                </p>
                {projects.length > 0 && (
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
    </>
  );
}
