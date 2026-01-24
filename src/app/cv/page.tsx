
'use client';

import { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin, Combine, BrainCircuit, Cpu, Server, Terminal, Eye } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";
import Image from "next/image";
import { AnimatedRotatingText } from "../AnimatedRotatingText";
import { motion } from 'framer-motion';
import React from 'react';
import { CommandBridge } from './CommandBridge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';


const TechBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("border border-white/20 bg-black/30 text-gray-400 px-2 py-0.5 rounded-sm text-xs font-mono", className)}>
    {children}
  </div>
);


type SystemBladeProps = {
  title: string;
  focus: string;
  tech: string[];
  logic: { label: string; formula?: string }[];
  logs: string[];
  deploymentUrl: string;
};

const ProjectSystem = ({ title, focus, tech, logic, logs, deploymentUrl }: SystemBladeProps) => {
    const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedLogs(prev => {
                if (prev.length >= logs.length) {
                   // Cycle back to the beginning
                   return [logs[0]];
                }
                return [...prev, logs[prev.length]];
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [logs]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [displayedLogs]);
    
  return (
    <FadeIn>
      <div className="bg-zinc-950 border border-white/10 rounded-lg p-6 relative overflow-hidden transition-all duration-300 ease-in-out hover:border-blue-500/30 hover:-translate-y-0.5">
          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_3px] pointer-events-none opacity-50" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Cols 1-4: The Data */}
              <div className="lg:col-span-4 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <h4 className="text-xl font-bold text-white">{title}</h4>
                          <p className="text-sm text-gray-400 font-mono mt-1">{focus}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-green-400 mt-1 flex-shrink-0">
                          <div className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </div>
                          Active
                      </div>
                  </div>
                  {/* Tech Stack */}
                  <div className="mb-6">
                      <h5 className="text-xs font-semibold text-gray-500 mb-2 font-mono">//_TECH_STACK</h5>
                      <div className="flex flex-wrap gap-2">
                          {tech.map((t, i) => <TechBadge key={i}>{t}</TechBadge>)}
                      </div>
                  </div>

                  {/* Execution Logic */}
                  <div className="mb-6">
                      <h5 className="text-xs font-semibold text-gray-500 mb-3 font-mono">//_EXECUTION_LOGIC</h5>
                      <ul className="space-y-3 text-gray-400 text-sm">
                          {logic.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-400 font-mono mt-0.5">&gt;</span>
                                  <span className="flex-1">
                                      {point.label}
                                      {point.formula && <code className="block mt-1 text-xs bg-black/50 text-emerald-300 p-1.5 rounded-sm font-mono border border-white/10">{point.formula}</code>}
                                  </span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4">
                      <a href={deploymentUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="w-full font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out hover:brightness-110">
                              <Eye className="mr-2 h-4 w-4" />
                              View Live Deployment
                          </Button>
                      </a>
                  </div>
              </div>

              {/* Cols 5-12: The Evidence (Command Center) */}
              <div className="lg:col-span-8 bg-black/30 border border-white/10 rounded-lg p-1 backdrop-blur-sm">
                  <Tabs defaultValue="logs" className="w-full h-full flex flex-col">
                      <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 h-8">
                          <TabsTrigger value="blueprint" className="text-xs font-mono rounded-t-md rounded-b-none data-[state=active]:bg-zinc-800">[01_LOGIC_BLUEPRINT]</TabsTrigger>
                          <TabsTrigger value="interface" className="text-xs font-mono rounded-t-md rounded-b-none data-[state=active]:bg-zinc-800">[02_LIVE_INTERFACE]</TabsTrigger>
                          <TabsTrigger value="logs" className="text-xs font-mono rounded-t-md rounded-b-none data-[state=active]:bg-zinc-800">[03_SYSTEM_LOGS]</TabsTrigger>
                      </TabsList>
                      <div className="flex-grow bg-zinc-800 rounded-b-md p-4 min-h-[300px]">
                          <TabsContent value="blueprint" className="m-0 h-full flex items-center justify-center text-gray-500 font-mono text-sm">
                            Architecture Map Placeholder (e.g., Voiceflow export image)
                          </TabsContent>
                          <TabsContent value="interface" className="m-0 h-full flex items-center justify-center text-gray-500 font-mono text-sm">
                            Production UI Screenshot Placeholder
                          </TabsContent>
                          <TabsContent value="logs" className="m-0 h-full">
                              <div ref={terminalRef} className="h-full max-h-[300px] overflow-y-auto font-mono text-xs text-gray-400 space-y-1 pr-2">
                                  {displayedLogs.map((log, i) => <p key={i} className="whitespace-pre-wrap">{log}</p>)}
                              </div>
                          </TabsContent>
                      </div>
                  </Tabs>
              </div>
          </div>
      </div>
    </FadeIn>
  );
};


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
    const projectSystems: SystemBladeProps[] = [
    {
      title: "ScentMatch™ Engine",
      focus: "Heuristic Scoring & Inventory Optimization",
      tech: ["Voiceflow", "Node.js", "Airtable API", "Heuristic Algorithms"],
      logic: [
        { label: "Normalized Relevance Algorithm", formula: "Score = (Matches / TotalNotes) * 10" },
        { label: "Logarithmic Inventory Biasing", formula: "Math.log(stock_level + 1) * 2" },
      ],
      logs: [
        "[INFO]   ScentMatch v1.2 Initialized.",
        "[API]    Airtable connection established...",
        "[FETCH]  Retrieving 2,348 SKU vectors from inventory.",
        "[OK]     Inventory sync complete.",
        "[INPUT]  Processing user query: 'fresh, citrus, for summer'.",
        "[HEURISTIC] Applying inventory bias to 'citrus' notes (stock > 50).",
        "[CALC]   Score for 'Dior Sauvage': 8.7 (Bias: +0.4)",
        "[CALC]   Score for 'Bleu de Chanel': 7.9 (Bias: -0.2)",
        "[CALC]   Score for 'Acqua di Gio': 9.1 (Bias: +0.8)",
        "[RESPONSE] Top match found. Streaming results to Voiceflow.",
      ],
      deploymentUrl: "#"
    },
    {
      title: "ScentQuery RAG",
      focus: "Neural Knowledge Retrieval",
      tech: ["RAG", "Vector DB", "Prompt Chaining", "Gemini API"],
      logic: [
        { label: "Hallucination Firewall", formula: "Confidence threshold > 0.75" },
        { label: "Query Optimization Layer" },
      ],
      logs: [
        "[INFO]   ScentQuery RAG engine online.",
        "[QUERY]  User: 'what's a good winter fragrance that isn't too sweet?'",
        "[OPTIMIZE] Query enhanced: 'fragrance winter notes not sweet vanilla gourmand'.",
        "[VECTOR] Performing similarity search on 50k document chunks...",
        "[OK]     Top 5 vectors retrieved: [0.92, 0.89, 0.88, 0.87, 0.85].",
        "[CONTEXT] Assembling context block for LLM.",
        "[SYNTH]  Synthesizing response with Gemini-Pro...",
        "[VALIDATE] Confidence: 0.96. Firewall bypassed.",
        "[RESPONSE] Suggesting 'Tom Ford Oud Wood' & 'Encre Noire'.",
      ],
      deploymentUrl: "#"
    }
  ];
    
    const orchestrationItems = ['Voiceflow', 'n8n', 'Make'];
    const aiItems = ['Gemini API', 'OpenAI', 'Claude'];
    const coreItems = ['Next.js', 'TypeScript', 'Firebase', 'Node.js'];
    const opsItems = ['Web Scraping', 'Git', 'Vercel', 'Data Syncing'];
    
    const navItems = [
        { id: "mission", label: "Mission" },
        { id: "core-systems", label: "Agentic Suite" },
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
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
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

              {/* Section 3: Agentic Suite */}
              <section id="core-systems" className="flex flex-col gap-8 scroll-mt-32">
                  <FadeIn>
                      <h3 className="text-xl font-bold text-gray-100 font-mono">[SECTION: AGENTIC_SUITE]</h3>
                  </FadeIn>
                  <div className="flex flex-col gap-8">
                      {projectSystems.map((p, i) => (
                         <ProjectSystem key={i} {...p} />
                      ))}
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-8">
                      <h4 className="font-mono text-sm text-gray-500 mb-4 text-center">// GLOBAL_CAPABILITY_REGISTRY</h4>
                      <div className="relative w-full overflow-hidden">
                        <div className="flex animate-marquee whitespace-nowrap">
                            {[...Array(2)].map((_, i) => (
                              <React.Fragment key={i}>
                                  <TechBadge className="mx-2" >Lead-Gen Capture</TechBadge>
                                  <TechBadge className="mx-2 text-blue-300 border-blue-500/50">Multi-Language Router</TechBadge>
                                  <TechBadge className="mx-2">Session Persistence</TechBadge>
                                  <TechBadge className="mx-2 text-emerald-300 border-emerald-500/50">Dynamic Content API</TechBadge>
                                  <TechBadge className="mx-2">Vector DB Integration</TechBadge>
                                  <TechBadge className="mx-2 text-blue-300 border-blue-500/50">Automated Web Scrapers</TechBadge>
                                  <TechBadge className="mx-2">E-commerce Data Sync</TechBadge>
                                  <TechBadge className="mx-2 text-emerald-300 border-emerald-500/50">Agentic Tooling</TechBadge>
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
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

              {/* Section 5: Command Bridge */}
              <CommandBridge />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
