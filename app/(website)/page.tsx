import AboutSection from "@/components/main/About";
import AnimatedSeparator from "@/components/main/AnimatedSeparator";
import Hero from "@/components/main/Hero3";
import OurProjects from "@/components/main/OurProjects";
import Services from "@/components/main/Services";
import TechStackSection from "@/components/main/TechStack";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
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
  );
}
