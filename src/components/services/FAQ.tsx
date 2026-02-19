"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: "How long does a project typically take?",
        answer: "A Starter landing page is delivered in 3–5 business days. Standard builds take 1–2 weeks, and Premium projects are typically 2–4 weeks depending on scope. We always agree on a timeline before we start."
    },
    {
        question: "Do I own the code and design?",
        answer: "Yes, 100%. Once the project is delivered and paid for, you own everything — the code, the design files, and all assets. No lock-in, no hidden licensing."
    },
    {
        question: "What if I need changes after launch?",
        answer: "Minor tweaks (text updates, color changes) are included free for 30 days after launch. For ongoing changes, our Maintenance Plan ($49/mo) covers monthly updates, security patches, and priority support."
    },
    {
        question: "What tech stack do you use?",
        answer: "We build with Next.js, React, and TypeScript — the same stack used by companies like Vercel, Linear, and Notion. Your site will be fast, secure, and future-proof."
    },
    {
        question: "Can I add services later?",
        answer: "Absolutely. All our add-ons (chatbot, booking system, SEO, etc.) can be added at any time after launch. We design with modularity in mind so everything plugs in cleanly."
    },
    {
        question: "Do you offer refunds?",
        answer: "If we haven't started the build phase yet, we'll issue a full refund. Once design work has begun, we offer partial refunds based on work completed. We're transparent about this upfront."
    },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="border-b border-white/[0.06] last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 lg:py-6 text-left group"
                aria-expanded={isOpen}
            >
                <span className="text-sm md:text-[15px] font-medium text-white/80 group-hover:text-white transition-colors pr-4">
                    {faq.question}
                </span>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-white/30 transition-transform duration-300 shrink-0",
                        isOpen && "rotate-180 text-brand"
                    )}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="text-[13px] text-white/40 leading-relaxed pb-5 lg:pb-6 pr-8 max-w-2xl">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    return (
        <section className="w-full py-20 lg:py-32 relative">
            <div className="max-w-3xl mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">
                            [ COMMON QUESTIONS ]
                        </span>
                        <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tighter">
                            Frequently asked questions.
                        </h2>
                    </div>
                </FadeIn>

                <div className="border-t border-white/[0.06]">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} faq={faq} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
