
'use client';

import { Header } from "@/components/layout/header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";

const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    window.location.href = `/#${id}`;
};

export default function CVPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onScroll={handleScroll} />
      <main className="flex-grow pt-16">
        <div className="w-full max-w-4xl mx-auto py-16 md:py-24 px-6">
          
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div className="mb-6 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                  Alex Eldridge
                </h1>
                <p className="text-xl text-gray-300 mt-1">AI Engineer & Full-Stack Developer</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link href="https://github.com" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Github /></Link>
                  <Link href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></Link>
                  <Link href="mailto:eldworkstudio.contact@gmail.com" className="text-gray-400 hover:text-white transition-colors"><Mail /></Link>
                </div>
              </div>
              <Button
                size="lg"
                className="font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF CV
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-3 text-gray-100">Professional Summary</h2>
              <p className="text-gray-400 max-w-prose">
                [INSERT SUMMARY: A brief, high-impact summary highlighting your core strengths, experience with AI and web development, and your career goals. Mention your passion for creating purpose-driven digital solutions.]
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-xl font-bold hover:no-underline text-gray-100">Featured Projects</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  
                  {/* Project 1 */}
                  <div className="p-4 rounded-lg bg-white/5">
                    <h4 className="font-semibold text-lg text-blue-300 mb-2">Agentic Perfume Recommender</h4>
                    <div className="space-y-3 text-gray-400 text-sm">
                      <div>
                        <h5 className="font-bold text-gray-200">Problem:</h5>
                        <p>[INSERT PROJECT DETAILS: Describe the user problem - e.g., "Users are overwhelmed by fragrance choices and don't know how to describe scents."]</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-200">Solution:</h5>
                        <p>[INSERT PROJECT DETAILS: Explain your solution - e.g., "Built an AI agent that interprets natural language descriptions of moods and memories to recommend specific perfumes."]</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-200">Tech Stack:</h5>
                        <p>[INSERT PROJECT DETAILS: List technologies, e.g., "Next.js, Genkit AI, Firebase, Vector DB, Tailwind CSS."]</p>
                      </div>
                    </div>
                  </div>

                  {/* Project 2 */}
                  <div className="p-4 rounded-lg bg-white/5">
                    <h4 className="font-semibold text-lg text-blue-300 mb-2">E-commerce Data Pipeline</h4>
                     <div className="space-y-3 text-gray-400 text-sm">
                      <div>
                        <h5 className="font-bold text-gray-200">Problem:</h5>
                        <p>[INSERT PROJECT DETAILS: Describe the business problem - e.g., "A client's e-commerce site had no way to track user behavior and product performance across sessions."]</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-200">Solution:</h5>
                        <p>[INSERT PROJECT DETAILS: Explain your solution - e.g., "Developed a serverless data pipeline using Firebase Functions and BigQuery to ingest, process, and visualize sales and analytics data."]</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-200">Tech Stack:</h5>
                        <p>[INSERT PROJECT DETAILS: List technologies, e.g., "Firebase, Google Cloud Functions, BigQuery, Looker Studio, TypeScript."]</p>
                      </div>
                    </div>
                  </div>

                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-xl font-bold hover:no-underline text-gray-100">Experience</AccordionTrigger>
                <AccordionContent className="pt-4">
                   <div className="p-4 rounded-lg bg-white/5">
                    <h4 className="font-semibold text-lg text-blue-300 mb-2">Founder & Lead Developer, EldWorkStudio</h4>
                    <p className="text-sm text-gray-500 mb-3">2023 - Present</p>
                    <p className="text-gray-400 text-sm">
                      [INSERT EXPERIENCE: Describe your role. e.g., "Conceptualized and built a boutique development studio focused on creating high-performance, purpose-driven websites for clients. Managed the full project lifecycle from strategy and design to deployment and maintenance."].
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-xl font-bold hover:no-underline text-gray-100">Technical Skills</AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">Python</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">JavaScript</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">TypeScript</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">React</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">Next.js</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">Firebase</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">Git</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">LLM Orchestration</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">Vector Databases</Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-300/50">Tailwind CSS</Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-xl font-bold hover:no-underline text-gray-100">Education & Learning</AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="p-4 rounded-lg bg-white/5 text-gray-400 text-sm">
                    <h4 className="font-semibold text-lg text-blue-300 mb-2">Self-Taught Path & Continuous Learning</h4>
                    <p>[INSERT EDUCATION: Detail your learning journey, e.g., "Embarked on a self-directed learning path focusing on full-stack development and artificial intelligence. Followed the GigaAcademy roadmap, completing modules in advanced JavaScript, cloud infrastructure, and generative AI."]</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </FadeIn>

        </div>
      </main>
    </div>
  );
}
