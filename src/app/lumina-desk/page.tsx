
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  Zap, 
  Battery, 
  Wind, 
  Layers, 
  Sun, 
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
  Eye,
  Focus,
  Move,
  Check,
  ArrowRight,
  Lightbulb
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

const CircadianBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Map scroll to color temperature
  // 0: Dawn (Warm Amber)
  // 0.5: Noon (Cool Blue)
  // 1: Dusk (Deep Orange)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#fdf2f2", "#eff6ff", "#fef3c7"]
  );

  return (
    <motion.div 
      className="fixed inset-0 z-0 transition-colors duration-1000"
      style={{ backgroundColor: bgColor }}
    />
  );
};

const LightBeam = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const beamX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const beamY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <motion.div 
      className="fixed inset-0 z-10 pointer-events-none opacity-20 hidden lg:block"
      style={{
        background: useTransform(
          [beamX, beamY],
          ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, #f59e0b 0%, transparent 40%)`
        )
      }}
    />
  );
};

const ComparisonSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-[2rem] overflow-hidden cursor-ew-resize select-none shadow-2xl border-4 border-white"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After (Lumina) */}
      <div className="absolute inset-0">
        <Image 
          src="https://picsum.photos/seed/lumina-after/1200/800" 
          alt="Lumina Glow" 
          fill 
          className="object-cover"
          data-ai-hint="clean desk office"
        />
        <div className="absolute inset-0 bg-amber-500/10" />
        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-amber-600 shadow-lg">
          With Lumina (95+ CRI)
        </div>
      </div>

      {/* Before (Harsh) */}
      <motion.div 
        className="absolute inset-0 overflow-hidden border-r-2 border-white z-20"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="relative w-[100vw] aspect-video">
          <Image 
            src="https://picsum.photos/seed/lumina-before/1200/800" 
            alt="Harsh Light" 
            fill 
            className="object-cover grayscale"
            data-ai-hint="dark desk office"
          />
          <div className="absolute inset-0 bg-blue-900/20" />
          <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-lg">
            Standard LED (Low CRI)
          </div>
        </div>
      </motion.div>

      {/* Handle */}
      <motion.div 
        className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-2xl"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <Move className="w-5 h-5 text-slate-400" />
        </div>
      </motion.div>
    </div>
  );
};

