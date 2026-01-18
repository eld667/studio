
'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin, Combine, BrainCircuit, Cpu, Server, Workflow, Terminal, Check, Copy, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedRotatingText } from "../AnimatedRotatingText";
import { motion, AnimatePresence } from 'framer-motion';


const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded text-xs font-mono">
    {children}
  </div>
);

const ProjectCard = ({ title, icon: Icon, context, build, tech }: { title: string, icon: React.ElementType, context: string, build: string, tech: string[] }) => (
    <FadeIn>
        <div className="bg-zinc-950 border border-white/10 rounded-lg p-6 flex flex-col gap-4 h-full transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-zinc-900">
            <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <h4 className="text-base font-semibold text-gray-100">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {tech.map((t, i) => <TechBadge key={i}>{t}</TechBadge>)}
            </div>
            <div className="mt-2 space-y-4 text-sm flex-grow">
                <div>
                    <h5 className="font-semibold text-gray-300 mb-1.5">Context</h5>
                    <p className="text-gray-400 leading-relaxed">{context}</p>
                </div>
                <div>
                    <h5 className="font-semibold text-gray-300 mb-1.5">The Build</h5>
                    <p className="text-gray-400 leading-relaxed">{build}</p>
                </div>
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

export default function CVPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('eldworkstudio.contact@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const projects = [
        {
            title: "Agentic Customer Assistant",
            icon: Terminal,
            context: "Built for niche e-commerce discovery to handle complex product intent mapping.",
            build: "Utilized Voiceflow and LLM orchestration to move beyond keyword triggers into reasoning-based replies.",
            tech: ["Voiceflow", "LLM Logic", "API Integration"],
        },
        {
            title: "E-commerce Data & Automation Engine",
            icon: Workflow,
            context: "Orchestrated the background operations for multi-client e-commerce storefronts.",
            build: "Designed automated scraping and cleaning pipelines to manage thousands of SKUs, pricing, and SEO metadata.",
            tech: ["Python (Scraping)", "n8n", "Cloud Functions", "Data Transformation"],
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
              <section id="mission">
                <FadeIn delay={0.2}>
                  <div className="bg-gray-900/40 border border-white/10 rounded-lg p-8 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-gray-900/60">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4 font-mono">SYSTEMS MISSION</h2>
                    <p className="text-gray-400 leading-relaxed max-w-3xl">Pragmatic builder with a focus on high-efficiency automation. I have spent my career at the intersection of E-commerce and Data—moving from manual data management to building automated scraping pipelines and agentic chatbots. I don't just prompt; I build the systems that make AI useful for real-world business needs.</p>
                  </div>
                </FadeIn>
              </section>

              <div className="border-b border-white/5" />

              {/* Section 3: Core Systems */}
              <section id="core-systems" className="flex flex-col gap-8">
                <FadeIn>
                  <h3 className="text-xl font-bold text-gray-100 font-mono">CORE SYSTEMS</h3>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
                </div>
              </section>

              <div className="border-b border-white/5" />

              {/* Section 4: Technical Arsenal */}
              <section id="technical-arsenal">
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
              <section id="command-center" className="flex flex-col gap-12">
                  <FadeIn delay={0.4}>
                      <div>
                          <h3 className="text-3xl font-bold text-white mb-6">Why Hire a Builder?</h3>
                          <ul className="space-y-4 text-gray-400">
                              <li className="flex items-start gap-3">
                                  <Check className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                                  <span><span className="font-semibold text-gray-200">Zero-Handholding:</span> Self-taught and system-oriented. I don't wait for documentation; I build it.</span>
                              </li>
                              <li className="flex items-start gap-3">
                                  <Check className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                                  <span><span className="font-semibold text-gray-200">Data-First Mindset:</span> AI is only as good as its data. My background in scraping ensures I build on solid foundations.</span>
                              </li>
                              <li className="flex items-start gap-3">
                                  <Check className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                                  <span><span className="font-semibold text-gray-200">ROI Driven:</span> I focus on automating the friction so the team can focus on the frontier.</span>
                              </li>
                          </ul>
                      </div>
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
                                      className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-2 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors"
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
                                      className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-2 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors"
                                  >
                                      <MessageCircle className="h-4 w-4" />
                                      WhatsApp
                                  </a>
                                  <a href="tel:+38348420904"
                                      className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-2 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors"
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
