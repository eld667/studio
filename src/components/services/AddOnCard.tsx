"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AddOnCardProps {
    icon: React.ElementType;
    name: string;
    description: string;
    price: string;
    color: string; // tailwind color prefix like "blue", "emerald", "purple"
    index: number;
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
};

export function AddOnCard({ icon: Icon, name, description, price, color, index }: AddOnCardProps) {
    const colors = colorMap[color] || colorMap.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-white/[0.02] border border-white/[0.08] rounded-sm p-5 lg:p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.03]"
        >
            <div className="flex items-start gap-4">
                <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border",
                    colors.bg, colors.text, colors.border
                )}>
                    <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-sm font-medium text-white truncate">{name}</h3>
                        <span className="font-mono text-[10px] text-white/40 shrink-0">{price}</span>
                    </div>
                    <p className="text-[12px] text-white/40 leading-relaxed">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}
