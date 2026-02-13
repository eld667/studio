
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, Pause, ChevronRight, ArrowUpRight, Instagram, Twitter, Mail, Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// --- DATA ---

const PROJECTS = [
  {
    id: "patagonia",
    title: "The Fishermen",
    client: "Patagonia",
    category: "Documentary",
    image: "https://picsum.photos/seed/fishing/1920/1080",
    challenge: "Show ocean conservation through local fishermen's eyes.",
    approach: "12-month embed with Cornish fishing community, no script, let story emerge naturally.",
    outcome: "5M+ views, festival circuit, direct policy impact in Cornwall.",
    role: "Production & Direction",
    year: "2023"
  },
  {
    id: "nike",
    title: "Next Nature",
    client: "Nike",
    category: "Brand Film",
    image: "https://picsum.photos/seed/shoes/1920/1080",
    challenge: "Launch sustainable shoe line to skeptical audience.",
    approach: "Transparency-first showing actual manufacturing process, authentic employee voices.",
    outcome: "Sold out launch, 40% above sales targets, most-shared brand content.",
    role: "Direction",
    year: "2023"
  },
  {
    id: "luxury",
    title: "A Study in Light",
    client: "Vogue",
    category: "Commercial",
    image: "https://picsum.photos/seed/vogue/1920/1080",
    challenge: "Reimagine high-fashion cinematography for digital first.",
    approach: "Experimental lighting setups and 35mm film capture.",
    outcome: "Winner of 'Best Cinematography' at Fashion Film Awards.",
    role: "Full Production",
    year: "2022"
  }
];

const SERVICES = [
  { title: "Brand Films", desc: "Documentary-style brand storytelling and campaigns." },
  { title: "Commercials", desc: "Broadcast and digital advertising campaigns." },
  { title: "Documentary", desc: "Short and feature-length nonfiction storytelling." },
  { title: "Motion Content", desc: "Social-first video series and digital content." }
];

// --- COMPONENTS ---

