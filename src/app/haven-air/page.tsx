
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldCheck, 
  Wind, 
  Activity, 
  Smartphone, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  Menu, 
  Star,
  Zap,
  ArrowRight,
  Info,
  Clock,
  Layout,
  Microscope,
  Heart,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FadeIn } from '../FadeIn';
import { useToast } from "@/hooks/use-toast";
import { ParticleSimulation } from './ParticleSimulation';
import { RoomCalculator } from './RoomCalculator';
import { LungsViz } from './LungsViz';

export default function HavenAirPage() {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const particleCount = useTransform(scrollYProgress, [0, 0.8], [1000, 3]);
  const hazeOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0]);
  const [displayCount, setDisplayCount] = useState(1000);

  useEffect(() => {
    return particleCount.onChange(v => setDisplayCount(Math.round(v)));
  }, [particleCount]);

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: "Haven Pro Air Purifier (Graphite) has been reserved.",
    });
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100 overflow-x-hidden">
      
      {/* --- ATMOSPHERIC HAZE --- */}
      <motion.div 
        style={{ opacity: hazeOpacity }}
        className="fixed inset-0 z-10 bg-[#78716C]/10 pointer-events-none backdrop-blur-[2px]"
      />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:rotate-6 transition-transform">
            <Wind className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase text-slate-900">Haven</span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <button onClick={() => scrollTo('science')} className="hover:text-teal-600 transition-colors">Science</button>
          <button onClick={() => scrollTo('specs')} className="hover:text-teal-600 transition-colors">Specifications</button>
          <button onClick={() => scrollTo('reviews')} className="hover:text-teal-600 transition-colors">Reviews</button>
          <Button onClick={handleAddToCart} className="rounded-full px-8 py-6 bg-slate-950 text-white hover:bg-teal-600 transition-all shadow-xl">
            Order Now — $449
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
            className="fixed inset-0 z-[110] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-bold uppercase tracking-tighter italic">
              <button onClick={() => scrollTo('science')} className="text-left">Science</button>
              <button onClick={() => scrollTo('specs')} className="text-left">Specifications</button>
              <button onClick={() => scrollTo('reviews')} className="text-left">Reviews</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-20">
        
        {/* 1. HERO: PARTICLE SIMULATION */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ParticleSimulation scrollProgress={scrollYProgress} />
          </div>

          <div className="container relative z-10 mx-auto text-center max-w-5xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100 mb-8">
                <Microscope className="w-3 h-3" /> Medical-Grade HEPA-13 Technology
              </div>
              <h1 className="text-5xl md:text-[120px] font-bold leading-[0.85] mb-8 tracking-tighter text-slate-950 uppercase">
                Breathe <br/>
                <span className="text-teal-600 underline decoration-slate-200 underline-offset-8 italic">Better.</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 italic">
                Hospital-grade air purification, engineered for the sanctuary of your home.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="w-full sm:w-auto bg-teal-600 hover:bg-slate-900 text-white font-black text-2xl px-16 py-10 h-auto rounded-[2rem] shadow-2xl shadow-teal-500/20 transition-all uppercase"
                >
                  Reserve My Haven — $449
                </Button>
              </div>

              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-left">
                <div className="p-6 bg-white/80 backdrop-blur border border-slate-100 rounded-3xl shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Particles</p>
                    <Activity className="w-4 h-4 text-teal-500" />
                  </div>
                  <p className="text-4xl font-black text-slate-900">{displayCount}<span className="text-xs text-slate-400 ml-1">PM</span></p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Scroll to visualize purification</p>
                </div>
                <div className="p-6 bg-white/80 backdrop-blur border border-slate-100 rounded-3xl shadow-lg flex flex-col justify-between">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Air Quality State</p>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full animate-pulse", displayCount > 100 ? "bg-orange-500" : "bg-emerald-500")} />
                    <span className="font-bold uppercase tracking-tight">{displayCount > 100 ? "Filtering..." : "Clinical Clean"}</span>
                  </div>
                </div>
                <div className="p-6 bg-white/80 backdrop-blur border border-slate-100 rounded-3xl shadow-lg">
                  <LungsViz progress={displayCount} />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 2. THE SCIENCE: POLLUTANT BREAKDOWN */}
        <section id="science" className="py-32 px-6 bg-slate-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-6 uppercase tracking-tighter italic">99.97% Coverage.</h2>
                <p className="text-xl text-slate-500 font-medium">Haven targets the invisible threats that standard filters miss.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Viruses & Bacteria", size: "0.1 Microns", icon: Zap, color: "bg-red-500" },
                { title: "Smoke & Odors", size: "0.3 Microns", icon: Wind, color: "bg-orange-500" },
                { title: "Pollen & Allergens", size: "10 Microns", icon: Heart, color: "bg-emerald-500" },
                { title: "Dust & Pet Dander", size: "50 Microns", icon: Layout, color: "bg-blue-500" }
              ].map((p, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg", p.color)}>
                      <p.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{p.title}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Targeting: {p.size}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">High-performance extraction ensures clinical-grade air quality in every corner of the room.</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CALCULATOR: DENSITY SIMULATOR */}
        <section className="py-32 px-6 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-6xl mx-auto">
              <div>
                <FadeIn>
                  <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 uppercase tracking-tighter italic">Engineered for <br/>Large Spaces.</h2>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium italic mb-12">
                    Adjust your room dimensions to see how Haven Pro manages particle density in real-time. Designed for nurseries, offices, and master suites.
                  </p>
                  <RoomCalculator />
                </FadeIn>
              </div>
              <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 group">
                <Image 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
                  alt="Modern Nursery" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  data-ai-hint="clean nursery"
                />
                <div className="absolute inset-0 bg-teal-500/10" />
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-teal-600 shadow-xl flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4" /> Recommended for Nursery
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL SPECIFICATIONS */}
        <section id="specs" className="py-32 px-6 bg-slate-950 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter italic mb-4">Acoustic & Air <br/>Intelligence.</h2>
                <p className="text-teal-500 font-black uppercase tracking-[0.4em] text-[10px]">Technical Datasheet v2.4</p>
              </FadeIn>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Filtration Stack", a: "Medical-grade HEPA-13 certified. Pre-filter for large debris, Activated Carbon for odors, and the core HEPA-13 layer for microscopic pathogens.", icon: Microscope },
                { q: "Performance Metrics", a: "CADR of 400 CFM. Cleans a 1,500 sq ft room once per hour. 500 sq ft every 20 minutes.", icon: Activity },
                { q: "Noise Engineering", a: "SilentSleep Technology operates at 22dB. Integrated noise-dampening insulation allows for clinical clean air without the hum.", icon: Wind },
                { q: "Smart Integration", a: "Native iOS/Android App. Integrated laser particulate sensor provides 24/7 real-time monitoring and auto-adjustment.", icon: Smartphone }
              ].map((spec, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-[2.5rem] px-8 transition-colors hover:border-teal-500/30">
                  <AccordionTrigger className="text-left font-bold text-xl hover:no-underline py-10 uppercase tracking-widest">
                    <div className="flex items-center gap-6">
                      <spec.icon className="w-6 h-6 text-teal-500" />
                      {spec.q}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-lg leading-relaxed pb-10 font-medium italic">
                    {spec.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 5. SOCIAL PROOF */}
        <section id="reviews" className="py-32 px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-6 uppercase tracking-tighter italic">Health <br/>Validated.</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-teal-500 fill-teal-500" />)}
                </div>
                <p className="text-xl text-slate-500 font-black uppercase tracking-widest">Average Rating 4.8/5 from 1,200+ Owners</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[
                { name: "Jennifer Park", role: "Allergy Sufferer", quote: "My allergy symptoms dropped 80% in the first week. The air smells... clean. I don't wake up congested anymore." },
                { name: "Robert Kim", role: "New Parent", quote: "Bought for our nursery. The quiet mode is actually silent. I can see the air quality on the app while I'm at work." },
                { name: "Sarah Williams", role: "Home Office", quote: "I never realized how much dust was in my office until Haven cleared it. I feel more focused and less sluggish." }
              ].map((review, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-12 bg-slate-50 rounded-[3rem] h-full flex flex-col shadow-lg border border-slate-100 hover:border-teal-500/20 transition-all">
                    <div className="mb-8 flex gap-1 text-teal-500">
                      {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-xl italic text-slate-600 leading-relaxed mb-12 flex-grow">"{review.quote}"</p>
                    <div>
                      <p className="font-bold uppercase tracking-tight text-slate-900">{review.name}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{review.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section className="py-32 bg-teal-600 relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]" />
          
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-[140px] font-bold mb-12 uppercase tracking-tighter leading-[0.8] italic">Invest in <br/>Every Breath.</h2>
              <p className="text-xl md:text-3xl text-white/80 mb-16 max-w-3xl mx-auto font-black uppercase tracking-widest">FREE WHITE GLOVE DELIVERY • 100-DAY RISK-FREE TRIAL</p>
              
              <div className="flex flex-col items-center gap-12">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="bg-slate-950 text-white hover:bg-white hover:text-teal-600 font-black text-3xl px-20 py-12 h-auto rounded-full shadow-2xl transition-all uppercase"
                >
                  Order My Haven — $449
                </Button>
                <div className="flex flex-wrap justify-center gap-12 text-white/60 font-black uppercase text-[10px] tracking-[0.3em]">
                  <div className="flex items-center gap-3"><ShieldCheck className="w-6 h-6" /> 5-Year Warranty</div>
                  <div className="flex items-center gap-3"><Activity className="w-6 h-6" /> HEPA-13 Certified</div>
                  <div className="flex items-center gap-3"><Layout className="w-6 h-6" /> In-Home Trial</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white py-24 px-6 md:px-12 border-t border-slate-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white">
                  <Wind className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tighter uppercase">Haven</span>
              </div>
              <p className="text-slate-500 font-medium max-w-sm mb-12 leading-relaxed">Defining the next generation of home healthcare through atmospheric intelligence and scientific purity. Based in Seattle, WA.</p>
              <div className="flex gap-6">
                {['Science', 'Specs', 'FAQ'].map(item => (
                  <span key={item} className="text-slate-400 hover:text-teal-600 cursor-pointer font-black text-[10px] uppercase tracking-[0.3em] transition-colors">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-400 mb-8">Legal</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-teal-600 cursor-pointer">Privacy Protocol</li>
                <li className="hover:text-teal-600 cursor-pointer">Terms of Service</li>
                <li className="hover:text-teal-600 cursor-pointer">Return Policy</li>
                <li className="hover:text-teal-600 cursor-pointer">Accessibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-400 mb-8">Support</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-teal-600 cursor-pointer">Order Status</li>
                <li className="hover:text-teal-600 cursor-pointer">Filter Subscriptions</li>
                <li className="hover:text-teal-600 cursor-pointer">App Support</li>
                <li className="hover:text-teal-600 cursor-pointer">Contact Medical Liaison</li>
              </ul>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 text-center md:text-left">
            &copy; 2025 Haven Air Purification Systems. HEPA-13 Certified. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE BUY BAR */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[110]">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-teal-600 text-white font-black py-8 text-xl shadow-2xl rounded-full flex items-center justify-center gap-3 uppercase border-2 border-white/20 backdrop-blur-sm"
        >
          <Wind className="w-6 h-6" />
          Buy Haven Pro — $449
        </Button>
      </div>

    </div>
  );
}
