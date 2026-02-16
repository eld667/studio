
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FadeIn } from "@/app/FadeIn";
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onExploreClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export function Hero({ onExploreClick, children }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tilt logic for the Core
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center min-h-screen pt-32 pb-48 overflow-hidden bg-black"
      style={{
        maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)'
      }}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* Atmospheric Background Halo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="container relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Typography Group */}
        <div className="space-y-6">
          <FadeIn>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] block mb-4">
              [ SYSTEM ARCHITECTS // 2026 ]
            </span>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-100 leading-[0.9]">
              Engineering Agentic Efficiency.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-[550px] mx-auto text-zinc-400 text-sm md:text-base leading-relaxed mt-6 font-normal">
              {children}
            </div>
          </FadeIn>
        </div>

        {/* The Eldwork Core (Interactive Dashboard) */}
        <FadeIn delay={0.4}>
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
            className="relative w-72 h-40 mt-12 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          >
            {/* Subtle Gradient Glow inside the core */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
            
            <div className="relative h-full p-6 flex flex-col justify-between text-left">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">System_Status</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-mono text-zinc-300 uppercase">Operational</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-4 h-0.5 bg-blue-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest italic">Intelligence_Metric</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tighter text-zinc-100">87%</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-tighter">Efficiency Gain</span>
                </div>
              </div>
            </div>

            {/* Scanning line animation inside the core */}
            <motion.div 
              className="absolute left-0 w-full h-px bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </FadeIn>

        {/* Primary Action Button */}
        <FadeIn delay={0.6}>
          <Button
            size="lg"
            onClick={onExploreClick}
            className="font-medium text-zinc-950 bg-zinc-100 hover:bg-white transition-all rounded-none px-10 h-12 uppercase text-[10px] tracking-widest mt-8 shadow-2xl"
          >
            Explore the Repository
          </Button>
        </FadeIn>
      </div>

      {/* Visual Scent Detail (Scroll Indicator) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 pointer-events-none opacity-40">
        <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-zinc-500">[ SCROLL TO DISCOVER ]</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
