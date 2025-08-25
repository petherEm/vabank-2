import AboutSection from "@/components/main/About";
import AnimatedSeparator from "@/components/main/AnimatedSeparator";
import Hero from "@/components/main/Hero3";
import OurProjects from "@/components/main/OurProjects";
import Services from "@/components/main/Services";
import TechStackSection from "@/components/main/TechStack";
import Testimonials from "@/components/testimonials";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vabank.dev",
  url: "https://vabank.dev",
  logo: "https://vabank.dev/vabanx-light.png",
  description:
    "From replatforming to AI-driven innovation, we craft modern digital solutions that move your business ahead of the curve. Expert full-stack development, automation, and analytics services.",
  founder: {
    "@type": "Person",
    name: "Vabank Development Team",
  },
  foundingDate: "2024",
  areaServed: "Worldwide",
  serviceType: [
    "Web Development",
    "AI Integration",
    "Full Stack Development",
    "Web Automation",
    "Digital Analytics",
    "Replatforming Services",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Full Stack Development",
    "Automation",
    "Analytics",
  ],
  sameAs: [
    "https://github.com/vabank-dev",
    "https://linkedin.com/company/vabank-dev",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="overflow-hidden">
        <Hero />
        <AnimatedSeparator />
        <Services />
        <AnimatedSeparator />
        <OurProjects />
        <AnimatedSeparator />
        <TechStackSection />
        <AnimatedSeparator />
        <AboutSection />
        <AnimatedSeparator />
        <Testimonials />
      </div>
    </>
  );
}
