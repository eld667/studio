'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Users, 
  MapPin, 
  Waves, 
  Flame, 
  CheckCircle2, 
  Compass, 
  Sun, 
  Coffee, 
  ChevronRight, 
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Star,
  Quote,
  X,
  Home
} from 'lucide-react';
import Image from 'next/image';
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
import { FadeIn } from '@/app/FadeIn';
import { PlaceHolderImages } from "@/lib/placeholder-images";

// --- SCHEMAS ---
const applicationSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(1, "Company required"),
  stage: z.string().min(1, "Stage required"),
  reason: z.string().min(10, "Please share your reason for attending"),
  struggle: z.string().min(10, "Sharing your struggle helps us match you"),
  hope: z.string().min(10, "What do you hope to leave with?"),
});

// --- DATA ---
const cohorts = [
  { id: 'a', stage: 'Series B, $15M ARR', industry: 'B2B SaaS', location: 'San Francisco', challenge: 'Scaling from 50 to 200 people', why: 'I don\'t know how to be a CEO of a big company', x: '20%', y: '30%' },
  { id: 'b', stage: 'Bootstrapped, $4M ARR', industry: 'E-commerce tools', location: 'Austin', challenge: 'Staying authentic while growing', why: 'Feeling disconnected from why I started', x: '45%', y: '25%' },
  { id: 'c', stage: 'Seed, pre-revenue', industry: 'Climate tech', location: 'London', challenge: 'Raising first round', why: 'Need perspective on my pitch and product', x: '70%', y: '35%' },
  { id: 'd', stage: 'Series C, $40M ARR', industry: 'Fintech', location: 'NYC', challenge: 'Board dynamics and next phase', why: 'Burnout is real. I need rest and peers.', x: '30%', y: '60%' },
  { id: 'e', stage: 'Series A, $2M ARR', industry: 'HealthTech', location: 'Berlin', challenge: 'Hiring the first exec team', why: 'I\'m making too many mistakes in hiring', x: '15%', y: '75%' },
  { id: 'f', stage: 'Series B, $8M ARR', industry: 'Cybersecurity', location: 'Tel Aviv', challenge: 'Product-market fit expansion', why: 'Feeling the pressure of high expectations', x: '80%', y: '65%' },
  { id: 'g', stage: 'Bootstrapped, $1M ARR', industry: 'Lifestyle', location: 'Bali', challenge: 'Operational overload', why: 'I need to step back to move forward', x: '55%', y: '80%' },
  { id: 'h', stage: 'Series A, $5M ARR', industry: 'Logistics', location: 'Chicago', challenge: 'Conflict with co-founder', why: 'I need a neutral space to process', x: '85%', y: '20%' },
];

const days = [
  { 
    day: 'Day 1', 
    title: 'Arrival & Opening Circle', 
    img: 'founders-fire',
    items: ['2:00 PM — Arrive, settle into villa', '4:00 PM — Welcome circle: "Why are you really here?"', '7:00 PM — Family-style dinner', '9:00 PM — Fireside stories'] 
  },
  { 
    day: 'Day 2', 
    title: 'The Work', 
    img: 'retreat-pavilion',
    items: ['7:00 AM — Optional morning movement', '9:00 AM — Session: "The Challenge You\'re Facing"', '2:00 PM — Peer consulting circles', '5:00 PM — Jungle walk'] 
  },
  { 
    day: 'Day 3', 
    title: 'The Breakthrough', 
    img: 'retreat-beach',
    items: ['7:00 AM — Yoga or meditation', '9:00 AM — Session: "What I Wish I Knew"', '2:00 PM — Solo time (beach, hike, rest)', '9:00 PM — Commitment ceremony'] 
  },
  { 
    day: 'Day 4', 
    title: 'Departure', 
    img: 'retreat-villa',
    items: ['9:00 AM — Breakfast', '10:00 AM — Final circle: "What I\'m taking home"', '12:00 PM — Departures'] 
  },
];

// --- COMPONENTS ---

