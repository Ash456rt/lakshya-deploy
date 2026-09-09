"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.97]);
  const windowY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // Gentle mouse parallax for the product window.
  const springConfig = { stiffness: 50, damping: 20 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x * 10);
    mouseY.set(y * 10);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home"
      aria-label="Hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-paper"
    >
      {/* Hairline column grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-6xl grid-cols-4 gap-8 px-6 lg:grid"
      >
        <div className="border-l border-ink/[0.06]" />
        <div className="border-l border-ink/[0.06]" />
        <div className="border-l border-ink/[0.06]" />
        <div className="border-l border-ink/[0.06]" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center"
      >
        {/* SEO heading , visually hidden, carries the primary keyword */}
        <h1 className="sr-only">
          Web development, consultancy, import &amp; export, logistics, travel, and training in Bengaluru
        </h1>

        {/* Masthead rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mx-auto mb-10 flex items-center justify-center gap-4"
        >
          <span className="block h-px w-10 bg-accent" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-500">
            Seven services, one partner
          </span>
          <span className="block h-px w-10 bg-accent" aria-hidden="true" />
        </motion.div>

        {/* Headline , serif manifesto */}
        <div className="mb-4 overflow-hidden" aria-hidden="true">
          <motion.span
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="block font-[family-name:var(--font-newsreader)] text-6xl font-medium leading-[0.98] tracking-[-0.02em] text-ink sm:text-7xl md:text-8xl"
          >
            Build. Launch. Scale.
          </motion.span>
        </div>
        <div className="overflow-hidden pb-2" aria-hidden="true">
          <motion.span
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="block font-[family-name:var(--font-newsreader)] text-5xl font-normal italic leading-[1.05] tracking-[-0.01em] text-transparent sm:text-6xl md:text-7xl"
            style={{ WebkitTextStroke: "1.5px #2b2520" }}
          >
            All under one roof.
          </motion.span>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mx-auto mb-10 mt-8 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg"
        >
          Web &amp; app development, consultancy, logistics, travel, and
          professional training, from one Bengaluru team for clients in 63 countries.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="/#contact"
            className="inline-flex min-h-[52px] items-center gap-2 bg-ink px-7 py-4 text-base font-medium text-paper transition-colors duration-300 hover:bg-[#3a352c] active:bg-[#2b2620] sm:text-sm"
          >
            Start a project
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="/case-studies"
            className="inline-flex min-h-[52px] items-center gap-2 border border-stone-400 px-7 py-4 text-base font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-paper-deep sm:text-sm"
          >
            See our work
          </a>
        </motion.div>
      </motion.div>

      {/* Product window , real screenshot of the live site */}
      <motion.div
        style={{ y: windowY }}
        className="relative z-10 mt-16 w-full max-w-4xl px-6 will-change-transform sm:mt-20"
      >
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="relative will-change-transform"
        >
          <div className="overflow-hidden border border-ink/10 bg-white shadow-[0_40px_80px_-48px_rgba(32,28,22,0.45)]">
            {/* Title bar */}
            <div className="flex items-center gap-4 border-b border-ink/10 bg-paper-deep px-5 py-3">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              </div>
              <div className="flex-1 text-center">
                <span className="px-3 py-1 font-mono text-[10px] tracking-wide text-stone-500">
                  lakshyagroups.in
                </span>
              </div>
            </div>
            {/* Screenshot */}
            <div className="relative aspect-[16/9] overflow-hidden bg-paper">
              <img
                src="/og-image.webp"
                alt="Lakshya Groups website preview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {/* Hairline shadow seat */}
          <div aria-hidden="true" className="absolute inset-x-8 -bottom-1.5 h-px bg-ink/5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
