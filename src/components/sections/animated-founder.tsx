"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function usePointerPosition(ref: React.RefObject<HTMLDivElement | null>) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({
        x: clamp((e.clientX - rect.left) / rect.width, 0.1, 0.9),
        y: clamp((e.clientY - rect.top) / rect.height, 0.1, 0.9),
      });
    }
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [ref]);
  return pos;
}

function MagneticTiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pointer = usePointerPosition(ref);
  const tilt = useMemo(() => ({ x: 0, y: 0 }), []);
  useEffect(() => {
    tilt.x = (pointer.x - 0.5) * 12;
    tilt.y = (pointer.y - 0.5) * -12;
  }, [pointer]);
  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateX: tilt.y, rotateY: tilt.x }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const founderRecognition = [
  {
    badge: "Google",
    tag: "Partner ecosystem",
    note: "Listed among trusted Google partner consultants for SMB digital transformation.",
    href: "#",
  },
  {
    badge: "Twitter / X",
    tag: "Building in public",
    note: "Active voice in the Indian startup and developer community on X.",
    href: "#",
  },
  {
    badge: "LinkedIn",
    tag: "Industry presence",
    note: "Recognized on LinkedIn as a Bengaluru-based entrepreneur and tech leader.",
    href: "#",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AnimatedFounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);
  const pointer = usePointerPosition(sectionRef);

  return (
    <motion.section
      ref={sectionRef}
      id="founder"
      className="relative mb-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient drifting glows */}
      <motion.div
        className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-accent/10 blur-3xl pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-brand-violet-light/10 blur-3xl pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Section label */}
      <motion.span
        className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Founder
      </motion.span>

      {/* Scroll progress line */}
      <div className="h-px w-full bg-stone-200/60 mb-10">
        <motion.div
          className="h-px bg-gradient-to-r from-accent to-brand-violet-light origin-left"
          style={{ width: lineWidth }}
        />
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-start">
        {/* Portrait */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticTiltCard
            className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 aspect-[16/10] group/mask"
          >
            {/* Glow halo on hover */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-transparent to-brand-violet-light/20 blur-xl opacity-0 group-hover/mask:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Cursor-following shine */}
            <div
              className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/mask:opacity-100"
              style={{
                background: `radial-gradient(circle at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(255,255,255,0.2) 0%, transparent 70%)`,
              }}
            />

            {/* The portrait */}
            <img
              src="/founder.webp"
              alt="Sakthivel Saravanan, Founder of Lakshya Groups"
              className="w-full h-full object-cover"
              width={1599}
              height={959}
              loading="lazy"
            />

            {/* Gradient fade from bottom */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent pointer-events-none"
              initial={{ opacity: 0.65 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </MagneticTiltCard>
        </motion.div>

        {/* Bio */}
        <div className="space-y-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Sakthivel Saravanan
          </motion.h2>

          <motion.p
            className="text-sm text-stone-500 mb-4 uppercase tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Founder, Lakshya Groups
          </motion.p>

          <motion.p
            className="text-base text-stone-600 leading-relaxed mb-6 max-w-2xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Sakthivel built Lakshya Groups from a desks in Bengaluru
            into a multi-service company with seven divisions and partners
            across 63 countries. His approach is simple: solve the client&apos;s
            real problem, not just the one they asked about; keep numbers
            honest; and treat every delivery like it will be used by
            strangers on a weak phone connection.
          </motion.p>

          <motion.p
            className="text-base text-stone-600 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Before Lakshya Groups, he spent years building web and mobile
            products end to end — from the first wireframe to the first
            paying customer — which is why the company still ships
            products, not just pages.
          </motion.p>

          {/* Recognition badges — staggered */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {founderRecognition.map((item, index) => (
              <motion.a
                key={item.badge}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 border border-stone-200 hover:border-accent bg-paper-deep/30 hover:bg-paper-deep/50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                  {item.badge}
                </span>
                <span className="text-[11px] text-stone-500 group-hover:text-stone-700 transition-colors hidden sm:inline">
                  {item.tag}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Recognition notes — staggered list */}
          <motion.ul
            className="mt-5 space-y-2 text-sm text-stone-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {founderRecognition.map((item, index) => (
              <motion.li
                key={item.badge}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 1.0 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg
                  className="mt-0.5 shrink-0 w-4 h-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{item.note}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/#contact"
              className="px-6 py-2.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors"
            >
              Work with the founder
            </Link>
            <Link
              href="/blog"
              className="px-6 py-2.5 border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-ink font-medium text-sm transition-colors"
            >
              Read what he writes
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