const FilmGrain = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]">
    <svg className="w-full h-full">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 md:mb-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
        {subtitle || "// SELECTED"}
      </span>
      <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
        {title}
      </h2>
    </motion.div>
  </div>
);

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative w-full aspect-video md:aspect-[16/9] overflow-hidden bg-zinc-900 cursor-pointer"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
          
          <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex items-end justify-between"
              >
                <div>
                  <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/60 mb-2">
                    {project.client} / {project.category}
                  </p>
                  <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white">
                    {project.title}
                  </h3>
                </div>
                <div className="hidden md:flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  View Detail <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:max-w-[100vw] md:max-w-3xl bg-black border-l border-white/10 p-0 overflow-y-auto">
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          
          <div className="p-8 md:p-16 space-y-16 pb-32">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Client</p>
                <p className="text-white font-bold">{project.client}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Year</p>
                <p className="text-white font-bold">{project.year}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Role</p>
                <p className="text-white font-bold">{project.role}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Awards</p>
                <p className="text-white font-bold">Cannes Lions</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{project.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-400 leading-relaxed">
                <div className="space-y-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#DC143C]">01_The Challenge</p>
                  <p className="text-lg">{project.challenge}</p>
                </div>
                <div className="space-y-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#DC143C]">02_The Approach</p>
                  <p className="text-lg">{project.approach}</p>
                </div>
              </div>
            </div>

            <div className="p-12 bg-zinc-900/50 border border-white/5 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6">Outcome & Impact</p>
              <p className="text-3xl md:text-5xl font-black italic text-[#FFBF00] mb-4">"{project.outcome}"</p>
              <p className="text-zinc-500 text-sm italic">— Production Note v1.4</p>
            </div>

            <div className="flex justify-center pt-8">
              <Button size="lg" className="bg-[#DC143C] hover:bg-[#b01032] text-white rounded-none px-12 py-8 uppercase text-xs tracking-widest font-black">
                Play Reel
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default function MomentumFilmsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#DC143C] selection:text-white font-sans overflow-x-hidden">
      <FilmGrain />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="w-24 h-1 bg-[#DC143C] mb-4 mx-auto" />
              <h1 className="text-xl font-mono uppercase tracking-[0.5em] text-white">Momentum</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVIGATION --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2 }}
        className="fixed top-0 left-0 w-full z-50 h-20 px-6 md:px-12 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none border-b border-white/5"
      >
        <Link href="/momentum-films" className="font-black text-2xl uppercase tracking-tighter group">
          Momentum<span className="text-[#DC143C]">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
          <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Work</button>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About</button>
          <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Capabilities</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2 border border-white/20 hover:border-[#DC143C] hover:text-white transition-all">Contact</button>
        </div>
        <button className="md:hidden"><Menu className="w-6 h-6" /></button>
      </motion.nav>

      {/* --- HERO --- */}
      <section className="relative h-screen flex items-center px-6 md:px-12 overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/cinema/1920/1080" 
            alt="Cinematic Hero" 
            fill 
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </motion.div>

        <div className="container relative z-10 mx-auto">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.2 }}
            >
              <h1 className="text-6xl md:text-[120px] font-black uppercase leading-[0.85] tracking-tighter mb-8">
                Stories Worth <br /> Watching<span className="text-[#DC143C]">.</span>
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                <p className="text-xl md:text-2xl text-zinc-400 max-w-lg leading-relaxed italic">
                  We create films that earn their place. Brand films that move, documentaries that breathe.
                </p>
                <Button 
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-fit bg-[#DC143C] hover:bg-[#b01032] text-white rounded-none px-12 py-8 uppercase text-xs tracking-[0.3em] font-black"
                >
                  View Work
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-zinc-500">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </section>

      {/* --- WORK --- */}
      <section id="work" className="py-24 md:py-48 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Selected Work" subtitle="//_CATALOG_2024" />
          <div className="grid grid-cols-1 gap-12 md:gap-32">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-24 md:py-48 px-6 md:px-12 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeIn>
              <div className="space-y-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#DC143C]">//_PHILOSOPHY</p>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  Craft Matters More Than Ever.
                </h2>
                <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed">
                  <p>Momentum Films is a commercial production company led by directors James & Anna Morrison. We believe every frame should earn its place in a world of endless noise.</p>
                  <p>Our focus is on brand films that don't feel like ads, and documentaries that capture the visceral reality of the human experience.</p>
                </div>
                <div className="flex gap-8 pt-8">
                  <div>
                    <p className="text-3xl font-black">15+</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black">50M+</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Total Views</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black">12</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Industry Awards</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden grayscale group transition-all duration-700 hover:grayscale-0">
                <Image src="https://picsum.photos/seed/director/800/1000" alt="Directors" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white font-black text-xl uppercase tracking-tighter">James & Anna Morrison</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#DC143C]">Founding Directors</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-24 md:py-48 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Capabilities" subtitle="//_SYSTEMS" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-10 bg-zinc-900 border border-white/5 h-full group hover:border-[#DC143C]/50 transition-all duration-500 hover:-translate-y-2">
                  <span className="font-mono text-[10px] text-zinc-600 mb-8 block">0{i+1}</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-[#DC143C] transition-colors">{s.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRESS --- */}
      <section className="py-24 bg-zinc-950 border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-24 opacity-20">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em]">CANNES LIONS</span>
              <span className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-[#DC143C]">BAFTA</span>
              <span className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em]">D&AD</span>
              <span className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-[#DC143C]">CREATIVE REVIEW</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 md:py-48 px-6 md:px-12 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <FadeIn>
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                  Let's Roll<span className="text-[#DC143C]">.</span>
                </h2>
                <div className="space-y-6">
                  <div className="group cursor-pointer">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Email</p>
                    <p className="text-2xl md:text-4xl font-bold group-hover:text-[#DC143C] transition-colors">hello@momentum-films.co.uk</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Location</p>
                    <p className="text-2xl md:text-4xl font-bold group-hover:text-[#DC143C] transition-colors">London / Los Angeles</p>
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

            <div className="bg-zinc-950 p-8 md:p-12 border border-white/5">
              <form className="space-y-8">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#DC143C] transition-colors font-bold text-xl" placeholder="John Wick" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Email Address</label>
                  <input className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#DC143C] transition-colors font-bold text-xl" placeholder="wick@continental.com" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Project Type</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#DC143C] transition-colors font-bold text-xl appearance-none">
                    <option>Commercial</option>
                    <option>Documentary</option>
                    <option>Brand Film</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Message</label>
                  <textarea className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#DC143C] transition-colors font-bold text-xl h-32 resize-none" placeholder="The mission is..." />
                </div>
                <Button className="w-full bg-[#DC143C] hover:bg-[#b01032] text-white rounded-none py-10 uppercase text-xs tracking-widest font-black transition-all">
                  Send Transmission
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 md:py-24 px-6 md:px-12 bg-black border-t border-white/5 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4">
            <h3 className="font-black text-2xl uppercase tracking-tighter">Momentum Films<span className="text-[#DC143C]">.</span></h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">© 2024 MOMENTUM FILMS LTD. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 hover:text-[#DC143C] transition-colors">
              Back to Top <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
