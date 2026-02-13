
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  MessageSquare, 
  Cpu, 
  Globe,
  Settings,
  Lock,
  ChevronRight,
  Mail,
  Smartphone
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
import { WorkflowCanvas } from './WorkflowCanvas';

const leadSchema = z.object({
  email: z.string().email("Invalid corporate email"),
});

export default function FlowSyncPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof leadSchema>>({
    resolver: zodResolver(leadSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof leadSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "FlowSync Trial Signup",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Account Initialized", description: "Check your inbox for your login credentials." });
    } catch (e) {
      toast({ variant: "destructive", title: "Sync Failed", description: "Please try again later." });
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:rotate-6 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-slate-900">FlowSync</span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <button onClick={() => scrollTo('features')} className="hover:text-blue-600 transition-colors">Features</button>
          <button onClick={() => scrollTo('demo')} className="hover:text-blue-600 transition-colors">Demo</button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-blue-600 transition-colors">Pricing</button>
          <Button onClick={() => scrollTo('cta')} className="rounded-full px-8 py-6 bg-slate-900 text-white hover:bg-blue-600 transition-all">
            Start Free Trial
          </Button>
        </div>

        <button className="lg:hidden text-slate-900"><Settings className="w-6 h-6" /></button>
      </nav>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-40 pb-24 bg-white overflow-hidden">
          <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100 mb-8">
                  <Zap className="w-3.5 h-3.5" /> Series A Stage Automation
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-[0.9] text-slate-950 tracking-tighter mb-8 italic uppercase">
                  Automate the <br/>
                  <span className="text-blue-600">Heavy Lifting.</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
                  FlowSync connects your entire tech stack and automates repetitive tasks with a visual, drag-and-drop builder. No code. No friction.
                </p>
                
                {isSuccess ? (
                  <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                    <p className="font-bold text-green-900">Check your inbox to get started.</p>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                    <input 
                      {...form.register('email')}
                      placeholder="Work Email"
                      className="flex-grow bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold"
                    />
                    <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-black text-lg px-10 py-8 h-auto rounded-2xl shadow-xl shadow-blue-600/20">
                      Try Free
                    </Button>
                  </form>
                )}
                <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Trusted by 12,000+ teams. No credit card required.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.2}>
                <WorkflowCanvas />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 2. SOCIAL PROOF LOGO WALL */}
        <section className="py-12 border-y border-slate-100 bg-slate-50/50 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-20 opacity-30 grayscale items-center">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-2xl font-black italic">NOTION</span>
                <span className="text-2xl font-black italic">FIGMA</span>
                <span className="text-2xl font-black italic">LINEAR</span>
                <span className="text-2xl font-black italic">VERCEL</span>
                <span className="text-2xl font-black italic">SHOPIFY</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 3. FEATURE HIGHLIGHTS (Linked Nodes) */}
        <section id="features" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 uppercase tracking-tighter italic leading-none">Designed for <br/>Scale & Velocity.</h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Powering the operations of hyper-growth companies.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Visual Builder", icon: MousePointer2, desc: "Drag and drop your logic. See your data flow in real-time.", color: "bg-blue-500" },
                { title: "200+ Apps", icon: Globe, desc: "Connect Slack, Salesforce, HubSpot and every tool you use.", color: "bg-purple-500" },
                { title: "Smart Logic", icon: Cpu, desc: "Branching, filters, and custom delays for complex ops.", color: "bg-emerald-500" },
                { title: "Team Collab", icon: Users, desc: "Share flows, assign owners, and audit history together.", color: "bg-orange-500" }
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] h-full hover:bg-white hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg", f.color)}>
                      <f.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight italic">{f.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE DEMO SPOTLIGHT */}
        <section id="demo" className="py-32 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-4xl md:text-7xl font-black mb-8 italic uppercase leading-[0.9]">Set up in <br/><span className="text-blue-500">15 minutes.</span></h2>
                  <div className="space-y-10">
                    {[
                      { step: "01", label: "Select Your Apps", text: "Authenticate your tools with secure OAuth in two clicks." },
                      { step: "02", label: "Define the Logic", text: "Choose a trigger and chain as many actions as you need." },
                      { step: "03", label: "Enable & Relax", text: "Turn it on and let FlowSync handle the manual labor." }
                    ].map((s, i) => (
                      <div key={i} className="flex gap-6 group">
                        <span className="text-4xl font-black text-white/10 group-hover:text-blue-500/40 transition-colors font-mono">{s.step}</span>
                        <div>
                          <h4 className="text-xl font-bold uppercase tracking-tight mb-2 italic">{s.label}</h4>
                          <p className="text-slate-400 font-medium leading-relaxed">{s.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.2}>
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-1 shadow-2xl">
                  <div className="bg-slate-900 rounded-[2.8rem] aspect-square flex flex-col items-center justify-center p-12 text-center group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform relative z-10">
                      <Play className="w-10 h-10 fill-current ml-1" />
                    </div>
                    <h3 className="text-2xl font-black mt-8 mb-4 relative z-10">Watch the Onboarding</h3>
                    <p className="text-slate-400 font-medium relative z-10">See exactly how we built a Lead Gen → CRM → Slack pipeline in under 3 minutes.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 5. USE CASES BY ROLE */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <FadeIn>
              <h2 className="text-4xl font-black text-center mb-20 uppercase tracking-tighter italic">Engineered for Your Team</h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                { 
                  role: "Marketing", 
                  icon: Target, 
                  tasks: ["Nurture leads across channels", "Automate campaign reporting", "Sync webinar attendees to CRM"],
                  case: "GrowthLabs saves 40hrs/week"
                },
                { 
                  role: "Sales Ops", 
                  icon: BarChart3, 
                  tasks: ["Real-time lead routing", "Automated contract generation", "Daily revenue snapshots"],
                  case: "TechStart scales 3x faster"
                },
                { 
                  role: "People Ops", 
                  icon: Users, 
                  tasks: ["Smooth employee onboarding", "Interview stage alerts", "Auto-generate offer letters"],
                  case: "RemoteFirst saves 15hrs/hire"
                }
              ].map((u, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col h-full group hover:border-blue-500/30 transition-all">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 mb-8 group-hover:rotate-12 transition-transform">
                      <u.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-black uppercase italic mb-8">{u.role} Operations</h3>
                    <ul className="space-y-6 flex-grow">
                      {u.tasks.map((task, ti) => (
                        <li key={ti} className="flex gap-3 text-slate-600 font-medium leading-tight">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" /> {task}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-12 pt-8 border-t border-slate-200">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Success Metric:</p>
                      <p className="text-blue-600 font-black italic">{u.case}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PRICING SECTION */}
        <section id="pricing" className="py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-slate-950 mb-6 tracking-tighter uppercase italic leading-none">ROI-First <br/>Pricing.</h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Simple tiers designed to grow with your team.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Starter", price: "29", tasks: "1,000", workflows: "5", color: "bg-white" },
                { name: "Professional", price: "79", tasks: "10,000", workflows: "Unlimited", featured: true, color: "bg-blue-600 text-white" },
                { name: "Enterprise", price: "Custom", tasks: "Unlimited", workflows: "Unlimited", color: "bg-slate-950 text-white" }
              ].map((tier, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={cn("p-12 rounded-[3.5rem] border flex flex-col h-full relative transition-all duration-500", tier.color, tier.featured ? "border-blue-400 shadow-2xl scale-105 z-10" : "border-slate-200 shadow-xl")}>
                    {tier.featured && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Most Popular</div>
                    )}
                    <div className="mb-12">
                      <h3 className="text-2xl font-black uppercase tracking-tight italic mb-4">{tier.name}</h3>
                      <div className="flex items-baseline gap-1">
                        {tier.price !== 'Custom' && <span className="text-xl font-bold opacity-60">$</span>}
                        <span className="text-6xl font-black tracking-tighter">{tier.price}</span>
                        {tier.price !== 'Custom' && <span className="text-lg opacity-60">/mo</span>}
                      </div>
                    </div>
                    
                    <ul className="space-y-6 flex-grow mb-12">
                      <li className="flex items-center gap-3 font-bold opacity-80 uppercase text-xs tracking-widest"><CheckCircle2 className="w-5 h-5" /> {tier.tasks} Tasks/mo</li>
                      <li className="flex items-center gap-3 font-bold opacity-80 uppercase text-xs tracking-widest"><CheckCircle2 className="w-5 h-5" /> {tier.workflows} Workflows</li>
                      <li className="flex items-center gap-3 font-bold opacity-80 uppercase text-xs tracking-widest"><CheckCircle2 className="w-5 h-5" /> 200+ Integrations</li>
                      {tier.featured && <li className="flex items-center gap-3 font-bold opacity-80 uppercase text-xs tracking-widest"><CheckCircle2 className="w-5 h-5" /> Advanced Logic</li>}
                    </ul>

                    <Button 
                      onClick={() => scrollTo('cta')}
                      className={cn(
                        "w-full h-auto py-8 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all",
                        tier.featured ? "bg-white text-blue-600 hover:bg-slate-50" : "bg-blue-600 text-white hover:bg-blue-700"
                      )}
                    >
                      {tier.price === 'Custom' ? "Contact Sales" : "Get Started"}
                    </Button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SECURITY & TRUST */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-40">
              <div className="flex items-center gap-3">
                <Lock className="w-10 h-10" />
                <span className="font-black text-xl italic uppercase tracking-tighter leading-none">SOC 2 <br/>TYPE II</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-10 h-10" />
                <span className="font-black text-xl italic uppercase tracking-tighter leading-none">GDPR <br/>COMPLIANT</span>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="w-10 h-10" />
                <span className="font-black text-xl italic uppercase tracking-tighter leading-none">99.9% <br/>UPTIME</span>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section id="cta" className="py-32 bg-white relative overflow-hidden text-center">
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-9xl font-black mb-12 uppercase tracking-tighter leading-none italic">Scale <br/><span className="text-blue-600">Without Effort.</span></h2>
              <p className="text-xl md:text-3xl text-slate-500 mb-16 max-w-3xl mx-auto font-medium">Join 12,000+ teams automating their growth with FlowSync.</p>
              
              <div className="max-w-xl mx-auto">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-10 bg-blue-50 border-2 border-blue-100 rounded-[3rem] shadow-2xl">
                    <CheckCircle2 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                    <h3 className="text-3xl font-black uppercase italic mb-4">Transmission Successful</h3>
                    <p className="text-slate-600 font-bold">Your instance is being provisioned. Check your email for access instructions.</p>
                  </motion.div>
                ) : (
                  <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:row gap-2">
                      <input 
                        {...form.register('email')}
                        placeholder="Your corporate email"
                        className="flex-grow p-6 rounded-[2rem] bg-transparent focus:outline-none font-bold text-lg"
                      />
                      <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xl px-12 py-8 h-auto rounded-[2rem] shadow-xl uppercase italic tracking-tight">
                        Start Now
                      </Button>
                    </form>
                  </div>
                )}
              </div>
              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Limited early access slots available for Q4.</p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 border-b border-white/5 pb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <Layers className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-black tracking-tighter uppercase">FlowSync</span>
              </div>
              <p className="text-slate-500 font-bold max-w-sm mb-12">The world's most intuitive workflow automation engine for hyper-growth teams. Built in San Francisco.</p>
              <div className="flex gap-6">
                <Instagram className="w-6 h-6 text-slate-500 hover:text-white transition-colors cursor-pointer" />
                <Twitter className="w-6 h-6 text-slate-500 hover:text-white transition-colors cursor-pointer" />
                <Mail className="w-6 h-6 text-slate-500 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-blue-500 mb-8">Product</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
                <li className="hover:text-white cursor-pointer transition-colors">Templates</li>
                <li className="hover:text-white cursor-pointer transition-colors">Smart Logic</li>
                <li className="hover:text-white cursor-pointer transition-colors">API Docs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-blue-500 mb-8">Company</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
            <p>&copy; 2025 FlowSync Automation Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer">Privacy</span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => scrollTo('cta')} className="w-full bg-blue-600 text-white font-black py-8 text-xl shadow-2xl rounded-2xl flex items-center justify-center gap-3 uppercase italic border-2 border-white/10 backdrop-blur-sm">
          <Zap className="w-6 h-6" />
          FREE TRIAL
        </Button>
      </div>

    </div>
  );
}

function MousePointer2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M6 6l.01 0" />
    </svg>
  );
}
