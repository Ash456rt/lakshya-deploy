"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const serviceDetails: {
  title: string;
  description: string;
  image: string;
  href?: string;
}[] = [
  {
    title: "App & Web Development",
    description:
      "Full-stack development services including mobile apps, web platforms, and custom software solutions built with modern technologies.",
    image: "/dev.jpg",
  },
  {
    title: "Strategic Consultancy",
    description:
      "Expert business consulting to optimize operations, digital transformation, and strategic growth planning.",
    image: "/consultancy.jpg",
  },
  {
    title: "Import & Export",
    description:
      "Global trade solutions connecting businesses across international markets with efficient supply chain management.",
    image: "/import-export.jpg",
  },
  {
    title: "Customer Support",
    description:
      "24/7 multilingual customer support solutions including call centers, help desks, and AI-powered chatbots.",
    image: "/support.jpg",
  },
  {
    title: "Transport & Logistics",
    description:
      "End-to-end logistics solutions including fleet management, warehousing, and last-mile delivery services.",
    image: "/transport.jpg",
  },
  {
    title: "Tours & Travel",
    description:
      "Premium travel experiences with curated tour packages, corporate travel solutions, and adventure tourism.",
    image: "/travel.jpg",
    href: "/travels/index.html#packages",
  },
  {
    title: "Lakshya Academy",
    description:
      "Professional training and certification programs in technology, business management, and skill development.",
    image: "/academy.jpg",
    href: "/lakshya-deploy/courses.html",
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" aria-labelledby="services-heading" className="relative py-24 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Left-aligned heading — breaks the centered pattern */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 id="services-heading" className="heading-section text-white mb-4">
              What We Do
            </h2>
            <p className="text-body max-w-lg">
              From technology to logistics, we offer end-to-end services designed
              to accelerate your business growth.
            </p>
          </motion.div>
          <div /> {/* spacer for alignment */}
        </div>

        {/* Service Cards with images — 2-col grid for visual density */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceDetails.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
            >
              {service.href ? (
                <a href={service.href} className="block group">
                  <ServiceCard service={service} />
                </a>
              ) : (
                <ServiceCard service={service} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: typeof serviceDetails[number] }) {
  return (
    <div className="card overflow-hidden group h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
      </div>
      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
}
