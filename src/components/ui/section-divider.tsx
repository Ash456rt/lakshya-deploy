"use client";
import React from "react";

/**
 * Subtle gradient transition between sections.
 * Place between two sections to create visual flow.
 */
export function SectionDivider({
  from = "bg-neutral-950",
  to = "bg-neutral-900",
}: {
  from?: string;
  to?: string;
}) {
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent ${from}`}
      aria-hidden="true"
    />
  );
}
