"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronRightIcon,
  CodeBracketIcon,
  ServerIcon,
  CpuChipIcon,
} from "@heroicons/react/16/solid";
import { motion, AnimatePresence } from "framer-motion";
import type { JSX } from "react/jsx-runtime";

type TechCategory = "frontend" | "ai" | "infrastructure";

type TechStack = {
  name: string;
  description: string;
  logo: string;
  category: TechCategory;
  url: string;
};

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] =
    useState<TechCategory>("frontend");
  const [showAll, setShowAll] = useState(false);

  const techStack: TechStack[] = [
    {
      name: "Next.js",
      description:
        "Our primary framework for building fast, SEO-friendly React applications with server-side rendering and static site generation capabilities.",
      logo: "/tech-logos/nextjs.png",
      category: "frontend",
      url: "https://nextjs.org",
    },
    {
      name: "React",
      description:
        "The foundation of our frontend development, enabling us to build reusable UI components and maintain a consistent user experience.",
      logo: "/tech-logos/react.png",
      category: "frontend",
      url: "https://reactjs.org",
    },
    {
      name: "OpenAI",
      description:
        "We leverage OpenAI's powerful models like GPT-4 to build intelligent features including content generation, summarization, and natural language processing.",
      logo: "/tech-logos/openai.png",
      category: "ai",
      url: "https://openai.com",
    },
    {
      name: "Anthropic",
      description:
        "Claude models provide our applications with advanced reasoning capabilities, helping us create more nuanced and contextually aware AI features.",
      logo: "/tech-logos/anthropic.png",
      category: "ai",
      url: "https://anthropic.com",
    },
    {
      name: "Inngest",
      description:
        "A reliable background job and workflow orchestration platform that enables us to build durable, event-driven AI workflows with automatic retries and observability.",
      logo: "/tech-logos/inngest.png",
      category: "ai",
      url: "https://inngest.com",
    },
    {
      name: "n8n",
      description:
        "An open-source workflow automation platform that connects AI services, APIs, and databases to create powerful, no-code automation pipelines.",
      logo: "/tech-logos/n8n.png",
      category: "ai",
      url: "https://n8n.io",
    },
    {
      name: "Sanity.io",
      description:
        "Our preferred headless CMS that gives content teams the flexibility they need while providing developers with a robust API and customizable content models.",
      logo: "/tech-logos/sanity.png",
      category: "infrastructure",
      url: "https://sanity.io",
    },
    {
      name: "Medusa.js",
      description:
        "An open-source commerce engine that powers our e-commerce solutions with customizable shopping experiences and flexible architecture.",
      logo: "/tech-logos/medusajs.png",
      category: "infrastructure",
      url: "https://medusajs.com",
    },
    {
      name: "Convex",
      description:
        "A backend platform that simplifies our real-time applications with automatic syncing, global distribution, and built-in authorization.",
      logo: "/tech-logos/convex.png",
      category: "infrastructure",
      url: "https://convex.dev",
    },
    {
      name: "Vercel",
      description:
        "Our deployment platform of choice, providing global edge network, serverless functions, and seamless integration with our development workflow.",
      logo: "/tech-logos/vercel.png",
      category: "infrastructure",
      url: "https://vercel.com",
    },
    {
      name: "Neon",
      description:
        "A serverless PostgreSQL database that provides instant branching, autoscaling, and built-in connection pooling for modern applications.",
      logo: "/tech-logos/neon.png",
      category: "infrastructure",
      url: "https://neon.tech",
    },
    {
      name: "Supabase",
      description:
        "An open-source Firebase alternative that provides instant APIs, real-time subscriptions, authentication, and storage with PostgreSQL.",
      logo: "/tech-logos/supabase.png",
      category: "infrastructure",
      url: "https://supabase.com",
    },
    {
      name: "Firebase",
      description:
        "Google's comprehensive app development platform offering real-time database, authentication, hosting, and cloud functions.",
      logo: "/tech-logos/firebase.png",
      category: "infrastructure",
      url: "https://firebase.google.com",
    },
  ];

  const categories: { id: TechCategory; name: string; icon: JSX.Element }[] = [
    {
      id: "frontend",
      name: "Frontend",
      icon: <CodeBracketIcon className="w-5 h-5" />,
    },
    {
      id: "ai",
      name: "AI & ML",
      icon: <CpuChipIcon className="w-5 h-5" />,
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: <ServerIcon className="w-5 h-5" />,
    },
  ];

  const filteredTech = techStack.filter(
    (tech) => tech.category === activeCategory
  );

  // Show limited items initially for better space management
  const initialItemCount = 4;
  const hasMoreItems = filteredTech.length > initialItemCount;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
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
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  return (
    <section
      className="relative bg-black text-white py-24 overflow-hidden"
      id="tech-stack"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 overflow-hidden">
          {/* Circuit Board Pattern */}
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="circuit"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="50"
                  x2="100"
                  y2="50"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.5"
                />
                <line
                  x1="50"
                  y1="0"
                  x2="50"
                  y2="100"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.5"
                />
                <circle cx="50" cy="50" r="2" fill="rgba(208, 56, 75, 0.5)" />
                <circle cx="0" cy="50" r="1" fill="rgba(255,255,255,0.3)" />
                <circle cx="100" cy="50" r="1" fill="rgba(255,255,255,0.3)" />
                <circle cx="50" cy="0" r="1" fill="rgba(255,255,255,0.3)" />
                <circle cx="50" cy="100" r="1" fill="rgba(255,255,255,0.3)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Two-column layout - reordered for mobile-first */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Right column - Title and intro (appears first on mobile) */}
          <div className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start lg:order-2">
            <motion.div
              className="text-left lg:pl-8 lg:border-l border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                OUR <span className="text-secondary">STACK</span>
              </motion.h2>
              <motion.p
                className="text-xl text-white/70 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                We harness the latest frameworks and AI-powered tools to build
                scalable, secure, and intelligent digital solutions.
              </motion.p>

              <motion.p
                className="text-white/60"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Our technology stack is carefully curated for performance and
                adaptability, ensuring every product is future-proof and
                tailored to each client’s needs. By continuously adopting
                emerging technologies, we keep your business ahead of the
                digital curve.
              </motion.p>

              {/* Decorative element */}
              <motion.div
                className="mt-8 h-1 w-24 bg-secondary"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 96, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              {/* Category Info */}
              <motion.div
                className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {categories.find((c) => c.id === activeCategory)?.icon}
                  <span className="font-semibold">
                    {categories.find((c) => c.id === activeCategory)?.name}
                  </span>
                </div>
                <div className="text-sm text-white/60">
                  {filteredTech.length}{" "}
                  {filteredTech.length === 1 ? "technology" : "technologies"}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Left column - Categories and tech cards (appears second on mobile) */}
          <div className="lg:w-3/5 lg:order-1">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                    activeCategory === category.id
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.icon}
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Tech Stack Grid with Better Layout */}
            <div className="min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* First 4 items in 2x2 grid */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    {filteredTech.slice(0, initialItemCount).map((tech) => (
                      <motion.div
                        key={tech.name}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-secondary/50 transition-all group"
                        variants={itemVariants}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-20 h-20 relative flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
                            <Image
                              src={tech.logo || "/placeholder.svg"}
                              alt={tech.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="text-lg font-bold">{tech.name}</h3>
                        </div>
                        <p className="text-white/70 text-sm mb-4 line-clamp-4">
                          {tech.description}
                        </p>
                        <a
                          href={tech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-secondary group-hover:underline"
                        >
                          Learn more
                          <ChevronRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </motion.div>
                    ))}
                  </div>

                  {/* Remaining items in a more compact row layout */}
                  {showAll && filteredTech.length > initialItemCount && (
                    <motion.div
                      className="grid sm:grid-cols-3 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {filteredTech.slice(initialItemCount).map((tech) => (
                        <motion.div
                          key={tech.name}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-secondary/50 transition-all group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-20 h-20 relative flex-shrink-0  rounded-lg overflow-hidden flex items-center justify-center">
                              <Image
                                src={tech.logo || "/placeholder.svg"}
                                alt={tech.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h3 className="text-lg font-bold">{tech.name}</h3>
                          </div>
                          <p className="text-white/70 text-sm mb-3 line-clamp-4">
                            {tech.description}
                          </p>
                          <a
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-secondary group-hover:underline"
                          >
                            Learn more
                            <ChevronRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Load More Button */}
                  {hasMoreItems && !showAll && (
                    <motion.div
                      className="text-center pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-secondary/50 rounded-full transition-all text-sm font-medium"
                      >
                        Show {filteredTech.length - initialItemCount} More
                        Technologies
                        <ChevronRightIcon className="w-4 h-4 ml-2 inline" />
                      </button>
                    </motion.div>
                  )}

                  {/* Show Less Button */}
                  {showAll && hasMoreItems && (
                    <motion.div
                      className="text-center pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <button
                        onClick={() => setShowAll(false)}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-secondary/50 rounded-full transition-all text-sm font-medium"
                      >
                        Show Less
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
