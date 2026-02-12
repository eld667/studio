
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wine, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Star, 
  ChevronRight, 
  Lock, 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Calendar,
  Layers,
  ArrowRight,
  Droplets,
  Award,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { PlaceHolderImages } from "@/lib/placeholder-images";

// --- SCHEMAS ---
const applicationSchema = z.object({
  name: z.string().min(1, "Full name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  city: z.string().min(1, "City required"),
  collectionSize: z.string().min(1, "Selection required"),
  interest: z.string().min(1, "Selection required"),
  reason: z.string().min(10, "Please provide more detail"),
  tier: z.string().min(1, "Tier selection required"),
});

// --- CONSTANTS ---
const REGIONS = [
  { id: 'speyside', name: 'Speyside', description: 'The sweet spot of Scotland. Elegant, floral, and honeyed.', color: '#FFBF00' },
  { id: 'islay', name: 'Islay', description: 'Peat and smoke. Briny coastal influences.', color: '#8B7355' },
  { id: 'highlands', name: 'Highlands', description: 'Diverse and complex. Heather, spice, and fruit.', color: '#B87333' },
  { id: 'campbeltown', name: 'Campbeltown', description: 'The whisky capital. Oily, salty, and distinct.', color: '#F5F5DC' },
  { id: 'lowlands', name: 'Lowlands', description: 'Light and floral. The "Lowland Ladies".', color: '#E5E4E2' },
];

const CASKS = [
  { id: 'c1', distillery: 'Macallan', age: '25 Year', region: 'Speyside', type: 'Sherry Oak', bottles: 12, price: '£4,200', market: '£6,500', category: 'Vintage Vault' },
  { id: 'c2', distillery: 'Springbank', age: '18 Year', region: 'Campbeltown', type: 'Local Barley', bottles: 4, price: '£1,800', market: '£2,900', category: 'Rare Finds' },
  { id: 'c3', distillery: 'Ardbeg', age: '21 Year', region: 'Islay', type: 'Ex-Bourbon', bottles: 8, price: '£2,100', market: '£3,400', category: 'Single Casks' },
  { id: 'c4', distillery: 'Dalmore', age: '30 Year', region: 'Highlands', type: 'Matusalem Sherry', bottles: 2, price: '£8,500', market: '£12,000', category: 'Founder\'s Library' },
];

// --- COMPONENTS ---

export default function ReserveWhiskyVaultPage() {
  const [isLocked, setIsLocked] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [activeCask, setActiveCask] = useState<typeof CASKS[0] | null>(null);
  
  const { toast } = useToast();
  const firestore = useFirestore();

  const warehouseImg = PlaceHolderImages.find(img => img.id === 'whisky-vault')?.imageUrl || "https://picsum.photos/seed/whisky1/1200/800";
  const stillImg = PlaceHolderImages.find(img => img.id === 'whisky-still')?.imageUrl || "https://picsum.photos/seed/whisky2/800/1200";
  const glassImg = PlaceHolderImages.find(img => img.id === 'whisky-glass')?.imageUrl || "https://picsum.photos/seed/whisky3/800/800";

  const appForm = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      collectionSize: "",
      interest: "",
      reason: "",
      tier: "Connoisseur",
    },
  });

  const onAppSubmit = async (values: z.infer<typeof applicationSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "Reserve Whisky Vault Application",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Application Received", description: "Our member liaison will contact you within 14 days." });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Submission failed. Please email membership@reservewhisky.com" });
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F5DC] selection:bg-[#FFBF00] selection:text-black font-sans overflow-x-hidden">
      
      {/* 1. THE VAULT DOOR (Overlay) */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center text-center p-6"
          >
            <div className="absolute inset-0 z-0">
              <Image src={warehouseImg} alt="Warehouse" fill className="object-cover opacity-30 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>
            
            <div className="relative z-10 space-y-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#B87333]/30 flex items-center justify-center mx-auto relative group cursor-pointer"
                onClick={() => setIsLocked(false)}
              >
                <div className="absolute inset-0 rounded-full border-2 border-[#FFBF00]/20 animate-ping" />
                <Lock className="w-12 h-12 md:w-20 md:h-20 text-[#B87333] group-hover:text-[#FFBF00] transition-colors" />
              </motion.div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-7xl font-serif tracking-[0.2em] uppercase text-white">Welcome to the Vault</h1>
                <p className="text-sm md:text-xl text-[#8B7355] font-bold uppercase tracking-[0.5em]">Private Membership Required</p>
              </div>

              <div className="flex flex-col md:row items-center justify-center gap-6">
                <Button 
                  onClick={() => setIsLocked(false)}
                  size="lg" 
                  className="bg-[#B87333] hover:bg-[#FFBF00] text-black font-black px-12 py-8 h-auto rounded-none uppercase tracking-widest text-sm md:text-base"
                >
                  Request Access
                </Button>
                <button className="text-[#8B7355] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                  Member Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 border border-[#B87333] flex items-center justify-center text-[#B87333] font-serif text-xl">R</div>
          <span className="text-xl font-serif tracking-[0.2em] uppercase hidden md:inline">Reserve Whisky Vault</span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B7355]">
          <button onClick={() => scrollTo('dashboard')} className="hover:text-[#FFBF00] transition-colors">The Vault</button>
          <button onClick={() => scrollTo('tiers')} className="hover:text-[#FFBF00] transition-colors">Membership</button>
          <button onClick={() => scrollTo('distilleries')} className="hover:text-[#FFBF00] transition-colors">Distilleries</button>
          <button onClick={() => scrollTo('events')} className="hover:text-[#FFBF00] transition-colors">Events</button>
          <Button 
            onClick={() => scrollTo('apply')}
            variant="outline" 
            className="border-[#B87333] text-[#B87333] rounded-none px-8 py-6 hover:bg-[#B87333] hover:text-black transition-all"
          >
            Request Invitation
          </Button>
        </div>
      </nav>

      <main>
        {/* 3. HERO: DASHBOARD PREVIEW */}
        <section id="dashboard" className="pt-40 pb-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <FadeIn>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 text-[#FFBF00] text-xs font-bold uppercase tracking-widest">
                    <LayoutDashboard className="w-4 h-4" /> Member-Only Preview
                  </div>
                  <h2 className="text-5xl md:text-8xl font-serif leading-[0.9] text-white italic">The Digital <br/>Cellar Interface.</h2>
                  <p className="text-xl text-[#8B7355] leading-relaxed font-medium max-w-xl italic">
                    Every member is granted access to our proprietary dashboard. Monitor your private collection, track secondary market value, and manage your maturing casks in real-time.
                  </p>
                  <div className="flex gap-8 pt-8">
                    <div>
                      <p className="text-3xl font-serif text-white">4,200+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#B87333]">Allocated Bottles</p>
                    </div>
                    <div>
                      <p className="text-3xl font-serif text-white">127</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#B87333]">Private Casks</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-[#1a1a1a] p-1 rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
                  <div className="bg-[#0a0a0a] rounded-xl p-8 border border-white/5 relative">
                    <div className="flex justify-between items-center mb-12">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest">Logged In As:</p>
                        <p className="text-white font-serif italic text-lg">Alexander MacLeod</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-[#FFBF00]/30 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#FFBF00]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest mb-2">Collection</p>
                        <p className="text-3xl font-serif text-white">12 <span className="text-sm text-[#8B7355] italic">Bottles</span></p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest mb-2">Market Value</p>
                        <p className="text-3xl font-serif text-[#FFBF00]">£42,800</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest">Recent Allocations</p>
                      {[
                        { name: "Macallan 25Y", status: "In Transit", date: "Oct 12" },
                        { name: "Springbank 18Y", status: "Allocated", date: "Sep 28" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5">
                          <span className="text-sm font-serif">{item.name}</span>
                          <span className="text-[10px] font-bold uppercase text-[#FFBF00] tracking-widest">{item.status}</span>
                        </div>
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="bg-[#FFBF00] text-black font-black uppercase text-xs tracking-widest px-8 rounded-none">Enter Dashboard</Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. THE CASK ROOM (Explorer) */}
        <section id="cask-room" className="py-24 bg-[#050505] relative">
          <div className="absolute inset-0 z-0">
            <Image src={warehouseImg} alt="Casks" fill className="object-cover opacity-10" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-serif text-white italic uppercase tracking-widest">The Cask Room</h2>
                <p className="text-[#8B7355] font-bold uppercase tracking-[0.4em] text-xs">Direct Warehouse Inventory</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {CASKS.map((cask, i) => (
                <FadeIn key={cask.id} delay={i * 0.1}>
                  <div 
                    onClick={() => setActiveCask(cask)}
                    className={cn(
                      "p-8 border transition-all duration-500 cursor-pointer group relative overflow-hidden",
                      activeCask?.id === cask.id ? "bg-[#B87333]/10 border-[#B87333]" : "bg-white/5 border-white/10 hover:border-[#FFBF00]/50"
                    )}
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                      <Droplets className="w-20 h-20 text-[#FFBF00]" />
                    </div>
                    <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest mb-4">{cask.category}</p>
                    <h3 className="text-3xl font-serif text-white mb-1 italic">{cask.distillery}</h3>
                    <p className="text-xl font-serif text-[#FFBF00] mb-6">{cask.age}</p>
                    
                    <div className="space-y-3 pt-6 border-t border-white/5">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-[#8B7355]">Available</span>
                        <span className="text-white">{cask.bottles} Bottles</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-[#8B7355]">Member Price</span>
                        <span className="text-[#FFBF00]">{cask.price}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <AnimatePresence>
              {activeCask && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-12 p-8 bg-white/5 border border-white/10 relative overflow-hidden"
                >
                  <button onClick={() => setActiveCask(null)} className="absolute top-4 right-4 text-[#8B7355] hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10">
                      <Image src={glassImg} alt="Whisky" fill className="object-cover" />
                    </div>
                    <div className="md:col-span-2 space-y-8">
                      <div className="space-y-2">
                        <h4 className="text-4xl font-serif italic text-white">{activeCask.distillery} — {activeCask.age}</h4>
                        <p className="text-[#8B7355] uppercase tracking-[0.3em] font-bold text-xs">{activeCask.region} | {activeCask.type}</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                          <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest mb-1">Bottles Left</p>
                          <p className="text-2xl font-serif text-white">{activeCask.bottles}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest mb-1">Yield Estimate</p>
                          <p className="text-2xl font-serif text-white">420</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest mb-1">Cask Status</p>
                          <p className="text-2xl font-serif text-[#FFBF00]">Aging</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-widest mb-1">Market Value</p>
                          <p className="text-2xl font-serif text-emerald-400">{activeCask.market}</p>
                        </div>
                      </div>
                      <p className="text-[#8B7355] leading-relaxed italic">
                        "Notes of vanilla, sea salt, and distant woodsmoke. A remarkable expression of {activeCask.region} heritage, aged exclusively in our private bonded warehouse."
                      </p>
                      <Button className="bg-[#B87333] hover:bg-[#FFBF00] text-black font-black uppercase tracking-widest px-12 py-6 h-auto rounded-none">Reserve This Allocation</Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 5. MEMBERSHIP TIERS */}
        <section id="tiers" className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-serif text-white italic uppercase tracking-widest">Vault Access</h2>
                <p className="text-[#8B7355] font-bold uppercase tracking-[0.4em] text-xs">Tiered Allocation Structures</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Collector", 
                  price: "£2,500 / year", 
                  bottles: "4 Bottles", 
                  benefits: ["Secondary market access", "Quarterly newsletter", "2 Virtual tastings", "Standard dashboard"],
                  accent: "border-white/10"
                },
                { 
                  name: "Connoisseur", 
                  price: "£5,000 / year", 
                  bottles: "8 Bottles", 
                  benefits: ["First access to rare releases", "All virtual tastings", "Distillery trip lottery", "Personal vault page"],
                  recommended: true,
                  accent: "border-[#FFBF00]/50 bg-[#FFBF00]/5"
                },
                { 
                  name: "Patron", 
                  price: "£15,000 / year", 
                  bottles: "20+ Bottles", 
                  benefits: ["Private cask ownership", "Guaranteed distillery trips", "Global exclusive events", "Committee direct access"],
                  accent: "border-[#B87333] bg-[#B87333]/10"
                }
              ].map((tier, i) => (
                <FadeIn key={tier.name} delay={i * 0.1}>
                  <div className={cn("p-12 border flex flex-col h-full relative group", tier.accent)}>
                    {tier.recommended && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFBF00] text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest">Recommended</div>
                    )}
                    <div className="mb-12">
                      <h3 className="text-4xl font-serif text-white italic mb-2">{tier.name}</h3>
                      <p className="text-xl font-serif text-[#FFBF00]">{tier.price}</p>
                    </div>
                    
                    <div className="space-y-6 flex-grow">
                      <div className="flex items-center gap-3 text-white font-bold uppercase text-xs tracking-widest">
                        <Droplets className="w-4 h-4 text-[#B87333]" /> {tier.bottles} Allocated
                      </div>
                      <ul className="space-y-4">
                        {tier.benefits.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-3 text-[#8B7355] text-xs font-medium italic">
                            <ChevronRight className="w-3 h-3 text-[#FFBF00] mt-0.5 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      onClick={() => {
                        appForm.setValue('tier', tier.name);
                        scrollTo('apply');
                      }}
                      className={cn(
                        "mt-12 w-full h-auto py-6 rounded-none font-black uppercase tracking-[0.2em] text-xs transition-all",
                        tier.recommended ? "bg-[#FFBF00] text-black hover:bg-white" : "bg-white/5 text-white border border-white/10 hover:border-white"
                      )}
                    >
                      Apply For {tier.name}
                    </Button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. DISTILLERY MAP */}
        <section id="distilleries" className="py-24 bg-[#050505] overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <FadeIn>
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-7xl font-serif text-white italic uppercase leading-tight">The Scotch <br/>Landscape</h2>
                    <p className="text-[#8B7355] font-bold uppercase tracking-[0.4em] text-xs">Regional Intelligence</p>
                  </div>
                  
                  <div className="space-y-6">
                    {REGIONS.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => setSelectedRegion(region)}
                        className={cn(
                          "w-full flex items-center justify-between p-6 border transition-all text-left",
                          selectedRegion.id === region.id ? "bg-white/10 border-[#FFBF00]" : "bg-transparent border-white/5 hover:border-white/20"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                          <div>
                            <p className="text-white font-serif italic text-lg uppercase tracking-widest">{region.name}</p>
                            {selectedRegion.id === region.id && (
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#8B7355] text-xs mt-1">{region.description}</motion.p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className={cn("w-5 h-5 transition-transform", selectedRegion.id === region.id ? "text-[#FFBF00] rotate-90" : "text-[#8B7355]")} />
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="relative aspect-square md:aspect-[4/5] bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden group">
                  <div className="absolute inset-0 p-12 flex items-center justify-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000">
                    <Image src={stillImg} alt="Map" fill className="object-cover" />
                  </div>
                  <div className="relative z-10 p-12 h-full flex flex-col justify-end">
                    <div className="bg-black/60 backdrop-blur-xl p-8 border border-white/10">
                      <p className="text-[10px] font-bold text-[#FFBF00] uppercase tracking-widest mb-2">Regional Allocation</p>
                      <h3 className="text-3xl font-serif text-white italic mb-4">{selectedRegion.name} Holdings</h3>
                      <ul className="space-y-3">
                        {['Locked Warehouse Access', 'Pre-Release Sampling', 'Regional Masterclass', 'Private Bottling Rights'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-[#8B7355] uppercase tracking-widest">
                            <CheckCircle2 className="w-3 h-3 text-[#FFBF00]" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 7. EVENTS */}
        <section id="events" className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-white/5 pb-12">
              <FadeIn>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-7xl font-serif text-white italic uppercase">Tasting Room</h2>
                  <p className="text-[#8B7355] font-bold uppercase tracking-[0.4em] text-xs">Virtual & In-Person Rituals</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex gap-4">
                  <Button variant="outline" className="border-white/10 text-white rounded-none px-8 py-6 uppercase text-[10px] font-bold tracking-widest">Previous Events</Button>
                  <Button className="bg-[#B87333] text-black rounded-none px-8 py-6 uppercase text-[10px] font-bold tracking-widest">View Calendar</Button>
                </div>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { type: 'Virtual', title: 'Islay Masterclass', date: 'Oct 24', time: '19:00 BST', img: 'https://picsum.photos/seed/ev1/600/800' },
                { type: 'London', title: 'Autumn Private Dinner', date: 'Nov 02', time: '18:30 GMT', img: 'https://picsum.photos/seed/ev2/600/800' },
                { type: 'Virtual', title: 'Secondary Market Intel', date: 'Nov 15', time: '20:00 GMT', img: 'https://picsum.photos/seed/ev3/600/800' },
                { type: 'Edinburgh', title: 'Annual Warehouse Visit', date: 'Dec 12', time: '10:00 GMT', img: 'https://picsum.photos/seed/ev4/600/800' },
              ].map((event, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden border border-white/10 mb-6 shadow-xl transition-all duration-700 group-hover:border-[#FFBF00]/50">
                      <Image src={event.img} alt={event.title} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                      <div className="absolute top-0 right-0 p-4">
                        <span className="bg-black/60 backdrop-blur px-3 py-1 border border-white/10 text-[8px] font-black uppercase tracking-widest text-white">{event.type}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="space-y-2 px-2">
                      <p className="text-[10px] font-bold text-[#FFBF00] uppercase tracking-widest">{event.date} | {event.time}</p>
                      <h4 className="text-2xl font-serif italic text-white">{event.title}</h4>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 8. APPLICATION */}
        <section id="apply" className="py-24 bg-[#0a0a0a] relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="bg-white/5 border border-white/10 p-12 md:p-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <Image src={stillImg} alt="Still" fill className="object-cover" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                  <FadeIn>
                    <div className="space-y-6">
                      <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#8B7355]">The Invitation</h2>
                      <p className="text-4xl md:text-7xl font-serif italic text-white leading-tight">Apply for <br/>Access.</p>
                      <p className="text-lg text-[#8B7355] font-serif italic leading-relaxed">
                        The Vault maintains a limited membership to ensure allocations remain meaningful. We prioritize serious collectors and long-term investors.
                      </p>
                    </div>

                    <div className="space-y-8 pt-12 border-t border-white/5">
                      {[
                        { icon: Award, label: "Committee Review", desc: "Every application is vetted by our founding board." },
                        { icon: ShieldCheck, label: "Verification Required", desc: "Age and identity verification are mandatory." },
                        { icon: Droplets, label: "Priority Allocation", desc: "High-tier members receive first rights to rare casks." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-6">
                          <item.icon className="w-6 h-6 text-[#B87333] flex-shrink-0" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white">{item.label}</p>
                            <p className="text-xs text-[#8B7355] italic mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                </div>

                <div className="relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl">
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12"
                    >
                      <div className="w-24 h-24 rounded-full border-2 border-[#FFBF00] flex items-center justify-center">
                        <Award className="w-12 h-12 text-[#FFBF00]" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-serif italic text-white mb-2">Submission Received.</h3>
                        <p className="text-[#8B7355] text-sm max-w-xs mx-auto italic leading-relaxed">
                          Your profile has been added to our queue. A member liaison will reach out for your preliminary interview within 14 days.
                        </p>
                      </div>
                      <Button variant="link" onClick={() => setIsSuccess(false)} className="text-[#B87333] font-bold uppercase text-[10px] tracking-widest">New Application</Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={appForm.handleSubmit(onAppSubmit)} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Full Name</label>
                          <input {...appForm.register('name')} className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FFBF00] transition-colors font-serif italic text-white" />
                          {appForm.formState.errors.name && <p className="text-[8px] text-red-400 uppercase font-bold">{appForm.formState.errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Email Address</label>
                          <input {...appForm.register('email')} type="email" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FFBF00] transition-colors font-serif italic text-white" />
                          {appForm.formState.errors.email && <p className="text-[8px] text-red-400 uppercase font-bold">{appForm.formState.errors.email.message}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Selected Tier</label>
                          <select {...appForm.register('tier')} className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FFBF00] transition-colors font-serif italic text-white appearance-none">
                            <option value="Collector">Collector</option>
                            <option value="Connoisseur">Connoisseur</option>
                            <option value="Patron">Patron</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Interests</label>
                          <select {...appForm.register('interest')} className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FFBF00] transition-colors font-serif italic text-white appearance-none">
                            <option value="">Select Primary Interest</option>
                            <option value="Drinking">Drinking & Enjoyment</option>
                            <option value="Collecting">Portfolio Collection</option>
                            <option value="Investment">Cask Investment</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Why do you wish to join the Vault?</label>
                        <textarea {...appForm.register('reason')} rows={3} className="w-full bg-white/5 rounded p-6 focus:outline-none focus:ring-1 focus:ring-[#FFBF00] transition-all font-serif italic text-sm mt-4 text-white" placeholder="Describe your connection to whisky heritage..." />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={appForm.formState.isSubmitting}
                        className="w-full bg-[#FFBF00] hover:bg-white text-black font-black uppercase tracking-[0.3em] py-10 rounded-none shadow-2xl transition-all h-auto"
                      >
                        {appForm.formState.isSubmitting ? "Transmitting Profile..." : "Submit Application for Review"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. FOOTER */}
      <footer className="bg-black text-white py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border border-[#B87333] flex items-center justify-center text-[#B87333] font-serif text-lg">R</div>
              <span className="font-serif text-2xl tracking-[0.2em] uppercase">Reserve Vault</span>
            </div>
            <p className="text-[#8B7355] font-serif italic text-sm leading-relaxed max-w-xs">
              The Old Bond Warehouse, Dufftown. Curators of Scotland's most elusive spirits since 2019.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFBF00] mb-8">Navigation</h4>
            <ul className="space-y-4 text-[#8B7355] text-sm font-serif italic">
              <li className="hover:text-white transition-colors cursor-pointer">The Cask Room</li>
              <li className="hover:text-white transition-colors cursor-pointer">Membership Tiers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Distillery Intelligence</li>
              <li className="hover:text-white transition-colors cursor-pointer">Private Consultations</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFBF00] mb-8">Contact</h4>
            <ul className="space-y-4 text-[#8B7355] text-sm font-serif italic">
              <li>membership@reservewhisky.com</li>
              <li>+44 1340 820 000</li>
              <li>Dufftown, Keith AB55 4BS</li>
              <li>Scotland, United Kingdom</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFBF00] mb-8">Legal</h4>
            <ul className="space-y-4 text-[#8B7355] text-sm font-serif italic">
              <li>Age Verification (21+)</li>
              <li>Shipping & Bonded Storage</li>
              <li>Investment Disclaimers</li>
              <li>Privacy Protocol</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">
            © 2025 Reserve Whisky Vault — Dufftown, Scotland
          </p>
          <div className="flex items-center gap-4 text-[#8B7355]">
            <Award className="w-5 h-5 opacity-20" />
            <Award className="w-5 h-5 opacity-20" />
            <Award className="w-5 h-5 opacity-20" />
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[110]">
        <Button 
          onClick={() => scrollTo('apply')}
          className="w-full bg-[#FFBF00] text-black font-black py-8 rounded-none shadow-2xl tracking-[0.3em] uppercase text-xs border border-white/10"
        >
          Request Membership Access
        </Button>
      </div>
    </div>
  );
}
