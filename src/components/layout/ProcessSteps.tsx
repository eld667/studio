"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Check, ArrowRight, Search, Code2, Rocket } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "Deep Strategy",
        description: "We don't guess. We analyze your market, your competitors, and your goals to build a roadmap that actually works.",
        icon: Search,
        features: ["Market Analysis", "Competitor Audit", "User Persona Mapping"]
    },
    {
        id: "02",
        title: "Precision Build",
        description: "No bloat. No templates. We engineer a high-performance system tailored to your exact business needs.",
        icon: Code2,
        features: ["Next.js Architecture", "Performance Optimization", "SEO Foundation"]
    },
    {
        id: "03",
        title: "Launch & Scale",
        description: "We deploy your site and hand you the keys, ready to capture leads and grow your revenue from day one.",
        icon: Rocket,
        features: ["Deployment Setup", "Analytics Integration", "Growth Handoff"]
    }
];

export function ProcessSteps() {
    return (
        <section id="process" className="w-full py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand/5 blur-[120px] rounded-full opacity-50 pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 lg:mb-24">
                    <FadeIn>
                        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
                            [ OUR METHODOLOGY ]
                        </span>
                        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tighter mb-6">
                            From concept to revenue <br className="hidden md:block" /> in three steps.
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                            We've stripped away the agency fluff. Our process is direct, transparent, and focused entirely on getting you results.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <FadeIn key={step.id} delay={i * 0.2}>
                                <div className="relative group">
                                    {/* Step Number Badge */}
                                    <div className="relative z-10 flex flex-col items-center mb-8">
                                        <div className="w-24 h-24 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center group-hover:border-brand/30 transition-colors duration-500 shadow-[0_0_30px_-10px_rgba(0,0,0,1)]">
                                            <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center">
                                                <Icon className="w-7 h-7 text-white/70 group-hover:text-brand transition-colors duration-300" />
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-3 bg-[#0A0A0A] px-3 py-1 border border-white/10 rounded-full">
                                            <span className="font-mono text-[10px] text-brand uppercase tracking-widest">
                                                Step {step.id}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-center px-4">
                                        <h3 className="text-xl font-medium text-white mb-4 tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-white/40 leading-relaxed mb-8 min-h-[80px]">
                                            {step.description}
                                        </p>

                                        {/* Features List */}
                                        <ul className="space-y-3 inline-block text-left">
                                            {step.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-sm text-white/60">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand/50" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
