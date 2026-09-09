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
      id="process"
      className="relative py-16 sm:py-20 md:py-32 bg-paper"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            Process
          </span>
          <h2 className="font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl">
            How we work
          </h2>
        </div>

        {/* Steps with animated connecting line */}
        <div className="relative">
          {/* Vertical line , animates on scroll */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-stone-200/70">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-accent/60"
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
                      <div className="w-10 h-10 bg-paper border border-stone-200 flex items-center justify-center">
                        <span className="text-xs font-mono text-accent">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1.5">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-ink">
                          {step.title}
                        </h3>
                        <span className="text-xs text-stone-500 font-mono">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-stone-500 leading-relaxed max-w-md">
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
