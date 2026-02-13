"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  PieChart, 
  Database, 
  Globe, 
  Lock, 
  LayoutDashboard, 
  BrainCircuit,
  Settings,
  Bell,
  Search,
  Plus,
  ChevronRight,
  Menu,
  X,
  LineChart,
  Activity
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
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
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip 
} from 'recharts';

// --- SCHEMAS ---
const leadSchema = z.object({
  email: z.string().email("Invalid corporate email"),
});

// --- CONSTANTS ---
const chartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

// --- COMPONENTS ---

const MetricCounter = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span className="font-mono">{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

const DashboardUI = () => {
  return (
    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 font-sans">
      {/* Sidebar */}
      <div className="flex h-[600px]">
        <div className="w-16 md:w-64 bg-slate-900 text-white p-4 hidden md:flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">CH</div>
            <span className="font-bold tracking-tight">CustomerHub</span>
          </div>
          <nav className="flex flex-col gap-2">
            {['Overview', 'Segments', 'Campaigns', 'Activity', 'Settings'].map((item, i) => (
              <div key={item} className={cn("flex items-center gap-3 p-3 rounded-lg text-sm font-medium cursor-pointer", i === 0 ? "bg-purple-500/10 text-purple-400" : "text-slate-400 hover:bg-white/5")}>
                <LayoutDashboard className="w-4 h-4" />
                <span>{item}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Area */}
        <div className="flex-1 bg-slate-50 overflow-y-auto">
          <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Account Overview</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input className="bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-xs w-48 focus:ring-2 focus:ring-purple-500" placeholder="Search accounts..." />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200" />
            </div>
          </header>

          <main className="p-8 space-y-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Users', val: 12840, change: '+12%', icon: Users },
                { label: 'Avg Health', val: 84, suffix: '%', change: '+2.4%', icon: Activity },
                { label: 'Exp. Revenue', val: 45200, prefix: '$', change: '+18%', icon: TrendingUp },
              ].map((card, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><card.icon className="w-5 h-5" /></div>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{card.change}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">
                    <MetricCounter value={card.val} prefix={card.prefix} suffix={card.suffix} />
                  </p>
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-bold text-lg">Product Engagement</h3>
                  <p className="text-xs text-slate-400">Activity across all connected touchpoints</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-purple-500/10 text-purple-600 text-[10px] font-bold rounded-full">DAILY</div>
                  <div className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-full">WEEKLY</div>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" x2="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis hide />
                    <ReTooltip />
                    <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default function CustomerHubPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerCount, setCustomerCount] = useState([5000]);
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
      source: "CustomerHub Trial Signup",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Account Initialized", description: "Your demo environment is being built." });
    } catch (e) {
      toast({ variant: "destructive", title: "Sync Failed", description: "Submission error." });
    }
  };

  const currentPrice = useMemo(() => {
    if (customerCount[0] <= 1000) return 149;
    if (customerCount[0] <= 10000) return 399;
    return 999;
  }, [customerCount]);

  const currentTier = useMemo(() => {
    if (customerCount[0] <= 1000) return "Growth";
    if (customerCount[0] <= 10000) return "Scale";
    return "Enterprise";
  }, [customerCount]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-[#7C3AED] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
            <PieChart className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-slate-900">CustomerHub</span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-600 transition-colors">Platform</button>
          <button onClick={() => document.getElementById('method')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-600 transition-colors">Method</button>
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-600 transition-colors">Pricing</button>
          <Button onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full px-8 py-6 bg-slate-900 text-white hover:bg-purple-600 transition-all">
            Start Free Trial
          </Button>
        </div>

        <button className="lg:hidden text-slate-900"><Menu className="w-6 h-6" /></button>
      </nav>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-40 pb-24 bg-white overflow-hidden">
          <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-purple-100 mb-8">
                  <BrainCircuit className="w-3.5 h-3.5" /> AI-Powered CDP
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-[0.9] text-slate-950 tracking-tighter mb-8 uppercase italic">
                  Don't Guess. <br/>
                  <span className="text-purple-600 underline decoration-slate-200 underline-offset-8">Understand.</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
                  CustomerHub unifies every click, purchase, and support ticket into a 360° profile. Reduce churn by 35% with behavioral insights.
                </p>
                
                {isSuccess ? (
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    <p className="font-bold text-emerald-900">Mission Accepted. Check your inbox.</p>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                    <input 
                      {...form.register('email')}
                      placeholder="Work Email"
                      className="flex-grow bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-purple-500 focus:outline-none transition-all font-bold"
                    />
                    <Button type="submit" size="lg" className="bg-[#7C3AED] hover:bg-purple-700 text-white font-black text-lg px-10 py-8 h-auto rounded-2xl shadow-xl shadow-purple-600/20 transition-all">
                      Try Free
                    </Button>
                  </form>
                )}
                <div className="mt-8 flex items-center gap-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500" /> SOC 2 Type II
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> GDPR Ready
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.2}>
                <DashboardUI />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 2. SOCIAL PROOF LOGO WALL */}
        <section className="py-16 bg-slate-50/50 border-y border-slate-100 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-24 opacity-30 grayscale items-center">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-2xl font-black italic">NOTION</span>
                <span className="text-2xl font-black italic">FIGMA</span>
                <span className="text-2xl font-black italic">LINEAR</span>
                <span className="text-2xl font-black italic">VERCEL</span>
                <span className="text-2xl font-black italic">STRIPE</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 3. FEATURE HIGHLIGHTS */}
        <section id="features" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 uppercase tracking-tighter italic">Engineered for Clarity.</h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Stop hunting for data. Start acting on it.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Unified Profiles", icon: Users, desc: "See the full journey of every user, from first click to last renewal.", color: "bg-purple-500" },
                { title: "Segment Engine", icon: Target, desc: "Build powerful segments based on real behavior, not just attributes.", color: "bg-cyan-500" },
                { title: "Predictive AI", icon: BrainCircuit, desc: "Identify churn risk before it happens with machine learning scores.", color: "bg-indigo-500" },
                { title: "Integration Sync", icon: Database, desc: "Connect your entire stack in minutes with 200+ native connectors.", color: "bg-slate-900" }
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] h-full hover:bg-white hover:border-purple-500/20 hover:shadow-2xl transition-all duration-500">
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

        {/* 4. METHODOLOGY (Data Flow) */}
        <section id="method" className="py-32 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic">From Noise to Growth.</h2>
                <p className="text-xl text-slate-400 font-medium tracking-widest">THE THREE PHASES OF CUSTOMER INTELLIGENCE</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[
                { phase: "01", label: "COLLECT", title: "Unify Data Sources", desc: "Connect Salesforce, Stripe, and your product events into one stream." },
                { phase: "02", label: "ANALYZE", title: "Calculate Health", desc: "Our engine analyzes 50+ engagement signals to score every user." },
                { phase: "03", label: "ACT", title: "Trigger Growth", desc: "Automate Slack alerts for at-risk accounts or upsell prompts in Intercom." }
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem] h-full hover:bg-white/10 transition-colors">
                    <span className="text-6xl font-black text-white/5 absolute top-8 right-8 group-hover:text-purple-500/20 transition-colors">{step.phase}</span>
                    <p className="text-purple-500 font-black text-xs uppercase tracking-[0.4em] mb-4">{step.label}</p>
                    <h3 className="text-3xl font-black italic uppercase mb-6">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                  {i < 2 && <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-purple-500"><ArrowRight className="w-12 h-12 opacity-30" /></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PRICING WITH SLIDER */}
        <section id="pricing" className="py-32 bg-slate-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-slate-950 mb-6 uppercase tracking-tighter italic">Scale-Friendly Pricing.</h2>
                <p className="text-xl text-slate-500 font-medium">Simple tiers designed to grow with your customer base.</p>
              </FadeIn>
            </div>

            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">How many monthly tracked customers?</p>
                <div className="px-12">
                  <Slider 
                    defaultValue={customerCount} 
                    max={20000} 
                    step={100} 
                    onValueChange={setCustomerCount}
                    className="mb-8"
                  />
                </div>
                <p className="text-4xl font-black text-slate-900"><MetricCounter value={customerCount[0]} /> Customers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="p-8 bg-purple-500/5 border border-purple-500/20 rounded-3xl">
                    <p className="text-xs font-black text-purple-600 uppercase tracking-widest mb-2">Recommended Tier:</p>
                    <h3 className="text-4xl font-black italic uppercase text-slate-900">{currentTier}</h3>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-5xl font-black text-slate-900">${currentPrice}</span>
                      <span className="text-slate-400 font-bold">/mo</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#7C3AED] hover:bg-purple-700 text-white font-black text-xl py-10 rounded-2xl shadow-xl transition-all uppercase">
                    Start {currentTier} Trial
                  </Button>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black uppercase tracking-widest text-xs text-slate-400">Included in {currentTier}:</h4>
                  <ul className="space-y-4">
                    {[
                      "Unlimited user attributes",
                      "Historical data import",
                      "Multi-channel tracking",
                      "Visual segment builder",
                      "Custom health scoring"
                    ].map((perk, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-purple-500" /> {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SECURITY & TRUST */}
        <section className="py-32 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-4xl font-black text-slate-950 mb-8 uppercase tracking-tighter italic">Enterprise-Grade <br/>Data Integrity.</h2>
                  <p className="text-xl text-slate-500 mb-12 font-medium">We treat your customer data like it's ours. Encrypted, compliant, and always available.</p>
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { title: "SOC 2 Type II", desc: "Rigorous audit standards.", icon: Lock },
                      { title: "GDPR & CCPA", desc: "Global privacy compliance.", icon: ShieldCheck },
                      { title: "HIPAA Ready", desc: "For healthcare data needs.", icon: Activity },
                      { title: "99.9% Uptime", desc: "Always-on data infrastructure.", icon: Globe }
                    ].map((trust, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <trust.icon className="w-5 h-5 text-purple-500" />
                          <h4 className="font-bold text-slate-900">{trust.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{trust.desc}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center">
                    <ShieldCheck className="w-12 h-12 text-slate-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section id="cta" className="py-32 bg-[#0F172A] relative overflow-hidden text-center text-white">
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-9xl font-black mb-12 uppercase tracking-tighter leading-none italic">The Future is <br/><span className="text-purple-500">Knowable.</span></h2>
              <p className="text-xl md:text-3xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium">Join 850+ scale-ups understanding their customers with CustomerHub.</p>
              
              <div className="max-w-xl mx-auto">
                {isSuccess ? (
                  <div className="p-10 bg-purple-500/10 border-2 border-purple-500/20 rounded-[3rem] shadow-2xl">
                    <CheckCircle2 className="w-16 h-16 text-purple-500 mx-auto mb-6" />
                    <h3 className="text-3xl font-black uppercase italic mb-4">Transmission Successful</h3>
                    <p className="text-slate-400 font-bold">Your instance is being provisioned. Check your email.</p>
                  </div>
                ) : (
                  <div className="bg-white/5 p-2 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-sm">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2">
                      <input 
                        {...form.register('email')}
                        placeholder="Corporate Email Address"
                        className="flex-grow p-6 rounded-[2rem] bg-transparent focus:outline-none font-bold text-lg text-white placeholder:text-slate-600"
                      />
                      <Button type="submit" size="lg" className="bg-[#7C3AED] hover:bg-purple-700 text-white font-black text-xl px-12 py-8 h-auto rounded-[2rem] shadow-xl uppercase italic transition-all">
                        Start Trial
                      </Button>
                    </form>
                  </div>
                )}
              </div>
              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">No Credit Card • 14-Day Free Trial • Instant Setup</p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white py-24 px-6 md:px-12 border-t border-slate-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <PieChart className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-black tracking-tighter uppercase">CustomerHub</span>
              </div>
              <p className="text-slate-500 font-bold max-w-sm mb-12">The industry standard for customer intelligence. Built for growth teams that value data over guesswork.</p>
              <div className="flex gap-6">
                {['Twitter', 'LinkedIn', 'YouTube'].map(social => (
                  <span key={social} className="text-slate-400 hover:text-purple-600 cursor-pointer font-black text-xs uppercase tracking-widest transition-colors">{social}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-purple-600 mb-8">Platform</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-slate-900 cursor-pointer transition-colors">Integrations</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors">Segmentation</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors">Predictive AI</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors">API Docs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-purple-600 mb-8">Company</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-slate-900 cursor-pointer transition-colors">About</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors">Security</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <p>&copy; 2025 CustomerHub Intelligence Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-slate-900 cursor-pointer">Privacy Protocol</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-[#7C3AED] text-white font-black py-8 text-xl shadow-2xl rounded-2xl flex items-center justify-center gap-3 uppercase italic border-2 border-white/10 backdrop-blur-sm">
          <Zap className="w-6 h-6" />
          FREE TRIAL
        </Button>
      </div>

    </div>
  );
}
