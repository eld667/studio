"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  RotateCcw, 
  Maximize2, 
  Search, 
  Layers, 
  PenTool, 
  Cpu, 
  ShieldCheck, 
  Menu, 
  X, 
  Box,
  Ruler,
  FileText,
  Hammer,
  Recycle,
  Instagram,
  Twitter,
  Mail,
  Zap,
  Globe
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FadeIn } from '../FadeIn';

// --- DATA ---

const PROJECTS = [
  {
    id: "kin-chair",
    title: "Kin Chair",
    client: "Form & Field Originals",
    category: "Furniture",
    year: "2023",
    image: "https://picsum.photos/seed/kinchair/1200/1200",
    drawing: "https://picsum.photos/seed/kin-drawing/1200/1200",
    specs: [
      { label: "Material", val: "Oak / Recycled Poly" },
      { label: "Weight", val: "4.2kg" },
      { label: "Dimensions", val: "820 x 450 x 480mm" }
    ],
    challenge: "Create comfortable work-from-home seating that doesn't look 'office-y'.",
    approach: "Studied 50 remote workers, developed hidden lumbar support mechanism.",
    outcome: "Red Dot Award, 15,000 units sold year one."
  },
  {
    id: "grove-system",
    title: "Grove Kitchen",
    client: "Grove Collaborative",
    category: "Kitchen Tools",
    year: "2022",
    image: "https://picsum.photos/seed/grovekit/1200/1200",
    drawing: "https://picsum.photos/seed/grove-drawing/1200/1200",
    specs: [
      { label: "Material", val: "Ceramic / Bamboo" },
      { label: "Modular", val: "Yes (4 Parts)" },
      { label: "Dishwasher", val: "Safe" }
    ],
    challenge: "Design sustainable kitchen essentials for premium market.",
    approach: "Modular ceramic and bamboo system, designed for disassembly.",
    outcome: "Best-seller, 4.8/5 rating, Core77 Award."
  }
];

const MATERIALS = [
  { name: "Ash Wood", type: "Sustainable", color: "bg-[#E3D4B6]", img: "https://picsum.photos/seed/wood/400/400" },
  { name: "Terra Clay", type: "Organic", color: "bg-[#B85C38]", img: "https://picsum.photos/seed/clay/400/400" },
  { name: "Anodized Alum", type: "Precision", color: "bg-[#708090]", img: "https://picsum.photos/seed/metal/400/400" },
  { name: "Forest Bio-Resin", type: "Regenerative", color: "bg-[#228B22]", img: "https://picsum.photos/seed/resin/400/400" },
];

// --- COMPONENTS ---

const ProductExplorer = ({ project }: { project: typeof PROJECTS[0] }) => {
  const [showDrawing, setShowDrawing] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative w-full aspect-square md:aspect-video bg-white rounded-[2rem] border border-slate-200 overflow-hidden group">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f1_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f1_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      
      <div className="absolute top-8 left-8 z-10 space-y-4">
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Model_ID</p>
          <p className="text-xl font-bold uppercase tracking-tighter">{project.id}</p>
        </div>
        <button 
          onClick={() => setShowDrawing(!showDrawing)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all",
            showDrawing ? "bg-[#228B22] text-white border-[#228B22]" : "bg-white text-slate-900 border-slate-200 hover:border-slate-900"
          )}
        >
          <Ruler className="w-3 h-3" /> {showDrawing ? "View Render" : "Show Drawing"}
        </button>
      </div>

      <div className="absolute top-8 right-8 z-10 text-right space-y-6">
        {project.specs.map(spec => (
          <div key={spec.label} className="space-y-1">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{spec.label}</p>
            <p className="text-xs font-bold">{spec.val}</p>
          </div>
        ))}
      </div>

      <div className="relative w-full h-full flex items-center justify-center p-12 md:p-24">
        <motion.div 
          style={{ rotate: springRotate }}
          className="relative w-full h-full max-w-md max-h-md"
        >
          <AnimatePresence mode="wait">
            {!showDrawing ? (
              <motion.div
                key="render"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full h-full"
              >
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.1)]" 
                  data-ai-hint="product design"
                />
              </motion.div>
            ) : (
              <motion.div
                key="drawing"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full h-full"
              >
                <Image 
                  src={project.drawing} 
                  alt="Technical Drawing" 
                  fill 
                  className="object-contain grayscale invert contrast-125" 
                  data-ai-hint="technical drawing"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur px-6 py-3 rounded-full border border-slate-100 shadow-lg text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <RotateCcw className="w-3 h-3 animate-spin-slow" /> Scroll to Rotate 360°
      </div>
    </div>
  );
};

