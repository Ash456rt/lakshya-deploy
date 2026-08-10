"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  duration?: number;
  as?: "h1" | "h2" | "div";
}

export function TextGenerateEffect({
  words,
  className,
  duration = 0.5,
  as = "div",
}: TextGenerateEffectProps) {
  const wordsArray = words.split(" ");

  const variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1, duration: duration * 0.5 },
    }),
  };

  const Tag = as === "h1" ? motion.h1 : as === "h2" ? motion.h2 : motion.div;

  return (
    <Tag
      className={cn("font-bold", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.span variants={variants} custom={-1} className="opacity-0">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={idx}
            className="inline-block"
            variants={variants}
            custom={idx}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
