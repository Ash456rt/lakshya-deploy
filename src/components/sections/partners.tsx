"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "Avans", src: "/partners/avans.webp?v=1" },
  { name: "First Zone", src: "/partners/first-zone.webp?v=1" },
  { name: "Saif Learn", src: "/partners/saif-learn.webp?v=1" },
  { name: "Sri Lakshmi", src: "/partners/sri-lakshmi.webp?v=1" },
  { name: "ZetPeak", src: "/partners/zetpeak.webp?v=1" },
  { name: "Cayrys", src: "/partners/cayrys.webp?v=1" },
  { name: "Bank", src: "/partners/bank.webp?v=1" },
];

export function Partners() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-16 bg-paper border-t border-b border-stone-200/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-[10px] font-medium tracking-[0.3em] uppercase text-stone-500 mb-10"
        >
          Trusted by teams across industries
        </motion.p>

        {/* Logo row , full color, no hover gimmicks */}
        <div className="flex items-center justify-center flex-wrap gap-x-8 md:gap-x-12 gap-y-6">
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
                className="h-9 md:h-11 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
