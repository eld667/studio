"use client";

import { motion } from "framer-motion";
import React from "react";

type FadeInVariant = "default" | "subtle" | "none";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: FadeInVariant;
  transition?: { duration?: number; delay?: number; ease?: string | number[] };
}

const variantConfig: Record<FadeInVariant, { initial: { opacity: number; y: number }; transition: { duration: number; ease: string } }> = {
  default: { initial: { opacity: 0, y: 20 }, transition: { duration: 0.6, ease: "easeInOut" } },
  subtle: { initial: { opacity: 0, y: 8 }, transition: { duration: 0.4, ease: "easeOut" } },
  none: { initial: { opacity: 1, y: 0 }, transition: { duration: 0, ease: "easeOut" } },
};

export function FadeIn({ children, delay = 0, className, variant = "default", transition: transitionOverride }: FadeInProps) {
  const config = variantConfig[variant];
  const duration = transitionOverride?.duration ?? config.transition.duration;
  const ease = transitionOverride?.ease ?? config.transition.ease;
  const delayFinal = transitionOverride?.delay ?? delay;

  if (variant === "none") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={config.initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, ease, delay: delayFinal }}
      className={className}
    >
      {children}
    </motion.div>
  );
}