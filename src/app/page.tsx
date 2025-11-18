"use client";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { motion } from "framer-motion";
import { ProjectCard } from "@/app/ProjectCard";
import { ClipboardSignature, Code, Rocket, CheckCircle } from "lucide-react";
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
import { useFirestore, errorEmitter, FirestorePermissionError } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Card } from "@/components/ui/card";


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
      {/* --- SECTION MAIN TITLE --- */}
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
        Our Work
      </h2>

      <p className="text-lg text-gray-400 max-w-2xl text-center mx-auto mb-24">
        We don't build generic templates. We craft a unique solution for each specific goal. Here are our three core 'Purposes'.
      </p>

      {/* --- ACT I: THE "TRUST" BUILD --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Purpose I: Instant Trust & Lead Generation
          </h3>
          <p className="text-gray-400 text-lg">
            For local businesses, trust is everything. We build clean, professional, and fast-loading sites that prove you're the expert and make it effortless for customers to call you, not your competition.
          </p>
        </motion.div>

        {/* Project Card */}
        <ProjectCard
          title="Apex Plumbing"
          description="A high-trust site for a local US plumber."
          imageUrl="https://placehold.co/600x400/1e293b/ffffff?text=Plumber+Demo"
        />
      </div>

      {/* --- ACT II: THE "HYPE" BUILD --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
        {/* Text Content (NOW FIRST in the HTML) */}
        <motion.div
          className="md:order-last"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
            Purpose II: Hype, Urgency & Conversion
          </h3>
          <p className="text-gray-400 text-lg">
            For tech startups and crypto projects, speed and 'feel' are key. We create modern landing pages that build immediate hype and drive users to a single, focused action.
          </p>
        </motion.div>

        {/* Project Card (NOW SECOND in the HTML) */}
        <div className="md:order-first">
          <ProjectCard
            title="Quantum Coin"
            description="A high-energy page to drive presale investment."
            imageUrl="https://placehold.co/600x400/1e293b/ffffff?text=Crypto+Demo"
          />
        </div>
      </div>

      {/* --- ACT III: THE "VIBE" BUILD --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Purpose III: Brand, Vibe & Atmosphere
          </h3>
          <p className="text-gray-400 text-lg">
            For cafes, artists, and brands, the site *is* the product. We build immersive, stylish web experiences that showcase your unique brand and make customers feel the 'vibe' before they even walk in.
          </p>
        </motion.div>

        {/* Project Card */}
        <ProjectCard
          title="The Grind Cafe"
          description="A stylish site for a local coffee shop."
          imageUrl="https://placehold.co/600x400/1e293b/ffffff?text=Cafe+Demo"
        />
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
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
        Our Simple 3-Step Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center">
          <ClipboardSignature className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">1. Strategy & Purpose</h3>
          <p className="text-gray-400">
            We define your #1 goal and the *exact* purpose of your new site.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Code className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">2. Premium Build</h3>
          <p className="text-gray-400">
            We build your site using high-end, modern tech and our 'Soul' design.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Rocket className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">3. Launch & Capture</h3>
          <p className="text-gray-400">
            Your new, purpose-driven website goes live, ready to capture leads.
          </p>
        </div>
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
    
    // Non-blocking write with error handling
    addDoc(leadsCollection, leadData)
      .then(() => {
        setIsSuccess(true);
        reset();
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
            path: leadsCollection.path,
            operation: 'create',
            requestResourceData: leadData,
        });

        // Emit the error with the global error emitter
        errorEmitter.emit('permission-error', permissionError);

        // Show a user-friendly message, but the dev error is in the console
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem submitting your message.",
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
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
        Let's Build Your New Website
      </h2>
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
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Start My Project"}
              </Button>
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
          <AnimatedSubheadline />
        </Hero>
        <CaseStudyShowcase />
        <ThreeStepPlan />
        <ContactMe />
      </main>
    </div>
  );
}
