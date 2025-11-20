
"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const iconVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.5,
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
      duration: 0.8,
      delay: 0.5
    }
  }
};

const leftGate = {
  initial: { x: 0 },
  exit: {
    x: '-100vw',
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.5
    }
  }
};

const rightGate = {
  initial: { x: 0 },
  exit: {
    x: '100vw',
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.5
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
          <ChevronLeft className="w-24 h-24 md:w-32 md:h-32 text-blue-500 [filter:drop-shadow(0_0_15px_rgba(59,130,246,0.6))]" />
        </motion.div>
      </motion.div>
      <motion.div variants={rightGate}>
        <motion.div variants={iconVariants} initial="initial" animate="animate">
          <ChevronRight className="w-24 h-24 md:w-32 md:h-32 text-blue-500 [filter:drop-shadow(0_0_15px_rgba(59,130,246,0.6))]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
