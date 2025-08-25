import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Space_Grotesk,
  Outfit,
  Inter,
} from "next/font/google";
import "./../globals.css";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import VisualEditing from "@/components/visual-editing";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vabank.dev | Modern Web Development & Digital Solutions",
  description:
    "From replatforming to AI-driven innovation, we craft modern digital solutions that move your business ahead of the curve. Expert full-stack development, automation, and analytics services.",
  keywords: [
    "AI web development",
    "full stack development",
    "web automation",
    "digital transformation",
    "modern web solutions",
    "AI-driven development",
    "web analytics",
    "replatforming",
    "custom web applications",
    "digital innovation",
    "React development",
    "Next.js development",
    "TypeScript development",
    "web development agency",
    "business automation",
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
    url: "https://vabank.dev",
    siteName: "Vabank.dev",
    title: "Vabank.dev | AI-Powered Web Development & Digital Solutions",
    description:
      "From replatforming to AI-driven innovation, we craft modern digital solutions that move your business ahead of the curve. Expert full-stack development, automation, and analytics services.",
    images: [
      {
        url: "/vabank-light.png",
        width: 1200,
        height: 630,
        alt: "Vabank.dev - AI-Powered Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vabank.dev | AI-Powered Web Development & Digital Solutions",
    description:
      "From replatforming to AI-driven innovation, we craft modern digital solutions that move your business ahead of the curve.",
    images: ["/vabanx-light.png"],
    creator: "@vabank_dev",
  },
  alternates: {
    canonical: "https://vabank.dev",
  },
  category: "Technology",
  classification: "Web Development Services",
  applicationName: "Vabank.dev",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geist.variable} ${outfit.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Navbar />
        {children}
        <Footer />
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
