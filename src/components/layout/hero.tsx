"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/app/FadeIn";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  onExploreClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const services = [
  "ONLINE STORES",
  "AUTOMATIONS",
  "CHATBOTS",
  "SMART SYSTEMS",
  "WEB PLATFORMS"
];

// Find the longest service name for the measure span
const longestService = services.reduce((a, b) => a.length > b.length ? a : b, "");

export function Hero({ onExploreClick }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) {
    return (
      <section className="relative w-full flex flex-col items-start justify-center min-h-screen pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-black">
        <div className="container px-6 max-w-5xl mx-auto opacity-0" />
      </section>
    );
  }

  return (
    <section
      className="relative w-full flex flex-col items-start justify-center min-h-screen pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-black"
      style={{
        maskImage: 'linear-gradient(to bottom, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent)'
      }}
    >
      {/* Subtle Static Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* Radial Gradient Glow Behind Headline */}
      <div
        className="absolute z-[1] pointer-events-none"
        style={{
          top: '30%',
          left: '15%',
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse at 30% 50%, hsla(var(--brand) / 0.12) 0%, hsla(var(--brand) / 0.05) 40%, transparent 70%)',
        }}
      />

      <div className="container relative z-10 flex flex-col items-start gap-8 px-6 text-left max-w-5xl mx-auto">
        {/* Glass Panel Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full p-8 md:p-14 lg:p-20 rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-brand/10"
        >
          {/* 1. Underlying Base Glow (Static ambient light - Very subtle) */}
          <div className="absolute inset-0 z-0 bg-brand/5 blur-[120px] opacity-40" />

          {/* 2. Perimeter Light Orbs (These physically travel along the edges) */}
          <div className="absolute inset-[-4px] z-[1] rounded-[2.7rem] overflow-hidden pointer-events-none">
            {/* Orb 1: Brand Color (Starts Top-Left, traces perimeter clockwise) */}
            <motion.div
              animate={{
                left: ["0%", "100%", "100%", "0%", "0%"],
                top: ["0%", "0%", "100%", "100%", "0%"],
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              }}
              className="absolute w-[400px] h-[400px] bg-brand/90 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-90"
            />
            
            {/* Orb 2: Purple Color (Starts Bottom-Left, traces perimeter counter-clockwise) */}
            <motion.div
              animate={{
                left: ["0%", "100%", "100%", "0%", "0%"],
                top: ["100%", "100%", "0%", "0%", "100%"],
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
              className="absolute w-[400px] h-[400px] bg-[#cf30aa]/90 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-80"
            />
          </div>

          {/* 3. The Solid Glass Mask - OPAQUE enough to keep text perfectly readable and isolate the glow to the edges */}
          <div className="absolute inset-[2px] z-[2] bg-[#070709]/95 backdrop-blur-3xl rounded-[2.4rem] shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]" />
          
          {/* 4. Noise Texture for "Frozen" effect */}
          <div className="absolute inset-[2px] z-[2] opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay rounded-[2.4rem]" />

          {/* 5. Solid base border to define the glass shape */}
          <div className="absolute inset-[2px] z-[3] rounded-[2.4rem] border border-white/[0.08] pointer-events-none" />


          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col items-start gap-8">
            {/* Tagline */}
            <FadeIn>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-8 bg-brand/50" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.4em] block">
                  [ BUILT FOR YOUR GROWTH ]
                </span>
                <Sparkles className="w-3 h-3 text-brand/60 animate-pulse" />
              </div>
            </FadeIn>

            {/* Headline with Seamless Kinetic Typography */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-100 leading-[1.1] uppercase flex flex-col items-start">
              <span className="flex flex-col items-start justify-start w-full gap-y-2 lg:gap-y-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">WE BUILD</span>
                <span className="relative inline-flex h-[1.1em] md:h-auto leading-none text-left min-w-[280px] md:min-w-[400px]">
                  {/* Hidden measure span */}
                  <span className="invisible whitespace-nowrap" aria-hidden="true">
                    {longestService}
                  </span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10, filter: "blur(12px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(12px)" }}
                      transition={{
                        duration: 0.3,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                      className="absolute left-0 top-0 inline-flex text-brand whitespace-nowrap drop-shadow-[0_0_15px_hsla(var(--brand)/0.3)]"
                    >
                      {services[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
              <span className="mt-2 md:mt-4 text-zinc-400">TAILORED TO YOUR NEEDS.</span>
            </h1>

            {/* Sales-Driven Subtext */}
            <FadeIn delay={0.5}>
              <p className="max-w-[650px] text-zinc-400 text-base md:text-lg lg:text-xl leading-relaxed font-normal text-center md:text-left mx-auto md:mx-0">
                We engineer exactly what your business needs to grow, <span className="text-zinc-200">designed for performance</span> and built to scale.
              </p>
            </FadeIn>

            {/* Primary + Secondary Action Buttons */}
            <FadeIn delay={0.8} className="w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-4 w-full sm:w-auto">
                <Button
                  onClick={() => {
                    const element = document.getElementById('work');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-brand text-white hover:bg-brand/90 rounded-full h-12 px-6 sm:h-14 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.2em] font-bold w-full sm:w-auto transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand/20 border-none"
                >
                  Flagship Operations <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <Link href="/portfolio" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="border-white/10 text-zinc-400 hover:text-white hover:border-white/20 bg-white/5 backdrop-blur-sm rounded-full h-12 px-6 sm:h-14 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.2em] w-full transition-all"
                  >
                    View Full Repository
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </motion.div>
      </div>

      {/* Visual Scent (Scroll Indicator) */}
      <div className="absolute bottom-12 left-6 md:left-12 flex flex-col items-start gap-4 z-30 pointer-events-none opacity-40">
        <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-zinc-500">[ SCROLL TO DISCOVER ]</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
