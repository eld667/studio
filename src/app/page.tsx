
"use client";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { ClipboardSignature, Code, Rocket, Check, Shield, Smartphone, Video, Mail, ArrowUpRight, ExternalLink, Cpu, BarChart3, Target, Zap, Sparkles, Globe, ArrowRight } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";

function ProjectViewport({ 
  title, 
  impact, 
  image, 
  speed, 
  href,
  height
}: { 
  title: string; 
  impact: string; 
  image: string; 
  speed: string; 
  href: string;
  height: number;
}) {
  const isMobile = useIsMobile();
  const numericSpeed = parseFloat(speed) || 7;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  const isInView = useInView(viewportRef, { amount: 0.6 });

  useEffect(() => {
    const updateHeight = () => {
      if (viewportRef.current) {
        setViewportHeight(viewportRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const scrollTarget = `calc(-100% + ${viewportHeight}px)`;

  return (
    <FadeIn>
      <div className="flex flex-col gap-6 group">
        <div className="relative">
          {/* Workstation Lid (Screen Enclosure) */}
          <div className="border-2 border-zinc-800 bg-zinc-950 px-2 pt-4 pb-2 rounded-t-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
            <div 
              ref={viewportRef}
              className="relative aspect-[16/10] overflow-hidden bg-zinc-900"
            >
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-40" />
              
              <motion.div 
                className="w-full absolute top-0 left-0"
                initial={{ y: 0 }}
                animate={isMobile && isInView ? {
                  y: scrollTarget
                } : { y: 0 }}
                whileHover={!isMobile ? {
                  y: scrollTarget
                } : undefined}
                transition={{
                  duration: isMobile ? numericSpeed * 4 : numericSpeed,
                  ease: "linear",
                  repeat: isMobile && isInView ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                <div className="relative w-full">
                  <Image 
                    src={image} 
                    alt={title} 
                    width={1440}
                    height={height}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Hinge Gap */}
          <div className="h-[2px] bg-black w-full" />
          
          {/* Workstation Base (Metallic Body) */}
          <div className="mx-[-4px] h-[14px] rounded-b-md bg-zinc-800 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 border-b-[3px] border-zinc-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]" />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-zinc-100 uppercase tracking-tight mb-1">
              {title}
            </h3>
            <p className="text-zinc-400 text-[14px] font-normal leading-relaxed min-h-[40px]">
              {impact}
            </p>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Link href={href} className="flex-1">
              <Button 
                size="sm" 
                className="w-full bg-white text-black hover:bg-white/90 font-medium uppercase text-[10px] tracking-widest h-10 rounded-none"
              >
                Launch Live Demo
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-white/20 text-white hover:bg-white/5 font-medium uppercase text-[10px] tracking-widest h-10 rounded-none"
            >
              Systems Architecture
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function CaseStudyShowcase() {
  return (
    <section id="work" className="w-full bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-medium mb-6 text-zinc-100 uppercase tracking-tight">
              Flagship Operations
            </h2>
            <p className="text-[14px] text-zinc-500 max-w-2xl mx-auto font-normal">
              High-performance digital architectures engineered for conversion.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24">
          <ProjectViewport 
            title="SwiftMove Movers"
            impact="Scaling Logistics with AI-Driven Dispatch & Real-Time UX."
            image="/images/swiftmovemoversfs.webp"
            speed="7.5s"
            href="/swiftmove-movers"
            height={5993}
          />

          <ProjectViewport 
            title="Whisky Vault"
            impact="A Premium Digital Cellar: High-End E-commerce & Branding."
            image="/images/reservewhiskyfs.webp"
            speed="7s"
            href="/reserve-whisky"
            height={5650}
          />

          <ProjectViewport 
            title="CustomerHub"
            impact="The Intelligence Hub: Advanced SaaS Data Visualization & Sync."
            image="/images/customerhubfs.webp"
            speed="9.5s"
            href="/customerhub"
            height={7355}
          />
        </div>

        <FadeIn>
          <div className="pt-16 border-t border-white/10">
            <Link href="/portfolio">
              <Button 
                className="w-full bg-white text-black hover:bg-white/90 font-medium py-6 text-sm md:text-base uppercase tracking-[0.1em] transition-all group rounded-none"
              >
                PROCEED TO FULL REPOSITORY <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
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
        <h2 className="text-2xl font-medium text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))] tracking-tight text-zinc-100">
          Our Simple 3-Step Plan
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <ClipboardSignature className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-base font-medium mb-2 text-zinc-100 tracking-tight">1. Strategy & Purpose</h3>
            <p className="text-[14px] font-normal text-zinc-400">
              We define your #1 goal and the *exact* purpose of your new site.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center text-center">
            <Code className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-base font-medium mb-2 text-zinc-100 tracking-tight">2. Premium Build</h3>
            <p className="text-[14px] font-normal text-zinc-400">
              We build your site using high-end, modern tech and our 'Soul' design.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-col items-center text-center">
            <Rocket className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-base font-medium mb-2 text-zinc-100 tracking-tight">3. Launch & Capture</h3>
            <p className="text-[14px] font-normal text-zinc-400">
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
        <h2 className="text-2xl font-medium text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))] tracking-tight text-zinc-100">
          Let's Build Your New Website
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-1 flex flex-col gap-8 order-last lg:order-first">
          <FadeIn delay={0.2}>
            <div className="relative h-full">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 opacity-20 blur-md" />
              <Card className="relative bg-gray-900 border-white/10 p-8 h-full flex flex-col">
                <h3 className="text-lg font-medium mb-3 text-zinc-100 tracking-tight">Not sure where to start?</h3>
                <p className="text-[14px] font-normal text-zinc-400 mb-6 flex-grow">
                  Let's hop on a quick 15-minute call. No pressure, just strategy. We'll clarify your needs and define the mission.
                </p>
                <Link href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button
                    size="lg"
                    className="w-full font-medium text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Book a Free Strategy Call
                  </Button>
                </Link>
                <p className="text-center text-[11px] font-mono uppercase tracking-[0.1em] text-zinc-500 mt-4">
                  English Speaking • Available Worldwide
                </p>
              </Card>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <Card className="bg-gray-900 border-white/10 p-8 h-full flex flex-col">
              <h3 className="text-lg font-medium mb-3 text-zinc-100 tracking-tight">Just a quick question?</h3>
              <p className="text-[14px] font-normal text-zinc-400 mb-6 flex-grow">
                Feel free to reach out directly via email for any inquiries.
              </p>
              <TooltipProvider>
                <Tooltip open={copied}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full font-medium bg-gray-800/50 border-white/20 hover:bg-gray-800"
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

        <div className="lg:col-span-2 order-first lg:order-last">
          <FadeIn>
            <Card className="bg-gray-900/80 backdrop-blur-sm border-white/10 p-8 h-full">
              <h3 className="text-lg font-medium mb-6 text-zinc-100 tracking-tight">Ready to Execute? Tell me about the mission.</h3>
              {isSuccess ? (
                <div className="bg-green-900/20 border-green-500/50 rounded-lg p-6 text-center h-full flex flex-col justify-center items-center min-h-[400px]">
                  <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Message Received!</h3>
                  <p className="text-[14px] font-normal text-gray-300">I'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-400 text-sm font-normal">Your Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/5 border-white/10 focus:bg-white/10 text-zinc-100 font-normal" />
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
                          <FormLabel className="text-zinc-400 text-sm font-normal">Your Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="bg-white/5 border-white/10 focus:bg-white/10 text-zinc-100 font-normal" />
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
                          <FormLabel className="text-zinc-400 text-sm font-normal">Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/5 border-white/10 focus:bg-white/10 text-zinc-100 font-normal">
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
                          <FormLabel className="text-zinc-400 text-sm font-normal">Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your project..."
                              className="bg-white/5 border-white/10 focus:bg-white/10 min-h-[120px] text-zinc-100 font-normal"
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
                      className="w-full font-medium"
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
          <p className="text-[14px] text-zinc-400 font-normal max-w-2xl text-center mt-6">
            In 2026, a generic website is costing you customers. We build high-trust, purpose-driven sites that turn visitors into clients.
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
