"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ClockIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

// Blog post type definition based on Sanity schema
type BlogPost = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: {
    name: string;
    _id: string;
  };
  mainImage: {
    asset: any;
    alt?: string;
  };
  categories: string[];
  publishedAt: string;
  isFeatured: boolean;
  readingTime: number;
  body: any;
};

// Blog categories
const blogCategories = [
  { id: "all", name: "All Articles" },
  { id: "Web Development", name: "Web Development" },
  { id: "AI & Machine Learning", name: "AI & Machine Learning" },
  { id: "Technology", name: "Technology" },
  { id: "Business", name: "Business" },
  { id: "Tutorials", name: "Tutorials" },
];

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  // State for filtering and search
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(6);

  // Filter blog posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" ||
      post.categories?.some((category) => category === activeCategory);
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.categories?.some((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Get featured posts
  const featuredPosts = posts.filter((post) => post.isFeatured);

  // Load more posts
  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, filteredPosts.length));
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Generate excerpt from body (simplified)
  const generateExcerpt = (body: any, maxLength = 150) => {
    if (!body || !body[0]) return "";
    const text = body[0].children?.[0]?.text || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
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
              OUR <span className="text-secondary">BLOG</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Insights, tutorials, and thought leadership on web development, AI
              integration, and digital transformation from our team of experts.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 pl-12 text-white placeholder:text-white/50 focus:outline-none focus:border-secondary"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !searchQuery && activeCategory === "all" && (
        <section className="py-12 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-12">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug.current}`}
                  key={post._id}
                  className="group"
                >
                  <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/30 transition-all h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={
                          post.mainImage
                            ? urlFor(post.mainImage.asset).url()
                            : "/placeholder.svg"
                        }
                        alt={post.mainImage?.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                      {post.categories && post.categories[0] && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 rounded-full text-xs font-medium">
                          {post.categories[0]}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-secondary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/70 mb-4 flex-grow">
                        {generateExcerpt(post.body)}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium">
                              {post.author.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {post.author.name}
                            </p>
                            <p className="text-xs text-white/50">
                              {formatDate(post.publishedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-white/50 text-xs">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {post.readingTime} min read
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-start gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-secondary text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPosts.slice(0, visiblePosts).map((post) => (
                  <motion.div key={post._id} variants={itemVariants}>
                    <Link href={`/blog/${post.slug.current}`} className="group">
                      <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/30 transition-all h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={
                              post.mainImage
                                ? urlFor(post.mainImage.asset).url()
                                : "/placeholder.svg"
                            }
                            alt={post.mainImage?.alt || post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                          {post.categories && post.categories[0] && (
                            <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 rounded-full text-xs font-medium">
                              {post.categories[0]}
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">
                            {generateExcerpt(post.body)}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center mr-2">
                                <span className="text-xs font-medium">
                                  {post.author.name.charAt(0)}
                                </span>
                              </div>
                              <p className="text-xs font-medium">
                                {post.author.name}
                              </p>
                            </div>
                            <div className="flex items-center text-white/50 text-xs">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {post.readingTime} min read
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {visiblePosts < filteredPosts.length && (
                <div className="mt-12 text-center">
                  <Button
                    onClick={loadMorePosts}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                  >
                    Load More Articles
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-24 text-center">
              <div className="inline-block p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-4">No articles found</h3>
                <p className="text-white/70 mb-6">
                  We couldn't find any articles matching your search criteria.
                  Try adjusting your filters or search query.
                </p>
                <Button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  View All Articles
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-black to-secondary/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest insights,
              tutorials, and updates on web development, AI, and digital
              transformation.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-secondary"
                  required
                />
                <Button className="bg-secondary hover:bg-secondary/90 text-white px-6 whitespace-nowrap">
                  Subscribe
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-white/50 text-xs mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
