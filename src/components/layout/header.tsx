"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Only run useActiveSection on the homepage for highlighting
  const activeSection = isHome ? useActiveSection(navLinks.map(l => l.id).concat('contact')) : null;

  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    if (isHome) {
      onScroll(e, id);
    }
    setIsOpen(false);
  };
  
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
          <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2 flex-shrink-0">
            <div className="relative z-10 flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">E</div>
              <span className="text-xl font-bold tracking-tighter text-white">EldWorkStudio</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center">
            {/* Group A: Internal */}
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.id}
                  href={isHome ? `#${link.id}` : `/#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={cn(
                    "text-gray-400 hover:text-white transition-all duration-300 text-sm",
                    activeSection === link.id && "font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* The Divider */}
            <div className="w-[1px] h-4 bg-white/20 mx-4" />

            {/* Group B: External */}
            <Link
              href="/portfolio"
              className={cn(
                "text-gray-400 hover:text-white transition-all duration-300 text-sm",
                pathname === "/portfolio" && "font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent"
              )}
            >
              Portfolio
            </Link>
          </div>
          
          {/* Group C: Action */}
          <div className="flex items-center gap-4">
            <Button
              onClick={(e) => handleLinkClick(e, 'contact')}
              className={cn(
                "font-semibold transition-all duration-300 ease-in-out text-primary-foreground hidden md:inline-flex",
                 activeSection === 'contact' 
                  ? "bg-gradient-to-r from-purple-500 via-blue-600 to-emerald-500"
                  : "bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400",
                 "drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              )}
            >
              Book a Meeting
            </Button>
            
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
                {/* Group A (Mobile) */}
                <div className="flex flex-col items-center gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={isHome ? `#${link.id}` : `/#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={cn(
                        "text-xl font-bold text-gray-300 hover:text-white transition-colors",
                        activeSection === link.id && "bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent"
                      )}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Horizontal Divider (Mobile) */}
                <div className="w-full h-[1px] bg-white/10" />

                {/* Group B (Mobile) */}
                <Link
                  href="/portfolio"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                      "text-2xl font-bold text-gray-300 hover:text-white transition-colors",
                      pathname === "/portfolio" && "bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent"
                    )}
                >
                  Portfolio
                </Link>

                {/* Group C (Mobile) */}
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
