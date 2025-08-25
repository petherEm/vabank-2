"use client";

import { motion } from "framer-motion";

interface AnimatedSeparatorProps {
  className?: string;
  width?: string;
  height?: string;
  color?: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedSeparator({
  className = "",
  width = "100%",
  height = "2px",
  color = "bg-red-500",
  duration = 1.2,
  delay = 0,
}: AnimatedSeparatorProps) {
  return (
    <div className={`w-full py-16 ${className}`}>
      <div className="relative">
        <motion.div
          className={`${color} opacity-80`}
          style={{ height }}
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration, ease: "easeOut", delay }}
        />

        <motion.div
          className={`absolute top-0 left-0 ${color} opacity-40 blur-sm`}
          style={{ height }}
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: duration + 0.2,
            ease: "easeOut",
            delay: delay + 0.1,
          }}
        />
      </div>
    </div>
  );
}
