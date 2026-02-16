
"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/app/FadeIn";
import React from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onExploreClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export function Hero({ onExploreClick, children }: HeroProps) {
  const headline = "ENGINEERING EFFICIENCY";
  const letters = headline.split("");

  return (
    <section 
      className="relative w-full flex flex-col items-center justify-center min-h-screen pt-32 pb-48 overflow-hidden bg-black"
      style={{
        maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)'
      }}
    >
      {/* 1. Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 2. Background Beams */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            x: [-100, 100, -100]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[150%] h-[300px] bg-blue-500/10 blur-[120px] rotate-12"
        />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            x: [100, -100, 100]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-1/4 w-[150%] h-[200px] bg-purple-500/5 blur-[100px] -rotate-12"
        />
      </div>

      <div className="container relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Tagline */}
        <FadeIn>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] block mb-4">
            [ SYSTEM ARCHITECTS // 2026 ]
          </span>
        </FadeIn>

        {/* Kinetic Headline */}
        <div className="relative">
          <h1 className="flex flex-wrap justify-center text-5xl md:text-8xl font-medium tracking-tighter text-zinc-100 leading-[0.9] uppercase relative z-10">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
          
          {/* Silver Shimmer Effect */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
            style={{ mixBlendMode: 'plus-lighter' }}
          >
            <motion.div 
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Subtext */}
        <FadeIn delay={1.5}>
          <div className="max-w-[550px] mx-auto text-zinc-400 text-sm md:text-base leading-relaxed mt-6 font-normal">
            {children}
          </div>
        </FadeIn>

        {/* 3. The Monolith */}
        <FadeIn delay={2}>
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mt-12 w-32 h-64 bg-zinc-950/20 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_0_40px_rgba(59,130,246,0.1)] flex items-center justify-center"
          >
            <div className="w-px h-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent opacity-20" />
          </motion.div>
        </FadeIn>

        {/* Primary Action Button */}
        <FadeIn delay={2.5}>
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
