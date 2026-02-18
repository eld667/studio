"use client";

import React from 'react';
import { FadeIn } from '@/app/FadeIn';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090B] px-6">
            {/* Dot grid background */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 text-center max-w-md">
                <FadeIn>
                    <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] block mb-6">
                        [ ERROR 404 ]
                    </span>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <h1 className="text-6xl md:text-8xl font-medium text-white tracking-tighter mb-4">
                        404
                    </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <p className="text-sm md:text-base text-white/40 leading-relaxed mb-10">
                        This page doesn't exist — or maybe it was moved. Either way, let's get you somewhere useful.
                    </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/">
                            <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-11 px-8 uppercase text-[10px] tracking-[0.2em] font-medium group">
                                <Home className="mr-2 w-3 h-3" /> Back to Home
                            </Button>
                        </Link>
                        <Link href="/services">
                            <Button variant="outline" className="border-white/10 text-white/50 hover:text-white hover:border-white/20 rounded-none h-11 px-8 uppercase text-[10px] tracking-[0.2em]">
                                View Services
                            </Button>
                        </Link>
                    </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <p className="font-mono text-[9px] text-white/10 uppercase tracking-[0.15em] mt-16">
                        EldWorkStudio • /404
                    </p>
                </FadeIn>
            </div>
        </div>
    );
}
