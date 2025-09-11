"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      className="relative bg-black text-white py-24 overflow-hidden"
      id="about"
    >
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Left Column - Title */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              ABOUT <span className="text-secondary">VABANK</span>
            </h2>
            <div className="w-24 h-1 bg-secondary mb-8"></div>
            <p className="text-lg text-white/70 leading-relaxed">
              Our mission is simple: democratize access to sophisticated
              technology and transform bold ideas into powerful digital
              solutions.
            </p>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="lg:col-span-3 space-y-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Story Section */}
            <div className="space-y-6">
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p className="text-xl">
                  Founded by visionary tech and business enthusiast, a senior
                  leader with over{" "}
                  <span className="text-secondary font-semibold">
                    16 years of experience
                  </span>{" "}
                  at global financial institutions including Western Union,
                  State Street Bank, and the Royal Bank of Scotland. Our agency
                  blends enterprise-level expertise with cutting-edge
                  technology.{" "}
                </p>
                <p className="text-xl">
                  With a unique background spanning payments, banking, AI, and
                  full stack development, we bring enterprise-level expertise to
                  businesses of all sizes—bridging the gap between strategic
                  business thinking and cutting-edge technology to deliver
                  solutions that drive real growth.
                </p>
              </div>

              {/* <Button
                variant="ghost"
                className="text-white px-6 py-3 text-lg font-semibold group transition-colors border-b-2 border-secondary hover:bg-transparent"
              >
                Our Story
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button> */}
            </div>

            {/* Stats and Values Grid */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Key Stats */}
              <div>
                <h3 className="text-xl font-bold mb-6">Key Stats</h3>
                <div className="space-y-4">
                  {[
                    { number: "16+", label: "Years of Business Experience" },
                    { number: "50+", label: "Projects Delivered" },
                    { number: "30+", label: "Happy Clients" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-2xl font-bold text-secondary min-w-[60px]">
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/70 uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Core Values */}
              <div>
                <h3 className="text-xl font-bold mb-6">What Drives Us</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Quality Delivery",
                      desc: "Excellence in every project, every time",
                    },
                    {
                      title: "Client Success",
                      desc: "Your growth is our primary measure of success",
                    },
                    {
                      title: "Innovation First",
                      desc: "Cutting-edge solutions for modern challenges",
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className="p-3 rounded-lg hover:bg-white/5 transition-colors border-l-2 border-secondary/30 pl-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-semibold text-white mb-1">
                        {value.title}
                      </h4>
                      <p className="text-sm text-white/70">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
