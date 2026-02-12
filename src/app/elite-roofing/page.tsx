'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Menu, 
  X, 
  CloudRain, 
  Home, 
  Building2, 
  Search,
  Award,
  AlertTriangle,
  Zap,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '../FadeIn';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
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

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Valid phone number required." }),
  serviceType: z.string().min(1, { message: "Please select a service." }),
  message: z.string().optional(),
});

const services = [
  {
    title: "Storm Damage Repair",
    description: "24/7 emergency response with expert insurance claim assistance to get your home dry fast.",
    icon: CloudRain,
    color: "bg-blue-500"
  },
  {
    title: "Full Roof Replacement",
    description: "Complete removal and professional installation of high-quality shingles with a 25-year warranty.",
    icon: Home,
    color: "bg-emerald-500"
  },
  {
    title: "Commercial Roofing",
    description: "Specialized TPO, EPDM, and flat roof systems designed for industrial buildings and durability.",
    icon: Building2,
    color: "bg-purple-500"
  },
  {
    title: "Roof Inspections",
    description: "Detailed 50-point inspection reports for real estate transactions, maintenance, or insurance.",
    icon: Search,
    color: "bg-orange-500"
  }
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Plano, TX",
    text: "They handled everything with our insurance company. New roof in 3 weeks, zero stress!",
    rating: 5
  },
  {
    name: "Robert Chen",
    location: "Frisco, TX",
    text: "Professional crew, cleaned up perfectly, and the 25-year warranty gives us peace of mind.",
    rating: 5
  },
  {
    name: "Jennifer Lopez",
    location: "Dallas, TX",
    text: "Called at 2 AM after a storm. Someone actually answered and had a crew out by 8 AM.",
    rating: 5
  }
];

const faq = [
  {
    q: "How much does a new roof cost?",
    a: "Every roof is different. We provide free detailed estimates after inspection. Most residential roofs range $8,000-$18,000."
  },
  {
    q: "How long does installation take?",
    a: "Most residential roofs are completed in 1-2 days. Larger or complex roofs may take 3-4 days."
  },
  {
    q: "Do you work with insurance?",
    a: "Absolutely. We have insurance specialists on staff who meet adjusters and ensure you get fair coverage."
  }
];

