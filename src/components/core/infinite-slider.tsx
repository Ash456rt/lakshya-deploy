"use client";
import {
  animate,
  motion,
  useMotionValue,
  type AnimationPlaybackControls,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  duration?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  direction = "horizontal",
  reverse = false,
  pauseOnHover = false,
  className,
}: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const [loopDistance, setLoopDistance] = useState(0);
  const translation = useMotionValue(0);

  // children are rendered twice; measure half the track to know the loop distance
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const full = direction === "horizontal" ? el.scrollWidth : el.scrollHeight;
      setLoopDistance(full / 2 + gap / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [direction, gap, children]);

  useEffect(() => {
    if (loopDistance <= 0) return;
    const from = reverse ? -loopDistance : 0;
    const to = reverse ? 0 : -loopDistance;
    const controls = animate(translation, [from, to], {
      ease: "linear",
      duration,
      repeat: Infinity,
      repeatType: "loop",
    });
    controlsRef.current = controls;
    return () => {
      controls.stop();
      controlsRef.current = null;
    };
  }, [loopDistance, reverse, duration, translation]);

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => {
        if (pauseOnHover) controlsRef.current?.pause();
      }}
      onMouseLeave={() => {
        if (pauseOnHover) controlsRef.current?.play();
      }}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max"
        style={{
          x: direction === "horizontal" ? translation : undefined,
          y: direction === "vertical" ? translation : undefined,
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
