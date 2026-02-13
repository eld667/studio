
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  MessageSquare, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Plus,
  Play,
  Settings,
  Bell
} from 'lucide-react';
import { cn } from "@/lib/utils";

const Node = ({ icon: Icon, label, color, x, y, isDraggable = false }: any) => {
  return (
    <motion.div
      drag={isDraggable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute z-10 cursor-grab active:cursor-grabbing"
      style={{ left: x, top: y }}
    >
      <div className={cn(
        "flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 min-w-[180px]",
        isDraggable && "ring-2 ring-blue-500 ring-offset-4"
      )}>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Trigger</p>
          <p className="text-sm font-black text-slate-900 leading-none">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function WorkflowCanvas() {
  const [active, setActive] = useState(false);

  return (
    <div className="relative w-full h-[600px] bg-slate-50 rounded-[3rem] border border-slate-200 overflow-hidden shadow-inner group">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      
      {/* Background Particles */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-500 rounded-full"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                style={{ offsetPath: "path('M 200 300 L 500 300 L 800 300')" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <path d="M 200 300 L 500 300 L 800 300" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="8 8" />
      </svg>

      <Node 
        icon={Zap} 
        label="New Lead in HubSpot" 
        color="bg-orange-500" 
        x="100px" 
        y="260px" 
        isDraggable 
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={() => setActive(!active)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500",
            active ? "bg-green-500 text-white rotate-180" : "bg-blue-600 text-white"
          )}
        >
          {active ? <CheckCircle2 className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </motion.button>
      </div>

      <Node 
        icon={MessageSquare} 
        label="Send Slack Alert" 
        color="bg-purple-600" 
        x="700px" 
        y="260px" 
      />

      {/* Floating UI Tooltips */}
      <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur border border-slate-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-3">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white" />
          <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white" />
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">3 Teams Collaborating</p>
      </div>

      <div className="absolute top-8 right-8 bg-white/80 backdrop-blur border border-slate-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Live Automating
        </p>
      </div>
    </div>
  );
}
