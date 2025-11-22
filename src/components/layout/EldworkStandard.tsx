
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';

const standards = [
  {
    title: 'INTELLIGENT INFRASTRUCTURE',
    description: 'We reject slow builders like Wix/WordPress. We build on Next.js—the modern stack used by tech giants for unhackable security and instant speed.',
  },
  {
    title: 'REVENUE-FIRST DESIGN',
    description: "A pretty site is useless if it doesn't sell. We engineer 'Conversion Funnels'—strategic layouts designed to turn visitors into paying customers.",
  },
  {
    title: 'DIRECT PARTNERSHIP',
    description: 'No account managers. No outsourcing. You work directly with the Founder, ensuring your vision is executed perfectly and changes happen fast.',
  },
  {
    title: 'TAILORED SCALABILITY',
    description: "We don't force one-size-fits-all. Whether you need a rapid Launch Page or a corporate platform, we build a solution that fits your stage and grows with your ambition.",
  },
];

const accordionVariants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
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
      <FadeIn delay={0.2}>
        <div className="flex flex-col gap-4">
          {standards.map((item, index) => {
            const isOpen = index === expanded;
            return (
              <motion.div
                key={index}
                className="rounded-xl border border-white/10 overflow-hidden"
              >
                <motion.header
                  initial={false}
                  onClick={() => setExpanded(isOpen ? false : index)}
                  className="flex items-center justify-between p-6 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`text-5xl font-extralight transition-colors duration-300 ${
                        isOpen ? 'text-blue-400' : 'text-gray-600'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <h3
                      className={`text-2xl font-bold transition-colors duration-300 ${
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
                      className="px-6"
                    >
                      <div className="pb-6 pl-[88px] text-gray-400 max-w-prose">
                        {item.description}
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
