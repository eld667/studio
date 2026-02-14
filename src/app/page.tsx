
"use client";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { ClipboardSignature, Code, Rocket, Check, Shield, Smartphone, Video, Mail, ArrowUpRight, ExternalLink, Cpu, BarChart3, Target, Zap, Sparkles, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "./FadeIn";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EldworkStandard } from "@/components/layout/EldworkStandard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

function CaseStudyCard({ 
  title, 
  niche, 
  description, 
  imageUrl, 
  href, 
  specs, 
  accentColor 
}: { 
  title: string; 
  niche: string; 
  description: string; 
  imageUrl: string; 
  href: string; 
  specs: string[]; 
  accentColor: string;
}) {
  return (
    <FadeIn>
      <div className="group relative bg-zinc-900/50 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="relative aspect-video lg:aspect-auto overflow-hidden">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
          </div>

          {/* Content side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className={cn("text-[10px] font-mono font-bold uppercase tracking-[0.3em] px-2 py-1 rounded bg-white/5 border border-white/10", accentColor)}>
                {niche}
              </span>
              <div className="h-px flex-grow bg-white/10" />
            </div>
            
            <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white uppercase tracking-tighter italic">
              {title}
            </h3>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {specs.map((spec, i) => (
                <span key={i} className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-black/30 px-3 py-1 rounded-full border border-white/5">
                  {spec}
                </span>
              ))}
            </div>

            <Link href={href} target="_blank">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 font-black px-10 py-8 h-auto rounded-xl uppercase tracking-tighter transition-all group/btn"
              >
                Launch Live Site <ArrowUpRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function CaseStudyShowcase() {
  const swiftmoveImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";
  const whiskyImg = PlaceHolderImages.find(img => img.id === 'whisky-vault')?.imageUrl || "https://picsum.photos/seed/whisky1/1200/800";
  const customerhubImg = PlaceHolderImages.find(img => img.id === 'customerhub-dashboard')?.imageUrl || "https://picsum.photos/seed/data/1200/800";

  return (
    <section id="work" className="w-full max-w-7xl mx-auto py-32 px-6">
      <div className="text-center mb-24">
        <FadeIn>
          <h2 className="text-4xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent uppercase italic tracking-tighter">
            Flagship Missions
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Strategic web architectures designed for high-performance business outcomes.
          </p>
        </FadeIn>
      </div>
      
      <div className="flex flex-col gap-12 md:gap-24">
        <CaseStudyCard 
          title="SwiftMove Movers"
          niche="Logistics Optimization & UX"
          description="A high-conversion multi-step quote engine that reduced booking friction by 40%. Engineered for mobile-first rapid response."
          imageUrl={swiftmoveImg}
          href="/swiftmove-movers"
          accentColor="text-blue-400"
          specs={["Real-time Estimator", "Next.js 15", "Lead Capture API"]}
        />

        <CaseStudyCard 
          title="Whisky Vault"
          niche="Premium E-commerce Experience"
          description="A gated luxury marketplace featuring a cinematic 'Vault' entry sequence and real-time secondary market value tracking."
          imageUrl={whiskyImg}
          href="/reserve-whisky"
          accentColor="text-amber-500"
          specs={["Membership Gating", "3D Cask Viewer", "Asset Valuation"]}
        />

        <CaseStudyCard 
          title="CustomerHub"
          niche="SaaS Data Dashboarding"
          description="Interactive CDP platform visualizing complex customer journeys. Features live metric simulations and usage-based pricing logic."
          imageUrl={customerhubImg}
          href="/customerhub"
          accentColor="text-purple-400"
          specs={["Live Recharts", "CDP Architecture", "Usage Sliders"]}
        />
      </div>

      {/* --- PORTFOLIO BRIDGE --- */}
      <div className="mt-32 pt-24 border-t border-white/5 text-center">
        <FadeIn>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Looking for a specific industry solution?
          </h3>
          <Link href="/portfolio">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/10 hover:bg-white/5 text-gray-400 hover:text-white px-12 py-8 h-auto rounded-full font-mono text-xs uppercase tracking-[0.3em] transition-all"
            >
              Explore Full Portfolio & Demos
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}


function ThreeStepPlan() {
  return (
    <motion.section
      id="plan"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto py-24 px-6"
    >
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
          Our Simple 3-Step Plan
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <ClipboardSignature className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">1. Strategy & Purpose</h3>
            <p className="text-gray-400">
              We define your #1 goal and the *exact* purpose of your new site.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center text-center">
            <Code className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">2. Premium Build</h3>
            <p className="text-gray-400">
              We build your site using high-end, modern tech and our 'Soul' design.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-col items-center text-center">
            <Rocket className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">3. Launch & Capture</h3>
            <p className="text-gray-400">
              Your new, purpose-driven website goes live, ready to capture leads.
            </p>
          </div>
        </FadeIn>
      </div>
    </motion.section>
  );
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  serviceType: z.string().min(1, { message: "Please select a service." }),
  message: z.string().optional(),
});

