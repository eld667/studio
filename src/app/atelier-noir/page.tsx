
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  Instagram, 
  Twitter, 
  Mail, 
  Menu, 
  X, 
  Star,
  Award,
  Zap,
  Globe,
  Layers,
  PenTool,
  Search,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FadeIn } from '../FadeIn';
import { cn } from '@/lib/utils';

// --- DATA ---

const PROJECTS = [
  {
    id: "verite",
    title: "Maison Vérité",
    client: "Maison Vérité Paris",
    category: "Luxury Fashion",
    year: "2023",
    video: "https://cdn.pixabay.com/vimeo/456143414/nature-49141.mp4?width=1280&hash=bc8f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f",
    image: "https://picsum.photos/seed/noir1/1920/1080",
    challenge: "Heritage fashion house needed modern identity without losing 70-year legacy.",
    approach: "Archive research revealed original 1950s wordmark—updated with contemporary spacing.",
    outcome: "40% increase in brand recognition, featured in Wallpaper*."
  },
  {
    id: "artisan",
    title: "Artisan Coffee",
    client: "Artisan Coffee Collective",
    category: "Packaging",
    year: "2023",
    video: "https://cdn.pixabay.com/vimeo/209614144/hands-8211.mp4?width=1280&hash=bc8f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f",
    image: "https://picsum.photos/seed/noir2/1920/1080",
    challenge: "Stand out in saturated specialty coffee market sustainably.",
    approach: "Modular packaging with plant-based inks, botanical illustrations per origin.",
    outcome: "Sold out first run, Dieline Packaging Award."
  },
  {
    id: "hoxton",
    title: "The Hoxton",
    client: "Ennismore Design",
    category: "Hospitality",
    year: "2022",
    video: "https://cdn.pixabay.com/vimeo/328341112/hotel-23141.mp4?width=1280&hash=bc8f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f",
    image: "https://picsum.photos/seed/noir3/1920/1080",
    challenge: "Unify boutique hotel brand across 10 global locations.",
    approach: "Flexible system with core elements and location-specific collaborations.",
    outcome: "15% booking increase, AD feature."
  }
];

const SERVICES = [
  { title: "Brand Strategy", desc: "Positioning, audience research, competitive analysis.", icon: Search },
  { title: "Visual Identity", desc: "Logos, color systems, typography, brand guidelines.", icon: Layers },
  { title: "Packaging", desc: "Structural design, unboxing experience, sustainability.", icon: Zap },
  { title: "Art Direction", desc: "Photography guidance, campaign visuals.", icon: PenTool }
];

// --- COMPONENTS ---

