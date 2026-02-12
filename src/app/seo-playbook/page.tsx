
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Minus, 
  ChevronRight, 
  MessageSquare, 
  HelpCircle, 
  Mail, 
  Phone,
  Zap,
  Check,
  X,
  Play,
  Monitor,
  Layout,
  Layers,
  Search,
  Globe,
  Star,
  Download,
  Calendar
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from '../FadeIn';
import { cn } from "@/lib/utils";

// --- DATA ---

const milestones = [
  {
    id: "0",
    label: "0",
    name: "Month 0-2: Foundation",
    title: "Starting from zero",
    action: "Technical audit + keyword research",
    module: "Module 1: Keyword Intelligence",
    screenshot: "https://picsum.photos/seed/seo1/800/500",
    description: "The 'Invisible Phase'. We focused on fixing technical debt and identifying high-intent keywords that competitors were ignoring."
  },
  {
    id: "10k",
    label: "10K",
    name: "Month 3-4: First Wins",
    title: "10,000 visitors",
    action: "Content clusters + on-page optimization",
    module: "Modules 2-3: Technical & Content",
    screenshot: "https://picsum.photos/seed/seo2/800/500",
    description: "Momentum begins. By grouping content into clusters, we signaled topical authority to Google, resulting in our first page-1 rankings."
  },
  {
    id: "50k",
    label: "50K",
    name: "Month 5-7: Momentum",
    title: "50,000 visitors",
    action: "Link building + content scaling",
    module: "Module 4: Link Building",
    screenshot: "https://picsum.photos/seed/seo3/800/500",
    description: "The scaling phase. We moved from 1 piece of content a week to 5, supported by a systematic Digital PR outreach campaign."
  },
  {
    id: "100k",
    label: "100K",
    name: "Month 8-10: Breakthrough",
    title: "100,000 visitors",
    action: "Featured snippets + authority building",
    module: "Advanced SEO Tactics",
    screenshot: "https://picsum.photos/seed/seo4/800/500",
    description: "The Hockey Stick curve. We optimized for 'Position Zero' and started ranking for extremely high-volume head terms."
  },
  {
    id: "500k",
    label: "500K",
    name: "Month 11: Acceleration",
    title: "500,000 visitors",
    action: "Content machine + automation",
    module: "Systems & Scaling",
    screenshot: "https://picsum.photos/seed/seo5/800/500",
    description: "Domination. At this stage, the site had enough authority that new content would rank on page 1 within 48 hours."
  },
  {
    id: "1m",
    label: "1M+",
    name: "Month 12: The Milestone",
    title: "1 Million visitors",
    action: "Full system mastery",
    module: "SEO Playbook Complete",
    screenshot: "https://picsum.photos/seed/seo6/800/500",
    description: "The goal achieved. A self-sustaining organic traffic machine generating millions in revenue value without a dime spent on ads."
  }
];

// --- COMPONENTS ---

const TimelineNode = ({ milestone, active, onClick }: { milestone: typeof milestones[0], active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "relative flex flex-col items-center group transition-all duration-500",
      active ? "scale-110" : "scale-100 opacity-50 hover:opacity-80"
    )}
  >
    <div className={cn(
      "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 mb-4 transition-all duration-500 shadow-lg",
      active 
        ? "bg-[#10b981] border-[#10b981] text-black shadow-[#10b981]/40" 
        : "bg-white/5 border-white/20 text-white group-hover:border-[#10b981]/50"
    )}>
      <span className="font-black text-sm md:text-lg">{milestone.label}</span>
    </div>
    <div className={cn(
      "absolute -bottom-8 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-colors",
      active ? "text-[#10b981]" : "text-slate-500"
    )}>
      {milestone.id === "0" ? "START" : `PHASE ${milestone.id}`}
    </div>
  </button>
);

