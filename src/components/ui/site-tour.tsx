"use client";

import React, { useEffect, useRef } from "react";
import { driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";

const STORAGE_KEY = "lakshya-tour-seen-v1";

function buildSteps(): DriveStep[] {
  return [
    {
      element: "#navbar-tour-target",
      popover: {
        title: "Everything in one place",
        description:
          "Lakshya Groups runs seven service divisions. Use the menu to jump to Services, our Company story, or the client portal.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#services",
      popover: {
        title: "Seven services under one roof",
        description:
          "From app & web development to logistics, import-export, support, travel, and training. Hover the stack to spread them all.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#process",
      popover: {
        title: "A process with no surprises",
        description:
          "Discovery, strategy, build, then launch and ongoing support. Weekly demos, fixed scope, clear pricing.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#stats",
      popover: {
        title: "Results you can measure",
        description:
          "300+ projects delivered, clients across 63 countries, and every service backed by one accountable team.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#testimonials",
      popover: {
        title: "What clients say",
        description:
          "Real partners across education, retail, and services describe what working with us is actually like.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#contact-tour-target",
      popover: {
        title: "Start with a free consultation",
        description:
          "Tell us about your project. One partner handles the rest. No commitment, no pushy sales.",
        side: "top",
        align: "center",
      },
    },
  ];
}

export function SiteTour() {
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);
  const initializedRef = useRef(false);

  const startTour = () => {
    if (!driverRef.current) return;
    driverRef.current.drive();
  };

  // Build the driver once and offer an auto-start the first time the
  // homepage is visited (skipped if the user has already taken the tour).
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    driverRef.current = driver({
      showProgress: true,
      showButtons: ["next", "previous", "close"],
      progressText: "{{current}} of {{total}}",
      nextBtnText: "Next",
      prevBtnText: "Back",
      doneBtnText: "Done",
      overlayColor: "rgba(24, 21, 16, 0.32)",
      stagePadding: 12,
      animate: true,
      onDestroyed: () => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* private mode; ignore */
        }
      },
    });

    let autoStarted = false;
    try {
      autoStarted = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      autoStarted = false;
    }

    // Wait for the page (fonts, images, layout) to settle before stepping.
    if (!autoStarted) {
      const t = window.setTimeout(() => startTour(), 1600);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, []);

  return (
    <button
      type="button"
      onClick={startTour}
      aria-label="Take a guided tour of this website"
      className="fixed bottom-6 left-6 z-[60] inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 bg-white/85 text-xs font-medium text-ink hover:border-accent/60 hover:bg-white backdrop-blur transition-colors duration-300 shadow-[0_18px_40px_-24px_rgba(32,28,22,0.5)]"
    >
      <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Take a tour
    </button>
  );
}
