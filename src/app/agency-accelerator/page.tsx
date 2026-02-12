
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
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
  BarChart3,
  Rocket,
  Lock,
  Zap,
  Check,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FadeIn } from '../FadeIn';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// --- SCHEMAS ---
const calculatorSchema = z.object({
  monthlyRevenue: z.number().min(0),
  projectSize: z.number().min(1),
  weeklyHours: z.number().min(1),
  teamSize: z.number().min(0),
});

const applicationSchema = z.object({
  revenue: z.string().min(1, "Required"),
  bottleneck: z.string().min(1, "Required"),
  goal: z.string().min(1, "Required"),
  reason: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
});

// --- COMPONENTS ---

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    let totalDuration = 1000;
    let frameDuration = 1000 / 60;
    let totalFrames = Math.round(totalDuration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(start + (end - start) * progress);
      setDisplayValue(current);

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

export default function AgencyAcceleratorPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [calcValues, setCalcValues] = useState({
    monthlyRevenue: 50000,
    projectSize: 5000,
    weeklyHours: 60,
    teamSize: 2,
  });

  const { toast } = useToast();
  const firestore = useFirestore();

  // Gap Calculations
  const gapAnalysis = useMemo(() => {
    const currentYearly = calcValues.monthlyRevenue * 12;
    const projectsPerMonth = Math.ceil(calcValues.monthlyRevenue / calcValues.projectSize);
    
    // Projections
    const acceleratorYearly = currentYearly * 2;
    const acceleratorHours = Math.round(calcValues.weeklyHours * 0.5);
    const acceleratorMargin = 35;
    const currentMargin = 20;
    
    const revenueGap = acceleratorYearly - currentYearly;
    const hoursGap = (calcValues.weeklyHours - acceleratorHours) * 52;

    return {
      currentYearly,
      acceleratorYearly,
      acceleratorHours,
      acceleratorMargin,
      currentMargin,
      revenueGap,
      hoursGap,
      projectsPerMonth
    };
  }, [calcValues]);

  const appForm = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      revenue: "",
      bottleneck: "",
      goal: "",
      reason: "",
      email: "",
      phone: "",
    },
  });

  const onAppSubmit = async (values: z.infer<typeof applicationSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "Agency Accelerator Application",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Application Received", description: "Reviewing your details now. Expect a call in 24h." });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Submission failed. Please email directly." });
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-[#d4af37] selection:text-[#0f172a] font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 border-b border-white/5">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 px-4 py-1.5 rounded-full text-xs font-bold mb-8 tracking-widest uppercase">
                <Target className="w-3.5 h-3.5" /> For 6-Figure Agency Owners Ready to Scale
              </div>
              <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] mb-8 tracking-tighter text-white">
                You're Closer to <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-white to-[#d4af37]">7 Figures</span> <br/>
                Than You Think.
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-xl font-medium leading-relaxed">
                Most 6-figure agencies are 2-3 systems away from scaling. The gap isn't talent—it's <span className="text-white">structure.</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button onClick={() => scrollTo('calculator')} size="lg" className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#c49b2d] text-[#0f172a] font-black text-xl px-10 py-8 h-auto rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-all">
                  CALCULATE YOUR GAP
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white group" onClick={() => scrollTo('phases')}>
                  The 4-Phase Roadmap <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </FadeIn>
          </div>

          <div className="relative">
            <FadeIn delay={0.2}>
              <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <Image 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Agency Team" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="agency office"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Owner Status:</p>
                    <p className="font-bold text-red-400">Overwhelmed</p>
                  </div>
                  <div className="p-4 bg-[#d4af37]/10 backdrop-blur-md border border-[#d4af37]/20 rounded-2xl">
                    <p className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest mb-1">Target Status:</p>
                    <p className="font-bold text-[#d4af37]">Strategic CEO</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. THE CALCULATOR */}
      <section id="calculator" className="py-24 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">What's Your Agency's <span className="text-[#d4af37]">True Potential?</span></h2>
                <p className="text-xl text-slate-400">Input your current numbers to see the exact gap between where you are and where you could be.</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Inputs */}
              <div className="lg:col-span-1 space-y-8 bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">Monthly Revenue</label>
                  <input 
                    type="range" min="10000" max="200000" step="5000"
                    value={calcValues.monthlyRevenue}
                    onChange={(e) => setCalcValues({...calcValues, monthlyRevenue: parseInt(e.target.value)})}
                    className="w-full accent-[#d4af37]"
                  />
                  <div className="flex justify-between font-mono text-xl text-white">
                    <span>${calcValues.monthlyRevenue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">Average Project Size</label>
                  <input 
                    type="range" min="1000" max="50000" step="1000"
                    value={calcValues.projectSize}
                    onChange={(e) => setCalcValues({...calcValues, projectSize: parseInt(e.target.value)})}
                    className="w-full accent-[#d4af37]"
                  />
                  <div className="flex justify-between font-mono text-xl text-white">
                    <span>${calcValues.projectSize.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">Hours Worked / Week</label>
                  <input 
                    type="range" min="20" max="100" step="5"
                    value={calcValues.weeklyHours}
                    onChange={(e) => setCalcValues({...calcValues, weeklyHours: parseInt(e.target.value)})}
                    className="w-full accent-[#d4af37]"
                  />
                  <div className="flex justify-between font-mono text-xl text-white">
                    <span>{calcValues.weeklyHours} hrs</span>
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#d4af37]/20 to-[#0f172a] border border-[#d4af37]/30 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[80px]" />
                <h3 className="text-2xl font-bold mb-12 uppercase tracking-tight text-white flex items-center gap-3">
                  <BarChart3 className="text-[#d4af37]" /> Your 12-Month Gap Analysis
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Current Trajectory</p>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Yearly Revenue</span>
                        <span className="font-bold text-white">${gapAnalysis.currentYearly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Hours per Week</span>
                        <span className="font-bold text-white">{calcValues.weeklyHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status</span>
                        <span className="font-bold text-red-400">Overwhelmed Owner</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">With Agency Accelerator</p>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Yearly Revenue</span>
                        <span className="font-bold text-white">${gapAnalysis.acceleratorYearly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Hours per Week</span>
                        <span className="font-bold text-white">{gapAnalysis.acceleratorHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status</span>
                        <span className="font-bold text-emerald-400">Strategic CEO</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest mb-2">Revenue Opportunity:</p>
                    <p className="text-4xl font-black text-white">+$<AnimatedNumber value={gapAnalysis.revenueGap} /></p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest mb-2">Freedom Reclaimed:</p>
                    <p className="text-4xl font-black text-white"><AnimatedNumber value={gapAnalysis.hoursGap} /> hrs/year</p>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <Button onClick={() => scrollTo('apply')} size="lg" className="bg-white text-[#0f172a] hover:bg-slate-100 font-bold px-12 py-6 h-auto rounded-full">
                    Bridge This Gap Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 4 PHASES */}
      <section id="phases" className="py-24 bg-[#0f172a]">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-20 text-center uppercase tracking-tighter">The 4 Phases of <span className="text-[#d4af37]">Agency Freedom</span></h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { phase: "01", title: "Position", timing: "Months 1-3", icon: Target, result: "Higher project values", desc: "Niche authority, premium pricing refinement, and offer restructuring." },
              { phase: "02", title: "Systematize", timing: "Months 4-6", icon: Rocket, result: "Consistent delivery", desc: "SOPs, project management workflows, and automated reporting." },
              { phase: "03", title: "Team", timing: "Months 7-9", icon: Users, result: "Owner delegation", desc: "Strategic hiring, management frameworks, and leadership training." },
              { phase: "04", title: "Scale", timing: "Months 10-12", icon: TrendingUp, result: "7-Figure Agency", desc: "Sales machines, inbound pipelines, and strategic expansion." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative bg-white/5 border border-white/10 p-8 rounded-[2rem] h-full hover:border-[#d4af37]/50 transition-colors">
                  <span className="text-6xl font-black text-white/5 absolute top-4 right-4">{p.phase}</span>
                  <div className="w-14 h-14 bg-[#d4af37]/10 rounded-2xl flex items-center justify-center mb-8">
                    <p.icon className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <h4 className="text-sm font-black text-[#d4af37] uppercase tracking-[0.2em] mb-2">{p.timing}</h4>
                  <h3 className="text-2xl font-bold text-white mb-4">{p.title}</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">{p.desc}</p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                    <Check className="w-4 h-4" /> {p.result}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. YES/NO FILTER */}
      <section className="py-24 bg-[#0a0f1e] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn>
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-10 rounded-[3rem]">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" /> Apply if:
                </h3>
                <ul className="space-y-6">
                  {[
                    "You're at $20K-$80K/month and stuck",
                    "You have 1-2 team members (or ready to hire)",
                    "You're willing to raise prices",
                    "You can commit 5-10 hours/week to implementation"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-slate-300 font-medium">
                      <Check className="text-emerald-400 w-5 h-5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[3rem]">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <X className="text-red-400" /> Skip if:
                </h3>
                <ul className="space-y-6">
                  {[
                    "You're just starting (under $10K/month)",
                    "You want a course, not active coaching",
                    "You can't invest time in building systems",
                    "You're not ready to delegate your 'doer' role"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-slate-300 font-medium">
                      <X className="text-red-400 w-5 h-5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES */}
      <section className="py-24 bg-[#0f172a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter uppercase">Transformation Stories</h2>
            <p className="text-xl text-slate-400">Real agency owners. Real systems. Real freedom.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                name: "Creative Studio Denver", 
                before: "$480K/year, 70 hrs/week", 
                after: "$1.1M/year, 35 hrs/week", 
                problem: "Feast/famine cycles, no systems.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
              },
              { 
                name: "Digital Agency NYC", 
                before: "$65K/mo, owner primary doer", 
                after: "$140K/mo, owner sales only", 
                problem: "Can't scale, owner burning out.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
              },
              { 
                name: "Boutique Agency Austin", 
                before: "$30K/mo, low margins", 
                after: "$90K/mo, 50% margins", 
                problem: "Scope creep, competing on price.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
              },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={c.image} alt={c.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-white mb-6">{c.name}</h4>
                    <div className="space-y-4 mb-8">
                      <div className="p-3 bg-red-500/10 rounded-xl border-l-2 border-red-500 text-xs text-slate-300">
                        <span className="font-bold text-red-400">BEFORE:</span> {c.before}
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-xl border-l-2 border-emerald-500 text-xs text-white font-bold">
                        <span className="font-bold text-emerald-400">AFTER:</span> {c.after}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 italic">"The systems built here literally saved my agency and my marriage."</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MEET THE COACH */}
      <section className="py-24 bg-[#0a0f1e] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-white/5 border border-white/10 rounded-[4rem] p-8 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square lg:aspect-auto h-full rounded-3xl overflow-hidden border border-[#d4af37]/30">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                alt="Alex Chen" 
                fill 
                className="object-cover"
                data-ai-hint="coach headshot"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-2xl font-black text-white">Alex Chen</p>
                <p className="text-[#d4af37] font-bold uppercase tracking-widest text-xs">Founder, Agency Accelerator</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Your Guide to <br/><span className="text-[#d4af37]">Scale</span></h2>
              <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                <p>"I hit my ceiling at $3M/year. I was working 80 hours, missing family events, and thought that's just 'the grind.' Then I discovered systems."</p>
                <p>"Within 18 months, I scaled to $12M while working 30 hours a week. I realized most agency owners don't have a strategy problem—they have a structure problem. This program teaches the structure."</p>
                <div className="flex gap-8 pt-8">
                  <div>
                    <p className="text-3xl font-black text-white">$50M+</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Exit Value</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">500+</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Agencies Scaled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INVESTMENT */}
      <section id="apply" className="py-24 bg-[#0f172a]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeIn>
            <div className="bg-gradient-to-br from-[#d4af37] to-[#8a6d29] p-1 rounded-[3.5rem] shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="bg-[#0f172a] p-12 md:p-20 rounded-[3.3rem]">
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase">Secure Your <br/>Accelerator Slot</h2>
                <div className="space-y-4 mb-12">
                  <div className="flex justify-center items-center gap-2 text-[#d4af37] font-bold uppercase tracking-[0.2em] text-sm">
                    <Lock className="w-4 h-4" /> Limited to 5 Agencies / Month
                  </div>
                  <p className="text-5xl font-black text-white">$24,000</p>
                  <p className="text-slate-400">Or 6 payments of $4,500</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16">
                  {[
                    "12 Months Complete Access",
                    "Weekly Group Masterminds",
                    "6 Private 1:1 Deep Dives",
                    "SOP & Systems Library",
                    "Private Community Hub",
                    "Sales Script Vault"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="text-emerald-400 w-5 h-5 flex-shrink-0" /> {item}
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl mb-12">
                  <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">ROI Guarantee</p>
                  <p className="text-slate-300 italic text-sm">"If you don't add $48K in revenue within 12 months, we work together until you do—no extra charge."</p>
                </div>

                {isSuccess ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Application Sent</h3>
                    <p className="text-slate-400">Alex will review your profile and reach out within 24 hours.</p>
                  </div>
                ) : (
                  <Form {...appForm}>
                    <form onSubmit={appForm.handleSubmit(onAppSubmit)} className="space-y-6 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={appForm.control}
                          name="revenue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Monthly Revenue</FormLabel>
                              <FormControl>
                                <input {...field} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#d4af37] focus:outline-none transition-all" placeholder="e.g. $45K" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={appForm.control}
                          name="bottleneck"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Main Bottleneck</FormLabel>
                              <FormControl>
                                <input {...field} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#d4af37] focus:outline-none transition-all" placeholder="e.g. Hiring" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={appForm.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">12-Month Revenue Goal</FormLabel>
                            <FormControl>
                              <input {...field} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#d4af37] focus:outline-none transition-all" placeholder="e.g. $1.5M" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={appForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Work Email</FormLabel>
                              <FormControl>
                                <input {...field} type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#d4af37] focus:outline-none transition-all" placeholder="you@agency.com" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={appForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Phone Number</FormLabel>
                              <FormControl>
                                <input {...field} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#d4af37] focus:outline-none transition-all" placeholder="+1 (000) 000-0000" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={appForm.formState.isSubmitting}
                        className="w-full bg-[#d4af37] hover:bg-[#c49b2d] text-[#0f172a] font-black text-2xl py-10 rounded-2xl shadow-xl transition-all uppercase mt-8"
                      >
                        {appForm.formState.isSubmitting ? "TRANSMITTING..." : "SUBMIT APPLICATION"}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-[#0a0f1e]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-16 text-center uppercase tracking-tighter">Strategic <span className="text-[#d4af37]">Intel</span></h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "How is this different from a course?", a: "Courses give you information. Accelerator gives you implementation. You're building your agency's actual infrastructure with direct feedback from Alex and the systems library." },
              { q: "What if I'm not in the US?", a: "We have agency owners from 12+ countries. Calls are recorded, and the systems are universal. Scale works the same in London as it does in LA." },
              { q: "How much time is required?", a: "We recommend 5-10 hours a week for building systems. If you can't commit that, you're not ready to scale yet." },
              { q: "Do I get 1:1 time?", a: "Yes. Every accelerator includes 6 private deep-dive sessions with Alex to handle your specific bottlenecks." },
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
      <footer className="bg-[#0f172a] py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <TrendingUp className="w-8 h-8 text-[#d4af37]" />
            <span className="text-2xl font-black tracking-tighter text-white">AGENCY ACCELERATOR</span>
          </div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-12">Built for the next generation of 7-figure founders</p>
          <div className="flex justify-center gap-8 text-slate-400 font-medium">
            <Link href="#" className="hover:text-[#d4af37] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#d4af37] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#d4af37] transition-colors">Support</Link>
          </div>
          <p className="mt-12 text-slate-600 text-[10px] uppercase tracking-widest">&copy; 2025 EldWorkStudio Agency Accelerator. All rights reserved.</p>
        </div>
      </footer>

      {/* STICKY CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => scrollTo('apply')} className="w-full bg-[#d4af37] text-[#0f172a] font-black py-8 text-xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] rounded-2xl flex items-center justify-center gap-3 border-2 border-[#d4af37]/20 backdrop-blur-sm">
          <Target className="w-6 h-6" />
          APPLY TO SCALE
        </Button>
      </div>

    </div>
  );
}
