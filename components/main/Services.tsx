"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Code2Icon,
  BrainCircuitIcon,
  GaugeCircleIcon,
  BarChart4Icon,
  CheckCircle2Icon,
  ArrowRightIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  cta: string;
};

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>("web");

  // Listen for service selection events from Hero component
  useEffect(() => {
    const handleSelectService = (event: CustomEvent) => {
      const { serviceId } = event.detail;
      setActiveService(serviceId);
    };

    window.addEventListener(
      "selectService",
      handleSelectService as EventListener
    );

    return () => {
      window.removeEventListener(
        "selectService",
        handleSelectService as EventListener
      );
    };
  }, []);

  const services: Service[] = [
    {
      id: "web",
      title: "Modern Web Development",
      description:
        "Cutting-edge web applications built with Next.js, React, and other modern frameworks—enhanced with AI-driven personalization and automation to deliver exceptional user experiences and performance.",
      icon: <Code2Icon className="w-8 h-8" />,
      features: [
        "Server-side rendering for optimal performance",
        "Responsive designs that work on all devices",
        "Progressive Web App capabilities",
        "Seamless API integrations",
        "Optimized for search engines",
      ],
      cta: "Explore Web Solutions",
    },
    {
      id: "ai",
      title: "AI Agent Setup",
      description:
        "Custom AI agents and assistants powered by OpenAI and Anthropic—built to automate workflows, elevate customer experiences, and deliver real-time, intelligent insights.",
      icon: <BrainCircuitIcon className="w-8 h-8" />,
      features: [
        "Custom GPT and Claude model integration",
        "Domain-specific knowledge training",
        "Multi-modal capabilities (text, image, audio)",
        "Seamless platform integration",
        "Continuous learning and improvement",
      ],
      cta: "Discover AI Capabilities",
    },
    {
      id: "automation",
      title: "Automations",
      description:
        "Streamline your operations with intelligent automation solutions that eliminate manual work, reduce errors, and unlock new levels of efficiency and scalability.",
      icon: <GaugeCircleIcon className="w-8 h-8" />,
      features: [
        "Workflow automation across platforms",
        "Custom integration development",
        "Document processing and management",
        "Scheduled tasks and triggers",
        "Error handling and notifications",
        "Scalable deployment across teams and channels",
        "Human-in-the-loop supervision when needed",
      ],
      cta: "Streamline Your Workflow",
    },
    {
      id: "analytics",
      title: "Analytics",
      description:
        "Turn data into a competitive advantage with advanced analytics—track user behavior, measure performance, and uncover insights that fuel smarter decisions and sustainable growth.",
      icon: <BarChart4Icon className="w-8 h-8" />,
      features: [
        "Custom, AI-enhanced dashboard development",
        "Real-time data visualization and reporting",
        "User behavior and journey tracking",
        "Performance metrics, KPIs, and benchmarks",
        "Predictive and prescriptive analytics",
        "Automated alerts and anomaly detection",
        "Actionable insights for growth and optimization",
      ],
      cta: "Unlock Data Insights",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative bg-black text-white py-24 overflow-hidden"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Right column - Active Service Content */}
          <div className="lg:w-3/5">
            <AnimatePresence mode="wait">
              {services.map(
                (service) =>
                  activeService === service.id && (
                    <motion.div
                      key={service.id}
                      //@ts-expect-error
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-8"
                    >
                      {/* Visual Representation */}
                      <div className="relative h-[350px] rounded-2xl overflow-hidden border border-white/10 mb-8">
                        {/* Service-specific visual */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-secondary/20">
                          {service.id === "web" && (
                            <div className="absolute inset-0">
                              {/* Code editor interface */}
                              <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-t-lg flex items-center px-4">
                                <div className="flex gap-2">
                                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="ml-4 text-xs text-white/60">
                                  app.tsx
                                </div>
                              </div>

                              {/* Code content */}
                              <div className="absolute top-16 left-4 right-4 bottom-4 bg-black/30 rounded-b-lg p-4 font-mono text-xs">
                                <div className="space-y-2 opacity-60">
                                  <div className="text-blue-400">
                                    import React from &apos;react&apos;
                                  </div>
                                  <div className="text-white/80">
                                    <span className="text-purple-400">
                                      const
                                    </span>{" "}
                                    <span className="text-yellow-400">
                                      Home
                                    </span>
                                    : HomePage = () =&gt; {"{"}
                                  </div>
                                  <div className="ml-4 text-white/80">
                                    <span className="text-purple-400">
                                      return
                                    </span>{" "}
                                    (
                                  </div>
                                  <div className="ml-8 text-green-400">
                                    &lt;div className=&#39;min-h-screen&#39;&gt;
                                  </div>{" "}
                                  <div className="ml-12 text-green-400">
                                    &lt;h1&gt;No magic, just code.&lt;/h1&gt;
                                  </div>{" "}
                                  <div className="ml-8 text-green-400">
                                    &lt;/div&gt;
                                  </div>{" "}
                                  <div className="ml-4 text-white/80">)</div>
                                  <div className="text-blue-400">
                                    export default Home;
                                  </div>
                                </div>
                              </div>

                              {/* Floating elements */}
                              <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                                <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center">
                                  <Code2Icon className="w-8 h-8 text-secondary" />
                                </div>
                              </div>
                            </div>
                          )}

                          {service.id === "ai" && (
                            <div className="absolute inset-0">
                              {/* Chat interface */}
                              <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-t-lg flex items-center px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                  <div className="text-xs text-white/80">
                                    AI Agent - Online
                                  </div>
                                </div>
                                <div className="ml-auto text-xs text-white/60">
                                  GPT-5 • Claude Sonnet 4
                                </div>
                              </div>

                              {/* Chat messages */}
                              <div className="absolute top-16 left-4 right-4 bottom-16 bg-black/30 rounded-b-lg p-4 space-y-3 overflow-hidden">
                                {/* User message */}
                                <div className="flex justify-end">
                                  <div className="bg-white/10 rounded-lg px-3 py-2 max-w-[70%]">
                                    <div className="text-xs text-white/90">
                                      How can I optimize my website?
                                    </div>
                                  </div>
                                </div>

                                {/* AI response with typing animation */}
                                <div className="flex justify-start">
                                  <div className="bg-secondary/20 rounded-lg px-3 py-2 max-w-[80%]">
                                    <div className="flex items-center gap-2 mb-1">
                                      <BrainCircuitIcon className="w-3 h-3 text-secondary" />
                                      <div className="text-xs text-secondary font-medium">
                                        AI Agent
                                      </div>
                                    </div>
                                    <div className="text-xs text-white/90">
                                      I can help optimize your website by
                                      analyzing performance metrics,
                                      implementing SEO best practices...
                                      <span className="animate-pulse">|</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Processing indicator */}
                                <div className="flex justify-start">
                                  <div className="bg-white/5 rounded-lg px-3 py-2">
                                    <div className="flex items-center gap-2">
                                      <div className="flex gap-1">
                                        <div
                                          className="w-1 h-1 bg-secondary rounded-full animate-bounce"
                                          style={{ animationDelay: "0s" }}
                                        ></div>
                                        <div
                                          className="w-1 h-1 bg-secondary rounded-full animate-bounce"
                                          style={{ animationDelay: "0.1s" }}
                                        ></div>
                                        <div
                                          className="w-1 h-1 bg-secondary rounded-full animate-bounce"
                                          style={{ animationDelay: "0.2s" }}
                                        ></div>
                                      </div>
                                      <div className="text-xs text-white/60">
                                        Processing...
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* AI models indicator */}
                              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                                <div className="flex gap-2">
                                  <div className="px-2 py-1 bg-secondary/20 rounded text-xs text-secondary">
                                    OpenAI
                                  </div>
                                  <div className="px-2 py-1 bg-secondary/20 rounded text-xs text-secondary">
                                    Anthropic
                                  </div>
                                </div>
                                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                                  <BrainCircuitIcon className="w-6 h-6 text-secondary" />
                                </div>
                              </div>

                              {/* Floating AI particles */}
                              {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-1 h-1 bg-secondary/60 rounded-full animate-ping"
                                  style={{
                                    top: `${20 + Math.random() * 60}%`,
                                    left: `${10 + Math.random() * 80}%`,
                                    animationDelay: `${i * 0.3}s`,
                                    animationDuration: "2s",
                                  }}
                                />
                              ))}
                            </div>
                          )}

                          {service.id === "automation" && (
                            <div className="absolute inset-0">
                              {/* Automation pipeline header */}
                              <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-lg flex items-center px-4">
                                <div className="text-xs text-white/80">
                                  Automation Pipeline
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                  <div className="text-xs text-white/60">
                                    Active
                                  </div>
                                </div>
                              </div>

                              {/* Pipeline stages */}
                              <div className="absolute top-20 left-4 right-4 bottom-16">
                                <svg
                                  width="100%"
                                  height="100%"
                                  className="absolute inset-0"
                                >
                                  <defs>
                                    <marker
                                      id="arrow"
                                      markerWidth="10"
                                      markerHeight="10"
                                      refX="9"
                                      refY="3"
                                      orient="auto"
                                      markerUnits="strokeWidth"
                                    >
                                      <path
                                        d="M0,0 L0,6 L9,3 z"
                                        fill="rgba(208, 56, 75, 0.8)"
                                      />
                                    </marker>

                                    {/* Animated gradient for data flow */}
                                    <linearGradient
                                      id="flowGradient"
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="0%"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor="rgba(208, 56, 75, 0)"
                                      />
                                      <stop
                                        offset="50%"
                                        stopColor="rgba(208, 56, 75, 0.8)"
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor="rgba(208, 56, 75, 0)"
                                      />
                                      <animateTransform
                                        attributeName="gradientTransform"
                                        type="translate"
                                        values="-100 0;100 0;-100 0"
                                        dur="3s"
                                        repeatCount="indefinite"
                                      />
                                    </linearGradient>
                                  </defs>

                                  {/* Pipeline flow */}
                                  <g>
                                    {/* Stage 1: Trigger */}
                                    <rect
                                      x="5%"
                                      y="30%"
                                      width="15%"
                                      height="12%"
                                      rx="6"
                                      fill="rgba(255,255,255,0.1)"
                                      stroke="rgba(208, 56, 75, 0.3)"
                                      strokeWidth="1"
                                    />
                                    <text
                                      x="12.5%"
                                      y="38%"
                                      textAnchor="middle"
                                      className="text-xs fill-white/90"
                                    >
                                      Trigger
                                    </text>

                                    {/* Stage 2: Process */}
                                    <rect
                                      x="35%"
                                      y="30%"
                                      width="15%"
                                      height="12%"
                                      rx="6"
                                      fill="rgba(208, 56, 75, 0.2)"
                                      stroke="rgba(208, 56, 75, 0.5)"
                                      strokeWidth="1"
                                    />
                                    <text
                                      x="42.5%"
                                      y="38%"
                                      textAnchor="middle"
                                      className="text-xs fill-white"
                                    >
                                      Process
                                    </text>

                                    {/* Stage 3: Execute */}
                                    <rect
                                      x="65%"
                                      y="30%"
                                      width="15%"
                                      height="12%"
                                      rx="6"
                                      fill="rgba(255,255,255,0.1)"
                                      stroke="rgba(208, 56, 75, 0.3)"
                                      strokeWidth="1"
                                    />
                                    <text
                                      x="72.5%"
                                      y="38%"
                                      textAnchor="middle"
                                      className="text-xs fill-white/90"
                                    >
                                      Execute
                                    </text>

                                    {/* Connecting arrows with animated flow */}
                                    <line
                                      x1="20%"
                                      y1="36%"
                                      x2="35%"
                                      y2="36%"
                                      stroke="url(#flowGradient)"
                                      strokeWidth="3"
                                      markerEnd="url(#arrow)"
                                    />
                                    <line
                                      x1="50%"
                                      y1="36%"
                                      x2="65%"
                                      y2="36%"
                                      stroke="url(#flowGradient)"
                                      strokeWidth="3"
                                      markerEnd="url(#arrow)"
                                    />
                                  </g>

                                  {/* Data packets moving through pipeline */}
                                  <g>
                                    <circle r="3" fill="rgba(208, 56, 75, 0.8)">
                                      <animateMotion
                                        dur="4s"
                                        repeatCount="indefinite"
                                        path="M 60 120 L 200 120 L 340 120"
                                      />
                                    </circle>
                                    <circle
                                      r="2"
                                      fill="rgba(255, 255, 255, 0.6)"
                                    >
                                      <animateMotion
                                        dur="4s"
                                        repeatCount="indefinite"
                                        begin="1s"
                                        path="M 60 120 L 200 120 L 340 120"
                                      />
                                    </circle>
                                    <circle
                                      r="2"
                                      fill="rgba(255, 255, 255, 0.4)"
                                    >
                                      <animateMotion
                                        dur="4s"
                                        repeatCount="indefinite"
                                        begin="2s"
                                        path="M 60 120 L 200 120 L 340 120"
                                      />
                                    </circle>
                                  </g>
                                </svg>

                                {/* Task queue */}
                                <div className="absolute bottom-8 left-4 right-4">
                                  <div className="bg-black/50 rounded-lg p-3">
                                    <div className="text-xs text-white/80 mb-2">
                                      Task Queue
                                    </div>
                                    <div className="space-y-1">
                                      {[
                                        "Email notification sent",
                                        "Database updated",
                                        "Report generated",
                                      ].map((task, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center gap-2 text-xs"
                                        >
                                          <div
                                            className={`w-2 h-2 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-yellow-500" : "bg-white/30"}`}
                                          ></div>
                                          <span className="text-white/70">
                                            {task}
                                          </span>
                                          {i === 0 && (
                                            <span className="text-green-400 ml-auto">
                                              ✓
                                            </span>
                                          )}
                                          {i === 1 && (
                                            <div className="ml-auto">
                                              <div className="w-3 h-3 border border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Automation icon */}
                              <div className="absolute bottom-4 right-4">
                                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                                  <GaugeCircleIcon className="w-6 h-6 text-secondary" />
                                </div>
                              </div>

                              {/* Floating automation indicators */}
                              <div className="absolute top-16 right-8 space-y-2">
                                <div className="flex items-center gap-2 text-xs">
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="text-white/60">
                                    24/7 Active
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                  <div
                                    className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                                    style={{ animationDelay: "0.5s" }}
                                  ></div>
                                  <span className="text-white/60">
                                    Auto-scaling
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {service.id === "analytics" && (
                            <div className="absolute inset-0">
                              {/* Dashboard interface */}
                              <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-lg flex items-center px-4">
                                <div className="text-xs text-white/80">
                                  Analytics Dashboard
                                </div>
                                <div className="ml-auto flex gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <div className="text-xs text-white/60">
                                    Live
                                  </div>
                                </div>
                              </div>

                              {/* Chart visualization */}
                              <svg
                                width="100%"
                                height="100%"
                                className="absolute inset-0 mt-12"
                              >
                                {/* Bar chart */}
                                <g>
                                  {Array.from({ length: 8 }).map((_, i) => {
                                    const height = Math.random() * 40 + 10;
                                    return (
                                      <rect
                                        key={i}
                                        x={`${15 + i * 8}%`}
                                        y={`${60 - height}%`}
                                        width="5%"
                                        height={`${height}%`}
                                        fill="rgba(208, 56, 75, 0.6)"
                                        className="animate-pulse"
                                        style={{
                                          animationDelay: `${i * 0.1}s`,
                                        }}
                                      />
                                    );
                                  })}
                                </g>

                                {/* Grid lines */}
                                <g
                                  stroke="rgba(255,255,255,0.1)"
                                  strokeWidth="0.5"
                                >
                                  <line x1="10%" y1="20%" x2="90%" y2="20%" />
                                  <line x1="10%" y1="40%" x2="90%" y2="40%" />
                                  <line x1="10%" y1="60%" x2="90%" y2="60%" />
                                </g>

                                {/* Trend line */}
                                <polyline
                                  points="15,50 25,45 35,40 45,35 55,30 65,25 75,20"
                                  fill="none"
                                  stroke="rgba(208, 56, 75, 0.8)"
                                  strokeWidth="2"
                                  className="animate-pulse"
                                />
                              </svg>

                              {/* Analytics icon */}
                              <div className="absolute bottom-8 right-8">
                                <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center">
                                  <BarChart4Icon className="w-8 h-8 text-secondary" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-4">
                            {service.title}
                          </h3>
                          <p className="text-white/80 text-lg leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold mb-4">
                            Key Features
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-start">
                                <CheckCircle2Icon className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80 text-sm">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          className="text-white px-6 py-3 text-base font-semibold group transition-colors border-b-2 border-secondary hover:bg-transparent"
                        >
                          {service.cta}
                          <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
          {/* Left column - Header and Navigation */}
          <div className="lg:w-2/5">
            {/* Section Header */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                WHAT <span className="text-secondary">WE DO</span>
              </h2>
              <p className="text-xl text-white/70">
                We build modern digital solutions where innovation meets
                strategy—powered by AI, automation, and analytics to help
                businesses move faster and scale smarter.
              </p>
            </div>

            {/* Services Navigation */}
            <div className="space-y-4">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
                    activeService === service.id
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-shrink-0">{service.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
