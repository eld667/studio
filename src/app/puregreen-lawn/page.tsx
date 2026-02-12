
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
  Leaf, 
  Sprout, 
  Shovel, 
  Calendar,
  Award,
  AlertCircle,
  Zap,
  Check,
  Heart,
  Droplets
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
    title: "Organic Lawn Treatment",
    description: "Our core natural fertilization program builds soil health without synthetic toxins.",
    icon: Sprout,
    color: "bg-emerald-600"
  },
  {
    title: "Organic Weed Control",
    description: "Glyphosate-free pre-emergent and spot treatments that target weeds, not the environment.",
    icon: Leaf,
    color: "bg-green-600"
  },
  {
    title: "Core Aeration",
    description: "Professional soil decompaction to allow air, water, and nutrients to reach deep roots.",
    icon: Shovel,
    color: "bg-blue-600"
  },
  {
    title: "Seasonal Cleanup",
    description: "Full-service debris removal and preparation to keep your Nashville curb appeal high.",
    icon: Calendar,
    color: "bg-orange-600"
  }
];

const testimonials = [
  {
    name: "Amanda Foster",
    location: "Brentwood, TN",
    text: "Finally not worried about my toddler playing in the yard. Our lawn looks better than ever!",
    rating: 5
  },
  {
    name: "Mike Thompson",
    location: "Franklin, TN",
    text: "Switched from a national chain and saw better results in 2 months. PureGreen knows Tennessee soil.",
    rating: 5
  },
  {
    name: "Lisa Carter",
    location: "Nashville, TN",
    text: "Honest pricing, no pushy upsells. They actually care about my lawn, not just their profit.",
    rating: 5
  }
];

const faq = [
  {
    q: "Is organic lawn care really effective?",
    a: "Yes! Our organic programs build healthier soil over time, resulting in stronger, more drought-resistant lawns that naturally resist pests and disease."
  },
  {
    q: "How much does lawn care cost?",
    a: "Our programs start at $49/month for average-sized lawns. We provide free custom quotes based on your specific yard size and soil needs."
  },
  {
    q: "Are your products safe for pets?",
    a: "Absolutely. All our treatments are 100% pet and child safe immediately after application. There is zero waiting period needed."
  }
];

