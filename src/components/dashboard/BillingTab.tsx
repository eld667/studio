"use client";

import { CreditCard, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { FadeIn } from "@/app/FadeIn";

export function BillingTab() {
    const cards = [
        {
            icon: CreditCard,
            label: "Invoices",
            desc: "View and download your invoices, payment history, and receipts.",
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/20",
        },
        {
            icon: TrendingUp,
            label: "Strategy Reports",
            desc: "Monthly growth reports, SEO audits, and performance breakdowns.",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20",
        },
        {
            icon: Calendar,
            label: "Book a Strategy Call",
            desc: "Schedule a 1:1 session with your dedicated account manager.",
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20",
        },
    ];

    return (
        <FadeIn>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block mb-2">
                        [ BILLING & STRATEGY ]
                    </span>
                    <h2 className="text-xl font-medium text-white tracking-tight">
                        Your billing hub & growth strategy.
                    </h2>
                    <p className="text-white/30 text-sm mt-1">
                        Full billing integration and strategy reports are coming soon.
                    </p>
                </div>

                {/* Placeholder Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.label}
                                className="p-5 rounded-lg border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm flex flex-col gap-4 group"
                            >
                                <div
                                    className={`w-10 h-10 rounded-md border flex items-center justify-center ${card.bg} ${card.border}`}
                                >
                                    <Icon className={`w-5 h-5 ${card.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-white mb-1">{card.label}</h3>
                                    <p className="text-xs text-white/35 leading-relaxed">{card.desc}</p>
                                </div>
                                <button
                                    disabled
                                    className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/15 cursor-not-allowed mt-auto"
                                >
                                    Coming Soon
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Strip */}
                <div className="p-5 rounded-lg border border-white/[0.06] bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-white">Questions about your plan?</p>
                        <p className="text-xs text-white/30 mt-0.5">
                            Reach out directly and we'll get back within 24h.
                        </p>
                    </div>
                    <a
                        href="mailto:hello@eldworkstudio.com"
                        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all font-mono text-[9px] uppercase tracking-widest rounded-none"
                    >
                        Contact Studio
                        <ArrowRight className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </FadeIn>
    );
}
