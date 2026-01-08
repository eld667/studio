
'use client';

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin, Briefcase, Code, Star, GraduationCap, BrainCircuit, ChevronDown } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

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

export default function CVPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onScroll={handleScroll} />
      <main className="flex-grow pt-16">
        <div className="w-full max-w-5xl mx-auto py-16 md:py-24 px-6">
          
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              
              {/* --- LEFT COLUMN --- */}
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <div className="relative">
                  <Image 
                    src="https://picsum.photos/seed/profile/200/200" 
                    alt="Profile Headshot"
                    width={150}
                    height={150}
                    className="rounded-full border-4 border-white/10 shadow-lg"
                    data-ai-hint="profile person"
                  />
                   <div className="absolute -bottom-2 -right-2">
                     <Badge className="bg-gray-800 border-white/10 text-gray-300 flex items-center gap-1.5 py-1 px-3">
                        <MapPin className="h-3 w-3" />
                        Kosovo
                     </Badge>
                   </div>
                </div>
              </div>

              {/* --- CENTER COLUMN --- */}
              <div className="flex-grow">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                  Alex Eldridge
                </h1>
                <p className="text-xl text-gray-300 mt-1">AI Engineer | Agentic Systems Builder</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link href="https://github.com" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Github /></Link>
                  <Link href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></Link>
                  <Link href="mailto:eldworkstudio.contact@gmail.com" className="text-gray-400 hover:text-white transition-colors"><Mail /></Link>
                </div>
              </div>

              {/* --- RIGHT COLUMN --- */}
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
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-2xl font-bold hover:no-underline border-b border-white/10 pb-4">Professional Summary</AccordionTrigger>
                  <AccordionContent className="pt-6 text-gray-300 text-base leading-relaxed">
                    [INSERT SUMMARY] A highly motivated and self-taught AI Engineer with a foundation in full-stack development, now specializing in building agentic systems and LLM-powered applications. Passionate about leveraging cutting-edge AI to create intelligent, autonomous solutions that solve complex problems.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-2xl font-bold hover:no-underline border-b border-white/10 pb-4">Featured Projects</AccordionTrigger>
                  <AccordionContent className="pt-6 space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">Agentic Perfume Recommender</h4>
                      <p className="text-gray-400 mb-2"><span className="font-bold">Problem:</span> [INSERT PROJECT DETAILS]</p>
                      <p className="text-gray-400 mb-2"><span className="font-bold">Solution:</span> [INSERT PROJECT DETAILS]</p>
                      <p className="text-gray-400"><span className="font-bold">Tech Stack:</span> [INSERT PROJECT DETAILS]</p>
                    </div>
                     <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">E-commerce Data Pipeline</h4>
                      <p className="text-gray-400 mb-2"><span className="font-bold">Problem:</span> [INSERT PROJECT DETAILS]</p>
                      <p className="text-gray-400 mb-2"><span className="font-bold">Solution:</span> [INSERT PROJECT DETAILS]</p>
                      <p className="text-gray-400"><span className="font-bold">Tech Stack:</span> [INSERT PROJECT DETAILS]</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-2xl font-bold hover:no-underline border-b border-white/10 pb-4">Experience</AccordionTrigger>
                  <AccordionContent className="pt-6">
                     <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">Founder & Lead Developer, EldWorkStudio</h4>
                      <p className="text-gray-400">[INSERT EXPERIENCE]</p>
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


    