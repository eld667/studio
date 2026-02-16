
"use client";

import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Zap, Layers, ShieldCheck, ArrowRight, Download } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CapabilityProps {
  id: string;
  index: number;
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const capabilities: CapabilityProps[] = [
  {
    id: "performance",
    index: 0,
    label: "CAPABILITY_INDEX_01",
    title: "Performance Engineering",
    description: "Stop losing users to millisecond delays. We optimize the critical rendering path to ensure your product feels instantaneous, regardless of data complexity.",
    icon: Zap
  },
  {
    id: "design",
    index: 1,
    label: "CAPABILITY_INDEX_02",
    title: "Scalable Design Systems",
    description: "Design that grows with you. We build atomic, component-based systems that allow your team to ship new features in hours, not weeks.",
    icon: Layers
  },
  {
    id: "integrity",
    index: 2,
    label: "CAPABILITY_INDEX_03",
    title: "Technical Integrity",
    description: "Clean code isn’t a luxury; it’s a requirement. Our stack is built on type-safety, rigorous testing, and future-proof documentation.",
    icon: ShieldCheck
  }
];

const CapabilityCard = ({ capability }: { capability: CapabilityProps }) => {
  const Icon = capability.icon;
  const descriptionId = `desc-${capability.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: capability.index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#111111] p-8 flex flex-col justify-between transition-colors duration-300 hover:bg-[#161616] aspect-auto md:aspect-square"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Icon className="w-5 h-5 text-[#007AFF] transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute -inset-1 bg-[#007AFF]/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          </div>
          <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest transition-colors duration-300 group-hover:text-white/90">
            {capability.label}
          </span>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium tracking-tight text-white">
            {capability.title}
          </h3>
          <p id={descriptionId} className="text-sm leading-relaxed text-white/50">
            {capability.description}
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 font-mono text-[9px] text-white/10 uppercase tracking-tighter">
        SYSTEMS_ARCHITECTURE • VERIFIED_OUTPUT
      </div>
    </motion.div>
  );
};

export function EldworkStandard() {
  return (
    <section id="philosophy" className="w-full py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Decoration Layer 01: Corner Brackets */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Top Left Bracket */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/20 rounded-tl-sm" />
        {/* Bottom Right Bracket */}
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/20 rounded-br-sm" />
      </div>

      {/* Decoration Layer 02: Vertical System Margin */}
      <div className="absolute top-0 left-6 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none hidden xl:block">
        <div className="absolute top-1/4 -left-2 rotate-180 [writing-mode:vertical-lr] font-mono text-[9px] uppercase tracking-widest text-white/20">
          System_Architecture_v2.0
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-left max-w-2xl">
          <FadeIn>
            <span className="text-[10px] font-mono text-[#007AFF] tracking-[0.3em] uppercase block mb-4">
              [ THE_CAPABILITY_MATRIX ]
            </span>
            <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tighter mb-6 leading-tight">
              Built for the 99th percentile.
            </h2>
            <p className="text-sm md:text-base text-white/50 leading-relaxed font-normal">
              We don’t build generic interfaces. We architect high-stakes digital infrastructure where latency, security, and precision are non-negotiable.
            </p>
          </FadeIn>
        </div>

        {/* Bento Grid with Linear Gap Logic */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/[0.06] border border-white/[0.06] overflow-hidden"
          style={{ contentVisibility: 'auto' } as React.CSSProperties}
        >
          {capabilities.map((item) => (
            <CapabilityCard key={item.id} capability={item} />
          ))}
        </div>

        {/* CTAs */}
        <FadeIn delay={0.4}>
          <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 pt-12 border-t border-white/[0.06]">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-medium px-8 h-12 rounded-none uppercase text-[10px] tracking-[0.2em]"
            >
              Explore Technical Stack <ArrowRight className="ml-2 w-3 h-3" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/10 text-white/50 hover:text-white hover:border-white/20 font-medium px-8 h-12 rounded-none uppercase text-[10px] tracking-[0.2em]"
            >
              <Download className="mr-2 w-3 h-3" /> Download Process PDF
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
