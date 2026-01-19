
'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin, Combine, BrainCircuit, Cpu, Server, Workflow, Terminal, Check, Copy, MessageCircle, Phone, SearchCheck, Zap, Languages, Move } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedRotatingText } from "../AnimatedRotatingText";
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';


const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-white/20 text-gray-400 px-2 py-0.5 rounded-sm text-xs font-mono">
    {children}
  </div>
);

const ProjectBlade = ({ title, version, logic, tech }: { title: string, version: string, logic: string[], tech: string[] }) => (
    <FadeIn>
        <div className="bg-zinc-950 border border-white/10 rounded-lg p-6 flex flex-col gap-4 transition-colors hover:bg-white/[.02]">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h4 className="text-base font-bold text-white">{title}</h4>
                <span className="text-xs text-gray-500 font-mono">{version}</span>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2">
                {tech.map((t, i) => <TechBadge key={i}>{t}</TechBadge>)}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-2">
                {/* Left: System Logic */}
                <div className="md:col-span-2">
                    <h5 className="text-sm font-semibold text-gray-300 mb-3 font-mono">// System Logic</h5>
                    <ul className="space-y-2 text-gray-400 text-sm list-disc list-inside">
                        {logic.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
                {/* Right: Demo Placeholder */}
                <div className="md:col-span-3 bg-zinc-900 rounded-md flex flex-col items-center justify-center p-8 border border-dashed border-white/10 min-h-[150px]">
                    <Terminal className="h-8 w-8 text-gray-600 mb-2"/>
                    <p className="text-sm text-gray-600 font-mono">[INTERACTIVE_DEMO_RESERVED]</p>
                </div>
            </div>

            {/* Footer/Action */}
            <div className="mt-2 border-t border-white/5 pt-3">
                <a href="#" className="text-xs text-blue-400 font-mono hover:underline">// View_System_Architecture.exe</a>
            </div>
        </div>
    </FadeIn>
);


const ArsenalSection = ({ title, icon: Icon, items, baseDelay = 0 }: { title: string, icon: React.ElementType, items: string[], baseDelay?: number }) => (
    <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
            <Icon className="h-4 w-4 text-blue-400" />
            {title}
        </h4>
        <div className="flex flex-wrap gap-2 pl-6">
             {items.map((item, i) => (
                <FadeIn key={i} delay={baseDelay + i * 0.05}>
                    <TechBadge>{item}</TechBadge>
                </FadeIn>
            ))}
        </div>
    </div>
);

const signals = [
    {
        icon: SearchCheck,
        headline: "Relentless Problem Solver",
        sub: "I don't stop until the logic holds. Give me a challenge, I'll find the solve.",
    },
    {
        icon: Zap,
        headline: "High-Velocity Learner",
        sub: "Mastering new frameworks in days, not months. Self-taught, mission-driven.",
    },
    {
        icon: Languages,
        headline: "Multilingual Native",
        sub: "Fluent in 4 languages. Built for seamless collaboration in global engineering teams.",
    },
    {
        icon: Move,
        headline: "Technical Elasticity",
        sub: "From background data ops to agentic AI. I adapt to the mission.",
    },
];

const SignalCard = ({ icon: Icon, headline, sub, delay }: { icon: React.ElementType, headline: string, sub: string, delay: number }) => (
    <FadeIn delay={delay}>
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-900 border border-white/10 rounded-lg p-6 text-center flex flex-col items-center h-full"
        >
            <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mb-4 text-blue-400"
            >
                <Icon className="h-8 w-8" />
            </motion.div>
            <h4 className="font-semibold text-gray-200 mb-2 text-base">{headline}</h4>
            <p className="text-sm text-gray-400 flex-grow">{sub}</p>
        </motion.div>
    </FadeIn>
);


export default function CVPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('eldworkstudio.contact@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const coreSystems = [
        {
            title: "Agentic Customer Assistant",
            version: "v1.1.0",
            logic: [
                "Handles complex product intent.",
                "Moves beyond keywords to reasoning.",
                "Integrates with inventory APIs.",
            ],
            tech: ["Voiceflow", "LLM Logic", "API Integration"],
        },
        {
            title: "E-commerce Automation Engine",
            version: "v2.0.1",
            logic: [
                "Manages thousands of SKUs.",
                "Automated data scraping & cleaning.",
                "Syncs pricing and SEO metadata.",
            ],
            tech: ["Python", "n8n", "Cloud Functions"],
        }
    ];
    
    const orchestrationItems = ['Voiceflow', 'n8n', 'Make'];
    const aiItems = ['Gemini API', 'OpenAI', 'Claude'];
    const coreItems = ['Next.js', 'TypeScript', 'Firebase', 'Node.js'];
    const opsItems = ['Web Scraping', 'Git', 'Vercel', 'Data Syncing'];
    
    const navItems = [
        { id: "mission", label: "Mission" },
        { id: "core-systems", label: "Core Systems" },
        { id: "technical-arsenal", label: "Technical Arsenal" },
        { id: "command-center", label: "Command Center" },
    ];

    const handleHeaderScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.preventDefault();
        window.location.href = `/#${id}`;
    };

    const handleLocalScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-gray-300 font-body">
      <Header onScroll={handleHeaderScroll} />
      <main className="flex-grow">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-x-16">
          
          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 py-8 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)]">
              {/* Mobile Horizontal Nav */}
              <div className="lg:hidden pb-8 border-b border-white/5">
                  <h3 className="font-mono text-sm uppercase text-gray-500 mb-4">Index</h3>
                  <nav className="flex flex-wrap gap-x-4 gap-y-2">
                      {navItems.map((item) => (
                          <a key={item.id} href={`#${item.id}`} onClick={(e) => handleLocalScroll(e, item.id)} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                              {item.label}
                          </a>
                      ))}
                  </nav>
              </div>
              {/* Desktop Vertical Nav */}
              <nav className="hidden lg:flex flex-col gap-4 pt-16">
                  {navItems.map((item, index) => (
                      <a key={item.id} href={`#${item.id}`} onClick={(e) => handleLocalScroll(e, item.id)} className="group flex items-center py-2 text-gray-400 hover:text-white transition-colors">
                          <span className="font-mono text-xs text-gray-500 mr-4 group-hover:text-white transition-colors">[{String(index + 1).padStart(2, '0')}]</span>
                          <span className="font-semibold">{item.label}</span>
                      </a>
                  ))}
              </nav>
          </aside>

          {/* --- MAIN CONTENT FEED --- */}
          <div className="lg:w-3/4 flex-grow py-8">
            <div className="flex flex-col gap-12">

              {/* Section 1: Hero */}
              <section>
                <FadeIn>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                    <div className="flex-shrink-0">
                        <Image 
                          src="https://picsum.photos/seed/profile/200/200" 
                          alt="Profile Headshot"
                          width={150}
                          height={150}
                          className="rounded-full border-4 border-white/10 shadow-lg"
                          data-ai-hint="profile person"
                        />
                    </div>
                    <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
                      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                        Eldin Basani
                      </h1>
                      <AnimatedRotatingText />
                      <div className="flex items-center gap-4 mt-4">
                        <Link href="https://github.com/EldinB" target="_blank" className="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:drop-shadow-[0_0_5px_hsl(var(--primary))]"><Github /></Link>
                        <Link href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:drop-shadow-[0_0_5px_hsl(var(--primary))]"><Linkedin /></Link>
                        <Link href="mailto:eldworkstudio.contact@gmail.com" className="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:drop-shadow-[0_0_5px_hsl(var(--primary))]"><Mail /></Link>
                      </div>
                      <div className="flex items-center gap-6 mt-3 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Prizren, Kosovo
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                              Building <Link href="https://github.com/EldinB" target="_blank" className="font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent hover:brightness-125 transition">@EldWorkStudio</Link>
                          </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                          size="lg"
                          className="font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download PDF CV
                        </Button>
                    </div>
                  </div>
                </FadeIn>
              </section>

              <div className="border-b border-white/5" />

              {/* Section 2: Mission */}
              <section id="mission" className="scroll-mt-32">
                <FadeIn delay={0.2}>
                  <div className="bg-gray-900/40 border border-white/10 rounded-lg p-8 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-gray-900/60">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4 font-mono">SYSTEMS MISSION</h2>
                    <p className="text-gray-400 leading-relaxed max-w-3xl">Pragmatic builder with a focus on high-efficiency automation. I have spent my career at the intersection of E-commerce and Data—moving from manual data management to building automated scraping pipelines and agentic chatbots. I don't just prompt; I build the systems that make AI useful for real-world business needs.</p>
                  </div>
                </FadeIn>
              </section>

              <div className="border-b border-white/5" />

              {/* Section 3: Core Systems */}
              <section id="core-systems" className="flex flex-col gap-8 scroll-mt-32">
                <FadeIn>
                  <h3 className="text-xl font-bold text-gray-100 font-mono">[SECTION: CORE_SYSTEMS]</h3>
                </FadeIn>
                <div className="flex flex-col gap-6">
                    {coreSystems.map((p, i) => (
                       <React.Fragment key={i}>
                          <ProjectBlade {...p} />
                          {i < coreSystems.length - 1 && <div className="my-6 border-b border-white/5" />}
                       </React.Fragment>
                    ))}
                </div>
              </section>

              <div className="border-b border-white/5" />

              {/* Section 4: Technical Arsenal */}
              <section id="technical-arsenal" className="scroll-mt-32">
                <FadeIn>
                  <div className="bg-zinc-950 border border-white/10 rounded-lg p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-100 font-mono">TECHNICAL ARSENAL</h3>
                    <ArsenalSection title="Orchestration" icon={Combine} items={orchestrationItems} />
                    <ArsenalSection title="AI & Models" icon={BrainCircuit} items={aiItems} />
                    <ArsenalSection title="Core Stack" icon={Cpu} items={coreItems} />
                    <ArsenalSection title="Operations" icon={Server} items={opsItems} />
                  </div>
                </FadeIn>
              </section>

              <div className="border-b border-white/5" />

              {/* Section 5: Command Center */}
              <section id="command-center" className="flex flex-col gap-12 scroll-mt-32">
                  <FadeIn>
                      <h3 className="text-3xl font-bold text-white mb-8 text-center">Why Eldin?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {signals.map((signal, index) => (
                            <SignalCard key={index} {...signal} delay={0.2 + index * 0.1} />
                        ))}
                      </div>
                      <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto italic">
                        "I’m not looking for a seat; I’m looking for a mission. I’m ready to bring my relentless problem-solving to your team so we can push the boundaries of what’s possible and grow together."
                      </p>
                  </FadeIn>

                  <FadeIn delay={0.6}>
                      <div className="p-8 bg-gray-900/50 border border-white/10 rounded-lg">
                          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                              <div className="flex items-center gap-3 mb-4 md:mb-0">
                                  <div className="relative flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                  </div>
                                  <p className="text-gray-300">Available for immediate technical deep-dive.</p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                                  <button 
                                      onClick={handleCopy}
                                      className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-2 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors whitespace-nowrap"
                                  >
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={copied ? 'copied' : 'copy'}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center justify-center gap-2 w-24"
                                        >
                                            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                            {copied ? 'Copied!' : 'Email'}
                                        </motion.span>
                                    </AnimatePresence>
                                  </button>
                                  <a href="https://wa.me/38348420904" target="_blank" rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-2 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors whitespace-nowrap"
                                  >
                                      <MessageCircle className="h-4 w-4" />
                                      WhatsApp
                                  </a>
                                  <a href="tel:+38348420904"
                                      className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-2 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors whitespace-nowrap"
                                  >
                                      <Phone className="h-4 w-4" />
                                      +383 48 420 904
                                  </a>
                              </div>
                          </div>
                      </div>
                  </FadeIn>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
