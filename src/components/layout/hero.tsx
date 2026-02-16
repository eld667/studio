
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
  "Web Platforms",
  "Data Pipelines",
  "AI Automations",
  "Agentic Systems"
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
            [ SYSTEM ARCHITECTS // 2026 ]
          </span>
        </FadeIn>

        {/* Headline with Rotating Engine */}
        <div className="relative">
          <h1 className="text-2xl md:text-4xl font-medium tracking-tighter text-zinc-100 leading-tight uppercase max-w-4xl">
            We engineer high-performance{" "}
            <span className="relative inline-block h-[1em] min-w-[180px] md:min-w-[320px] text-blue-500 align-bottom overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="absolute left-0 w-full"
                >
                  {services[index]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            <br className="hidden md:block" />
            for modern enterprises.
          </h1>
        </div>

        {/* Direct Response Subtext */}
        <FadeIn delay={0.5}>
          <div className="max-w-[500px] text-zinc-400 text-[14px] leading-relaxed mt-2 font-normal">
            Transforming operational complexity into automated digital infrastructure. We maximize intelligence density while minimizing overhead.
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
