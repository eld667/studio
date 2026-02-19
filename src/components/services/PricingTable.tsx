"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const features = [
    { name: "Responsive Landing Page", starter: true, standard: true, premium: true },
    { name: "Mobile Optimized", starter: true, standard: true, premium: true },
    { name: "Basic Contact Form", starter: true, standard: true, premium: true },
    { name: "Hosting & Deployment", starter: true, standard: true, premium: true },
    { name: "Custom Multi-Section Design", starter: false, standard: true, premium: true },
    { name: "Copywriting Guidance", starter: false, standard: true, premium: true },
    { name: "On-Page SEO Setup", starter: false, standard: true, premium: true },
    { name: "2 Revision Rounds", starter: false, standard: true, premium: false },
    { name: "4 Revision Rounds", starter: false, standard: false, premium: true },
    { name: "Custom Animations", starter: false, standard: false, premium: true },
    { name: "Multi-Page Site", starter: false, standard: false, premium: true },
    { name: "CMS Integration", starter: false, standard: false, premium: true },
    { name: "Advanced Forms & Logic", starter: false, standard: false, premium: true },
];

const tiers = [
    { name: "Starter", price: "$299" },
    { name: "Standard", price: "$799+", highlighted: true },
    { name: "Premium", price: "$2,000+" },
];

function FeatureIcon({ included }: { included: boolean }) {
    return included ? (
        <Check className="w-3.5 h-3.5 text-brand" />
    ) : (
        <Minus className="w-3.5 h-3.5 text-white/10" />
    );
}

export function PricingTable() {
    return (
        <section className="w-full py-20 lg:py-32 relative">
            <div className="max-w-4xl mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-12">
                        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
                            [ FEATURE COMPARISON ]
                        </span>
                        <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tighter">
                            Compare plans side-by-side.
                        </h2>
                    </div>
                </FadeIn>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border border-white/[0.08] rounded-sm overflow-hidden"
                >
                    {/* Table Header */}
                    <div className="grid grid-cols-4 bg-white/[0.02] border-b border-white/[0.08]">
                        <div className="p-4 lg:p-5">
                            <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em]">Features</span>
                        </div>
                        {tiers.map((tier) => (
                            <div key={tier.name} className={cn(
                                "p-4 lg:p-5 text-center border-l border-white/[0.06]",
                                tier.highlighted && "bg-brand/[0.04]"
                            )}>
                                <span className="text-[11px] font-mono text-white/50 uppercase tracking-[0.15em] block">{tier.name}</span>
                                <span className="text-lg md:text-xl font-medium text-white mt-1 block">{tier.price}</span>
                            </div>
                        ))}
                    </div>

                    {/* Table Body */}
                    {features.map((feature, i) => (
                        <div
                            key={feature.name}
                            className={cn(
                                "grid grid-cols-4 border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.01]",
                                i % 2 === 0 && "bg-white/[0.01]"
                            )}
                        >
                            <div className="p-3 lg:p-4 flex items-center">
                                <span className="text-[11px] md:text-[12px] text-white/50">{feature.name}</span>
                            </div>
                            <div className={cn(
                                "p-3 lg:p-4 flex items-center justify-center border-l border-white/[0.04]"
                            )}>
                                <FeatureIcon included={feature.starter} />
                            </div>
                            <div className={cn(
                                "p-3 lg:p-4 flex items-center justify-center border-l border-white/[0.04]",
                                "bg-brand/[0.02]"
                            )}>
                                <FeatureIcon included={feature.standard} />
                            </div>
                            <div className="p-3 lg:p-4 flex items-center justify-center border-l border-white/[0.04]">
                                <FeatureIcon included={feature.premium} />
                            </div>
                        </div>
                    ))}

                    {/* Table Footer CTAs */}
                    <div className="grid grid-cols-4 border-t border-white/[0.08] bg-white/[0.02]">
                        <div className="p-4" />
                        {tiers.map((tier) => (
                            <div key={tier.name} className={cn(
                                "p-4 flex items-center justify-center border-l border-white/[0.06]",
                                tier.highlighted && "bg-brand/[0.04]"
                            )}>
                                <Link href="/contact" className="w-full">
                                    <Button className={cn(
                                        "w-full h-10 rounded-none uppercase text-[9px] tracking-[0.2em]",
                                        tier.highlighted
                                            ? "bg-white text-black hover:bg-zinc-200"
                                            : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white"
                                    )}>
                                        Choose
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
