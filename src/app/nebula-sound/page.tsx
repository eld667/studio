
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Zap, 
  Battery, 
  Wind, 
  Layers, 
  Bluetooth, 
  ShieldCheck, 
  Star, 
  ChevronRight, 
  Play, 
  Maximize2, 
  Volume2, 
  Smartphone, 
  RotateCcw,
  ShoppingBag,
  CheckCircle2,
  X,
  Menu,
  Clock,
  Music
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FadeIn } from '../FadeIn';
import { useToast } from "@/hooks/use-toast";

// --- COMPONENTS ---

const SoundWaveBackground = () => {
  const { scrollYProgress } = useScroll();
  const amplitude = useTransform(scrollYProgress, [0, 0.5], [20, 100]);
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d="M0 400 Q 360 300 720 400 T 1440 400"
            fill="none"
            stroke={i % 2 === 0 ? "#00D4FF" : "#A855F7"}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.5,
              d: [
                `M0 400 Q 360 ${400 - 50 * (i+1)} 720 400 T 1440 400`,
                `M0 400 Q 360 ${400 + 50 * (i+1)} 720 400 T 1440 400`,
                `M0 400 Q 360 ${400 - 50 * (i+1)} 720 400 T 1440 400`,
              ]
            }}
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const Product360 = () => {
  const [rotation, setRotation] = useState(0);
  const springRotation = useSpring(rotation, { stiffness: 100, damping: 30 });
  const rotateY = useTransform(springRotation, (v) => `${v}deg`);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing group">
      <motion.div 
        style={{ rotateY }}
        className="relative w-full h-full"
        onPan={(_, info) => setRotation(prev => prev + info.delta.x)}
      >
        <Image 
          src="https://picsum.photos/seed/nebula-main/1000/1000" 
          alt="Nebula Sound Pro" 
          fill 
          className="object-contain drop-shadow-[0_0_50px_rgba(0,212,255,0.3)]"
          data-ai-hint="luxury headphones"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-40" />
      </motion.div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 shadow-2xl">
        <RotateCcw className="w-3 h-3 animate-spin-slow" /> Drag to rotate 360°
      </div>
    </div>
  );
};

