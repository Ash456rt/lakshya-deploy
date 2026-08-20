"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AmberParticles from "@/components/ui/amber-particles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Ambient background — dark canvas with subtle warm glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a14] via-[#030712] to-[#030712]" />

      {/* Floating amber particles — mouse-reactive, connected */}
      <div className="absolute inset-0">
        <AmberParticles
          particleCount={70}
          speed={0.25}
          mouseRadius={180}
          mouseForce={0.015}
          connectionDistance={130}
          showConnections={true}
        />
      </div>

      {/* Radial amber glow — subtle warmth behind text */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,1) 0%, rgba(245,158,11,0.3) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(3,7,18,0.6) 100%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        style={{ scale, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 mb-6 text-xs font-medium tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Lakshya Groups — Bengaluru
          </motion.span>
        </motion.div>

        <TextGenerateEffect
          as="h1"
          words="Innovating Tomorrow, Delivering Excellence Today"
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
        />

        <motion.p
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          A Bengaluru-based multi-service company building web & app platforms,
          running business consultancy, and delivering global solutions since day one.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <MagneticButton>Get a Free Consultation</MagneticButton>
          <a href="/about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Learn about us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