export default function FounderRetreatPage() {
  const [activeFounder, setActiveFounder] = useState<typeof cohorts[0] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const heroImg = PlaceHolderImages.find(img => img.id === 'retreat-mist')?.imageUrl || "https://picsum.photos/seed/mist/1920/1080";
  const aloneImg = PlaceHolderImages.find(img => img.id === 'founder-alone')?.imageUrl || "https://picsum.photos/seed/alone/800/600";
  const togetherImg = PlaceHolderImages.find(img => img.id === 'founders-fire')?.imageUrl || "https://picsum.photos/seed/fire/800/600";

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { name: "", email: "", company: "", stage: "", reason: "", struggle: "", hope: "" },
  });

  const onSubmit = async (values: z.infer<typeof applicationSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "Founder Retreat Application",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Application Received", description: "Marcus will review your profile and reach out for a call." });
    } catch (e) {
      toast({ variant: "destructive", title: "Transmission Error", description: "Submission failed. Please email hello@founderretreat.co" });
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D5016] selection:bg-[#D4A373] selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. ENTRANCE */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#2D5016]">
        <div className="absolute inset-0 z-0">
          <Image src={heroImg} alt="Costa Rica Mist" fill className="object-cover opacity-40 grayscale-[20%]" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D5016]/40 via-transparent to-[#2D5016]" />
        </div>
        <div className="relative z-10 text-center space-y-8 px-6">
          <FadeIn>
            <p className="text-sm md:text-xl font-medium tracking-[0.3em] text-[#FAF7F2]/80 uppercase mb-4">You don't need more advice.</p>
            <h1 className="text-5xl md:text-8xl font-serif italic text-[#FAF7F2] leading-[0.9] tracking-tight">
              You need people <br/>who understand.
            </h1>
            <p className="text-sm md:text-lg font-bold tracking-[0.5em] text-[#FAF7F2]/60 uppercase mt-12">
              December 8-11, 2024 • Santa Teresa, Costa Rica
            </p>
            <div className="mt-16 flex flex-col items-center gap-4">
              <Button onClick={() => scrollTo('cohort')} className="bg-[#FAF7F2] text-[#2D5016] hover:bg-white rounded-full px-12 py-8 text-lg font-bold transition-all shadow-2xl">
                Begin
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="py-32 px-6 bg-white border-b border-[#9CAF88]/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-serif italic leading-tight text-[#2D5016]">The higher you climb, <br/>the lonelier it gets.</h2>
                <div className="w-20 h-px bg-[#D4A373]" />
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-serif">
                  <p>The emails never stop. The decisions keep coming. Everyone looks to you for certainty—your investors, your team, your family.</p>
                  <p>But who do YOU talk to when you don't have the answers? When the weight feels like too much?</p>
                  <p className="text-2xl text-[#2D5016] italic font-bold">What if you could step away? Not to network. To breathe.</p>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="relative">
            <FadeIn delay={0.2}>
              <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl">
                <Image src={aloneImg} alt="Founder Alone" fill className="object-cover grayscale" data-ai-hint="founder tired" />
                <div className="absolute inset-0 bg-[#2D5016]/10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. THE COHORT PREVIEW (Centerpiece) */}
      <section id="cohort" className="py-32 px-6 relative overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#9CAF88]">December 2024 Cohort</h2>
              <p className="text-4xl md:text-7xl font-serif italic text-[#2D5016]">Who Will You Journey With?</p>
              <p className="text-slate-500 max-w-2xl mx-auto font-medium">An anonymized look at your future circle. No pitches. No status games. Just peers.</p>
            </FadeIn>
          </div>

          <div className="relative aspect-video bg-[#9CAF88]/10 rounded-[4rem] border border-[#9CAF88]/20 shadow-inner overflow-hidden group">
            {/* Founders Constellation */}
            {cohorts.map((founder) => (
              <motion.button
                key={founder.id}
                className={cn(
                  "absolute w-4 h-4 md:w-6 md:h-6 rounded-full transition-all duration-500",
                  activeFounder?.id === founder.id ? "bg-[#D4A373] scale-150 shadow-[0_0_20px_#D4A373]" : "bg-[#2D5016]/40 hover:bg-[#2D5016]/60"
                )}
                style={{ left: founder.x, top: founder.y }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveFounder(founder)}
              />
            ))}

            {/* Info Overlay */}
            <AnimatePresence>
              {activeFounder && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute top-8 right-8 w-full max-w-sm bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-[#9CAF88]/30 z-20"
                >
                  <button onClick={() => setActiveFounder(null)} className="absolute top-4 right-4 text-slate-400 hover:text-[#2D5016]"><X className="w-5 h-5"/></button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#D4A373] mb-4">Anonymized Profile {activeFounder.id.toUpperCase()}</p>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage & Industry</p>
                      <p className="text-xl font-serif italic text-[#2D5016]">{activeFounder.stage} in {activeFounder.industry}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Core Challenge</p>
                      <p className="text-sm text-slate-600 font-medium">{activeFounder.challenge}</p>
                    </div>
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl italic text-sm text-[#2D5016]/80 font-serif border-l-2 border-[#D4A373]">
                      "{activeFounder.why}"
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!activeFounder && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2D5016]/20 animate-pulse">Click a founder to reveal their journey</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
            {[
              { label: 'Series A+', val: '12' },
              { label: 'Avg ARR', val: '$8M' },
              { label: 'Global Cities', val: '9' },
              { label: 'Spots Left', val: '7' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-5xl font-serif italic text-[#2D5016]">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#9CAF88] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE EXPERIENCE */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#9CAF88] mb-4">4 Days of Truth</h2>
              <p className="text-4xl md:text-7xl font-serif italic text-[#2D5016]">The Arc of Immersion</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {days.map((day, i) => (
              <FadeIn key={day.day} delay={i * 0.1}>
                <div className="group relative bg-[#FAF7F2] rounded-[3rem] p-10 overflow-hidden border border-transparent hover:border-[#D4A373]/30 transition-all duration-500 shadow-xl h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-sm font-black text-[#D4A373] uppercase tracking-widest">{day.day}</span>
                    <h3 className="text-2xl md:text-3xl font-serif italic text-[#2D5016]">{day.title}</h3>
                  </div>
                  <ul className="space-y-4 flex-grow">
                    {day.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-600 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" /> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-12 relative aspect-video rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-lg">
                    <Image src={PlaceHolderImages.find(img => img.id === day.img)?.imageUrl || "https://picsum.photos/seed/day/800/600"} alt={day.title} fill className="object-cover" data-ai-hint="retreat activities" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCATION */}
      <section className="py-32 px-6 bg-[#2D5016] text-[#FAF7F2] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={PlaceHolderImages.find(img => img.id === 'retreat-beach')?.imageUrl || "https://picsum.photos/seed/beach/1920/1080"} alt="Santa Teresa" fill className="object-cover opacity-20" data-ai-hint="paradise beach" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeIn>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#FAF7F2]/40">The Sanctuary</h2>
                  <p className="text-4xl md:text-8xl font-serif italic leading-none">Santa Teresa, <br/>Costa Rica</p>
                </div>
                <p className="text-xl md:text-2xl text-[#FAF7F2]/80 font-serif italic leading-relaxed max-w-xl">
                  Where the jungle meets the Pacific. No phone service unless you want it. No pitch meetings. No FOMO—just waves, wildlife, and real conversation.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="flex items-center gap-4">
                    <Waves className="w-8 h-8 text-[#D4A373]" />
                    <span className="text-sm font-bold uppercase tracking-widest">Pacific Ocean</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Zap className="w-8 h-8 text-[#D4A373]" />
                    <span className="text-sm font-bold uppercase tracking-widest">Digital Detox</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 gap-4">
              <FadeIn delay={0.2} className="space-y-4">
                <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image src={PlaceHolderImages.find(img => img.id === 'retreat-villa')?.imageUrl || "https://picsum.photos/seed/villa/600/600"} alt="Villa" fill className="object-cover" data-ai-hint="luxury villa" />
                </div>
                <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image src={PlaceHolderImages.find(img => img.id === 'founders-fire')?.imageUrl || "https://picsum.photos/seed/night/600/400"} alt="Gathering" fill className="object-cover" data-ai-hint="campfire" />
                </div>
              </FadeIn>
              <FadeIn delay={0.4} className="pt-12 space-y-4">
                <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image src={PlaceHolderImages.find(img => img.id === 'retreat-pavilion')?.imageUrl || "https://picsum.photos/seed/deck/600/800"} alt="Pavilion" fill className="object-cover" data-ai-hint="yoga pavilion" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT'S INCLUDED */}
      <section className="py-32 px-6 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#9CAF88] mb-4">Total Ease</h2>
              <p className="text-4xl md:text-6xl font-serif italic text-[#2D5016]">Everything Included</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: Home, title: 'Accommodation', items: ['3 nights private room', 'Luxury villa ocean views', 'Pool & yoga deck'] },
              { icon: Coffee, title: 'Food & Drink', items: ['All gourmet meals', 'Local Costa Rican cuisine', 'Wine with dinner'] },
              { icon: Heart, title: 'Wellness', items: ['Daily yoga or surf', 'One signature massage', 'Beach access'] },
              { icon: Users, title: 'Programming', items: ['Facilitated sessions', 'Peer consulting circles', '1:1 Founder matching'] },
              { icon: MapPin, title: 'Logistics', items: ['Airport transfers', 'Local transport', 'Concierge support'] },
              { icon: Compass, title: 'Discovery', items: ['Jungle hikes', 'Sunset boat trip', 'Secret beach access'] }
            ].map((box, i) => {
              const Icon = box.icon;
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="p-10 bg-white rounded-[2.5rem] shadow-xl border border-[#9CAF88]/10 h-full">
                    <Icon className="w-10 h-10 text-[#D4A373] mb-8" />
                    <h4 className="text-xl font-serif italic text-[#2D5016] mb-6">{box.title}</h4>
                    <ul className="space-y-3">
                      {box.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#9CAF88]" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. THE GUIDES */}
      <section className="py-32 px-6 bg-[#2D5016] text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#FAF7F2]/40 mb-4">Facilitators</h2>
              <p className="text-4xl md:text-6xl font-serif italic">Your Guides</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: 'Marcus Chen', role: 'Lead Facilitator', bio: 'Former founder (exited 2 companies). 500+ hours facilitating groups.', img: 'https://picsum.photos/seed/marcus/400/500' },
              { name: 'Dr. Sarah Williams', role: 'Psychologist', bio: 'Specializes in founder mental health, burnout, and decision-making.', img: 'https://picsum.photos/seed/sarahw/400/500' },
              { name: 'Elena Rodriguez', role: 'Retreat Host', bio: 'Costa Rica local. Makes sure everything runs smoothly and holds the space.', img: 'https://picsum.photos/seed/elena/400/500' }
            ].map((guide, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="space-y-6 group">
                  <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl">
                    <Image src={guide.img} alt={guide.name} fill className="object-cover" data-ai-hint="portrait" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif italic">{guide.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#D4A373] mt-1 mb-4">{guide.role}</p>
                    <p className="text-sm text-[#FAF7F2]/60 leading-relaxed">{guide.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHO THIS IS FOR */}
      <section className="py-32 px-6 bg-white border-y border-[#9CAF88]/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn>
            <div className="bg-[#9CAF88]/5 p-12 rounded-[3rem] border border-[#9CAF88]/20 h-full">
              <h3 className="text-2xl font-serif italic text-[#2D5016] mb-8 flex items-center gap-3">
                <CheckCircle2 className="text-[#9CAF88]" /> Yes, apply if:
              </h3>
              <ul className="space-y-6 text-slate-600 font-medium italic">
                {[
                  "You're a founder/CEO of a startup (any stage)",
                  "You're feeling stuck, burned out, or lonely",
                  "You want peer connection, not networking",
                  "You can commit to being 100% present",
                  "You're open to vulnerability"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#9CAF88] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-[#D4A373]/5 p-12 rounded-[3rem] border border-[#D4A373]/20 h-full">
              <h3 className="text-2xl font-serif italic text-[#2D5016] mb-8 flex items-center gap-3">
                <X className="text-[#D4A373]" /> No, skip if:
              </h3>
              <ul className="space-y-6 text-slate-600 font-medium italic">
                {[
                  "You're looking for investors (wrong place)",
                  "You want to pitch your company",
                  "You can't disconnect for 4 days",
                  "You're not ready to be honest about struggles",
                  "You just want a standard vacation"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <X className="w-5 h-5 text-[#D4A373] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9. INVESTMENT */}
      <section className="py-32 px-6 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#9CAF88] mb-4">The Investment</h2>
            <p className="text-5xl md:text-8xl font-serif italic text-[#2D5016]">$3,500</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4A373]">All-Inclusive Experience</p>
            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-3xl shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#9CAF88] mb-2">Full Payment</p>
                <p className="text-2xl font-serif italic text-[#2D5016]">$3,500</p>
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#9CAF88] mb-2">2 Payments</p>
                <p className="text-2xl font-serif italic text-[#2D5016]">$1,800</p>
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#9CAF88] mb-2">Scholarship</p>
                <p className="text-sm font-bold text-slate-400">1 Spot Reserved</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 10. APPLICATION */}
      <section id="apply" className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-[#FAF7F2] rounded-[4rem] p-12 md:p-24 shadow-2xl relative overflow-hidden border border-[#9CAF88]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A373]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#2D5016]">Begin the Journey</h2>
            <p className="text-slate-500 font-medium">8 of 15 spots filled. We review every application for cohort balance.</p>
          </div>

          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 py-12">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                <Users className="w-12 h-12 text-[#9CAF88]" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif italic text-[#2D5016]">Application Received.</h3>
                <p className="text-slate-500 max-sm mx-auto">Marcus will reach out within 48 hours to schedule your 20-minute alignment call.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#9CAF88]">Full Name</label>
                  <input {...form.register('name')} className="w-full bg-white border-none rounded-2xl p-5 focus:ring-2 focus:ring-[#D4A373] transition-all text-[#2D5016] font-medium" placeholder="Elias Vance" />
                  {form.formState.errors.name && <p className="text-[10px] text-red-400 font-bold">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#9CAF88]">Work Email</label>
                  <input {...form.register('email')} className="w-full bg-white border-none rounded-2xl p-5 focus:ring-2 focus:ring-[#D4A373] transition-all text-[#2D5016] font-medium" placeholder="elias@company.com" />
                  {form.formState.errors.email && <p className="text-[10px] text-red-400 font-bold">{form.formState.errors.email.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#9CAF88]">Company</label>
                    <input {...form.register('company')} className="w-full bg-white border-none rounded-2xl p-5 focus:ring-2 focus:ring-[#D4A373] transition-all text-[#2D5016] font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#9CAF88]">Current Stage</label>
                    <input {...form.register('stage')} className="w-full bg-white border-none rounded-2xl p-5 focus:ring-2 focus:ring-[#D4A373] transition-all text-[#2D5016] font-medium" placeholder="e.g. Series B" />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#9CAF88]">The Struggle</label>
                  <textarea {...form.register('struggle')} rows={3} className="w-full bg-white border-none rounded-2xl p-5 focus:ring-2 focus:ring-[#D4A373] transition-all text-[#2D5016] font-medium resize-none" placeholder="What's weighing on you right now?" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#9CAF88]">The Hope</label>
                  <textarea {...form.register('hope')} rows={3} className="w-full bg-white border-none rounded-2xl p-5 focus:ring-2 focus:ring-[#D4A373] transition-all text-[#2D5016] font-medium resize-none" placeholder="What do you hope to leave with?" />
                </div>
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-[#2D5016] hover:bg-[#1a3a0a] text-[#FAF7F2] font-bold uppercase tracking-[0.2em] py-10 rounded-2xl shadow-xl transition-all h-auto mt-4">
                  {form.formState.isSubmitting ? "Transmitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="py-24 px-6 text-center border-t border-[#9CAF88]/10 bg-white">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 bg-[#2D5016] rounded-xl flex items-center justify-center text-white font-serif text-2xl italic">F</div>
          <span className="text-xl font-serif italic text-[#2D5016]">Founder Retreat</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#9CAF88] mb-12">Santa Teresa, Costa Rica • Dec 2024</p>
        <div className="flex justify-center gap-12 text-[#9CAF88] font-bold text-xs uppercase tracking-widest">
          <button className="hover:text-[#2D5016] transition-colors">Instagram</button>
          <button className="hover:text-[#2D5016] transition-colors">Privacy</button>
          <button className="hover:text-[#2D5016] transition-colors">Archive</button>
        </div>
        <p className="mt-12 text-slate-300 text-[10px] uppercase tracking-widest">&copy; 2025 EldWorkStudio Retreats. All rights reserved.</p>
      </footer>

      {/* STICKY CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[100]">
        <Button onClick={() => scrollTo('apply')} className="w-full bg-[#2D5016] text-[#FAF7F2] font-black py-8 rounded-full shadow-2xl tracking-[0.2em] uppercase text-xs">
          Apply Now — $3,500
        </Button>
      </div>

    </div>
  );
}