const EqualizerBars = () => {
  const bars = [0.8, 0.4, 0.9, 0.6, 1, 0.7, 0.5, 0.9, 0.3, 0.8];
  return (
    <div className="flex items-end gap-1 h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#00D4FF] rounded-t-full"
          animate={{ height: [`${h * 20}%`, `${h * 100}%`, `${h * 20}%`] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
};

export default function NebulaSoundPage() {
  const [activeColor, setActiveColor] = useState('Midnight Black');
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `Nebula Sound Pro (${activeColor}) has been added to your session.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00D4FF] selection:text-black font-sans overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-[#0B0F19]/80">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#A855F7] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
            <Volume2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">Nebula</span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00D4FF] transition-colors">Acoustics</button>
          <button onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00D4FF] transition-colors">Intelligence</button>
          <button onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00D4FF] transition-colors">Feedback</button>
          <Button onClick={handleAddToCart} className="rounded-full px-8 py-6 bg-[#00D4FF] text-[#0B0F19] font-black hover:bg-white transition-all shadow-xl shadow-blue-500/20">
            Buy Now — $299
          </Button>
        </div>

        <button className="lg:hidden text-white"><Menu className="w-6 h-6" /></button>
      </nav>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden">
          <SoundWaveBackground />
          
          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-[#00D4FF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-8">
                <Music className="w-3 h-3" /> The New Standard in Spatial Audio
              </div>
              <h1 className="text-6xl md:text-[160px] font-black leading-[0.8] mb-8 tracking-tighter uppercase italic">
                Silence the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-white to-[#A855F7]">World.</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-400 font-bold uppercase tracking-[0.4em] mb-12 max-w-4xl mx-auto">
                Hear Everything. $299.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="w-full sm:w-auto bg-[#00D4FF] hover:bg-white text-[#0B0F19] font-black text-2xl px-16 py-10 h-auto rounded-[2rem] shadow-2xl shadow-blue-500/40 transition-all uppercase italic animate-pulse hover:animate-none"
                >
                  Add to Cart
                </Button>
                <div className="flex flex-col items-center sm:items-start text-left gap-1">
                  <div className="flex gap-1 text-orange-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">4.8/5 (2,400+ REVIEWS)</p>
                </div>
              </div>
            </FadeIn>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-20"
            >
              <Product360 />
            </motion.div>
          </div>
        </section>

        {/* 2. THE EQUALIZER BENEFITS */}
        <section id="features" className="py-32 bg-[#0B0F19] border-y border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-4xl md:text-7xl font-black mb-12 italic uppercase leading-none">Acoustic <br/><span className="text-[#00D4FF]">Engineering.</span></h2>
                  <div className="space-y-12">
                    {[
                      { title: "Adaptive ANC", desc: "AI learns your environment—silence on planes, awareness on streets.", stat: "98%", label: "Noise Cancellation" },
                      { title: "Spatial Engine", desc: "Dolby Atmos turns any track into immersive 360° sound.", stat: "360°", label: "Soundstage" },
                      { title: "Extreme Battery", desc: "Week-long listening. 5-min charge = 4 hours playback.", stat: "40h", label: "Total Runtime" },
                      { title: "Six-Mic Array", desc: "Beamforming mics with AI noise reduction for crystal-clear calls.", stat: "6x", label: "Pro Mics" }
                    ].map((feature, i) => (
                      <div key={i} className="group cursor-default">
                        <div className="flex justify-between items-end mb-4">
                          <h4 className="text-xl font-black uppercase tracking-tight">{feature.title}</h4>
                          <span className="text-2xl font-black text-[#00D4FF]">{feature.stat}</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                            className="h-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7]"
                          />
                        </div>
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-slate-500 font-medium max-w-xs">{feature.desc}</p>
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{feature.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <div className="relative">
                <FadeIn delay={0.2}>
                  <div className="aspect-[4/5] bg-white/5 rounded-[3rem] border border-white/10 p-12 flex flex-col justify-between overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                      <Volume2 className="w-64 h-64 text-[#00D4FF]" />
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                      <EqualizerBars />
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter">True Fidelity.</h3>
                      <p className="text-slate-400 font-medium leading-relaxed">
                        The Nebula Sound Pro features 40mm titanium-coated drivers, delivering earth-shaking bass and crystalline highs that standard wireless cans simply can't touch.
                      </p>
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image src="https://picsum.photos/seed/nebula-lifestyle/800/600" alt="Lifestyle" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[10px] font-black bg-[#00D4FF] text-[#0B0F19] px-2 py-1 rounded uppercase tracking-widest">Live Feed</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TECHNICAL SPECIFICATIONS */}
        <section id="specs" className="py-32 bg-[#0B0F19]">
          <div className="container mx-auto px-6 max-w-4xl">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-black text-center mb-20 uppercase tracking-tighter italic">Technical <span className="text-blue-500">DNA</span></h2>
            </FadeIn>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Acoustic Hardware", a: "40mm titanium-coated dynamic drivers. Neodymium magnets. Frequency response of 20Hz - 40kHz for high-resolution audio certification.", icon: Volume2 },
                { q: "Bluetooth & Connectivity", a: "Bluetooth 5.3 with LE Audio. Multipoint connection for 2 devices. 10m range. 3.5mm bypass mode for zero-latency studio use.", icon: Bluetooth },
                { q: "Active Noise Cancellation", a: "Six beamforming microphones. Real-time background analysis (50,000 checks/sec). Custom transparency mode.", icon: Wind },
                { q: "Battery & Charging", a: "40 hours with ANC ON. 60 hours with ANC OFF. USB-C Power Delivery: 5-minute charge yields 4 hours of playback.", icon: Battery }
              ].map((spec, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-3xl px-8 transition-colors hover:border-blue-500/30">
                  <AccordionTrigger className="text-left font-black text-xl hover:no-underline py-8 uppercase tracking-tight">
                    <div className="flex items-center gap-4">
                      <spec.icon className="w-6 h-6 text-[#00D4FF]" />
                      {spec.q}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-lg leading-relaxed pb-8 font-medium italic">
                    {spec.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 4. SOCIAL PROOF */}
        <section id="reviews" className="py-32 bg-[#0B0F19] border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">Verified <span className="text-[#A855F7]">Sound.</span></h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-[#00D4FF] fill-[#00D4FF]" />)}
                </div>
                <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">Average Rating 4.8/5 from 2,400+ Users</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "David Chen", role: "Music Producer", quote: "I A/B tested these against my $800 studio cans. The Nebulas won on comfort and nearly matched on fidelity." },
                { name: "Sarah Williams", role: "Daily Commuter", quote: "These survived 6 months of NYC subway abuse. Still look new, still sound incredible. The ANC is spooky good." },
                { name: "James Miller", role: "Software Engineer", quote: "Absolute focus bubble. I can work in a busy cafe and hear absolutely nothing but my flow state playlist." }
              ].map((review, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] h-full flex flex-col hover:bg-white/10 transition-colors">
                    <div className="mb-8 flex gap-1 text-[#00D4FF]">
                      {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-xl italic text-slate-300 leading-relaxed mb-12 flex-grow">"{review.quote}"</p>
                    <div>
                      <p className="font-black uppercase tracking-tight text-white">{review.name}</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{review.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FINAL CTA */}
        <section className="py-32 bg-white relative overflow-hidden text-center text-[#0B0F19]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1),transparent)]" />
          
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-9xl font-black mb-12 uppercase tracking-tighter leading-none italic">Experience <br/>The Nebula.</h2>
              <p className="text-xl md:text-3xl text-slate-600 mb-16 max-w-3xl mx-auto font-bold uppercase tracking-widest">FREE 2-DAY SHIPPING • 30-DAY RISK-FREE TRIAL</p>
              
              <div className="flex flex-col items-center gap-8">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="bg-[#0B0F19] text-white hover:bg-black font-black text-3xl px-20 py-12 h-auto rounded-[3rem] shadow-2xl transition-all uppercase italic"
                >
                  Add to Cart — $299
                </Button>
                <div className="flex flex-wrap justify-center gap-12 opacity-40">
                  <div className="flex items-center gap-3"><ShieldCheck className="w-6 h-6" /> 2-Year Warranty</div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6" /> Secured Checkout</div>
                  <div className="flex items-center gap-3"><Smartphone className="w-6 h-6" /> iOS & Android App</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0B0F19] py-24 px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <Volume2 className="w-8 h-8 text-[#00D4FF]" />
                <span className="text-2xl font-black tracking-tighter uppercase italic">Nebula</span>
              </div>
              <p className="text-slate-500 font-bold max-w-sm mb-12 leading-relaxed">The future of acoustic engineering. Designed for creators, commuters, and deep-work fanatics. Based in Los Angeles.</p>
              <div className="flex gap-6">
                {['Instagram', 'X', 'YouTube'].map(social => (
                  <span key={social} className="text-slate-400 hover:text-[#00D4FF] cursor-pointer font-black text-[10px] uppercase tracking-[0.3em] transition-colors">{social}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#00D4FF] mb-8">Product</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Compare Models</li>
                <li className="hover:text-white cursor-pointer transition-colors">Technical Specs</li>
                <li className="hover:text-white cursor-pointer transition-colors">User Manuals</li>
                <li className="hover:text-white cursor-pointer transition-colors">App Download</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#00D4FF] mb-8">Support</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Order Tracking</li>
                <li className="hover:text-white cursor-pointer transition-colors">Returns & Refunds</li>
                <li className="hover:text-white cursor-pointer transition-colors">Warranty Registry</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
            <p>&copy; 2025 Nebula Acoustic Labs. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BUY BAR */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[110]">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-[#00D4FF] text-[#0B0F19] font-black py-8 text-xl shadow-2xl rounded-2xl flex items-center justify-center gap-3 uppercase italic border-2 border-white/10 backdrop-blur-sm"
        >
          <ShoppingBag className="w-6 h-6" />
          Buy Now — $299
        </Button>
      </div>

    </div>
  );
}
