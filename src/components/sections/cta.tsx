"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden">
      <BackgroundBeams className="opacity-10" />

      {/* Subtle gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-section md:text-5xl text-white mb-6">
            Ready to Get Started?
          </h2>

          <p className="text-body-lg mb-10 max-w-2xl mx-auto">
            Tell us about your project and we will show you how one partner can
            handle it all. Free consultation, no commitment.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a
              href="/#contact"
              className="inline-block px-10 py-5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-medium text-lg transition-colors"
            >
              Get a Free Consultation
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
