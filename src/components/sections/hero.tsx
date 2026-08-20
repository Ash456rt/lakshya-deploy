"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hyperspeed from "@/components/ui/hyperspeed";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MagneticButton } from "@/components/ui/magnetic-button";

const HYPERSPEED_OPTIONS = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [12, 80],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x030712,
    shoulderLines: 0x333333,
    brokenLines: 0x222222,
    leftCars: [0xd97706, 0xb45309, 0xf59e0b],
    rightCars: [0x92400e, 0x78350f, 0x451a03],
    sticks: 0xd97706,
  },
};

export function Hero() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hyperspeed synthwave background */}
      <div className="absolute inset-0">
        <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
        {/* overlay to keep the hero text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/40 to-neutral-950/90 pointer-events-none" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        style={{ scale, opacity }}
      >
        <Spotlight
          className="absolute inset-0 pointer-events-none"
          spotlightColor="rgba(245, 158, 11, 0.10)"
          spotlightSize={600}
        />

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
            Welcome to Laksya Groups — Bengaluru
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
          A multi-service conglomerate empowering businesses with cutting-edge
          technology, strategic consulting, and global solutions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <MagneticButton>Explore Services</MagneticButton>
          <MagneticButton className="!bg-transparent !border !border-white/20 hover:!bg-white/5">
            Contact Us
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
