
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onScroll: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => void;
}

const navLinks = [
  { id: "work", label: "Work" },
  { id: "philosophy", label: "Philosophy" },
  { id: "plan", label: "Plan" },
];

export function Header({ onScroll }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    onScroll(e, id);
    setIsOpen(false);
  };
  
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
          <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src="/eldwork-logo2.png"
              alt="EldWorkStudio Logo"
              width={140}
              height={32}
              className="relative z-10"
            />
          </Link>
          
          {/* Desktop Navigation - Ungrouped and distributed */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8 text-sm">
             {navLinks.map((link) => (
               <a 
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => onScroll(e, link.id)}
                className="text-gray-300 hover:text-white transition-colors"
               >
                {link.label}
              </a>
            ))}
            <Button
              onClick={(e) => onScroll(e, 'contact')}
              className="font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            >
              Book a Meeting
            </Button>
          </div>
          
          {/* Mobile Menu Trigger */}
          <div className="flex items-center md:hidden">
            <button
              className="text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full bg-gray-950 p-6"
            >
              <div className="flex justify-end mb-8">
                 <button
                    onClick={() => setIsOpen(false)}
                    className="text-white"
                    aria-label="Close menu"
                  >
                    <X />
                  </button>
              </div>
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-2xl font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  size="lg"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out"
                >
                  Book a Meeting
                </Button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
