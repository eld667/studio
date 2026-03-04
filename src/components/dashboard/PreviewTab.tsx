"use client";

import { ExternalLink, Globe, AlertCircle } from "lucide-react";
import { FadeIn } from "@/app/FadeIn";

interface PreviewTabProps {
    previewUrl: string | null | undefined;
    projectName: string | null | undefined;
}

export function PreviewTab({ previewUrl, projectName }: PreviewTabProps) {
    if (!previewUrl) {
        return (
            <FadeIn>
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="w-14 h-14 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mb-5">
                        <Globe className="w-6 h-6 text-white/20" />
                    </div>
                    <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] block mb-3">
                        [ NO PREVIEW AVAILABLE ]
                    </span>
                    <p className="text-white/30 text-sm max-w-xs">
                        A staging URL hasn't been set up for this project yet. We'll update this when your build goes live.
                    </p>
                </div>
            </FadeIn>
        );
    }

    return (
        <FadeIn>
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block mb-1">
                            [ LIVE PREVIEW ]
                        </span>
                        <p className="text-white/60 text-xs font-mono truncate max-w-xs">{previewUrl}</p>
                    </div>
                    <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all font-mono text-[9px] uppercase tracking-widest rounded-none"
                    >
                        <ExternalLink className="w-3 h-3" />
                        Open in New Tab
                    </a>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-md border border-amber-400/15 bg-amber-400/5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400/60 flex-shrink-0 mt-0.5" />
                    <p className="font-mono text-[9px] text-amber-400/50 uppercase tracking-wider leading-relaxed">
                        This is a staging environment. Content and design may differ from the final site.
                    </p>
                </div>

                {/* iFrame */}
                <div className="relative rounded-lg overflow-hidden border border-white/[0.07] bg-black shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                        </div>
                        <div className="flex-1 mx-4 h-5 bg-white/[0.04] rounded border border-white/[0.06] flex items-center px-2.5">
                            <Globe className="w-2.5 h-2.5 text-white/20 mr-1.5" />
                            <span className="font-mono text-[9px] text-white/20 truncate">{previewUrl}</span>
                        </div>
                    </div>
                    <iframe
                        src={previewUrl}
                        title={`Live Preview — ${projectName ?? "Project"}`}
                        className="w-full h-[60vh] border-0"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                </div>
            </div>
        </FadeIn>
    );
}
