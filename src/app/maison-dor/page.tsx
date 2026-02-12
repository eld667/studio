
"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Diamond, 
  Gem, 
  Sparkles, 
  History, 
  Calendar, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Maximize2, 
  RotateCcw,
  Star,
  Layers,
  PenTool
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
import { PlaceHolderImages } from "@/lib/placeholder-images";

// --- SCHEMAS ---
const appointmentSchema = z.object({
  name: z.string().min(1, "Full name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  interest: z.string().min(1, "Please select an interest"),
  date: z.string().min(1, "Preferred date required"),
  message: z.string().optional(),
});

// --- TYPES ---
type MetalType = 'white' | 'yellow' | 'rose';
type StoneType = 'diamond' | 'sapphire' | 'emerald' | 'ruby';

const METAL_COLORS: Record<MetalType, string> = {
  white: '#E5E4E2',
  yellow: '#F7E7CE',
  rose: '#B76E79',
};

const STONE_COLORS: Record<StoneType, string> = {
  diamond: '#F8F8FF',
  sapphire: '#0F52BA',
  emerald: '#50C878',
  ruby: '#E0115F',
};

// --- COMPONENTS ---

const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={cn("relative py-24 px-6 md:px-12 overflow-hidden", className)}>
    {children}
  </section>
);

