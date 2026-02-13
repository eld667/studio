
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TerminalCTAProps {
  onSubmit: (email: string) => void;
  isSubmitting: boolean;
}

export function TerminalCTA({ onSubmit, isSubmitting }: TerminalCTAProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onSubmit(email);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#0D1117] rounded-lg border border-white/10 overflow-hidden font-mono shadow-2xl">
      <div className="bg-[#161B22] px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <Terminal className="w-3 h-3 text-slate-500" />
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">zsh — login</span>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-emerald-500 font-bold">$</span>
          <span className="text-slate-300">start-trial</span>
          <span className="text-slate-500 italic">--email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dev@company.com"
            className="flex-grow bg-transparent border-none outline-none text-blue-400 placeholder:text-slate-700 font-bold"
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#238636] hover:bg-[#2ea043] text-white font-bold rounded-md px-6 flex items-center gap-2"
          >
            {isSubmitting ? "PROCESSING..." : "EXECUTE"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
