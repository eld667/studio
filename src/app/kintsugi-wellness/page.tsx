
"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowDown, 
  Leaf, 
  Wind, 
  Droplets, 
  CloudSnow, 
  ChevronRight, 
  Check, 
  Send,
  MapPin,
  Clock,
  Menu,
  X,
  Star,
  Quote
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FadeIn } from '@/app/FadeIn';

// --- SCHEMAS ---
const bookingSchema = z.object({
  name: z.string().min(1, "Your name is required"),
  email: z.string().email("A valid email is required"),
  season: z.string().min(1, "Please select a season"),
  reason: z.string().min(10, "Tell us a bit more about your journey"),
  accommodation: z.string().optional(),
});

// --- TYPES ---
type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonData {
  id: Season;
  kanji: string;
  name: string;
  english: string;
  months: string;
  tagline: string;
  description: string;
  offerings: string[];
  color: string;
  accent: string;
  bg: string;
  image: string;
}

const SEASONS: Record<Season, SeasonData> = {
  spring: {
    id: 'spring',
    kanji: '春',
    name: 'HARU',
    english: 'Spring',
    months: 'March — May',
    tagline: 'The Season of Renewal',
    description: 'Awaken from stillness. Witness the blooming of cherry blossoms and the rebirth of the self.',
    offerings: ['Blossom Meditation', 'Cleansing Detox', 'New Beginnings Ceremony', 'Tea Rituals'],
    color: '#FFB7C5',
    accent: '#8FBC8F',
    bg: 'bg-[#FFF5F7]',
    image: 'https://picsum.photos/seed/k-spring/1200/800'
  },
  summer: {
    id: 'summer',
    kanji: '夏',
    name: 'NATSU',
    english: 'Summer',
    months: 'June — August',
    tagline: 'The Season of Vitality',
    description: 'Connect with the vibrant energy of bamboo forests and the cool flow of ancient mountain streams.',
    offerings: ['Forest Bathing', 'Stream Meditation', 'Sunrise Yoga', 'Kaiseki Cooling'],
    color: '#7BA05B',
    accent: '#87CEEB',
    bg: 'bg-[#F7FFF5]',
    image: 'https://picsum.photos/seed/k-summer/1200/800'
  },
  autumn: {
    id: 'autumn',
    kanji: '秋',
    name: 'AKI',
    english: 'Autumn',
    months: 'September — November',
    tagline: 'The Season of Reflection',
    description: 'A time for gratitude and gathering. Watch the maple leaves turn as you look inward.',
    offerings: ['Moon Viewing', 'Harvest Gratitude', 'Hot Spring Immersion', 'Writing Retreat'],
    color: '#C41E3A',
    accent: '#FFBF00',
    bg: 'bg-[#FFF9F5]',
    image: 'https://picsum.photos/seed/k-autumn/1200/800'
  },
  winter: {
    id: 'winter',
    kanji: '冬',
    name: 'FUYU',
    english: 'Winter',
    months: 'December — February',
    tagline: 'The Season of Stillness',
    description: 'Find profound peace in the silence of snow. A deep descent into healing and inner truth.',
    offerings: ['Snow Meditation', 'Onsen Deep Healing', 'Silent Retreat', 'Inner Transformation'],
    color: '#1C1C1C',
    accent: '#E5E4E2',
    bg: 'bg-[#F9F9FB]',
    image: 'https://picsum.photos/seed/k-winter/1200/800'
  }
};

// --- COMPONENTS ---

const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={cn("relative py-24 px-6 md:px-12 overflow-hidden", className)}>
    {children}
  </section>
);

