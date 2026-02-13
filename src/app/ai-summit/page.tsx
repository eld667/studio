
"use client";

import React, { useState } from 'react';
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
  Clock, 
  Briefcase, 
  Globe, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronRight,
  Menu,
  X,
  Play,
  FileText
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
import { AICalculator } from './AICalculator';
import { PlaceHolderImages } from "@/lib/placeholder-images";

const registerSchema = z.object({
  email: z.string().email("Invalid corporate email"),
});

export default function AISummitPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const heroImg = PlaceHolderImages.find(img => img.id === 'summit-hero')?.imageUrl || "https://picsum.photos/seed/summit/1200/800";
  const strategyImg = PlaceHolderImages.find(img => img.id === 'summit-strategy')?.imageUrl || "https://picsum.photos/seed/strat/800/600";
  const networkingImg = PlaceHolderImages.find(img => img.id === 'summit-networking')?.imageUrl || "https://picsum.photos/seed/net/800/600";

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "AI for Business Summit Inquiry",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Priority Access Granted", description: "Your executive briefing has been sent." });
    } catch (e) {
      toast({ variant: "destructive", title: "Transmission Failed", description: "Submission error. Please email directly." });
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#00D4AA] selection:text-[#0A2540] font-sans overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-[#0A2540] rounded flex items-center justify-center text-white font-black text-xl italic">A</div>
          <span className="text-xl font-black tracking-tighter uppercase text-[#0A2540]">AI Summit</span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <button onClick={() => scrollTo('calculator')} className="hover:text-[#0A2540] transition-colors">ROI Tool</button>
          <button onClick={() => scrollTo('speakers')} className="hover:text-[#0A2540] transition-colors">Faculty</button>
          <button onClick={() => scrollTo('tracks')} className="hover:text-[#0A2540] transition-colors">Curriculum</button>
          <button onClick={() => scrollTo('agenda')} className="hover:text-[#0A2540] transition-colors">Agenda</button>
          <Button onClick={() => scrollTo('register')} className="rounded-none px-8 py-6 bg-[#0A2540] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1a3a5a]">
            Reserve Seat
          </Button>
        </div>

        <button className="lg:hidden text-[#0A2540]" onClick={() => setIsMenuOpen(true)}>
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
            className="fixed inset-0 z-[110] bg-[#0A2540] p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-white" /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tighter italic text-white">
              <button onClick={() => scrollTo('calculator')} className="text-left">ROI Tool</button>
              <button onClick={() => scrollTo('speakers')} className="text-left">Faculty</button>
              <button onClick={() => scrollTo('tracks')} className="text-left">Curriculum</button>
              <button onClick={() => scrollTo('agenda')} className="text-left">Agenda</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO: THE BUSINESS CASE */}
        <section className="relative min-h-screen flex items-center pt-20 border-b border-slate-200 bg-white">
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-10">
            <div className="w-full h-full bg-[radial-gradient(#0A2540_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-[#00D4AA]/10 text-[#00D4AA] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-[#00D4AA]/20">
                  <Globe className="w-3.5 h-3.5" /> For Enterprise Leadership
                </div>
                <h1 className="text-5xl md:text-8xl font-black leading-[0.9] text-[#0A2540] tracking-tighter uppercase italic">
                  AI is Reshaping <br/>
                  <span className="text-[#00D4AA]">Business Value.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
                  November 5, 2024 • The Plaza, New York. <br/>
                  The practical AI conference for executives who need results, not hype.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Button onClick={() => scrollTo('register')} size="lg" className="w-full sm:w-auto bg-[#0A2540] hover:bg-[#1a3a5a] text-white font-black text-xl px-12 py-8 h-auto rounded-none uppercase tracking-tight">
                    RESERVE EXECUTIVE SEAT — $899
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-100">
                  <div>
                    <p className="text-3xl font-black text-[#0A2540]">500+</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">C-Level Attendees</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#0A2540]">87%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Implementation Rate</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#0A2540]">4.8/5</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Satisfaction</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl border-8 border-white group">
                <Image 
                  src={heroImg} 
                  alt="Executive Audience" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="conference audience"
                />
                <div className="absolute inset-0 bg-[#0A2540]/20" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 2. THE AI SAVINGS CALCULATOR */}
        <section id="calculator" className="py-32 bg-[#f8fafc]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-[#0A2540] mb-4 tracking-tighter uppercase italic">What's AI Worth to Your Business?</h2>
                <p className="text-xl text-slate-500 font-medium">Calculate organizational efficiency gains in 60 seconds.</p>
              </FadeIn>
            </div>
            <AICalculator />
          </div>
        </section>

        {/* 3. THE IMPLEMENTATION GAP */}
        <section className="py-32 bg-white border-y border-slate-200">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <FadeIn>
                <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src={strategyImg} 
                    alt="Strategy Session" 
                    fill 
                    className="object-cover"
                    data-ai-hint="business strategy"
                  />
                </div>
              </FadeIn>
              <div className="space-y-12">
                <FadeIn delay={0.2}>
                  <h2 className="text-4xl font-black text-[#0A2540] uppercase tracking-tight italic">Most AI initiatives fail. <br/>Not because of the tech.</h2>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium italic">
                    Because the strategy is wrong. 81% of executives know AI is critical, but only 23% have a clear implementation plan.
                  </p>
                  <div className="space-y-6 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#00D4AA]/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#00D4AA]" />
                      </div>
                      <p className="font-bold text-[#0A2540]">Actionable frameworks, not hype.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#00D4AA]/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#00D4AA]" />
                      </div>
                      <p className="font-bold text-[#0A2540]">Real implementation case studies.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#00D4AA]/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#00D4AA]" />
                      </div>
                      <p className="font-bold text-[#0A2540]">Board-ready deployment strategies.</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SPEAKER FACULTY */}
        <section id="speakers" className="py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-[#0A2540] mb-4 tracking-tighter uppercase italic">The Faculty</h2>
                <p className="text-xl text-slate-500 font-medium">Practitioners who have deployed AI at scale. No academics-only.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Dr. James Wilson", role: "Former AI Lead, Goldman Sachs", bio: "From trading algorithms to compliance—practical AI at scale.", img: PlaceHolderImages.find(i => i.id === 'summit-speaker-1')?.imageUrl },
                { name: "Sarah Chen", role: "VP Digital Transformation, Target", bio: "How we deployed AI across 1,900 stores.", img: PlaceHolderImages.find(i => i.id === 'summit-speaker-2')?.imageUrl },
                { name: "Michael Roberts", role: "CEO, AI Implementation Partners", bio: "What I've learned from 200+ enterprise rollouts.", img: PlaceHolderImages.find(i => i.id === 'summit-speaker-3')?.imageUrl },
                { name: "Dr. Emily Zhang", role: "Chief Data Officer, UnitedHealth", bio: "AI in regulated industries: the governance framework.", img: PlaceHolderImages.find(i => i.id === 'summit-speaker-4')?.imageUrl },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <Card className="h-full border-none shadow-xl group cursor-pointer bg-white rounded-2xl overflow-hidden">
                    <div className="relative aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                      <Image src={s.img!} alt={s.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-[#0A2540]/10" />
                    </div>
                    <CardContent className="p-8">
                      <h4 className="text-xl font-black text-[#0A2540] mb-1">{s.name}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#00D4AA] mb-4">{s.role}</p>
                      <p className="text-sm text-slate-500 italic leading-relaxed">"{s.bio}"</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CONFERENCE TRACKS */}
        <section id="tracks" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black text-[#0A2540] mb-20 text-center uppercase tracking-tighter italic">Strategic Tracks</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "AI Strategy & Leadership", items: ["Building your AI roadmap", "Board-level AI conversations", "Risk assessment frameworks", "Competitive positioning"], icon: Target },
                { title: "Implementation & Ops", items: ["Vendor evaluation & selection", "Integration without disruption", "Change management at scale", "Measuring success"], icon: Zap },
                { title: "Industry Deep-Dives", items: ["Finance: Trading & Risk", "Healthcare: Diagnostics", "Retail: Personalization", "Manufacturing: QA"], icon: Building2 },
                { title: "Governance & Ethics", items: ["Regulatory compliance (EU AI Act)", "Bias detection & mitigation", "Data privacy & security", "Building trust"], icon: ShieldCheck },
              ].map((track, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-10 bg-slate-50 border border-slate-100 rounded-2xl h-full hover:border-[#00D4AA]/30 transition-colors group">
                    <track.icon className="w-12 h-12 text-[#0A2540] mb-8 group-hover:text-[#00D4AA] transition-colors" />
                    <h3 className="text-2xl font-black text-[#0A2540] mb-6 uppercase tracking-tight italic">{track.title}</h3>
                    <ul className="space-y-4">
                      {track.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-600 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. THE EXECUTIVE EXPERIENCE */}
        <section className="py-32 bg-[#0A2540] text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic">The Executive Protocol</h2>
                <p className="text-xl text-[#00D4AA] font-medium tracking-widest mt-4">Curated. Actionable. Neutral.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: "Curated Networking", desc: "C-level roundtables and 1:1 peered meeting scheduler.", icon: Users },
                { title: "Actionable Content", desc: "Vendor-neutral case studies with real P&L impact.", icon: BarChart3 },
                { title: "Vendor Evaluation", desc: "Live capability comparisons and due diligence templates.", icon: ShieldCheck },
                { title: "Executive Toolkit", desc: "Pre-summit assessment and 90-day action plan template.", icon: Briefcase },
              ].map((p, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-white/5 rounded flex items-center justify-center border border-white/10">
                      <p.icon className="w-8 h-8 text-[#00D4AA]" />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tight">{p.title}</h4>
                    <p className="text-slate-400 leading-relaxed italic">{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 7. AGENDA */}
        <section id="agenda" className="py-32 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-[#0A2540] uppercase tracking-tighter italic">Sample Agenda</h2>
              </FadeIn>
            </div>

            <div className="space-y-12">
              {[
                { time: "8:00 AM", title: "Executive Breakfast Roundtables", desc: "Peered networking sessions organized by industry vertical." },
                { time: "9:00 AM", title: "Opening Keynote: The State of Enterprise AI", desc: "Strategic briefing on the 2025 landscape for organization-wide deployment." },
                { time: "12:00 PM", title: "Industry-Specific Working Lunch", desc: "Facilitated discussions on sector-specific regulatory hurdles." },
                { time: "1:30 PM", title: "Case Study Deep-Dives", desc: "Raw numbers from Fortune 500 implementations—failures included." },
                { time: "5:30 PM", title: "Closing Framework: Your 90-Day Plan", desc: "Final synthesis of the day's frameworks into a board-ready roadmap." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-100 last:border-0">
                    <div className="md:col-span-1">
                      <p className="text-2xl font-black text-[#00D4AA]">{item.time}</p>
                    </div>
                    <div className="md:col-span-3 space-y-2">
                      <h4 className="text-2xl font-black text-[#0A2540] uppercase tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 8. INVESTMENT */}
        <section id="register" className="py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-[#0A2540] uppercase tracking-tighter italic">Join the Leadership</h2>
                <p className="text-xl text-slate-500 font-medium mt-4">Limited to 500 executives. 60% capacity reached.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Executive Pass", price: "$899", perks: ["Full day access", "All session recordings", "Working lunch", "Digital toolkit"], color: "bg-white" },
                { name: "Executive Plus", price: "$1,499", perks: ["Everything in Pass", "Private dinner invitation", "1:1 Consultation", "Priority hotel block"], recommended: true, color: "bg-white" },
                { name: "Team Package (3+)", price: "$799", perks: ["Everything in Pass", "Shared frameworks", "Implementation planning session", "Dedicated liaison"], color: "bg-white" },
              ].map((tier, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={cn("p-12 border flex flex-col h-full relative rounded-2xl", tier.recommended ? "border-[#00D4AA] shadow-2xl scale-105 z-10 bg-[#0A2540] text-white" : "border-slate-200 bg-white")}>
                    {tier.recommended && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00D4AA] text-[#0A2540] px-6 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">Recommended</div>
                    )}
                    <div className="mb-12">
                      <h3 className="text-2xl font-black uppercase tracking-tight italic mb-2">{tier.name}</h3>
                      <p className={cn("text-5xl font-black tracking-tighter", tier.recommended ? "text-[#00D4AA]" : "text-[#0A2540]")}>{tier.price}</p>
                    </div>
                    
                    <ul className="space-y-6 flex-grow mb-12">
                      {tier.perks.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-bold opacity-80">
                          <CheckCircle2 className={cn("w-5 h-5", tier.recommended ? "text-[#00D4AA]" : "text-[#0A2540]")} /> {p}
                        </li>
                      ))}
                    </ul>

                    <Button className={cn("w-full h-auto py-6 rounded-none font-black uppercase tracking-[0.2em] text-xs transition-all", tier.recommended ? "bg-[#00D4AA] text-[#0A2540] hover:bg-white" : "bg-[#0A2540] text-white hover:bg-slate-800")}>
                      Reserve Slot
                    </Button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-24 bg-white border-t border-slate-200">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-4xl font-black text-[#0A2540] mb-16 text-center uppercase tracking-tighter italic">Intel Debrief</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "How technical is the content?", a: "The summit is focused on strategy and implementation. We discuss ROI, organizational change, and governance rather than writing code. Technical leads are encouraged to attend for architecture discussions." },
                { q: "Can I expense this as professional development?", a: "Absolutely. We provide detailed VAT-compliant invoices and can bill your company directly. This falls under strategic corporate development." },
                { q: "What is the cancellation policy?", a: "Full refunds are available up to 30 days before the event. Transfers to a colleague are permitted at any time without fee." },
                { q: "Is there a virtual option?", a: "Yes, we offer a high-fidelity live stream for $399 which includes full Q&A access and the digital toolkit." },
              ].map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-slate-50 border border-slate-100 rounded-xl px-8">
                  <AccordionTrigger className="text-left font-black text-lg hover:no-underline py-6 text-[#0A2540] uppercase tracking-tight">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 text-lg leading-relaxed pb-8 font-medium italic">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="py-32 bg-[#0A2540] relative overflow-hidden text-center text-white">
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none italic">The AI Decade is Here. <br/><span className="text-[#00D4AA]">Make It Yours.</span></h2>
              <p className="text-xl md:text-3xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium italic">November 5, 2024 • The Plaza, New York</p>
              
              <div className="max-w-md mx-auto">
                {isSuccess ? (
                  <div className="p-8 bg-[#00D4AA]/10 rounded-2xl border border-[#00D4AA]/20">
                    <CheckCircle2 className="w-12 h-12 text-[#00D4AA] mx-auto mb-4" />
                    <p className="text-2xl font-black italic">MISSION ACCEPTED.</p>
                    <p className="text-slate-400 mt-2">Check your inbox for the executive briefing.</p>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <input 
                      {...form.register('email')} 
                      placeholder="Corporate Email Address" 
                      className="w-full bg-white/10 border-2 border-white/20 p-6 rounded-none focus:border-[#00D4AA] focus:outline-none transition-all font-bold text-white text-center italic"
                    />
                    <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-[#00D4AA] hover:bg-white text-[#0A2540] font-black text-2xl py-10 rounded-none transition-all uppercase italic tracking-widest">
                      Reserve My Seat
                    </Button>
                  </form>
                )}
              </div>
              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Only 500 executive slots available.</p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white py-24 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#0A2540] rounded flex items-center justify-center text-white font-black text-lg italic">A</div>
            <span className="text-2xl font-black tracking-tighter text-[#0A2540] uppercase">AI Summit</span>
          </div>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-12 italic">Built for the next generation of leadership</p>
          <div className="flex justify-center gap-12 text-slate-500 font-black text-xs uppercase tracking-widest">
            <Link href="#" className="hover:text-[#00D4AA]">Privacy_Protocol</Link>
            <Link href="#" className="hover:text-[#00D4AA]">Terms_of_Service</Link>
            <Link href="#" className="hover:text-[#00D4AA]">Sponsorship</Link>
          </div>
          <p className="mt-12 text-slate-300 text-[10px] uppercase tracking-widest font-mono">&copy; 2024 EldWorkStudio Summit. NYC. All rights reserved.</p>
        </div>
      </footer>

      {/* STICKY CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => scrollTo('register')} className="w-full bg-[#0A2540] text-white font-black py-8 text-xl shadow-[0_10px_30px_rgba(10,37,64,0.4)] rounded-none flex items-center justify-center gap-3 border-2 border-white/20 backdrop-blur-sm italic">
          RESERVE SEAT — $899
        </Button>
      </div>

    </div>
  );
}
