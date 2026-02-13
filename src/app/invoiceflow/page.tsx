
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Plus, 
  ShieldCheck, 
  Star, 
  Users, 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Globe, 
  Lock, 
  Smartphone,
  LayoutDashboard,
  PartyPopper,
  Mail,
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FadeIn } from '../FadeIn';

// --- SCHEMAS ---
const signupSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

// --- COMPONENTS ---

const OnboardingProgress = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-end mb-2">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">Setup Progress</p>
          <p className="text-3xl font-black text-slate-900">{progress}% Complete</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Next Step</p>
          <p className="text-sm font-bold text-slate-600">Add First Client</p>
        </div>
      </div>
      <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <motion.div 
          className="h-full bg-green-500" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const MilestoneCard = ({ step, title, desc, icon: Icon, active, completed }: any) => (
  <div className={cn(
    "p-8 rounded-[2.5rem] border-2 transition-all duration-500 relative overflow-hidden",
    completed ? "bg-green-50 border-green-200" : active ? "bg-white border-green-500 shadow-2xl scale-105 z-10" : "bg-white border-slate-100 opacity-60"
  )}>
    {completed && <CheckCircle2 className="absolute top-6 right-6 w-6 h-6 text-green-500" />}
    <div className={cn(
      "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
      completed || active ? "bg-green-500 text-white" : "bg-slate-100 text-slate-400"
    )}>
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Step 0{step}</p>
    <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default function InvoiceFlowPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const { toast } = useToast();
  const firestore = useFirestore();

  const { scrollYProgress } = useScroll();
  const progressValue = useTransform(scrollYProgress, [0, 0.8], [15, 100]);
  const [displayProgress, setDisplayProgress] = useState(15);

  useEffect(() => {
    return progressValue.onChange(v => setDisplayProgress(Math.round(v)));
  }, [progressValue]);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "InvoiceFlow Signup",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Welcome aboard!", description: "Check your email to complete your setup." });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Signup failed. Please try again." });
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-green-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:rotate-6 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-slate-900">InvoiceFlow</span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <button onClick={() => scrollTo('journey')} className="hover:text-green-600 transition-colors">Journey</button>
          <button onClick={() => scrollTo('features')} className="hover:text-green-600 transition-colors">Features</button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-green-600 transition-colors">Pricing</button>
          <Button onClick={() => scrollTo('cta')} className="rounded-full px-8 py-6 bg-slate-950 text-white hover:bg-green-600 transition-all">
            Start Free Trial
          </Button>
        </div>

        <button className="lg:hidden text-slate-900" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-slate-900" /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tighter italic text-slate-900">
              <button onClick={() => scrollTo('journey')} className="text-left">Journey</button>
              <button onClick={() => scrollTo('features')} className="text-left">Features</button>
              <button onClick={() => scrollTo('pricing')} className="text-left">Pricing</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO SECTION: THE PROGRESS START */}
        <section className="relative pt-40 pb-24 bg-white overflow-hidden">
          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-green-100 mb-8">
                <Clock className="w-3.5 h-3.5" /> Getting Paid in 4.2 Days (Avg)
              </div>
              <h1 className="text-5xl md:text-8xl font-black leading-[0.9] text-slate-950 tracking-tighter mb-8 italic uppercase">
                The Journey to <br/>
                <span className="text-green-500 underline decoration-slate-200 underline-offset-8">Getting Paid.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-16">
                Stop chasing clients. InvoiceFlow automates your entire billing cycle—from professional creation to automatic reminders—so you can focus on the work you love.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mb-16">
                <OnboardingProgress progress={displayProgress} />
              </div>
              <div className="max-w-md mx-auto">
                {isSuccess ? (
                  <div className="p-10 bg-green-50 rounded-[2.5rem] border-2 border-green-200 flex flex-col items-center gap-4">
                    <PartyPopper className="w-12 h-12 text-green-500 animate-bounce" />
                    <p className="font-black text-2xl text-green-900 uppercase italic">Journey Started!</p>
                    <p className="text-green-700">Check your email to unlock your first invoice.</p>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        {...form.register('email')}
                        placeholder="Work Email"
                        className="w-full bg-slate-50 border-2 border-slate-100 p-6 pl-14 rounded-2xl focus:border-green-500 focus:outline-none transition-all font-bold text-lg"
                      />
                    </div>
                    <Button type="submit" size="lg" className="bg-[#F97316] hover:bg-orange-600 text-white font-black text-xl py-8 h-auto rounded-2xl shadow-xl shadow-orange-500/20 transition-all uppercase italic">
                      Start Your Journey — Free
                    </Button>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      Trusted by 45,000+ Freelancers & Agencies
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 2. THE 4-STEP JOURNEY MAP */}
        <section id="journey" className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-green-500" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-slate-950 mb-6 uppercase tracking-tighter italic">From Work to Wealth.</h2>
                <p className="text-xl text-slate-500 font-bold uppercase tracking-[0.4em]">The 4-Step Milestone System</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <MilestoneCard 
                step={1} 
                title="Connect Account" 
                desc="Link your bank or Stripe in 30 seconds. Secure & encrypted."
                icon={Lock}
                completed={displayProgress > 25}
                active={displayProgress <= 25}
              />
              <MilestoneCard 
                step={2} 
                title="Brand Identity" 
                desc="Upload your logo and choose a palette. Professional in 1 click."
                icon={Smartphone}
                completed={displayProgress > 50}
                active={displayProgress > 25 && displayProgress <= 50}
              />
              <MilestoneCard 
                step={3} 
                title="Send Invoice" 
                desc="Zero manual entry. Use our templates to bill clients in seconds."
                icon={Zap}
                completed={displayProgress > 75}
                active={displayProgress > 50 && displayProgress <= 75}
              />
              <MilestoneCard 
                step={4} 
                title="Get Paid" 
                desc="Auto-reminders handle the chasing. Funds arrive in 1-2 days."
                icon={CreditCard}
                completed={displayProgress === 100}
                active={displayProgress > 75}
              />
            </div>
          </div>
        </section>

        {/* 3. FEATURE HIGHLIGHTS (Achievement Unlocked) */}
        <section id="features" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
              <FadeIn>
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center text-green-600">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-slate-950 uppercase tracking-tight italic">Automation is your <br/>new assistant.</h2>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium italic">
                    InvoiceFlow doesn't just store invoices. It manages them. Set up automatic reminders that nudges clients so you don't have to.
                  </p>
                  <ul className="space-y-6 pt-8 border-t border-slate-100">
                    <li className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"><Check className="w-4 h-4" /></div>
                      <p className="font-bold text-slate-700">Scheduled gentle follow-ups</p>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"><Check className="w-4 h-4" /></div>
                      <p className="font-bold text-slate-700">Read receipts for sent invoices</p>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"><Check className="w-4 h-4" /></div>
                      <p className="font-bold text-slate-700">Late fee auto-calculation</p>
                    </li>
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                    alt="Dashboard" 
                    fill 
                    className="object-cover"
                    data-ai-hint="business dashboard"
                  />
                </div>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <FadeIn className="lg:order-2">
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600">
                    <Users className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-slate-950 uppercase tracking-tight italic">A dedicated portal <br/>for your clients.</h2>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium italic">
                    Give your clients a self-service experience. They can view history, download receipts, and pay with one click—no login required.
                  </p>
                  <Button className="bg-slate-950 text-white rounded-full px-10 py-8 font-black uppercase text-xs tracking-widest hover:bg-green-600 transition-all">
                    Preview Client Portal
                  </Button>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="lg:order-1">
                <div className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2487&auto=format&fit=crop" 
                    alt="Payment" 
                    fill 
                    className="object-cover"
                    data-ai-hint="online payment"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. SUCCESS STORIES (Celebrations) */}
        <section className="py-32 bg-slate-950 text-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic">Victory Moments.</h2>
                <p className="text-xl text-green-500 font-bold uppercase tracking-[0.4em] mt-4">Real ROI from Real Business Owners</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { name: "Amy Roberts", role: "AR Design", stat: "3hr → 10min", quote: "Invoicing used to take my entire Sunday morning. Now it's done before my coffee gets cold." },
                { name: "James Wilson", role: "Consultant", stat: "90% On-Time", quote: "The auto-reminders changed everything. I haven't had a 'where is my money' talk in months." },
                { name: "Sarah Miller", role: "Agency Owner", stat: "2x Cash Flow", quote: "Accepting online payments was the missing piece. Clients pay instantly when the invoice arrives." }
              ].map((story, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem] h-full flex flex-col hover:bg-white/10 transition-colors group">
                    <p className="text-5xl font-black text-green-500 mb-8 group-hover:scale-110 transition-transform">{story.stat}</p>
                    <p className="text-lg italic text-slate-400 leading-relaxed mb-12 flex-grow">"{story.quote}"</p>
                    <div>
                      <p className="font-black uppercase tracking-tight text-white">{story.name}</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{story.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PRICING (Tier Milestones) */}
        <section id="pricing" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-slate-950 mb-6 uppercase tracking-tighter italic">Simple Tiers. <br/>Infinite Growth.</h2>
                <p className="text-xl text-slate-500 font-medium">Free forever for those just starting. Scale when you're ready.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Free", price: "0", perks: ["5 Invoices / mo", "Basic Templates", "Online Payments", "Standard Support"], color: "bg-white" },
                { name: "Pro", price: "19", perks: ["Unlimited Invoices", "Custom Branding", "Auto-Reminders", "Recurring Billing"], featured: true, color: "bg-white" },
                { name: "Business", price: "49", perks: ["Team Access (3 seats)", "Client Portal", "Time Tracking", "Advanced Reports"], color: "bg-white" }
              ].map((tier, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={cn(
                    "p-12 border flex flex-col h-full relative rounded-[3rem] transition-all duration-500",
                    tier.featured ? "border-green-500 shadow-2xl scale-105 z-10 bg-green-50/20" : "border-slate-100 bg-white"
                  )}>
                    {tier.featured && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                    )}
                    <div className="mb-12">
                      <h3 className="text-2xl font-black uppercase tracking-tight italic mb-2">{tier.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold opacity-60">$</span>
                        <span className="text-6xl font-black tracking-tighter">{tier.price}</span>
                        <span className="text-lg opacity-60">/mo</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-6 flex-grow mb-12">
                      {tier.perks.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-bold opacity-80">
                          <CheckCircle2 className={cn("w-5 h-5", tier.featured ? "text-green-500" : "text-slate-300")} /> {p}
                        </li>
                      ))}
                    </ul>

                    <Button className={cn(
                      "w-full h-auto py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all",
                      tier.featured ? "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20" : "bg-slate-950 text-white hover:bg-slate-800"
                    )}>
                      Select {tier.name}
                    </Button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. LOGO WALL */}
        <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-24 opacity-30 grayscale items-center">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-2xl font-black italic">UPWORK</span>
                <span className="text-2xl font-black italic">FIVERR</span>
                <span className="text-2xl font-black italic">99DESIGNS</span>
                <span className="text-2xl font-black italic">TOPTAL</span>
                <span className="text-2xl font-black italic">GURU</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 7. FINAL CTA: CELEBRATION */}
        <section id="cta" className="py-32 bg-white relative overflow-hidden text-center">
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-9xl font-black mb-12 uppercase tracking-tighter leading-none italic">Get Paid <br/><span className="text-green-500">For Your Best Work.</span></h2>
              <p className="text-xl md:text-3xl text-slate-500 mb-16 max-w-3xl mx-auto font-medium">Join 45,000+ business owners getting paid faster with InvoiceFlow.</p>
              
              <div className="max-w-xl mx-auto">
                {isSuccess ? (
                  <div className="p-10 bg-green-50 border-2 border-green-200 rounded-[3rem] shadow-2xl">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h3 className="text-3xl font-black uppercase italic mb-4">Transmission Successful</h3>
                    <p className="text-slate-600 font-bold">Your instance is being provisioned. Check your email for next steps.</p>
                  </div>
                ) : (
                  <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2">
                      <input 
                        {...form.register('email')}
                        placeholder="Your work email"
                        className="flex-grow p-6 rounded-[2rem] bg-transparent focus:outline-none font-bold text-lg"
                      />
                      <Button type="submit" size="lg" className="bg-[#F97316] hover:bg-orange-600 text-white font-black text-xl px-12 py-8 h-auto rounded-[2rem] shadow-xl uppercase italic transition-all">
                        Start Now
                      </Button>
                    </form>
                  </div>
                )}
              </div>
              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">14-Day Free Trial • Instant Setup • Cancellation Anytime</p>
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
                <FileText className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-black tracking-tighter uppercase">InvoiceFlow</span>
              </div>
              <p className="text-slate-500 font-bold max-w-sm mb-12">The industry standard for professional invoicing. Built for the next generation of independent creators.</p>
              <div className="flex gap-6">
                {['Twitter', 'LinkedIn', 'YouTube'].map(social => (
                  <span key={social} className="text-slate-400 hover:text-green-600 cursor-pointer font-black text-xs uppercase tracking-widest transition-colors">{social}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-green-600 mb-8">Product</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-slate-900 cursor-pointer">Templates</li>
                <li className="hover:text-slate-900 cursor-pointer">Payments</li>
                <li className="hover:text-slate-900 cursor-pointer">Reminders</li>
                <li className="hover:text-slate-900 cursor-pointer">Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-green-600 mb-8">Company</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-slate-900 cursor-pointer">About</li>
                <li className="hover:text-slate-900 cursor-pointer">Contact</li>
                <li className="hover:text-slate-900 cursor-pointer">Support</li>
                <li className="hover:text-slate-900 cursor-pointer">Careers</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <p>&copy; 2025 InvoiceFlow Technologies Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => scrollTo('cta')} className="w-full bg-[#F97316] text-white font-black py-8 text-xl shadow-2xl rounded-2xl flex items-center justify-center gap-3 uppercase italic border-2 border-white/10 backdrop-blur-sm">
          <Zap className="w-6 h-6" />
          FREE TRIAL
        </Button>
      </div>

    </div>
  );
}
