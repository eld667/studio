
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/app/FadeIn";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full flex flex-col items-start justify-center min-h-screen pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-black"
      style={{
        maskImage: 'linear-gradient(to bottom, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent)'
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
          background: 'radial-gradient(ellipse at 30% 50%, hsla(var(--brand) / 0.08) 0%, hsla(var(--brand) / 0.03) 40%, transparent 70%)',
        }}
      />

      <div className="container relative z-10 flex flex-col items-start gap-8 px-6 text-left max-w-5xl mx-auto">
        {/* Tagline */}
        <FadeIn>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] block mb-4">
            [ BUILT FOR YOUR GROWTH ]
          </span>
        </FadeIn>

        {/* Headline with Seamless Kinetic Typography */}
        <h1 className="text-3xl md:text-5xl font-medium tracking-tighter text-zinc-100 leading-tight uppercase flex flex-col items-start">
          <div className="flex flex-row items-baseline justify-start gap-x-2 w-full">
            <span>WE BUILD</span>
            <div className="relative inline-flex h-auto leading-none text-left">
              {/* Hidden measure span that sizes the container to the longest word */}
              <span className="invisible whitespace-nowrap" aria-hidden="true">
                {longestService}
              </span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 2, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -2, filter: "blur(8px)" }}
                  transition={{
                    duration: 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute left-0 top-0 inline-flex text-brand whitespace-nowrap"
                >
                  {services[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <span>TAILORED TO YOUR NEEDS.</span>
        </h1>

        {/* Sales-Driven Subtext */}
        <FadeIn delay={0.5}>
          <div className="max-w-[550px] text-zinc-400 text-sm md:text-base leading-relaxed mt-2 font-normal">
            We build exactly what your business needs to grow, engineered for performance and designed to stick.
          </div>
        </FadeIn>

        {/* Primary + Secondary Action Buttons */}
        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
            <Button
              onClick={() => {
                const element = document.getElementById('flagship');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-zinc-100 text-black hover:bg-white rounded-none h-12 px-8 uppercase text-xs tracking-[0.2em] font-medium w-full sm:w-auto"
            >
              Flagship Operations <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-transparent rounded-none h-12 px-8 uppercase text-xs tracking-[0.2em] w-full sm:w-auto"
              onClick={() => window.location.href = '/portfolio'}
            >
              View Full Repository
            </Button>
          </div>
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
