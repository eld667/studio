"use client";

import { useState, use } from "react";
import { FadeIn } from "@/app/FadeIn";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { ShieldAlert } from "lucide-react";

// Google "G" SVG icon
function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
        </svg>
    );
}

export default function LoginPage(props: {
    searchParams: Promise<{ error?: string; message?: string }>;
}) {
    const searchParams = use(props.searchParams);
    const [isLoading, setIsLoading] = useState(false);
    const isUnauthorized = searchParams.error === "unauthorized";


    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        // No need to setIsLoading(false) — the page will redirect
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#09090B]">
            {/* Simplified Header */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg shadow-[0_1px_20px_rgba(0,0,0,0.5)]">
                <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-8">
                    <a href="/" className="flex items-center space-x-2 flex-shrink-0 relative z-50">
                        <div className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-white group-hover:text-black transition-colors">
                                E
                            </div>
                            <span className="text-xl font-bold tracking-tighter text-white">
                                EldWorkStudio
                            </span>
                        </div>
                    </a>
                </div>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center px-6 relative w-full pt-32 pb-20">
                {/* Dot grid background */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                <FadeIn className="w-full max-w-sm relative z-10">
                    {/* Header */}
                    <div className="flex flex-col gap-2 text-center mb-10">
                        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block">
                            [ SECURE ACCESS ]
                        </span>
                        <h1 className="text-3xl font-medium tracking-tight text-zinc-100">
                            Client Portal
                        </h1>
                        <p className="text-zinc-500 text-sm">
                            Log in to view your project dashboard.
                        </p>
                    </div>

                    {/* Unauthorized Error Card */}
                    {isUnauthorized && (
                        <div className="mb-6 relative overflow-hidden rounded-md border border-red-500/20 bg-red-950/30 backdrop-blur-sm p-5">
                            {/* Glassmorphism glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />
                            <div className="relative flex gap-3">
                                <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-red-300 mb-1">
                                        Access Restricted
                                    </p>
                                    <p className="text-xs text-red-400/70 leading-relaxed">
                                        This email is not registered in our client system. Please{" "}
                                        <a
                                            href="/contact"
                                            className="underline underline-offset-2 hover:text-red-300 transition-colors"
                                        >
                                            contact us
                                        </a>{" "}
                                        if you believe this is an error.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Existing message errors (e.g., magic link) */}
                    {searchParams.message && !isUnauthorized && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center rounded-sm">
                            {searchParams.message}
                        </div>
                    )}

                    {/* Sign in card */}
                    <div className="border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6 rounded-lg space-y-5">
                        <Button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full bg-white text-black hover:bg-zinc-100 h-12 rounded-none font-medium text-sm flex items-center gap-3 justify-center transition-colors disabled:opacity-50"
                        >
                            <GoogleIcon />
                            {isLoading ? "Redirecting..." : "Sign in with Google"}
                        </Button>

                        <div className="relative flex items-center gap-3">
                            <div className="flex-1 h-px bg-white/[0.06]" />
                            <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                                Secure
                            </span>
                            <div className="flex-1 h-px bg-white/[0.06]" />
                        </div>

                        <p className="text-center text-xs text-zinc-600 leading-relaxed">
                            This portal is for invited clients only.
                            <br />
                            Public signups are disabled.
                        </p>
                    </div>
                </FadeIn>
            </main>
        </div>
    );
}
