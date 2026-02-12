
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function WorkshopHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Agenda", href: "#agenda" },
    { label: "Instructor", href: "#instructor" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="bg-amber-500 text-black py-2 px-4 text-center text-xs font-bold uppercase tracking-widest z-[60] relative">
        ⚡ Next workshop: March 15th — 47 seats remaining
      </div>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-[#0F172A]/90 backdrop-blur-md border-white/10 h-16"
            : "bg-transparent border-transparent h-20"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Link href="/ai-workshop" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span className="font-bold text-xl tracking-tight text-white hidden sm:inline-flex uppercase">
              AI Marketing Workshop
            </span>
            <span className="font-bold text-xl tracking-tight text-white sm:hidden uppercase">
              AI WORKSHOP
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            >
              Save My Seat — $197
            </Button>
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[70] bg-[#0F172A] p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-bold text-xl text-amber-500 uppercase tracking-tight">AI WORKSHOP</span>
              <button onClick={() => setIsOpen(false)}><X className="w-8 h-8 text-white" /></button>
            </div>
            <nav className="flex flex-col gap-8 text-2xl font-bold">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-white hover:text-amber-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="w-full bg-amber-500 text-black py-8 text-xl rounded-xl mt-8"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Save My Seat — $197
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
