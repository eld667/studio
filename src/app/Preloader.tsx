
"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const iconVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

const containerVariants = {
  exit: {
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.4
    }
  }
};

const leftGate = {
  initial: { x: 0 },
  exit: {
    x: '-100vw',
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const rightGate = {
  initial: { x: 0 },
  exit: {
    x: '100vw',
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};


export function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950"
      variants={containerVariants}
      exit="exit"
    >
      <motion.div variants={leftGate}>
        <motion.div variants={iconVariants} initial="initial" animate="animate">
          <ChevronLeft className="w-32 h-32 md:w-64 md:h-64 text-brand [filter:drop-shadow(0_0_30px_hsl(var(--brand)/0.6))]" strokeWidth={3} />
        </motion.div>
      </motion.div>
      <motion.div variants={rightGate}>
        <motion.div variants={iconVariants} initial="initial" animate="animate">
          <ChevronRight className="w-32 h-32 md:w-64 md:h-64 text-brand [filter:drop-shadow(0_0_30px_hsl(var(--brand)/0.6))]" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
