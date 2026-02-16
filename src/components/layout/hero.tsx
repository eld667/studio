
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
  "ONLINE STORES",
  "AUTOMATIONS",
  "CHATBOTS",
  "SMART SYSTEMS"
];

export function Hero({ onExploreClick }: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="relative w-full flex flex-col items-start justify-center min-h-screen pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-black"
      style={{
        maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)'
      }}
    >
      {/* 1. Subtle Static Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="container relative z-10 flex flex-col items-start gap-8 px-6 text-left max-w-5xl mx-auto">
        {/* Tagline */}
        <FadeIn>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] block mb-4">
            [ BUILT FOR YOUR GROWTH ]
          </span>
        </FadeIn>

        {/* Headline with Blueprint Layout */}
        <h1 className="text-3xl md:text-5xl font-medium tracking-tighter text-zinc-100 leading-tight flex flex-col items-start">
          <div className="flex flex-wrap items-center">
            <span className="lowercase">we build</span>
            <span className="relative inline-block h-[1.4em] min-w-[200px] md:min-w-[280px] border border-zinc-800 bg-zinc-900/50 rounded px-3 py-1 mx-2 overflow-hidden align-middle">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                  transition={{ 
                    duration: 0.15, 
                    ease: "easeOut" 
                  }}
                  className="absolute left-0 w-full text-center text-blue-400 font-mono uppercase whitespace-nowrap"
                >
                  {services[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
          <span className="lowercase mt-2">tailored to your needs.</span>
        </h1>

        {/* Sales-Driven Subtext */}
        <FadeIn delay={0.5}>
          <div className="max-w-[550px] text-zinc-400 text-sm md:text-base leading-relaxed mt-2 font-normal">
            High-performance digital solutions engineered for growth and designed to stick.
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
      <div className="absolute bottom-12 left-6 md:left-12 flex flex-col items-start gap-4 z-30 pointer-events-none opacity-40">
        <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-zinc-500">[ SCROLL TO DISCOVER ]</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
