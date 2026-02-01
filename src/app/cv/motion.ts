'use client';

import { useState, useEffect } from 'react';

export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  section: 0.8,
} as const;

export const ease = {
  entrance: [0, 0, 0.2, 1] as const, // easeOut
  hover: [0.4, 0, 0.2, 1] as const,   // easeInOut
} as const;

export const stagger = {
  children: 0.08,
  sections: 0.12,
} as const;

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

export function getTransition(reducedMotion: boolean, overrides?: { duration?: number; delay?: number }) {
  if (reducedMotion) {
    return {
      duration: 0,
      delay: 0,
      ease: ease.entrance,
      ...overrides,
    };
  }
  return {
    duration: overrides?.duration ?? duration.normal,
    delay: overrides?.delay ?? 0,
    ease: ease.entrance,
    ...overrides,
  };
}

export function getEntranceVariants(reducedMotion: boolean) {
  const y = reducedMotion ? 0 : 12;
  const opacity = reducedMotion ? 1 : 0;
  return {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : y },
    show: { opacity: 1, y: 0 },
  };
}

export function getStaggerContainer(reducedMotion: boolean, staggerDelay: number = stagger.children) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerDelay,
        delayChildren: reducedMotion ? 0 : 0,
      },
    },
  };
}
