
"use client";

import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Terminal, ShieldCheck, Zap, MousePointer2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

// --- Narrative Section Data ---
const sections = [
  {
    number: "01",
    label: "Infrastructure",
    headline: "Infrastructure that vanishes.",
    body: "A 100ms delay is a 7% drop in revenue. We build on a global edge network with Next.js 15, ensuring your site is interactive before the user's thumb leaves the screen.",
    visual: () => (
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Build_Console v1.0.4</span>
        </div>
        <div className="p-6 font-mono text-[11px] space-y-2">
          <div className="flex gap-3"><span className="text-zinc-600">01</span><span className="text-blue-400">λ</span><span className="text-zinc-300">Initializing edge_runtime...</span></div>
          <div className="flex gap-3"><span className="text-zinc-600">02</span><span className="text-blue-400">λ</span><span className="text-zinc-300">Optimizing server_components...</span></div>
          <div className="flex gap-3"><span className="text-zinc-600">03</span><span className="text-emerald-400">✓</span><span className="text-zinc-300">Bundle size: 0kb (Hydrated)</span></div>
          <div className="mt-6 pt-6 border-t border-zinc-900 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500 font-bold text-[10px]">100</div>
              <span className="text-[10px] text-zinc-500 uppercase">Performance</span>
            </div>
            <div className="text-emerald-500 animate-pulse">DEPLOY_SUCCESS</div>
          </div>
        </div>
      </div>
    )
  },
  {
    number: "02",
    label: "Design Logic",
    headline: "High-Fidelity authority.",
    body: "Generic designs signal risk. We use a 'Precision UI' framework—hairline borders, 4px radii, and Geist Mono typography—to subconsciously signal institutional-grade reliability.",
    visual: () => (
      <div className="relative group">
        <div className="w-64 h-64 border border-white/[0.03] bg-zinc-950 rounded-sm relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
          <div className="w-32 h-32 border border-zinc-800 bg-zinc-900/50 rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
             {/* The "Magnifier" zoom point */}
             <div className="absolute top-0 left-0 w-4 h-4 border-r border-b border-blue-500/50" />
             <div className="p-4 space-y-2">
                <div className="h-1.5 w-12 bg-zinc-800 rounded-full" />
                <div className="h-1.5 w-8 bg-zinc-800 rounded-full" />
             </div>
          </div>
          {/* Zoom Overlay */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 -bottom-4 w-40 h-40 rounded-full border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl flex items-center justify-center p-1"
          >
            <div className="w-full h-full rounded-full border border-blue-500/30 overflow-hidden flex items-center justify-center">
               <div className="text-center">
                  <div className="w-full h-[1px] bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                  <span className="text-[8px] font-mono text-blue-400 mt-1 block">HAIRLINE_CHECK</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    number: "03",
    label: "Conversion",
    headline: "Strategic Friction.",
    body: "We don't just 'get clicks.' We design paths of least resistance. Our custom lead-capture funnels are integrated directly into the UI, reducing form-fill fatigue by 40%.",
    visual: () => (
      <div className="relative w-72">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-zinc-900 border-2 border-blue-500/20 rounded-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-xl rounded-xl" />
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Secure_Payload</span>
              <ShieldCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div className="h-10 w-full bg-zinc-800 border border-zinc-700 rounded-md flex items-center px-3">
              <span className="text-[10px] font-mono text-zinc-500">Identity_...</span>
            </div>
            <div className="h-10 w-full bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-[10px] font-black uppercase text-white tracking-widest">Initialize_Project</span>
            </div>
          </div>
        </motion.div>
        {/* Floating Stat */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="absolute -right-12 top-1/2 bg-zinc-950 border border-zinc-800 px-4 py-2 rounded shadow-2xl"
        >
          <span className="text-[10px] font-mono text-emerald-400 font-bold">+40% CR</span>
        </motion.div>
      </div>
    )
  },
  {
    number: "04",
    label: "Kinetic UX",
    headline: "Kinetic Storytelling.",
    body: "Static is dead. We use Framer Motion to create 'Intentional Momentum'—animations that guide the eye toward your CTA, rather than distracting from it.",
    visual: () => (
      <div className="flex gap-4 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="w-24 h-32 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center"
          >
            <div className="w-8 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                className="w-full h-full bg-blue-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }
];

export function EldworkStandard() {
  return (
    <section id="philosophy" className="w-full relative py-32 overflow-hidden bg-black">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-32 md:gap-64">
          {sections.map((section, index) => (
            <div key={index} className="min-h-[60vh] flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24 relative">
              {/* Step Number Background */}
              <div 
                className="absolute -left-12 md:-left-24 top-0 text-[120px] md:text-[200px] font-black leading-none select-none opacity-5 pointer-events-none text-white"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}
              >
                {section.number}
              </div>

              {/* Text Content (Sticky-ish feel) */}
              <div className="w-full md:w-1/2 pt-12">
                <FadeIn transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6 block">
                    [ {section.label} ]
                  </span>
                  <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.04em] text-zinc-100 mb-8 uppercase">
                    {section.headline}
                  </h2>
                  <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-md font-normal">
                    {section.body}
                  </p>
                </FadeIn>
              </div>

              {/* Visual Proof Element */}
              <div className="w-full md:w-1/2 flex items-center justify-center md:pt-24">
                <FadeIn delay={0.2} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <section.visual />
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
