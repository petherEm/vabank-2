"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/16/solid";
import {
  TwitterIcon,
  LinkedinIcon,
  GithubIcon,
  InstagramIcon,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
    // Here you would typically call a server action or API
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-black text-white overflow-hidden"
      id="footer"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 30px,
                rgba(255,255,255,0.1) 30px,
                rgba(255,255,255,0.1) 32px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 30px,
                rgba(255,255,255,0.1) 30px,
                rgba(255,255,255,0.1) 32px
              )
            `,
          }}
        />
      </div>

      {/* Diagonal Lines */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(208, 56, 75, 0.2) 40px,
                rgba(208, 56, 75, 0.2) 43px
              )
            `,
          }}
        />
      </div>

      {/* Top Wave Separator */}
      <div className="relative">
        <svg
          className="fill-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      <div className="relative z-10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: About */}
            <div className="space-y-6">
              <Image
                src="/vabank-light.png"
                alt="Vabank Logo"
                width={180}
                height={36}
              />

              <p className="text-white/70 text-sm leading-relaxed">
                From replatforming to AI-driven innovation, we craft modern
                digital solutions that move your business <br />
                ahead of the curve.
              </p>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Services", href: "#services" },
                  { name: "Our Work", href: "#work" },
                  { name: "About Us", href: "#about" },
                  { name: "Tech Stack", href: "#tech-stack" },
                  { name: "Contact", href: "#contact" },
                  { name: "Blog", href: "#blog" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-secondary transition-colors flex items-center"
                    >
                      <span className="mr-2 text-xs">›</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <EnvelopeIcon className="w-5 h-5 text-secondary mr-3" />
                  <a
                    href="mailto:hello@vabank.dev"
                    className="text-white/70 text-sm hover:text-white"
                  >
                    hello@vabank.dev
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">
                Newsletter
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Subscribe to our newsletter to receive updates on our latest
                projects and insights.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-secondary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">
              © {currentYear} Vabank. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/50 text-xs hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
