"use client";

import type * as React from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useSpring, type HTMLMotionProps } from "framer-motion";
import useMeasure, { type RectReadOnly } from "react-use-measure";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    img: "/testimonials/amy-chase.jpg",
    name: "Sarah Johnson",
    title: "CTO, TechVision",
    quote:
      "Vabank transformed our digital presence with their modern web development approach. The AI integration they implemented has significantly improved our customer engagement metrics.",
  },
  {
    img: "/testimonials/conor-neville.jpg",
    name: "Michael Chen",
    title: "Director of Innovation, NexGen",
    quote:
      "The AI agent setup by Vabank has revolutionized our customer support system. We've seen a 40% reduction in response time and a 25% increase in customer satisfaction.",
  },
  {
    img: "/testimonials/dillon-lenora.jpg",
    name: "Emily Rodriguez",
    title: "Head of Operations, Streamline Inc.",
    quote:
      "The automation solutions provided by Vabank have streamlined our workflow beyond expectations. Tasks that used to take days now happen in minutes with greater accuracy.",
  },
  {
    img: "/testimonials/harriet-arron.jpg",
    name: "David Thompson",
    title: "CMO, GrowthMetrics",
    quote:
      "The analytics dashboard Vabank built for us has been instrumental in our decision-making process. We now have clear insights into customer behavior that drive our strategy.",
  },
  {
    img: "/testimonials/tina-yards.jpg",
    name: "Alexandra Kim",
    title: "CEO, InnovateTech",
    quote:
      "Working with Vabank has been transformative for our business. Their technical expertise combined with strategic thinking has helped us stay ahead of our competition.",
  },
  {
    img: "/testimonials/veronica-winton.jpg",
    name: "James Wilson",
    title: "Product Director, FutureSoft",
    quote:
      "Vabank's team delivered a web application that exceeded our expectations in both functionality and design. Their attention to detail and commitment to excellence is unmatched.",
  },
];

function TestimonialCard({
  name,
  title,
  img,
  children,
  bounds,
  scrollX,
  ...props
}: {
  img: string;
  name: string;
  title: string;
  children: React.ReactNode;
  bounds: RectReadOnly;
  scrollX: React.MutableRefObject<number>;
} & HTMLMotionProps<"div">) {
  const ref = useRef<HTMLDivElement | null>(null);

  const computeOpacity = useCallback(() => {
    const element = ref.current;
    if (!element || bounds.width === 0) return 1;

    const rect = element.getBoundingClientRect();

    if (rect.left < bounds.left) {
      const diff = bounds.left - rect.left;
      const percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else if (rect.right > bounds.right) {
      const diff = rect.right - bounds.right;
      const percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else {
      return 1;
    }
  }, [ref, bounds.width, bounds.left, bounds.right]);

  const opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  });

  useLayoutEffect(() => {
    opacity.set(computeOpacity());
  }, [computeOpacity, opacity]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-[3/4] w-80 shrink-0 snap-start scroll-ml-6 flex-col justify-end overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm"
    >
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black from-25% to-transparent"
      />

      {/* Image */}
      <img
        alt=""
        src={img || "/placeholder.svg"}
        className="absolute inset-x-0 top-0 aspect-square w-full object-cover opacity-60"
      />

      {/* Content */}
      <figure className="relative p-6">
        <QuoteIcon className="absolute top-6 left-6 h-8 w-8 text-secondary opacity-40" />
        <blockquote className="mt-8">
          <p className="text-base text-white/90 leading-relaxed">{children}</p>
        </blockquote>
        <figcaption className="mt-6 border-t border-white/10 pt-4">
          <p className="text-base font-semibold text-white">{name}</p>
          <p className="text-sm font-medium text-secondary">{title}</p>
        </figcaption>
      </figure>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollX = useRef<number>(0);
  const [setReferenceWindowRef, bounds] = useMeasure();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollX.current = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.children[0].clientWidth + 32; // width + gap
      setActiveIndex(Math.round(scrollX.current / cardWidth));
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const gap = 32;
      const width = (scrollRef.current.children[0] as HTMLElement).offsetWidth;
      scrollRef.current.scrollTo({
        left: (width + gap) * index,
        behavior: "smooth",
      });
    }
  };

  const scrollNext = () => {
    if (activeIndex < testimonials.length - 1) {
      scrollTo(activeIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (activeIndex > 0) {
      scrollTo(activeIndex - 1);
    }
  };

  return (
    <section
      className="relative bg-black text-white py-24 overflow-hidden"
      id="testimonials"
    >
      {/* Background Pattern */}
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

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
        ref={setReferenceWindowRef}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            CLIENT <span className="text-secondary">TESTIMONIALS</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Hear what our clients have to say about their experience
            <br /> working with us and the results were delivered.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-white/20 text-white hover:bg-secondary hover:text-white"
              onClick={scrollPrev}
              disabled={activeIndex === 0}
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
          </div>
          <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-white/20 text-white hover:bg-secondary hover:text-white"
              onClick={scrollNext}
              disabled={activeIndex === testimonials.length - 1}
            >
              <ChevronRightIcon className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          {/* Slider */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map(
              ({ img, name, title, quote }, testimonialIndex) => (
                <TestimonialCard
                  key={testimonialIndex}
                  name={name}
                  title={title}
                  img={img}
                  bounds={bounds}
                  scrollX={scrollX}
                  onClick={() => scrollTo(testimonialIndex)}
                >
                  {quote}
                </TestimonialCard>
              )
            )}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, testimonialIndex) => (
              <button
                key={testimonialIndex}
                onClick={() => scrollTo(testimonialIndex)}
                aria-label={`Go to testimonial ${testimonialIndex + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  activeIndex === testimonialIndex
                    ? "bg-secondary"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
