
"use client";

import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Zap, Cpu, Layers, ShieldCheck, Check } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface ModuleProps {
  id: string;
  serial: string;
  title: string;
  content: string;
  icon: React.ElementType;
  log: string;
  index: number;
}

const modules: ModuleProps[] = [
  {
    id: "velocity",
    serial: "REF-001",
    title: "VELOCITY_ENGINE",
    content: "TTFB < 50ms. Zero-bundle hydration via React Server Components. Edge-cached globally via Vercel.",
    icon: Zap,
    log: "λ edge_init: true \n TTFB: 48ms \n Cache: HIT",
    index: 0
  },
  {
    id: "fidelity",
    serial: "REF-002",
    title: "VISUAL_FIDELITY",
    content: "1px hairline precision. Geist Mono metadata. Systematic spacing scales (4px grid). Adaptive Dark Mode logic.",
    icon: Layers,
    log: "stroke: 1px \n weight: 400 \n tracking: -0.05em",
    index: 1
  },
  {
    id: "logic",
    serial: "REF-003",
    title: "CONVERSION_LOGIC",
    content: "Low-friction lead captures. Zero-layout shift (CLS). Analytics-driven UX paths. Intent-based micro-interactions.",
    icon: ShieldCheck,
    log: "CLS: 0.000 \n LCP: 0.8s \n FID: 12ms",
    index: 2
  },
  {
    id: "soul",
    serial: "REF-004",
    title: "SYSTEM_SOUL",
    content: "Custom Framer Motion spring physics. 60fps interaction loops. Accessibility-first ARIA architecture.",
    icon: Cpu,
    log: "phys: { stiffness: 100 } \n fps: 60 \n a11y: pass",
    index: 3
  }
];

const TechnicalModule = ({ module }: { module: ModuleProps }) => {
  const Icon = module.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: module.index * 0.1 }}
      className="group relative bg-[#000000] border border-white/5 p-5 overflow-hidden transition-colors duration-500 hover:border-white/20"
    >
      {/* Scanline Effect */}
      <motion.div 
        initial={{ top: "-10%" }}
        whileHover={{ top: "110%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute left-0 w-full h-[1px] bg-white/10 pointer-events-none z-20"
      />

      {/* Module Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors">
            <Icon className="w-3 h-3 text-zinc-400 group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-600 tracking-tighter uppercase">{module.serial}</span>
          </div>
        </div>
        <div className="text-[9px] font-mono text-zinc-700 select-none">
          SYSTEM_STABLE
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 relative z-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
          {module.title}
        </h3>
        <p className="text-[12px] leading-relaxed text-zinc-500 max-w-[240px]">
          {module.content}
        </p>
      </div>

      {/* Technical Log Overlay */}
      <div className="mt-8 pt-4 border-t border-white/5">
        <pre className="font-mono text-[9px] text-zinc-600 leading-tight">
          <code>{module.log}</code>
        </pre>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
    </motion.div>
  );
};

export function EldworkStandard() {
  return (
    <section id="philosophy" className="w-full py-24 bg-[#000000] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase block mb-2">
              [ THE_ELDWORK_STANDARD ]
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-800 to-transparent mx-auto mt-4" />
          </FadeIn>
        </div>

        {/* High-Density Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {modules.map((module) => (
            <TechnicalModule key={module.id} module={module} />
          ))}
        </div>

        {/* Closing Metadata */}
        <FadeIn delay={0.5}>
          <div className="mt-12 flex justify-between items-center opacity-40">
            <div className="flex gap-6 items-center">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Protocol: High_Fidelity</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Core: NextJS_15</span>
            </div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
              © 2025 // ARCH_V1
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