const RingViewer = () => {
  const [metal, setMetal] = useState<MetalType>('white');
  const [stone, setStone] = useState<StoneType>('diamond');
  const [rotation, setRotation] = useState(0);
  const ringImg = PlaceHolderImages.find(img => img.id === 'maison-ring')?.imageUrl || "https://picsum.photos/seed/ring/800/800";

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-50 overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,228,226,0.2),transparent)] pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Visualizer */}
        <div className="lg:col-span-3 relative aspect-square flex items-center justify-center">
          <motion.div
            style={{ rotateY: rotation }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            onPan={(_, info) => setRotation(prev => prev + info.delta.x)}
          >
            <Image 
              src={ringImg} 
              alt="Luxury Ring" 
              fill 
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              data-ai-hint="diamond ring"
            />
            {/* Dynamic Overlays for Metal/Stone color tints */}
            <motion.div 
              className="absolute inset-0 mix-blend-color pointer-events-none"
              style={{ backgroundColor: METAL_COLORS[metal], opacity: 0.3 }}
            />
            <motion.div 
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/3 h-1/3 rounded-full blur-2xl mix-blend-screen pointer-events-none"
              style={{ backgroundColor: STONE_COLORS[stone], opacity: 0.4 }}
            />
          </motion.div>
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur px-6 py-3 rounded-full border border-slate-100 shadow-lg text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <RotateCcw className="w-3 h-3" /> Drag to Rotate 360°
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">01. Select Metal</h3>
            <div className="flex gap-4">
              {(Object.keys(METAL_COLORS) as MetalType[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetal(m)}
                  className={cn(
                    "w-12 h-12 rounded-full border-2 transition-all p-1",
                    metal === m ? "border-slate-900 scale-110" : "border-transparent"
                  )}
                >
                  <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: METAL_COLORS[m] }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">02. Select Stone</h3>
            <div className="grid grid-cols-4 gap-4">
              {(Object.keys(STONE_COLORS) as StoneType[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStone(s)}
                  className={cn(
                    "flex flex-col items-center gap-2 group",
                    stone === s ? "opacity-100" : "opacity-40 hover:opacity-70"
                  )}
                >
                  <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: STONE_COLORS[s] }} />
                  <span className="text-[8px] font-bold uppercase tracking-widest">{s}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h4 className="text-2xl font-serif italic text-slate-900">The Éternité Ring</h4>
                <p className="text-xs text-slate-400 font-medium mt-1">GIA Certified • 2.5ct Center Stone</p>
              </div>
              <p className="text-sm font-bold text-slate-900">Contact for Price</p>
            </div>
            <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-none py-8 uppercase text-xs tracking-[0.3em]">
              Request Private Viewing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MaisonDorJewelryPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('collections');
  const { toast } = useToast();
  const firestore = useFirestore();

  const salonImg = PlaceHolderImages.find(img => img.id === 'maison-salon')?.imageUrl || "https://picsum.photos/seed/salon/1200/800";
  const diamondImg = PlaceHolderImages.find(img => img.id === 'maison-diamond')?.imageUrl || "https://picsum.photos/seed/diam/800/800";

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: "", email: "", phone: "", interest: "", date: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof appointmentSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "Maison d'Or Private Appointment",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Appointment Requested", description: "Our concierge will contact you within 24 hours." });
    } catch (e) {
      toast({ variant: "destructive", title: "Transmission Error", description: "Please contact us via phone for urgent requests." });
    }
  };

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200 overflow-x-hidden">
      
      {/* 1. ENTRANCE (The Vault) */}
      <section className="h-screen bg-slate-950 flex flex-col items-center justify-center relative">
        <motion.div style={{ opacity, scale }} className="z-10 text-center space-y-12">
          <div className="relative w-64 h-64 mx-auto">
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                y: [0, -20, 0]
              }}
              transition={{ 
                rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full"
            >
              <Image src={diamondImg} alt="Floating Diamond" fill className="object-contain" />
            </motion.div>
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full opacity-20 animate-pulse" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-serif text-white tracking-[0.3em] uppercase">Maison d'Or</h1>
            <p className="text-sm md:text-lg text-slate-500 tracking-[0.5em] uppercase font-bold">Place Vendôme, Paris</p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-slate-600">Scroll to Enter the Salon</span>
            <div className="w-px h-16 bg-gradient-to-b from-slate-600 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* STICKY NAV */}
      <nav className="sticky top-0 z-[100] h-20 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100">
        <Link href="/" className="font-serif text-2xl tracking-[0.2em] uppercase">Maison d'Or</Link>
        <div className="hidden lg:flex items-center gap-12">
          {['Collections', 'Bespoke', 'Heritage', 'Contact'].map(item => (
            <button 
              key={item}
              onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors"
            >
              {item}
            </button>
          ))}
          <Button variant="outline" className="rounded-none px-8 py-6 border-slate-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all">
            Book Appointment
          </Button>
        </div>
        <button className="lg:hidden p-2"><Menu className="w-6 h-6" /></button>
      </nav>

      {/* 2. THE SALON (360° Atmosphere) */}
      <Section id="salon" className="min-h-screen flex items-center justify-center p-0">
        <div className="absolute inset-0 z-0">
          <Image src={salonImg} alt="Luxury Salon" fill className="object-cover" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl space-y-8">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-500 mb-4">The Maison</h2>
              <p className="text-4xl md:text-7xl font-serif italic text-slate-900 leading-tight">
                An intimate sanctuary <br/>for high joaillerie.
              </p>
              <p className="text-lg text-slate-600 font-serif italic max-w-xl mt-8 leading-relaxed">
                Step into our Place Vendôme atelier, where legacy meets the precision of the modern hand. Every piece here tells a story—your story.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* 3. FEATURED CREATION (3D Viewer) */}
      <Section id="bespoke" className="bg-white">
        <div className="text-center mb-24">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400 mb-4">Interactive Creation</h2>
            <p className="text-4xl md:text-6xl font-serif italic text-slate-900">Define Your Brilliance</p>
          </FadeIn>
        </div>
        <RingViewer />
      </Section>

      {/* 4. COLLECTIONS (Floating Cards) */}
      <Section id="collections" className="bg-slate-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-20">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400 mb-4">Explore</h2>
              <p className="text-4xl md:text-6xl font-serif italic text-slate-900">Curated Collections</p>
            </FadeIn>
            <Button variant="link" className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] hidden md:flex">View Catalog <ArrowRight className="ml-2 w-4 h-4" /></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'fiancailles', title: 'Les Fiancailles', desc: 'Engagement rings for the question that changes everything.', img: 'https://picsum.photos/seed/handring/600/800' },
              { id: 'haute', title: 'Haute Joaillerie', desc: 'One-of-a-kind high jewelry creations for extraordinary moments.', img: 'https://picsum.photos/seed/necklace/600/800' },
              { id: 'eternelles', title: 'Les Éternelles', desc: 'Wedding bands symbolizing commitment through platinum and gold.', img: 'https://picsum.photos/seed/bands/600/800' },
              { id: 'temps', title: 'L\'Art du Temps', desc: 'Exquisite timepieces where horology meets the jeweler\'s art.', img: 'https://picsum.photos/seed/watch/600/800' },
            ].map((col, i) => (
              <FadeIn key={col.id} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] mb-8 shadow-xl transition-all duration-700 group-hover:shadow-2xl">
                    <Image src={col.img} alt={col.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-all">Discover</span>
                      <h3 className="text-2xl font-serif italic">{col.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed px-4">{col.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. THE DIAMOND ATELIER (4Cs) */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400 mb-4">The Science of Light</h2>
              <p className="text-4xl md:text-6xl font-serif italic text-slate-900 leading-tight">Mastering the 4Cs.</p>
              <p className="text-lg text-slate-600 leading-relaxed font-serif italic">
                A diamond's beauty lies in the harmony of its characteristics. We source only the top 0.1% of global stones, verified by the GIA.
              </p>
            </FadeIn>

            <div className="space-y-10">
              {['Cut', 'Color', 'Clarity', 'Carat'].map((c, i) => (
                <div key={c} className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-4">
                    <h4 className="text-sm font-bold uppercase tracking-[0.3em] group-hover:text-slate-900 transition-colors">0{i+1}. {c}</h4>
                    <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-900 group-hover:translate-x-2 transition-all" />
                  </div>
                  <div className="h-px bg-slate-100 w-full" />
                </div>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2}>
            <div className="relative aspect-square bg-slate-50 rounded-full flex items-center justify-center p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <Image src="https://picsum.photos/seed/diamond-pattern/1200/1200" alt="Diamond facets" fill className="object-cover" />
              </div>
              <Image src={diamondImg} alt="Master Diamond" width={600} height={600} className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.1)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border-[40px] border-white rounded-full pointer-events-none" />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 6. HERITAGE TIMELINE */}
      <Section id="heritage" className="bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto space-y-32 py-24">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-600 mb-4">Legacy</h2>
            <p className="text-4xl md:text-6xl font-serif italic tracking-widest">The Maison Wall</p>
          </div>

          <div className="relative space-y-24 before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-slate-800 before:hidden md:before:block">
            {[
              { year: '1924', event: 'Maison d\'Or founded by Jean d\'Or in Place Vendôme.', img: 'https://picsum.photos/seed/oldparis/600/400' },
              { year: '1947', event: 'Commissioned by the French royal household for its first coronation set.', img: 'https://picsum.photos/seed/crown/600/400' },
              { year: '1985', event: 'Introduction of the "Signature Sparkle" cut, revolutionizing diamond brilliance.', img: 'https://picsum.photos/seed/bench/600/400' },
              { year: '2024', event: 'A century of commitment to extraordinary craftsmanship and sustainable luxury.', img: 'https://picsum.photos/seed/salon2/600/400' },
            ].map((item, i) => (
              <div key={item.year} className={cn("relative flex flex-col md:flex-row items-center gap-12", i % 2 !== 0 ? "md:flex-row-reverse" : "")}>
                <div className="w-full md:w-1/2 space-y-6">
                  <FadeIn>
                    <span className="text-6xl font-serif italic text-slate-800">{item.year}</span>
                    <p className="text-lg text-slate-400 font-serif italic leading-relaxed">{item.event}</p>
                  </FadeIn>
                </div>
                <div className="w-full md:w-1/2">
                  <FadeIn delay={0.2}>
                    <div className="relative aspect-video overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-slate-800">
                      <Image src={item.img} alt={item.year} fill className="object-cover" />
                    </div>
                  </FadeIn>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-10 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. CONTACT (The appointment) */}
      <Section id="contact" className="bg-white relative">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <Image src="https://picsum.photos/seed/blueprint/1920/1080" alt="Technical drawing" fill className="object-cover" />
        </div>
        
        <div className="container relative z-10 mx-auto max-w-6xl bg-white rounded-[4rem] shadow-2xl p-12 md:p-24 border border-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400">Entrance</h2>
                <p className="text-4xl md:text-6xl font-serif italic text-slate-900 leading-tight">Join us in the Salon.</p>
                <p className="text-lg text-slate-500 font-serif italic leading-relaxed">
                  Every exceptional piece begins with a private consultation. Experience our world in total exclusivity.
                </p>
              </div>

              <div className="space-y-8 pt-12 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <MapPin className="w-6 h-6 text-slate-300" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Address</p>
                    <p className="text-sm font-bold">12 Place Vendôme, 75001 Paris</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Phone className="w-6 h-6 text-slate-300" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Direct Path</p>
                    <p className="text-sm font-bold">+33 1 42 86 87 88</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Clock className="w-6 h-6 text-slate-300" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Private Viewing</p>
                    <p className="text-sm font-bold">Tue — Sat | 10:00 — 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center shadow-inner">
                    <Sparkles className="w-10 h-10 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif italic text-slate-900 mb-2">We await your arrival.</h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                      Your inquiry has been received. Our head concierge will reach out to confirm your private salon experience.
                    </p>
                  </div>
                  <Button variant="link" onClick={() => setIsSuccess(false)} className="text-[10px] font-bold uppercase tracking-widest">New Inquiry</Button>
                </motion.div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Title</label>
                        <select className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-slate-900 transition-colors font-serif italic">
                          <option>Monsieur</option>
                          <option>Madame</option>
                          <option>Mademoiselle</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                        <input {...form.register('name')} className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-slate-900 transition-colors font-serif italic" placeholder="Jean-Luc Godard" />
                        {form.formState.errors.name && <p className="text-[8px] text-red-400 uppercase font-bold">{form.formState.errors.name.message}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                        <input {...form.register('email')} type="email" className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-slate-900 transition-colors font-serif italic" placeholder="j.godard@maison.com" />
                        {form.formState.errors.email && <p className="text-[8px] text-red-400 uppercase font-bold">{form.formState.errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Primary Interest</label>
                        <select {...form.register('interest')} className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-slate-900 transition-colors font-serif italic">
                          <option value="">Select Interest</option>
                          <option value="fiancailles">Les Fiancailles</option>
                          <option value="bespoke">Bespoke Creation</option>
                          <option value="viewing">Private Viewing</option>
                          <option value="redesign">Jewelry Redesign</option>
                        </select>
                        {form.formState.errors.interest && <p className="text-[8px] text-red-400 uppercase font-bold">{form.formState.errors.interest.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Preferred Date</label>
                      <input {...form.register('date')} type="date" className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-slate-900 transition-colors font-serif italic" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Special Requests</label>
                      <textarea {...form.register('message')} rows={3} className="w-full bg-slate-50 rounded-2xl p-6 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all font-serif italic text-sm mt-4" placeholder="Champagne preference, specific pieces, etc." />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-[0.3em] py-10 rounded-none shadow-2xl transition-all h-auto"
                  >
                    {form.formState.isSubmitting ? "Transmitting Request..." : "Request Access to Salon"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-24 px-6 md:px-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link href="/" className="font-serif text-3xl tracking-[0.2em] uppercase">Maison d'Or</Link>
            <p className="text-slate-500 font-serif italic text-sm leading-relaxed">
              Jewelers to royalty and dreamers since 1924. Place Vendôme, Paris.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 border border-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-600 cursor-pointer transition-colors"><Star className="w-4 h-4" /></div>)}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Collections</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-serif italic">
              <li className="hover:text-white transition-colors cursor-pointer">Engagement & Bridal</li>
              <li className="hover:text-white transition-colors cursor-pointer">Haute Joaillerie</li>
              <li className="hover:text-white transition-colors cursor-pointer">Signature Collections</li>
              <li className="hover:text-white transition-colors cursor-pointer">Rare Timepieces</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Experience</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-serif italic">
              <li className="hover:text-white transition-colors cursor-pointer">The Bespoke Journey</li>
              <li className="hover:text-white transition-colors cursor-pointer">Salon Appointments</li>
              <li className="hover:text-white transition-colors cursor-pointer">Diamond Education</li>
              <li className="hover:text-white transition-colors cursor-pointer">Heritage & Care</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">The Salon</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-serif italic">
              <li>12 Place Vendôme</li>
              <li>75001 Paris, France</li>
              <li>+33 1 42 86 87 88</li>
              <li>salon@maisondor.com</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">
            © 2025 Maison d'Or — Crafted in Paris — All Rights Reserved
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">
            <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </footer>

      {/* STICKY CTA (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[110]">
        <Button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-slate-950 text-white font-bold py-8 rounded-none shadow-2xl tracking-[0.3em] uppercase text-[10px]"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
