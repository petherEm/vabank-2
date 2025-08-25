"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  CodeBracketIcon,
  CpuChipIcon,
  SparklesIcon,
} from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const codeSnippets = [
    "const ai = new Intelligence()",
    "deploy.optimize()",
    "scale.infinitely()",
    "performance.maximize()",
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transition: "background-position 0.3s ease",
          }}
        />
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSnippets.map((code, index) => (
          <div
            key={index}
            className="absolute text-xs font-mono text-black/20 animate-pulse"
            style={{
              top: `${20 + index * 20}%`,
              left: `${10 + index * 15}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            {code}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Image
              src="/vabank-dark.png"
              alt="vabank Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-black hover:text-gray-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#work"
              className="text-black hover:text-gray-600 transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              className="text-black hover:text-gray-600 transition-colors"
            >
              About
            </a>
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white"
            >
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Side - Interactive Pattern */}
            <div className="relative h-full flex items-center justify-center">
              {/* Animated Binary Matrix */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-black/20 font-mono text-sm animate-pulse"
                    style={{
                      left: `${(i * 5) % 100}%`,
                      top: `${(i * 7) % 100}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${2 + (i % 3)}s`,
                    }}
                  >
                    {Math.random() > 0.5 ? "1" : "0"}
                  </div>
                ))}
              </div>

              {/* Central Interactive Element */}
              <div className="relative z-10">
                <div className="w-80 h-80 relative">
                  {/* Rotating Rings */}
                  <div
                    className="absolute inset-0 border-2 border-black/20 rounded-full animate-spin"
                    style={{ animationDuration: "20s" }}
                  ></div>
                  <div
                    className="absolute inset-4 border border-black/30 rounded-full animate-spin"
                    style={{
                      animationDuration: "15s",
                      animationDirection: "reverse",
                    }}
                  ></div>
                  <div
                    className="absolute inset-8 border border-black/40 rounded-full animate-spin"
                    style={{ animationDuration: "10s" }}
                  ></div>

                  {/* Center Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
                      <span className="text-white font-bold text-2xl">V</span>
                    </div>
                  </div>

                  {/* Floating Code Blocks */}
                  {[
                    { text: "AI", top: "10%", left: "20%", delay: "0s" },
                    { text: "ML", top: "20%", right: "15%", delay: "0.5s" },
                    { text: "API", bottom: "25%", left: "10%", delay: "1s" },
                    {
                      text: "UI/UX",
                      bottom: "15%",
                      right: "20%",
                      delay: "1.5s",
                    },
                    { text: "REACT", top: "40%", left: "5%", delay: "2s" },
                    { text: "NODE", top: "35%", right: "5%", delay: "2.5s" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="absolute bg-black text-white px-3 py-1 rounded text-xs font-mono animate-bounce hover:scale-110 transition-transform cursor-pointer"
                      style={{
                        ...item,
                        animationDelay: item.delay,
                        animationDuration: "3s",
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 grid-rows-12 h-full w-full gap-1">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-black rounded-sm animate-pulse"
                      style={{
                        animationDelay: `${(i * 0.05) % 3}s`,
                        animationDuration: "2s",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              {/* Announcement Banner */}
              <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
                <SparklesIcon className="w-4 h-4" />
                New: AI-Powered Development Stack
                <ChevronRightIcon className="w-4 h-4" />
              </div>

              {/* Main Heading with Typewriter Effect */}
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-none tracking-tight">
                  <TypewriterText
                    texts={["WE BUILD", "WE CREATE", "WE INNOVATE"]}
                    className="block"
                  />
                  <span className="block mt-2">THE FUTURE</span>
                </h1>
              </div>

              {/* Subtitle */}
              <div>
                <p className="text-xl md:text-2xl text-black/80 leading-relaxed max-w-2xl">
                  AI-powered web development agency that transforms ideas into
                  <span className="font-bold text-black">
                    {" "}
                    intelligent digital experiences
                  </span>
                </p>
              </div>

              {/* Interactive Stats */}
              <div className="grid grid-cols-3 gap-8 py-8">
                <div className="text-left group cursor-pointer">
                  <div className="text-3xl md:text-4xl font-black text-black group-hover:scale-110 transition-transform">
                    100+
                  </div>
                  <div className="text-sm text-black/60 uppercase tracking-wide">
                    Projects
                  </div>
                </div>
                <div className="text-left group cursor-pointer">
                  <div className="text-3xl md:text-4xl font-black text-black group-hover:scale-110 transition-transform">
                    50+
                  </div>
                  <div className="text-sm text-black/60 uppercase tracking-wide">
                    Clients
                  </div>
                </div>
                <div className="text-left group cursor-pointer">
                  <div className="text-3xl md:text-4xl font-black text-black group-hover:scale-110 transition-transform">
                    24/7
                  </div>
                  <div className="text-sm text-black/60 uppercase tracking-wide">
                    Support
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold group"
                >
                  Start Your Project
                  <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold group"
                >
                  <CodeBracketIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View Our Work
                </Button>
              </div>

              {/* Tech Stack Indicators */}
              <div className="flex items-center space-x-8 text-black/40 pt-8">
                <div className="flex items-center space-x-2 hover:text-black transition-colors cursor-pointer">
                  <CpuChipIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">AI/ML</span>
                </div>
                <div className="w-px h-6 bg-black/20"></div>
                <div className="flex items-center space-x-2 hover:text-black transition-colors cursor-pointer">
                  <CodeBracketIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Full-Stack</span>
                </div>
                <div className="w-px h-6 bg-black/20"></div>
                <div className="flex items-center space-x-2 hover:text-black transition-colors cursor-pointer">
                  <SparklesIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Geometric Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/5 to-transparent"></div>
    </div>
  );
}
