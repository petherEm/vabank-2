"use client";

import { ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "./our-projects";
import { Button } from "../ui/button";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <>
      <div className="md:hidden">
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex-shrink-0 w-80 snap-start flex flex-col"
              onMouseEnter={() => setActiveProject(project._id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {project.mainImage ? (
                  <Image
                    src={urlFor(project.mainImage).url() || "/placeholder.svg"}
                    alt={project.mainImage.alt || project.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <span className="text-white/50">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

                {/* Category Badge */}
                {project.category?.title && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 rounded-full text-xs font-medium">
                    {project.category.title}
                  </div>
                )}

                {/* Visit Button - Appears on Hover */}
                {project.url && (
                  <div
                    className={`absolute bottom-4 right-4 transition-all duration-300 ${
                      activeProject === project._id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-3 py-2 rounded-full text-xs font-medium transition-colors"
                    >
                      Visit Website
                      <ArrowUpRightIcon className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="h-14 mb-2 flex items-start">
                  <h3 className="text-xl font-bold line-clamp-2">
                    {project.name}
                  </h3>
                </div>
                <div className="h-6 mb-2">
                  {project.clientName && (
                    <p className="text-secondary text-sm font-medium">
                      Client: {project.clientName}
                    </p>
                  )}
                </div>
                <div className="h-16 mb-4 overflow-hidden">
                  <p className="text-white/70 text-sm line-clamp-3">
                    {project.shortDescription || "No description available"}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
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
                  {(project.techTags || project.tags || []).length > 3 && (
                    <span className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60">
                      +{(project.techTags || project.tags || []).length - 3}{" "}
                      more
                    </span>
                  )}
                </div>

                {/* View Project Button */}
                {project.slug?.current && (
                  <div className="mt-auto">
                    <Link href={`/our-work/${project.slug.current}`}>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-white px-4 py-2 text-sm font-semibold group transition-colors hover:text-secondary"
                      >
                        View Project
                        <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex flex-col h-full"
            onMouseEnter={() => setActiveProject(project._id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            {/* Project Image */}
            <div className="relative h-64 overflow-hidden flex-shrink-0">
              {project.mainImage ? (
                <Image
                  src={urlFor(project.mainImage).url() || "/placeholder.svg"}
                  alt={project.mainImage.alt || project.name}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                  <span className="text-white/50">No image available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

              {/* Category Badge */}
              {project.category?.title && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 rounded-full text-xs font-medium">
                  {project.category.title}
                </div>
              )}

              {/* Visit Button - Appears on Hover */}
              {project.url && (
                <div
                  className={`absolute bottom-4 right-4 transition-all duration-300 ${
                    activeProject === project._id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-3 py-2 rounded-full text-xs font-medium transition-colors"
                  >
                    Visit Website
                    <ArrowUpRightIcon className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="h-16 mb-2 flex items-start">
                <h3 className="text-2xl font-bold line-clamp-2">
                  {project.name}
                </h3>
              </div>
              <div className="h-6 mb-2">
                {project.clientName && (
                  <p className="text-secondary text-sm font-medium">
                    Client: {project.clientName}
                  </p>
                )}
              </div>
              <div className="h-20 mb-4 overflow-hidden">
                <p className="text-white/70 text-sm line-clamp-4">
                  {project.shortDescription || "No description available"}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
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
                {(project.techTags || project.tags || []).length > 3 && (
                  <span className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60">
                    +{(project.techTags || project.tags || []).length - 3} more
                  </span>
                )}
              </div>

              {/* View Project Button */}
              {project.slug?.current && (
                <div className="mt-auto">
                  <Link href={`/our-work/${project.slug.current}`}>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-white px-4 sm:px-8 py-4 text-base sm:text-md font-semibold group transition-colors hover:text-secondary"
                    >
                      View Project
                      <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
