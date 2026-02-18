"use client";

import React from 'react';
import { FadeIn } from '@/app/FadeIn';
import { Header } from '@/components/layout/header';
import Link from 'next/link';

export default function LegalPage() {
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
                <div className="max-w-3xl mx-auto px-6">

                    <FadeIn>
                        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-5">
                            [ LEGAL ]
                        </span>
                        <h1 className="text-3xl md:text-4xl font-medium text-white tracking-tighter mb-12">
                            Privacy & Terms
                        </h1>
                    </FadeIn>

                    <div className="space-y-16">

                        {/* Privacy Policy */}
                        <FadeIn delay={0.1}>
                            <section className="space-y-4">
                                <h2 className="text-lg font-medium text-white mb-4">Privacy Policy</h2>
                                <p className="text-sm text-white/40 leading-[1.8]">
                                    EldWorkStudio respects your privacy. We collect only the information you voluntarily provide through our contact forms — your name, email, and project details. This data is used solely to respond to your inquiry and manage our working relationship.
                                </p>
                                <p className="text-sm text-white/40 leading-[1.8]">
                                    We do not sell, share, or distribute your personal information to third parties. We use privacy-focused analytics to understand how visitors use our site, but no personally identifiable data is collected through analytics.
                                </p>
                                <p className="text-sm text-white/40 leading-[1.8]">
                                    Your data is stored securely using industry-standard encryption. You may request deletion of your data at any time by contacting us at <Link href="mailto:eldworkstudio.contact@gmail.com" className="text-[#007AFF] hover:underline">eldworkstudio.contact@gmail.com</Link>.
                                </p>
                            </section>
                        </FadeIn>

                        <div className="w-full h-px bg-white/[0.06]" />

                        {/* Terms of Service */}
                        <FadeIn delay={0.2}>
                            <section className="space-y-4">
                                <h2 className="text-lg font-medium text-white mb-4">Terms of Service</h2>
                                <p className="text-sm text-white/40 leading-[1.8]">
                                    By engaging EldWorkStudio for any project, you agree to the following terms:
                                </p>
                                <ul className="space-y-3 text-sm text-white/40 leading-[1.8]">
                                    <li className="flex gap-3">
                                        <span className="text-white/20 font-mono text-[10px] mt-1 shrink-0">01</span>
                                        <span><strong className="text-white/60">Ownership.</strong> Upon full payment, all code, design files, and assets become your property. You have full rights to use, modify, and distribute the deliverables.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-white/20 font-mono text-[10px] mt-1 shrink-0">02</span>
                                        <span><strong className="text-white/60">Payment.</strong> Payment is due upon project approval, before deployment to production. We accept bank transfer and online payment methods.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-white/20 font-mono text-[10px] mt-1 shrink-0">03</span>
                                        <span><strong className="text-white/60">Revisions.</strong> The number of revision rounds is defined by your chosen plan. Additional revisions beyond the included rounds are billed separately.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-white/20 font-mono text-[10px] mt-1 shrink-0">04</span>
                                        <span><strong className="text-white/60">Refunds.</strong> Full refund if work has not begun. Partial refund based on work completed if design has started. No refunds after project delivery and approval.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-white/20 font-mono text-[10px] mt-1 shrink-0">05</span>
                                        <span><strong className="text-white/60">Portfolio Rights.</strong> We reserve the right to showcase completed work in our portfolio unless explicitly agreed otherwise.</span>
                                    </li>
                                </ul>
                            </section>
                        </FadeIn>

                        <div className="w-full h-px bg-white/[0.06]" />

                        {/* Contact */}
                        <FadeIn delay={0.3}>
                            <section>
                                <p className="text-sm text-white/40 leading-[1.8]">
                                    Questions about these terms? Reach out at{' '}
                                    <Link href="mailto:eldworkstudio.contact@gmail.com" className="text-[#007AFF] hover:underline">
                                        eldworkstudio.contact@gmail.com
                                    </Link>
                                </p>
                                <p className="font-mono text-[9px] text-white/15 uppercase tracking-[0.15em] mt-8">
                                    Last updated: February 2026
                                </p>
                            </section>
                        </FadeIn>

                    </div>
                </div>
            </main>
        </div>
    );
}
