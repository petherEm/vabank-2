"use client";

import { ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "./OurProjects";
import { Button } from "../ui/button";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div
          key={project._id}
          className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
          onMouseEnter={() => setActiveProject(project._id)}
          onMouseLeave={() => setActiveProject(null)}
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

          {/* Project Content */}
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">{project.name}</h3>
            {project.clientName && (
              <p className="text-secondary text-sm font-medium">
                Client: {project.clientName}
              </p>
            )}
            <p className="text-white/70 text-sm line-clamp-3">
              {project.shortDescription || "No description available"}
            </p>

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
              {(project.techTags || project.tags || []).length > 3 && (
                <span className="px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60">
                  +{(project.techTags || project.tags || []).length - 3} more
                </span>
              )}
            </div>

            {/* View Project Button */}
            {project.slug?.current && (
              <div className="pt-4">
                <Link href={`/our-work/${project.slug.current}`}>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-white px-4 sm:px-8 py-4 text-base sm:text-md font-semibold group transition-colors hover:text-secondary"
                  >
                    {" "}
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
  );
}
