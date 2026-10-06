"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Page-level scroll choreography:
 *  - a hairline progress bar that scrubs with the page
 *  - section eyebrows whose tracking tightens as they scroll into place
 *
 * Everything here is scrub-driven and skipped entirely when the visitor
 * prefers reduced motion.
 */
export function ScrollChoreography() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    }

    gsap.utils.toArray<HTMLElement>("[data-gsap='eyebrow']").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0.3, letterSpacing: "0.34em" },
        {
          opacity: 1,
          letterSpacing: "0.22em",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 94%",
            end: "top 68%",
            scrub: true,
          },
        },
      );
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px]"
    >
      <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}