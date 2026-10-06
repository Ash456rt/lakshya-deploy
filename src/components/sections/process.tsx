"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn your business, your customers, and your goals. No templates. No assumptions.",
    duration: "1-2 days",
  },
  {
    number: "02",
    title: "Strategy",
    description: "A clear roadmap with fixed scope, timeline, and pricing. You know exactly what you are getting.",
    duration: "3-5 days",
  },
  {
    number: "03",
    title: "Build",
    description: "We execute with weekly demos. You see progress in real time, not at the end.",
    duration: "2-12 weeks",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "We deploy, monitor, and maintain. One partner, ongoing, no handoff to a different team.",
    duration: "Ongoing",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Desktop turns the steps into a pinned horizontal rail. Anything else
  // (small screens, reduced motion) keeps the original vertical list.
  const [railMode, setRailMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setRailMode(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  useGSAP(
    () => {
      gsap.registerPlugin(useGSAP, ScrollTrigger);

      // Header reveal , shared by both layouts.
      gsap.from("[data-gsap='process-head']", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-gsap='process-head']",
          start: "top 88%",
          once: true,
        },
      });

      // Vertical list: each step rises as it reaches the viewport.
      if (!railMode) {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step, {
            y: 28,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 88%", once: true },
          });
        });
        return;
      }

      const rail = railRef.current;
      const track = trackRef.current;
      if (!rail || !track) return;

      const distance = () =>
        Math.max(0, track.scrollWidth - (rail.clientWidth - 48));

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.max(distance(), 1) + window.innerHeight * 0.4}`,
          scrub: 1,
          pin: rail,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Slide the steps across while the section is pinned.
      timeline.to(track, { x: () => -distance(), ease: "none" }, 0);

      // Draw the connector as the rail travels.
      if (progressRef.current) {
        timeline.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
          },
          0,
        );
      }

      // Gentle counter drift so the cards feel like they have depth.
      timeline.to(
        gsap.utils.toArray<HTMLElement>("[data-step]"),
        { y: -18, stagger: 0.08, ease: "none" },
        0,
      );
    },
    { scope: containerRef, dependencies: [railMode] },
  );

  return (
    <section
      ref={containerRef}
      id="process"
      className={cn(
        "relative bg-paper",
        railMode ? "overflow-hidden" : "py-16 sm:py-20 md:py-32",
      )}
    >
      <div
        ref={railRef}
        className={cn(
          railMode
            ? "mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-center px-6 py-28"
            : "mx-auto max-w-6xl px-6",
        )}
      >
        {/* Header */}
        <div
          data-gsap="process-head"
          className={cn("max-w-xl", railMode ? "mb-10" : "mb-12 md:mb-16")}
        >
          <span data-gsap="eyebrow" className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            Process
          </span>
          <h2 className="font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl">
            How we work
          </h2>
        </div>

        {/* Steps, vertical list or pinned horizontal rail */}
        <div>
          <div
            ref={trackRef}
            className={cn(
              "relative",
              railMode ? "flex gap-16 will-change-transform" : "space-y-16",
            )}
          >
            {/* Connector line , vertical for the list, horizontal for the rail */}
            {railMode ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-[19px] h-px w-full bg-stone-200/70"
              >
                <div
                  ref={progressRef}
                  className="h-full w-full origin-left scale-x-0 bg-accent/60"
                />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="absolute left-[19px] top-0 bottom-0 w-px bg-stone-200/70"
              >
                <motion.div
                  style={{ height: lineHeight }}
                  className="w-full bg-accent/60"
                />
              </div>
            )}
            {steps.map((step) => (
              <article
                key={step.number}
                data-step
                className={cn(
                  "relative flex gap-8",
                  railMode ? "w-[26rem] max-w-[80vw] shrink-0" : "",
                )}
              >
                {/* Step number */}
                <div className="relative z-10 shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center border border-stone-200 bg-paper">
                    <span className="font-mono text-xs text-accent">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1.5">
                  <div className="mb-2 flex items-baseline gap-3">
                    <h3 className="text-xl font-semibold text-ink">
                      {step.title}
                    </h3>
                    <span className="font-mono text-xs text-stone-500">
                      {step.duration}
                    </span>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-stone-500">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
