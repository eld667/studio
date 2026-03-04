"use client";

import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import SmoothScroll from '@/app/SmoothScroll';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from '@/app/Preloader';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'auto';
            window.scrollTo(0, 0);
        }, 900);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SmoothScroll>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader />}
            </AnimatePresence>
            <FirebaseClientProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </FirebaseClientProvider>
            <Toaster />
            <Footer />
        </SmoothScroll>
    );
}
