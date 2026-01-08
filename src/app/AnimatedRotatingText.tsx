
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["AI Engineer", "Agentic Systems Builder", "AI Fullstack Developer"];

export function AnimatedRotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-7 w-full max-w-sm overflow-hidden text-left mt-1">
      <AnimatePresence>
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 text-xl text-gray-300 text-center md:text-left"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
