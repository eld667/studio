
'use client';

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../FadeIn";
import Image from "next/image";

const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    // Since this isn't the home page, we redirect and add the hash.
    window.location.href = `/#${id}`;
};

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
        </div>
      </main>
    </div>
  );
}
