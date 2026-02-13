
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Building2, 
  Calendar, 
  Rocket, 
  Briefcase, 
  TrendingUp, 
  Wrench, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Zap,
  Menu,
  X,
  Plus,
  Star,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '../FadeIn';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

// --- COMPONENTS ---

const LiveCounter = () => {
  const [count, setCount] = useState(8247);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
      {[
        { label: "Attendees Registered", val: count.toLocaleString(), icon: Users },
        { label: "Countries Represented", val: "52", icon: Globe },
        { label: "Companies Attending", val: "3,200+", icon: Building2 },
        { label: "Days Until SaaStr", val: "142", icon: Calendar },
      ].map((stat, i) => (
        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center">
          <stat.icon className="w-6 h-6 text-[#FF6B35] mx-auto mb-3" />
          <p className="text-3xl font-black text-white mb-1">{stat.val}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

const matchmakerData = [
  {
    id: "founder",
    label: "Founder/CEO",
    icon: Rocket,
    matches: [
      "500+ fellow founders sharing scaling secrets",
      "200+ VCs actively deploying capital",
      "50+ potential enterprise customers",
      "Peer mentors at your stage ($1M-$100M ARR)"
    ],
    example: {
      name: "Dharmesh Shah",
      role: "CTO @ HubSpot",
      img: "saastr-speaker-1"
    }
  },
  {
    id: "exec",
    label: "VP/Executive",
    icon: Briefcase,
    matches: [
      "2,000+ revenue leaders sharing playbooks",
      "300+ CMOs discussing AI attribution",
      "400+ VPs of Sales with live dashboards",
      "150+ CPOs sharing product roadmaps"
    ],
    example: {
      name: "Whitney Bouck",
      role: "COO @ HelloSign",
      img: "saastr-speaker-2"
    }
  },
  {
    id: "revenue",
    label: "Revenue/Sales",
    icon: TrendingUp,
    matches: [
      "3,500+ quota-carrying representatives",
      "500+ sales leaders with hiring playbooks",
      "200+ sales enablement tool vendors",
      "Top performers sharing cold email sequences"
    ],
    example: {
      name: "Sales Pro",
      role: "VP Revenue @ Unicorn SaaS",
      img: "saastr-speaker-3"
    }
  },
  {
    id: "product",
    label: "Product/Eng",
    icon: Wrench,
    matches: [
      "2,000+ senior product managers",
      "1,500+ engineering leaders",
      "100+ CTOs discussing microservices",
      "PMs who've shipped 100+ AI features"
    ],
    example: {
      name: "Des Traynor",
      role: "Co-founder @ Intercom",
      img: "saastr-speaker-4"
    }
  },
  {
    id: "investor",
    label: "Investor",
    icon: Coins,
    matches: [
      "1,000+ founders raising Active rounds",
      "300+ angel investors co-investing",
      "50+ SaaS companies at Series A/B stage",
      "Peer-to-peer due diligence circles"
    ],
    example: {
      name: "Jyoti Bansal",
      role: "CEO @ Harness",
      img: "saastr-speaker-3"
    }
  }
];

const NetworkMatchmaker = () => {
  const [activeId, setActiveId] = useState(matchmakerData[0].id);
  const activeData = matchmakerData.find(d => d.id === activeId)!;

  return (
    <div className="max-w-6xl mx-auto bg-[#001F3D] rounded-[3rem] p-8 md:p-16 shadow-2xl border border-[#0066CC]/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066CC]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Selector */}
        <div className="lg:col-span-4 space-y-4">
          <p className="text-[#FF6B35] font-black uppercase text-xs tracking-widest mb-8">Step 1: Select Your Profile</p>
          {matchmakerData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "w-full p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 text-left border-2",
                activeId === item.id 
                  ? "bg-[#0066CC] border-[#0066CC] text-white shadow-xl shadow-blue-900/50 scale-105" 
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
              )}
            >
              <item.icon className={cn("w-6 h-6", activeId === item.id ? "text-white" : "text-[#0066CC]")} />
              <span className="font-bold text-lg">{item.label}</span>
              {activeId === item.id && <Zap className="w-4 h-4 ml-auto text-orange-400 fill-orange-400" />}
            </button>
          ))}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 text-slate-900 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-100">
                <div className="w-16 h-16 bg-[#0066CC]/10 rounded-2xl flex items-center justify-center">
                  <activeData.icon className="w-8 h-8 text-[#0066CC]" />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">Meet Your Future Network</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">For {activeData.label}s at SaaStr Annual 2024</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {activeData.matches.map((match, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      </div>
                      <p className="font-bold text-slate-700 leading-tight">{match}</p>
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-[#FF6B35] uppercase tracking-[0.2em] mb-4">Confirmed Speaker Example</p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden relative border-2 border-white shadow-lg">
                      <Image 
                        src={PlaceHolderImages.find(img => img.id === activeData.example.img)?.imageUrl || "https://picsum.photos/seed/user/200/200"} 
                        alt={activeData.example.name} 
                        fill 
                        className="object-cover"
                        data-ai-hint="speaker portrait"
                      />
                    </div>
                    <div>
                      <p className="font-black text-xl">{activeData.example.name}</p>
                      <p className="text-slate-500 font-bold text-sm">{activeData.example.role}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0066CC] hover:bg-[#0055AA] text-white rounded-xl py-6 font-bold shadow-lg">
                    Book 1:1 Meeting
                  </Button>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button variant="ghost" className="text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-[#0066CC]">
                  See all 10,000+ connections <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function SaaStrAnnualPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroImg = PlaceHolderImages.find(img => img.id === 'saastr-hero')?.imageUrl || "https://picsum.photos/seed/saastr/1200/800";
  const sfImg = PlaceHolderImages.find(img => img.id === 'saastr-sf-skyline')?.imageUrl || "https://picsum.photos/seed/sf/1200/800";

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0066CC] selection:text-white font-sans overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 px-6 md:px-12 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-[#0066CC] rounded-lg flex items-center justify-center text-white shadow-lg">
            <Rocket className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-[#0066CC]">SaaStr Annual</span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <button onClick={() => scrollTo('matchmaker')} className="hover:text-[#0066CC] transition-colors">Matchmaker</button>
          <button onClick={() => scrollTo('speakers')} className="hover:text-[#0066CC] transition-colors">Speakers</button>
          <button onClick={() => scrollTo('agenda')} className="hover:text-[#0066CC] transition-colors">Agenda</button>
          <button onClick={() => scrollTo('tickets')} className="hover:text-[#0066CC] transition-colors">Tickets</button>
          <Button onClick={() => scrollTo('tickets')} className="rounded-full px-8 py-6 bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#E55A24] shadow-lg shadow-orange-500/20">
            Get Tickets
          </Button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-8 h-8" />
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
            <div className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tighter italic">
              <button onClick={() => scrollTo('matchmaker')} className="text-left">Matchmaker</button>
              <button onClick={() => scrollTo('speakers')} className="text-left">Speakers</button>
              <button onClick={() => scrollTo('agenda')} className="text-left">Agenda</button>
              <button onClick={() => scrollTo('tickets')} className="text-left">Tickets</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImg} 
              alt="Massive Conference Hall" 
              fill 
              className="object-cover opacity-40 grayscale-[20%]"
              priority 
              data-ai-hint="conference crowd"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#001F3D]/80 via-transparent to-slate-950" />
          </div>

          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-9xl font-black leading-[0.85] mb-8 tracking-tighter uppercase italic">
                10,000+ SaaS LEADERS. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] via-white to-[#0066CC]">INFINITE OPS.</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-300 font-bold uppercase tracking-widest mb-16 max-w-4xl mx-auto">
                September 10-12, 2024 • San Francisco • Moscone Center
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <LiveCounter />
            </FadeIn>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button onClick={() => scrollTo('tickets')} size="lg" className="w-full sm:w-auto bg-[#FF6B35] hover:bg-[#E55A24] text-white font-black text-2xl px-16 py-10 h-auto rounded-[2rem] shadow-2xl transition-all uppercase italic">
                Join Them — Get Tickets
              </Button>
            </div>
          </div>
        </section>

        {/* 2. NETWORK MATCHMAKER */}
        <section id="matchmaker" className="py-32 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-[#001F3D] mb-6 uppercase tracking-tighter italic">Who Will You Meet?</h2>
                <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">Select your profile to visualize your specific network opportunities</p>
              </FadeIn>
            </div>
            <NetworkMatchmaker />
          </div>
        </section>

        {/* 3. SPEAKER LINEUP */}
        <section id="speakers" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-20 border-b border-slate-100 pb-12">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-[#001F3D] uppercase tracking-tighter italic">The Headliners</h2>
              </FadeIn>
              <Button variant="link" className="text-slate-400 font-bold uppercase tracking-widest text-xs hidden md:flex">
                See all 500+ speakers <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { name: "Dharmesh Shah", role: "CTO, HubSpot", lesson: "The DNA of High-Growth Culture", img: "saastr-speaker-1" },
                { name: "Jyoti Bansal", role: "CEO, Harness", lesson: "Scaling from $0 to $100M ARR", img: "saastr-speaker-2" },
                { name: "Whitney Bouck", role: "COO, HelloSign", lesson: "Operationalizing Scale", img: "saastr-speaker-3" },
                { name: "Des Traynor", role: "Co-founder, Intercom", lesson: "The Future of AI Products", img: "saastr-speaker-4" },
                { name: "Michelle Zatlyn", role: "COO, Cloudflare", lesson: "Engineering Mass Scale", img: "saastr-speaker-1" },
                { name: "Stewart Butterfield", role: "Co-founder, Slack", lesson: "Building Meaningful Tools", img: "saastr-speaker-2" },
                { name: "Claire Johnson", role: "COO, Stripe", lesson: "The Infrastructure of Commerce", img: "saastr-speaker-3" },
                { name: "Aaron Levie", role: "CEO, Box", lesson: "Disrupting Enterprise Legacy", img: "saastr-speaker-4" },
              ].map((speaker, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 border border-slate-100 shadow-sm cursor-pointer">
                    <Image 
                      src={PlaceHolderImages.find(img => img.id === speaker.img)?.imageUrl || "https://picsum.photos/seed/sp/400/600"} 
                      alt={speaker.name} 
                      fill 
                      className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110" 
                      data-ai-hint="speaker portrait"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001F3D] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6B35] mb-2">Biggest Lesson</p>
                      <p className="text-lg font-bold italic leading-tight mb-4">"{speaker.lesson}"</p>
                      <h4 className="text-xl font-black uppercase tracking-tight">{speaker.name}</h4>
                      <p className="text-xs font-bold opacity-60 uppercase">{speaker.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. AGENDA AT A GLANCE */}
        <section id="agenda" className="py-32 bg-[#001F3D] text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic">3 Days. 8 Stages.</h2>
                <p className="text-xl text-[#0066CC] font-bold uppercase tracking-[0.4em] mt-4">The Strategic Roadmap</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[
                { 
                  day: "Day 1", 
                  title: "SCALE", 
                  color: "border-[#0066CC]", 
                  items: ["$1M to $10M Growth Tactics", "Building 50+ Person Teams", "Pier 27 Opening Party (5k+ attendees)"] 
                },
                { 
                  day: "Day 2", 
                  title: "EXECUTE", 
                  color: "border-[#10B981]", 
                  items: ["Product-Led Growth deep-dives", "IPO Prep & Secondary Exits", "Founder Private Dinner Series"] 
                },
                { 
                  day: "Day 3", 
                  title: "INVEST", 
                  color: "border-[#FF6B35]", 
                  items: ["Fundraising in the 2024 Market", "AI Integration Across the Stack", "Moscone Closing Celebration"] 
                },
              ].map((day, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={cn("p-10 border-l-8 bg-white/5 rounded-r-[2.5rem] h-full", day.color)}>
                    <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">{day.day}</p>
                    <h3 className="text-5xl font-black italic tracking-tighter mb-10">{day.title}</h3>
                    <ul className="space-y-8">
                      {day.items.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start">
                          <div className="w-2 h-2 rounded-full bg-white mt-2" />
                          <p className="text-lg font-bold leading-tight text-slate-200">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. SUCCESS STORIES */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
            <Image src={sfImg} alt="SF Skyline" fill className="object-cover" />
          </div>
          <div className="container relative z-10 mx-auto px-6">
            <div className="max-w-4xl">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-[#001F3D] mb-12 uppercase tracking-tighter italic">Concrete Outcomes.</h2>
                <div className="space-y-12">
                  {[
                    { quote: "Met our Series A lead investor on day 1. Closed $8M round 6 weeks later.", author: "Founder, Data Analytics SaaS", stat: "$8M Round Raised" },
                    { quote: "Hired 3 VP-level executives from people I met at SaaStr. My team doubled in quality.", author: "CEO, HR Tech", stat: "3 Executive Hires" },
                    { quote: "Closed 2 enterprise deals worth $1.2M from booth conversations. The ROI was instant.", author: "VP Sales, MarTech", stat: "$1.2M Closed Revenue" },
                  ].map((story, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                      <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex-grow relative group transition-all hover:bg-white hover:shadow-xl">
                        <Star className="absolute top-8 right-8 text-orange-400 fill-orange-400 w-6 h-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                        <p className="text-2xl md:text-3xl font-bold italic text-slate-700 leading-tight mb-6">"{story.quote}"</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0066CC]">{story.author}</p>
                      </div>
                      <div className="w-full md:w-48 text-center md:text-left">
                        <p className="text-4xl font-black text-[#10B981] mb-1">{story.stat}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Post-Event Outcome</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 6. TICKETS */}
        <section id="tickets" className="py-32 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-[#001F3D] mb-6 uppercase tracking-tighter italic">Claim Your Slot</h2>
                <p className="text-xl text-[#FF6B35] font-black uppercase tracking-[0.4em]">Early Bird Ends August 1 — Save $200</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { 
                  name: "General Admission", 
                  price: "$899", 
                  color: "bg-white", 
                  perks: ["All 8 stages of content", "Full Expo Hall access", "Opening & Closing parties", "Mobile Networking App"] 
                },
                { 
                  name: "Executive", 
                  price: "$1,899", 
                  recommended: true, 
                  color: "bg-[#001F3D] text-white", 
                  perks: ["Everything in General +", "Exclusive VIP Lounge", "Reserved Priority Seating", "All session recordings", "Private Founder Dinners"] 
                },
                { 
                  name: "Investor", 
                  price: "$2,500", 
                  color: "bg-white", 
                  perks: ["Everything in Executive +", "Founder Speed Dating Access", "Private Due Diligence Room", "LP-Only Networking Hour"] 
                },
              ].map((tier, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={cn("p-12 rounded-[3.5rem] border flex flex-col h-full relative transition-all duration-500", tier.color, tier.recommended ? "border-[#0066CC] shadow-2xl scale-105 z-10" : "border-slate-200 shadow-lg")}>
                    {tier.recommended && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B35] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                    )}
                    <div className="mb-12">
                      <h3 className="text-2xl font-black uppercase tracking-tight italic mb-2">{tier.name}</h3>
                      <p className={cn("text-6xl font-black tracking-tighter", tier.recommended ? "text-[#0066CC]" : "text-slate-900")}>{tier.price}</p>
                    </div>
                    
                    <ul className="space-y-6 flex-grow mb-12">
                      {tier.perks.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-bold opacity-80">
                          <CheckCircle2 className={cn("w-5 h-5", tier.recommended ? "text-[#0066CC]" : "text-[#10B981]")} /> {p}
                        </li>
                      ))}
                    </ul>

                    <Button className={cn("w-full h-auto py-8 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all", tier.recommended ? "bg-[#0066CC] text-white hover:bg-[#0055AA]" : "bg-slate-900 text-white hover:bg-slate-800")}>
                      Secure My Seat
                    </Button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="py-32 bg-[#001F3D] text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 z-0">
            <Image src={sfImg} alt="SF" fill className="object-cover opacity-10" />
          </div>
          <div className="container relative z-10 mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-9xl font-black mb-8 uppercase tracking-tighter leading-none italic">DON'T MISS THE <br/><span className="text-[#FF6B35]">MOMENTUM.</span></h2>
              <p className="text-xl md:text-3xl text-slate-400 mb-16 max-w-3xl mx-auto font-bold uppercase tracking-widest">10,000 SaaS Leaders. September 10-12. San Francisco.</p>
              
              <Button onClick={() => scrollTo('tickets')} size="lg" className="bg-[#FF6B35] hover:bg-[#E55A24] text-white font-black text-3xl px-20 py-12 h-auto rounded-[3rem] shadow-2xl transition-all uppercase italic">
                GET MY TICKETS — FROM $899
              </Button>
              
              <p className="mt-12 text-sm font-black text-slate-500 uppercase tracking-[0.5em]">Sold out 3 years running. 82% capacity reached.</p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white py-24 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-[#0066CC] rounded-lg flex items-center justify-center text-white">
                  <Rocket className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase text-[#0066CC]">SaaStr Annual</span>
              </div>
              <p className="text-slate-500 font-bold max-w-sm mb-8">The world's largest gathering for B2B software founders, executives, and investors. Since 2014.</p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-[#0066CC] hover:text-white transition-colors cursor-pointer" />)}
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-[#0066CC] mb-8">Navigation</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-slate-900 cursor-pointer">Sponsorship</li>
                <li className="hover:text-slate-900 cursor-pointer">Scholarships</li>
                <li className="hover:text-slate-900 cursor-pointer">Press Center</li>
                <li className="hover:text-slate-900 cursor-pointer">Volunteer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-[#0066CC] mb-8">Location</h4>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">
                Moscone Center South<br/>
                747 Howard St<br/>
                San Francisco, CA 94103
              </p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">&copy; 2024 SaaStr Annual Events. All rights reserved.</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-900 cursor-pointer">Code of Conduct</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => scrollTo('tickets')} className="w-full bg-[#FF6B35] text-white font-black py-8 text-xl shadow-2xl rounded-2xl flex items-center justify-center gap-3 italic">
          GET TICKETS — $899
        </Button>
      </div>

    </div>
  );
}
