"use client";
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
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transition: "background-position 0.3s ease",
          }}
        />
      </div>

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
                  We integrate modern, scalable, web solutions with deep
                  business insights to redefine the future of your
                  <span className="font-bold text-secondary"> business.</span>
                </p>
              </div>

              {/* CTA Buttons - Added secondary color bottom border */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white px-8 py-4 text-lg font-semibold group transition-colors border-b-2 border-secondary hover:bg-transparent"
                >
                  Let&apos;s Talk
                  <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white px-8 py-4 text-lg font-semibold group transition-colors border-b-2 border-secondary hover:bg-transparent"
                >
                  <CodeBracketIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Our work
                </Button>
              </div>

              {/* Tech Stack Indicators */}
              <div className="flex items-center space-x-8 text-white/40 pt-8">
                <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                  <CpuChipIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">AI/ML</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                  <CodeBracketIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Full-Stack</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                  <SparklesIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Innovation</span>
                </div>
              </div>
            </div>

            {/* Right Side - Interactive Pattern (extends to edge) */}
            <div className="hidden lg:block w-full lg:w-1/2 h-[50vh] lg:h-[80vh] mt-12 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
              {/* Animated Binary Matrix */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className={`absolute font-mono text-sm animate-pulse ${
                      i % 4 === 0 ? "text-white/40" : "text-white/40"
                    }`}
                    style={{
                      left: `${(i * 5) % 100}%`,
                      top: `${(i * 7) % 100}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${2 + (i % 3)}s`,
                      color: i % 4 === 0 ? "rgba(208, 56, 75, 0.6)" : undefined,
                    }}
                  >
                    {Math.random() > 0.5 ? "1" : "0"}
                  </div>
                ))}
              </div>

              {/* Central Interactive Element */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="w-80 h-80 relative">
                  {/* Rotating Rings */}
                  <div
                    className="absolute inset-0 border-2 rounded-full animate-spin"
                    style={{
                      animationDuration: "20s",
                      borderColor: "var(--color-secondary)",
                    }}
                  ></div>
                  <div
                    className="absolute inset-4 border border-white/60 rounded-full animate-spin"
                    style={{
                      animationDuration: "15s",
                      animationDirection: "reverse",
                    }}
                  ></div>
                  <div
                    className="absolute inset-8 border rounded-full animate-spin"
                    style={{
                      animationDuration: "10s",
                      borderColor: "var(--color-secondary)",
                    }}
                  ></div>

                  {/* Floating Code Blocks */}
                  {[
                    {
                      text: "AI",
                      top: "10%",
                      left: "20%",
                      delay: "0s",
                      isRed: true,
                    },
                    {
                      text: "ML",
                      top: "20%",
                      left: "22%",
                      delay: "0s",
                      isRed: false,
                    },
                    {
                      text: "MCP",
                      top: "30%",
                      left: "15%",
                      delay: "0s",
                      isRed: false,
                    },
                    {
                      text: "NEXTJS",
                      top: "20%",
                      right: "15%",
                      delay: "0.5s",
                      isRed: false,
                    },
                    {
                      text: "PYTHON",
                      bottom: "25%",
                      left: "10%",
                      delay: "1s",
                      isRed: false,
                    },

                    {
                      text: "JS",
                      top: "50%",
                      left: "5%",
                      delay: "2s",
                      isRed: false,
                    },
                    {
                      text: "NODE",
                      top: "35%",
                      right: "5%",
                      delay: "2.5s",
                      isRed: true,
                    },
                    {
                      text: "REACT",
                      top: "45%",
                      right: "5%",
                      delay: "2.5s",
                      isRed: true,
                    },
                    {
                      text: "ANALYTICS",
                      top: "75%",
                      right: "5%",
                      delay: "2.5s",
                      isRed: true,
                    },
                    {
                      text: "DATA",
                      top: "85%",
                      right: "10%",
                      delay: "2.5s",
                      isRed: true,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`absolute text-white px-3 py-1 rounded text-xs font-mono animate-bounce hover:scale-110 transition-transform cursor-pointer ${
                        item.isRed ? "" : "bg-black text-white"
                      }`}
                      style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        bottom: item.bottom,
                        animationDelay: item.delay,
                        animationDuration: "3s",
                        backgroundColor: item.isRed
                          ? "var(--color-secondary)"
                          : undefined,
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-12 grid-rows-12 h-full w-full gap-1">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm animate-pulse ${i % 7 === 0 ? "" : "bg-white"}`}
                      style={{
                        animationDelay: `${(i * 0.05) % 3}s`,
                        animationDuration: "2s",
                        backgroundColor:
                          i % 7 === 0 ? "var(--color-secondary)" : undefined,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Geometric Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent"></div>
    </div>
  );
}
