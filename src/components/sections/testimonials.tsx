"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "As a tuition centre we get a lot of parent calls during admission season. The website Lakshya built answers most questions before people even ring us, and the enquiry form sends details straight to our inbox. It has honestly made admission season calmer.",
    name: "Sri Lakshmi",
    role: "Director, Sri Lakshmi Tutorials",
    image: "/partners/sri-lakshmi.png",
    metric: "Fewer missed enquiries",
  },
  {
    quote:
      "We needed a site that works well on phones because most of our customers browse on mobile. Lakshya delivered that and kept the pricing clear from the start. When we asked for changes they were done in days, not weeks.",
    name: "First Zone",
    role: "Management, First Zone",
    image: "/partners/first-zone.png",
    metric: "Mobile-first delivery",
  },
  {
    quote:
      "What stood out was the communication. We always knew what was being worked on and when it would be ready. The site looks professional and loads fast even on slow connections, which matters for our audience.",
    name: "Avans",
    role: "Team, Avans",
    image: "/partners/avans.png",
    metric: "Clear communication",
  },
  {
    quote:
      "Lakshya handled our website and follow-up support without drama. Small requests get fixed quickly and bigger ones get a proper estimate first. That reliability is why we keep coming back to them.",
    name: "ZetPeak",
    role: "Team, ZetPeak",
    image: "/partners/zetpeak.png",
    metric: "Reliable support",
  },
  {
    quote:
      "Our old website was slow and hard to update. The new one loads quickly, shows up better on Google, and the team showed us how to make simple changes ourselves. Straightforward people to work with.",
    name: "Cayrys",
    role: "Team, Cayrys",
    image: "/partners/cayrys.png",
    metric: "Faster, easier site",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-paper-deep/30 border border-stone-200/50 p-8 hover:border-stone-400/50 transition-colors duration-500"
    >
      {/* Metric label */}
      <div className="mb-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
        <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
        {t.metric}
      </div>

      {/* Quote */}
      <p className="text-stone-800 leading-relaxed mb-8 text-[15px]">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {t.image && (
          <div className="w-9 h-9 shrink-0 overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center">
            <img
              src={t.image}
              alt={`${t.name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink truncate">{t.name}</p>
          <p className="text-xs text-stone-500 truncate">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-16 sm:py-20 md:py-32 bg-paper"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Tagline */}
        <div className="mb-12 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm font-mono font-semibold tracking-[0.15em] uppercase text-ink/70 bg-ink/5 border border-ink/10 rounded px-4 py-2 inline-block"
          >
            Ship small. Fix fast. Don't ship garbage.
          </motion.p>
        </div>

        {/* Header */}
        <div ref={ref} className="mb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Testimonials
            </span>
            <h2
              id="testimonials-heading"
              className="mb-5 font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl"
            >
              Client results
            </h2>
            <p className="text-stone-500 leading-relaxed">
              What our partners say about working with us.
            </p>
          </motion.div>
        </div>

        {/* Cards , staggered grid with parallax */}
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.name} t={t} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
