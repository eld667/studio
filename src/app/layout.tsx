
"use client";

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import SmoothScroll from './SmoothScroll';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './Preloader';

// export const metadata: Metadata = {
//   title: 'EldWorkStudio',
//   description: 'Premium Web Solutions',
//   icons: {
//     icon: '/icon.png',
//     apple: '/icon.png',
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // You can also add logic to re-enable scrolling here if you disabled it
      document.body.style.cursor = 'auto';
      window.scrollTo(0, 0);
    }, 900); // Should be slightly less than the total preloader animation time

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>EldWorkStudio</title>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-gray-950 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950">
        <SmoothScroll>
          <AnimatePresence mode="wait">
            {isLoading && <Preloader />}
          </AnimatePresence>
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
          <Toaster />
        </SmoothScroll>
      </body>
    </html>
  );
}
