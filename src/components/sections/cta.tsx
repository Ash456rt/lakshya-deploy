"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RippleDistortion from "@/components/ui/ripple-distortion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ParticleField } from "@/components/ui/particle-field";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Ripple Background */}
      <div className="absolute inset-0">
        <RippleDistortion
          src="/team.jpg"
          brushSize={180}
          strength={0.12}
          swirl={1.2}
          rings={4}
          spread={5}
          fade={3.5}
          spacing={18}
          tint="#8b5cf6"
          tintAmount={0.2}
          grayscale={true}
          trigger="hover"
          quality="low"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950/70 pointer-events-none" />
      </div>
      
      <BackgroundBeams className="opacity-15" />
      <ParticleField className="opacity-20" particleCount={30} />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
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
          <motion.span
            className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Ready to Transform?
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>

          <p className="text-lg text-neutral-300 mb-10 max-w-2xl mx-auto backdrop-blur-sm bg-neutral-950/30 p-4 rounded-2xl">
            Join 10,000+ businesses that have already transformed their operations
            with Laksya Groups. Your success story starts here.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <MagneticButton className="!bg-gradient-to-r !from-blue-600 !to-purple-600 !text-lg !px-10 !py-5">
              Start Your Journey
            </MagneticButton>
            <MagneticButton className="!bg-transparent !border-2 !border-white/20 hover:!bg-white/10 !text-lg !px-10 !py-5">
              Schedule a Call
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-neutral-300">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Free consultation</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">24/7 support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
