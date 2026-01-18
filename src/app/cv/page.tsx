
'use client';

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin, Link as LinkIcon, Code2, Terminal, Cpu, Database, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedRotatingText } from "../AnimatedRotatingText";

const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    // Since this isn't the home page, we redirect and add the hash.
    window.location.href = `/#${id}`;
};

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded text-xs font-mono">
    {children}
  </div>
);

const ProjectCard = ({ title, description, tech, imageHint, liveHref, sourceHref }: { title: string, description: string, tech: string[], imageHint: string, liveHref: string, sourceHref: string }) => (
    <div className="bg-zinc-950 border border-white/10 rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 h-full">
        <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-blue-400" />
            <h4 className="text-base font-semibold text-gray-100">{title}</h4>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
            {tech.map((t, i) => <TechBadge key={i}>{t}</TechBadge>)}
        </div>
        <div className="aspect-video bg-black rounded-md border border-white/5 flex items-center justify-center my-2">
            <Image 
                src={`https://picsum.photos/seed/${title.replace(/\s/g, '-')}/400/225`} 
                alt={`${title} technical screenshot`}
                width={400}
                height={225}
                className="rounded-sm object-cover opacity-70"
                data-ai-hint={imageHint}
            />
        </div>
        <div className="flex items-center gap-6 text-xs font-mono mt-auto pt-4 border-t border-white/5">
            <Link href={liveHref} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                <LinkIcon className="h-3.5 w-3.5"/>
                View Live Project
            </Link>
            <Link href={sourceHref} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Code2 className="h-3.5 w-3.5" />
                View Source Code
            </Link>
        </div>
    </div>
);

const ArsenalSection = ({ title, icon: Icon, items }: { title: string, icon: React.ElementType, items: string[] }) => (
    <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
            <Icon className="h-4 w-4 text-blue-400" />
            {title}
        </h4>
        <div className="flex flex-col gap-1.5 pl-6 text-gray-400 text-sm">
            {items.map((item, i) => (
                <p key={i}>{item}</p>
            ))}
        </div>
    </div>
);

export default function CVPage() {
    const projects = [
        {
            title: "Agentic Scent Discovery Engine",
            description: "A conversational AI agent that acts as a personal fragrance consultant, translating abstract concepts like mood and memory into concrete scent profiles using a multi-step LLM chain.",
            tech: ["Genkit", "Next.js", "Firebase", "Vector DB"],
            imageHint: "code terminal",
            liveHref: "#",
            sourceHref: "#"
        },
        {
            title: "Automated E-commerce Data Pipeline",
            description: "A serverless pipeline using a multimodal LLM to ingest product data, auto-generate SEO-optimized titles, and categorize items with 98% accuracy, eliminating hours of manual work.",
            tech: ["Cloud Functions", "Gemini Pro Vision", "Firestore", "Python"],
            imageHint: "data flow diagram",
            liveHref: "#",
            sourceHref: "#"
        }
    ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-gray-300">
      <Header onScroll={handleScroll} />
      <main className="flex-grow pt-4">
        <div className="w-full max-w-6xl mx-auto pt-4 pb-12 px-6">
          
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
              
              {/* --- LEFT COLUMN: IMAGE --- */}
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

              {/* --- CENTER COLUMN: DETAILS --- */}
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

              {/* --- RIGHT COLUMN: CTA --- */}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mt-16">
            
            {/* --- LEFT COLUMN --- */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Live Intelligence Card */}
              <div className="bg-zinc-950 border border-blue-500/30 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                      Agentic Workflow Demo
                    </h3>
                    <p className="text-sm text-gray-400">[Coming Tonight]</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    Status: Online
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-100 mb-6">System Architecture & Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN --- */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <div className="bg-zinc-950 border border-white/10 rounded-lg p-6 space-y-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-100">Technical Arsenal</h3>
                <ArsenalSection 
                  title="Intelligence" 
                  icon={BrainCircuit} 
                  items={['Gemini API', 'LangChain / LCEL', 'Genkit', 'Function Calling']}
                />
                <ArsenalSection 
                  title="Core" 
                  icon={Cpu} 
                  items={['Next.js / React', 'TypeScript', 'Tailwind CSS', 'Node.js']}
                />
                <ArsenalSection 
                  title="Data" 
                  icon={Database} 
                  items={['Firebase / Firestore', 'Vector DBs (Pinecone)', 'PostgreSQL']}
                />
              </div>
              
              <div className="bg-zinc-950 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Signal</h3>
                <div className="flex flex-col gap-3 text-sm">
                  <p className="text-gray-400">Self-taught with a focus on shipping production-ready systems.</p>
                  <Link href="https://github.com/EldinB" target="_blank" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-mono text-xs">
                    <Github className="h-4 w-4" />
                    github.com/EldinB
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
