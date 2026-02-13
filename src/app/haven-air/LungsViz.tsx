
"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function LungsViz({ progress }: { progress: number }) {
  // Higher progress = more dirty air = faster/more stressed breathing
  const duration = progress > 100 ? 1.5 : 4;
  const scale = progress > 100 ? 1.15 : 1.05;

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Lung Stress Response</p>
      <div className="relative">
        <motion.svg 
          width="60" 
          height="60" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={progress > 100 ? "text-orange-500" : "text-teal-500"}
          animate={{ scale: [1, scale, 1] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M20.3 5.43a2.8 2.8 0 0 0-3.92 0l-.38.39a1.1 1.1 0 0 1-1.56 0l-.38-.39a2.8 2.8 0 1 0-3.92 3.93l.38.38a1.1 1.1 0 0 1 0 1.56l-.38.38a2.8 2.8 0 1 0 3.92 3.92l.38-.38a1.1 1.1 0 0 1 1.56 0l.38.38a2.8 2.8 0 1 0 3.92-3.92l-.38-.38a1.1 1.1 0 0 1 0-1.56l.38-.38a2.8 2.8 0 0 0 0-3.93Z" />
          <path d="M12 12V2" />
          <path d="M4.03 12.27a2.8 2.8 0 0 1 3.92 0l.38.38a1.1 1.1 0 0 0 1.56 0l.38-.38a2.8 2.8 0 1 1 3.92 3.92l-.38.38a1.1 1.1 0 0 0 0 1.56l.38.38a2.8 2.8 0 1 1-3.92 3.92l-.38-.38a1.1 1.1 0 0 0-1.56 0l-.38.38a2.8 2.8 0 1 1-3.92-3.92l.38-.38a1.1 1.1 0 0 0 0-1.56l-.38-.38a2.8 2.8 0 0 1 0-3.92Z" />
        </motion.svg>
        <div className={cn(
          "absolute inset-0 blur-xl opacity-20 rounded-full",
          progress > 100 ? "bg-orange-500" : "bg-teal-500"
        )} />
      </div>
      <p className="text-[8px] font-bold mt-4 text-slate-400 uppercase">{progress > 100 ? "Stressed" : "Deep Recovery"}</p>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
