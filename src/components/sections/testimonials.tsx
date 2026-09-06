"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Lakshya rebuilt our booking platform in 6 weeks. What used to take 3 hours now takes 10 minutes. The ROI was visible within the first month.",
    name: "Rajesh Patel",
    role: "Operations Director, TravelVue",
    image: "/testimonial-1.webp",
    metric: "3 hours to 10 minutes",
  },
  {
    quote:
      "We were managing 4 different vendors. Moving to Lakshya cut our coordination overhead by half and improved response times across the board.",
    name: "Priya Sharma",
    role: "CEO, GreenLeaf Exports",
    image: "/testimonial-2.webp",
    metric: "50% less overhead",
  },
  {
    quote:
      "Their consultancy team helped us enter Southeast Asia with a clear roadmap. They did not just hand us a PDF and leave.",
    name: "Amit Kumar",
    role: "Founder, QuickServe Logistics",
    image: "/testimonial-3.webp",
    metric: "3 new markets",
  },
  {
    quote:
      "The training program upskilled 12 junior developers in 3 months. Measurable improvement in code quality and sprint velocity.",
    name: "Deepa Nair",
    role: "CTO, FinServe Solutions",
    image: "/testimonial-4.webp",
    metric: "60% faster sprints",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-zinc-900/30 border border-zinc-800/50 p-8 hover:border-zinc-700/50 transition-colors duration-500"
    >
      {/* Metric badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 text-xs font-medium text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
        {t.metric}
      </div>

      {/* Quote */}
      <p className="text-zinc-300 leading-relaxed mb-8 text-[15px]">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {t.image && (
          <div className="w-9 h-9 shrink-0 overflow-hidden bg-zinc-800 border border-zinc-700">
            <img
              src={t.image}
              alt={t.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{t.name}</p>
          <p className="text-xs text-zinc-600 truncate">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-32 bg-[#030712]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="mb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-amber-500/60 mb-4 block">
              Testimonials
            </span>
            <h2
              id="testimonials-heading"
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Client results
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Real feedback from businesses we have helped grow.
            </p>
          </motion.div>
        </div>

        {/* Cards — staggered grid with parallax */}
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.name} t={t} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
