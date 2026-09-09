"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { value: 300, suffix: "+", label: "Projects delivered" },
  { value: 63, suffix: "", label: "Countries served" },
  { value: 6, suffix: "", label: "Years of experience" },
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
      className="relative py-12 sm:py-16 md:py-24 bg-paper"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <motion.h2
            id="stats-heading"
            className="font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl"
          >
            By the numbers
          </motion.h2>
        </div>

        {/* Animated divider */}
        <motion.div
          style={{ width: lineWidth }}
          className="mb-16 h-px bg-accent/60"
        />

        {/* Stats grid , clean, no cards */}
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
                  <div className="mb-2 font-[family-name:var(--font-newsreader)] text-5xl font-medium tracking-[-0.01em] text-ink md:text-6xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-sm text-stone-500">{stat.label}</p>
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
