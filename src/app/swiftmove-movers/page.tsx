'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Calendar as CalendarIcon, 
  Home, 
  ShieldCheck, 
  Clock, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Package, 
  Building2, 
  Box, 
  Warehouse, 
  Music, 
  Menu, 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Plus, 
  Minus,
  MessageSquare,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore, useMemoFirebase } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from '../FadeIn';

// --- SCHEMAS ---
const calculatorSchema = z.object({
  moveType: z.enum(["local", "long-distance", "commercial"]),
  homeSize: z.string().min(1, "Please select home size"),
  origin: z.string().min(1, "Origin zip required"),
  destination: z.string().min(1, "Destination zip required"),
  moveDate: z.string().min(1, "Select a date"),
  packing: z.boolean().default(false),
  storage: z.boolean().default(false),
  specialty: z.boolean().default(false),
});

const contactSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  message: z.string().optional(),
});

// --- CONSTANTS ---
const MOVE_PRICES = {
  local: 150,
  "long-distance": 800,
  commercial: 400
};

const SIZE_MULTIPLIERS: Record<string, number> = {
  "studio": 1,
  "1-bed": 1.5,
  "2-bed": 2.2,
  "3-bed": 3.5,
  "4-bed": 5,
  "5-plus": 7
};

export default function SwiftMoveMoversPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calcForm = useForm<z.infer<typeof calculatorSchema>>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      moveType: "local",
      homeSize: "studio",
      origin: "",
      destination: "",
      moveDate: "",
      packing: false,
      storage: false,
      specialty: false,
    }
  });

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" }
  });

  // Watch for real-time updates
  const watchedValues = calcForm.watch();

  useEffect(() => {
    let base = MOVE_PRICES[watchedValues.moveType as keyof typeof MOVE_PRICES] || 0;
    const multi = SIZE_MULTIPLIERS[watchedValues.homeSize] || 1;
    let total = base * multi;

    if (watchedValues.packing) total += 250;
    if (watchedValues.storage) total += 150;
    if (watchedValues.specialty) total += 300;

    setEstimate(Math.round(total));
  }, [watchedValues]);

  const onCalcSubmit = async (values: z.infer<typeof calculatorSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      name: "Quote Requested",
      email: "web-calculator@swiftmove.com",
      subject: `SwiftMove Quote: ${values.moveType} ${values.homeSize}`,
      message: `Origin: ${values.origin}, Destination: ${values.destination}, Date: ${values.moveDate}, Est: $${estimate}`,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Quote Request Sent", description: "A moving coordinator will call you in 15 mins." });
    } catch (e) {
      toast({ variant: "destructive", title: "Transmission Failed", description: "Please call (800) 555-SWIFT" });
    }
  };

  const onContactSubmit = async (values: z.infer<typeof contactSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      subject: "SwiftMove Inquiry",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      contactForm.reset();
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not send message." });
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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Truck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">SWIFTMOVE</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Professional Movers</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
            <button onClick={() => scrollTo('services')} className="hover:text-blue-600 transition-colors">Services</button>
            <button onClick={() => scrollTo('why-us')} className="hover:text-blue-600 transition-colors">Why SwiftMove</button>
            <button onClick={() => scrollTo('process')} className="hover:text-blue-600 transition-colors">Process</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-blue-600 transition-colors">FAQ</button>
            <a href="tel:8005557943" className="flex items-center gap-2 text-blue-600">
              <Phone className="w-4 h-4" /> (800) 555-SWIFT
            </a>
            <Button onClick={() => scrollTo('calculator')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full">
              Get Instant Quote
            </Button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-white lg:hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="font-black text-xl text-blue-600">SWIFTMOVE</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl font-bold">
                <button onClick={() => scrollTo('services')}>Services</button>
                <button onClick={() => scrollTo('why-us')}>Why Us</button>
                <button onClick={() => scrollTo('process')}>Process</button>
                <button onClick={() => scrollTo('calculator')}>Get Quote</button>
                <a href="tel:8005557943" className="mt-8">
                  <Button className="w-full bg-blue-600 text-white py-8 text-xl rounded-2xl">
                    Call (800) 555-7943
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        
        {/* 2. HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Happy family in new home"
              fill
              className="object-cover"
              priority
              data-ai-hint="moving family"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  100% Satisfaction Guaranteed
                </div>
                <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-6 tracking-tighter uppercase">
                  Moving Made <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400">Simple & Swift.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-xl font-medium leading-relaxed">
                  The most trusted movers in the nation. Stress-free packing, secure loading, and <span className="text-white">on-time delivery.</span> Guaranteed.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Button onClick={() => scrollTo('calculator')} size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-black text-xl px-10 py-8 h-auto rounded-2xl shadow-2xl hover:scale-105 transition-all">
                    GET INSTANT QUOTE
                  </Button>
                  <a href="tel:8005557943" className="w-full sm:w-auto flex items-center justify-center gap-3 text-xl font-bold hover:text-blue-400 transition-colors p-4">
                    <Phone className="w-6 h-6" /> (800) 555-7943
                  </a>
                </div>

                <div className="mt-12 flex flex-wrap gap-6 items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Check className="text-blue-500" /> Fully Licensed</span>
                  <span className="flex items-center gap-2"><Check className="text-blue-500" /> Insured & Bonded</span>
                  <span className="flex items-center gap-2"><Check className="text-blue-500" /> Background Checked</span>
                </div>
              </FadeIn>
            </div>

            {/* QUICK STATS PANEL */}
            <div className="lg:col-span-5 hidden lg:block">
              <FadeIn delay={0.2}>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                      <Star className="w-8 h-8 text-orange-400 fill-orange-400 mx-auto mb-2" />
                      <p className="text-3xl font-black">4.9/5</p>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Google Rating</p>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                      <ShieldCheck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-3xl font-black">15+</p>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Years Exp.</p>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-3xl font-black">98%</p>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Success Rate</p>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                      <Package className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-3xl font-black">50k+</p>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Items Moved</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. INSTANT QUOTE CALCULATOR */}
        <section id="calculator" className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <FadeIn>
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Your Move, <span className="text-blue-600">Priced Instantly.</span></h2>
                  <p className="text-xl text-slate-600 font-medium">Get a precision estimate in under 60 seconds. No high-pressure sales calls.</p>
                </div>
              </FadeIn>

              <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* FORM SIDE */}
                  <div className="lg:col-span-2 p-8 md:p-12 border-r border-slate-50">
                    <Form {...calcForm}>
                      <form onSubmit={calcForm.handleSubmit(onCalcSubmit)} className="space-y-8">
                        
                        {/* Move Type Selector */}
                        <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Step 1: Move Logistics</label>
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { id: "local", label: "Local", icon: Home },
                              { id: "long-distance", label: "Distance", icon: Truck },
                              { id: "commercial", label: "Business", icon: Building2 }
                            ].map((type) => (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => calcForm.setValue('moveType', type.id as any)}
                                className={cn(
                                  "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                                  watchedValues.moveType === type.id 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-xl" 
                                    : "bg-white border-slate-100 text-slate-600 hover:border-blue-200"
                                )}
                              >
                                <type.icon className={cn("w-6 h-6", watchedValues.moveType === type.id ? "text-white" : "text-blue-600")} />
                                <span className="font-bold text-xs uppercase">{type.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Location and Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={calcForm.control}
                            name="origin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold text-slate-700">Origin ZIP</FormLabel>
                                <FormControl>
                                  <input {...field} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-medium" placeholder="78701" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={calcForm.control}
                            name="destination"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold text-slate-700">Destination ZIP</FormLabel>
                                <FormControl>
                                  <input {...field} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-medium" placeholder="90210" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={calcForm.control}
                            name="homeSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold text-slate-700">Home Size</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-xl h-auto focus:ring-0 focus:border-blue-500 font-medium">
                                      <SelectValue placeholder="Select home size" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-white">
                                    <SelectItem value="studio">Studio Apartment</SelectItem>
                                    <SelectItem value="1-bed">1 Bedroom</SelectItem>
                                    <SelectItem value="2-bed">2 Bedroom</SelectItem>
                                    <SelectItem value="3-bed">3 Bedroom Home</SelectItem>
                                    <SelectItem value="4-bed">4+ Bedroom Home</SelectItem>
                                    <SelectItem value="5-plus">Large Estate (5+)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={calcForm.control}
                            name="moveDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold text-slate-700">Target Move Date</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input {...field} type="date" className="w-full bg-slate-50 border-2 border-slate-100 p-4 pl-12 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-medium" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Additional Services */}
                        <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Step 2: Add-Ons</label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { id: "packing", label: "Full Packing", icon: Box },
                              { id: "storage", label: "Temp Storage", icon: Warehouse },
                              { id: "specialty", label: "Specialty Items", icon: Music }
                            ].map((addon) => (
                              <button
                                key={addon.id}
                                type="button"
                                onClick={() => calcForm.setValue(addon.id as any, !watchedValues[addon.id as keyof typeof watchedValues])}
                                className={cn(
                                  "p-4 rounded-2xl border-2 transition-all flex items-center gap-3",
                                  watchedValues[addon.id as keyof typeof watchedValues]
                                    ? "bg-blue-50 border-blue-600 text-blue-700" 
                                    : "bg-white border-slate-100 text-slate-600 hover:border-blue-100"
                                )}
                              >
                                <addon.icon className="w-5 h-5" />
                                <span className="font-bold text-xs uppercase">{addon.label}</span>
                                {watchedValues[addon.id as keyof typeof watchedValues] && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xl py-10 rounded-2xl shadow-xl">
                          BOOK THIS ESTIMATE
                        </Button>
                      </form>
                    </Form>
                  </div>

                  {/* SUMMARY SIDE */}
                  <div className="bg-blue-600 text-white p-8 md:p-12 flex flex-col">
                    <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">Move Estimate</h3>
                    
                    <div className="flex-grow space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="opacity-70 font-medium">Base Service ({watchedValues.moveType})</span>
                        <span className="font-bold">${MOVE_PRICES[watchedValues.moveType as keyof typeof MOVE_PRICES] || 0}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="opacity-70 font-medium">Capacity Factor ({watchedValues.homeSize})</span>
                        <span className="font-bold">x{SIZE_MULTIPLIERS[watchedValues.homeSize]}</span>
                      </div>
                      
                      {watchedValues.packing && (
                        <div className="flex justify-between items-center text-emerald-300">
                          <span className="font-medium flex items-center gap-2"><Plus className="w-3 h-3" /> Full Packing</span>
                          <span className="font-bold">+$250</span>
                        </div>
                      )}
                      {watchedValues.storage && (
                        <div className="flex justify-between items-center text-emerald-300">
                          <span className="font-medium flex items-center gap-2"><Plus className="w-3 h-3" /> Storage</span>
                          <span className="font-bold">+$150</span>
                        </div>
                      )}
                      {watchedValues.specialty && (
                        <div className="flex justify-between items-center text-emerald-300">
                          <span className="font-medium flex items-center gap-2"><Plus className="w-3 h-3" /> Specialty</span>
                          <span className="font-bold">+$300</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-12">
                      <p className="text-[10px] font-mono text-blue-200 uppercase tracking-widest mb-2">Estimated Starting Price</p>
                      <p className="text-6xl font-black">${estimate}</p>
                      <p className="text-xs text-blue-100/60 mt-4 leading-relaxed">
                        *This is a baseline estimate. Final pricing depends on exact distance, weight, and inventory verification.
                      </p>
                    </div>

                    <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/10 text-center">
                      <p className="text-xs font-bold uppercase tracking-widest mb-2">Reserve Now</p>
                      <p className="text-sm font-medium">Pay nothing today. Flexible cancellation up to 48 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SERVICE OFFERINGS GRID */}
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Full Service, <span className="text-blue-600">Zero Effort.</span></h2>
                <p className="text-xl text-slate-600 font-medium">Strategic moving solutions for every life transition.</p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Local Moving", desc: "Same-day service, hourly rates, and deep neighborhood expertise to get you settled fast.", icon: Home, color: "bg-blue-600" },
                { title: "Long-Distance", desc: "Cross-country coordination with real-time tracking and guaranteed delivery windows.", icon: Truck, color: "bg-orange-500" },
                { title: "Commercial", desc: "Expert office relocations with minimal downtime. After-hours and weekend service available.", icon: Building2, color: "bg-slate-900" },
                { title: "Packing Services", desc: "Full or partial packing. High-quality supplies included. Fragile and heirloom specialists.", icon: Box, color: "bg-emerald-600" },
                { title: "Secure Storage", desc: "Climate-controlled, short and long-term units in our 24/7 monitored facilities.", icon: Warehouse, color: "bg-purple-600" },
                { title: "Specialty Items", desc: "Certified handling for pianos, pool tables, antiques, and fine artwork.", icon: Music, color: "bg-rose-600" },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <Card className="h-full border-none shadow-xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-slate-50 rounded-[2.5rem]">
                    <CardContent className="pt-12 pb-12 px-10 flex flex-col items-center text-center h-full">
                      <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 text-white transition-transform group-hover:scale-110 shadow-lg", s.color)}>
                        <s.icon className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black mb-4 text-slate-900 leading-tight uppercase tracking-tight">{s.title}</h3>
                      <p className="text-slate-500 leading-relaxed font-medium mb-8 flex-grow">{s.desc}</p>
                      <button onClick={() => scrollTo('calculator')} className="mt-auto text-blue-600 font-black flex items-center gap-2 group-hover:gap-4 transition-all uppercase text-xs tracking-[0.2em]">
                        Get details <ArrowRight className="w-4 h-4" />
                      </button>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. THE WHY SWIFTMOVE SECTION */}
        <section id="why-us" className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <FadeIn>
                    <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">THE SWIFT <span className="text-blue-500 italic">ADVANTAGE</span></h2>
                    <p className="text-xl text-slate-400 mb-12 font-medium leading-relaxed">We've completed 12,000+ stress-free moves by refusing to use synthetic contractors or cut corners.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      {[
                        { title: "Fully Insured", desc: "Comprehensive damage protection on every item.", icon: ShieldCheck },
                        { title: "No Hidden Fees", desc: "What you see is what you pay. Period.", icon: Clock },
                        { title: "Tracked Trucks", desc: "Real-time GPS updates on your inventory.", icon: MapPin },
                        { title: "Pro Crew", desc: "100% full-time employees, no day labor.", icon: Users },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                            <item.icon className="w-6 h-6 text-blue-400" />
                          </div>
                          <h4 className="text-xl font-black uppercase tracking-tight">{item.title}</h4>
                          <p className="text-slate-500 font-medium">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
               </div>
               
               <FadeIn delay={0.2}>
                  <div className="bg-white rounded-[3rem] p-12 text-slate-900 shadow-2xl relative overflow-hidden">
                    <h3 className="text-3xl font-black mb-8 uppercase tracking-tight text-blue-600">Stress-Free Promise</h3>
                    <ul className="space-y-6">
                      {[
                        { label: "Transparent Rates", text: "Honest hourly and flat-rate options provided upfront." },
                        { label: "Elite Packaging", text: "Double-walled boxes and industrial wrap for fragile goods." },
                        { label: "Precise Timing", text: "If we're more than 30 mins late, your first hour is on us." }
                      ].map((p, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <Check className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-black uppercase text-sm text-slate-900 tracking-widest">{p.label}</p>
                            <p className="text-slate-500 font-medium">{p.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                       <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Customer Spotlight</p>
                       <p className="text-slate-700 italic">"I've moved 4 times in 5 years. SwiftMove was the only crew that didn't scratch a single wall. Truly professional."</p>
                       <p className="mt-4 font-bold text-slate-900">— Michael R., Dallas</p>
                    </div>
                  </div>
               </FadeIn>
            </div>
          </div>
        </section>

        {/* 6. THE PROCESS (Simple 5-step) */}
        <section id="process" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 uppercase tracking-tighter">The Swift <span className="text-blue-600">Roadmap</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Free Quote", desc: "Instant online estimate or detailed in-home video survey.", icon: Search },
                { step: "02", title: "Secure Date", desc: "Flexible booking with immediate digital confirmation.", icon: CalendarIcon },
                { step: "03", title: "Prep Phase", desc: "Receive packing guides and supply delivery to your door.", icon: Package },
                { step: "04", title: "Swift Day", desc: "Pro crew arrives, loads with care, and departs on schedule.", icon: Truck },
                { step: "05", title: "Settle In", desc: "Unpacking help and debris removal. Enjoy your new space!", icon: CheckCircle2 },
              ].map((s, i) => (
                <div key={i} className="relative group">
                  <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-100 h-full transition-transform group-hover:-translate-y-2">
                    <span className="text-5xl font-black text-slate-50 absolute top-4 right-4">{s.step}</span>
                    <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6">
                      <s.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-black mb-4 text-slate-900 uppercase tracking-tighter">{s.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{s.desc}</p>
                  </div>
                  {i < 4 && <div className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] text-blue-200"><ChevronRight className="w-8 h-8" /></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PRICING TRANSPARENCY */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-slate-950 rounded-[3rem] p-12 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight text-center">PRICING <span className="text-orange-400">INTEGRITY</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 underline decoration-orange-400 underline-offset-8">Local Move Factors</h4>
                    <ul className="space-y-4 text-slate-400">
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Hourly Rate (2 Men)</span> <span className="text-white font-bold">$120-$150/hr</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Truck & Fuel Fee</span> <span className="text-white font-bold">Flat $50</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Minimum Requirement</span> <span className="text-white font-bold">3 Hours</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 underline decoration-orange-400 underline-offset-8">Long Distance Factors</h4>
                    <ul className="space-y-4 text-slate-400">
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Weight of Inventory</span> <span className="text-white font-bold">Per Lb</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Total Mileage</span> <span className="text-white font-bold">Zone Based</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Insurance Options</span> <span className="text-white font-bold">Flexible</span></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-12 p-6 bg-white/5 rounded-2xl text-center border border-white/10">
                  <p className="text-orange-400 font-black text-sm uppercase tracking-[0.3em]">Special Discounts Available</p>
                  <p className="text-slate-300 mt-2">10% OFF for Seniors, Military, and Students with valid ID.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section id="faq" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-tighter">Moving <span className="text-blue-600">Intelligence</span></h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "How far in advance should I book?", a: "We recommend booking at least 2-4 weeks in advance, especially for weekend moves or during peak season (May-September). However, we can often accommodate last-minute emergency moves within 24 hours." },
                { q: "What insurance is included in my move?", a: "Every move includes Basic Liability coverage ($0.60 per lb) at no extra cost. For higher-value items, we offer Full Value Protection (FVP) which ensures repair or replacement cost for any transit damage." },
                { q: "Do you move specialty items like pianos?", a: "Yes. We have a dedicated specialty team trained in the transport of pianos, pool tables, safes, and fine artwork. These items require specialized equipment and crating which we provide." },
                { q: "How do you handle cancellations?", a: "We offer full refund of your deposit for any cancellation made at least 48 hours before the scheduled move time. Cancellations under 48 hours may incur a small rescheduling fee." },
                { q: "What items will you NOT move?", a: "By law and for safety, we cannot transport flammable liquids (gasoline, propane), fireworks, perishables, or live plants across state lines. Please contact us for a full list of prohibited items." },
              ].map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-slate-100 rounded-2xl px-6">
                  <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 9. FINAL CTA SECTION */}
        <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=2070&auto=format&fit=crop"
              alt="Moving truck on highway"
              fill
              className="object-cover"
              data-ai-hint="moving truck"
            />
          </div>
          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none">Your Next Chapter <br/><span className="text-orange-400 underline decoration-white underline-offset-8">Starts Now.</span></h2>
              <p className="text-2xl text-blue-50 mb-12 max-w-3xl mx-auto font-medium opacity-90 leading-relaxed">Join 12,000+ happy families who moved stress-free with SwiftMove. Your belongings are safe in our hands.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Button onClick={() => scrollTo('calculator')} size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-slate-100 font-black text-3xl px-16 py-10 h-auto rounded-[2rem] shadow-2xl transition-all">
                  GET MY QUOTE
                </Button>
                <a href="tel:8005557943" className="w-full sm:w-auto flex items-center justify-center gap-4 text-3xl font-black hover:text-orange-400 transition-colors">
                  <Phone className="w-10 h-10" /> (800) 555-7943
                </a>
              </div>
              <p className="mt-12 text-blue-200 font-mono text-sm tracking-[0.3em] uppercase">No robots. Talk to a real moving expert in under 2 mins.</p>
            </FadeIn>
          </div>
        </section>

      </main>

      {/* 10. FOOTER */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Truck className="w-7 h-7" />
                </div>
                <span className="text-2xl font-black tracking-tighter">SWIFTMOVE</span>
              </div>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">The nation's premier professional moving partner. Stress-free residential and commercial relocations since 2009.</p>
              <div className="flex gap-1 text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Our Reach</h4>
              <ul className="space-y-4 text-slate-500 font-bold uppercase text-xs tracking-widest">
                <li className="hover:text-blue-400 cursor-pointer">Local Moves</li>
                <li className="hover:text-blue-400 cursor-pointer">State-to-State</li>
                <li className="hover:text-blue-400 cursor-pointer">Office Relocation</li>
                <li className="hover:text-blue-400 cursor-pointer">Employee Transfer</li>
                <li className="hover:text-blue-400 cursor-pointer">Furniture Delivery</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Direct Path</h4>
              <ul className="space-y-6 text-slate-500 font-bold">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">Global HQ: 1200 Logistics Way<br/>Austin, TX 78744</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">(800) 555-SWIFT</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-sm uppercase tracking-widest text-orange-400">24/7 Support Active</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Booking Hours</h4>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Mon - Fri</span> <span className="text-blue-400">7am - 9pm</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Saturday</span> <span className="text-blue-400">8am - 6pm</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="text-blue-400">9am - 4pm</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <p>&copy; {new Date().getFullYear()} SwiftMove Movers. DOT #992837 | MC #123456. All rights reserved.</p>
            <div className="flex gap-8">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Damage Policy</button>
            </div>
          </div>
        </div>
      </footer>
      
      {/* 11. STICKY MOBILE CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => scrollTo('calculator')} className="w-full bg-orange-500 text-white font-black py-8 text-xl shadow-[0_10px_30px_rgba(249,115,22,0.5)] rounded-[2rem] flex items-center justify-center gap-3 border-2 border-orange-400/20 backdrop-blur-sm">
          <Truck className="w-6 h-6" />
          GET MY QUOTE
        </Button>
      </div>

    </div>
  );
}
