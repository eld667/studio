
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, Cpu, BarChart3, AlertCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  niche: string;
  category: string;
  logic: string;
  challenge: string;
  solution: string;
  metrics: {
    loadTime: string;
    performance: number;
    seo: number;
    accessibility: number;
  };
  techStack: string[];
  image: string;
  liveLink: string;
  aiLayer: string;
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="flex flex-col h-full bg-black text-white font-body">
      {/* Hero Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="p-8 space-y-12 pb-32">
        {/* Header Info */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-brand uppercase tracking-widest px-2 py-1 bg-brand/10 border border-brand/20 rounded">
              {project.category}
            </span>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest px-2 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded">
              {project.logic}
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
          <p className="text-gray-400 font-mono text-sm">{project.niche}</p>
        </section>

        {/* Challenge vs Solution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
            <h4 className="flex items-center gap-2 text-red-400 font-mono text-sm mb-4">
              <AlertCircle className="w-4 h-4" /> //_THE_CHALLENGE
            </h4>
            <p className="text-gray-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>
          <div className="p-6 bg-brand/5 border border-brand/20 rounded-lg">
            <h4 className="flex items-center gap-2 text-brand font-mono text-sm mb-4">
              <Zap className="w-4 h-4" /> //_THE_TECHNICAL_PIVOT
            </h4>
            <p className="text-gray-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* Intelligence Layer */}
        <section className="space-y-4">
          <h4 className="flex items-center gap-2 text-gray-400 font-mono text-sm uppercase">
            <Cpu className="w-4 h-4" /> Intelligence Layer
          </h4>
          <div className="p-6 bg-gradient-to-r from-purple-500/10 via-brand/10 to-emerald-500/10 border border-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-gray-200 font-mono text-sm leading-relaxed">
              <span className="text-brand mr-2">{'>'}</span>
              {project.aiLayer}
            </p>
          </div>
        </section>

        {/* Performance Benchmarks */}
        <section className="space-y-6">
          <h4 className="flex items-center gap-2 text-gray-400 font-mono text-sm uppercase">
            <BarChart3 className="w-4 h-4" /> Performance Benchmarks
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Performance', val: project.metrics.performance },
              { label: 'SEO', val: project.metrics.seo },
              { label: 'Accessibility', val: project.metrics.accessibility },
              { label: 'Best Practices', val: 100 }
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center p-4 border border-white/10 rounded bg-white/5">
                <span className="text-3xl font-bold text-emerald-400 mb-1">{m.val}</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-4">
          <h4 className="text-gray-400 font-mono text-sm uppercase">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-400 font-mono rounded">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-black/80 backdrop-blur-xl border-t border-white/10 flex gap-4">
          <Link href={project.liveLink} target="_blank" className="flex-grow">
            <Button className="w-full bg-gradient-to-r from-purple-500 via-brand to-emerald-500 hover:brightness-110 h-12 font-bold transition-all">
              <ExternalLink className="mr-2 w-4 h-4" />
              VIEW LIVE DEPLOYMENT
            </Button>
          </Link>
          <Link href="/#contact">
            <Button variant="outline" className="h-12 border-white/20 hover:bg-white/5 font-mono text-xs">
              START_MISSION
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
