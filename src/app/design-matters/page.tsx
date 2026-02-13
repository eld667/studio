
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Dna, 
  Zap, 
  Globe, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Users, 
  Leaf, 
  Eye, 
  Circle,
  Menu,
  X,
  ArrowRight,
  Plus,
  Rocket,
  ShieldCheck,
  Brain
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

// --- TYPES & THEMES ---

type OrganismTheme = 'neural' | 'cellular' | 'galactic';

interface ThemeConfig {
  id: OrganismTheme;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  label: string;
  description: string;
  tags: string[];
}

const THEMES: Record<OrganismTheme, ThemeConfig> = {
  neural: {
    id: 'neural',
    primary: '#FF6B9D',
    secondary: '#8B5CF6',
    accent: '#FFD700',
    bg: '#0F172A',
    text: '#F8F8FF',
    label: 'Neural Network',
    description: 'Design as neural pathways — connecting ideas, sparking creativity.',
    tags: ['AI Design', 'Creative Tech', 'Future Interfaces']
  },
  cellular: {
    id: 'cellular',
    primary: '#4ECDC4',
    secondary: '#C7F464',
    accent: '#FF6B9D',
    bg: '#052c2e',
    text: '#F8F8FF',
    label: 'Cellular Growth',
    description: 'Design as living tissue — growing, adapting, regenerating.',
    tags: ['Sustainable', 'Bio-mimicry', 'Circular Systems']
  },
  galactic: {
    id: 'galactic',
    primary: '#1E40AF',
    secondary: '#FFD700',
    accent: '#4ECDC4',
    bg: '#0a0a1a',
    text: '#F8F8FF',
    label: 'Galactic Systems',
    description: 'Design as cosmic structure — vast, interconnected, mysterious.',
    tags: ['Spatial Design', 'VR/AR', 'Experience Ecosystems']
  }
};

// --- COMPONENTS ---

