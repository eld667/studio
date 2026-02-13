
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Code2, 
  GitPullRequest, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Search, 
  CheckCircle2,
  ChevronRight,
  Globe,
  Settings,
  Lock,
  ArrowRight
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
import { IDEPreview } from './IDEPreview';
import { TerminalCTA } from './TerminalCTA';

const leadSchema = z.object({
  email: z.string().email("Invalid corporate email"),
});

export default function CodeReviewProPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleLeadCapture = async (email: string) => {
    const leadId = uuidv4();
    const leadData = {
      email,
      id: leadId,
      source: "CodeReview Pro Trial Signup",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Command Executed", description: "Your development instance is being provisioned." });
    } catch (e) {
      toast({ variant: "destructive", title: "Fatal Error", description: "Submission failed. Check network logs." });
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] selection:bg-blue-500/30 selection:text-blue-400 font-mono overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-16 px-6 md:px-12 flex items-center justify-between bg-[#161B22]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 bg-[#238636] rounded flex items-center justify-center text-white shadow-lg">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-tight text-white uppercase italic">CodeReview Pro</span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
          <button onClick={() => scrollTo('features')} className="hover:text-blue-400 transition-colors">Rules</button>
          <button onClick={() => scrollTo('workflow')} className="hover:text-blue-400 transition-colors">Workflow</button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-blue-400 transition-colors">Pricing</button>
          <Button onClick={() => scrollTo('cta')} className="bg-[#238636] hover:bg-[#2ea043] text-white text-[10px] font-black uppercase rounded-md px-6">
            Get Trial
          </Button>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <div className="hidden md:flex items-center gap-2 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#238636] animate-pulse" />
            System Online
          </div>
          <Settings className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        </div>
      </nav>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-32 pb-24 border-b border-white/5">
          <div className="container relative z-10 mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-4">
                  <Zap className="w-3 h-3" /> Auto-Quality Analysis Active
                </div>
                <h1 className="text-5xl md:text-8xl font-black leading-[0.9] text-white tracking-tighter uppercase italic">
                  Ship Better Code. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Zero Technical Debt.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mt-8">
                  Automate code quality checks, streamline reviews with AI suggestions, and enforce team standards directly in your workflow.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <IDEPreview />
            </FadeIn>

            <div className="mt-20 flex justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden py-4">
              {['GITHUB', 'STRIPE', 'SHOPIFY', 'VERCEL', 'LINEAR'].map(logo => (
                <span key={logo} className="text-2xl font-black italic tracking-tighter">{logo}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. CORE ENGINE FEATURES */}
        <section id="features" className="py-32 bg-[#0D1117]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Automated Review", icon: Cpu, desc: "AI-powered suggestions for bugs, security, and best practices.", color: "text-blue-400" },
                { title: "Custom Rules", icon: Settings, desc: "Enforce team standards automatically across all pull requests.", color: "text-emerald-400" },
                { title: "Inline Discussions", icon: MessageSquare, desc: "Threaded conversations on specific lines, resolving automatically.", color: "text-purple-400" },
                { title: "Velocity Metrics", icon: BarChart3, desc: "Track review time, catch rate, and team velocity in real-time.", color: "text-orange-400" }
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 bg-[#161B22] border border-white/5 rounded-lg h-full hover:border-white/20 transition-all group">
                    <div className={cn("w-10 h-10 mb-6 flex items-center justify-center", f.color)}>
                      <f.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 uppercase italic">{f.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">{f.desc}</p>
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Status: active</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 3. GIT WORKFLOW VISUALIZATION */}
        <section id="workflow" className="py-32 bg-[#0D1117] border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic leading-none">The Pipeline <br/><span className="text-[#238636]">of Perfection.</span></h2>
                  <div className="space-y-12 relative before:absolute before:left-[1.25rem] before:top-4 before:bottom-4 before:w-px before:bg-white/10">
                    {[
                      { step: "COMMIT", label: "Developer Pushes Code", desc: "Hooks automatically trigger our analysis engine on every push." },
                      { step: "REVIEW", label: "Automated Feedback", desc: "Inline AI suggestions appear within seconds, catching 80% of issues." },
                      { step: "APPROVE", label: "Team Verification", desc: "Collaborate on complex logic with threaded discussions and resolve." },
                      { step: "MERGE", label: "Ship with Confidence", desc: "Quality gates ensure only high-standard code reaches production." }
                    ].map((s, i) => (
                      <div key={i} className="relative pl-12 group">
                        <div className="absolute left-0 top-1 w-10 h-10 rounded bg-[#161B22] border border-white/10 flex items-center justify-center group-hover:border-[#238636] transition-colors z-10">
                          <CheckCircle2 className="w-5 h-5 text-[#238636] opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="text-[10px] font-bold text-slate-600 group-hover:opacity-0 transition-opacity">0{i+1}</span>
                        </div>
                        <h4 className="text-sm font-black text-blue-400 mb-1 uppercase tracking-widest">{s.step}</h4>
                        <p className="text-xl font-bold text-white mb-2">{s.label}</p>
                        <p className="text-sm text-slate-500 font-sans leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.2}>
                <div className="relative aspect-square rounded-[2rem] bg-[#161B22] border border-white/10 p-12 flex flex-col items-center justify-center text-center group">
                  <GitPullRequest className="w-32 h-32 text-[#238636] mb-8 group-hover:rotate-12 transition-transform" />
                  <h3 className="text-3xl font-black text-white uppercase italic mb-4">Pull Request Analytics</h3>
                  <p className="text-slate-400 max-w-sm font-sans italic">"We cut review time by 60% and production bugs dropped by 40%. It's like having a senior dev pair programming with every team member."</p>
                  <div className="mt-8 flex gap-4">
                    <div className="px-4 py-2 bg-white/5 rounded border border-white/10">
                      <p className="text-2xl font-black text-emerald-400">60%</p>
                      <p className="text-[8px] uppercase tracking-widest text-slate-500">Faster Reviews</p>
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded border border-white/10">
                      <p className="text-2xl font-black text-orange-400">40%</p>
                      <p className="text-[8px] uppercase tracking-widest text-slate-500">Fewer Bugs</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. PRICING TERMINAL */}
        <section id="pricing" className="py-32 bg-[#0D1117]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24 space-y-4">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic">CHOOSE YOUR PLAN.</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.4em]">Scaling with Your Infrastructure</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Open Source", price: "0", desc: "For public repositories", perks: ["Unlimited public repos", "Basic rules engine", "Community support", "GitHub integration"] },
                { name: "Team", price: "15", desc: "For private engineering teams", perks: ["Private repository access", "Custom rules engine", "Priority 24/7 support", "Full CI/CD integrations"], featured: true },
                { name: "Enterprise", price: "Custom", desc: "For security-first orgs", perks: ["Self-hosted option", "SSO & SCIM provisioning", "Advanced security audit", "Dedicated success lead"] }
              ].map((tier, i) => (
                <FadeIn key={tier.name} delay={i * 0.1}>
                  <div className={cn(
                    "p-10 border flex flex-col h-full relative group transition-all duration-500",
                    tier.featured ? "bg-[#161B22] border-[#238636] shadow-[0_0_40px_rgba(35,134,54,0.1)] scale-105 z-10" : "bg-transparent border-white/5 hover:border-white/20"
                  )}>
                    {tier.featured && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#238636] text-white px-4 py-1 text-[8px] font-black uppercase tracking-widest">Recommended</div>
                    )}
                    <div className="mb-12">
                      <h3 className="text-2xl font-black uppercase italic text-white mb-2">{tier.name}</h3>
                      <p className="text-xs text-slate-500 mb-6">{tier.desc}</p>
                      <div className="flex items-baseline gap-1">
                        {tier.price !== 'Custom' && <span className="text-xl font-bold text-slate-500">$</span>}
                        <span className="text-6xl font-black tracking-tighter text-white">{tier.price}</span>
                        {tier.price !== 'Custom' && <span className="text-sm text-slate-500">/dev/mo</span>}
                      </div>
                    </div>
                    
                    <ul className="space-y-4 flex-grow mb-12">
                      {tier.perks.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Check className={cn("w-3 h-3", tier.featured ? "text-[#238636]" : "text-slate-600")} /> {p}
                        </li>
                      ))}
                    </ul>

                    <Button className={cn(
                      "w-full h-auto py-6 rounded-none font-black uppercase tracking-[0.2em] text-[10px] transition-all",
                      tier.featured ? "bg-[#238636] text-white hover:bg-[#2ea043]" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    )}>
                      Initialize Plan
                    </Button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FINAL CTA TERMINAL */}
        <section id="cta" className="py-32 bg-[#0D1117] relative">
          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-5xl md:text-[100px] font-black mb-12 uppercase tracking-tighter leading-none italic">Ship <br/><span className="text-blue-500">Without Fear.</span></h2>
              <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto font-sans font-medium">Join 5,000+ engineering teams catchings bugs before they reach the main branch.</p>
              
              <div className="max-w-xl mx-auto">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-12 bg-emerald-500/10 border-2 border-[#238636] rounded-xl shadow-2xl">
                    <CheckCircle2 className="w-16 h-16 text-[#238636] mx-auto mb-6" />
                    <h3 className="text-3xl font-black uppercase italic mb-4">Instance Ready</h3>
                    <p className="text-slate-400 font-bold">Check your return path for credentials and SSH instructions.</p>
                  </motion.div>
                ) : (
                  <TerminalCTA onSubmit={handleLeadCapture} isSubmitting={false} />
                )}
              </div>
              
              <div className="mt-16 flex justify-center gap-12 text-slate-600 grayscale opacity-30 pointer-events-none">
                <div className="flex items-center gap-2"><Lock className="w-4 h-4" /> SOC 2 Type II</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> GDPR Ready</div>
                <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> 99.9% Uptime</div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#161B22] text-[#E6EDF3] py-24 px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 border-b border-white/5 pb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <Code2 className="w-8 h-8 text-[#238636]" />
                <span className="text-2xl font-black tracking-tighter uppercase italic">CodeReview Pro</span>
              </div>
              <p className="text-slate-500 font-bold max-w-sm mb-12">The industry standard for automated code quality and engineering velocity. Developed for developers.</p>
              <div className="flex gap-6 text-slate-500 font-bold text-xs uppercase tracking-widest">
                <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
                <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-blue-400 mb-8">Registry</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-xs">
                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
                <li className="hover:text-white cursor-pointer transition-colors">Security Model</li>
                <li className="hover:text-white cursor-pointer transition-colors">API Keys</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-blue-400 mb-8">Company</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-xs">
                <li className="hover:text-white cursor-pointer transition-colors">About_Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Hiring_Engine</li>
                <li className="hover:text-white cursor-pointer transition-colors">Legal_Notice</li>
                <li className="hover:text-white cursor-pointer transition-colors">Support_Terminal</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
            <p>&copy; 2025 CodeReview Pro Systems. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy_Protocol</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms_of_Use</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY CTA (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => scrollTo('cta')} className="w-full bg-[#238636] text-white font-black py-8 text-lg shadow-2xl rounded-lg flex items-center justify-center gap-3 uppercase border-2 border-white/5 backdrop-blur-sm italic">
          <Terminal className="w-6 h-6" />
          START_TRIAL
        </Button>
      </div>

    </div>
  );
}
