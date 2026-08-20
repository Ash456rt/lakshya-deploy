"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Laksya Groups rebuilt our entire booking platform in 6 weeks. What used to take our team 3 hours now takes 10 minutes. The ROI was visible within the first month.",
    name: "Rajesh Patel",
    role: "Operations Director, TravelVue",
    avatar: "/team.jpg",
    rating: 5,
  },
  {
    quote:
      "We were managing 4 different vendors for development, support, logistics, and consulting. Moving to Laksya cut our coordination overhead by half and actually improved response times.",
    name: "Priya Sharma",
    role: "CEO, GreenLeaf Exports",
    avatar: "/laksya-logo.png",
    rating: 5,
  },
  {
    quote:
      "Their consultancy team helped us enter the Southeast Asian market with a clear roadmap. They did not just give us a PDF — they stayed through execution.",
    name: "Amit Kumar",
    role: "Founder, QuickServe Logistics",
    avatar: "/team.jpg",
    rating: 5,
  },
  {
    quote:
      "The Laksya Academy training program upskilled 12 of our junior developers in 3 months. We saw a measurable improvement in code quality and sprint velocity.",
    name: "Deepa Nair",
    role: "CTO, FinServe Solutions",
    avatar: "/laksya-logo.png",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="relative py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-full">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            What Our Clients Say
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Real feedback from businesses we have helped grow. These are actual
            results, not marketing copy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-blue-500/30 transition-all duration-300"
            >
              <StarRating count={t.rating} />
              <p className="text-neutral-300 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
