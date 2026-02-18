"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Header } from '@/components/layout/header';
import { ServiceTierCard } from '@/components/services/ServiceTierCard';
import { AddOnCard } from '@/components/services/AddOnCard';
import { ProcessTimeline } from '@/components/services/ProcessTimeline';
import { PricingTable } from '@/components/services/PricingTable';
import { FAQ } from '@/components/services/FAQ';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Calendar, Bot, MailCheck, Search, BarChart3, Star, Server, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const tiers = [
    {
        name: "Quick Launch",
        price: "$299",
        description: "A clean, fast landing page that gets your business online in days — not weeks.",
        features: [
            "1-page responsive landing page",
            "Mobile-optimized design",
            "Basic contact form",
            "Hosted & deployed",
            "Delivered in 3–5 days",
        ],
    },
    {
        name: "Custom Build",
        price: "$799+",
        priceNote: "from",
        description: "A tailored, multi-section site designed to convert visitors into paying customers.",
        features: [
            "Custom multi-section design",
            "Copywriting guidance",
            "On-page SEO setup",
            "2 revision rounds",
            "Mobile-first responsive",
            "Performance optimized",
        ],
        highlighted: true,
    },
    {
        name: "Full Experience",
        price: "$2,000+",
        priceNote: "from",
        description: "A premium, multi-page digital experience with advanced functionality and polish.",
        features: [
            "Custom design + animations",
            "Multi-page site",
            "CMS integration",
            "Advanced forms & logic",
            "4 revision rounds",
            "Priority support",
        ],
    },
];

const addOns = [
    { icon: Calendar, name: "Booking System", description: "Calendly / Cal.com integration with custom styling", price: "$149", color: "blue" },
    { icon: Bot, name: "AI Chatbot", description: "FAQ-trained, lead-qualifying chat widget for your site", price: "$199", color: "purple" },
    { icon: MailCheck, name: "Automated Emails", description: "Welcome sequences, follow-ups, and lead nurture flows", price: "$149", color: "emerald" },
    { icon: Search, name: "Custom SEO", description: "On-page optimization, Google Business, local SEO, monthly reports", price: "$199/mo", color: "amber" },
    { icon: BarChart3, name: "Analytics Dashboard", description: "Google Analytics + custom reporting dashboard", price: "$99", color: "cyan" },
    { icon: Star, name: "Social Proof Setup", description: "Google Reviews widget, testimonials, and trust badges", price: "$79", color: "rose" },
    { icon: Server, name: "Domain + Hosting", description: "Custom domain, SSL, CDN, and managed hosting", price: "$19/mo", color: "blue" },
    { icon: Wrench, name: "Maintenance Plan", description: "Monthly updates, security patches, uptime monitoring", price: "$49/mo", color: "emerald" },
];

export default function ServicesPage() {
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
                <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                    {/* Dot grid background */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    <div className="max-w-5xl mx-auto px-6 relative z-10">
                        <FadeIn>
                            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-5">
                                [ SERVICES & PRICING ]
                            </span>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter leading-[1.1] mb-6 max-w-3xl">
                                Digital products, engineered for growth.
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-xl mb-8">
                                From fast $299 landing pages to full custom builds — we ship production-grade sites that convert visitors into customers.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <div className="flex items-center gap-4">
                                <Link href="#pricing">
                                    <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-11 px-8 uppercase text-[10px] tracking-[0.2em] font-medium group">
                                        View Pricing <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/#contact">
                                    <Button variant="outline" className="border-white/10 text-white/50 hover:text-white hover:border-white/20 rounded-none h-11 px-8 uppercase text-[10px] tracking-[0.2em]">
                                        Book a Call
                                    </Button>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ─── Divider ─── */}
                <div className="max-w-5xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── Service Tier Cards ─── */}
                <section id="pricing" className="w-full py-20 lg:py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <FadeIn>
                            <div className="text-center mb-14">
                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
                                    [ CORE OFFERINGS ]
                                </span>
                                <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tighter mb-4">
                                    Choose your starting point.
                                </h2>
                                <p className="text-sm text-white/40 max-w-md mx-auto">
                                    Every tier includes responsive design, mobile optimization, and full deployment.
                                </p>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                            {tiers.map((tier, i) => (
                                <ServiceTierCard
                                    key={tier.name}
                                    name={tier.name}
                                    price={tier.price}
                                    priceNote={tier.priceNote}
                                    description={tier.description}
                                    features={tier.features}
                                    highlighted={tier.highlighted}
                                    index={i}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Divider ─── */}
                <div className="max-w-5xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── Add-On Services ─── */}
                <section className="w-full py-20 lg:py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <FadeIn>
                            <div className="text-center mb-14">
                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
                                    [ ADD-ON MODULES ]
                                </span>
                                <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tighter mb-4">
                                    Bolt on what you need.
                                </h2>
                                <p className="text-sm text-white/40 max-w-md mx-auto">
                                    Every service is modular. Add them to any plan — now or later.
                                </p>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                            {addOns.map((addon, i) => (
                                <AddOnCard
                                    key={addon.name}
                                    icon={addon.icon}
                                    name={addon.name}
                                    description={addon.description}
                                    price={addon.price}
                                    color={addon.color}
                                    index={i}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Divider ─── */}
                <div className="max-w-5xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── Process ─── */}
                <ProcessTimeline />

                {/* ─── Divider ─── */}
                <div className="max-w-5xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── Comparison Table ─── */}
                <PricingTable />

                {/* ─── Divider ─── */}
                <div className="max-w-5xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── FAQ ─── */}
                <FAQ />

                {/* ─── Divider ─── */}
                <div className="max-w-5xl mx-auto px-6">
                    <div className="w-full h-px bg-white/[0.06]" />
                </div>

                {/* ─── CTA Section ─── */}
                <section className="w-full py-20 lg:py-28">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <FadeIn>
                            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-5">
                                [ GET STARTED ]
                            </span>
                            <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tighter mb-4">
                                Ready to build something great?
                            </h2>
                            <p className="text-sm text-white/40 max-w-md mx-auto mb-10">
                                Book a free 15-minute strategy call. We'll discuss your goals and find the right plan for you.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/#contact">
                                    <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-12 px-10 uppercase text-[10px] tracking-[0.2em] font-medium group">
                                        <Mail className="mr-2 w-3.5 h-3.5" /> Start a Project
                                    </Button>
                                </Link>
                                <Link href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="border-white/10 text-white/50 hover:text-white hover:border-white/20 rounded-none h-12 px-10 uppercase text-[10px] tracking-[0.2em]">
                                        Book a Free Call
                                    </Button>
                                </Link>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="font-mono text-[9px] text-white/15 uppercase tracking-[0.15em] mt-12">
                                No commitment required • Response within 24h
                            </p>
                        </FadeIn>
                    </div>
                </section>

            </main>
        </div>
    );
}
