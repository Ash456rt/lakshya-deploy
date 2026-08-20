"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { BackgroundBeams } from "@/components/ui/background-beams";
import ParticleText from "@/components/ui/particle-text";

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
    <section id="stats" aria-labelledby="stats-heading" className="relative py-32 bg-neutral-950 overflow-hidden">
      <BackgroundBeams className="opacity-15" />

      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.06] via-amber-500/[0.03] to-amber-500/[0.06]"
          animate={{
            background: [
              "linear-gradient(0deg, rgba(245,158,11,0.06), rgba(245,158,11,0.03), rgba(245,158,11,0.06))",
              "linear-gradient(120deg, rgba(245,158,11,0.06), rgba(245,158,11,0.03), rgba(245,158,11,0.06))",
              "linear-gradient(240deg, rgba(245,158,11,0.06), rgba(245,158,11,0.03), rgba(245,158,11,0.06))",
              "linear-gradient(360deg, rgba(245,158,11,0.06), rgba(245,158,11,0.03), rgba(245,158,11,0.06))",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Particle Text Heading */}
        <motion.div
          ref={ref}
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full">
            Our Impact
          </span>
          <h2 id="stats-heading" className="sr-only">Our Numbers</h2>
          <div style={{ width: '100%', height: 200, background: 'transparent' }}>
            <ParticleText
              text="OUR NUMBERS"
              particleSize={2.5}
              density={4}
              color="#ffffff"
              highlightColor="#f59e0b"
              scatter={150}
              gatherDuration={1800}
              stagger={350}
              pointerRepel={35}
              repelRadius={100}
              idleDrift={0.5}
              trigger="hover"
              fontSize="clamp(2rem, 8vw, 5rem)"
              fontWeight={900}
              glow={true}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
