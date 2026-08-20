"use client";
import React, { useRef, useEffect } from "react";

interface NoiseMeshProps {
  className?: string;
}

/**
 * Stunning animated noise mesh — WebGL-powered flowing gradient effect
 * using raw Canvas 2D for maximum compatibility.
 *
 * Creates a living, breathing background of warm amber tones that
 * subtly shift and flow, inspired by WebGPU showcase aesthetics.
 */
export default function NoiseMesh({ className = "" }: NoiseMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number;
    let height: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    // Simplex-like noise function (fast, no dependencies)
    const noise = (x: number, y: number, t: number): number => {
      const s1 = Math.sin(x * 0.8 + t * 0.3) * Math.cos(y * 0.6 - t * 0.2);
      const s2 =
        Math.sin(x * 1.2 - t * 0.5) * Math.cos(y * 0.9 + t * 0.4);
      const s3 =
        Math.sin((x + y) * 0.5 + t * 0.2) *
        Math.cos((x - y) * 0.3 - t * 0.15);
      return (s1 + s2 + s3) / 3;
    };

    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;

      // Draw flowing mesh gradient
      const resolution = 6; // pixel size for performance
      const cols = Math.ceil(width / resolution);
      const rows = Math.ceil(height / resolution);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i / cols) * 4;
          const y = (j / rows) * 4;

          const n = noise(x, y, t);
          const n2 = noise(x * 2 + 10, y * 2 + 10, t * 0.7);

          // Map noise to warm amber palette
          const intensity = (n + 1) * 0.5; // 0-1
          const warmth = (n2 + 1) * 0.5;

          const r = Math.floor(3 + intensity * 25 + warmth * 10);
          const g = Math.floor(7 + intensity * 18 + warmth * 8);
          const b = Math.floor(18 + intensity * 8);

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(
            i * resolution,
            j * resolution,
            resolution + 1,
            resolution + 1
          );
        }
      }

      // Overlay radial gradient for depth
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.5,
        width * 0.6
      );
      gradient.addColorStop(0, "rgba(245, 158, 11, 0.04)");
      gradient.addColorStop(0.5, "rgba(245, 158, 11, 0.02)");
      gradient.addColorStop(1, "rgba(3, 7, 18, 0.3)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle vignette
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        width * 0.2,
        width * 0.5,
        height * 0.5,
        width * 0.7
      );
      vignette.addColorStop(0, "rgba(3, 7, 18, 0)");
      vignette.addColorStop(1, "rgba(3, 7, 18, 0.4)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}