export default function FormAndFieldPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF0E6] text-slate-900 font-sans selection:bg-[#228B22] selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-50 h-20 px-6 md:px-12 flex items-center justify-between border-b border-slate-200/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#228B22] rounded flex items-center justify-center text-[#FAF0E6] font-bold text-lg">F</div>
          <span className="text-xl font-bold tracking-tighter uppercase">Form & Field</span>
        </div>

        <div className="hidden md:flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Portfolio</button>
          <button onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Process</button>
          <button onClick={() => document.getElementById('materials')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Materials</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2 border border-slate-200 hover:border-[#228B22] hover:text-[#228B22] transition-all rounded">Inquiry</button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            className="fixed inset-0 z-[100] bg-[#FAF0E6] p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-bold uppercase tracking-tighter">
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left">Work</button>
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left">Process</button>
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('materials')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left">Materials</button>
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO SECTION */}
        <section className="h-screen flex items-center px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] opacity-50" />
          
          <div className="container relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
            <div className="space-y-8">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#228B22]/10 text-[#228B22] text-[10px] font-bold uppercase tracking-widest border border-[#228B22]/20">
                  <Box className="w-3 h-3" /> Industrial Design Studio
                </div>
                <h1 className="text-6xl md:text-[140px] font-bold leading-[0.85] tracking-tighter uppercase mb-8">
                  Form <br /> & Field<span className="text-[#228B22]">.</span>
                </h1>
                <p className="text-xl md:text-3xl text-slate-500 max-w-lg leading-relaxed font-serif italic">
                  Thoughtful products for the home, workplace, and everywhere between.
                </p>
                <div className="flex items-center gap-8 pt-8">
                  <Button size="lg" className="bg-[#228B22] hover:bg-[#1a6b1a] text-white rounded-none px-12 py-8 uppercase text-xs tracking-[0.3em] font-bold">
                    Explore Work
                  </Button>
                  <div className="hidden md:flex flex-col">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> Available Q2 2024
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="relative aspect-square">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full"
              >
                <Image 
                  src="https://picsum.photos/seed/hero-chair/1000/1000" 
                  alt="Featured Product" 
                  fill 
                  className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.1)]" 
                  priority 
                  data-ai-hint="rotating chair"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#FAF0E6_70%)] pointer-events-none" />
            </FadeIn>
          </div>

          <div className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4 opacity-40">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] vertical-text">Scroll to Begin</span>
            <div className="w-px h-16 bg-slate-900" />
          </div>
        </section>

        {/* 2. SELECTED WORK (Product Explorer) */}
        <section id="projects" className="py-24 md:py-48 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto space-y-32 md:space-y-64">
            {PROJECTS.map((project, i) => (
              <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
                <div className="lg:col-span-5 space-y-12">
                  <FadeIn>
                    <div className="flex items-center gap-4 text-[#228B22] font-bold uppercase text-[10px] tracking-[0.4em]">
                      <span>0{i + 1}</span>
                      <div className="w-12 h-px bg-[#228B22]/30" />
                      <span>{project.category}</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mt-6 mb-8">{project.title}</h2>
                    <div className="space-y-8 text-slate-500 text-lg leading-relaxed">
                      <div className="space-y-2">
                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Challenge</p>
                        <p className="font-serif italic text-xl text-slate-900">"{project.challenge}"</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Approach</p>
                        <p>{project.approach}</p>
                      </div>
                      <div className="flex gap-12 pt-8 border-t border-slate-100">
                        <div>
                          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Impact</p>
                          <p className="text-xl font-bold text-slate-900">{project.outcome.split(',')[0]}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Award</p>
                          <p className="text-xl font-bold text-[#B85C38]">{project.outcome.split(',')[1] || "Core77 Selection"}</p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
                
                <div className="lg:col-span-7">
                  <FadeIn delay={0.2}>
                    <ProductExplorer project={project} />
                  </FadeIn>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. MATERIAL EXPLORER */}
        <section id="materials" className="py-24 md:py-48 px-6 md:px-12 bg-[#FAF0E6]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-24 border-b border-slate-200 pb-12">
              <FadeIn>
                <p className="text-[#228B22] font-bold uppercase text-[10px] tracking-[0.4em] mb-4">// MATERIALITY</p>
                <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter italic">Honest Matter.</h2>
              </FadeIn>
              <div className="hidden md:flex gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                <Recycle className="w-4 h-4" /> 100% Sourcing Transparency
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
              {MATERIALS.map((m, i) => (
                <FadeIn key={m.name} delay={i * 0.1}>
                  <div className="bg-[#FAF0E6] p-12 space-y-12 group cursor-crosshair hover:bg-white transition-colors duration-500">
                    <div className="relative aspect-square overflow-hidden rounded-full">
                      <Image 
                        src={m.img} 
                        alt={m.name} 
                        fill 
                        className="object-cover transition-transform duration-[2s] group-hover:scale-125" 
                        data-ai-hint="material texture"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold uppercase tracking-tight">{m.name}</h3>
                        <div className={cn("w-4 h-4 rounded-full", m.color)} />
                      </div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{m.type}</p>
                      <p className="text-sm text-slate-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Sourced locally from Pacific Northwest forests and artisans.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROCESS TIMELINE */}
        <section id="process" className="py-24 md:py-48 px-6 md:px-12 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-32 space-y-4">
              <FadeIn>
                <p className="text-[#228B22] font-bold uppercase text-[10px] tracking-[0.4em]">The Methodology</p>
                <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter italic">Linear Precision.</h2>
              </FadeIn>
            </div>

            <div className="space-y-24 md:space-y-48 relative before:absolute before:left-6 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
              {[
                { step: "01", title: "Observe", icon: Search, desc: "We spend weeks in the field, documenting human behavior and latent needs." },
                { step: "02", title: "Synthesize", icon: PenTool, desc: "Sketches and foam models allow us to explore form without constraints." },
                { step: "03", title: "Engineer", icon: Cpu, desc: "Moving into CAD to define mechanisms, tolerances, and part counts." },
                { step: "04", title: "Validate", icon: ShieldCheck, desc: "Functional prototypes are tested by real users in real environments." },
                { step: "05", title: "Produce", icon: Hammer, desc: "Working directly with manufacturers to ensure the highest fidelity." }
              ].map((item, i) => (
                <FadeIn key={item.step} delay={0.1}>
                  <div className={cn("relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24", i % 2 !== 0 ? "md:flex-row-reverse" : "")}>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-2 border-[#228B22] rounded-full z-10" />
                    
                    <div className={cn("w-full md:w-1/2 pl-16 md:pl-0", i % 2 === 0 ? "md:text-right" : "")}>
                      <span className="text-6xl md:text-9xl font-black text-white/5 absolute top-0 right-0 md:relative md:block">{item.step}</span>
                      <div className={cn("flex items-center gap-4 mb-4", i % 2 === 0 ? "md:justify-end" : "")}>
                        <item.icon className="w-6 h-6 text-[#228B22]" />
                        <h3 className="text-3xl font-bold uppercase tracking-tight">{item.title}</h3>
                      </div>
                      <p className="text-slate-400 text-lg max-w-sm md:ml-auto md:mr-0">{item.desc}</p>
                    </div>
                    
                    <div className="hidden md:block w-1/2">
                      <div className="relative aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                        <Image 
                          src={`https://picsum.photos/seed/process-${i}/800/400`} 
                          alt="Process Documentation" 
                          fill 
                          className="object-cover opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700" 
                          data-ai-hint="workshop photo"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CONTACT / INQUIRY */}
        <section id="contact" className="py-24 md:py-48 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                <FadeIn>
                  <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                    Start <br /> The Brief<span className="text-[#228B22]">.</span>
                  </h2>
                  <div className="space-y-8 pt-12">
                    <div className="group cursor-pointer">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Email</p>
                      <p className="text-2xl md:text-4xl font-bold hover:text-[#228B22] transition-colors">hello@formandfield.co</p>
                    </div>
                    <div className="group cursor-pointer">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Studio</p>
                      <p className="text-2xl md:text-4xl font-bold hover:text-[#228B22] transition-colors">Portland, Oregon</p>
                    </div>
                  </div>
                  <div className="flex gap-6 pt-12">
                    <Link href="#" className="w-12 h-12 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                      <Instagram className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="w-12 h-12 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                      <Twitter className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="w-12 h-12 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </Link>
                  </div>
                </FadeIn>
              </div>

              <div className="bg-[#FAF0E6] p-8 md:p-16 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#228B22]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <form className="space-y-10 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Name</label>
                    <input className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-[#228B22] transition-colors font-bold text-xl" placeholder="Full Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Email</label>
                    <input className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-[#228B22] transition-colors font-bold text-xl" placeholder="you@domain.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Inquiry Type</label>
                    <select className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-[#228B22] transition-colors font-bold text-xl appearance-none cursor-pointer">
                      <option>New Product Brief</option>
                      <option>Manufacturing Consult</option>
                      <option>Press Inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Context</label>
                    <textarea className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-[#228B22] transition-colors font-bold text-xl h-32 resize-none" placeholder="The mission is..." />
                  </div>
                  <Button className="w-full bg-[#228B22] hover:bg-[#1a6b1a] text-white rounded-none py-10 uppercase text-xs font-bold tracking-widest transition-all">
                    Send Transmission
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-12 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-bold text-2xl uppercase tracking-tighter">Form & Field<span className="text-[#228B22]">.</span></h3>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">© 2024 Form & Field Studio. All Rights Reserved.</p>
          </div>
          <div className="flex gap-12 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms</Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#228B22] transition-colors">Top</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
