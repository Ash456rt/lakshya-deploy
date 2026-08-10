"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
  beamColor?: string;
}

export function BackgroundBeams({
  className,
  beamColor = "rgba(120, 119, 198, 0.3)",
}: BackgroundBeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawBeams = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 5) * i + Math.sin(time * 0.02 + i) * 50;
        ctx.beginPath();
        ctx.moveTo(0, y);

        for (let x = 0; x < canvas.width; x += 10) {
          const offset = Math.sin(x * 0.01 + time * 0.03 + i) * 20;
          ctx.lineTo(x, y + offset);
        }

        ctx.strokeStyle = beamColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      time++;
      animationId = requestAnimationFrame(drawBeams);
    };

    resize();
    drawBeams();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [beamColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
    />
  );
}