export default function PureGreenLawnPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const heroImage = PlaceHolderImages.find(img => img.id === 'lawn-hero');
  const kidsImage = PlaceHolderImages.find(img => img.id === 'lawn-kids');

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
      subject: `Lawn Inquiry: ${values.serviceType}`,
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
        description: "Could not send your request. Please call (615) 555-LAWN directly.",
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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* --- TOP BAR --- */}
      <div className="bg-emerald-950 text-white py-2 px-6 text-xs md:text-sm font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> 100% Pet & Family Safe</span>
            <span className="hidden sm:inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Serving Nashville, TN</span>
          </div>
          <a href="tel:6155555296" className="hover:text-emerald-400 transition-colors font-bold">Call: (615) 555-LAWN</a>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-emerald-950 leading-none">PUREGREEN</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Lawn Care</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
            <button onClick={() => scrollTo('services')} className="hover:text-emerald-600 transition-colors">Services</button>
            <button onClick={() => scrollTo('why-us')} className="hover:text-emerald-600 transition-colors">The Pure Method</button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-emerald-600 transition-colors">Reviews</button>
            <Button onClick={() => scrollTo('quote')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full shadow-lg shadow-orange-500/20">
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
                <span className="font-black text-xl text-emerald-950">PUREGREEN</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl font-bold text-slate-900">
                <button onClick={() => scrollTo('services')}>Services</button>
                <button onClick={() => scrollTo('why-us')}>The Method</button>
                <button onClick={() => scrollTo('testimonials')}>Reviews</button>
                <button onClick={() => scrollTo('quote')}>Get Quote</button>
                <a href="tel:6155555296" className="mt-8">
                  <Button className="w-full bg-emerald-600 text-white py-8 text-xl shadow-xl rounded-2xl">
                    Call (615) 555-5296
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[85vh] flex items-center bg-emerald-950 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-50">
            {heroImage?.imageUrl && (
              <Image
                src={heroImage.imageUrl}
                alt="Beautiful Nashville Lawn"
                fill
                className="object-cover"
                priority
                data-ai-hint="green lawn"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/70 to-transparent" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6">
            <div className="max-w-3xl">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
                  <Star className="w-4 h-4 fill-current" />
                  Nashville's Highest Rated Organic Lawn Care
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
                  Stop Poisoning Your Lawn. <span className="text-emerald-400">Start Building It.</span>
                </h1>
                <p className="text-xl md:text-2xl text-emerald-50 mb-10 max-w-2xl leading-relaxed opacity-90">
                  100% organic, pet-safe lawn care engineered specifically for Tennessee soil. Get a lush yard without the synthetic chemical cocktail.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button onClick={() => scrollTo('quote')} size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-black text-xl px-10 py-8 h-auto shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-105 transition-all uppercase tracking-tight rounded-2xl">
                    Get My Free Quote
                  </Button>
                  <a href="tel:6155555296" className="w-full sm:w-auto flex items-center justify-center gap-2 text-xl font-bold hover:text-emerald-400 transition-colors p-4">
                    <Phone className="w-6 h-6 text-emerald-400" /> (615) 555-LAWN
                  </a>
                </div>

                <div className="mt-12 flex flex-wrap gap-6 items-center text-sm font-bold text-emerald-300/60 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Check className="text-emerald-400" /> 100% Organic</span>
                  <span className="flex items-center gap-2"><Check className="text-emerald-400" /> No Contracts</span>
                  <span className="flex items-center gap-2"><Check className="text-emerald-400" /> Pet & Kid Safe</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- PAIN-AGITATE-SOLVE SECTION --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <div className="space-y-6">
                  <div className="inline-block p-3 bg-red-50 rounded-2xl">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">
                    Traditional Lawn Care is a <span className="text-red-600">Chemical Trap.</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    National chains rely on synthetic fertilizers that kill soil microbes and glyphosate-based weed killers that linger in your yard. It creates a "dependency loop" where your lawn requires more chemicals every year to stay green.
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border-l-4 border-red-500">
                      <Zap className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <p className="font-bold text-slate-800">The Problem: These chemicals are tracked into your home on shoes and paws, building up in your living spaces.</p>
                    </div>
                    <div className="flex gap-4 p-5 bg-emerald-50 rounded-2xl border-l-4 border-emerald-500">
                      <Sprout className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <p className="font-bold text-emerald-900">The Solution: PureGreen restores your soil's natural balance, allowing your lawn to grow deep roots and fight off weeds on its own.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                  {kidsImage?.imageUrl && (
                    <Image
                      src={kidsImage.imageUrl}
                      alt="Children playing on green lawn"
                      fill
                      className="object-cover"
                      data-ai-hint="kids playing"
                    />
                  )}
                  <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/95 backdrop-blur-md rounded-[2rem] shadow-xl border border-emerald-100">
                    <p className="text-emerald-950 font-black text-xl mb-1 flex items-center gap-2">
                      <ShieldCheck className="text-emerald-600" /> PEACE OF MIND
                    </p>
                    <p className="text-slate-600 font-medium">Safe for kids and paws immediately. No "stay off lawn" signs required.</p>
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
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">Outcome-Focused Care</h2>
                <p className="text-xl text-slate-600 font-medium leading-relaxed">Strategic lawn maintenance designed for the specific needs of Middle Tennessee soil.</p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <FadeIn key={i} delay={i * 0.1}>
                    <Card className="h-full border-none shadow-xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white rounded-[2.5rem]">
                      <CardContent className="pt-12 pb-12 px-10 flex flex-col items-center text-center h-full">
                        <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 text-white transition-transform group-hover:scale-110 shadow-lg", service.color)}>
                          <Icon className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-black mb-4 text-slate-900 leading-tight uppercase tracking-tight">{service.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-medium mb-8 flex-grow">{service.description}</p>
                        <button onClick={() => scrollTo('quote')} className="mt-auto text-emerald-600 font-black flex items-center gap-2 group-hover:gap-4 transition-all uppercase text-xs tracking-[0.2em]">
                          Get Quote <ArrowRight className="w-4 h-4" />
                        </button>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US / THE METHOD --- */}
        <section id="why-us" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <FadeIn>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter text-emerald-950 uppercase">THE PUREGREEN <span className="text-emerald-600 italic">DIFFERENCE</span></h2>
                    <p className="text-xl text-slate-600 mb-12 font-medium leading-relaxed">We've restored 1,500+ Nashville yards by refusing to use synthetic chemical short-cuts.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      {[
                        { title: "100% Organic", desc: "No glyphosate, no synthetics", icon: Sprout },
                        { title: "No Contracts", desc: "We earn your business each visit", icon: ShieldCheck },
                        { title: "Same-Day Fix", desc: "Responsive local support", icon: Clock },
                        { title: "Soil Experts", desc: "Custom Tennessee soil analysis", icon: Award },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-emerald-600" />
                          </div>
                          <h4 className="text-xl font-black text-emerald-950 uppercase tracking-tight">{item.title}</h4>
                          <p className="text-slate-500 font-medium">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
               </div>
               <FadeIn delay={0.2}>
                  <div className="bg-emerald-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
                    <h3 className="text-3xl font-black mb-8 uppercase tracking-tight">WHY SOIL HEALTH MATTERS</h3>
                    <ul className="space-y-6">
                      {[
                        { label: "Drought Resistance", text: "Healthy soil retains 20% more water during Tennessee summers." },
                        { label: "Deep Root Growth", text: "Roots grow 3x deeper without chemical salt build-up." },
                        { label: "Natural Pest Control", text: "Beneficial microbes eat thatch and prevent lawn grubs." }
                      ].map((p, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-1">
                            <Check className="w-4 h-4 text-emerald-950" />
                          </div>
                          <div>
                            <p className="font-black uppercase text-sm text-emerald-400 tracking-widest">{p.label}</p>
                            <p className="text-emerald-100/80 font-medium">{p.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                       <p className="text-sm font-bold text-emerald-300 uppercase tracking-widest mb-2">PRO TIP</p>
                       <p className="text-emerald-100 italic">"Synthetic fertilizers are like caffeine for grass—a temporary burst followed by a crash. Organic matter is the real nutrition."</p>
                    </div>
                  </div>
               </FadeIn>
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section id="testimonials" className="py-24 bg-emerald-50/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl font-black text-emerald-950 mb-6 uppercase tracking-tight">Happy Families, Healthy Lawns</h2>
                <div className="flex items-center justify-center gap-4 text-emerald-800 font-bold">
                  <div className="flex gap-1 text-orange-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  </div>
                  <span>4.9/5 from 1,500+ Local Clients</span>
                </div>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-emerald-100 flex flex-col h-full hover:border-emerald-500/50 transition-all duration-500">
                    <div className="mb-8 flex justify-between items-start">
                       <div className="flex gap-1 text-orange-500">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <Droplets className="w-6 h-6 text-emerald-100" />
                    </div>
                    <p className="text-xl italic text-slate-700 mb-10 leading-relaxed font-medium">"{t.text}"</p>
                    <div className="mt-auto flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-black">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-emerald-950 uppercase tracking-tight">{t.name}</div>
                        <div className="text-emerald-600/60 text-xs font-black uppercase tracking-widest">{t.location}</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section id="faq" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <h2 className="text-4xl font-black text-emerald-950 mb-16 text-center uppercase tracking-tight">LAWN INTEL (FAQ)</h2>
              </FadeIn>
              <div className="grid grid-cols-1 gap-6">
                {faq.map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="p-8 bg-emerald-50/30 rounded-[2rem] border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
                      <h4 className="text-xl font-black text-emerald-950 mb-4 flex gap-3">
                        <span className="text-emerald-600">Q:</span> {item.q}
                      </h4>
                      <p className="text-slate-600 font-medium leading-relaxed pl-8 border-l-2 border-emerald-200">
                        <span className="text-emerald-600 font-black mr-2">A:</span> {item.a}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- LEAD CAPTURE FORM SECTION --- */}
        <section id="quote" className="py-24 bg-emerald-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none uppercase">LOCK IN YOUR <span className="text-emerald-950 underline decoration-orange-400">FREE ESTIMATE</span></h2>
                  <p className="text-2xl text-emerald-50 mb-12 font-medium opacity-90 leading-relaxed">No contracts. No pressure. Just a custom organic plan for your specific yard.</p>
                  
                  <ul className="space-y-8">
                    {[
                      "Complete soil pH analysis",
                      "Square footage precision measurement",
                      "Weed & pest pressure identification",
                      "Customized 12-month organic roadmap"
                    ].map((point, i) => (
                      <li key={i} className="flex items-center gap-5 text-white font-black uppercase text-sm tracking-widest">
                        <div className="w-8 h-8 bg-emerald-950 rounded-xl flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-16 p-10 bg-emerald-950 rounded-[3rem] shadow-2xl border border-white/10">
                    <p className="text-emerald-400 uppercase text-xs font-black tracking-[0.3em] mb-4">Immediate Assistance?</p>
                    <a href="tel:6155555296" className="text-4xl font-black text-white hover:text-emerald-400 transition-colors flex items-center gap-4">
                       <Phone className="w-10 h-10 text-orange-400" /> (615) 555-LAWN
                    </a>
                  </div>
                </FadeIn>
              </div>

              <div>
                <FadeIn delay={0.2}>
                  <Card className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border-none">
                    {isSuccess ? (
                      <div className="text-center py-20 space-y-8">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                          <Check className="w-12 h-12" />
                        </div>
                        <div>
                          <h3 className="text-4xl font-black text-emerald-950 mb-2 uppercase">MISSION RECEIVED</h3>
                          <p className="text-slate-500 font-bold">A lawn specialist will contact you for a virtual estimate within 4 business hours.</p>
                        </div>
                        <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-8 border-emerald-200 text-emerald-700 font-black rounded-2xl hover:bg-emerald-50">Submit Another Request</Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <div className="text-center mb-10">
                            <h3 className="text-3xl font-black text-emerald-950 uppercase tracking-tight">YARD PARAMETERS</h3>
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Free Quote • No Obligation</p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-black text-emerald-900 uppercase text-xs tracking-widest">Full Name</FormLabel>
                                  <FormControl>
                                    <input {...field} className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all font-bold" placeholder="e.g. John Smith" />
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
                                  <FormLabel className="font-black text-emerald-900 uppercase text-xs tracking-widest">Phone</FormLabel>
                                  <FormControl>
                                    <input {...field} className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all font-bold" placeholder="(615) 000-0000" />
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
                                <FormLabel className="font-black text-emerald-900 uppercase text-xs tracking-widest">Email Address</FormLabel>
                                <FormControl>
                                  <input {...field} type="email" className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all font-bold" placeholder="hello@domain.com" />
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
                                <FormLabel className="font-black text-emerald-900 uppercase text-xs tracking-widest">Service Needed</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full bg-slate-50 border-2 border-slate-100 p-7 rounded-2xl h-auto focus:ring-0 focus:border-emerald-500 font-bold">
                                      <SelectValue placeholder="Select primary goal" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-white rounded-2xl border-slate-100 shadow-2xl">
                                    <SelectItem value="Organic Fertilizer">Organic Fertilizer Program</SelectItem>
                                    <SelectItem value="Weed Control">Eco-Friendly Weed Control</SelectItem>
                                    <SelectItem value="Aeration">Core Aeration & Overseeding</SelectItem>
                                    <SelectItem value="Full Restoration">Full Lawn Restoration</SelectItem>
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
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-2xl py-10 h-auto rounded-3xl shadow-2xl shadow-emerald-600/30 transition-all uppercase tracking-tight mt-4"
                          >
                            {isSubmitting ? "TRANSMITTING..." : "SCHEDULE MY ESTIMATE"}
                          </Button>
                          <div className="flex justify-center items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-6">
                            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Private Data</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Certified Biz</span>
                          </div>
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
      <footer className="bg-emerald-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                  <Sprout className="w-7 h-7" />
                </div>
                <span className="text-2xl font-black tracking-tighter">PUREGREEN</span>
              </div>
              <p className="text-emerald-100/50 font-medium mb-8 leading-relaxed">Better soil. Safer yards. Nashville's premier organic lawn partner since 2016.</p>
              <div className="flex gap-1 text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Our Reach</h4>
              <ul className="space-y-4 text-emerald-100/50 font-bold uppercase text-xs tracking-widest">
                <li>Nashville Proper</li>
                <li>Brentwood</li>
                <li>Franklin</li>
                <li>Mount Juliet</li>
                <li>Hendersonville</li>
                <li>Green Hills</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Direct Path</h4>
              <ul className="space-y-6 text-emerald-100/50 font-bold">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm">892 Hillsboro Pike<br/>Nashville, TN 37215</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm">(615) 555-LAWN</span>
                </li>
                <li className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-sm uppercase tracking-widest text-orange-400">Pet Safe Guaranteed</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-tight">Lawn Hours</h4>
              <ul className="space-y-4 text-emerald-100/50 font-bold text-sm">
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Mon - Fri</span> <span className="text-emerald-400">7am - 6pm</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Saturday</span> <span className="text-emerald-400">8am - 2pm</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="text-red-400/50">CLOSED</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-emerald-100/30 font-bold text-[10px] uppercase tracking-[0.3em]">
            <p>&copy; {new Date().getFullYear()} PureGreen Lawn Care. TN Lic #LC-99283.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-emerald-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <a href="tel:6155555296">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-8 text-xl shadow-[0_10px_30px_rgba(5,150,105,0.5)] rounded-[2rem] flex items-center justify-center gap-3 border-2 border-emerald-400/20 backdrop-blur-sm">
            <Phone className="w-6 h-6" />
            GET FREE QUOTE
          </Button>
        </a>
      </div>
    </div>
  );
}