const CircadianClock = () => {
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const sunY = useTransform(scrollYProgress, [0, 0.5, 1], [20, -40, 20]);

  return (
    <div className="relative w-64 h-32 overflow-hidden mx-auto">
      <div className="absolute bottom-0 left-0 w-full h-px bg-slate-200" />
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 border-2 border-dashed border-slate-200 rounded-full"
        style={{ rotate: rotation, originY: "100%" }}
      >
        <motion.div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-400 rounded-full shadow-[0_0_20px_#f59e0b]"
          style={{ y: sunY }}
        />
      </motion.div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2 text-[8px] font-black uppercase tracking-widest text-slate-400">
        <span>06:00 AM</span>
        <span>12:00 PM</span>
        <span>10:00 PM</span>
      </div>
    </div>
  );
};

export default function LuminaDeskPage() {
  const { toast } = useToast();
  const [activeFinish, setActiveFinish] = useState('Classic Brass');

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `Lumina Desk (${activeFinish}) has been added to your collection.`,
    });
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-amber-200 overflow-x-hidden">
      <CircadianBackground />
      <LightBeam />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between border-b border-slate-200/50 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform">
            <Lightbulb className="w-6 h-6" />
          </div>
          <span className="text-2xl font-serif italic tracking-tight uppercase">Lumina</span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <button onClick={() => document.getElementById('rhythm')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-600 transition-colors">Circadian</button>
          <button onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-600 transition-colors">Wellness</button>
          <button onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-600 transition-colors">Engineering</button>
          <Button onClick={handleAddToCart} className="rounded-full px-8 py-6 bg-slate-900 text-white font-black hover:bg-amber-600 transition-all shadow-xl">
            Buy Now — $149
          </Button>
        </div>

        <button className="lg:hidden p-2"><Menu className="w-6 h-6" /></button>
      </nav>

      <main className="relative z-20">
        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center pt-20 px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 mb-8">
              <Sun className="w-3 h-3" /> The Science of Better Light
            </div>
            <h1 className="text-6xl md:text-[140px] font-serif italic leading-[0.8] mb-8 tracking-tighter text-slate-900 uppercase">
              The Last Lamp <br/>
              <span className="text-amber-600 underline decoration-slate-200 underline-offset-8">You'll Buy.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-500 font-medium max-w-2xl mx-auto mb-16">
              Synchronize your workspace with the sun. Natural light, curated for your desk.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="w-full sm:w-auto bg-amber-500 hover:bg-slate-900 text-white font-black text-2xl px-16 py-10 h-auto rounded-full shadow-2xl shadow-amber-500/20 transition-all uppercase italic"
              >
                Reserve Yours — $149
              </Button>
              <div className="flex flex-col items-center sm:items-start text-left gap-1">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">4.9/5 (890 REVIEWS)</p>
              </div>
            </div>
          </FadeIn>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 relative w-full max-w-4xl aspect-square"
          >
            <Image 
              src="https://picsum.photos/seed/lumina-hero/1000/1000" 
              alt="Lumina Desk Lamp" 
              fill 
              className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.1)]" 
              priority
              data-ai-hint="brass desk lamp"
            />
            {/* Visual Beam Effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-amber-400/20 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        </section>

        {/* 2. CIRCADIAN RHYTHM SECTION */}
        <section id="rhythm" className="py-32 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-4xl md:text-7xl font-serif italic mb-8 leading-tight">Light that follows <br/><span className="text-amber-600">the sun.</span></h2>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium mb-12 italic">
                    Lumina Desk uses astronomical data to calculate the exact sun position at your coordinates, adjusting its color temperature in real-time to match your natural biological clock.
                  </p>
                  
                  <div className="space-y-12">
                    {[
                      { time: "Morning (5000K)", desc: "Cool, blue-rich light inhibits melatonin, boosting focus and alertness for your deep work sessions.", color: "bg-blue-400" },
                      { time: "Afternoon (4000K)", desc: "Balanced white light maintains energy levels without the 'afternoon slump' common under static office lights.", color: "bg-white border border-slate-200" },
                      { time: "Evening (2700K)", desc: "Warm, amber tones prepare your body for rest, reducing cortisol and promoting healthy sleep cycles.", color: "bg-amber-400" }
                    ].map((phase, i) => (
                      <div key={i} className="flex gap-6 items-start group">
                        <div className={cn("w-4 h-4 rounded-full flex-shrink-0 mt-1 shadow-sm transition-transform group-hover:scale-125", phase.color)} />
                        <div>
                          <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{phase.time}</h4>
                          <p className="text-slate-500 text-sm leading-relaxed">{phase.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <div className="flex flex-col items-center">
                <FadeIn delay={0.2}>
                  <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100 text-center space-y-12">
                    <CircadianClock />
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Current Mode</p>
                      <h3 className="text-3xl font-serif italic text-slate-900">Optimal Focus</h3>
                      <div className="flex justify-center gap-1 mt-4">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={cn("w-1 h-4 rounded-full", i < 7 ? "bg-amber-500" : "bg-slate-100")} />
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-full border-slate-200 text-slate-400 hover:text-amber-600 px-8">View Live Cycle</Button>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BENEFITS (Illuminated Cards) */}
        <section id="benefits" className="py-32 px-6 bg-white/40 backdrop-blur-sm border-y border-slate-200">
          <div className="container mx-auto">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-serif italic text-slate-900 mb-6 uppercase tracking-tighter leading-none">Designed for <br/>Health & Habit.</h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium italic">We spent 2 years obsessing over the details so you never have to think about them again.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Circadian Sync", icon: Sun, desc: "Automatic transitions happen so smoothly you won't even notice them." },
                { title: "Qi Charging", icon: Battery, desc: "Integrated hidden 15W wireless charging base for your mobile devices." },
                { title: "Motion Sense", icon: Zap, desc: "Turns on instantly when you sit down. Fades out 5 mins after you leave." },
                { title: "Hand-Finish", icon: Layers, desc: "Solid brass components that will develop a unique patina over decades." }
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group p-12 bg-white rounded-[3rem] border border-slate-100 h-full hover:border-amber-500/20 hover:shadow-2xl transition-all duration-500">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-400 mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-sm">
                      <f.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">{f.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. COMPARISON SLIDER */}
        <section className="py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-serif italic text-slate-900 mb-6">See the difference.</h2>
                <p className="text-lg text-slate-500 font-medium">Drag to compare Lumina's 95+ CRI light against standard LEDs.</p>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <ComparisonSlider />
            </FadeIn>
          </div>
        </section>

        {/* 5. TECHNICAL SPECIFICATIONS */}
        <section id="specs" className="py-32 px-6 bg-slate-900 text-white">
          <div className="container mx-auto max-w-4xl">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-serif italic text-center mb-24">The Engineering <br/>of Excellence.</h2>
            </FadeIn>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Light Architecture", a: "Edge-lit LED array with custom glass diffuser for zero-glare task lighting. CRI 95+ ensures perfect color accuracy for creative work.", icon: Sun },
                { q: "Materials & Sustainability", a: "Body constructed from solid brass and recyclable aluminum. Glass diffuser. Zero plastic housing. Designed for repairability.", icon: Layers },
                { q: "Smart Home & Connectivity", a: "Bluetooth 5.0. Native app for iOS/Android. Direct integration with HomeKit, Alexa, and Google Assistant. Firmware updates OTA.", icon: Smartphone },
                { q: "Dimensions & Adjustment", a: "Height: 16 inches. Footprint: 6 inches. 3-axis rotation for precise light placement. Weight: 4.5 lbs for stability.", icon: Move }
              ].map((spec, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-[2rem] px-8 transition-colors hover:border-amber-500/30">
                  <AccordionTrigger className="text-left font-bold text-xl hover:no-underline py-10 uppercase tracking-widest">
                    <div className="flex items-center gap-6">
                      <spec.icon className="w-6 h-6 text-amber-500" />
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

        {/* 6. SOCIAL PROOF */}
        <section className="py-32 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-serif italic text-slate-900 mb-6 uppercase tracking-tighter">Wellness <br/>Verified.</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />)}
                </div>
                <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">Average Rating 4.9/5 from 890+ Owners</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Marcus Johnson", role: "UX Designer", quote: "My headaches disappeared. The light quality is incredible—no glare, no eye strain. It feels like natural window light even at midnight." },
                { name: "Emily Roberts", role: "Remote Worker", quote: "The wireless charging is clutch, and the auto-dimming helps me sleep better. It's the most beautiful object on my desk." },
                { name: "David Chen", role: "Architect", quote: "As an architect, color accuracy is everything. Lumina's CRI 95+ is professional grade. The build quality is heirlooom level." }
              ].map((review, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-12 bg-white border border-slate-100 rounded-[3rem] h-full flex flex-col shadow-xl hover:-translate-y-2 transition-all">
                    <div className="mb-8 flex gap-1 text-amber-500">
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

        {/* 7. FINAL CTA */}
        <section className="py-32 bg-amber-500 relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent)]" />
          
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-[140px] font-serif italic mb-12 uppercase tracking-tighter leading-none">Your Best Work <br/>Starts with Light.</h2>
              <p className="text-xl md:text-3xl text-white/80 mb-16 max-w-3xl mx-auto font-bold uppercase tracking-widest">FREE WORLDWIDE SHIPPING • 60-DAY HOME TRIAL</p>
              
              <div className="flex flex-col items-center gap-8">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="bg-slate-900 text-white hover:bg-black font-black text-3xl px-20 py-12 h-auto rounded-full shadow-2xl transition-all uppercase italic"
                >
                  Reserve My Lumina — $149
                </Button>
                <div className="flex flex-wrap justify-center gap-12 text-slate-900/60 font-bold uppercase text-[10px] tracking-widest">
                  <div className="flex items-center gap-3"><ShieldCheck className="w-6 h-6" /> 15-Year Warranty</div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6" /> Secured Checkout</div>
                  <div className="flex items-center gap-3"><Clock className="w-6 h-6" /> Dispatches in 48h</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white py-24 px-6 md:px-12 border-t border-slate-100 relative z-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <span className="text-2xl font-serif italic tracking-tighter uppercase">Lumina</span>
              </div>
              <p className="text-slate-500 font-medium max-w-sm mb-12 leading-relaxed">Pioneering circadian wellness through engineering and aesthetic purity. Hand-finished in Portland, Oregon.</p>
              <div className="flex gap-6">
                {['Instagram', 'X', 'Vimeo'].map(social => (
                  <span key={social} className="text-slate-400 hover:text-amber-600 cursor-pointer font-black text-[10px] uppercase tracking-[0.3em] transition-colors">{social}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-400 mb-8">Navigation</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-amber-600 cursor-pointer">The Science</li>
                <li className="hover:text-amber-600 cursor-pointer">Technical Specs</li>
                <li className="hover:text-amber-600 cursor-pointer">Environmental Impact</li>
                <li className="hover:text-amber-600 cursor-pointer">Partner Portal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-400 mb-8">Client Service</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-amber-600 cursor-pointer">Order Status</li>
                <li className="hover:text-amber-600 cursor-pointer">Trial & Returns</li>
                <li className="hover:text-amber-600 cursor-pointer">Warranty Policy</li>
                <li className="hover:text-amber-600 cursor-pointer">Contact Atelier</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <p>&copy; 2025 Lumina Light Systems. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy Protocol</span>
              <span className="hover:text-slate-900 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BUY BAR */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[110]">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-amber-500 text-white font-black py-8 text-xl shadow-2xl rounded-full flex items-center justify-center gap-3 uppercase italic border-2 border-white/20 backdrop-blur-sm"
        >
          <ShoppingBag className="w-6 h-6" />
          Reserve Lumina — $149
        </Button>
      </div>

    </div>
  );
}
