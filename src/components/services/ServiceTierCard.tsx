"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ServiceTierCardProps {
    name: string;
    price: string;
    priceNote?: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    index: number;
}

export function ServiceTierCard({ name, price, priceNote, description, features, highlighted = false, index }: ServiceTierCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "group relative flex flex-col bg-white/[0.02] border rounded-sm p-6 lg:p-8 transition-all duration-300 hover:-translate-y-[2px]",
                highlighted
                    ? "border-brand/30 hover:border-brand/50 shadow-[0_0_30px_hsl(var(--brand)/0.06)]"
                    : "border-white/[0.08] hover:border-white/20"
            )}
        >
            {/* Recommended badge */}
            {highlighted && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-brand text-[9px] font-mono uppercase tracking-[0.2em] text-white rounded-sm">
                    Recommended
                </div>
            )}

            <div className="space-y-6 flex-1">
                {/* Header */}
                <div className="space-y-3">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
                        {name}
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-medium text-white tracking-tighter">
                            {price}
                        </span>
                        {priceNote && (
                            <span className="text-[11px] text-white/30 font-mono">{priceNote}</span>
                        )}
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/[0.06]" />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                            <Check className="w-3.5 h-3.5 text-brand mt-0.5 shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA */}
            <div className="pt-6 mt-auto">
                <Link href="/contact">
                    <Button
                        className={cn(
                            "w-full h-11 rounded-none uppercase text-[10px] tracking-[0.2em] font-medium group/btn",
                            highlighted
                                ? "bg-white text-black hover:bg-zinc-200"
                                : "bg-white/[0.06] text-white/70 hover:bg-white/[0.1] hover:text-white border border-white/10"
                        )}
                    >
                        Get Started <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
