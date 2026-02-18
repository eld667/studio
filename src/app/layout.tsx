
"use client";

import { useState, useEffect } from 'react';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import SmoothScroll from './SmoothScroll';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './Preloader';
import { Footer } from '@/components/layout/footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en" className="dark">
      <head>
        <title>EldWorkStudio</title>
      </head>
      <body className={`${spaceGrotesk.className} font-body antialiased bg-gray-950 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950`}>
        <SmoothScroll>
          <AnimatePresence mode="wait">
            {isLoading && <Preloader />}
          </AnimatePresence>
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
          <Toaster />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
