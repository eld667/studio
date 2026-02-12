
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle, Terminal, Bot, User } from "lucide-react";

export function AIDemoPreview() {
  const [step, setStep] = useState(0); // 0: Idle, 1: Typing, 2: AI Generating, 3: Completed
  const [aiText, setAiText] = useState("");
  const fullAiText = "Here is your high-converting email sequence outline:\n\n1. The curiosity-driven subject line\n2. The immediate value hook\n3. The empathetic pain point\n4. The AI-driven solution pitch\n5. The low-friction call to action\n\nEstimated time saved: 2 hours 45 minutes.";

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 2) {
      let i = 0;
      setAiText("");
      const timer = setInterval(() => {
        setAiText(fullAiText.slice(0, i));
        i++;
        if (i > fullAiText.length) clearInterval(timer);
      }, 10);
      return () => clearInterval(timer);
    }
  }, [step]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full">
      {/* BEFORE AI */}
      <div className="bg-[#1E293B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="bg-[#334155] px-4 py-2 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Manual Workflow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-red-400" />
            <span className="text-[10px] font-bold text-red-400">3 HOURS EST.</span>
          </div>
        </div>
        <div className="p-6 min-h-[300px] flex flex-col font-mono text-sm leading-relaxed">
          <div className="text-slate-500 mb-4 tracking-tighter">// TASK: Write email sequence</div>
          <div className="flex-grow">
            {step === 1 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-300"
              >
                Subject: How to use... <span className="animate-pulse">|</span>
              </motion.p>
            ) : step > 1 ? (
              <p className="text-slate-300">Subject: How to use...</p>
            ) : null}
          </div>
          <div className="mt-auto flex items-center gap-2 text-red-400/60 text-xs font-bold">
            <AlertCircle className="w-4 h-4" /> WRITER'S BLOCK DETECTED
          </div>
        </div>
      </div>

      {/* WITH AI */}
      <div className="bg-[#0F172A] border-2 border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] relative">
        <div className="bg-cyan-500/10 px-4 py-2 flex items-center justify-between border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Sarah's AI Engine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-bold text-cyan-400">15 MIN TOTAL</span>
          </div>
        </div>
        <div className="p-6 min-h-[300px] flex flex-col font-mono text-sm leading-relaxed bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05),transparent)]">
          <div className="text-cyan-500/50 mb-4 tracking-tighter">// STATUS: OPTIMIZING...</div>
          <div className="flex-grow whitespace-pre-wrap text-cyan-50">
            {step >= 2 ? (
              aiText
            ) : (
              <span className="text-slate-600 italic">Waiting for prompt...</span>
            )}
          </div>
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-auto flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20"
            >
              <CheckCircle2 className="w-4 h-4" /> Task Complete. Next?
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
