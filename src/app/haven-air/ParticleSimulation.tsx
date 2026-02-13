
"use client";

import React, { useRef, useEffect } from 'react';
import { MotionValue, useTransform } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'dirty' | 'clean';
}

export function ParticleSimulation({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const density = useTransform(scrollProgress, [0, 0.8], [1, 0.01]);
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number>(0);

  const initParticles = (width: number, height: number) => {
    const count = 400;
    const p: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const isDirty = Math.random() > 0.3;
      p.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        color: isDirty ? 'rgba(120, 113, 108, 0.3)' : 'rgba(20, 184, 166, 0.4)',
        type: isDirty ? 'dirty' : 'clean',
      });
    }
    particles.current = p;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentDensity = density.get();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.current.forEach((p) => {
        // Only show dirty particles if density allows
        if (p.type === 'dirty' && Math.random() > currentDensity * 1.5) {
          return;
        }

        // Physics: Sucked into purifier
        if (p.type === 'dirty') {
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            p.vx += dx * 0.001;
            p.vy += dy * 0.001;
          }
        } else {
          // Clean air flows out calmly
          p.vy -= 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrame.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [density]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
}
