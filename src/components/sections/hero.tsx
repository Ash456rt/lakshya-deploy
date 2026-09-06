"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const screenY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Mouse parallax for the product screen
  const springConfig = { stiffness: 50, damping: 20 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x * 15);
    mouseY.set(y * 15);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Text content */}
      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center will-change-transform"
      >
        {/* SEO heading — visually hidden, carries the primary keyword */}
        <h1 className="sr-only">
          Web development, consultancy, import & export, logistics, travel, and training in Bengaluru
        </h1>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-medium tracking-[0.25em] uppercase text-zinc-500 border border-zinc-800">
            <span className="w-1 h-1 bg-amber-400" />
            Bengaluru, India
          </span>
        </motion.div>

        {/* Headline — short, punchy, under 12 words */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-amber-400 leading-[0.92] tracking-[-0.03em]"
          >
            Build. Launch. Scale.
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-[-0.03em] text-zinc-600"
          >
            All under one roof.
          </motion.h2>
        </div>

        {/* Subtitle — direct, no fluff. Covers all 7 services in 1 line. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-base md:text-lg text-zinc-500 max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Web & app development, consultancy, logistics, travel, and
          professional training — from one Bengaluru team, for global clients.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
          >
            Start a project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-300"
          >
            See our work
          </a>
        </motion.div>
      </motion.div>

      {/* Product showcase — real project screenshots, like Linear */}
      <motion.div
        style={{ y: screenY }}
        className="relative z-10 mt-16 w-full max-w-5xl px-6 will-change-transform"
      >
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="relative will-change-transform"
        >
          {/* Browser chrome */}
          <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-zinc-700" />
                <div className="w-2.5 h-2.5 bg-zinc-700" />
                <div className="w-2.5 h-2.5 bg-zinc-700" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-zinc-800 text-[10px] text-zinc-500 font-mono">
                  lakshyagroups.in
                </div>
              </div>
            </div>
            {/* Content — shows the actual website inside */}
            <div className="relative aspect-[16/9] bg-[#030712] overflow-hidden">
              <img
                src="/og-image.webp"
                alt="Lakshya Groups website preview"
                className="w-full h-full object-cover opacity-60"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/30" />
            </div>
          </div>
          {/* Shadow / depth */}
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-amber-500/5 blur-xl" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-zinc-700 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-0.5 h-2 bg-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
