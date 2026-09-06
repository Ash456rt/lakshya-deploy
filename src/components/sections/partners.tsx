"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "Avans", src: "/partners/avans.png" },
  { name: "First Zone", src: "/partners/first-zone.png" },
  { name: "Saif Learn", src: "/partners/saif-learn.png" },
  { name: "Sri Lakshmi", src: "/partners/sri-lakshmi.png" },
  { name: "ZetPeak", src: "/partners/zetpeak.png" },
  { name: "Cayrys", src: "/partners/cayrys.png" },
  { name: "Bank", src: "/partners/bank.png" },
];

export function Partners() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-16 bg-[#030712] border-t border-b border-zinc-800/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-[10px] font-medium tracking-[0.3em] uppercase text-zinc-600 mb-10"
        >
          Trusted by teams across industries
        </motion.p>

        {/* Logo row — monochrome, low opacity, like Stripe/Vercel */}
        <div className="flex items-center justify-center flex-wrap gap-x-12 gap-y-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex items-center justify-center"
            >
              <img
                src={partner.src}
                alt={`${partner.name} logo`}
                className="h-8 md:h-10 w-auto object-contain opacity-30 hover:opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