function ContactMe() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "",
      message: "",
    },
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      timestamp: new Date().toISOString(),
    };
    const leadsCollection = collection(firestore, 'leads');
    
    addDoc(leadsCollection, leadData)
      .then(() => {
        setIsSuccess(true);
        reset();
      })
      .catch((serverError) => {
        console.error("Firebase Error:", serverError);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem submitting your message. Please try again.",
        });
      });
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText('eldworkstudio.contact@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto py-24 px-6"
    >
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
          Let's Build Your New Website
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-1 flex flex-col gap-8 order-last lg:order-first">
          {/* Card 1: Strategy Call */}
          <FadeIn delay={0.2}>
            <div className="relative h-full">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 opacity-20 blur-md" />
              <Card className="relative bg-gray-900 border-white/10 p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-3">Not sure where to start?</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Let's hop on a quick 15-minute call. No pressure, just strategy. We'll clarify your needs and define the mission.
                </p>
                <Link href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button
                    size="lg"
                    className="w-full font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Book a Free Strategy Call
                  </Button>
                </Link>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  English Speaking • Available Worldwide
                </p>
              </Card>
            </div>
          </FadeIn>
          
          {/* Card 2: Direct Access */}
          <FadeIn delay={0.4}>
            <Card className="bg-gray-900 border-white/10 p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Just a quick question?</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Feel free to reach out directly via email for any inquiries.
              </p>
              <TooltipProvider>
                <Tooltip open={copied}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full font-semibold bg-gray-800/50 border-white/20 hover:bg-gray-800"
                      onClick={handleCopy}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      eldworkstudio.contact@gmail.com
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copied to clipboard!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Card>
          </FadeIn>
        </div>

        {/* --- RIGHT COLUMN: FORM --- */}
        <div className="lg:col-span-2 order-first lg:order-last">
          <FadeIn>
            <Card className="bg-gray-900/80 backdrop-blur-sm border-white/10 p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Ready to Execute? Tell me about the mission.</h3>
              {isSuccess ? (
                <div className="bg-green-900/20 border-green-500/50 rounded-lg p-6 text-center h-full flex flex-col justify-center items-center min-h-[400px]">
                  <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-gray-300">I'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/5 border-white/10 focus:bg-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="bg-white/5 border-white/10 focus:bg-white/10" />
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
                          <FormLabel>Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/5 border-white/10 focus:bg-white/10">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-900 border-white/10">
                              <SelectItem value="web-design">Web Design</SelectItem>
                              <SelectItem value="consulting">Consulting</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your project..."
                              className="bg-white/5 border-white/10 focus:bg-white/10 min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full font-semibold"
                    >
                      {isSubmitting ? "Sending..." : "Start My Project"}
                    </Button>
                  </form>
                </Form>
              )}
            </Card>
          </FadeIn>
        </div>

      </div>
    </motion.section>
  );
}


export default function Home() {
  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onScroll={handleScroll} />
      <main className="flex-grow">
        <Hero onExploreClick={(e) => handleScroll(e, 'work')}>
          <p className="text-lg text-gray-400 max-w-2xl text-center mt-6">
            In 2025, a generic website is costing you customers. We build high-trust, purpose-driven sites that turn visitors into clients.
          </p>
        </Hero>
        <CaseStudyShowcase />
        <EldworkStandard />
        <ThreeStepPlan />
        <ContactMe />
      </main>
    </div>
  );
}
