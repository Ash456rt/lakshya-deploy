"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 md:py-32 bg-paper overflow-hidden"
    >
      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-[0.04]"
          style={{
            background: "radial-gradient(ellipse, rgba(36,51,179,1) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 font-[family-name:var(--font-newsreader)] text-5xl font-medium leading-[1.02] tracking-[-0.015em] text-ink md:text-6xl">
            Ready to build{" "}
            <em className="font-medium italic text-accent">something real?</em>
          </h2>

          <p className="text-stone-600 mb-10 max-w-lg mx-auto leading-relaxed">
            Tell us about your project and we will show you how one partner can
            handle it all. Free consultation, no commitment.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Get a free consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
