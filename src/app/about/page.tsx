"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { MapPin, Zap, Shield, CreditCard, ArrowRight, Users, Globe, Clock } from 'lucide-react';
import Link from 'next/link';

const values = [
    {
        icon: MapPin,
        title: "Built in Kosovo. Built for the world.",
        body: "We operate from Kosovo — one of Europe's fastest-growing tech hubs. This means you get world-class engineering at a fraction of Silicon Valley pricing. Same quality, smarter economics.",
        color: "blue",
    },
    {
        icon: Zap,
        title: "One client. Full focus. Fast delivery.",
        body: "We don't juggle ten projects at once. When we take you on, you're our only priority until your site is live. No waiting weeks for a reply — most projects ship in days, not months.",
        color: "emerald",
    },
    {
        icon: Shield,
        title: "We build what you need. Nothing more.",
        body: "No inflated proposals. No features you'll never use. We listen to what your business actually requires, then engineer exactly that — lean, effective, and purposeful.",
        color: "purple",
    },
    {
        icon: CreditCard,
        title: "You pay when you're happy.",
        body: "We don't ask for full payment upfront. You review the finished product, and only when you're satisfied and ready to go live do you pay. Zero risk on your side.",
        color: "amber",
    },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
};

const stats = [
    { value: "50+", label: "Projects Delivered", icon: Globe },
    { value: "3–5", label: "Days Avg. Delivery", icon: Clock },
    { value: "100%", label: "Client Ownership", icon: Users },
];

export default function AboutPage() {
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
            <main className="flex-grow">

                {/* ─── Hero ─── */}
                <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    <div className="max-w-4xl mx-auto px-6 relative z-10">
                        <FadeIn>
                            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-5">
                                [ ABOUT ELDWORKSTUDIO ]
                            </span>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter leading-[1.1] mb-6 max-w-3xl">
                                Small team. Sharp focus.<br className="hidden md:block" /> Honest work.
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-xl">
                                We're a lean engineering studio that builds high-performance websites for businesses that need results — without the agency overhead, the inflated timelines, or the unnecessary complexity.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* ─── Divider ─── */}
                <div className="max-w-4xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── Stats Bar ─── */}
                <section className="w-full py-14 lg:py-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="grid grid-cols-3 gap-6 lg:gap-12">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="text-center"
                                    >
                                        <Icon className="w-4 h-4 text-[#007AFF] mx-auto mb-3 opacity-60" />
                                        <div className="text-2xl md:text-3xl font-medium text-white tracking-tighter mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em]">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── Divider ─── */}
                <div className="max-w-4xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── Values / What Makes Us Different ─── */}
                <section className="w-full py-20 lg:py-28">
                    <div className="max-w-4xl mx-auto px-6">
                        <FadeIn>
                            <div className="mb-14">
                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
                                    [ WHY US ]
                                </span>
                                <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tighter">
                                    How we work differently.
                                </h2>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            {values.map((value, i) => {
                                const Icon = value.icon;
                                const colors = colorMap[value.color];
                                return (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="group bg-white/[0.02] border border-white/[0.08] rounded-sm p-6 lg:p-8 transition-all duration-300 hover:border-white/15"
                                    >
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border mb-5 ${colors.bg} ${colors.text} ${colors.border}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <h3 className="text-sm md:text-base font-medium text-white mb-2 tracking-tight">
                                            {value.title}
                                        </h3>
                                        <p className="text-[12px] md:text-sm text-white/40 leading-relaxed">
                                            {value.body}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── Divider ─── */}
                <div className="max-w-4xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── Our Approach (Narrative) ─── */}
                <section className="w-full py-20 lg:py-28">
                    <div className="max-w-3xl mx-auto px-6">
                        <FadeIn>
                            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
                                [ OUR PHILOSOPHY ]
                            </span>
                        </FadeIn>
                        <div className="space-y-6">
                            <FadeIn delay={0.1}>
                                <p className="text-sm md:text-base text-white/50 leading-[1.8]">
                                    We started EldWorkStudio because we saw the same problem everywhere: businesses paying thousands for websites that were slow, bloated, and built on templates disguised as "custom."
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-sm md:text-base text-white/50 leading-[1.8]">
                                    We believe a website should be a <span className="text-white/80 font-medium">tool, not a decoration</span>. It should load fast, rank on Google, and convert visitors into customers. Everything we build is engineered with that single goal.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <p className="text-sm md:text-base text-white/50 leading-[1.8]">
                                    We work with modern tools — Next.js, React, TypeScript — the same stack powering companies like Vercel, Linear, and Notion. But we don't charge like a San Francisco agency. We charge fairly, deliver fast, and build things that last.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ─── Divider ─── */}
                <div className="max-w-4xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── CTA ─── */}
                <section className="w-full py-20 lg:py-28">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <FadeIn>
                            <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tighter mb-4">
                                Let's build something together.
                            </h2>
                            <p className="text-sm text-white/40 max-w-md mx-auto mb-10">
                                No commitment, no pressure. Just a quick conversation about what your business needs.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/#contact">
                                    <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-11 px-10 uppercase text-[10px] tracking-[0.2em] font-medium group">
                                        Start a Conversation <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/services">
                                    <Button variant="outline" className="border-white/10 text-white/50 hover:text-white hover:border-white/20 rounded-none h-11 px-10 uppercase text-[10px] tracking-[0.2em]">
                                        View Services
                                    </Button>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </section>

            </main>
        </div>
    );
}
