"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const features = [
  {
    title: "One accountable partner",
    description:
      "Seven services, one team, one point of contact. No finger-pointing between vendors when things matter.",
    number: "01",
  },
  {
    title: "Outcomes over output",
    description:
      "We measure success by your growth - leads, sales, retention - not by how many pages we shipped.",
    number: "02",
  },
  {
    title: "Local roots, global reach",
    description:
      "Headquartered in Bengaluru with operations and partners across 50+ countries.",
    number: "03",
  },
  {
    title: "Transparent pricing",
    description:
      "Fixed scopes, clear timelines, and honest answers about what is included and what is not.",
    number: "04",
  },
];

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-32 bg-[#030712] overflow-hidden"
    >
      {/* Subtle side accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-900" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header — left aligned, asymmetric */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mb-24">
          <div>
            <RevealText>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-amber-500/60 mb-4 block">
                About
              </span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2
                id="about-heading"
                className="text-4xl md:text-5xl font-bold text-white leading-tight"
              >
                One Partner.
                <br />
                Seven Services.
              </h2>
            </RevealText>
          </div>
          <div className="lg:pt-8">
            <RevealText delay={0.2}>
              <p className="text-lg text-zinc-500 leading-relaxed max-w-xl">
                We started as a web development shop in Bengaluru. Today, Lakshya
                Groups runs seven service divisions because our clients kept asking
                us to solve the next problem too. Each service exists because
                a real client needed it.
              </p>
            </RevealText>
          </div>
        </div>

        {/* Animated divider line */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-px bg-zinc-800 mb-24"
        />

        {/* Values grid — numbered, asymmetric layout */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {features.map((feature, index) => {
            const FeatureItem = () => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: true, margin: "-60px" });

              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-xs font-mono text-amber-500/40 mt-1.5 shrink-0">
                      {feature.number}
                    </span>
                    <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed pl-10">
                    {feature.description}
                  </p>
                </motion.div>
              );
            };
            return <FeatureItem key={feature.number} />;
          })}
        </div>
      </div>
    </section>
  );
}
