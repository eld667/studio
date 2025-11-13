"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function ProjectCard({ title, description, imageUrl }: ProjectCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  });
  
  const glowOpacity = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.6, 1], 
    [0, 1, 1, 0]
  );

  return (
    <a href="#" ref={ref} className="relative block rounded-xl">
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 rounded-xl filter drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
      />
      <div className="relative bg-gray-900 border border-white/10 p-6 rounded-xl overflow-hidden h-full transition-all duration-300 ease-in-out">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="mb-4 rounded-lg"
        />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </a>
  );
}
