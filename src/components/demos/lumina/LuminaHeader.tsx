
"use client";

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export function LuminaHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 bg-gradient-to-b from-black/50 to-transparent">
      <div className="mx-auto flex justify-between items-center max-w-7xl px-6">
        {/* Left: Hamburger Menu */}
        <div className="w-1/3 flex justify-start">
          <Menu className="text-stone-100 hover:text-amber-500 cursor-pointer h-6 w-6" />
        </div>

        {/* Center: Logo */}
        <div className="w-1/3 text-center">
          <Link href="/demos/lumina-bistro" passHref>
            <span className="font-serif text-2xl tracking-[0.2em] uppercase text-stone-100 cursor-pointer">
              LUMINA
            </span>
          </Link>
        </div>

        {/* Right: CTA Button */}
        <div className="w-1/3 flex justify-end">
          <Button
            size="sm"
            className="rounded-full px-6 py-2 text-sm tracking-wide bg-transparent border border-amber-500/80 text-amber-500 hover:bg-amber-500 hover:text-black transition-colors duration-300"
          >
            Book a Table
          </Button>
        </div>
      </div>
    </header>
  );
}
