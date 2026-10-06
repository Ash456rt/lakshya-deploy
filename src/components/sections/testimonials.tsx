"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* Reviews are shown as the client's words only , no company names, no logos. */
const testimonials = [
  {
    id: "admission-season",
    quote:
      "As a tuition centre we get a lot of parent calls during admission season. The website Lakshya built answers most questions before people even ring us, and the enquiry form sends details straight to our inbox. It has honestly made admission season calmer.",
    metric: "Fewer missed enquiries",
  },
  {
    id: "mobile-first",
    quote:
      "We needed a site that works well on phones because most of our customers browse on mobile. Lakshya delivered that and kept the pricing clear from the start. When we asked for changes they were done in days, not weeks.",
    metric: "Mobile-first delivery",
  },
  {
    id: "communication",
    quote:
      "What stood out was the communication. We always knew what was being worked on and when it would be ready. The site looks professional and loads fast even on slow connections, which matters for our audience.",
    metric: "Clear communication",
  },
  {
    id: "reliable-support",
    quote:
      "Lakshya handled our website and follow-up support without drama. Small requests get fixed quickly and bigger ones get a proper estimate first. That reliability is why we keep coming back to them.",
    metric: "Reliable support",
  },
  {
    id: "faster-site",
    quote:
      "Our old website was slow and hard to update. The new one loads quickly, shows up better on Google, and the team showed us how to make simple changes ourselves. Straightforward people to work with.",
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
      className="group relative overflow-hidden bg-paper-deep/30 border border-stone-200/50 p-8 transition-colors duration-500 hover:border-stone-400/50"
    >
      {/* Decorative quote mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 right-5 select-none font-[family-name:var(--font-newsreader)] text-[7rem] leading-none text-accent/15"
      >
        &rdquo;
      </span>

      {/* Outcome label */}
      <div className="relative mb-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
        <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
        {t.metric}
      </div>

      {/* The review itself */}
      <p className="relative text-[15px] leading-relaxed text-stone-800">
        &ldquo;{t.quote}&rdquo;
      </p>
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
        <div className="mb-8 max-w-2xl sm:mb-10">
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
        <div ref={ref} className="mb-12 max-w-xl md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span data-gsap="eyebrow" className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Testimonials
            </span>
            <h2
              id="testimonials-heading"
              className="mb-5 font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl"
            >
              Client results
            </h2>
            <p className="text-stone-500 leading-relaxed">
              What our clients say about working with us. Worked with us?{" "}
              <a
                href="/reviews"
                className="text-brand-violet underline underline-offset-4 hover:text-brand-violet-light transition-colors"
              >
                Leave a review
              </a>{" "}
              — it takes two minutes.
            </p>
          </motion.div>
        </div>

        {/* Reviews , staggered grid with parallax */}
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.id} t={t} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
