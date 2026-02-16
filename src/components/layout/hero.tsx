
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/app/FadeIn";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onExploreClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const services = [
  "Online Stores",
  "Booking Systems",
  "Lead Generators",
  "Customer Portals",
  "Auto-Reply Bots"
];

export function Hero({ onExploreClick }: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="relative w-full flex flex-col items-center md:items-start justify-center min-h-screen pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-black"
      style={{
        maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)'
      }}
    >
      {/* 1. Subtle Static Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="container relative z-10 flex flex-col items-center md:items-start gap-8 px-6 text-center md:text-left max-w-5xl mx-auto">
        {/* Tagline */}
        <FadeIn>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] block mb-4">
            [ BUILT FOR YOUR GROWTH ]
          </span>
        </FadeIn>

        {/* Headline with Stabilized Slot Engine */}
        <div className="relative w-full">
          <h1 className="text-2xl md:text-4xl font-medium tracking-tighter text-zinc-100 leading-tight uppercase max-w-4xl flex flex-row flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-4">
            <span className="whitespace-nowrap">We build</span>
            <span className="relative inline-block h-[1.4em] min-w-[180px] md:min-w-[240px] border border-white/10 bg-white/5 rounded-md px-2 py-1 text-center overflow-hidden align-middle">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 0.2, 
                    ease: "easeOut" 
                  }}
                  className="absolute left-0 w-full text-blue-400"
                >
                  {services[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="whitespace-nowrap">that grow your business.</span>
          </h1>
        </div>

        {/* Sales-Driven Subtext */}
        <FadeIn delay={0.5}>
          <div className="max-w-[500px] text-zinc-400 text-sm md:text-base leading-relaxed mt-2 font-normal">
            We build exactly what your business needs to grow, engineered for performance and designed to stick.
          </div>
        </FadeIn>

        {/* Primary Action Button */}
        <FadeIn delay={0.8}>
          <Button
            size="lg"
            onClick={onExploreClick}
            className="font-medium text-zinc-950 bg-zinc-100 hover:bg-white transition-all rounded-none px-10 h-12 uppercase text-[10px] tracking-widest mt-4 shadow-2xl"
          >
            Explore the Repository
          </Button>
        </FadeIn>
      </div>

      {/* Visual Scent (Scroll Indicator) */}
      <div className="absolute bottom-12 left-1/2 md:left-12 md:translate-x-0 -translate-x-1/2 flex flex-col items-center md:items-start gap-4 z-30 pointer-events-none opacity-40">
        <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-zinc-500">[ SCROLL TO DISCOVER ]</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
