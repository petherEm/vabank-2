import OurWorkPage from "@/components/our-work/OurWorkAll";
import TechPracticesSection from "@/components/our-work/TechPractice";

export const metadata = {
  title: "Our Work | Vabank",
  description:
    "Explore our portfolio of web development, AI, automation, and analytics projects.",
};

export default function OurWork() {
  return (
    <>
      <OurWorkPage />
      <TechPracticesSection />
    </>
  );
}
