"use client";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  CodeBracketIcon,
  CpuChipIcon,
  SparklesIcon,
  ChartBarIcon,
} from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import HeroBgPattern from "./HeroBgPattern";
import { Workflow } from "lucide-react";

// Typewriter Effect Component
function TypewriterText({
  texts,
  className,
}: {
  texts: string[];
  className?: string;
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex];

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }

        if (!isDeleting && currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const codeSnippets = [
    "const ai = new Intelligence()",
    "deploy.optimize()",
    "scale.infinitely()",
    "performance.maximize()",
  ];

  // Function to scroll to services section and trigger specific service
  const handleTechStackClick = (serviceId: string) => {
    // First scroll to the services section
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // After a short delay to allow scrolling, trigger the service selection
      setTimeout(() => {
        // Dispatch a custom event to communicate with the Services component
        const event = new CustomEvent("selectService", {
          detail: { serviceId },
        });
        window.dispatchEvent(event);
      }, 800);
    }
  };

  return (
    <div className="relative bg-black overflow-hidden mb-24">
      {/* Floating Code Elements - Moved to right side */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {codeSnippets.map((code, index) => (
          <div
            key={index}
            className="absolute text-xs font-mono text-white/70 animate-pulse"
            style={{
              top: `${20 + index * 20}%`,
              right: `${10 + index * 5}%`, // Changed from left to right
              animationDelay: `${index * 0.5}s`,
            }}
          >
            {code}
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Content (aligned with navbar) */}
            <div className="w-full lg:w-1/2 px-4 sm:px-6 space-y-8">
              {/* Main Heading with Typewriter Effect */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                  <TypewriterText
                    texts={["PASSION", "EXPERIENCE", "INNOVATION"]}
                    className="block"
                  />
                  <span className="block mt-2 text-secondary">DRIVEN</span>
                  <span className="block mt-2">EXCELLENCE</span>
                </h1>
              </div>

              {/* Subtitle */}
              <div>
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
                  From replatforming to AI-driven innovation, we craft modern
                  digital solutions that move your{" "}
                  <span className="font-bold text-secondary">business</span>{" "}
                  ahead of the curve.
                </p>
              </div>

              {/* CTA Buttons - Added secondary color bottom border */}
              <div className="flex flex-row gap-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white px-4 sm:px-8 py-4 text-base sm:text-lg font-semibold group transition-colors border-b-2 border-secondary hover:bg-transparent hover:text-secondary"
                  asChild
                >
                  <a href="#footer">
                    Let&apos;s Talk
                    <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  variant="link"
                  size="lg"
                  className="text-white px-4 sm:px-8 py-4 text-base sm:text-lg font-semibold group transition-colors hover:text-secondary"
                  asChild
                >
                  <a href="#work">
                    <CodeBracketIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:rotate-12 transition-transform " />
                    Our works
                  </a>
                </Button>
              </div>

              {/* Tech Stack Indicators - Made clickable */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 text-white/40 pt-8">
                <button
                  onClick={() => handleTechStackClick("ai")}
                  className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <CpuChipIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-secondary transition-colors" />
                  <span className="text-xs sm:text-sm font-medium">AI/ML</span>
                </button>
                <div className="hidden sm:block w-px h-4 sm:h-6 bg-white/20"></div>
                <button
                  onClick={() => handleTechStackClick("web")}
                  className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <CodeBracketIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-secondary transition-colors" />
                  <span className="text-xs sm:text-sm font-medium">
                    Full-Stack
                  </span>
                </button>
                <div className="hidden sm:block w-px h-4 sm:h-6 bg-white/20"></div>
                <button
                  onClick={() => handleTechStackClick("automation")}
                  className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <Workflow className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-secondary transition-colors" />
                  <span className="text-xs sm:text-sm font-medium">
                    Automations
                  </span>
                </button>
                <div className="hidden sm:block w-px h-4 sm:h-6 bg-white/20"></div>
                <button
                  onClick={() => handleTechStackClick("analytics")}
                  className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-secondary transition-colors" />
                  <span className="text-xs sm:text-sm font-medium">
                    Analytics
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Interactive Pattern (extends to edge) */}
            <div className="hidden lg:block w-full lg:w-1/2 h-[50vh] lg:h-[80vh] mt-12 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
              <HeroBgPattern />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
