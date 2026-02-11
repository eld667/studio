
'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { ProjectGrid } from './ProjectGrid';
import { FadeIn } from '../FadeIn';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    if (id === 'contact') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#contact';
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black selection:bg-blue-500 selection:text-white">
      <Header onScroll={handleScroll} />
      
      <main className="flex-grow pt-24 pb-32">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <section className="mb-24 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">
                Technical Truths. <br />
                <span className="bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">
                  Measured Performance.
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto font-body">
                We reject the fluff of generic templates. Our portfolio is a registry of missions executed with 
                Next.js architecture, edge delivery, and intelligent automation pipelines.
              </p>
            </FadeIn>
          </section>

          {/* Main Grid */}
          <ProjectGrid />

          {/* Intellectual Honesty Section */}
          <FadeIn delay={0.4}>
            <section className="mt-32 p-12 rounded-2xl border border-white/5 bg-zinc-950/50 text-center">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase font-mono tracking-widest">
                //_THE_PIVOT_PROTOCOL
              </h3>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed italic">
                "We don't just build sites; we build high-trust infrastructure. Every project above was moved away from 
                limiting platforms like Wix or WordPress because professional businesses require absolute speed, 
                unhackable security, and the ability to integrate custom AI logic without compromises."
              </p>
            </section>
          </FadeIn>
        </div>
      </main>

      {/* Global Capability Registry Ticker */}
      <div className="w-full border-t border-white/10 bg-black py-8 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-8 font-mono text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                Lead-Gen Capture v2.0
              </span>
              <span className="mx-8 font-mono text-[10px] text-blue-400 uppercase tracking-[0.3em]">
                Multi-Language Router
              </span>
              <span className="mx-8 font-mono text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                Session Persistence
              </span>
              <span className="mx-8 font-mono text-[10px] text-emerald-400 uppercase tracking-[0.3em]">
                Vector DB Integration
              </span>
              <span className="mx-8 font-mono text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                Edge Delivery Optimization
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
