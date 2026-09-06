"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn your business, your customers, and your goals. No templates. No assumptions.",
    duration: "1-2 days",
  },
  {
    number: "02",
    title: "Strategy",
    description: "A clear roadmap with fixed scope, timeline, and pricing. You know exactly what you are getting.",
    duration: "3-5 days",
  },
  {
    number: "03",
    title: "Build",
    description: "We execute with weekly demos. You see progress in real time, not at the end.",
    duration: "2-12 weeks",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "We deploy, monitor, and maintain. One partner, ongoing, no handoff to a different team.",
    duration: "Ongoing",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-[#030712]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-amber-500/60 mb-4 block">
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            How we work
          </h2>
        </div>

        {/* Steps with animated connecting line */}
        <div className="relative">
          {/* Vertical line — animates on scroll */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-800/50">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-amber-500/30"
            />
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const StepItem = () => {
                const ref = useRef<HTMLDivElement>(null);
                const isInView = useInView(ref, { once: true, margin: "-60px" });

                return (
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex gap-8"
                  >
                    {/* Step number dot */}
                    <div className="relative z-10 shrink-0">
                      <div className="w-10 h-10 bg-[#030712] border border-zinc-700 flex items-center justify-center">
                        <span className="text-xs font-mono text-amber-400/80">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1.5">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                        <span className="text-xs text-zinc-600 font-mono">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              };
              return <StepItem key={step.number} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
