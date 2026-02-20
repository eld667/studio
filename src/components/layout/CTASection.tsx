"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
    return (
        <section className="w-full py-24 lg:py-40 relative overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />
                <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full opacity-20 pointer-events-none" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <FadeIn>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                        <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                            Currently Accepting New Projects
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tighter leading-[1.05] mb-8">
                        Ready to build <br className="hidden md:block" />
                        <span className="text-zinc-500">something real?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-12">
                        No aggressive sales tactics. No strict commitments. Just a straightforward conversation about how we can help your business grow.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto h-14 px-10 bg-white text-black hover:bg-zinc-200 rounded-none uppercase text-xs tracking-[0.2em] font-bold transition-all hover:scale-105 active:scale-95">
                                Start a Conversation
                            </Button>
                        </Link>
                        <Link href="/services" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full sm:w-auto h-14 px-10 border-white/10 text-white/60 hover:text-white hover:border-white/20 bg-transparent rounded-none uppercase text-xs tracking-[0.2em] transition-all">
                                View Services
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-12 font-mono text-[10px] text-white/20 uppercase tracking-widest">
                        Response time: Under 24 Hours
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
