
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
  
  // Mouse tilt logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

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
    >
      {/* Atmospheric Background Halo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="container relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Typography Group */}
        <div className="space-y-6 max-w-3xl">
          <FadeIn>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] block mb-4">
              AI-First Automation Agency
            </span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-100 leading-tight">
              We Don't Just Build Websites. <br /> We Craft Digital Solutions.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-[460px] mx-auto text-zinc-400 text-sm leading-relaxed">
              {children}
            </div>
          </FadeIn>
        </div>

        {/* Intelligence Core (Interactive Orb) */}
        <FadeIn delay={0.4}>
          <motion.div
            style={{
              rotateX,
              rotateY,
              perspective: 1000,
            }}
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative w-64 h-64 md:w-80 md:h-80 mt-8"
          >
            {/* The Orb Container */}
            <div className="absolute inset-0 rounded-full bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center">
              {/* Animated Conic Border */}
              <motion.div 
                className="absolute inset-[-2px] rounded-full opacity-40 blur-[1px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "conic-gradient(from 0deg at 50% 50%, #A855F7, #3B82F6, #10B981, #A855F7)"
                }}
              />
              <div className="absolute inset-[1px] rounded-full bg-zinc-950 z-10" />
              
              {/* Internal Depth & Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)] z-20" />
              <div className="absolute inset-0 backdrop-blur-2xl z-30" />
              
              {/* Core "Spark" */}
              <div className="relative z-40 w-1/3 h-1/3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 blur-sm animate-pulse" />
              </div>
            </div>
            
            {/* Soft Outer Halo Glow */}
            <div className="absolute inset-[-40px] rounded-full blur-[80px] bg-blue-500/10 -z-10" />
          </motion.div>
        </FadeIn>

        {/* Primary Action Button */}
        <FadeIn delay={0.6}>
          <Button
            size="lg"
            onClick={onExploreClick}
            className="font-medium text-zinc-950 bg-zinc-100 hover:bg-white transition-all rounded-none px-10 h-12 uppercase text-[10px] tracking-widest mt-4 shadow-2xl"
          >
            Explore Our Work
          </Button>
        </FadeIn>
      </div>

      {/* Visual Scent Detail (Scroll Indicator) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 pointer-events-none opacity-40">
        <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-zinc-500">[ SCROLL TO EXPLORE ]</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>

      {/* Black Hole Mask - Sinking Transition Effect */}
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}