const BackgroundOrganic = ({ theme }: { theme: ThemeConfig }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const randomValues = useMemo(() => {
    return [...Array(15)].map(() => ({
      width: Math.random() * 300 + 100,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      rotate: Math.random() * 360,
      duration: Math.random() * 3 + 4,
    }));
  }, [theme.id]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
      <AnimatePresence mode="wait">
        {isMounted && theme.id === 'neural' && (
          <motion.div
            key="neural-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {randomValues.map((val, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-purple-500/30"
                style={{
                  width: val.width,
                  top: val.top,
                  left: val.left,
                  rotate: val.rotate,
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: val.duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
        {isMounted && theme.id === 'cellular' && (
          <motion.div
            key="cellular-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {randomValues.map((val, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-teal-500/10 blur-xl"
                style={{
                  width: val.width,
                  height: val.width,
                  top: val.top,
                  left: val.left,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: val.duration + 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
        {isMounted && theme.id === 'galactic' && (
          <motion.div
            key="galactic-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {randomValues.map((val, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: val.top,
                  left: val.left,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: val.duration - 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ticketSchema = z.object({
  email: z.string().email("A valid entry path is required"),
  tier: z.string()
});

export default function DesignMattersPage() {
  const [activeTheme, setActiveTheme] = useState<OrganismTheme>('neural');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { scrollYProgress } = useScroll();

  const theme = THEMES[activeTheme];

  const fontWeight = useTransform(scrollYProgress, [0, 0.5], [900, 300]);

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { email: "", tier: "Full Festival" }
  });

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "Design Matters Festival Tickets",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Welcome to the Organism", description: "Your early-bird slot is secured." });
    } catch (e) {
      toast({ variant: "destructive", title: "Evolution Failed", description: "Submission error. Please try again." });
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
    <div className={cn("min-h-screen transition-colors duration-1000 ease-in-out font-body selection:bg-white selection:text-black overflow-x-hidden")} style={{ backgroundColor: theme.bg, color: theme.text }}>
      
      <BackgroundOrganic theme={theme} />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20"
          >
            <Dna className="w-5 h-5" style={{ color: theme.primary }} />
          </motion.div>
          <span className="text-xl font-black tracking-tighter uppercase">Design Matters</span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
          <button onClick={() => scrollTo('theme')} className="hover:opacity-60 transition-opacity">Visualizer</button>
          <button onClick={() => scrollTo('speakers')} className="hover:opacity-60 transition-opacity">Speakers</button>
          <button onClick={() => scrollTo('tickets')} className="hover:opacity-60 transition-opacity">Tickets</button>
          <Button 
            onClick={() => scrollTo('tickets')}
            className="rounded-full px-8 py-6 font-black uppercase tracking-widest text-[10px] transition-all"
            style={{ backgroundColor: theme.primary, color: theme.bg }}
          >
            Get Tickets
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
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
            className="fixed inset-0 z-[110] p-8 flex flex-col"
            style={{ backgroundColor: theme.bg }}
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tighter italic">
              <button onClick={() => scrollTo('theme')} className="text-left">Visualizer</button>
              <button onClick={() => scrollTo('speakers')} className="text-left">Speakers</button>
              <button onClick={() => scrollTo('tickets')} className="text-left">Tickets</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. ENTRANCE: LIVING LOGO */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            style={{ fontWeight }}
            className="text-[15vw] leading-[0.8] tracking-tighter uppercase mb-8"
          >
            Alive.
          </motion.div>
          <FadeIn delay={0.2}>
            <p className="text-sm md:text-xl font-black tracking-[0.5em] uppercase opacity-60">Copenhagen — Oct 15-17, 2024</p>
          </FadeIn>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 opacity-40"
            >
              <span className="text-[10px] uppercase font-black tracking-widest">Scroll to Evolve</span>
              <div className="w-px h-12 bg-white" />
            </motion.div>
          </div>
        </section>

        {/* 2. THEME VISUALIZER (Centerpiece) */}
        <section id="theme" className="py-24 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase mb-4 italic leading-none">Choose Your Lens</h2>
              <p className="text-xl md:text-3xl max-w-3xl opacity-60 mb-20 font-medium">This year we explore "Design as Living Organism." Transform the site experience through three biological perspectives.</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(Object.values(THEMES) as ThemeConfig[]).map((t) => (
                <motion.div
                  key={t.id}
                  onClick={() => setActiveTheme(t.id)}
                  className={cn(
                    "relative p-10 cursor-pointer group transition-all duration-500 rounded-[3rem] border h-[500px] flex flex-col justify-end overflow-hidden",
                    activeTheme === t.id ? "border-white/40" : "border-white/5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                  )}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute top-10 right-10">
                    {t.id === 'neural' && <Brain className="w-12 h-12" style={{ color: t.primary }} />}
                    {t.id === 'cellular' && <Leaf className="w-12 h-12" style={{ color: t.primary }} />}
                    {t.id === 'galactic' && <Globe className="w-12 h-12" style={{ color: t.primary }} />}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">{t.label}</h3>
                    <p className="text-sm opacity-80 mb-8 leading-relaxed">{t.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Organism Background within card */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                    <div className="w-full h-full" style={{ background: `radial-gradient(circle at center, ${t.primary}20, transparent)` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. MANIFESTO */}
        <section className="py-24 px-6 md:px-12 bg-white/5 border-y border-white/5">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <FadeIn>
              <div className="text-[10vw] leading-[0.8] tracking-tighter uppercase italic font-black opacity-10 select-none">Manifesto</div>
              <p className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] italic">
                Design is not static. <br/>
                It grows. It connects. <br/>
                It evolves.
              </p>
              <div className="w-24 h-px bg-white mx-auto my-12" />
              <p className="text-xl md:text-2xl font-medium opacity-60 leading-relaxed max-w-3xl mx-auto">
                This October, we're exploring design as a living system — from the neural networks in our tools to the organic growth of sustainable practice to the vast ecosystems we're building in space and time.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 4. SPEAKER GRID (Living Portraits) */}
        <section id="speakers" className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase mb-20 italic">Curators of Change</h2>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { name: "Paula Scher", role: "Pentagram", img: "https://picsum.photos/seed/paula/600/800", size: "large" },
                { name: "Yuko Shimizu", role: "Illustrator", img: "https://picsum.photos/seed/yuko/600/800", size: "small" },
                { name: "Bjarke Ingels", role: "BIG Architects", img: "https://picsum.photos/seed/bjarke/600/800", size: "small" },
                { name: "Natasha Jen", role: "Pentagram", img: "https://picsum.photos/seed/natasha/600/800", size: "large" },
                { name: "Veronika Scott", role: "CEO", img: "https://picsum.photos/seed/v1/600/800", size: "small" },
                { name: "John Maeda", role: "Technologist", img: "https://picsum.photos/seed/j1/600/800", size: "large" },
                { name: "Kelli Anderson", role: "Designer", img: "https://picsum.photos/seed/k1/600/800", size: "small" },
                { name: "James Bridle", role: "Artist", img: "https://picsum.photos/seed/jb1/600/800", size: "small" },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.05} className={cn(s.size === 'large' ? "col-span-2 row-span-2" : "col-span-1")}>
                  <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 cursor-pointer">
                    <Image 
                      src={s.img} 
                      alt={s.name} 
                      fill 
                      className="object-cover transition-all duration-700 group-hover:scale-110 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100" 
                      data-ai-hint="speaker portrait"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                      <h4 className="text-xl font-black uppercase tracking-tighter italic">{s.name}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{s.role}</p>
                    </div>
                    {/* Theme frame animation element */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all rounded-[2rem]" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TICKETS (Experience Tiers) */}
        <section id="tickets" className="py-24 px-6 md:px-12 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase mb-4 italic">Join the Organism</h2>
                <p className="text-xl opacity-60 uppercase font-black tracking-widest">Early Bird Pricing Ends Aug 15</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { tier: "Day Pass", price: "349", perks: ["Main Stage Access", "Workshops (Limited)", "Exhibition"], color: "white/10" },
                { tier: "Full Festival", price: "799", perks: ["All 3 Days", "All Workshops", "Exhibition + After-parties", "Morning Rituals"], recommended: true },
                { tier: "Creative Pass", price: "1299", perks: ["Everything in Full", "Priority Booking", "1:1 Portfolio Review", "Creator Dinner"], color: "white/10" },
              ].map((tier, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div 
                    className={cn(
                      "p-12 rounded-[3.5rem] border flex flex-col h-full relative overflow-hidden transition-all duration-500",
                      tier.recommended ? "border-white/40 scale-105 z-10" : "border-white/5 bg-white/5 opacity-80"
                    )}
                    style={{ borderColor: tier.recommended ? theme.primary : 'transparent' }}
                  >
                    {tier.recommended && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest" style={{ backgroundColor: theme.primary, color: theme.bg }}>Recommended</div>
                    )}
                    <div className="mb-12">
                      <h3 className="text-2xl font-black uppercase tracking-widest opacity-60 mb-2">{tier.tier}</h3>
                      <div className="flex items-baseline">
                        <span className="text-sm font-black mr-1">€</span>
                        <span className="text-7xl font-black tracking-tighter">{tier.price}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-6 flex-grow mb-12">
                      {tier.perks.map(p => (
                        <li key={p} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest opacity-80">
                          <CheckCircle2 className="w-4 h-4" style={{ color: theme.primary }} /> {p}
                        </li>
                      ))}
                    </ul>

                    {isSuccess ? (
                      <div className="text-center font-black uppercase tracking-widest text-emerald-400">Reserved</div>
                    ) : (
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <input 
                          {...form.register('email')}
                          placeholder="Your Email"
                          className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs font-black uppercase focus:outline-none focus:border-white/40 transition-colors"
                        />
                        <Button 
                          type="submit"
                          className="w-full rounded-full py-8 font-black uppercase tracking-widest transition-all"
                          style={{ backgroundColor: theme.primary, color: theme.bg }}
                        >
                          Reserve Slot
                        </Button>
                      </form>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-12 italic text-center">Practical Intel</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Is this just for visual designers?", a: "No. Design Matters is for anyone building the future. UX, product, motion, architects, technologists, and artists — all are part of the organism." },
                { q: "Do I need to know the theme to enjoy?", a: "The theme is a lens, not a requirement. Come curious, leave transformed." },
                { q: "What is the gender balance?", a: "We maintain a strict 50/50 gender balance across speakers and committee to ensure diverse perspectives." },
                { q: "Is there a student discount?", a: "Yes. Students can join the full organism for €199 with a valid ID. Select Student Pass at checkout." },
              ].map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/5 bg-white/5 rounded-3xl px-8">
                  <AccordionTrigger className="text-left font-black uppercase tracking-widest text-sm py-6 hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="opacity-60 text-lg leading-relaxed pb-8">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-24 px-6 md:px-12 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Dna className="w-8 h-8" style={{ color: theme.primary }} />
          <span className="text-2xl font-black tracking-tighter uppercase">Design Matters</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-12 max-w-sm mx-auto">
          Built for the next generation of living systems. Copenhagen — 2024.
        </p>
        <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
          <button className="hover:opacity-100 transition-opacity">Privacy</button>
          <button className="hover:opacity-100 transition-opacity">Terms</button>
          <button className="hover:opacity-100 transition-opacity">Archive</button>
        </div>
      </footer>

      {/* STICKY THEME TOGGLE (Bottom) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[120]">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-full flex items-center gap-2 shadow-2xl">
          {(Object.values(THEMES) as ThemeConfig[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                activeTheme === t.id ? "bg-white text-black" : "text-white/40 hover:text-white"
              )}
            >
              {t.id === 'neural' && <Brain className="w-5 h-5" />}
              {t.id === 'cellular' && <Leaf className="w-5 h-5" />}
              {t.id === 'galactic' && <Globe className="w-5 h-5" />}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
