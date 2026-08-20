"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(245, 158, 11, 0.2)",
}: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        "relative group rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 overflow-hidden",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
