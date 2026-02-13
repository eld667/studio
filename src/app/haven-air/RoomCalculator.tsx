
"use client";

import React, { useState } from 'react';
import { Slider } from '@/components/ui/button'; // Reusing slider if available, else standard
import { motion } from 'framer-motion';

export function RoomCalculator() {
  const [sqft, setSqft] = useState(500);

  const airChangeRate = Math.round((400 * 60) / (sqft * 8)); // Assuming 8ft ceiling

  return (
    <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Room Dimensions</p>
          <p className="text-4xl font-black text-slate-900">{sqft} <span className="text-lg text-slate-400">sq ft</span></p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-2">Air Refresh Rate</p>
          <p className="text-2xl font-black text-slate-900">{airChangeRate} <span className="text-sm text-slate-400 italic">Times / Hr</span></p>
        </div>
      </div>

      <input 
        type="range" 
        min="100" 
        max="2000" 
        step="50" 
        value={sqft}
        onChange={(e) => setSqft(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-100 text-center">
          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Standard Mode</p>
          <p className="font-bold text-teal-600">{Math.round(airChangeRate * 0.6)} ACH</p>
        </div>
        <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 text-center">
          <p className="text-[8px] font-black text-teal-600 uppercase mb-1">Haven Turbo</p>
          <p className="font-bold text-teal-700">{airChangeRate} ACH</p>
        </div>
      </div>
    </div>
  );
}
