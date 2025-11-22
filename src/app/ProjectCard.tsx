
"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  'data-ai-hint'?: string;
}

export function ProjectCard({ title, description, imageUrl, 'data-ai-hint': dataAiHint }: ProjectCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  });
  
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.6, 0.75, 1],
    [0, 0, 1, 1, 0, 0]
  );

  return (
    <a href="#" ref={ref} className="relative block rounded-xl">
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 blur-md"
      />
      <div className="relative bg-gray-900 p-6 rounded-xl overflow-hidden h-full transition-all duration-300 ease-in-out">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="mb-4 rounded-lg"
          data-ai-hint={dataAiHint}
        />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </a>
  );
}
