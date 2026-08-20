"use client";
import React, { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface AmberParticlesProps {
  className?: string;
  particleCount?: number;
  speed?: number;
  mouseRadius?: number;
  mouseForce?: number;
  connectionDistance?: number;
  showConnections?: boolean;
}

/**
 * Stunning amber particle field — lightweight Canvas-based alternative
 * to heavy WebGL effects. Particles drift, connect, and respond to mouse.
 *
 * Inspired by WebGPU showcase effects but implemented with pure Canvas
 * for maximum compatibility and performance.
 */
export default function AmberParticles({
  className = "",
  particleCount = 80,
  speed = 0.3,
  mouseRadius = 150,
  mouseForce = 0.02,
  connectionDistance = 120,
  showConnections = true,
}: AmberParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          hue: 35 + Math.random() * 15, // warm amber range (35-50)
          life: Math.random() * 200,
          maxLife: 200 + Math.random() * 300,
        });
      }
      particlesRef.current = particles;
    },
    [particleCount, speed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    initParticles(width, height);

    const handleResize = () => {
      setCanvasSize();
      // Re-scatter particles on resize
      particlesRef.current.forEach((p) => {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          p.vx -= (dx / dist) * force * mouseForce;
          p.vy -= (dy / dist) * force * mouseForce;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Life cycle — gentle fade in/out
        p.life += 1;
        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = lifeRatio > 0.8 ? 1 - (lifeRatio - 0.8) * 5 : 1;
        p.opacity = (Math.sin(p.life * 0.02) * 0.15 + 0.35) * fadeIn * fadeOut;

        // Reset particle when life ends or goes off screen
        if (
          p.life >= p.maxLife ||
          p.x < -50 ||
          p.x > width + 50 ||
          p.y < -50 ||
          p.y > height + 50
        ) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.vx = (Math.random() - 0.5) * speed;
          p.vy = (Math.random() - 0.5) * speed;
          p.life = 0;
          p.maxLife = 200 + Math.random() * 300;
        }

        // Draw particle — warm amber glow
        const glowSize = p.size * 3;
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          glowSize
        );
        gradient.addColorStop(
          0,
          `hsla(${p.hue}, 90%, 60%, ${p.opacity})`
        );
        gradient.addColorStop(
          0.4,
          `hsla(${p.hue}, 80%, 50%, ${p.opacity * 0.4})`
        );
        gradient.addColorStop(
          1,
          `hsla(${p.hue}, 70%, 40%, 0)`
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 75%, ${p.opacity * 1.2})`;
        ctx.fill();
      }

      // Draw connections between nearby particles
      if (showConnections) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const alpha =
                (1 - dist / connectionDistance) *
                Math.min(a.opacity, b.opacity) *
                0.3;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `hsla(40, 80%, 55%, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles, mouseRadius, mouseForce, speed, connectionDistance, showConnections]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
}