const LoadingSequence = ({ onComplete }: { onScroll: any, onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <div className="w-20 h-20 border-2 border-[#D4AF37] flex items-center justify-center mb-6 mx-auto relative overflow-hidden">
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[#D4AF37]/20"
          />
          <span className="text-3xl font-black text-white">A</span>
        </div>
        <h1 className="text-xs font-bold uppercase tracking-[0.5em] text-white/40">Atelier Noir</h1>
      </motion.div>
    </motion.div>
  );
};

const ProjectChapter = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
  return (
    <div className="relative h-screen w-screen flex-shrink-0 bg-black overflow-hidden snap-start">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="h-full w-full object-cover opacity-40 grayscale-[30%]"
        >
          <source src={project.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="relative z-10 h-full w-full flex flex-col justify-end p-8 md:p-20">
        <div className="max-w-4xl space-y-6">
          <FadeIn>
            <div className="flex items-center gap-4 text-[#D4AF37] font-bold uppercase text-[10px] tracking-[0.3em]">
              <span>0{index + 1}</span>
              <div className="w-12 h-px bg-[#D4AF37]/30" />
              <span>{project.category}</span>
            </div>
            <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-white leading-none mt-4">
              {project.title}
            </h2>
            <p className="text-lg md:text-2xl text-white/60 font-serif italic max-w-xl mt-8">
              "{project.challenge}"
            </p>
            
            <div className="mt-12 flex items-center gap-8">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-[#D4AF37] hover:bg-[#B88A2D] text-black rounded-none px-10 py-8 uppercase text-xs font-black tracking-widest">
                    View Case Study
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-[100vw] md:max-w-3xl bg-[#0A0A0A] border-l border-white/5 p-0 overflow-y-auto">
                  <div className="relative">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                    </div>
                    
                    <div className="p-8 md:p-16 space-y-16 pb-32">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Client</p>
                          <p className="text-white font-bold">{project.client}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Year</p>
                          <p className="text-white font-bold">{project.year}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Service</p>
                          <p className="text-white font-bold">{project.category}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Location</p>
                          <p className="text-white font-bold">Paris / Global</p>
                        </div>
                      </div>

                      <div className="space-y-12">
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">01_The Challenge</h3>
                          <p className="text-2xl md:text-4xl font-serif italic text-white leading-tight">{project.challenge}</p>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">02_The Approach</h3>
                          <p className="text-lg text-white/60 leading-relaxed">{project.approach}</p>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">03_The Outcome</h3>
                          <p className="text-lg text-white/60 leading-relaxed">{project.outcome}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="relative aspect-square overflow-hidden bg-white/5">
                            <Image src={`https://picsum.photos/seed/noir-process-${i}/800/800`} alt="Process" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>

                      <div className="p-12 bg-white/5 border border-white/5 text-center">
                        <p className="text-3xl md:text-5xl font-black text-white italic mb-4">"A masterclass in luxury refinement."</p>
                        <p className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-widest">— Creative Director, Wallpaper*</p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="hidden md:flex flex-col">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Year</span>
                <span className="text-white font-bold">{project.year}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default function AtelierNoirPage() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Use scrollYProgress to drive horizontal movement
  const x = useTransform(scrollYProgress, [0, 0.8], ["0%", "-200%"]);
  
  const springX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#D4AF37] selection:text-black font-sans">
      <AnimatePresence>
        {isLoading && <LoadingSequence onComplete={() => setIsLoading(false)} onScroll={undefined} />}
      </AnimatePresence>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-50 h-20 px-6 md:px-12 flex items-center justify-between pointer-events-none">
        <Link href="/atelier-noir" className="font-black text-2xl uppercase tracking-tighter pointer-events-auto">
          Atelier Noir<span className="text-[#D4AF37]">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-12 font-bold text-[10px] uppercase tracking-[0.3em] text-white/40 pointer-events-auto">
          <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="hover:text-white transition-colors">Work</button>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Studio</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2 border border-white/10 hover:border-[#D4AF37] hover:text-white transition-all">Inquiry</button>
        </div>
        <button className="md:hidden pointer-events-auto"><Menu className="w-6 h-6 text-white" /></button>
      </nav>

      {/* --- HERO: THE MONOGRAM --- */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        >
          <source src="https://cdn.pixabay.com/vimeo/209614144/hands-8211.mp4?width=1280&hash=bc8f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f" type="video/mp4" />
        </video>
        
        <div className="relative z-10 text-center space-y-8">
          <FadeIn>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 md:w-32 md:h-32 border-2 border-[#D4AF37]/40 rounded-full flex items-center justify-center mx-auto mb-12"
            >
              <span className="text-4xl md:text-6xl font-black text-white">AN</span>
            </motion.div>
            <h1 className="text-6xl md:text-[120px] font-black uppercase leading-[0.85] tracking-tighter mb-8 italic">
              ENDURING <br /> IDENTITY<span className="text-[#D4AF37]">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 max-w-lg mx-auto font-serif italic">
              Crafting visual narratives for the luxury and lifestyle sectors since 2016.
            </p>
          </FadeIn>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <span className="text-[8px] font-bold uppercase tracking-[0.5em]">Scroll to Discover</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* --- PORTFOLIO: HORIZONTAL SHOWCASE --- */}
      <section ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex overflow-hidden">
          <motion.div style={{ x: springX }} className="flex h-full w-fit">
            {PROJECTS.map((project, i) => (
              <ProjectChapter key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT: DOCUMENTARY STYLE --- */}
      <section id="about" className="py-24 md:py-48 px-6 md:px-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeIn>
              <div className="space-y-12">
                <p className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-[0.4em]">// THE_STUDIO</p>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  Truth Built On <br /> Understanding.
                </h2>
                <div className="space-y-6 text-white/60 text-lg md:text-xl leading-relaxed font-serif italic">
                  <p>Atelier Noir is an independent brand design studio based in New York. We believe that great brands are built on deep truths, not passing trends.</p>
                  <p>We combine strategic rigor with creative intuition to uncover the unique narratives that differentiate our clients in the luxury and lifestyle space.</p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <p className="text-3xl font-black">08</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Years Crafting</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black">50+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Global Missions</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group">
                <Image src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop" alt="Studio" fill className="object-cover transition-transform duration-[3s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white font-black text-xl uppercase tracking-tighter">Atelier Noir HQ</p>
                  <p className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-widest">New York, NY</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <FadeIn>
              <p className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-[0.4em]">// CAPABILITIES</p>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic">Strategic Systems.</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-12 bg-black h-full group hover:bg-[#0A0A0A] transition-colors">
                  <s.icon className="w-10 h-10 text-[#D4AF37] mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{s.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRESS & RECOGNITION --- */}
      <section className="py-24 bg-black overflow-hidden border-b border-white/5">
        <div className="flex animate-marquee whitespace-nowrap gap-24 opacity-20 hover:opacity-100 transition-opacity duration-500">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em]">WALLPAPER*</span>
              <span className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-[#D4AF37]">D&AD</span>
              <span className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em]">IT'S NICE THAT</span>
              <span className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-[#D4AF37]">ADC</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 md:py-48 px-6 md:px-12 bg-[#0A0A0A] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <FadeIn>
                <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
                  Let's Begin <br /> The Story<span className="text-[#D4AF37]">.</span>
                </h2>
                <div className="space-y-8">
                  <div className="group cursor-pointer">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Studio Email</p>
                    <p className="text-2xl md:text-4xl font-bold group-hover:text-[#D4AF37] transition-colors">hello@atelier-noir.com</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Direct Line</p>
                    <p className="text-2xl md:text-4xl font-bold group-hover:text-[#D4AF37] transition-colors">+1 (212) 555-0192</p>
                  </div>
                </div>
                <div className="flex gap-6 pt-12">
                  <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            <div className="bg-black p-8 md:p-16 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <form className="space-y-10 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Full Identity</label>
                  <input className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors font-bold text-xl" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Path</label>
                  <input className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors font-bold text-xl" placeholder="you@domain.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Mission Parameters</label>
                  <textarea className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors font-bold text-xl h-32 resize-none" placeholder="Tell us about the project..." />
                </div>
                <Button className="w-full bg-[#D4AF37] hover:bg-[#B88A2D] text-black rounded-none py-10 uppercase text-xs font-black tracking-widest transition-all">
                  Send Transmission
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 md:py-24 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-12">
          <div className="space-y-4">
            <h3 className="font-black text-2xl uppercase tracking-tighter">Atelier Noir<span className="text-[#D4AF37]">.</span></h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">© 2024 Atelier Noir Studio LLC. All rights reserved.</p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white hover:text-[#D4AF37] transition-colors">Back to Top</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
