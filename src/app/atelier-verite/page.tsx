
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { ChevronDown, MapPin, Clock, PenTool, Scissors, Layers, Sparkles, Star } from 'lucide-react';
import { Playfair_Display, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email path." }),
  interest: z.string().min(1, { message: "Selection required." }),
  message: z.string().optional(),
});

// --- Components ---

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <section className={cn("relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden", className)}>
    {children}
  </section>
);

const CinematicVideo = ({ src, poster }: { src: string, poster: string }) => (
  <div className="absolute inset-0 z-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover grayscale-[30%] brightness-50"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 via-transparent to-[#1a1a1a]" />
  </div>
);

const HorizontalScrollProcess = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const panels = [
    { id: 1, title: "Selection", desc: "We inspect 100 hides. We select 3.", img: "https://picsum.photos/seed/leather1/1200/800", icon: Layers },
    { id: 2, title: "Pattern", desc: "Patterns passed down from my grandfather.", img: "https://picsum.photos/seed/leather2/1200/800", icon: PenTool },
    { id: 3, title: "Cutting", desc: "Each piece cut by hand. No machines.", img: "https://picsum.photos/seed/leather3/1200/800", icon: Scissors },
    { id: 4, title: "Stitching", desc: "Saddle stitch: 2 needles, 1 thread, unbreakable.", img: "https://picsum.photos/seed/leather4/1200/800", icon: PenTool },
    { id: 5, title: "Finishing", desc: "The patina will tell your story.", img: "https://picsum.photos/seed/leather5/1200/800", icon: Sparkles },
  ];

  return (
    <div ref={targetRef} className="relative h-[500vh] bg-[#3D2817]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 px-12">
          {panels.map((panel) => (
            <div key={panel.id} className="group relative h-[80vh] w-[80vw] md:w-[40vw] flex-shrink-0 overflow-hidden rounded-sm">
              <Image 
                src={panel.img} 
                alt={panel.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%]"
                data-ai-hint="leather craft"
              />
              <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end">
                <panel.icon className="text-[#D4AF37] mb-4 h-8 w-8" />
                <h3 className="font-serif text-4xl text-white mb-2">{panel.title}</h3>
                <p className="text-gray-300 font-sans max-w-xs">{panel.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function AtelierVeritePage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  useEffect(() => {
    const handleScroll = () => setHeaderVisible(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", interest: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      subject: "Atelier Vérité Appointment Request",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Appointment Requested", description: "Our concierge will contact you within 24 hours." });
    } catch (e) {
      toast({ variant: "destructive", title: "Transmission Failed", description: "Please email directly: concierge@verite.com" });
    }
  };

  return (
    <div className={cn("min-h-screen bg-[#1a1a1a] text-[#F5F5DC] selection:bg-[#D4AF37] selection:text-black", playfair.variable, inter.variable)}>
      
      {/* --- MINIMAL NAVIGATION --- */}
      <AnimatePresence>
        {headerVisible && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 w-full z-[100] bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/5 h-20"
          >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
              <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.3em]">
                <a href="#collections" className="hover:text-[#D4AF37] transition-colors">Collections</a>
                <a href="#atelier" className="hover:text-[#D4AF37] transition-colors">Atelier</a>
              </div>
              <h1 className="font-serif text-2xl tracking-[0.2em] uppercase">Atelier Vérité</h1>
              <div className="flex items-center gap-8">
                <a href="#appointment" className="hidden md:block text-xs font-bold uppercase tracking-[0.3em] hover:text-[#D4AF37]">Contact</a>
                <Button onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-none px-6 uppercase text-[10px] tracking-widest">
                  Book Appointment
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO OPENING */}
        <Section className="h-screen flex items-center justify-center text-center px-6">
          <CinematicVideo 
            src="https://cdn.pixabay.com/vimeo/456143414/nature-49141.mp4?width=1280&hash=bc8f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f" 
            poster="https://picsum.photos/seed/verite-hero/1920/1080" 
          />
          <div className="relative z-10 space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="font-serif text-2xl md:text-4xl italic text-gray-300"
            >
              Every bag has a story.
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 1.5 }}
              className="font-serif text-5xl md:text-8xl tracking-widest uppercase text-white"
            >
              This is where <br/> it begins.
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* 2. THE TANNERY */}
        <Section className="bg-[#1a1a1a] py-32 px-6">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div 
                whileInView={{ scale: 1.1 }}
                transition={{ duration: 10, ease: "linear" }}
                className="h-full w-full"
              >
                <Image 
                  src="https://picsum.photos/seed/tuscany/1200/1500" 
                  alt="Tuscan Tannery" 
                  fill 
                  className="object-cover"
                  data-ai-hint="italy landscape"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="space-y-6"
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-bold">The Material</span>
                <h3 className="font-serif text-5xl md:text-7xl leading-tight">Vegetable-tanned leather. Tuscany, Italy.</h3>
                <p className="text-gray-400 text-lg md:text-xl font-sans leading-relaxed max-w-md">
                  Six months of patience. We source from the only tannery in Florence that still uses the traditional mimosa bark method. 
                </p>
              </motion.div>
              <div className="flex gap-12 pt-12 border-t border-white/10">
                <div>
                  <p className="text-[#D4AF37] font-serif text-4xl">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Organic Dye</p>
                </div>
                <div>
                  <p className="text-[#D4AF37] font-serif text-4xl">180</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Days Curing</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. THE CRAFTSMAN */}
        <Section className="h-[80vh] flex items-center justify-center">
          <CinematicVideo 
            src="https://cdn.pixabay.com/vimeo/209614144/hands-8211.mp4?width=1280&hash=bc8f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f" 
            poster="https://picsum.photos/seed/artisan/1920/1080" 
          />
          <div className="relative z-10 text-center space-y-6 max-w-3xl px-6">
            <h3 className="font-serif text-4xl md:text-6xl text-white italic">"The leather teaches you. <br/> You just have to listen."</h3>
            <div className="pt-8">
              <p className="font-serif text-2xl text-[#D4AF37]">Marco Vérité</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-2">Third-generation artisan • 47 years of practice</p>
            </div>
          </div>
        </Section>

        {/* 4. THE PROCESS (Horizontal Scroll) */}
        <div className="bg-[#3D2817] py-24 px-12">
          <div className="max-w-7xl mx-auto flex justify-between items-end mb-12">
            <h2 className="font-serif text-5xl md:text-7xl text-[#F5F5DC]">The Process</h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest hidden md:block pb-2">Swipe to journey →</p>
          </div>
        </div>
        <HorizontalScrollProcess />

        {/* 5. THE COLLECTIONS */}
        <Section id="collections" className="bg-[#1a1a1a] py-32 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-24 space-y-4">
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-bold">Catalogue</span>
              <h2 className="font-serif text-5xl md:text-7xl">The Collections</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { title: "Les Classiques", desc: "The bag you'll carry for 20 years.", price: "€2,400", img: "https://picsum.photos/seed/bag1/800/1000" },
                { title: "L'Édition Limitée", desc: "12 pieces. Never repeated.", price: "€3,800", img: "https://picsum.photos/seed/bag2/800/1000" },
                { title: "Sur Mesure", desc: "Your vision. Our craft.", price: "Price on request", img: "https://picsum.photos/seed/bag3/800/1000" },
                { title: "Petits Accessoires", desc: "Small goods. Same devotion.", price: "€450", img: "https://picsum.photos/seed/bag4/800/1000" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-8">
                    <Image 
                      src={item.img} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      data-ai-hint="luxury leather bag"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-3xl mb-2">{item.title}</h4>
                      <p className="text-gray-500 font-sans text-sm">{item.desc}</p>
                    </div>
                    <span className="text-[#D4AF37] font-serif text-lg">{item.price}</span>
                  </div>
                  <Button variant="link" className="text-[#D4AF37] p-0 uppercase text-[10px] tracking-widest mt-4 group-hover:pl-4 transition-all">
                    Explore →
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* 6. BESPOKE EXPERIENCE */}
        <Section className="bg-[#3D2817] py-32 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-16">
            <h2 className="font-serif text-5xl md:text-7xl italic">The Bespoke Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-[#D4AF37]/20 hidden md:block" />
              {[
                { step: "01", title: "Consultation", desc: "Discussing leather samples & vision." },
                { step: "02", title: "Design", desc: "Hand-drawn sketches on archival paper." },
                { step: "03", title: "Creation", desc: "80 hours of master handwork." },
                { step: "04", title: "Delivery", desc: "Final unboxing in Florence." },
              ].map((s, i) => (
                <div key={i} className="relative z-10 bg-[#3D2817] p-4">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center mx-auto mb-6 text-[#D4AF37] font-serif">
                    {s.step}
                  </div>
                  <h4 className="font-serif text-xl mb-2">{s.title}</h4>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 font-serif text-2xl italic pt-12">"4 months. 80 hours of handwork. 1 bag made just for you."</p>
          </div>
        </Section>

        {/* 7. PATINA STORIES */}
        <Section className="bg-[#1a1a1a] py-32 px-6 border-y border-white/5">
          <div className="container mx-auto">
            <h2 className="font-serif text-center text-5xl md:text-7xl mb-24">Built for Generations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: "New", year: "Day 1", img: "https://picsum.photos/seed/newbag/800/1000" },
                { label: "5 Years", year: "Developed Patina", img: "https://picsum.photos/seed/agedbag1/800/1000" },
                { label: "20 Years", year: "Family Heirloom", img: "https://picsum.photos/seed/agedbag2/800/1000" },
              ].map((stage, i) => (
                <div key={i} className="space-y-6">
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <Image src={stage.img} alt={stage.label} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" data-ai-hint="aged leather bag" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-serif text-2xl">{stage.label}</h4>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{stage.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 8. CLIENTELE (Anonymous) */}
        <Section className="bg-black py-32 px-6">
          <div className="max-w-4xl mx-auto space-y-24">
            {[
              { quote: "I bought this bag when I got my first job. I'm giving it to my daughter when she starts hers.", location: "Paris" },
              { quote: "The only bag I've carried for 15 years. It looks better now than when I bought it.", location: "New York" },
              { quote: "I have 47 bags. I use this one every day.", location: "Tokyo" },
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="text-center space-y-6"
              >
                <p className="font-serif text-3xl md:text-5xl italic text-gray-300 leading-relaxed">"{t.quote}"</p>
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]">— {t.location}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 9. THE INVITATION */}
        <Section id="appointment" className="bg-[#1a1a1a] py-32 px-6 relative">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://picsum.photos/seed/workbench/1920/1080" 
              alt="Workbench" 
              fill 
              className="object-cover brightness-[0.2]" 
              data-ai-hint="wood workbench"
            />
          </div>
          <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="font-serif text-6xl md:text-8xl">Atelier Vérité</h2>
                <p className="text-[#D4AF37] text-sm uppercase tracking-[0.4em]">Florence, Italy • Since 1947</p>
              </div>
              <div className="space-y-6 text-gray-400">
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-[#D4AF37]" />
                  <p>Via della Vigna Nuova, Florence</p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-[#D4AF37]" />
                  <p>Tuesday — Saturday, By Appointment Only</p>
                </div>
              </div>
              <div className="pt-12">
                <p className="text-gray-500 text-xs leading-relaxed">
                  atelier@verite-leather.com <br/>
                  +39 055 123 4567
                </p>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-12 space-y-8">
              <h3 className="font-serif text-3xl text-white">Request an Appointment</h3>
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Star className="text-[#D4AF37] h-12 w-12 mx-auto mb-6" />
                  <h4 className="font-serif text-2xl mb-2 text-white">Transmission Received</h4>
                  <p className="text-gray-400">Our concierge will contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Full Name</label>
                    <input {...form.register("name")} className="w-full bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                    {form.formState.errors.name && <p className="text-red-500 text-[10px]">{form.formState.errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Email Address</label>
                    <input {...form.register("email")} className="w-full bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                    {form.formState.errors.email && <p className="text-red-500 text-[10px]">{form.formState.errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Primary Interest</label>
                    <Select onValueChange={(val) => form.setValue("interest", val)}>
                      <SelectTrigger className="w-full bg-transparent border-none border-b border-white/20 p-2 text-white rounded-none h-10 focus:ring-0 focus:border-[#D4AF37] transition-colors">
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10 text-white rounded-none">
                        <SelectItem value="viewing">View Collection</SelectItem>
                        <SelectItem value="bespoke">Bespoke Consultation</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.interest && <p className="text-red-500 text-[10px]">{form.formState.errors.interest.message}</p>}
                  </div>
                  <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-[#D4AF37] hover:bg-[#B88A2D] text-black rounded-none h-14 uppercase text-xs tracking-[0.2em] font-bold mt-8">
                    {form.formState.isSubmitting ? "Requesting..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-12 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600">
          © 2025 Atelier Vérité • Crafted in Florence • All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
