"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  UserGroupIcon,
  TagIcon,
  CheckCircleIcon,
} from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

interface Work {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  shortDescription?: string;
  longDescription?: any; // This is rich text content
  clientName?: string;
  url?: string;
  tags?: string[];
  techTags?: string[];
  mainImage?: any;
  secondaryImage?: any;
  category?: {
    _ref: string;
    _key: string;
    title: string;
  };
}

interface ProjectDetailPageProps {
  work: Work;
}

export default function ProjectDetailPage({ work }: ProjectDetailPageProps) {
  // Helper function to safely get text content
  const getDescription = () => {
    if (work.longDescription) {
      // If longDescription is rich text, we'll render it with PortableText
      return work.longDescription;
    }
    return work.shortDescription || "";
  };

  // Check if description is rich text or plain text
  const isRichText =
    work.longDescription && Array.isArray(work.longDescription);

  // Transform work data to match existing component structure
  const projectData = {
    id: work.slug.current,
    title: work.name,
    subtitle: work.shortDescription || "",
    description: getDescription(),
    heroImage: work.mainImage
      ? urlFor(work.mainImage).width(1400).height(800).url()
      : "/placeholder.svg?height=800&width=1400",
    client: work.clientName || "Client",
    year: "2024", // You might want to add a year field to your Sanity schema
    duration: "6 months", // You might want to add a duration field to your Sanity schema
    category: work.category?.title || "Web Development",
    status: "Live",
    websiteUrl: work.url || "#",
    technologies: work.techTags || [],
  };

  // Default features if not provided from CMS
  const defaultFeatures = [
    {
      title: "Modern Web Development",
      description: "Built with cutting-edge technologies and best practices",
      icon: <CheckCircleIcon className="w-6 h-6" />,
    },
    {
      title: "Responsive Design",
      description: "Optimized for all devices and screen sizes",
      icon: <CheckCircleIcon className="w-6 h-6" />,
    },
    {
      title: "Performance Optimized",
      description: "Fast loading times and smooth user experience",
      icon: <CheckCircleIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back to Portfolio */}
          <Link
            href="/our-work"
            className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-secondary/90 rounded-full text-sm font-medium">
                    {projectData.category}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                    {projectData.status}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                  {projectData.title}
                </h1>
                {projectData.subtitle && (
                  <p className="text-xl text-secondary font-semibold mb-6">
                    {projectData.subtitle}
                  </p>
                )}
                <div className="text-lg text-white/80 leading-relaxed prose prose-invert max-w-none">
                  {isRichText ? (
                    <PortableText value={projectData.description} />
                  ) : (
                    <p>{projectData.description}</p>
                  )}
                </div>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <UserGroupIcon className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="text-sm text-white/60">Client</div>
                    <div className="font-semibold">{projectData.client}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="text-sm text-white/60">Year</div>
                    <div className="font-semibold">{projectData.year}</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {projectData.websiteUrl && projectData.websiteUrl !== "#" && (
                  <Button
                    asChild
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    <a
                      href={projectData.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Live Project
                      <ArrowUpRightIcon className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  Contact Us About This Project
                </Button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <Image
                  src={projectData.heroImage}
                  alt={projectData.title}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      {projectData.technologies.length > 0 && (
        <section className="py-12 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-6">
              <TagIcon className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold">Technologies Used</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {projectData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Secondary Image */}
      {work.secondaryImage && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              className="relative h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src={urlFor(work.secondaryImage).width(1400).height(600).url()}
                alt={`${work.name} - Additional view`}
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Key Features */}
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Discover the powerful features that make this project stand out
              and deliver exceptional value to our client.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {defaultFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-secondary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-secondary">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="bg-gradient-to-r from-black to-secondary/20 rounded-2xl p-8 md:p-12 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results with a
              custom solution tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-secondary hover:bg-secondary/90">
                Schedule a Consultation
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                asChild
              >
                <Link href="/our-work">View All Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
