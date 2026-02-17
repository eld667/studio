
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { ShieldCheck, Zap, Globe, Smartphone, MessageSquare, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from "@/hooks/use-mobile";

export function FullServiceBundle() {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const glowBackground = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, hsla(210, 100%, 50%, 0.15), transparent 80%)`
  );

  return (
    <section 
      id="bundle" 
      className="relative w-full py-16 lg:py-32 bg-[#0A0A0A] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dot Matrix Background */}
      <motion.div 
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: isMobile ? 0.1 : 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Atmospheric Light Leak (Parallax Glow) */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: isMobile ? 0 : 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: isMobile ? 'none' : glowBackground,
          willChange: 'transform'
        }}
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="mb-16 text-center lg:text-left">
          <FadeIn>
            <span className="font-mono text-xs lg:text-[10px] text-blue-400 tracking-[0.3em] uppercase block mb-4">
              [ FULL SERVICE BUNDLE ] • VERSION 2026.1 • ALL-INCLUSIVE
            </span>
            <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tighter mb-6 leading-tight">
              Everything you need. <br className="hidden lg:block" /> Nothing you don’t.
            </h2>
            <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-xl mx-auto lg:mx-0">
              We don't just "build a site" and leave. We provide a full digital toolkit designed to help your small business run smoother from day one.
            </p>
          </FadeIn>
        </div>

        {/* Glow-Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
          
          {/* Main Hero Card (60%) */}
          <FadeIn className="lg:col-span-6 h-full" delay={0.1}>
            <div className="group relative h-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-6 lg:p-12 rounded-2xl lg:rounded-[2rem] transition-colors hover:border-white/20">
              <div className="flex flex-col h-full justify-between gap-12">
                <div className="space-y-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-medium text-white">The Essentials</h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-md">
                      High-speed hosting, custom domain setup, and professional email. We handle the "tech setup" so you don't have to.
                    </p>
                  </div>
                  <div className="flex items-start gap-4 pt-4 border-t border-white/[0.05]">
                    <Smartphone className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-white">Mobile Perfect</h4>
                      <p className="text-xs text-white/40 mt-1">Your site looks stunning on every screen—from iPhone to Desktop.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <motion.div
                    animate={{ boxShadow: ["0 0 0px rgba(0,122,255,0)", "0 0 20px rgba(0,122,255,0.2)", "0 0 0px rgba(0,122,255,0)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full lg:w-auto"
                  >
                    <Button size="lg" className="w-full lg:w-auto bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-widest text-xs lg:text-[10px] h-14 px-8 rounded-none">
                      Claim Your Package
                    </Button>
                  </motion.div>
                  <button className="text-xs lg:text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2">
                    View Full Feature List <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Stacked Side Cards (40%) */}
          <div className="lg:col-span-4 flex overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-col gap-4 pb-4 lg:pb-0">
            <FadeIn className="h-full min-w-[85%] lg:min-w-0 snap-center" delay={0.2}>
              <div className="group relative h-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-6 lg:p-8 rounded-[2rem] transition-colors hover:border-white/20">
                <div className="space-y-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Google Ready</h3>
                    <p className="text-sm text-white/50 leading-relaxed mt-2">
                      Basic SEO is built-in. We make sure your business shows up when local customers search for your services.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn className="h-full min-w-[85%] lg:min-w-0 snap-center" delay={0.3}>
              <div className="group relative h-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-6 lg:p-8 rounded-[2rem] transition-colors hover:border-white/20">
                <div className="space-y-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Ongoing Support</h3>
                    <p className="text-sm text-white/50 leading-relaxed mt-2">
                      Need a quick change? We’re just a text or email away. Think of us as your "on-call" tech department.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
