"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ClockIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowLeftIcon,
} from "@heroicons/react/16/solid";
import {
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
  CopyIcon,
  CheckIcon,
  GithubIcon,
} from "lucide-react";
import { TagIcon } from "@heroicons/react/24/solid";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { Post, Category, Author } from "@/sanity.types";

interface BlogArticlePageProps {
  post: Post;
  author: Author;
}

// Blog categories
const blogCategories = [
  { id: "all", name: "All Articles" },
  { id: "web-dev", name: "Web Development" },
  { id: "ai", name: "AI & Machine Learning" },
  { id: "tech", name: "Technology" },
  { id: "business", name: "Business" },
  { id: "tutorials", name: "Tutorials" },
];

// Add a CodeBlock component with copy functionality
const CodeBlock = ({ value }: { value: any }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="my-8">
      {value.filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono border-b border-gray-700 rounded-t-lg flex items-center justify-between">
          <span className="flex items-center">
            <span className="text-secondary mr-2">📄</span>
            {value.filename}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <CheckIcon className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <CopyIcon className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language={value.language || "javascript"}
          style={oneDark}
          customStyle={{
            margin: 0,
            borderRadius: value.filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
            fontSize: "0.875rem",
            paddingRight: "3rem",
          }}
          showLineNumbers
        >
          {value.code}
        </SyntaxHighlighter>
        {!value.filename && (
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
              {value.language || "code"}
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors text-gray-300"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// PortableText components for rendering Sanity content
const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div key={value._key} className="my-8">
        <Image
          src={urlFor(value.asset).url()}
          alt={value.alt || ""}
          width={800}
          height={400}
          className="rounded-xl"
        />
      </div>
    ),
    code: CodeBlock,
  },
  block: {
    h2: ({ children, value }: { children: any; value: any }) => {
      const text = children?.[0] || "";
      const id = text
        .toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h2 key={value._key} id={id} className="text-2xl font-bold mt-8 mb-4">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: { children: any; value: any }) => (
      <h3 key={value._key} className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children, value }: { children: any; value: any }) => (
      <h4 key={value._key} className="text-lg font-semibold mt-5 mb-2">{children}</h4>
    ),
    normal: ({ children, value }: { children: any; value: any }) => (
      <p key={value._key} className="mb-4 text-white/80 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children, value }: { children: any; value: any }) => (
      <blockquote key={value._key} className="border-l-4 border-secondary pl-6 py-4 my-6 bg-white/5 rounded-r-lg italic text-white/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children, value }: { children: any; value: any }) => (
      <ul key={value._key} className="mb-6 pl-6 space-y-2 list-disc marker:text-secondary">
        {children}
      </ul>
    ),
    number: ({ children, value }: { children: any; value: any }) => (
      <ol key={value._key} className="mb-6 pl-6 space-y-2 list-decimal marker:text-secondary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children, value }: { children: any; value: any }) => (
      <li key={value._key} className="text-white/80 leading-relaxed pl-1">{children}</li>
    ),
    number: ({ children, value }: { children: any; value: any }) => (
      <li key={value._key} className="text-white/80 leading-relaxed pl-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children: any }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: { children: any }) => (
      <em className="italic text-white/90">{children}</em>
    ),
    code: ({ children }: { children: any }) => (
      <code className="bg-white/10 text-secondary px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: { children: any; value: any }) => (
      <a
        href={value.href}
        className="text-secondary hover:underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default function BlogArticlePage({ post }: BlogArticlePageProps) {
  const [activeHeading, setActiveHeading] = useState("");
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [copied, setCopied] = useState(false);

  // Generate excerpt from body (simplified)
  const generateExcerpt = (body: any, maxLength = 150) => {
    if (!body || !body[0]) return "";
    const text = body[0].children?.[0]?.text || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Generate structured data for the blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: generateExcerpt(post.body, 160),
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.linkedin && { sameAs: [post.author.linkedin] }),
      ...(post.author.github && { sameAs: post.author.linkedin ? [post.author.linkedin, post.author.github] : [post.author.github] }),
      ...(post.author.title && { jobTitle: post.author.title }),
    },
    publisher: {
      "@type": "Organization",
      name: "Vabank.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://vabank.dev/vabank-light.png",
        width: 400,
        height: 400,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vabank.dev/blog/${post.slug.current}`,
    },
    url: `https://vabank.dev/blog/${post.slug.current}`,
    ...(post.mainImage && {
      image: {
        "@type": "ImageObject",
        url: urlFor(post.mainImage.asset).width(1200).height(630).format('webp').url(),
        width: 1200,
        height: 630,
        alt: post.mainImage.alt || post.title,
      },
    }),
    ...(post.categories && post.categories.length > 0 && {
      about: post.categories.map((category) => ({
        "@type": "Thing",
        name: category,
      })),
    }),
    wordCount: post.body ? post.body.reduce((count, block) => {
      if (block._type === 'block' && block.children) {
        return count + block.children.reduce((blockCount, child) => {
          return blockCount + (child.text?.split(' ').length || 0);
        }, 0);
      }
      return count;
    }, 0) : 0,
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
    inLanguage: "en-US",
    isAccessibleForFree: true,
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

  // Extract headings from content for table of contents
  useEffect(() => {
    if (typeof document !== "undefined") {
      const articleContent = document.getElementById("article-content");
      if (articleContent) {
        const headingElements = articleContent.querySelectorAll("h2");
        const extractedHeadings = Array.from(headingElements).map(
          (heading) => ({
            id: heading.id,
            text: heading.textContent || "",
          })
        );
        setHeadings(extractedHeadings);
      }
    }
  }, [post.body]);

  // Handle scroll to update active heading in table of contents
  useEffect(() => {
    const handleScroll = () => {
      if (typeof document !== "undefined") {
        const headingElements = document.querySelectorAll("h2");
        const scrollPosition = window.scrollY + 200;

        for (let i = headingElements.length - 1; i >= 0; i--) {
          const heading = headingElements[i];
          if (heading.offsetTop <= scrollPosition) {
            setActiveHeading(heading.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle share link copy
  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get cover image URL
  const coverImageUrl = post.mainImage
    ? urlFor(post.mainImage.asset).width(1200).height(600).url()
    : "/placeholder.svg?height=600&width=1200";

  // Helper function to get category titles
  const getCategoryTitles = (categories?: Category[]) => {
    return categories?.map((category) => category.title) || [];
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-black text-white">
      {/* Article Header */}
      <section className="relative pt-24 pb-16 overflow-hidden">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>


          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden relative mr-3 bg-secondary/20">
                {post.author.image ? (
                  <Image
                    src={urlFor(post.author.image.asset).width(80).height(80).url()}
                    alt={post.author.image.alt || post.author.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-white/50">{post.author.title || "Author"}</p>
              </div>
            </div>
            <div className="flex items-center text-white/70">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center text-white/70">
              <ClockIcon className="w-4 h-4 mr-2" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={coverImageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Share and Tags */}
          <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {getCategoryTitles(post.categories).map(
                (categoryTitle, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm font-medium text-white/70 flex items-center"
                  >
                    <TagIcon className="w-3 h-3 mr-1" />
                    {categoryTitle}
                  </span>
                )
              )}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Copy link"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Share on Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Share on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block py-1 border-l-2 pl-3 hover:text-secondary transition-colors ${
                        activeHeading === heading.id
                          ? "border-secondary text-secondary"
                          : "border-white/20 text-white/70"
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:max-w-3xl">
              <article
                id="article-content"
                className="prose prose-invert prose-lg max-w-none"
              >
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </article>

              {/* Author Bio */}
              <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0 bg-secondary/20">
                    {post.author.image ? (
                      <Image
                        src={urlFor(post.author.image.asset).width(128).height(128).url()}
                        alt={post.author.image.alt || post.author.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-1">
                      About {post.author.name}
                    </h3>
                    {post.author.title && (
                      <p className="text-secondary text-sm font-medium mb-3">
                        {post.author.title}
                      </p>
                    )}
                    <div className="text-white/70 mb-4">
                      {post.author.bio && post.author.bio.length > 0 ? (
                        <PortableText
                          value={post.author.bio}
                          components={{
                            block: {
                              normal: ({ children, value }: { children: any; value: any }) => (
                                <p key={value._key} className="mb-2">{children}</p>
                              ),
                            },
                          }}
                        />
                      ) : (
                        <p>
                          {post.author.name} is a content creator and developer
                          passionate about sharing knowledge and insights.
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {post.author.linkedin && (
                        <a
                          href={post.author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 rounded-full hover:bg-secondary/20 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {post.author.github && (
                        <a
                          href={post.author.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 rounded-full hover:bg-secondary/20 transition-colors"
                          aria-label="GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next/Previous Navigation */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <Button
              variant="outline"
              className="flex items-center border-white/20 text-white hover:bg-white/5"
              asChild
            >
              <Link href="/blog">
                <ChevronLeftIcon className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex items-center border-white/20 text-white hover:bg-white/5"
              asChild
            >
              <Link href="/blog">
                All Articles
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
