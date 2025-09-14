import OurWorkPage from "@/components/our-work/OurWorkAll";
import TechPracticesSection from "@/components/our-work/TechPractice";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Vabank.dev - Web Development Portfolio",
  description:
    "Explore our portfolio of cutting-edge web development, AI integration, automation, and digital transformation projects. See how we help businesses innovate.",
  keywords: [
    "web development portfolio",
    "AI integration projects",
    "digital transformation case studies",
    "modern web applications",
    "full-stack development",
    "React projects",
    "Next.js applications",
    "custom web solutions"
  ],
  authors: [{ name: "Vabank Development Team" }],
  creator: "Vabank.dev",
  publisher: "Vabank.dev",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vabank.dev/our-work",
    siteName: "Vabank.dev",
    title: "Our Work | Vabank.dev - Web Development Portfolio",
    description: "Explore our portfolio of cutting-edge web development, AI integration, automation, and digital transformation projects.",
    images: [{
      url: "https://vabank.dev/vabank-light.png",
      width: 1200,
      height: 630,
      alt: "Vabank.dev Portfolio - Web Development Projects",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Vabank.dev - Web Development Portfolio",
    description: "Explore our portfolio of cutting-edge web development, AI integration, and digital transformation projects.",
    images: ["https://vabank.dev/vabank-light.png"],
    creator: "@vabank_dev",
  },
  alternates: {
    canonical: "https://vabank.dev/our-work",
  },
  category: "Technology",
};

export default function OurWork() {
  return (
    <>
      <OurWorkPage />
      <TechPracticesSection />
    </>
  );
}
