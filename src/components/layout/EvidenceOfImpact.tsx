
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  sector: string;
  year: string;
  context: string;
  metric: string;
  win: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Nexus FinTech",
    sector: "Fintech",
    year: "2024",
    context: "Core Banking Overhaul: Migrating a monolithic legacy system to a high-frequency, distributed architecture.",
    metric: "99.99% Uptime",
    win: "-140ms Latency ($12M Savings)",
  },
  {
    id: "02",
    title: "Orbital Aerospace",
    sector: "Aerospace",
    year: "2025",
    context: "Telemetry Dashboard: Real-time data visualization for satellite constellation health.",
    metric: "60fps Rendering",
    win: "Mission Control Optimization",
  },
  {
    id: "03",
    title: "Core Protocol",
    sector: "Protocol",
    year: "2026",
    context: "L2 Scaling Interface: Designing the developer-facing dashboard for a modular blockchain stack.",
    metric: "15k+ Daily Devs",
    win: "65% Faster Onboarding",
  }
];

const LedgerRow = ({ project, index }: { project: Project, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10, borderBottomWidth: 0 }}
      whileInView={{ opacity: 1, x: 0, borderBottomWidth: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 py-10 px-4 border-b border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 hover:translate-x-2"
    >
      <div className="md:col-span-4 space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/20">0{index + 1}</span>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white uppercase italic font-serif">
            {project.title}
          </h3>
        </div>
        <p className="text-sm text-white/50 max-w-sm font-normal">
          {project.context}
        </p>
        {/* Sector + Year visible on mobile as inline tags */}
        <div className="flex items-center gap-2 md:hidden mt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
            {project.sector}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
            {project.year}
          </span>
        </div>
      </div>

      <div className="hidden md:flex md:col-span-2 items-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
          {project.sector}
        </span>
      </div>

      <div className="hidden md:flex md:col-span-2 items-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
          {project.year}
        </span>
      </div>

      <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end text-left md:text-right">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] text-white/30 uppercase">Metric:</span>
          <span className="font-mono text-sm text-blue-500">{project.metric}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-white/30 uppercase">Impact:</span>
          <span className="text-sm font-medium text-white/90 uppercase tracking-tight">{project.win}</span>
        </div>
      </div>
    </motion.div>
  );
};

export function EvidenceOfImpact() {
  return (
    <section id="evidence" className="w-full py-24 bg-[#0A0A0A] relative">
      {/* Horizontal Scan-Line Background (distinct from FullServiceBundle's dot matrix) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px)', backgroundSize: '100% 40px' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 text-left">
          <FadeIn>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
              [ ARCHIVE_REF: 2024-2026 ] • SECTOR: FINTECH / AEROSPACE / PROTOCOL • VERIFIED CASE STUDIES
            </span>
            <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tighter mb-6 leading-tight uppercase italic font-serif">
              Evidence of Impact.
            </h2>
            <p className="text-sm md:text-base text-white/50 leading-relaxed font-normal max-w-2xl">
              We don't just ship features; we solve bottlenecks. Explore how our architectural approach transformed category leaders from "legacy" to "limitless."
            </p>
          </FadeIn>
        </div>

        {/* The Ledger Header (Sticky Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 pb-4 border-b border-white/10 font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
          <div className="col-span-4">Project / Context</div>
          <div className="col-span-2">Sector</div>
          <div className="col-span-2">Year</div>
          <div className="col-span-4 text-right">Primary Outcome</div>
        </div>

        {/* The Ledger Rows */}
        <div className="relative">
          {projects.map((project, i) => (
            <LedgerRow
              key={project.id}
              project={project}
              index={i}
            />
          ))}
        </div>

        {/* CTAs */}
        <FadeIn delay={0.5}>
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-medium px-8 h-12 rounded-none uppercase text-[10px] tracking-[0.2em]"
                >
                  Explore All Narratives <ArrowUpRight className="ml-2 w-3 h-3" />
                </Button>
              </Link>
              <Link href="/portfolio/nexus-fintech">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/10 text-white/50 hover:text-white hover:border-white/20 font-medium px-8 h-12 rounded-none uppercase text-[10px] tracking-[0.2em]"
                >
                  Read Nexus Case Study
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
