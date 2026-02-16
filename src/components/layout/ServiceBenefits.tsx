"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const pillars = [
  {
    id: "01",
    title: "More Customers, Less Chasing",
    body: "We build your site to show up on Google exactly when people are looking for you. Stop hunting for leads and start waking up to an inbox full of inquiries."
  },
  {
    id: "02",
    title: "Your Business on Autopilot",
    body: "From booking calendars to contact forms, we automate the \"busy work.\" Spend less time answering basic questions and more time closing deals."
  },
  {
    id: "03",
    title: "Look Like a Market Leader",
    body: "First impressions happen in seconds. We give you a world-class design that makes people trust your expertise before they even pick up the phone."
  },
  {
    id: "04",
    title: "No More \"Tech Headaches\"",
    body: "You won't need to worry about updates, security, or broken links. We handle the technical side entirely so you can stay focused on your vision."
  }
];

const PillarItem = ({ pillar }: { pillar: typeof pillars[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.7 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative py-12 border-b border-white/[0.06] last:border-0 transition-all duration-300 hover:bg-white/[0.02] px-4 -mx-4 rounded-xl"
      )}
    >
      <div className="flex gap-6">
        <span className="font-mono text-[10px] text-white/20 mt-1.5">{pillar.id} /</span>
        <div className="space-y-3">
          <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
            {pillar.title}
          </h3>
          <p className="text-sm md:text-[16px] leading-relaxed text-white/50 max-w-md">
            {pillar.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function ServiceBenefits() {
  return (
    <section id="benefits" className="w-full py-24 md:py-32 bg-[#0A0A0A] relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Sticky Content */}
          <div className="lg:w-[40%] lg:sticky lg:top-32 lg:h-fit space-y-8">
            <FadeIn>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                  [ SERVICE BENEFITS ] • FOR GROWING TEAMS • 0% TECH STRESS
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.1] mb-6">
                A website that works as hard as you do.
              </h2>
              
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-normal mb-8">
                You’re busy running a business. We build the digital tools that find your customers, book your appointments, and make you look like the leader in your industry.
              </p>

              <div className="flex flex-col items-start gap-4 pt-4">
                <Link href="/#contact">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-widest text-[10px] h-12 rounded-none">
                    Let's Grow Your Business
                  </Button>
                </Link>
                <Link href="/#plan">
                  <button className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
                    See Our Pricing <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Side: Pillars */}
          <div className="lg:w-[60%]">
            <div className="flex flex-col">
              {pillars.map((pillar) => (
                <PillarItem key={pillar.id} pillar={pillar} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
