
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Cpu, TrendingUp, Link2, Layers } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

// --- Animated Icon Components ---

const AnimatedCpuIcon = ({ active }: { active: boolean }) => (
  <motion.div
    animate={{
      scale: active ? [1, 1.05, 1] : 1,
      filter: active
        ? [
            'drop-shadow(0 0 0px hsl(217, 91%, 60%))',
            'drop-shadow(0 0 8px hsl(217, 91%, 60%))',
            'drop-shadow(0 0 0px hsl(217, 91%, 60%))',
          ]
        : 'drop-shadow(0 0 0px hsl(217, 91%, 60%))',
    }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  >
    <Cpu className="h-8 w-8" />
  </motion.div>
);

const AnimatedTrendingUpIcon = ({ active }: { active: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.polyline
      points="23 6 13.5 15.5 8.5 10.5 1 18"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: active ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeInOut', delay: active ? 0.3 : 0 }}
    />
    <motion.polyline
      points="17 6 23 6 23 12"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: active ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: active ? 0.8 : 0 }}
    />
  </svg>
);

const AnimatedLink2Icon = ({ active }: { active: boolean }) => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      d="M9 17H7A5 5 0 0 1 7 7h2"
      initial={{ pathLength: 0, x: 0 }}
      animate={{ pathLength: active ? 1 : 0, x: active ? -2 : 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.2 }}
    />
    <motion.path
      d="M15 7h2a5 5 0 0 1 0 10h-2"
      initial={{ pathLength: 0, x: 0 }}
      animate={{ pathLength: active ? 1 : 0, x: active ? 2 : 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.2 }}
    />
    <motion.line
      x1="8"
      y1="12"
      x2="16"
      y2="12"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut', delay: active ? 0.8 : 0 }}
    />
  </motion.svg>
);

const AnimatedLayersIcon = ({ active }: { active: boolean }) => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.polygon
      points="12 2 2 7 12 12 22 7 12 2"
      initial={{ y: 0 }}
      animate={{ y: active ? -2 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
    />
    <motion.polyline
      points="2 17 12 22 22 17"
      initial={{ y: 0 }}
      animate={{ y: active ? 2 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
    />
    <motion.polyline
      points="2 12 12 17 22 12"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    />
  </motion.svg>
);


const standards = [
  {
    title: 'INTELLIGENT INFRASTRUCTURE',
    description: 'We reject slow builders like Wix/WordPress. We build on Next.js—the modern stack used by tech giants for unhackable security and instant speed.',
    icon: AnimatedCpuIcon,
  },
  {
    title: 'REVENUE-FIRST DESIGN',
    description: "A pretty site is useless if it doesn't sell. We engineer 'Conversion Funnels'—strategic layouts designed to turn visitors into paying customers.",
    icon: AnimatedTrendingUpIcon,
  },
  {
    title: 'DIRECT PARTNERSHIP',
    description: 'No account managers. No outsourcing. You work directly with the Founder, ensuring your vision is executed perfectly and changes happen fast.',
    icon: AnimatedLink2Icon,
  },
  {
    title: 'TAILORED SCALABILITY',
    description: "We don't force one-size-fits-all. Whether you need a rapid Launch Page or a corporate platform, we build a solution that fits your stage and grows with your ambition.",
    icon: AnimatedLayersIcon,
  },
];

const accordionVariants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
};

export function EldworkStandard() {
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <section className="w-full max-w-5xl mx-auto py-24 px-6">
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
          THE ELDWORK STANDARD
        </h2>
      </FadeIn>
      <motion.div
        className="flex flex-col gap-4"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {standards.map((item, index) => {
          const isOpen = index === expanded;
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl border border-white/10 overflow-hidden relative"
            >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-emerald-500/50"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]"
                      initial={{ backgroundPosition: "200% 0" }}
                      animate={{ backgroundPosition: "-200% 0" }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.header
                initial={false}
                onClick={() => setExpanded(isOpen ? false : index)}
                className="relative z-10 flex items-center justify-between p-6 cursor-pointer"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <span
                    className={`text-3xl md:text-5xl font-extralight transition-colors duration-300 ${
                      isOpen ? 'text-blue-400' : 'text-gray-600'
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <div
                    className={cn(
                      'transition-colors duration-300',
                      isOpen ? 'text-blue-400' : 'text-gray-500',
                      isOpen && 'bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent'
                    )}
                  >
                    <Icon active={isOpen} />
                  </div>
                  <h3
                    className={`text-lg md:text-2xl font-bold transition-colors duration-300 ${
                      isOpen ? 'text-white' : 'text-gray-300'
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.header>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.section
                    key="content"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={accordionVariants}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="px-6 relative z-10"
                  >
                    <div className="pb-6 md:pl-[124px] text-gray-400 max-w-prose text-sm md:text-base">
                      {item.description}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

    