export default function SEOPlaybookPage() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#10b981] selection:text-black font-sans overflow-x-hidden">
      
      {/* 1. HERO & TIMELINE */}
      <section className="relative pt-32 pb-24 border-b border-white/5">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#10b981]/5 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 px-4 py-1.5 rounded-full text-xs font-bold mb-8 tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5" /> 2024 Algorithm Verified
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-white uppercase italic italic">
              0 TO 1 MILLION <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-emerald-400 to-[#10b981]">MONTHLY VISITORS.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
              Follow the exact 12-month roadmap that grew 3 sites from scratch to 7 figures of monthly organic traffic. No fluff. Just the playbook.
            </p>
          </FadeIn>

          {/* THE TIMELINE INTERFACE */}
          <div className="max-w-6xl mx-auto mb-20">
            <FadeIn delay={0.2}>
              <div className="relative mb-24">
                {/* Connector Line */}
                <div className="absolute top-6 md:top-8 left-0 w-full h-0.5 bg-white/10 z-0" />
                <div 
                  className="absolute top-6 md:top-8 left-0 h-0.5 bg-gradient-to-r from-emerald-600 to-[#10b981] z-0 transition-all duration-700 ease-in-out" 
                  style={{ width: `${(activeMilestone / (milestones.length - 1)) * 100}%` }}
                />
                
                <div className="relative z-10 flex justify-between items-center px-2">
                  {milestones.map((m, i) => (
                    <TimelineNode 
                      key={m.id} 
                      milestone={m} 
                      active={activeMilestone === i} 
                      onClick={() => setActiveMilestone(i)} 
                    />
                  ))}
                </div>
              </div>

              {/* Milestone Details Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/5 rounded-full blur-[80px]" />
                  
                  <div>
                    <p className="text-[#10b981] font-black uppercase tracking-[0.2em] mb-4">{milestones[activeMilestone].name}</p>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight italic uppercase">{milestones[activeMilestone].title}</h3>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                      {milestones[activeMilestone].description}
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                          <Zap className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">STRATEGIC ACTION</p>
                          <p className="text-white font-bold">{milestones[activeMilestone].action}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                          <Layout className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">COURSE MODULE</p>
                          <p className="text-white font-bold">{milestones[activeMilestone].module}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                    <Image 
                      src={milestones[activeMilestone].screenshot} 
                      alt="Traffic Graph" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint="google analytics graph"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/60 bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10 uppercase tracking-widest">VERIFIED_TRAFFIC_DATA</span>
                      <div className="flex items-center gap-1 text-[#10b981] font-black text-xs">
                        <TrendingUp className="w-3 h-3" /> +{(activeMilestone + 1) * 120}% GROWTH
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </FadeIn>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button onClick={() => scrollTo('investment')} size="lg" className="w-full sm:w-auto bg-[#10b981] hover:bg-[#0da172] text-black font-black text-xl px-12 py-8 h-auto rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all uppercase tracking-tight">
              Get the Roadmap — $497
            </Button>
            <div className="flex items-center gap-2 text-slate-400 font-bold">
              <Users className="w-5 h-5" /> Join 2,400+ students
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tighter uppercase italic">Most SEO advice is <span className="text-red-500">Broken.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                  { title: "Too Basic", desc: "Write good content - gee, thanks. No actionable steps.", icon: X },
                  { title: "Too Technical", desc: "Here are 500 factors. Good luck doing all of them.", icon: X },
                  { title: "Outdated", desc: "Tactics from 2019 that will get you penalized today.", icon: X },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-3xl">
                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <item.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-2xl text-slate-300 font-medium">You don't need more information. You need a <span className="text-[#10b981]">system</span> that actually works in 2024.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. METHODOLOGY */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">THE SEO PLAYBOOK <br/><span className="text-[#10b981]">TRIFECTA</span></h2>
              <p className="text-xl text-slate-400">The 3 core pillars of our million-visitor system.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { 
                pillar: "01", 
                title: "Intent Matching", 
                icon: Target, 
                desc: "Forget keywords. We give searchers exactly what they want, leading to higher dwell times and lower bounce rates.", 
                color: "from-emerald-500 to-green-600" 
              },
              { 
                pillar: "02", 
                title: "Authority Stacking", 
                icon: Layers, 
                desc: "Build topical authority systematically. We show you how to own entire niches so Google has no choice but to rank you.", 
                color: "from-blue-500 to-indigo-600" 
              },
              { 
                pillar: "03", 
                title: "Velocity Acceleration", 
                icon: Zap, 
                desc: "Rank faster with technical signals. We bypass the standard 'sandbox' and get your content ranked in days, not months.", 
                color: "from-[#10b981] to-emerald-400" 
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative bg-white/5 border border-white/10 p-10 rounded-[3rem] h-full hover:border-[#10b981]/50 transition-all duration-500">
                  <span className="text-8xl font-black text-white/5 absolute top-4 right-8 select-none">{p.pillar}</span>
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br shadow-lg shadow-black/40", p.color)}>
                    <p.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight italic">{p.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT'S INSIDE */}
      <section className="py-24 bg-[#0f0f0f] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "40+ Video Lessons", desc: "Step-by-step 4K training modules.", icon: Play, img: "https://picsum.photos/seed/seo-vid/600/400" },
              { title: "Templates & Checklists", desc: "Downloadable SOPs used by our agency.", icon: Download, img: "https://picsum.photos/seed/seo-temp/600/400" },
              { title: "Private Community", desc: "2,400+ SEOs sharing what's working now.", icon: Users, img: "https://picsum.photos/seed/seo-comm/600/400" },
              { title: "Monthly Live Q&A", desc: "Direct access to instructors every month.", icon: Calendar, img: "https://picsum.photos/seed/seo-qa/600/400" },
              { title: "Lifetime Updates", desc: "Never outdated. Updates for every algo shift.", icon: TrendingUp, img: "https://picsum.photos/seed/seo-up/600/400" },
              { title: "GSC Mastery", desc: "Master the tool that actually matters.", icon: Monitor, img: "https://picsum.photos/seed/seo-gsc/600/400" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={item.img} alt={item.title} fill className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <item.icon className="w-5 h-5 text-[#10b981]" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CURRICULUM */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">THE <span className="text-[#10b981]">SYLLABUS</span></h2>
              <p className="text-xl text-slate-400">Everything you need to dominate the SERPs.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {[
              { 
                module: "Module 1", 
                title: "Keyword Intelligence", 
                img: "https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=2070&auto=format&fit=crop", 
                bullets: ["Intent-based categorization", "Volume vs. Difficulty matrix", "Finding hidden gems"] 
              },
              { 
                module: "Module 2", 
                title: "Technical Foundation", 
                img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", 
                bullets: ["Site speed mastery", "Crawlability & Indexation", "Modern Schema markup"] 
              },
              { 
                module: "Module 3", 
                title: "Content That Ranks", 
                img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop", 
                bullets: ["The 10x content framework", "Natural Language Processing (NLP)", "Content Refresh strategies"] 
              },
              { 
                module: "Module 4", 
                title: "Link Building Scale", 
                img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop", 
                bullets: ["Digital PR tactics", "Broken link acquisition", "Guest posting at scale"] 
              },
            ].map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={m.img} alt={m.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" data-ai-hint="office laptop research" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-[#10b981] font-black uppercase text-xs tracking-widest mb-1">{m.module}</p>
                      <h4 className="text-2xl font-black text-white italic uppercase">{m.title}</h4>
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    {m.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-center gap-3 text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                        <span className="text-sm font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REAL RESULTS */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter italic">PROOF OF <span className="text-[#10b981]">SYSTEM</span></h2>
              <p className="text-xl text-slate-400">Student results using the exact same playbook.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Sarah Mitchell", result: "0 → 85K/month", time: "8 months", img: "https://picsum.photos/seed/r1/600/400" },
              { name: "Mike Richardson", result: "12K → 340K/month", time: "10 months", img: "https://picsum.photos/seed/r2/600/400" },
              { name: "Lisa Carter", result: "200 → 45K/month", time: "Local Niche", img: "https://picsum.photos/seed/r3/600/400" },
            ].map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-[#10b981]/30 transition-colors">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-8 border border-white/5">
                    <Image src={r.img} alt="Result Graph" fill className="object-cover" data-ai-hint="traffic chart" />
                  </div>
                  <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{r.name}</h4>
                  <p className="text-2xl font-black text-[#10b981] mb-1">{r.result}</p>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{r.time}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INVESTMENT */}
      <section id="investment" className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeIn>
            <div className="bg-gradient-to-br from-[#10b981] to-emerald-800 p-1 rounded-[3.5rem] shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <div className="bg-[#0a0a0a] p-12 md:p-20 rounded-[3.3rem]">
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase italic italic">START YOUR <br/>ASCENT</h2>
                
                <div className="flex flex-col items-center gap-4 mb-12">
                  <p className="text-3xl font-bold text-slate-500 line-through tracking-widest">$997</p>
                  <div className="relative">
                    <p className="text-7xl md:text-9xl font-black text-white italic tracking-tighter">$497</p>
                    <div className="absolute -top-4 -right-8 bg-emerald-500 text-black font-black text-[10px] px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">LIMITED_TIME</div>
                  </div>
                  <p className="text-[#10b981] font-bold uppercase tracking-[0.2em] text-sm mt-4">One-Time Lifetime Access</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16 max-w-2xl mx-auto">
                  {[
                    "Full Video Course (12+ hrs)",
                    "Complete Template Vault",
                    "Keyword Strategy Matrix",
                    "Private Community Hub",
                    "Monthly Live Strategy Calls",
                    "Lifetime Algo Updates"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="text-emerald-400 w-5 h-5 flex-shrink-0" />
                      <span className="font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl mb-12">
                  <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-2">The "Traffic or Bust" Guarantee</p>
                  <p className="text-slate-300 italic text-sm">"30-day money-back guarantee. If you show us you implemented Module 1 and 2 and don't see progress, we'll refund you instantly. Zero risk."</p>
                </div>

                <Button className="w-full bg-[#10b981] hover:bg-[#0da172] text-black font-black text-2xl py-10 rounded-2xl shadow-xl transition-all uppercase italic">
                  GET THE COMPLETE SYSTEM
                </Button>
                
                <div className="mt-8 flex justify-center items-center gap-6">
                  <div className="flex items-center gap-1 text-[#10b981]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">4.9/5 Average Student Rating</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-16 text-center uppercase tracking-tighter italic italic">INTEL <span className="text-[#10b981]">DEBRIEF</span></h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "How long until I see results?", a: "Most students see first-page rankings for long-tail terms within 60 days. The timeline shows our roadmap for scaling to high-volume head terms over 12 months." },
              { q: "Is this for beginners?", a: "Yes. We start with the core technical and keyword fundamentals and build to the advanced automation systems used by multi-million visitor sites." },
              { q: "What if Google's algorithm changes?", a: "Our system focuses on 'First Principles' SEO: user intent, topical depth, and technical excellence. These principles survive (and often benefit from) major algorithm updates." },
              { q: "Do I need expensive SEO tools?", a: "We show you how to use free tools (GSC, etc.) and suggest paid options if you want to scale faster. No expensive software is 'required' to succeed with the system." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6 text-white">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 text-lg leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <BarChart3 className="w-8 h-8 text-[#10b981]" />
            <span className="text-2xl font-black tracking-tighter text-white">SEO PLAYBOOK</span>
          </div>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-12">Built for the next generation of traffic masters</p>
          <div className="flex justify-center gap-8 text-slate-400 font-medium">
            <Link href="#" className="hover:text-[#10b981] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#10b981] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#10b981] transition-colors">Support</Link>
          </div>
          <p className="mt-12 text-slate-600 text-[10px] uppercase tracking-widest">&copy; 2025 EldWorkStudio SEO Playbook. All rights reserved.</p>
        </div>
      </footer>

      {/* STICKY CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => scrollTo('investment')} className="w-full bg-[#10b981] text-black font-black py-8 text-xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] rounded-2xl flex items-center justify-center gap-3 border-2 border-emerald-400/20 backdrop-blur-sm italic">
          <Target className="w-6 h-6" />
          GET THE PLAYBOOK
        </Button>
      </div>

    </div>
  );
}
