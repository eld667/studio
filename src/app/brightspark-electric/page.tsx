'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Star, 
  AlertTriangle, 
  Flame, 
  Activity, 
  ChevronRight, 
  MapPin, 
  CheckCircle2,
  Menu,
  X,
  Send,
  Droplets,
  Hammer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn } from '../FadeIn';
import { cn } from '@/lib/utils';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  phone: z.string().min(10, { message: "Valid phone required." }),
  message: z.string().optional(),
});

const emergencyServices = [
  { name: "Power Outages", price: "Est. $150-$350", icon: Zap },
  { name: "Burning Smells", price: "Est. $200-$400", icon: Flame },
  { name: "Sparking Outlets", price: "Est. $150-$300", icon: AlertTriangle },
  { name: "Breaker Panel Issues", price: "Est. $250-$500", icon: Activity },
  { name: "Flooded Electrical", price: "Est. $300-$600", icon: Droplets },
];

export default function BrightSparkElectricPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      email: "no-email@brightspark.com", // Fallback for 3-field requirement
      id: leadId,
      serviceType: "Quote Request",
      timestamp: new Date().toISOString(),
    };
    
    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      form.reset();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Transmission Error",
        description: "Please call (512) 555-POWER directly.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00d4ff] selection:text-black font-sans overflow-x-hidden">
      
      {/* 1. EMERGENCY STRIP (Fixed, Top) */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-[#ffb800] text-black py-2 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono font-bold text-xs md:text-sm animate-pulse">
            <Zap className="w-4 h-4 fill-black" />
            LIVE DISPATCH — EMERGENCY AVAILABLE NOW
          </div>
          <a href="tel:5125557693" className="font-bold text-sm md:text-base flex items-center gap-2 hover:underline">
            <span className="hidden sm:inline">→</span> (512) 555-POWER
          </a>
        </div>
      </div>

      <main className="pt-10">
        
        {/* 2. HERO: THE SPLIT-SECOND DECISION */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-white/5">
          {/* Subtle Electricity Particle Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
             {isMounted && [...Array(20)].map((_, i) => (
               <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#00d4ff] rounded-full blur-[1px]"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: Math.random() * 100 + '%',
                  opacity: 0
                }}
                animate={{ 
                  y: [null, '-100%'],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: Math.random() * 5 + 5, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 5
                }}
               />
             ))}
          </div>

          <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-8 tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c853] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c853]"></span>
                  </span>
                  // DISPATCH_ACTIVE: PRIORITY_1
                </div>
                <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-6 tracking-tighter uppercase">
                  Power Out? <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-white to-[#00d4ff]">We Come Running.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-xl font-medium leading-relaxed">
                  24/7 emergency electricians in Austin. <span className="text-white">30-min response.</span> No overtime fees. Lights on, worry off.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <motion.div
                    animate={{ boxShadow: ["0 0 0px #ffb800", "0 0 20px #ffb800", "0 0 0px #ffb800"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full sm:w-auto rounded-xl"
                  >
                    <a href="tel:5125557693" className="block w-full">
                      <Button size="lg" className="w-full bg-[#ffb800] hover:bg-[#ffa000] text-black font-black text-xl px-10 py-8 h-auto rounded-xl uppercase tracking-tighter">
                        CALL EMERGENCY LINE
                      </Button>
                    </a>
                  </motion.div>
                  <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white font-bold px-8 py-8 h-auto rounded-xl hover:bg-white/5">
                    Schedule Non-Emergency
                  </Button>
                </div>

                <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/10 inline-block">
                  <p className="text-xs font-mono text-gray-500 mb-2">// QUICK_DIAGNOSTICS</p>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-300">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00d4ff]" /> Check Neighbors</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00d4ff]" /> Breaker Panel Check</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00d4ff]" /> Internal Outage Likely</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Status Panel */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2}>
                <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-2xl relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <p className="text-xs font-mono text-gray-500 mb-1">STATUS:</p>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#00c853] rounded-full animate-pulse shadow-[0_0_10px_#00c853]" />
                        <span className="font-bold text-[#00c853] uppercase tracking-widest">Online</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-gray-500 mb-1">UNIT_READY:</p>
                      <p className="font-black text-xl">3 TECHS ON CALL</p>
                    </div>
                  </div>

                  <div className="space-y-8 mb-12">
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                      <p className="text-xs font-mono text-gray-500 mb-1">ESTIMATED_ARRIVAL:</p>
                      <p className="text-3xl font-black text-[#00d4ff]">22 MIN <span className="text-sm font-normal text-gray-500">to Austin Central</span></p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-2xl border border-white/5 bg-black/20">
                        <Star className="w-5 h-5 text-[#ffb800] fill-[#ffb800] mx-auto mb-2" />
                        <p className="text-xl font-bold">4.9/5</p>
                        <p className="text-[10px] font-mono text-gray-500">687 REVIEWS</p>
                      </div>
                      <div className="text-center p-4 rounded-2xl border border-white/5 bg-black/20">
                        <ShieldCheck className="w-5 h-5 text-[#00c853] mx-auto mb-2" />
                        <p className="text-xl font-bold">TECL-12345</p>
                        <p className="text-[10px] font-mono text-gray-500">TX MASTER LICENSE</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400 uppercase">Background Checked</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400 uppercase">$2M Insured</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400 uppercase">On-Time Guarantee</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. THE PAIN AMPLIFIER */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Electrical Issues <br/><span className="text-red-600">Don't Fix Themselves</span></h2>
                <p className="text-xl text-gray-400">Waiting until morning can be a catastrophic mistake.</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Tripping Breaker", mean: "Overloaded or Short", risk: "Fire Hazard", color: "text-red-500" },
                { title: "Burning Smell", mean: "Melted Insulation", risk: "Immediate Danger", color: "text-red-600" },
                { title: "Flickering Lights", mean: "Loose Connection", risk: "Surge Damage", color: "text-orange-500" },
                { title: "Electric Shock", mean: "Faulty Grounding", risk: "Electrocution", color: "text-red-500" },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 bg-[#1a1a1a] border border-white/5 rounded-2xl h-full hover:border-red-600/30 transition-colors">
                    <h4 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-widest">// WARNING_SIGN_{i+1}</h4>
                    <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-6">{item.mean}</p>
                    <div className={cn("p-3 bg-red-600/10 rounded-lg border-l-4 border-red-600", item.color)}>
                      <p className="font-black text-xs uppercase tracking-widest">CRITICAL RISK:</p>
                      <p className="font-bold text-lg">{item.risk}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-16 text-center">
              <FadeIn>
                <p className="text-xl text-gray-300 font-bold mb-8">Get it checked before it scales. Free safety inspection included.</p>
                <a href="tel:5125557693">
                  <Button size="lg" className="bg-transparent border-2 border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black font-black text-xl px-12 py-8 h-auto rounded-xl">
                    CALL EMERGENCY DISPATCH
                  </Button>
                </a>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. THE SOLUTION: FAST-FIX PROMISE */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-16 rounded-[3rem] max-w-5xl mx-auto shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter leading-none">Our Emergency <br/><span className="text-[#00d4ff]">Response Guarantee</span></h2>
                  <div className="space-y-6">
                    {[
                      { icon: Clock, title: "30 Min Response", desc: "Average tech arrival time across Austin." },
                      { icon: ShieldCheck, title: "Upfront Pricing", desc: "No surprises. We quote before we work." },
                      { icon: CheckCircle2, title: "2-Year Warranty", desc: "Every emergency repair is built to last." },
                      { icon: Star, title: "No Overtime Fees", desc: "Same rate day, night, or weekend." },
                    ].map((p, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00d4ff]/20">
                          <p.icon className="w-5 h-5 text-[#00d4ff]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">{p.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden border border-white/10">
                  <img src="https://images.unsplash.com/photo-1558211583-d28f63069546?q=80&w=2069&auto=format&fit=crop" alt="BrightSpark Tech" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-mono text-xs text-[#00d4ff] mb-1">// WE_ARE_HERE_TO_HELP</p>
                    <p className="text-xl font-black uppercase">Background Checked Technicians</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SERVICE MENU */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase tracking-tight">Mission Capabilities</h2>
            
            <Tabs defaultValue="emergency" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 rounded-xl h-auto p-1">
                <TabsTrigger value="emergency" className="py-4 font-bold uppercase text-xs tracking-widest data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black rounded-lg">Emergency</TabsTrigger>
                <TabsTrigger value="home" className="py-4 font-bold uppercase text-xs tracking-widest data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black rounded-lg">Home Services</TabsTrigger>
                <TabsTrigger value="commercial" className="py-4 font-bold uppercase text-xs tracking-widest data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black rounded-lg">Commercial</TabsTrigger>
              </TabsList>
              <div className="mt-8 bg-[#1a1a1a] border border-white/5 p-8 rounded-3xl">
                <TabsContent value="emergency" className="m-0 space-y-4">
                  {emergencyServices.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 group hover:border-[#00d4ff]/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                          <s.icon className="w-5 h-5 text-[#00d4ff]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{s.name}</h4>
                          <p className="text-xs text-gray-500 font-mono tracking-widest">RESOLVED_IN_1-2_HRS</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00c853] font-black">{s.price}</p>
                        <p className="text-[10px] font-mono text-gray-500">UPFRONT_QUOTE</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="home" className="m-0 text-center py-12">
                  <p className="text-gray-400 mb-6">Full residential services including panel upgrades, EV chargers, and lighting.</p>
                  <Button variant="outline" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black font-bold">Browse Catalog</Button>
                </TabsContent>
                <TabsContent value="commercial" className="m-0 text-center py-12">
                  <p className="text-gray-400 mb-6">Maintenance, code compliance, and build-outs for Austin businesses.</p>
                  <Button variant="outline" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black font-bold">Commercial Portal</Button>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>

        {/* 6. WHY BRIGHTSPARK */}
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Master Electricians", proof: "Licensed (TECL-12345)", icon: Star },
                { title: "Verified Reviews", proof: "4.9 Avg, 687 Total", icon: CheckCircle2 },
                { title: "Fully Insured", proof: "$2M Liability Coverage", icon: ShieldCheck },
                { title: "On-Time Guarantee", proof: "$50 Credit if Late", icon: Clock },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 bg-[#1a1a1a] rounded-2xl border border-white/5 text-center">
                    <item.icon className="w-8 h-8 text-[#00d4ff] mx-auto mb-4" />
                    <h4 className="text-xl font-black mb-2 uppercase tracking-tighter">{item.title}</h4>
                    <p className="text-gray-400 font-mono text-xs">{item.proof}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 7. THE PROCESS */}
        <section className="py-24 bg-[#1a1a1a]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase tracking-tight">The 4-Step Fix</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Call", desc: "Speak directly to a licensed tech, not a robot." },
                { step: "02", title: "Diagnose", desc: "Identify the root cause and get an upfront quote." },
                { step: "03", title: "Fix", desc: "Immediate repair with high-quality components." },
                { step: "04", title: "Verify", desc: "Testing, cleanup, and 2-year warranty issued." },
              ].map((s, i) => (
                <div key={i} className="relative p-8 bg-black/40 border border-white/5 rounded-2xl">
                  <span className="text-5xl font-black text-white/5 absolute top-4 right-4">{s.step}</span>
                  <h4 className="text-2xl font-black mb-4 text-[#00d4ff] uppercase tracking-tighter">{s.title}</h4>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. REAL STORIES */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="p-10 bg-[#1a1a1a] border border-white/5 rounded-[3rem]">
                <p className="text-2xl italic text-gray-300 mb-8 leading-relaxed">
                  "Power went out at 9 PM during a heat wave. Called BrightSpark and Mike was here in 25 minutes. Found a melted connection in the panel. <span className="text-red-500 font-bold">Could've been a fire.</span>"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-full flex items-center justify-center font-black text-[#00d4ff]">S</div>
                  <div>
                    <p className="font-bold">Sarah K., Austin</p>
                    <p className="text-xs font-mono text-gray-500">EMERGENCY CALL, JULY 2024</p>
                  </div>
                </div>
              </div>
              <div className="p-10 bg-[#1a1a1a] border border-white/5 rounded-[3rem]">
                <p className="text-2xl italic text-gray-300 mb-8 leading-relaxed">
                  "Breaker kept tripping every time I ran the AC and microwave. They diagnosed it over the phone, fixed it same day. <span className="text-[#00d4ff] font-bold">Professional and fast.</span>"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-full flex items-center justify-center font-black text-[#00d4ff]">J</div>
                  <div>
                    <p className="font-bold">James M., Round Rock</p>
                    <p className="text-xs font-mono text-gray-500">SAME-DAY SERVICE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. AREA COVERAGE */}
        <section className="py-24 bg-[#1a1a1a] border-y border-white/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter">Austin Rapid Response Zones</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { zone: "Downtown", time: "15-25 MIN" },
                { zone: "North Austin", time: "20-30 MIN" },
                { zone: "South Austin", time: "20-35 MIN" },
                { zone: "Cedar Park", time: "30-45 MIN" },
              ].map((z, i) => (
                <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                  <p className="font-mono text-xs text-gray-500 mb-1">{z.zone}</p>
                  <p className="text-xl font-black text-[#00d4ff]">{z.time}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-gray-400 font-bold uppercase tracking-widest text-sm">We're already out there. Probably closer than you think.</p>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase tracking-tighter">Emergency Intel</h2>
            <div className="space-y-6">
              {[
                { q: "Do you charge more for nights/weekends?", a: "No. Same rate, 24/7. Emergencies don't follow business hours." },
                { q: "Can I try to fix it myself first?", a: "We respect the DIY spirit, but electrical work is the #3 cause of house fires. When in doubt, call us out." },
                { q: "What if I need a full rewire?", a: "We'll give you all options—repair, partial update, or full rewire—with clear pricing. No pressure, just honest advice." },
                { q: "Are you actually local?", a: "Born and raised in Austin. Our techs know the weird wiring quirks of homes in Clarksville, Tarrytown, and East Austin." },
              ].map((f, i) => (
                <div key={i} className="p-8 bg-[#1a1a1a] rounded-3xl border border-white/5">
                  <h4 className="text-xl font-bold mb-4 flex gap-3"><span className="text-[#ffb800]">Q:</span> {f.q}</h4>
                  <p className="text-gray-400 leading-relaxed border-l-2 border-[#00d4ff] pl-6"><span className="text-[#00d4ff] font-bold mr-2">A:</span> {f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
             {isMounted && [...Array(30)].map((_, i) => (
               <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#ffb800] rounded-full blur-[1px]"
                initial={{ x: Math.random() * 100 + '%', y: '100%', opacity: 0 }}
                animate={{ y: '-100%', opacity: [0, 1, 0] }}
                transition={{ duration: Math.random() * 3 + 3, repeat: Infinity, ease: "linear", delay: Math.random() * 3 }}
               />
             ))}
          </div>
          <div className="container relative z-10 mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none">Your electricity works hard. <br/><span className="text-[#ffb800]">So do we.</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a href="tel:5125557693" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-[#ffb800] hover:bg-[#ffa000] text-black font-black text-2xl px-16 py-10 h-auto rounded-2xl shadow-2xl">
                  🚨 CALL EMERGENCY
                </Button>
              </a>
              <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white font-bold text-2xl px-16 py-10 h-auto rounded-2xl hover:bg-white/5">
                📅 SCHEDULE VISIT
              </Button>
            </div>
            <p className="mt-12 text-gray-500 font-mono text-sm tracking-widest uppercase">Takes 30 seconds. Talk to a real electrician. No robots.</p>
          </div>
        </section>

      </main>

      {/* 12. STICKY MOBILE BAR (Bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-[100] bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 pb-8 h-auto flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Emergency?</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-2 h-2 bg-[#00c853] rounded-full animate-pulse" />
            <span className="font-bold text-xs">27 min ETA</span>
          </div>
        </div>
        <a href="tel:5125557693" className="flex-grow">
          <Button className="w-full bg-[#ffb800] text-black font-black py-6 rounded-xl text-lg shadow-lg">
            CALL (512) 555-7693
          </Button>
        </a>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] pt-24 pb-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <Zap className="w-8 h-8 text-[#00d4ff] fill-[#00d4ff]" />
                <span className="text-2xl font-black tracking-tighter uppercase">BrightSpark Electric</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-8 font-medium">Licensed Master Electricians protecting Austin homes and businesses since 2009. 24/7 priority emergency response.</p>
              <div className="flex gap-4">
                {[CheckCircle2, Hammer, ShieldCheck].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tighter">Emergency Hub</h4>
              <ul className="space-y-4 text-gray-500 font-bold text-sm">
                <li className="hover:text-[#00d4ff] transition-colors"><a href="#">Power Outages</a></li>
                <li className="hover:text-[#00d4ff] transition-colors"><a href="#">Panel Emergencies</a></li>
                <li className="hover:text-[#00d4ff] transition-colors"><a href="#">Burning Smell Diagnostic</a></li>
                <li className="hover:text-[#00d4ff] transition-colors"><a href="#">Code Violations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tighter">Direct Path</h4>
              <div className="space-y-6">
                <a href="tel:5125557693" className="block p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-[#ffb800]/30 transition-colors">
                  <p className="text-[10px] font-mono text-gray-500 mb-1">PHONE_PRIMARY:</p>
                  <p className="text-xl font-black text-[#ffb800]">(512) 555-POWER</p>
                </a>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 mb-1">AUSTIN_HQ:</p>
                  <p className="text-sm font-bold text-gray-400 leading-tight">2450 S Colorado Blvd,<br/>Austin, TX 78701</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <p>&copy; 2024 BrightSpark Electric Austin. License TECL-12345. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy_Protocol</a>
              <a href="#" className="hover:text-white">Terms_of_Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
