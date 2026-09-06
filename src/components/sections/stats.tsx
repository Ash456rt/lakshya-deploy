"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { value: 30, suffix: "+", label: "Web & app projects delivered" },
  { value: 50, suffix: "+", label: "Countries served" },
  { value: 1, suffix: "", label: "Year in Bengaluru" },
  { value: 7, suffix: "", label: "Services under one roof" },
];

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.35], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="stats"
      aria-labelledby="stats-heading"
      className="relative py-24 bg-[#030712]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <motion.h2
            id="stats-heading"
            className="text-4xl md:text-5xl font-bold text-white"
          >
            By the numbers
          </motion.h2>
        </div>

        {/* Animated divider */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-px bg-zinc-800 mb-16"
        />

        {/* Stats grid — clean, no cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const StatItem = () => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: true, margin: "-40px" });

              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-left"
                >
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-sm text-zinc-600">{stat.label}</p>
                </motion.div>
              );
            };
            return <StatItem key={stat.label} />;
          })}
        </div>
      </div>
    </section>
  );
}
