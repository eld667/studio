"use client";
import { motion } from 'framer-motion';

const text = "In 2025, a generic website is costing you customers. We build high-trust, purpose-driven sites that turn visitors into clients.";
const words = text.split(" ");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.5 }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function AnimatedSubheadline() {
  return (
    <motion.p
      className="text-lg text-gray-400 max-w-2xl text-center mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[6px]" // mr-[6px] is the space
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
