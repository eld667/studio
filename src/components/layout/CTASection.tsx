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
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full p-8 md:p-14 lg:p-20 rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-brand/10"
                >
                    {/* 1. Underlying Base Glow (Static ambient light - Very subtle) */}
                    <div className="absolute inset-0 z-0 bg-brand/5 blur-[120px] opacity-40" />

                    {/* 2. Perimeter Light Orbs (These physically travel along the edges) */}
                    <div className="absolute inset-[-4px] z-[1] rounded-[2.7rem] overflow-hidden pointer-events-none">
                        {/* Orb 1: Brand Color (Starts Top-Left, traces perimeter clockwise) */}
                        <motion.div
                            animate={{
                                left: ["0%", "100%", "100%", "0%", "0%"],
                                top: ["0%", "0%", "100%", "100%", "0%"],
                            }}
                            transition={{
                                duration: 8,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                            className="absolute w-[400px] h-[400px] bg-brand/90 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-90"
                        />
                        
                        {/* Orb 2: Purple Color (Starts Bottom-Left, traces perimeter counter-clockwise) */}
                        <motion.div
                            animate={{
                                left: ["0%", "100%", "100%", "0%", "0%"],
                                top: ["100%", "100%", "0%", "0%", "100%"],
                            }}
                            transition={{
                                duration: 10,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                            className="absolute w-[400px] h-[400px] bg-[#cf30aa]/90 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-80"
                        />
                    </div>

                    {/* 3. The Solid Glass Mask - OPAQUE enough to keep text perfectly readable and isolate the glow to the edges */}
                    <div className="absolute inset-[2px] z-[2] bg-[#070709]/95 backdrop-blur-3xl rounded-[2.4rem] shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]" />
                    
                    {/* 4. Noise Texture for "Frozen" effect */}
                    <div className="absolute inset-[2px] z-[2] opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay rounded-[2.4rem]" />

                    {/* 5. Solid base border to define the glass shape */}
                    <div className="absolute inset-[2px] z-[3] rounded-[2.4rem] border border-white/[0.08] pointer-events-none" />

                    {/* Content Wrapper */}
                    <div className="relative z-10 flex flex-col items-center">
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
                                    <Button className="w-full sm:w-auto h-14 px-10 bg-brand text-white hover:bg-brand/90 rounded-full uppercase text-xs tracking-[0.2em] font-bold transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center border-none">
                                        Start a Conversation <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                                <Link href="/services" className="w-full sm:w-auto">
                                    <Button variant="outline" className="w-full sm:w-auto h-14 px-10 border-white/10 text-white/60 hover:text-white hover:border-white/20 bg-white/5 backdrop-blur-sm rounded-full uppercase text-xs tracking-[0.2em] transition-all">
                                        View Services
                                    </Button>
                                </Link>
                            </div>

                            <p className="mt-12 font-mono text-[10px] text-white/20 uppercase tracking-widest">
                                Response time: Under 24 Hours
                            </p>
                        </FadeIn>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