export default function EliteRoofingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const heroImage = PlaceHolderImages.find(img => img.id === 'roof-hero');
  const stormImage = PlaceHolderImages.find(img => img.id === 'roof-storm');
  const commercialImage = PlaceHolderImages.find(img => img.id === 'roof-commercial');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", serviceType: "", message: "" },
  });

  const { formState: { isSubmitting }, reset } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      subject: `Roofing Inquiry: ${values.serviceType}`, // Mapping service to subject for firestore rules compatibility
      timestamp: new Date().toISOString(),
    };
    
    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      reset();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Could not send your request. Please call (214) 555-ROOF directly.",
      });
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* --- TOP BAR --- */}
      <div className="bg-slate-900 text-white py-2 px-6 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> 24/7 Emergency Service</span>
            <span className="hidden sm:inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Dallas, TX & Surrounding Areas</span>
          </div>
          <a href="tel:2145557663" className="hover:text-orange-400 transition-colors font-bold">Call Now: (214) 555-ROOF</a>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-[60] bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center text-white">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">ELITE ROOFING</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Solutions</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
            <button onClick={() => scrollTo('services')} className="hover:text-blue-600 transition-colors">Services</button>
            <button onClick={() => scrollTo('why-us')} className="hover:text-blue-600 transition-colors">Why Choose Us</button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-blue-600 transition-colors">Reviews</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-blue-600 transition-colors">FAQ</button>
            <Button onClick={() => scrollTo('quote')} className="bg-orange-600 hover:bg-orange-700 text-white px-6">
              Get Free Estimate
            </Button>
          </div>

          <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* --- MOBILE NAV --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[70] bg-white lg:hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="font-bold text-xl">ELITE ROOFING</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl font-bold text-slate-900">
                <button onClick={() => scrollTo('services')}>Services</button>
                <button onClick={() => scrollTo('why-us')}>Why Us</button>
                <button onClick={() => scrollTo('testimonials')}>Reviews</button>
                <button onClick={() => scrollTo('quote')}>Get Quote</button>
                <a href="tel:2145557663" className="mt-8">
                  <Button className="w-full bg-orange-600 text-white py-8 text-xl shadow-xl">
                    Call (214) 555-7663
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[85vh] flex items-center bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            {heroImage?.imageUrl && (
              <Image
                src={heroImage.imageUrl}
                alt="Elite Roofing Project"
                fill
                className="object-cover"
                priority
                data-ai-hint="roofing work"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6">
            <div className="max-w-3xl">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                  <Star className="w-4 h-4 fill-current" />
                  Trusted by 3,000+ DFW Homeowners
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                  Stop The Leak Before It <span className="text-orange-500">Ruins Your Home.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                  Family-owned roofing experts specializing in storm damage, full replacements, and commercial systems. 25-Year warranty included.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button onClick={() => scrollTo('quote')} size="lg" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-black text-xl px-10 py-8 h-auto shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:scale-105 transition-all uppercase tracking-tight">
                    Get Free Quote Now
                  </Button>
                  <a href="tel:2145557663" className="w-full sm:w-auto flex items-center justify-center gap-2 text-xl font-bold hover:text-orange-500 transition-colors p-4">
                    <Phone className="w-6 h-6" /> (214) 555-ROOF
                  </a>
                </div>

                <div className="mt-12 flex flex-wrap gap-6 items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Check className="text-blue-500" /> A+ BBB Rated</span>
                  <span className="flex items-center gap-2"><Check className="text-blue-500" /> Licensed & Insured</span>
                  <span className="flex items-center gap-2"><Check className="text-blue-500" /> 24/7 Response</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- PAIN-AGITATE-SOLVE SECTION --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <div className="space-y-6">
                  <div className="inline-block p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">
                    Don't Let a Minor Leak Turn Into a <span className="text-red-600">Major Disaster.</span>
                  </h2>
                  <p className="text-lg text-slate-600">
                    A small leak today can lead to toxic mold, structural wood rot, and catastrophic interior damage within weeks. Waiting for your insurance company to "get around to it" is a risk you can't afford.
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border-l-4 border-red-500 shadow-sm">
                      <CloudRain className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <p className="font-bold text-slate-800">Storm Season is Here: Dallas hailstorms can compromise your roof's integrity in seconds.</p>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border-l-4 border-blue-500 shadow-sm">
                      <Zap className="w-6 h-6 text-blue-500 flex-shrink-0" />
                      <p className="font-bold text-slate-800">The Solution: Elite Roofing responds in 24 hours to tarp your roof and stabilize the damage.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  {stormImage?.imageUrl && (
                    <Image
                      src={stormImage.imageUrl}
                      alt="Storm Damage Roof"
                      fill
                      className="object-cover"
                      data-ai-hint="roof damage"
                    />
                  )}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur rounded-2xl shadow-xl">
                    <p className="text-slate-900 font-black text-lg mb-1">REAL STORM DAMAGE REPAIR</p>
                    <p className="text-slate-600 text-sm">We provide full photographic evidence for your insurance adjuster.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- SERVICES GRID --- */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Our High-Trust Services</h2>
                <p className="text-xl text-slate-600 font-medium">Outcome-focused roofing solutions with guaranteed durability.</p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <FadeIn key={i} delay={i * 0.1}>
                    <Card className="h-full border-none shadow-lg hover:-translate-y-2 transition-all duration-300 group overflow-hidden bg-white">
                      <CardContent className="pt-10 pb-12 px-8 flex flex-col items-center text-center">
                        <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mb-8 text-white transition-transform group-hover:scale-110", service.color)}>
                          <Icon className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-black mb-4 text-slate-900 uppercase tracking-tight">{service.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-medium mb-8">{service.description}</p>
                        <button onClick={() => scrollTo('quote')} className="mt-auto text-blue-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                          Get details <ArrowRight className="w-4 h-4" />
                        </button>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US --- */}
        <section id="why-us" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-24 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <FadeIn>
                      <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">THE ELITE <span className="text-blue-500">ADVANTAGE</span></h2>
                      <p className="text-xl text-slate-400 mb-12 font-medium">We've protected 3,000+ DFW homes by refusing to cut corners and mastering the insurance game.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                          { title: "24/7 Response", desc: "Always an expert on the line", icon: Clock },
                          { title: "Insurance Pros", desc: "Adjuster-level reporting", icon: Award },
                          { title: "25-Yr Warranty", desc: "Longest in the industry", icon: ShieldCheck },
                          { title: "DFW Local", desc: "Not a 'Storm Chaser'", icon: MapPin },
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            <item.icon className="w-10 h-10 text-blue-500" />
                            <h4 className="text-xl font-bold">{item.title}</h4>
                            <p className="text-slate-500 font-medium">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </FadeIn>
                  </div>
                  <FadeIn delay={0.2}>
                     <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
                        {commercialImage?.imageUrl && (
                          <Image
                            src={commercialImage.imageUrl}
                            alt="Commercial Roofing Dallas"
                            fill
                            className="object-cover"
                            data-ai-hint="commercial roof"
                          />
                        )}
                        <div className="absolute inset-0 bg-slate-900/40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-white/95 backdrop-blur p-8 rounded-3xl text-slate-950 text-center shadow-2xl">
                              <p className="text-4xl font-black mb-1">500+</p>
                              <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">5-Star Google Reviews</p>
                              <div className="flex justify-center gap-1 mt-3">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />)}
                              </div>
                           </div>
                        </div>
                     </div>
                  </FadeIn>
               </div>
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section id="testimonials" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">Real Results for Real Texans</h2>
                <div className="flex items-center justify-center gap-4 text-slate-600 font-bold">
                  <div className="flex gap-1 text-orange-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  </div>
                  <span>4.9/5 from 3,000+ Clients</span>
                </div>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col h-full hover:border-blue-500/50 transition-colors">
                    <p className="text-lg italic text-slate-700 mb-8 leading-relaxed font-medium">"{t.text}"</p>
                    <div className="mt-auto">
                      <div className="font-black text-slate-900 uppercase tracking-tight">{t.name}</div>
                      <div className="text-slate-500 text-sm font-bold">{t.location}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section id="faq" className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <h2 className="text-4xl font-black text-slate-900 mb-12 text-center uppercase tracking-tight">ROOFING INTEL (FAQ)</h2>
              </FadeIn>
              <div className="space-y-8">
                {faq.map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="text-xl font-black text-slate-900 mb-3">Q: {item.q}</h4>
                      <p className="text-slate-600 font-medium leading-relaxed">A: {item.a}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- LEAD CAPTURE FORM SECTION --- */}
        <section id="quote" className="py-24 bg-blue-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">LOCK IN YOUR <span className="text-orange-400">FREE ESTIMATE</span> TODAY</h2>
                  <p className="text-xl text-blue-100 mb-12 font-medium">Limited spots available for inspections this week. We never share your data. Zero obligation.</p>
                  
                  <ul className="space-y-6">
                    {[
                      "Insurance-specialist adjuster meeting",
                      "Full 50-point photo inspection",
                      "Exact material cost breakdown",
                      "25-Year warranty registration details"
                    ].map((point, i) => (
                      <li key={i} className="flex items-center gap-4 text-white font-bold">
                        <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12 p-8 bg-blue-800/40 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <p className="text-white/60 uppercase text-xs font-black tracking-widest mb-4">Urgent Help Needed?</p>
                    <a href="tel:2145557663" className="text-3xl font-black text-white hover:text-orange-400 transition-colors flex items-center gap-4">
                       <Phone className="w-8 h-8 text-orange-400" /> (214) 555-ROOF
                    </a>
                  </div>
                </FadeIn>
              </div>

              <div>
                <FadeIn delay={0.2}>
                  <Card className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl">
                    {isSuccess ? (
                      <div className="text-center py-16 space-y-6">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                          <Check className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900">MISSION RECEIVED</h3>
                        <p className="text-slate-500 font-bold">A roofing specialist will contact you within 60 minutes.</p>
                        <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-8 border-slate-200">Submit Another Request</Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <h3 className="text-2xl font-black text-slate-900 text-center mb-8 uppercase tracking-tight">Mission Parameters</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-bold text-slate-700">Full Name</FormLabel>
                                  <FormControl>
                                    <input {...field} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-medium" placeholder="John Doe" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-bold text-slate-700">Phone Number</FormLabel>
                                  <FormControl>
                                    <input {...field} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-medium" placeholder="(214) 000-0000" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold text-slate-700">Email Address</FormLabel>
                                <FormControl>
                                  <input {...field} type="email" className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-medium" placeholder="john@example.com" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold text-slate-700">Required Service</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-xl h-auto focus:ring-0 focus:border-blue-500 font-medium">
                                      <SelectValue placeholder="Select service type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-white">
                                    <SelectItem value="Storm Damage">Storm Damage Repair</SelectItem>
                                    <SelectItem value="Full Replacement">Full Roof Replacement</SelectItem>
                                    <SelectItem value="Commercial">Commercial Roofing</SelectItem>
                                    <SelectItem value="Inspection">Free Roof Inspection</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black text-2xl py-8 h-auto rounded-2xl shadow-xl transition-all uppercase tracking-tight mt-4"
                          >
                            {isSubmitting ? "SENDING..." : "SCHEDULE FREE ESTIMATE"}
                          </Button>
                          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                            🔒 128-bit Encryption • Private Data • Verified local biz
                          </p>
                        </form>
                      </Form>
                    )}
                  </Card>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight">ELITE ROOFING</span>
              </div>
              <p className="text-slate-500 font-bold mb-8">Protecting what matters most since 2009. Family owned and DFW operated.</p>
              <div className="flex gap-1 text-orange-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Service Map</h4>
              <ul className="space-y-4 text-slate-500 font-bold">
                <li>Dallas</li>
                <li>Fort Worth</li>
                <li>Plano</li>
                <li>Frisco</li>
                <li>Irving</li>
                <li>Richardson</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Direct Access</h4>
              <ul className="space-y-6 text-slate-500 font-bold">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>4125 Commerce St<br/>Dallas, TX 75226</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>(214) 555-ROOF</span>
                </li>
                <li className="flex items-center gap-3">
                  <CloudRain className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span>24/7 Emergency Tarping</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Hours</h4>
              <ul className="space-y-4 text-slate-500 font-bold">
                <li className="flex justify-between"><span>Mon - Fri</span> <span>7am - 7pm</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>8am - 5pm</span></li>
                <li className="flex justify-between text-blue-400"><span>Emergency</span> <span>24 / 7 / 365</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-12 text-center text-slate-600 font-bold text-xs">
            <p>&copy; {new Date().getFullYear()} Elite Roofing Solutions. License #R-12345. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <a href="tel:2145557663">
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-7 text-lg shadow-[0_10px_30px_rgba(234,88,12,0.5)] rounded-2xl flex items-center justify-center gap-3">
            <Phone className="w-5 h-5" />
            CALL NOW: (214) 555-ROOF
          </Button>
        </a>
      </div>
    </div>
  );
}
