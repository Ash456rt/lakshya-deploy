"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { BackgroundBeams } from "@/components/ui/background-beams";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed", color: "#f59e0b" },
  { value: 50, suffix: "+", label: "Countries Served", color: "#f59e0b" },
  { value: 10000, suffix: "+", label: "Happy Clients", color: "#f59e0b" },
  { value: 15, suffix: "+", label: "Years Experience", color: "#f59e0b" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" aria-labelledby="stats-heading" className="relative py-24 bg-neutral-950 overflow-hidden">
      <BackgroundBeams className="opacity-15" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 id="stats-heading" className="heading-section text-white">
            Proven Results
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.div
                className="inline-block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}40, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl md:text-5xl font-bold text-white"
                  />
                </div>
              </motion.div>
              <p className="text-zinc-400 font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
