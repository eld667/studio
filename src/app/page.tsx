
"use client";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { motion } from "framer-motion";
import { ProjectCard } from "@/app/ProjectCard";
import { ClipboardSignature, Code, Rocket, CheckCircle, TrendingUp, Smartphone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AnimatedSubheadline } from "./AnimatedWords";
import React from "react";
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


function BentoGridShowcase() {
  const BentoCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("relative p-6 bg-gray-900 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:border-blue-500/50 hover:[box-shadow:0_0_20px_theme(colors.blue.500/20)]", className)}>
      {children}
    </div>
  );

  return (
    <motion.section
      className="w-full max-w-5xl mx-auto py-24 px-6"
    >
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Built for Growth */}
          <BentoCard className="md:col-span-2">
            <FadeIn>
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Built for Growth</h3>
              <p className="text-gray-400">
                We don't just design pretty pages. We engineer digital funnels that turn visitors into paying customers.
              </p>
            </FadeIn>
          </BentoCard>
          
          {/* Card 2: Blazing Fast Speed */}
          <BentoCard className="flex flex-col items-center justify-center text-center">
            <FadeIn delay={0.2}>
              <div className="relative flex items-center justify-center w-24 h-24 mb-3">
                <div className="absolute inset-0 bg-green-500/10 rounded-full" />
                <div className="absolute inset-2 border-2 border-green-400 rounded-full" />
                <span className="text-4xl font-bold text-green-300">100</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Blazing Fast Speed</h3>
              <p className="text-gray-400">Zero lag. Instant loading.</p>
            </FadeIn>
          </BentoCard>

          {/* Card 3: Mobile Perfection */}
          <BentoCard className="flex flex-col items-center justify-center text-center">
            <FadeIn delay={0.3}>
              <Smartphone className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Mobile Perfection</h3>
              <p className="text-gray-400">Flawless experience on every device, from iPhone to Desktop.</p>
            </FadeIn>
          </BentoCard>

          {/* Card 4: SEO Ready Foundation */}
          <BentoCard className="md:col-span-2">
            <FadeIn delay={0.4}>
              <Search className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">SEO Ready Foundation</h3>
              <p className="text-gray-400">
                Structured correctly so Google can find and rank your business.
              </p>
            </FadeIn>
          </BentoCard>
        </div>
      </FadeIn>
    </motion.section>
  );
}


function CaseStudyShowcase() {
  return (
    <motion.section
      id="our-work"
      className="w-full max-w-5xl mx-auto py-24 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
          Our Work
        </h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-lg text-gray-400 max-w-2xl text-center mx-auto mb-24">
          We don't build generic templates. We craft a unique solution for each specific goal. Here are our three core 'Purposes'.
        </p>
      </FadeIn>
      
      {/* --- Project 1: Horizon Architecture --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
        <FadeIn>
          <div>
            <p className="text-sm font-bold text-blue-400 mb-2">Real Estate & Design</p>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Minimalist Luxury Showcase
            </h3>
            <p className="text-gray-400 text-lg mb-4">
              A clean, image-centric portfolio for a high-end architecture firm. Features smooth gallery transitions, property filtering, and a "Virtual Tour" request system.
            </p>
            <span className="inline-block bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-full">
              Brand Authority
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
            <ProjectCard
              title="Horizon Architecture"
              description="A clean, image-centric portfolio for a high-end architecture firm."
              imageUrl="https://picsum.photos/seed/4/600/400"
              href="/demos/horizon"
              data-ai-hint="architecture building"
            />
        </FadeIn>
      </div>

      {/* --- Project 2: Apex Plumbing Solutions --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
        <FadeIn className="md:order-last">
          <div>
            <p className="text-sm font-bold text-emerald-400 mb-2">Local Service Business</p>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
              Lead Generation Engine
            </h3>
            <p className="text-gray-400 text-lg mb-4">
              A mobile-first design focused on speed and instant booking. Replaced a static brochure site with a dynamic lead funnel, featuring one-tap calling and automated service area mapping.
            </p>
            <span className="inline-block bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full">
              +40% Conversion Rate
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="md:order-first">
          <ProjectCard
            title="Apex Plumbing Solutions"
            description="A mobile-first design for a local plumber."
            imageUrl="https://picsum.photos/seed/2/600/400"
            href="/demos/apex-plumbing"
            data-ai-hint="plumbing tools"
          />
        </FadeIn>
      </div>

      {/* --- Project 3: Lumina Bistro --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <FadeIn>
          <div>
            <p className="text-sm font-bold text-purple-400 mb-2">Hospitality & Dining</p>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Atmospheric Visual Experience
            </h3>
            <p className="text-gray-400 text-lg mb-4">
              An image-heavy, immersive site capturing the restaurant's evening ambiance. Features a live menu integration and a seamless reservation system that reduces table gaps.
            </p>
            <span className="inline-block bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold px-3 py-1 rounded-full">
              Brand Elevation
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
            <ProjectCard
              title="Lumina Bistro"
              description="An immersive site for a fine-dining restaurant."
              imageUrl="https://picsum.photos/seed/3/600/400"
              href="#"
              data-ai-hint="restaurant interior"
            />
        </FadeIn>
      </div>

    </motion.section>
  );
}


function ThreeStepPlan() {
  return (
    <motion.section
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

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto py-24 px-6"
    >
      <FadeIn>
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
        Let's Build Your New Website
      </h2>
      </FadeIn>
      <div className="max-w-xl mx-auto">
        {isSuccess ? (
          <Card className="bg-green-900/20 border-green-500/50 p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
            <p className="text-gray-300">I'll be in touch within 24 hours.</p>
          </Card>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FadeIn>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-900 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FadeIn>
              <FadeIn delay={0.2}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="bg-gray-900 border-white/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </FadeIn>
              <FadeIn delay={0.3}>
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-900 border-white/10">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="web-design">Web Design</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </FadeIn>
              <FadeIn delay={0.4}>
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
                        className="bg-gray-900 border-white/10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </FadeIn>
              <FadeIn delay={0.5}>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Start My Project"}
              </Button>
              </FadeIn>
            </form>
          </Form>
        )}
      </div>
    </motion.section>
  );
}


export default function Home() {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
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
      <Header onGetInTouchClick={(e) => handleScroll(e, 'contact')} />
      <main className="flex-grow">
        <Hero onExploreClick={(e) => handleScroll(e, 'our-work')}>
          <p className="text-lg text-gray-400 max-w-2xl text-center mt-6">
            In 2025, a generic website is costing you customers. We build high-trust, purpose-driven sites that turn visitors into clients.
          </p>
        </Hero>
        <BentoGridShowcase />
        <CaseStudyShowcase />
        <ThreeStepPlan />
        <ContactMe />
      </main>
    </div>
  );
}
