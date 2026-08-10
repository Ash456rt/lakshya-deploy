"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  gradient?: string;
  onClick?: () => void;
}

export function BentoCard({
  title,
  description,
  icon,
  className,
  gradient = "from-blue-500/20 to-purple-500/20",
  onClick,
}: BentoCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative group overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 cursor-pointer",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          gradient
        )}
      />
      <div className="relative z-10 p-6 h-full flex flex-col">
        <div className="mb-4 text-4xl">{icon}</div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm flex-1">
          {description}
        </p>
        <motion.div
          className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400"
          initial={{ x: 0 }}
          animate={{ x: hovered ? 5 : 0 }}
        >
          Learn more
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
