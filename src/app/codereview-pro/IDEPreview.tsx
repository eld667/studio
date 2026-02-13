
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageSquare, Check, AlertCircle, Sparkles } from "lucide-react";

const codeSnippet = `function calculateVelocity(sprints) {
  return sprints.reduce((acc, sprint) => {
    return acc + sprint.points;
  }, 0) / sprints.length;
}`;

export function IDEPreview() {
  const [typedCode, setTypedCode] = useState("");
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTypedCode(codeSnippet.slice(0, i));
      i++;
      if (i > codeSnippet.length) {
        clearInterval(timer);
        setTimeout(() => setShowComment(true), 1000);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0D1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
      {/* IDE Header */}
      <div className="bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0D1117] rounded-t-md border-x border-t border-white/10 text-xs text-slate-400">
            analytics.js
          </div>
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          CodeReview Pro v2.4
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-6 min-h-[300px] relative">
        <div className="flex gap-6">
          <div className="text-slate-600 text-right select-none w-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="flex-grow">
            <pre className="text-[#E6EDF3] leading-relaxed">
              <code>{typedCode}</code>
              <span className="w-2 h-4 bg-blue-400 inline-block animate-pulse ml-0.5 align-middle" />
            </pre>
          </div>
        </div>

        {/* AI Comment Overlay */}
        <AnimatePresence>
          {showComment && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              className="absolute top-24 right-8 w-72 bg-[#161B22] border border-blue-500/30 rounded-lg shadow-2xl z-20"
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-blue-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">AI Suggestion</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Refactor: Use <code className="text-emerald-400">sprints.length || 1</code> to avoid potential division by zero error if the array is empty.
                </p>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-1.5 rounded transition-colors uppercase tracking-tight">
                    Apply Fix
                  </button>
                  <button className="px-2 py-1.5 border border-white/10 text-slate-400 hover:text-white rounded transition-colors">
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="bg-white/5 px-4 py-2 flex items-center justify-between rounded-b-lg border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold">CR</div>
                  <span className="text-[10px] text-slate-500">Suggested by Pro-Bot</span>
                </div>
                <MessageSquare className="w-3 h-3 text-slate-600" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-blue-600 px-4 py-1 flex items-center justify-between text-white text-[10px] font-bold">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> 0 Errors</span>
          <span className="flex items-center gap-1 opacity-80">1 Suggestion</span>
        </div>
        <div>UTF-8</div>
      </div>
    </div>
  );
}
