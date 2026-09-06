"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { LayeredStack } from "@/components/ui/layered-stack";

const serviceDetails: {
  title: string;
  description: string;
  image: string;
  href?: string;
}[] = [
  {
    title: "App & Web Development",
    description:
      "Full-stack development - mobile apps, web platforms, and custom software built with modern technologies.",
    image: "/dev.webp",
  },
  {
    title: "Strategic Consultancy",
    description:
      "Expert business consulting to optimize operations, digital transformation, and growth planning.",
    image: "/consultancy.webp",
  },
  {
    title: "Import & Export",
    description:
      "Global trade solutions connecting businesses across international markets with efficient supply chains.",
    image: "/import-export.webp",
  },
  {
    title: "Customer Support",
    description:
      "24/7 multilingual customer support including call centers, help desks, and AI-powered chatbots.",
    image: "/support.webp",
  },
  {
    title: "Transport & Logistics",
    description:
      "End-to-end logistics - fleet management, warehousing, and last-mile delivery services.",
    image: "/transport.webp",
  },
  {
    title: "Tours & Travel",
    description:
      "Premium travel experiences with curated tour packages and corporate travel solutions.",
    image: "/travel.webp",
    href: "/travels/",
  },
  {
    title: "Lakshya Academy",
    description:
      "Professional training and certification programs in technology and business management.",
    image: "/academy.webp",
    href: "/lakshya-deploy/",
  },
];

function ServiceCard({ service }: { service: (typeof serviceDetails)[number] }) {
  const card = (
    <div className="group/card relative h-44 overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-amber-400/50">
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 240px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="text-sm font-semibold text-white group-hover/card:text-amber-300 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="mt-1 max-h-0 overflow-hidden text-xs leading-relaxed text-zinc-400 opacity-0 transition-all duration-300 group-hover/card:max-h-16 group-hover/card:opacity-100">
          {service.description}
        </p>
      </div>
    </div>
  );

  return service.href ? (
    <a href={service.href} className="block">
      {card}
    </a>
  ) : (
    <div className="block">{card}</div>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-[#030712] py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Header + service index — left */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-amber-500/60">
                Services
              </span>
              <h2
                id="services-heading"
                className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl"
              >
                What We Do
              </h2>
              <p className="leading-relaxed text-zinc-500">
                From technology to logistics, end-to-end services designed
                to accelerate your business growth.
              </p>
            </motion.div>

            <ul className="mt-10 space-y-3 border-t border-zinc-800/60 pt-6">
              {serviceDetails.map((service, index) => (
                <motion.li
                  key={service.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.06 }}
                  className="flex items-baseline gap-4 text-sm"
                >
                  <span className="text-[10px] font-medium tabular-nums text-amber-500/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-zinc-300">{service.title}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Interactive layered stack — right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LayeredStack className="mx-auto grid w-full max-w-xl grid-cols-2 gap-5 md:grid-cols-3">
              {serviceDetails.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </LayeredStack>
            <p className="mt-8 text-center text-xs text-zinc-600">
              Hover the stack to spread all seven services
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
