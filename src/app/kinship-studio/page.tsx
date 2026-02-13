
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  Camera, 
  Maximize2, 
  Search, 
  Layers, 
  PenTool, 
  Cpu, 
  ShieldCheck, 
  Menu, 
  X, 
  Info,
  Clock,
  MapPin,
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FadeIn } from '../FadeIn';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";

// --- DATA ---

const PROJECTS = [
  {
    id: "hoxton",
    title: "The Hoxton Downtown",
    client: "Ennismore Design",
    category: "Hospitality",
    year: "2023",
    image: "https://picsum.photos/seed/hoxton/1200/1600",
    aspect: "aspect-[3/4]",
    exif: { cam: "Leica M11", lens: "35mm Summilux", iso: "400", aperture: "f/1.4", speed: "1/250" },
    challenge: "Capture the 'lived-in' luxury of a newly opened boutique hotel in DTLA.",
    approach: "Utilized available morning light to emphasize the velvet textures and aged brass details.",
    outcome: "Selected for the global launch campaign and featured in Wallpaper*."
  },
  {
    id: "aesop",
    title: "Aesop Silver Lake",
    client: "Aesop",
    category: "Retail",
    year: "2023",
    image: "https://picsum.photos/seed/aesop/1600/1200",
    aspect: "aspect-[4/3]",
    exif: { cam: "Phase One XF", lens: "80mm Schneider", iso: "100", aperture: "f/8", speed: "1/60" },
    challenge: "Document the material honesty of the new flagship store.",
    approach: "Focus on the raw plaster and reclaimed timber intersections with architectural precision.",
    outcome: "Used for the global PR toolkit and architectural archives."
  },
  {
    id: "editorial",
    title: "Inner Echo",
    client: "Kinship Studio",
    category: "Editorial",
    year: "2022",
    image: "https://picsum.photos/seed/echo/1200/1200",
    aspect: "aspect-square",
    exif: { cam: "Contax G2", lens: "45mm Planar", iso: "200", aperture: "f/2.8", speed: "1/500" },
    challenge: "Personal series exploring the relationship between human subjects and empty spaces.",
    approach: "Shot exclusively on 35mm film to capture natural grain and skin tones.",
    outcome: "Winner of APA Editorial Award 2023."
  },
  {
    id: "vogue",
    title: "Vogue Portraits",
    client: "Vogue US",
    category: "Portrait",
    year: "2023",
    image: "https://picsum.photos/seed/vogue/1200/1600",
    aspect: "aspect-[3/4]",
    exif: { cam: "Canon EOS R5", lens: "85mm f/1.2L", iso: "100", aperture: "f/1.2", speed: "1/1000" },
    challenge: "Create intimate portraits of emerging designers in their natural environments.",
    approach: "Shallow depth of field to isolate subjects within their cluttered workspaces.",
    outcome: "Published in the September 2023 print issue."
  }
];

const SERVICES = [
  { title: "Editorial Photography", desc: "Magazine features, fashion stories, and publishing work.", icon: Layers },
  { title: "Brand & Commercial", desc: "Product lifestyle, campaign imagery, and storytelling.", icon: Zap },
  { title: "Portrait Sessions", desc: "Environmental and studio portraits for individuals.", icon: PenTool },
  { title: "Interior Documentation", desc: "Architectural and design-led space photography.", icon: Globe }
];

// --- COMPONENTS ---

const FilmGrain = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04]">
    <svg className="w-full h-full">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

const PhotoLightbox = ({ project }: { project: typeof PROJECTS[0] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div 
          className={cn("relative group cursor-zoom-in overflow-hidden rounded-sm bg-zinc-900", project.aspect)}
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-[2s] group-hover:scale-110"
            data-ai-hint="photography portfolio"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">{project.category}</p>
            <h3 className="text-2xl font-serif italic text-white">{project.title}</h3>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-7xl bg-black border-none p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          <div className="lg:col-span-8 relative aspect-square lg:aspect-auto">
            <Image src={project.image} alt={project.title} fill className="object-contain" />
          </div>
          <div className="lg:col-span-4 p-8 md:p-12 flex flex-col justify-center bg-zinc-950 text-white">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A227]">// CASE_STUDY</span>
                <h2 className="text-4xl font-serif italic">{project.title}</h2>
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  <p>Client: {project.client}</p>
                  <p>Year: {project.year}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">The Challenge</p>
                  <p className="text-white/80 leading-relaxed italic font-serif">"{project.challenge}"</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">The Approach</p>
                  <p className="text-white/60 text-sm leading-relaxed">{project.approach}</p>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 space-y-6">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#C9A227]">
                  <Camera className="w-4 h-4" /> EXIF_DATA
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {Object.entries(project.exif).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-white/20">{key}</p>
                      <p className="text-xs font-mono">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid path"),
  vision: z.string().min(10, "Tell us more about the project"),
});

