"use client";

import React from 'react';
import { FadeIn } from '@/app/FadeIn';
import { Header } from '@/components/layout/header';
import { MultiStepForm } from '@/components/contact/MultiStepForm';
import { Mail, Clock, Copy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ContactPage() {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('eldworkstudio.contact@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#09090B]">
            <Header onScroll={handleScroll} />
            <main className="flex-grow pt-32 pb-20 lg:pt-40 lg:pb-28">

                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Left Column: Context (Smaller) */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                            <FadeIn>
                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-5">
                                    [ START YOUR PROJECT ]
                                </span>
                                <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tighter leading-[1.1] mb-6">
                                    Let's build something real.
                                </h1>
                                <p className="text-sm md:text-base text-white/40 leading-relaxed mb-10">
                                    Use the project builder to define your needs, select add-ons, and get a quote estimate. We'll review your brief and get back to you within 24 hours.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <div className="space-y-6 border-t border-white/10 pt-8">
                                    {/* Direct Contact */}
                                    <div>
                                        <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-brand" /> Direct Email
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-white/60 font-mono text-sm">eldworkstudio.contact@gmail.com</span>
                                            <TooltipProvider>
                                                <Tooltip open={copied}>
                                                    <TooltipTrigger asChild>
                                                        <button onClick={handleCopy} className="text-white/20 hover:text-white transition-colors">
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Copied!</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>

                                    {/* Response Time */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-white">Fast Response</h4>
                                            <p className="text-xs text-white/40 mt-1 leading-relaxed">
                                                We reply to all project briefs within 24 hours.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Right Column: Multi-Step Form (Larger) */}
                        <div className="lg:col-span-8">
                            <FadeIn delay={0.2}>
                                <MultiStepForm />
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
