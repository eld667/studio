"use client";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { motion } from "framer-motion";
import { ProjectCard } from "@/app/ProjectCard";
import { ClipboardSignature, Code, Rocket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AnimatedSubheadline } from "./AnimatedWords";


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
        {/* Project Card (On the left this time) */}
        {/* Note: 'md:order-first' makes this appear first on desktop */}
        <div className="md:order-first">
          <ProjectCard
            title="Quantum Coin"
            description="A high-energy page to drive presale investment."
            imageUrl="https://placehold.co/600x400/1e293b/ffffff?text=Crypto+Demo"
          />
        </div>

        {/* Text Content */}
        <motion.div
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

function ContactMe() {
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
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" className="bg-gray-900 border-white/10" />
          </div>
          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input id="email" type="email" className="bg-gray-900 border-white/10" />
          </div>
          <div>
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project..."
              className="bg-gray-900 border-white/10"
            />
          </div>
          <Button
            size="lg"
            className="w-full font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          >
            Start My Project
          </Button>
        </div>
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
