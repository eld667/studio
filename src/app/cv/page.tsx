
'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin, Combine, BrainCircuit, Cpu, Server, Terminal } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";
import Image from "next/image";
import { AnimatedRotatingText } from "../AnimatedRotatingText";
import { motion } from 'framer-motion';
import React from 'react';
import { CommandBridge } from './CommandBridge';


const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-white/20 text-gray-400 px-2 py-0.5 rounded-sm text-xs font-mono">
    {children}
  </div>
);

const ProjectBlade = ({ title, version, logic, tech }: { title: string, version: string, logic: string[], tech: string[] }) => (
    <FadeIn>
        <motion.div 
          className="bg-zinc-950 border border-white/10 rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-gray-900/60"
        >
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
        </motion.div>
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
        { id: "command-bridge", label: "Command Bridge" },
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
                  <motion.div 
                    className="bg-gray-900/40 border border-white/10 rounded-lg p-8 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-gray-900/60"
                  >
                    <h2 className="text-2xl font-bold text-gray-100 mb-4 font-mono">SYSTEMS MISSION</h2>
                    <p className="text-gray-400 leading-relaxed max-w-3xl">Pragmatic builder with a focus on high-efficiency automation. I have spent my career at the intersection of E-commerce and Data—moving from manual data management to building automated scraping pipelines and agentic chatbots. I don't just prompt; I build the systems that make AI useful for real-world business needs.</p>
                  </motion.div>
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
                    <ArsenalSection title="Orchestration" icon={Combine} items={orchestrationItems} baseDelay={0} />
                    <ArsenalSection title="AI & Models" icon={BrainCircuit} items={aiItems} baseDelay={orchestrationItems.length * 0.05} />
                    <ArsenalSection title="Core Stack" icon={Cpu} items={coreItems} baseDelay={(orchestrationItems.length + aiItems.length) * 0.05} />
                    <ArsenalSection title="Operations" icon={Server} items={opsItems} baseDelay={(orchestrationItems.length + aiItems.length + coreItems.length) * 0.05}/>
                  </div>
                </FadeIn>
              </section>

              <div className="border-b border-white/5" />

              {/* Section 5: Command Center */}
              <CommandBridge />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
