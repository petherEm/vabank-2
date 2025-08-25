import React from "react";
import {
  Code2Icon,
  BrainCircuitIcon,
  GaugeCircleIcon,
  BarChart4Icon,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  cta: string;
};

export const services: Service[] = [
  {
    id: "web",
    title: "Modern Web Development",
    description:
      "Cutting-edge web applications built with Next.js, React, and other modern frameworks that deliver exceptional user experiences and performance.",
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
      "Custom AI agents and assistants powered by OpenAI and Anthropic models, designed to automate tasks, enhance customer service, and provide intelligent insights.",
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
      "Streamline your business processes with custom automation solutions that reduce manual work, minimize errors, and increase operational efficiency.",
    icon: <GaugeCircleIcon className="w-8 h-8" />,
    features: [
      "Workflow automation across platforms",
      "Custom integration development",
      "Document processing and management",
      "Scheduled tasks and triggers",
      "Error handling and notifications",
    ],
    cta: "Streamline Your Workflow",
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Data-driven insights that help you understand user behavior, track business performance, and make informed decisions to drive growth.",
    icon: <BarChart4Icon className="w-8 h-8" />,
    features: [
      "Custom dashboard development",
      "Real-time data visualization",
      "User behavior tracking",
      "Performance metrics and KPIs",
      "Actionable business insights",
    ],
    cta: "Unlock Data Insights",
  },
];

export const containerVariants = {
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
