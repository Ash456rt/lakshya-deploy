"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CircularGallery from "@/components/ui/circular-gallery";
import ParticleText from "@/components/ui/particle-text";
import { Spotlight } from "@/components/ui/spotlight";

const serviceItems = [
  { image: "/dev.jpg", text: "App & Web Development" },
  { image: "/consultancy.jpg", text: "Strategic Consultancy" },
  { image: "/import-export.jpg", text: "Import & Export" },
  { image: "/support.jpg", text: "Customer Support" },
  { image: "/transport.jpg", text: "Transport & Logistics" },
  { image: "/travel.jpg", text: "Tours & Travel" },
  { image: "/academy.jpg", text: "Lakshya Academy" },
];

const serviceDetails: {
  title: string;
  description: string;
  href?: string;
}[] = [
  {
    title: "App & Web Development",
    description:
      "Full-stack development services including mobile apps, web platforms, and custom software solutions built with modern technologies.",
  },
  {
    title: "Strategic Consultancy",
    description:
      "Expert business consulting to optimize operations, digital transformation, and strategic growth planning.",
  },
  {
    title: "Import & Export",
    description:
      "Global trade solutions connecting businesses across international markets with efficient supply chain management.",
  },
  {
    title: "Customer Support",
    description:
      "24/7 multilingual customer support solutions including call centers, help desks, and AI-powered chatbots.",
  },
  {
    title: "Transport & Logistics",
    description:
      "End-to-end logistics solutions including fleet management, warehousing, and last-mile delivery services.",
  },
  {
    title: "Tours & Travel",
    description:
      "Premium travel experiences with curated tour packages, corporate travel solutions, and adventure tourism.",
    href: "/travels/index.html#packages",
  },
  {
    title: "Lakshya Academy",
    description:
      "Professional training and certification programs in technology, business management, and skill development.",
    href: "/lakshya-deploy/courses.html",
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" aria-labelledby="services-heading" className="relative py-32 bg-neutral-950 overflow-hidden">
      <Spotlight
        className="absolute inset-0 pointer-events-none"
        spotlightColor="rgba(59, 130, 246, 0.1)"
        spotlightSize={800}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full">
            Our Services
          </span>
          
          <h2 id="services-heading" className="sr-only">Our Services</h2>
          {/* Particle Text for Services */}
          <div style={{ width: '100%', height: 150, background: 'transparent', marginBottom: '1rem' }}>
            <ParticleText
              text="WHAT WE DO"
              particleSize={2.2}
              density={4}
              color="#ffffff"
              highlightColor="#8b5cf6"
              scatter={160}
              gatherDuration={1700}
              stagger={380}
              pointerRepel={35}
              repelRadius={110}
              idleDrift={0.6}
              trigger="mount"
              fontSize="clamp(2.5rem, 10vw, 6rem)"
              fontWeight={900}
              glow={true}
            />
          </div>
          
          <p className="text-neutral-400 max-w-2xl mx-auto">
            From technology to logistics, we offer end-to-end services designed
            to accelerate your business growth. Scroll or drag to explore.
          </p>
        </motion.div>

        {/* CircularGallery 3D Scrolling Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ height: 550, position: 'relative' }}
        >
          <CircularGallery
            items={serviceItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.08}
            scrollSpeed={2}
            scrollEase={0.05}
            font="bold 28px Figtree"
          />
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {serviceDetails.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <div className="relative group overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6 h-full hover:border-blue-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  {service.href ? (
                    <a
                      href={service.href}
                      className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
