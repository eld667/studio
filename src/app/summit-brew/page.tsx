
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Zap, 
  Settings, 
  Wind, 
  Clock, 
  ShieldCheck, 
  Star, 
  ChevronRight, 
  Play, 
  RotateCcw,
  ShoppingBag,
  CheckCircle2,
  X,
  Menu,
  Coffee,
  Thermometer,
  ArrowRight,
  Plus,
  Info,
  Layers,
  Search
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FadeIn } from '../FadeIn';
import { useToast } from "@/hooks/use-toast";

// --- SUB-COMPONENTS ---

const SteamParticle = ({ i }: { i: number }) => {
  const duration = 2 + Math.random() * 2;
  const delay = Math.random() * 2;
  const x = -20 + Math.random() * 40;

  return (
    <motion.div
      className="absolute bottom-0 w-8 h-8 bg-white/20 blur-xl rounded-full"
      initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
      animate={{ 
        y: -150, 
        x: x,
        opacity: [0, 0.4, 0],
        scale: [0.5, 1.5, 2]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "easeOut" 
      }}
    />
  );
};

const SteamAnimation = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-48 pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <SteamParticle key={i} i={i} />
    ))}
  </div>
);

const GrindSelector = () => {
  const [grind, setGrind] = useState('Medium');
  const sizes = ['Fine', 'Medium', 'Coarse'];
  
  const gap = grind === 'Fine' ? 2 : grind === 'Medium' ? 8 : 16;

  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm">
      <div className="flex justify-between items-center mb-12">
        <div>
          <p className="text-[10px] font-black text-crema-gold uppercase tracking-[0.3em] mb-1">Precision Grinding</p>
          <h3 className="text-2xl font-bold uppercase tracking-tighter">Ceramic Burrs</h3>
        </div>
        <div className="text-right">
          <span className="text-sm font-black text-crema-gold uppercase">{grind} Setting</span>
        </div>
      </div>

      <div className="relative h-40 flex items-center justify-center mb-12">
        {/* Burr Diagram Simulation */}
        <motion.div 
          className="absolute w-24 h-24 border-4 border-crema-gold rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-1 w-crema-gold bg-crema-gold/40" />
        </motion.div>
        
        <div className="flex gap-4 items-center">
          <motion.div 
            className="w-16 h-32 bg-stone-800 rounded-l-xl border-r-2 border-crema-gold"
            animate={{ x: -gap }}
          />
          <motion.div 
            className="w-16 h-32 bg-stone-800 rounded-r-xl border-l-2 border-crema-gold"
            animate={{ x: gap }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {sizes.map(s => (
          <button
            key={s}
            onClick={() => setGrind(s)}
            className={cn(
              "py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              grind === s ? "bg-crema-gold text-coffee-brown shadow-lg" : "bg-white/5 text-slate-400 hover:bg-white/10"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

const TempGauge = () => {
  const [temp, setTemp] = useState(201);
  
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm">
      <div className="flex justify-between items-end mb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-crema-gold uppercase tracking-[0.3em]">PID Control</p>
          <h3 className="text-2xl font-bold uppercase tracking-tighter">Thermal Stability</h3>
        </div>
        <Thermometer className={cn("w-6 h-6 transition-colors", temp > 200 ? "text-orange-500" : "text-blue-400")} />
      </div>

      <div className="relative h-32 flex items-end justify-center mb-8">
        <div className="absolute inset-0 border-b border-white/10" />
        <motion.div 
          className="w-full rounded-t-full bg-gradient-to-t from-orange-600/20 to-orange-500/40 border-t-2 border-orange-400"
          animate={{ height: `${(temp / 212) * 100}%` }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black italic tracking-tighter">
          {temp}°F
        </div>
      </div>

      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <span>Cold Brew</span>
        <span>Ideal Extraction</span>
        <span>Boil</span>
      </div>
    </div>
  );
};

export default function SummitBrewPage() {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const farmOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0]);
  const machineScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const aromaY = useTransform(scrollYProgress, [0, 1], [0, -500]);

  const handleAddToCart = () => {
    toast({
      title: "Added to Ritual",
      description: "Summit Brew System has been reserved for your morning.",
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-crema-gold font-sans selection:bg-crema-gold selection:text-coffee-brown overflow-x-hidden">
      
      {/* --- AROMA PARTICLES --- */}
      <motion.div 
        style={{ y: aromaY }}
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
      >
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-crema-gold rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              filter: 'blur(2px)' 
            }} 
          />
        ))}
      </motion.div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-coffee-brown/80">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 rounded-xl bg-crema-gold flex items-center justify-center text-coffee-brown shadow-lg group-hover:rotate-6 transition-transform">
            <Coffee className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Summit</span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-crema-gold/60">
          <button onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Journey</button>
          <button onClick={() => document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Engineering</button>
          <button onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Feedback</button>
          <Button onClick={handleAddToCart} className="rounded-full px-8 py-6 bg-crema-gold text-coffee-brown font-black hover:bg-white transition-all shadow-xl shadow-black/40">
            Order Now — $379
          </Button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(true)}>
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
            className="fixed inset-0 z-[110] bg-coffee-brown p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-white" /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tighter italic text-white">
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }); }}>Journey</button>
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' }); }}>Engineering</button>
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); }}>Feedback</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        
        {/* 1. HERO: THE RITUAL */}
        <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-6 overflow-hidden">
          <motion.div 
            style={{ opacity: farmOpacity }}
            className="absolute inset-0 z-0"
          >
            <Image 
              src="https://images.unsplash.com/photo-1459755484551-6303f2a17fe5?q=80&w=2070&auto=format&fit=crop" 
              alt="Coffee Farm" 
              fill 
              className="object-cover grayscale"
              priority 
              data-ai-hint="coffee plantation"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-transparent to-[#1A1A1A]" />
          </motion.div>

          <div className="container relative z-10 mx-auto text-center max-w-5xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-crema-gold/10 text-crema-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-crema-gold/20 mb-8 backdrop-blur-md">
                <Zap className="w-3 h-3" /> Professional Results. Zero Learning Curve.
              </div>
              <h1 className="text-5xl md:text-[140px] font-black leading-[0.8] mb-8 tracking-tighter text-white uppercase italic">
                Artisan Ritual. <br/>
                <span className="text-crema-gold underline decoration-white/20 underline-offset-8">One Touch.</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 italic">
                From high-altitude farms to your kitchen. The only system that respects the bean.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="w-full sm:w-auto bg-crema-gold hover:bg-white text-coffee-brown font-black text-2xl px-16 py-10 h-auto rounded-[2rem] shadow-2xl transition-all uppercase italic"
                >
                  Start Your Ritual — $379
                </Button>
              </div>
            </FadeIn>

            <motion.div 
              style={{ scale: machineScale }}
              className="mt-20 relative w-full max-w-2xl aspect-square mx-auto"
            >
              <Image 
                src="https://picsum.photos/seed/summit-machine/800/800" 
                alt="Summit Brew Machine" 
                fill 
                className="object-contain drop-shadow-[0_0_100px_rgba(212,165,116,0.2)]" 
                data-ai-hint="coffee machine"
              />
              <SteamAnimation />
            </motion.div>
          </div>
        </section>

        {/* 2. THE JOURNEY: VERTICAL PARALLAX */}
        <section id="journey" className="py-32 px-6 bg-[#1A1A1A] border-y border-white/5">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-6xl mx-auto">
              <div className="space-y-32">
                {[
                  { step: "01", title: "Single Origin Focus", desc: "Our system is calibrated for the nuances of high-altitude beans. Unlock the floral notes of Ethiopia or the chocolate depth of Colombia.", icon: Globe },
                  { step: "02", title: "Intelligent Roast Detection", desc: "Integrated sensors detect bean density and adjust temperature and grind time automatically.", icon: Search },
                  { step: "03", title: "Precision Extraction", desc: "19 bars of Italian pressure ensure a rich crema and balanced flavor profile, every single time.", icon: Zap }
                ].map((item, i) => (
                  <FadeIn key={i}>
                    <div className="relative pl-16 group">
                      <span className="text-6xl font-black text-white/5 absolute left-0 top-0 group-hover:text-crema-gold/10 transition-colors">
                        {item.step}
                      </span>
                      <item.icon className="w-8 h-8 text-crema-gold mb-6" />
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight italic mb-4">{item.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <div className="space-y-12">
                <FadeIn delay={0.2}>
                  <GrindSelector />
                </FadeIn>
                <FadeIn delay={0.4}>
                  <TempGauge />
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TECH SPECS: THE ENGINEERING */}
        <section id="tech" className="py-32 px-6 bg-coffee-brown text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">No Compromise <br/>Engineering.</h2>
                <p className="text-crema-gold font-bold uppercase tracking-[0.4em] text-[10px]">Technical Datasheet v4.0</p>
              </FadeIn>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Italian Pump System", a: "19-bar high-pressure Italian pump ensures commercial-grade extraction. Pre-infusion cycle bloom the coffee for maximum flavor clarity.", icon: Wind },
                { q: "Ceramic Burr Grinder", a: "Conical ceramic burrs produce zero heat during grinding, preserving the volatile aromatic oils often lost in blade or steel grinders.", icon: RotateCcw },
                { q: "Milk Logic Architecture", a: "Independent steam wand with AI temperature sensors creates perfect microfoam at 150°F—ideal for pouring detailed latte art.", icon: Plus },
                { q: "Self-Cleaning Core", a: "Automated purge cycles after every drink. Removable brew group for deep cleaning without professional servicing.", icon: ShieldCheck }
              ].map((spec, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-[2.5rem] px-8 transition-colors hover:border-crema-gold/30">
                  <AccordionTrigger className="text-left font-bold text-xl hover:no-underline py-10 uppercase tracking-widest">
                    <div className="flex items-center gap-6">
                      <spec.icon className="w-6 h-6 text-crema-gold" />
                      {spec.q}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 text-lg leading-relaxed pb-10 font-medium italic">
                    {spec.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 4. DRINK GALLERY */}
        <section className="py-32 px-6 bg-[#1A1A1A]">
          <div className="container mx-auto text-center mb-20">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">12 Barista Presets.</h2>
              <p className="text-xl text-slate-500 font-medium">Calibrated by champion baristas for the ultimate at-home menu.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 container mx-auto">
            {[
              { name: "Espresso", ratio: "1:2", img: "https://picsum.photos/seed/espresso/400/400" },
              { name: "Flat White", ratio: "1:3", img: "https://picsum.photos/seed/flat/400/400" },
              { name: "Latte", ratio: "1:5", img: "https://picsum.photos/seed/latte/400/400" },
              { name: "Americano", ratio: "1:8", img: "https://picsum.photos/seed/am/400/400" }
            ].map((drink, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative aspect-square rounded-[2rem] overflow-hidden border border-white/10">
                  <Image src={drink.img} alt={drink.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" data-ai-hint="coffee cup" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 text-left">
                    <p className="text-[10px] font-black text-crema-gold uppercase tracking-widest">{drink.ratio} Ratio</p>
                    <h4 className="text-xl font-bold text-white uppercase italic">{drink.name}</h4>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 5. SOCIAL PROOF */}
        <section id="reviews" className="py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { name: "Alex Turner", role: "Coffee Enthusiast", quote: "I own a $2,000 manual setup. The Summit produces equivalent quality with zero effort. The consistency is what shocked me most." },
                { name: "Lisa Chen", role: "Busy Professional", quote: "Finally—great coffee without the morning ritual. Push one button, walk away. It's paid for itself in saved cafe runs." },
                { name: "David Miller", role: "Host & Home Cook", quote: "The auto milk frother is a game changer for dinner parties. I can make 6 lattes in 10 minutes without breaking a sweat." }
              ].map((review, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem] h-full flex flex-col hover:border-crema-gold/20 transition-all">
                    <div className="mb-8 flex gap-1 text-crema-gold">
                      {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-xl italic text-slate-300 leading-relaxed mb-12 flex-grow">"{review.quote}"</p>
                    <div>
                      <p className="font-bold uppercase tracking-tight text-white">{review.name}</p>
                      <p className="text-[10px] font-black text-crema-gold uppercase tracking-widest">{review.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section className="py-32 bg-crema-gold relative overflow-hidden text-center text-coffee-brown">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent)]" />
          
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-[140px] font-black mb-12 uppercase tracking-tighter leading-[0.8] italic">Morning, <br/>Refined.</h2>
              <p className="text-xl md:text-3xl text-coffee-brown/80 mb-16 max-w-3xl mx-auto font-black uppercase tracking-widest">FREE 2-DAY SHIPPING • 60-DAY PERFECT COFFEE GUARANTEE</p>
              
              <div className="flex flex-col items-center gap-12">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="bg-coffee-brown text-white hover:bg-[#1A1A1A] font-black text-3xl px-20 py-12 h-auto rounded-full shadow-2xl transition-all uppercase italic"
                >
                  Reserve My Summit — $379
                </Button>
                <div className="flex flex-wrap justify-center gap-12 text-coffee-brown/60 font-black uppercase text-[10px] tracking-[0.3em]">
                  <div className="flex items-center gap-3"><ShieldCheck className="w-6 h-6" /> 3-Year Warranty</div>
                  <div className="flex items-center gap-3"><Clock className="w-6 h-6" /> Dispatches in 48h</div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6" /> Secure Checkout</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-coffee-brown text-crema-gold py-24 px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-crema-gold rounded-lg flex items-center justify-center text-coffee-brown">
                  <Coffee className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Summit</span>
              </div>
              <p className="text-crema-gold/60 font-medium max-w-sm mb-12 leading-relaxed">Dedicated to the science of extraction and the ritual of the morning. Designed in Seattle, WA. Crafted for the world.</p>
              <div className="flex gap-6">
                {['Instagram', 'Vimeo', 'X'].map(social => (
                  <span key={social} className="text-crema-gold/40 hover:text-white cursor-pointer font-black text-[10px] uppercase tracking-[0.3em] transition-colors">{social}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-white mb-8">Navigation</h4>
              <ul className="space-y-4 text-crema-gold/60 font-bold text-sm">
                <li className="hover:text-white cursor-pointer">Bean Origin</li>
                <li className="hover:text-white cursor-pointer">Grinder Tech</li>
                <li className="hover:text-white cursor-pointer">Sourcing Ethics</li>
                <li className="hover:text-white cursor-pointer">Barista Portal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-white mb-8">Care</h4>
              <ul className="space-y-4 text-crema-gold/60 font-bold text-sm">
                <li className="hover:text-white cursor-pointer">Cleaning Guides</li>
                <li className="hover:text-white cursor-pointer">Warranty Portal</li>
                <li className="hover:text-white cursor-pointer">Replacement Parts</li>
                <li className="hover:text-white cursor-pointer">Contact Support</li>
              </ul>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-crema-gold/20 text-center md:text-left">
            &copy; 2025 Summit Brew Systems. Calibrated for Perfection. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE BUY BAR */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[110]">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-crema-gold text-coffee-brown font-black py-8 text-xl shadow-2xl rounded-full flex items-center justify-center gap-3 uppercase border-2 border-white/20 backdrop-blur-sm italic"
        >
          <ShoppingBag className="w-6 h-6" />
          Buy Summit — $379
        </Button>
      </div>

    </div>
  );
}
