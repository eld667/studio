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


const projects = [
  {
    title: "Placeholder Project 1",
    description: "This is a placeholder for a future project. We will update this later.",
    imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Project+1",
  },
  {
    title: "Placeholder Project 2",
    description: "This is a placeholder for a future project. We will update this later.",
    imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Project+2",
  },
  {
    title: "Placeholder Project 3",
    description: "This is a placeholder for a future project. We will update this later.",
    imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Project+3",
  },
];

function OurWork() {
  return (
    <motion.section
      id="our-work"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto py-24 px-6"
    >
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
        Our Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
          />
        ))}
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
        <OurWork />
        <ThreeStepPlan />
        <ContactMe />
      </main>
    </div>
  );
}
