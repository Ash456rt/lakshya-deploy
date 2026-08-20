"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      type={type}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 font-medium text-sm text-white bg-amber-600 rounded-full overflow-hidden transition-all hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/25",
        className
      )}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <span className="relative z-10">{children}</span>

    </motion.button>
  );
}
