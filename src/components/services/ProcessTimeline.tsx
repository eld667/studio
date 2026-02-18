"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { MessageSquare, Palette, Code, Rocket } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "Consult",
        description: "We hop on a quick call to understand your goals, audience, and timeline. No jargon, just clarity.",
        icon: MessageSquare,
    },
    {
        id: "02",
        title: "Design",
        description: "We create a pixel-perfect mockup based on your brand. You review, we refine — until it's exactly right.",
        icon: Palette,
    },
    {
        id: "03",
        title: "Build",
        description: "We engineer your site with production-grade code. Fast, responsive, and optimized for search.",
        icon: Code,
    },
    {
        id: "04",
        title: "Launch",
        description: "Your site goes live. We handle deployment, DNS, SSL — everything. You just share the link.",
        icon: Rocket,
    },
];

export function ProcessTimeline() {
    return (
        <section className="w-full py-20 lg:py-32 relative">
            <div className="max-w-5xl mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16 lg:mb-20">
                        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
                            [ HOW IT WORKS ]
                        </span>
                        <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tighter mb-4">
                            From idea to live in 4 steps.
                        </h2>
                        <p className="text-sm text-white/40 max-w-md mx-auto">
                            No surprises. A clear, repeatable process so you always know what's happening.
                        </p>
                    </div>
                </FadeIn>

                {/* Desktop: horizontal, Mobile: vertical */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 relative">
                    {/* Connecting line — desktop only */}
                    <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-row md:flex-col items-start md:items-center md:text-center gap-4 md:gap-0"
                            >
                                {/* Step circle */}
                                <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center shrink-0 md:mb-5">
                                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#007AFF]" />
                                </div>

                                {/* Mobile connecting line */}
                                {i < steps.length - 1 && (
                                    <div className="md:hidden absolute left-5 top-12 w-px h-[calc(100%+0.5rem)] bg-white/[0.06]" />
                                )}

                                <div className="space-y-1.5 md:space-y-2 pb-6 md:pb-0">
                                    <div className="flex items-center gap-2 md:justify-center">
                                        <span className="font-mono text-[10px] text-white/20">{step.id}</span>
                                        <h3 className="text-sm md:text-base font-medium text-white tracking-tight">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-[12px] md:text-sm text-white/40 leading-relaxed max-w-[200px] md:max-w-none">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