export default function KinshipStudioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", vision: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "Kinship Studio Portfolio Inquiry",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Vision Received", description: "Expect a response within 48 hours." });
    } catch (e) {
      toast({ variant: "destructive", title: "Transmission Failed", description: "Please email directly." });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#C9A227] selection:text-black font-sans antialiased overflow-x-hidden">
      <FilmGrain />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-50 h-20 px-6 md:px-12 flex items-center justify-between pointer-events-none">
        <Link href="/kinship-studio" className="font-bold text-xl tracking-tighter uppercase pointer-events-auto group">
          Kinship<span className="text-[#C9A227]">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 pointer-events-auto">
          <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Portfolio</button>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Studio</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2 border border-white/10 hover:border-[#C9A227] hover:text-white transition-all">Inquiry</button>
        </div>
        <button className="md:hidden pointer-events-auto" onClick={() => setIsMenuOpen(true)}>
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
            className="fixed inset-0 z-[110] bg-[#0A0A0A] p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-serif italic">
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>Work</button>
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>Studio</button>
              <button onClick={() => { setIsMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Inquiry</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO SECTION */}
        <section ref={heroRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
            <Image 
              src="https://picsum.photos/seed/kin-hero/1920/1080" 
              alt="Light play" 
              fill 
              className="object-cover brightness-50"
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
          </motion.div>
          
          <div className="relative z-10 text-center space-y-8 px-6">
            <FadeIn>
              <h1 className="text-6xl md:text-[140px] font-bold leading-[0.85] tracking-tighter uppercase mb-8">
                Spaces Told <br /> Through Light<span className="text-[#C9A227]">.</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/60 max-w-lg mx-auto font-serif italic">
                Boutique editorial photography specializing in spaces, subjects, and storytelling.
              </p>
            </FadeIn>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
            <span className="text-[8px] font-bold uppercase tracking-[0.5em] vertical-text">Discover</span>
            <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {/* 2. PORTFOLIO GRID (Masonry Feel) */}
        <section id="work" className="py-24 md:py-48 px-6 md:px-12 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-8 md:space-y-16">
                <FadeIn>
                  <div className="mb-24">
                    <p className="text-[#C9A227] font-bold uppercase text-[10px] tracking-[0.4em] mb-4">// SELECTED_MISSIONS</p>
                    <h2 className="text-4xl md:text-7xl font-serif italic">The Archives.</h2>
                  </div>
                </FadeIn>
                <PhotoLightbox project={PROJECTS[0]} />
                <PhotoLightbox project={PROJECTS[2]} />
              </div>
              <div className="space-y-8 md:space-y-16 md:pt-64">
                <PhotoLightbox project={PROJECTS[1]} />
                <PhotoLightbox project={PROJECTS[3]} />
                <div className="pt-12">
                  <FadeIn>
                    <p className="text-white/40 text-lg leading-relaxed font-serif italic max-w-sm">
                      "I capture not just how rooms look, but how they feel—creating images that invite you in."
                    </p>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT SECTION */}
        <section id="about" className="py-24 md:py-48 px-6 md:px-12 bg-zinc-950 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <FadeIn>
                <div className="space-y-12">
                  <p className="text-[#C9A227] font-bold uppercase text-[10px] tracking-[0.4em]">The Studio</p>
                  <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                    Truth Through <br /> Refinement.
                  </h2>
                  <div className="space-y-6 text-white/60 text-lg md:text-xl leading-relaxed font-serif italic">
                    <p>Kinship Studio is a boutique photography practice based in Los Angeles. Founded on the principle that authenticity is the highest form of luxury.</p>
                    <p>We work worldwide with architects, fashion houses, and individuals who value deliberate visual storytelling.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-8">
                    <div>
                      <p className="text-3xl font-bold">08</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Years Experience</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">120+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Commissions</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/5] overflow-hidden grayscale group transition-all duration-1000 hover:grayscale-0">
                  <Image src="https://picsum.photos/seed/photographer/800/1000" alt="Studio" fill className="object-cover transition-transform duration-[3s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-white font-bold text-xl uppercase tracking-tighter">Kinship HQ</p>
                    <p className="text-[#C9A227] font-bold uppercase text-[10px] tracking-widest">Los Angeles, CA</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. SERVICES */}
        <section className="py-24 md:py-48 px-6 md:px-12 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-4">
              <FadeIn>
                <p className="text-[#C9A227] font-bold uppercase text-[10px] tracking-[0.4em]">Capabilities</p>
                <h2 className="text-4xl md:text-7xl font-serif italic text-white">The Toolkit.</h2>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              {SERVICES.map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-12 bg-[#0A0A0A] h-full group hover:bg-zinc-950 transition-colors">
                    <s.icon className="w-10 h-10 text-[#C9A227] mb-8 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{s.title}</h3>
                    <p className="text-white/40 leading-relaxed text-sm">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PRESS MARQUEE */}
        <section className="py-24 bg-zinc-950 border-y border-white/5 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-24 opacity-20 hover:opacity-100 transition-opacity duration-500">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-4xl md:text-6xl font-bold uppercase tracking-[0.2em]">WALLPAPER*</span>
                <span className="text-4xl md:text-6xl font-serif italic tracking-[0.2em] text-[#C9A227]">ARCHITECTURAL DIGEST</span>
                <span className="text-4xl md:text-6xl font-bold uppercase tracking-[0.2em]">DWELL</span>
                <span className="text-4xl md:text-6xl font-serif italic tracking-[0.2em] text-[#C9A227]">DEZEEN</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="py-24 md:py-48 px-6 md:px-12 bg-[#0A0A0A] relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                <FadeIn>
                  <h2 className="text-5xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-8">
                    Let's Begin <br /> The Story<span className="text-[#C9A227]">.</span>
                  </h2>
                  <div className="space-y-8 pt-12 border-t border-white/5">
                    <div className="group cursor-pointer">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Electronic Mail</p>
                      <p className="text-2xl md:text-4xl font-bold hover:text-[#C9A227] transition-colors">hello@kinshipstudio.co</p>
                    </div>
                    <div className="group cursor-pointer">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Direct Line</p>
                      <p className="text-2xl md:text-4xl font-bold hover:text-[#C9A227] transition-colors">+1 213 555 0192</p>
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

              <div className="bg-zinc-950 p-8 md:p-16 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                {isSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                    <div className="w-20 h-20 rounded-full border border-[#C9A227] flex items-center justify-center">
                      <Zap className="w-8 h-8 text-[#C9A227]" />
                    </div>
                    <h3 className="text-3xl font-serif italic">Transmission Received.</h3>
                    <p className="text-white/40 text-sm">We'll reach out within 48 hours to discuss your vision.</p>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Identity</label>
                      <input {...form.register('name')} className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#C9A227] transition-colors font-bold text-xl" placeholder="Full Name" />
                      {form.formState.errors.name && <p className="text-red-500 text-[8px] uppercase">{form.formState.errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Return Path</label>
                      <input {...form.register('email')} className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#C9A227] transition-colors font-bold text-xl" placeholder="you@domain.com" />
                      {form.formState.errors.email && <p className="text-red-500 text-[8px] uppercase">{form.formState.errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">The Vision</label>
                      <textarea {...form.register('vision')} className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#C9A227] transition-colors font-bold text-xl h-32 resize-none" placeholder="Tell us about the space..." />
                      {form.formState.errors.vision && <p className="text-red-500 text-[8px] uppercase">{form.formState.errors.vision.message}</p>}
                    </div>
                    <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-white text-black hover:bg-[#C9A227] hover:text-white rounded-none py-10 uppercase text-xs font-bold tracking-widest transition-all">
                      {form.formState.isSubmitting ? "Transmitting..." : "Send Transmission"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12 md:py-24 px-6 md:px-12 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-bold text-2xl uppercase tracking-tighter">Kinship Studio<span className="text-[#C9A227]">.</span></h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">© 2024 Kinship Studio LLC. All Rights Reserved.</p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#C9A227] transition-colors">Back to Top</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
