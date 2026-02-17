
"use client";

import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Zap, Layers, ShieldCheck, ArrowRight, Download, Rocket } from 'lucide-react';
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
    description: "Optimizing the critical rendering path to ensure your product feels instantaneous.",
    icon: Zap,
    tags: ["Brotli", "Edge", "Next.js"]
  },
  {
    id: "design",
    index: 1,
    label: "CAPABILITY_INDEX_02",
    refCode: "REF_002",
    title: "Atomic Scaling",
    description: "Component-based systems that allow your team to ship features in hours.",
    icon: Layers,
    tags: ["Atomic", "Framer", "Tailwind"]
  },
  {
    id: "integrity",
    index: 2,
    label: "CAPABILITY_INDEX_03",
    refCode: "REF_003",
    title: "Type-Safe Core",
    description: "Built on rigorous testing, Zod schemas, and future-proof documentation.",
    icon: ShieldCheck,
    tags: ["TS", "Zod", "Rust"]
  },
  {
    id: "automation",
    index: 3,
    label: "CAPABILITY_INDEX_04",
    refCode: "REF_004",
    title: "Agentic Workflows",
    description: "Autonomous AI agents that orchestrate complex logic and multi-step operations.",
    icon: Rocket,
    tags: ["LLM Ops", "Auto-Logic", "Python"]
  }
];

const CapabilityCard = ({ capability }: { capability: CapabilityProps }) => {
  const Icon = capability.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: capability.index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#111111] p-4 md:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-[#161616] border border-white/10 rounded-sm aspect-square"
    >
      {/* Internal Corner Accent - Scaled for Mobile */}
      <div className="absolute top-2 left-2 w-2 h-2 md:top-4 md:left-4 md:w-4 md:h-4 border-t border-l border-white/20 pointer-events-none" />
      
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-start justify-between">
          <div className="relative">
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#007AFF] transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute -inset-1 bg-[#007AFF]/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          </div>
          <span className="font-mono text-[8px] md:text-[9px] text-white/30 uppercase tracking-widest transition-colors duration-300 group-hover:text-white/90">
            {capability.refCode}
          </span>
        </div>
        
        <div className="space-y-2 md:space-y-4">
          <div className="space-y-1">
            <span className="font-mono text-[8px] md:text-[10px] text-[#007AFF] uppercase tracking-[0.2em] block">
              {capability.label}
            </span>
            <h3 className="text-sm md:text-lg font-medium tracking-tight text-white uppercase italic font-serif">
              {capability.title}
            </h3>
          </div>
          
          <p className="text-[10px] md:text-sm leading-relaxed text-white/40 line-clamp-2 md:line-clamp-none">
            {capability.description}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 flex flex-wrap gap-1.5 md:gap-2">
        {capability.tags.map((tag) => (
          <span key={tag} className="text-[7px] md:text-[8px] font-mono text-zinc-500 border border-white/10 px-1.5 py-0.5 rounded-full bg-white/[0.02] uppercase">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export function EldworkStandard() {
  return (
    <section id="philosophy" className="w-full py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Spine Line */}
      <div className="absolute top-0 left-6 md:left-1/2 md:-translate-x-1/2 w-px h-full bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />

      {/* Decoration Brackets */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/20 rounded-tl-sm" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/20 rounded-br-sm" />
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
              Digital infrastructure where latency, security, and precision are non-negotiable.
            </p>
          </FadeIn>
        </div>

        {/* 2x2 Mobile / 4-Col Desktop Grid */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4"
          style={{ contentVisibility: 'auto' } as React.CSSProperties}
        >
          {capabilities.map((item) => (
            <CapabilityCard key={item.id} capability={item} />
          ))}
        </div>

        {/* CTAs */}
        <FadeIn delay={0.4}>
          <div className="mt-16 flex flex-col md:flex-row items-center gap-4 pt-12 border-t border-white/[0.06]">
            <Button 
              size="lg"
              className="w-full md:w-auto bg-white text-black hover:bg-zinc-200 font-medium px-8 h-12 rounded-none uppercase text-[10px] tracking-[0.2em] group"
            >
              Explore Technical Stack <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full md:w-auto border-white/10 text-white/50 hover:text-white hover:border-white/20 font-medium px-8 h-12 rounded-none uppercase text-[10px] tracking-[0.2em]"
            >
              <Download className="mr-2 w-3 h-3" /> Process PDF
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
