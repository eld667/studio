
'use client';

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin, Link as LinkIcon, Code2 } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { AnimatedRotatingText } from "../AnimatedRotatingText";

const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    // Since this isn't the home page, we redirect and add the hash.
    window.location.href = `/#${id}`;
};

const SkillBadge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'outline' }) => (
  <Badge variant={variant} className={cn(
    variant === 'default' 
      ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' 
      : 'bg-gray-800 border-white/10 text-gray-300',
    'px-3 py-1 text-sm'
  )}>
    {children}
  </Badge>
)

const ProjectTechBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge variant="outline" className="bg-gray-800 border-white/10 text-gray-300 px-2 py-0.5 text-xs">
    {children}
  </Badge>
);

const ProjectCard = ({ title, problem, solution, impact, tech, imageHint }: { title: string, problem: string, solution: string, impact: string, tech: string[], imageHint: string }) => (
  <div className="rounded-lg bg-gray-900/50 border border-white/10 p-6 space-y-6">
    {/* Header */}
    <div>
      <h4 className="text-lg font-semibold text-blue-400 mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tech.map((t, i) => <ProjectTechBadge key={i}>{t}</ProjectTechBadge>)}
      </div>
    </div>
    
    {/* Body */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4 text-gray-400 text-sm">
        <div>
          <h5 className="font-bold text-gray-300 mb-1">The Problem</h5>
          <p>{problem}</p>
        </div>
        <div>
          <h5 className="font-bold text-gray-300 mb-1">The Solution</h5>
          <p>{solution}</p>
        </div>
        <div>
          <h5 className="font-bold text-gray-300 mb-1">The Impact</h5>
          <p>{impact}</p>
        </div>
      </div>
      <div className="md:col-span-1 flex items-center justify-center">
        <div className="w-full aspect-video bg-gray-800 rounded-md border border-white/10 flex items-center justify-center shadow-md">
            <Image 
                src={`https://picsum.photos/seed/${title.replace(/\s/g, '-')}/400/225`} 
                alt={`${title} technical screenshot`}
                width={400}
                height={225}
                className="rounded-md object-cover"
                data-ai-hint={imageHint}
            />
        </div>
      </div>
    </div>

    {/* Action Bar */}
    <div className="flex items-center gap-6 text-sm">
      <Link href="#" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <LinkIcon className="h-4 w-4"/>
        View Live Project
      </Link>
      <Link href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <Code2 className="h-4 w-4" />
        View Source Code
      </Link>
    </div>
  </div>
);


export default function CVPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onScroll={handleScroll} />
      <main className="flex-grow pt-4">
        <div className="w-full max-w-5xl mx-auto pt-4 pb-12 px-6">
          
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
                  <Link href="https://github.com" target="_blank" className="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:drop-shadow-[0_0_5px_hsl(var(--primary))]"><Github /></Link>
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
                        Building <span className="font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">@EldWorkStudio</span>
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

          <FadeIn delay={0.3}>
            <div className="mt-24">
              <Accordion type="single" collapsible defaultValue="item-2" className="w-full">
                
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-2xl font-bold hover:no-underline border-b border-white/10 pb-4">Professional Summary</AccordionTrigger>
                  <AccordionContent className="pt-6 text-gray-300 text-base leading-relaxed">
                    A highly motivated and self-taught AI Engineer with a foundation in full-stack development, now specializing in building agentic systems and LLM-powered applications. Passionate about leveraging cutting-edge AI to create intelligent, autonomous solutions that solve complex problems.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-2xl font-bold hover:no-underline border-b border-white/10 pb-4">Featured Projects</AccordionTrigger>
                  <AccordionContent className="pt-6 space-y-8">
                    <ProjectCard 
                      title="Agentic Scent Discovery Engine"
                      problem="Luxury perfume buyers struggle with 'choice paralysis' online. Standard filters (e.g., 'floral') are too generic, leading to abandoned carts and low conversion for high-intent customers."
                      solution="Built a conversational AI agent that acts as a personal fragrance consultant. It asks nuanced questions about mood, desired memories, and personality traits, then translates those abstract concepts into concrete scent profiles using a multi-step LLM chain."
                      impact="Reduced discovery time by 80%, increased 'add to cart' events by 35% in user testing, and provided a highly differentiated, luxury brand experience."
                      tech={["Genkit", "Next.js", "Firebase", "Vector DB"]}
                      imageHint="abstract art"
                    />
                    <ProjectCard 
                      title="Automated E-commerce Data Pipeline"
                      problem="A growing e-commerce store was manually categorizing thousands of new products monthly. This was slow, error-prone, and required significant human hours, creating a bottleneck for scaling their inventory."
                      solution="Developed an automated data pipeline using Google Cloud Functions and a multimodal LLM. The system ingests product images and descriptions, auto-generates SEO-optimized titles, assigns them to categories with 98% accuracy, and flags low-quality images for review."
                      impact="Eliminated 120 hours of manual data entry per month, accelerated time-to-market for new products by 95%, and improved SEO ranking through consistent, high-quality metadata."
                      tech={["Cloud Functions", "Gemini Pro Vision", "Firestore", "Python"]}
                      imageHint="data flow"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-2xl font-bold hover:no-underline border-b border-white/10 pb-4">Experience</AccordionTrigger>
                  <AccordionContent className="pt-6">
                     <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">Founder & Lead Developer, EldWorkStudio</h4>
                      <p className="text-gray-400">Led the end-to-end design, development, and deployment of purpose-driven websites and AI-powered applications for a diverse client base, translating business requirements into high-performance technical solutions.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-2xl font-bold hover:no-underline border-b border-white/10 pb-4">Technical Skills</AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-4">Core Proficiencies</h4>
                        <div className="flex flex-wrap gap-2">
                          <SkillBadge>Python</SkillBadge>
                          <SkillBadge>JavaScript</SkillBadge>
                          <SkillBadge>Firebase</SkillBadge>
                          <SkillBadge>Git</SkillBadge>
                          <SkillBadge>LLM Orchestration</SkillBadge>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-400 mb-4">GigaAcademy Roadmap</h4>
                         <div className="flex flex-wrap gap-2">
                          <SkillBadge variant="outline">PyTorch</SkillBadge>
                          <SkillBadge variant="outline">TensorFlow</SkillBadge>
                          <SkillBadge variant="outline">SQL</SkillBadge>
                          <SkillBadge variant="outline">RAG</SkillBadge>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b-0">
                  <AccordionTrigger className="text-2xl font-bold hover:no-underline border-b border-white/10 pb-4">Education & Learning</AccordionTrigger>
                  <AccordionContent className="pt-6">
                     <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-white/10">
                        <div className="relative mb-6">
                            <div className="absolute -left-[30px] top-[5px] h-4 w-4 rounded-full bg-blue-500"></div>
                            <h4 className="font-semibold text-blue-400">Self-Taught Path</h4>
                            <p className="text-gray-400 text-sm">Professional Transition Path</p>
                        </div>
                         <div className="relative">
                            <div className="absolute -left-[30px] top-[5px] h-4 w-4 rounded-full bg-gray-600"></div>
                            <h4 className="font-semibold text-gray-300">GigaAcademy Roadmap</h4>
                            <p className="text-gray-400 text-sm">[Placeholder for future certifications]</p>
                        </div>
                     </div>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
