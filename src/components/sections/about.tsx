"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Parallax } from "@/components/ui/parallax";
import { GlowCard } from "@/components/ui/glow-card";

const features = [
  {
    title: "Innovation First",
    description:
      "We use current, battle-tested tools — not hype — to ship solutions that actually work.",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Global Reach",
    description:
      "With operations across multiple continents, we serve clients worldwide with local expertise.",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Client Centric",
    description:
      "Every solution is tailored to your unique needs, ensuring maximum ROI and satisfaction.",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Sustainable Growth",
    description:
      "We build long-term partnerships focused on sustainable growth and mutual success.",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-32 bg-gradient-to-b from-neutral-950 to-neutral-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-amber-500/[0.03] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-amber-500/[0.03] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 id="about-heading" className="heading-section text-white mb-6">
              One Partner. Seven Services.
            </h2>
            <p className="text-body-lg mb-6">
              We started as a web development shop in Bengaluru. Today, Laksya
              Groups runs seven service divisions because our clients kept asking
              us to solve the next problem too. Development led to consultancy.
              Consultancy led to operations support. Each service exists because
              a real client needed it, not because we wanted a bigger menu.
            </p>
            <p className="text-body-lg">
              We build for businesses that want one accountable partner instead
              of seven vendors. If that sounds like what you need, let us talk.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Parallax key={feature.title} speed={0.2} direction={index % 2 === 0 ? "up" : "down"}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <GlowCard glowColor="rgba(245, 158, 11, 0.15)">
                    <div className="mb-3">{feature.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {feature.description}
                    </p>
                  </GlowCard>
                </motion.div>
              </Parallax>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