const RadialPracticeMenu = ({ activeColor }: { activeColor: string }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  
  const practices = [
    { icon: '🧘', label: 'Meditation', desc: 'Zazen and sound healing' },
    { icon: '🌿', label: 'Forest Therapy', desc: 'Certified Shinrin-yoku' },
    { icon: '💧', label: 'Onsen', desc: 'Mineral spring healing' },
    { icon: '🍵', label: 'Tea Ceremony', desc: 'Mindful matcha ritual' },
    { icon: '🥢', label: 'Kaiseki', desc: 'Seasonal mindful cuisine' },
    { icon: '💆', label: 'Body Work', desc: 'Shiatsu and acupuncture' },
    { icon: '🌸', label: 'Ceremony', desc: 'Seasonal celebrations' },
  ];

  return (
    <div className="relative w-full max-w-2xl aspect-square mx-auto flex items-center justify-center">
      <div className="absolute inset-0 border border-slate-200 rounded-full opacity-20" />
      <div className="z-10 text-center">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">The Circle of</h3>
        <p className="text-4xl font-serif italic text-slate-800">Healing</p>
      </div>

      {practices.map((p, i) => {
        const angle = (i / practices.length) * (2 * Math.PI);
        const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 220;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            className="absolute cursor-pointer group"
            style={{ x, y }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.1 }}
          >
            <div 
              className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl md:text-3xl border border-slate-100 transition-all duration-500"
              style={{ borderColor: hovered === i ? activeColor : 'transparent' }}
            >
              {p.icon}
            </div>
            <AnimatePresence>
              {hovered === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 text-center"
                >
                  <p className="font-bold text-slate-800 text-sm uppercase tracking-widest">{p.label}</p>
                  <p className="text-slate-500 text-xs mt-1">{p.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function KintsugiWellnessPage() {
  const [selectedSeason, setSelectedSeason] = useState<Season>('spring');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const theme = SEASONS[selectedSeason];

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "", season: selectedSeason, reason: "", accommodation: "" },
  });

  useEffect(() => {
    form.setValue('season', theme.english);
  }, [selectedSeason, theme.english, form]);

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "Kintsugi Wellness Inquiry",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Inquiry Received", description: "Our curator will reach out within 48 hours." });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Submission failed. Please try again." });
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-1000 ease-in-out font-sans selection:bg-slate-200", theme.bg)}>
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
          <span className="text-3xl font-serif text-slate-800">継</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.2em] text-slate-800 uppercase leading-none">Kintsugi</span>
            <span className="text-[10px] font-medium tracking-[0.3em] text-slate-400 uppercase mt-1">Wellness</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12">
          <button onClick={() => scrollTo('philosophy')} className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-800 transition-colors">Philosophy</button>
          <button onClick={() => scrollTo('seasons')} className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-800 transition-colors">Seasons</button>
          <button onClick={() => scrollTo('stay')} className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-800 transition-colors">Stay</button>
          <button onClick={() => scrollTo('contact')} className="px-8 py-3 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-slate-700 transition-all">Begin Journey</button>
        </div>

        <button className="lg:hidden text-slate-800" onClick={() => setIsMenuOpen(true)}>
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
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-slate-800" /></button>
            </div>
            <div className="flex flex-col gap-8 text-2xl font-serif italic text-slate-800">
              <button onClick={() => scrollTo('philosophy')} className="text-left">Philosophy</button>
              <button onClick={() => scrollTo('seasons')} className="text-left">Seasons</button>
              <button onClick={() => scrollTo('stay')} className="text-left">Stay</button>
              <button onClick={() => scrollTo('contact')} className="text-left">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO (The Gate) */}
        <section id="hero" className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop" 
              alt="Japanese Zen Garden" 
              fill 
              className="object-cover opacity-40 grayscale-[20%]"
              data-ai-hint="zen garden"
            />
          </div>
          <div className="relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              <span className="text-6xl md:text-8xl text-white/20 block mb-4">「金継ぎ」</span>
              <h1 className="text-4xl md:text-7xl font-serif italic text-white tracking-widest uppercase">Kintsugi Wellness</h1>
              <p className="text-sm md:text-lg font-bold tracking-[0.5em] text-white/60 uppercase mt-4">Kyoto, Japan</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <ArrowDown className="w-6 h-6 text-white/40 animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* 2. THE PHILOSOPHY */}
        <Section id="philosophy" className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeIn>
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1615486511484-92e172cc4ee0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Kintsugi Art" 
                  fill 
                  className="object-cover"
                  data-ai-hint="kintsugi bowl"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </FadeIn>
            <div className="space-y-12">
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <p className="font-serif text-3xl md:text-5xl text-slate-800 leading-tight">
                    "Made more beautiful for having been broken."
                  </p>
                  <div className="w-24 h-px bg-slate-200" />
                  <div className="space-y-4 text-slate-500 leading-relaxed font-serif italic text-lg md:text-xl">
                    <p>In Japan, there is an art of repairing broken pottery with gold lacquer.</p>
                    <p>The break is not hidden. It is illuminated.</p>
                    <p>Made more beautiful for having been broken.</p>
                    <p>This is Kintsugi. This is our approach to wellness.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Section>

        {/* 3. SEASON SELECTOR (The Transformation) */}
        <Section id="seasons" className="bg-white/40 backdrop-blur-sm">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400 mb-4">The Seasons of</h2>
              <p className="text-4xl md:text-6xl font-serif italic text-slate-800">Transformation</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[70vh]">
            {(Object.values(SEASONS) as SeasonData[]).map((s) => (
              <motion.div
                key={s.id}
                onClick={() => setSelectedSeason(s.id)}
                className={cn(
                  "relative h-80 md:h-full overflow-hidden cursor-pointer group transition-all duration-1000 ease-in-out rounded-[2rem]",
                  selectedSeason === s.id ? "md:col-span-2 ring-2 ring-slate-200 ring-offset-8" : "md:col-span-1 opacity-60 hover:opacity-100"
                )}
              >
                <Image src={s.image} alt={s.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-5xl font-serif text-white/40">{s.kanji}</span>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/80 uppercase">{s.months}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-serif italic text-white mb-2">{s.name}</h3>
                    <p className="text-xs font-bold tracking-widest text-white/60 uppercase">{s.tagline}</p>
                    
                    <AnimatePresence>
                      {selectedSeason === s.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-white/20"
                        >
                          <p className="text-sm text-white/80 leading-relaxed mb-6">{s.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {s.offerings.map((o, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest">
                                <Check className="w-3 h-3 text-white/60" /> {o}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 4. ACCOMMODATIONS */}
        <Section id="stay" className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400 mb-4">Sanctuaries of</h2>
              <p className="text-4xl md:text-6xl font-serif italic text-slate-800">Rest</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "The Ryokan Suite", price: "¥85,000", img: "https://picsum.photos/seed/k-room1/800/1000", desc: "Traditional tatami elegance with private moss garden access." },
              { title: "The Onsen Villa", price: "¥150,000", img: "https://picsum.photos/seed/k-room2/800/1000", desc: "Private outdoor mineral pool with panoramic mountain views." },
              { title: "The Tea House", price: "¥120,000", img: "https://picsum.photos/seed/k-room3/800/1000", desc: "An intimate cedar pavilion for profound silence and ritual." },
              { title: "The Sanctuary", price: "¥200,000", img: "https://picsum.photos/seed/k-room4/800/1000", desc: "Modern architectural marvel suspended above the Kyoto mist." }
            ].map((room, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] mb-8 shadow-xl transition-all duration-700 group-hover:shadow-2xl">
                    <Image src={room.img} alt={room.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" data-ai-hint="japanese room" />
                    <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
                      <span className="text-xs font-bold text-slate-800">From {room.price}</span>
                    </div>
                  </div>
                  <div className="px-4">
                    <h4 className="text-2xl font-serif italic text-slate-800 mb-2">{room.title}</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-md">{room.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* 5. HEALING PRACTICES */}
        <Section className="bg-white/20">
          <FadeIn>
            <RadialPracticeMenu activeColor={theme.color} />
          </FadeIn>
        </Section>

        {/* 6. A DAY AT KINTSUGI */}
        <Section className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400 mb-4">The Rhythm of</h2>
              <p className="text-4xl md:text-6xl font-serif italic text-slate-800">Renewal</p>
            </FadeIn>
          </div>

          <div className="space-y-12 relative before:absolute before:left-[1.5rem] md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-slate-200">
            {[
              { time: "05:30", act: "Dawn Meditation", desc: "Zazen in the misty garden as the world awakens." },
              { time: "09:00", act: "Forest Therapy", desc: "Guided Shinrin-yoku through the ancient cedar groves." },
              { time: "14:00", act: "Tea Ceremony", desc: "A 15th-generation master guides you through the Way of Tea." },
              { time: "18:30", act: "Seasonal Kaiseki", desc: "Artful, multicourse mindful dining honoring the season." },
              { time: "21:00", act: "Onsen Deep Healing", desc: "Mineral immersion under the Kyoto stars." }
            ].map((slot, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={cn("relative flex flex-col md:flex-row items-start md:items-center gap-12", i % 2 !== 0 ? "md:flex-row-reverse" : "")}>
                  <div className="absolute left-[1.5rem] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-800 z-10 border-4 border-white shadow-lg" />
                  <div className={cn("w-full md:w-1/2 pl-12 md:pl-0", i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12")}>
                    <span className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">{slot.time}</span>
                    <h4 className="text-xl md:text-2xl font-serif italic text-slate-800 mt-2">{slot.act}</h4>
                    <p className="text-slate-500 text-sm mt-2">{slot.desc}</p>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* 7. THE TEAM */}
        <Section className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-white/40 mb-4">Your Curators of</h2>
                <p className="text-4xl md:text-6xl font-serif italic text-white">Healing</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { name: "Kenji Yamamoto", role: "Head of Meditation", bio: "Former monk, 20 years practice. Finding truth in silence." },
                { name: "Yuki Tanaka", role: "Forest Therapy Guide", bio: "Certified practitioner of the forest path." },
                { name: "Akiko Sato", role: "Tea Master", bio: "15th-generation tea family. Mastery of the moment." },
                { name: "Dr. Hiroshi Nakamura", role: "Traditional Medicine", bio: "Doctor of Kampo and the bodies natural rhythm." }
              ].map((member, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="space-y-6 group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] grayscale transition-all duration-700 group-hover:grayscale-0">
                      <Image src={`https://picsum.photos/seed/k-team${i}/600/800`} alt={member.name} fill className="object-cover" data-ai-hint="portrait" />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif italic">{member.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1 mb-4">{member.role}</p>
                      <p className="text-sm text-white/60 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Section>

        {/* 8. GUEST TRANSFORMATIONS */}
        <Section className="bg-white">
          <div className="max-w-4xl mx-auto space-y-24">
            {[
              { quote: "I arrived fractured. Work had broken me. The silence here taught me that my fractures could be beautiful. I left whole, but differently whole — stronger where I was broken.", meta: "Spring Retreat, 2024" },
              { quote: "The burnout was total. I couldn't imagine joy again. Ten days of forest, tea, and hot springs reminded me who I was before the world told me who to be.", meta: "Autumn Retreat, 2023" },
              { quote: "Grief had made me feel damaged. Kintsugi showed me that gold can fill the cracks. I'm not broken — I'm repaired with something precious.", meta: "Winter Retreat, 2024" }
            ].map((t, i) => (
              <FadeIn key={i}>
                <div className="text-center space-y-8">
                  <Quote className="w-12 h-12 text-slate-100 mx-auto" strokeWidth={1} />
                  <p className="text-2xl md:text-4xl font-serif italic text-slate-800 leading-relaxed">"{t.quote}"</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">— {t.meta}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* 9. BOOKING (The Inquiry) */}
        <Section id="contact" className="relative">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl p-12 md:p-24 overflow-hidden border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400">The First Step</h2>
                  <p className="text-4xl md:text-6xl font-serif italic text-slate-800">Begin the Conversation</p>
                  <p className="text-slate-500 leading-relaxed font-serif italic text-lg">Every journey begins with a conversation. Tell us where you are, and where you hope to be.</p>
                </div>
                
                <div className="space-y-6 pt-12 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-slate-400">
                    <MapPin className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Higashiyama, Kyoto, Japan</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <Clock className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Response within 48 hours</span>
                  </div>
                </div>
              </div>

              <div>
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                      <Check className="w-10 h-10 text-slate-800" />
                    </div>
                    <h3 className="text-2xl font-serif italic text-slate-800">The journey has begun.</h3>
                    <p className="text-slate-500 text-sm">We have received your inquiry. One of our curators will reach out to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Your Full Name</label>
                      <input 
                        {...form.register('name')} 
                        className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-slate-800 transition-colors text-slate-800 font-serif italic"
                        placeholder="John Doe"
                      />
                      {form.formState.errors.name && <p className="text-[10px] text-red-400 uppercase font-bold">{form.formState.errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                      <input 
                        {...form.register('email')} 
                        type="email"
                        className="w-full bg-transparent border-b border-slate-200 py-4 focus:outline-none focus:border-slate-800 transition-colors text-slate-800 font-serif italic"
                        placeholder="hello@world.com"
                      />
                      {form.formState.errors.email && <p className="text-[10px] text-red-400 uppercase font-bold">{form.formState.errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Which season calls to you?</label>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        {(Object.values(SEASONS) as SeasonData[]).map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedSeason(s.id)}
                            className={cn(
                              "px-4 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all",
                              selectedSeason === s.id ? "bg-slate-800 text-white border-slate-800 shadow-lg" : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
                            )}
                          >
                            {s.english}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">What brings you to Kintsugi?</label>
                      <textarea 
                        {...form.register('reason')} 
                        rows={4}
                        className="w-full bg-slate-50 rounded-2xl p-6 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-all text-slate-800 font-serif italic text-sm mt-4"
                        placeholder="Tell us about your current path..."
                      />
                      {form.formState.errors.reason && <p className="text-[10px] text-red-400 uppercase font-bold">{form.formState.errors.reason.message}</p>}
                    </div>
                    <Button 
                      type="submit" 
                      disabled={form.formState.isSubmitting}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase tracking-[0.3em] py-8 rounded-full shadow-2xl transition-all h-auto"
                    >
                      {form.formState.isSubmitting ? "Transmitting..." : "Send Inquiry"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* FOOTER */}
      <footer className="py-24 px-6 md:px-12 text-center bg-white border-t border-slate-50">
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-3xl font-serif text-slate-800">継</span>
          <span className="text-sm font-bold tracking-[0.2em] text-slate-800 uppercase leading-none">Kintsugi Wellness</span>
        </div>
        <div className="flex justify-center gap-8 text-slate-400 mb-12">
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-slate-800">Instagram</button>
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-slate-800">Facebook</button>
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-slate-800">Journal</button>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
          © 2025 Kintsugi Wellness — Est. 2019 Kyoto
        </p>
      </footer>

      {/* STICKY CTA (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button 
          onClick={() => scrollTo('contact')}
          className="w-full bg-slate-800 text-white font-bold py-8 rounded-full shadow-2xl tracking-[0.3em] uppercase text-xs"
        >
          Begin Journey
        </Button>
      </div>
    </div>
  );
}
