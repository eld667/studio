
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LuminaHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-stone-950/80 backdrop-blur-md border-b border-stone-800" 
        : "bg-gradient-to-b from-black/50 to-transparent border-b border-transparent"
    )}>
      <div className="relative mx-auto flex justify-between items-center max-w-7xl px-4 md:px-6 h-20">
        {/* Left: Hamburger Menu */}
        <div className="flex justify-start">
           <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full text-stone-100 hover:bg-stone-100/10 hover:text-amber-500">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Center: Logo (Absolutely Centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/demos/lumina-bistro" passHref>
            <span className="font-serif text-2xl tracking-[0.2em] uppercase text-stone-100 cursor-pointer">
              LUMINA
            </span>
          </Link>
        </div>

        {/* Right: CTA Button */}
        <div className="flex justify-end">
          <Button
            className={cn(
                "rounded-full text-sm tracking-wide transition-colors duration-300",
                "bg-amber-500 text-stone-950 hover:bg-amber-400",
                "w-10 h-10 flex items-center justify-center p-0",
                "md:w-auto md:px-6 md:py-2"
            )}
          >
            <span className="hidden md:inline">Book a Table</span>
            <CalendarDays className="h-5 w-5 md:hidden" />
          </Button>
        </div>
      </div>
    </header>
  );
}
