"use client";
import React from "react";
import Image from "next/image";
import { InfiniteSlider } from "@/components/core/infinite-slider";

const partners = [
  { src: "/partners/avans.png", name: "Avans", url: "" },
  { src: "/partners/bank.png", name: "Bank", url: "" },
  { src: "/partners/cayrys.png", name: "Cayrys", url: "" },
  {
    src: "/partners/first-zone.png",
    name: "First Zone",
    url: "https://firstzonemarketing.com",
  },
  { src: "/partners/saif-learn.png", name: "Saif Learn", url: "" },
  { src: "/partners/sri-lakshmi.png", name: "Sri Lakshmi", url: "" },
  { src: "/partners/zetpeak.png", name: "ZetPeak", url: "https://zetpeak.com" },
];

export function Partners() {
  return (
    <section className="relative py-24 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Tied Up{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            We collaborate with trusted organizations to deliver end-to-end
            solutions for our clients.
          </p>
        </div>
      </div>

      <InfiniteSlider
        gap={24}
        reverse
        duration={40}
        pauseOnHover
        className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        {partners.map((partner) => {
          const logo = (
            <Image
              src={partner.src}
              alt={`${partner.name} logo`}
              width={160}
              height={80}
              className="h-24 md:h-28 w-auto object-contain opacity-80 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            />
          );
          return (
            <div
              key={partner.name}
              className="flex items-center justify-center px-6"
            >
              {partner.url ? (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${partner.name} website`}
                  className="inline-block"
                >
                  {logo}
                </a>
              ) : (
                logo
              )}
            </div>
          );
        })}
      </InfiniteSlider>
    </section>
  );
}
