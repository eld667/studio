
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Clock, 
  DollarSign, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export function AICalculator() {
  const [industry, setIndustry] = useState('Tech');
  const [size, setSize] = useState('200-1000');
  const [painPoint, setPainPoint] = useState('Operations');
  const [spend, setSpend] = useState(250000);
  const [results, setResults] = useState({
    savings: 0,
    time: 0,
    efficiency: 0
  });

  useEffect(() => {
    let baseRate = 0.22;
    
    // Industry adjustments
    if (industry === 'Finance') baseRate += 0.08;
    if (industry === 'Tech') baseRate += 0.05;
    if (industry === 'Healthcare') baseRate += 0.03;
    
    // Size adjustments
    if (size === '5000+') baseRate += 0.05;
    
    // Pain point adjustments
    if (painPoint === 'Data analysis') baseRate += 0.07;
    if (painPoint === 'Customer service') baseRate += 0.04;

    setResults({
      savings: Math.round(spend * baseRate),
      efficiency: Math.round(baseRate * 100),
      time: Math.round(baseRate * 40)
    });
  }, [industry, size, painPoint, spend]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* INPUTS */}
        <Card className="bg-white border-slate-200 p-8 shadow-xl rounded-2xl">
          <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00D4AA]" /> Configuration Parameters
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Industry Sector</label>
              <Select onValueChange={setIndustry} defaultValue={industry}>
                <SelectTrigger className="w-full h-12 border-slate-200 focus:ring-[#00D4AA]">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech">Technology</SelectItem>
                  <SelectItem value="Finance">Financial Services</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Size (Employees)</label>
              <Select onValueChange={setSize} defaultValue={size}>
                <SelectTrigger className="w-full h-12 border-slate-200 focus:ring-[#00D4AA]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50-200">50 - 200</SelectItem>
                  <SelectItem value="200-1000">200 - 1,000</SelectItem>
                  <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                  <SelectItem value="5000+">5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Friction Point</label>
              <Select onValueChange={setPainPoint} defaultValue={painPoint}>
                <SelectTrigger className="w-full h-12 border-slate-200 focus:ring-[#00D4AA]">
                  <SelectValue placeholder="Select pain point" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer service">Customer Service</SelectItem>
                  <SelectItem value="Content creation">Content Creation</SelectItem>
                  <SelectItem value="Data analysis">Data Analysis</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Sales">Sales & Business Dev</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimated Annual Spend on This Point</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="number" 
                  value={spend} 
                  onChange={(e) => setSpend(Number(e.target.value))}
                  className="pl-10 h-12 border-slate-200 focus:ring-[#00D4AA]"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* OUTPUTS */}
        <div className="bg-[#0A2540] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4AA]/5 rounded-full blur-[80px]" />
          
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#00D4AA] mb-12">Projected Annual Impact</h3>

          <div className="space-y-12 mb-16">
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Potential Annual Savings</p>
                <motion.p 
                  key={results.savings}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-bold text-[#D4AF37]"
                >
                  ${results.savings.toLocaleString()}
                </motion.p>
              </div>
              <DollarSign className="w-8 h-8 text-[#D4AF37]/20" />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Efficiency Gain</p>
                <motion.p 
                  key={results.efficiency}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl font-bold"
                >
                  {results.efficiency}%
                </motion.p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Reclaimed</p>
                <motion.p 
                  key={results.time}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl font-bold"
                >
                  {results.time} hrs<span className="text-xs text-slate-500 font-medium ml-1">/wk</span>
                </motion.p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-slate-400 italic">
              *Based on cross-industry implementation data from 2023-2024 enterprise deployments.
            </p>
            <Button className="w-full bg-[#00D4AA] hover:bg-[#00b08f] text-[#0A2540] font-black py-8 text-lg rounded-xl shadow-lg transition-all group">
              VIEW THE IMPLEMENTATION ROADMAP <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
