"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  colors?: string[];
}

export function AnimatedGradient({
  className,
  colors = ["#0f172a", "#1e1b4b", "#0f172a"],
}: AnimatedGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(circle at 20% 50%, ${colors[0]}, transparent 50%)`,
            `radial-gradient(circle at 80% 50%, ${colors[1]}, transparent 50%)`,
            `radial-gradient(circle at 50% 20%, ${colors[2]}, transparent 50%)`,
            `radial-gradient(circle at 20% 50%, ${colors[0]}, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
