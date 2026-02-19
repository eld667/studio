
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ProjectDetail } from './ProjectDetail';
import { Zap, Sparkles, Smartphone, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import projectsData from './projects.json';

const categories = ['All Projects', 'Lead Machines', 'Luxury Showcases', 'System Automations'];

export function ProjectGrid() {
  const [filter, setFilter] = useState('All Projects');

  const filteredProjects = projectsData.filter(project =>
    filter === 'All Projects' || project.category === filter
  );

  return (
    <div className="space-y-12">
      {/* Strategic Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 border-b border-white/10 pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-6 py-2 rounded-full font-mono text-xs transition-all border",
              filter === cat
                ? "bg-brand text-white border-brand shadow-[0_0_15px_hsl(var(--brand)/0.5)]"
                : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
            )}
          >
            [{cat.toUpperCase()}]
          </button>
        ))}
      </div>

      {/* Atomic Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Sheet>
                <SheetTrigger asChild>
                  <button className="group relative w-full text-left overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 hover:border-brand/50 transition-all">
                    {/* Device Mockup Wrapper */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-4 py-2 bg-white text-black font-mono text-xs rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          //_VIEW_DEEP_DIVE
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-brand transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">
                            {project.niche}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                            <Zap className="w-3 h-3" />
                            ⚡ {project.metrics.loadTime} LOAD
                          </div>
                          <div className="flex items-center gap-1.5 text-brand font-mono text-[10px] bg-brand/10 px-2 py-0.5 rounded border border-brand/20">
                            <Sparkles className="w-3 h-3" />
                            SOUL_BUILD
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border border-black bg-zinc-800 flex items-center justify-center">
                              <Code className="w-3 h-3 text-brand" />
                            </div>
                          ))}
                        </div>
                        <span className="text-xs font-mono text-gray-600">
                          {project.techStack.slice(0, 2).join(' + ')}...
                        </span>
                      </div>
                    </div>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 w-full sm:max-w-xl border-white/10 bg-black overflow-y-auto">
                  <ProjectDetail project={project} />
                </SheetContent>
              </Sheet>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
