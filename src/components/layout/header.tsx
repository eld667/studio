"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, Github, Twitter } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onScroll: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => void;
}

const navLinks = [
  { id: "philosophy", label: "Philosophy" },
  { id: "plan", label: "Plan" },
];

const allSectionIds = navLinks.map(l => l.id).concat('contact', 'work');

export function Header({ onScroll }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const activeSection = useActiveSection(allSectionIds, undefined, isHome);

  // Scroll-aware header background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

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
    setIsOpen(false);
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.1 + i * 0.1,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b transition-all duration-300",
          isScrolled
            ? "border-white/10 bg-black/80 backdrop-blur-lg shadow-[0_1px_20px_rgba(0,0,0,0.5)]"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-8">
          <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2 flex-shrink-0 relative z-50">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-white group-hover:text-black transition-colors">E</div>
              <span className="text-xl font-bold tracking-tighter text-white">EldWorkStudio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" role="navigation" aria-label="Main navigation">
            {/* Group A: Philosophy & Plan */}
            <div className="flex items-center gap-8 mr-8 border-r border-white/10 pr-8 h-5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={isHome ? `#${link.id}` : `/#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={cn(
                    "text-sm font-medium text-white/60 hover:text-white transition-colors relative",
                    activeSection === link.id && "text-white"
                  )}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Group B: Main Pages */}
            <div className="flex items-center gap-8">
              <Link
                href="/services"
                className={cn(
                  "text-sm font-medium text-white/60 hover:text-white transition-colors relative",
                  pathname === "/services" && "text-white"
                )}
              >
                Services
                {pathname === "/services" && (
                  <motion.span layoutId="activeDot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </Link>
              <Link
                href="/portfolio"
                className={cn(
                  "text-sm font-medium text-white/60 hover:text-white transition-colors relative",
                  pathname === "/portfolio" && "text-white"
                )}
              >
                Portfolio
                {pathname === "/portfolio" && (
                  <motion.span layoutId="activeDot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-medium text-white/60 hover:text-white transition-colors relative",
                  pathname === "/contact" && "text-white"
                )}
              >
                Contact
                {pathname === "/contact" && (
                  <motion.span layoutId="activeDot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            className="relative z-50 w-10 h-10 flex items-center justify-center md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-zinc-950 flex flex-col pt-32 px-6 pb-12 md:hidden"
          >
            <div className="flex flex-col gap-2 mb-12">
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">Menu</span>
              {[
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact", label: "Contact Us" },
                { href: "/about", label: "About" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-4xl font-medium text-white tracking-tight hover:text-white/70 transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-6 mt-auto">
              <motion.div variants={linkVariants} custom={4} className="h-px w-full bg-white/10" />

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">Sections</span>
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.id}
                      href={isHome ? `#${link.id}` : `/#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      variants={linkVariants}
                      custom={5 + i}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">Legal</span>
                  <motion.div variants={linkVariants} custom={7}>
                    <Link href="/legal" onClick={() => setIsOpen(false)} className="text-sm text-white/60 hover:text-white transition-colors">
                      Privacy & Terms
                    </Link>
                  </motion.div>
                </div>
              </div>

              <motion.div variants={linkVariants} custom={8} className="flex gap-4 pt-4">
                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all">
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all">
                  <Github className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
