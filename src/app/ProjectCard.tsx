
"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { LucideProps } from 'lucide-react';
import React from 'react';

type Feature = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  text: string;
};

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  features: Feature[];
  'data-ai-hint'?: string;
}

const FeaturePill = ({ feature, index }: { feature: Feature, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = feature.icon;

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
      className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-brand"
    >
      <motion.div whileHover={{ scale: 1.2, color: 'hsl(var(--brand))' }}>
        <Icon className="h-3.5 w-3.5" />
      </motion.div>
      <span>{feature.text}</span>
    </motion.div>
  );
};


export function ProjectCard({ title, description, imageUrl, href, features, 'data-ai-hint': dataAiHint }: ProjectCardProps) {
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
    <Link href={href} ref={ref} className="relative block rounded-xl">
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-400 via-brand to-emerald-400 blur-md"
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
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {features.map((feature, index) => (
            <FeaturePill key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </Link>
  );
}
