
"use client";

import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Zap, Layers, ShieldCheck, ArrowRight, Download, Plus } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CapabilityProps {
  id: string;
  index: number;
  label: string;
  refCode: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
}

const capabilities: CapabilityProps[] = [
  {
    id: "performance",
    index: 0,
    label: "CAPABILITY_INDEX_01",
    refCode: "REF_001",
    title: "Zero Latency",
    description: "Stop losing users to millisecond delays. We optimize the critical rendering path to ensure your product feels instantaneous, regardless of data complexity.",
    icon: Zap,
    tags: ["Brotli/Gzip", "Next.js 15", "Edge Runtime"]
  },
  {
    id: "design",
    index: 1,
    label: "CAPABILITY_INDEX_02",
    refCode: "REF_002",
    title: "Atomic Scaling",
    description: "Design that grows with you. We build atomic, component-based systems that allow your team to ship new features in hours, not weeks.",
    icon: Layers,
    tags: ["Atomic UI", "Framer Motion", "Tailwind"]
  },
  {
    id: "integrity",
    index: 2,
    label: "CAPABILITY_INDEX_03",
    refCode: "REF_003",
    title: "Type-Safe Core",
    description: "Clean code isn’t a luxury; it’s a requirement. Our stack is built on type-safety, rigorous testing, and future-proof documentation.",
    icon: ShieldCheck,
    tags: ["TypeScript", "Zod Schema", "Unit Testing"]
  }
];

const CapabilityCard = ({ capability }: { capability: CapabilityProps }) => {
  const Icon = capability.icon;
  const descriptionId = `desc-${capability.id}`;
  
  // Truncate for mobile: take first sentence
  const firstSentence = capability.description.split('.')[0] + '.';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: capability.index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#111111] p-8 flex flex-col justify-between transition-all duration-300 hover:bg-[#161616] border border-white/10 rounded-sm snap-center min-w-[280px] md:min-w-0 aspect-[4/5] md:aspect-square"
    >
      {/* Internal Corner Accent */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
      
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="relative">
            <Icon className="w-5 h-5 text-[#007AFF] transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute -inset-1 bg-[#007AFF]/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          </div>
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest transition-colors duration-300 group-hover:text-white/90">
            {capability.refCode}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#007AFF] uppercase tracking-[0.2em] block">
              {capability.label}
            </span>
            <h3 className="text-xl md:text-lg font-medium tracking-tight text-white uppercase italic font-serif">
              {capability.title}
            </h3>
          </div>
          
          <div className="space-y-4">
            <p id={descriptionId} className="text-sm leading-relaxed text-white/50">
              <span className="md:hidden">{firstSentence}</span>
              <span className="hidden md:inline">{capability.description}</span>
              <Plus className="inline-block md:hidden w-3 h-3 ml-1 text-white/30" />
            </p>
            
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {capability.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-mono text-zinc-500 border border-white/5 px-2 py-0.5 rounded-full bg-white/[0.02]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between font-mono text-[9px] uppercase tracking-tighter">
        <span className="text-white/10 hidden md:block">SYSTEMS_ARCHITECTURE • VERIFIED_OUTPUT</span>
        <span className="text-white/30 font-bold ml-auto">{capability.refCode}</span>
      </div>
    </motion.div>
  );
};

export function EldworkStandard() {
  return (
    <section id="philosophy" className="w-full py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Spine Line - Adjusted for Mobile Edge */}
      <div className="absolute top-0 left-6 md:left-1/2 md:-translate-x-1/2 w-px h-full bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />

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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
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

        {/* Grid with Horizontal Scroll on Mobile */}
        <div 
          className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 pb-8 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
          style={{ contentVisibility: 'auto' } as React.CSSProperties}
        >
          {capabilities.map((item) => (
            <CapabilityCard key={item.id} capability={item} />
          ))}
        </div>

        {/* CTAs - Stacked on Mobile */}
        <FadeIn delay={0.4}>
          <div className="mt-16 flex flex-col md:flex-row items-center gap-6 pt-12 border-t border-white/[0.06]">
            <Button 
              size="lg"
              className="relative w-full md:w-auto bg-white text-black hover:bg-zinc-200 font-medium px-8 h-12 rounded-none uppercase text-[10px] tracking-[0.2em] overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Explore Technical Stack <ArrowRight className="ml-2 w-3 h-3" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full md:hidden"
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full md:w-auto border-white/10 text-white/50 hover:text-white hover:border-white/20 font-medium px-8 h-12 rounded-none uppercase text-[10px] tracking-[0.2em]"
            >
              <Download className="mr-2 w-3 h-3" /> Download Process PDF
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
