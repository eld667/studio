
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { FadeIn } from '../FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Sparkles, 
  Code, 
  ArrowUpRight, 
  ShieldCheck, 
  BarChart3, 
  Layout, 
  Target, 
  Cpu, 
  Search,
  ChevronRight,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// --- MISSION DATABASE ---
type Pillar = 'LEAD-MACHINE' | 'LUXURY-SHOWCASE' | 'PRODUCT-DEMO' | 'PORTFOLIO-CREATIVE' | 'LANDING-PAGE' | 'SAAS-MARKETING' | 'EVENT-PROMO';

interface Mission {
  id: string;
  title: string;
  slug: string;
  pillar: Pillar;
  outcome: string;
  isLive: boolean;
  tech: string;
}

const MISSIONS: Mission[] = [
  // Group 1: LEAD-MACHINE
  { id: 'm1', title: 'Elite Roofing', slug: '/elite-roofing', pillar: 'LEAD-MACHINE', outcome: 'Engineered for high-intent homeowner lead capture.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm2', title: 'PureGreen Lawn', slug: '/puregreen-lawn', pillar: 'LEAD-MACHINE', outcome: 'Optimized conversion funnel for local services.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm3', title: 'BrightSpark Electric', slug: '/brightspark-electric', pillar: 'LEAD-MACHINE', outcome: 'Emergency response UX for rapid dispatching.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm4', title: 'SwiftMove Movers', slug: '/swiftmove-movers', pillar: 'LEAD-MACHINE', outcome: 'Multi-step quote calculator for logistics growth.', isLive: true, tech: 'Next.js + Tailwind' },
  
  // Group 2: LUXURY-SHOWCASE
  { id: 'm5', title: 'Atelier Vérité', slug: '/atelier-verite', pillar: 'LUXURY-SHOWCASE', outcome: 'Cinematic storytelling for high-end craft.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm6', title: 'Maison d\'Or', slug: '/maison-dor', pillar: 'LUXURY-SHOWCASE', outcome: 'Interactive jewelry salon with 3D product focus.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm7', title: 'Reserve Whisky Vault', slug: '/reserve-whisky', pillar: 'LUXURY-SHOWCASE', outcome: 'Gated membership experience for collectors.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm8', title: 'Kintsugi Wellness', slug: '/kintsugi-wellness', pillar: 'LUXURY-SHOWCASE', outcome: 'Minimalist healing sanctuary visual design.', isLive: true, tech: 'Next.js + Tailwind' },

  // Group 3: PRODUCT-DEMO
  { id: 'm9', title: 'Nebula Sound Pro', slug: '/nebula-sound', pillar: 'PRODUCT-DEMO', outcome: 'Immersive audio-visual product demonstration.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm10', title: 'Lumina Desk', slug: '/lumina-desk', pillar: 'PRODUCT-DEMO', outcome: 'Feature-first hardware showcase.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm11', title: 'Haven Air Purifier', slug: '/haven-air', pillar: 'PRODUCT-DEMO', outcome: 'Scientific particle simulation air quality dashboard.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm12', title: 'Summit Brew', slug: '/summit-brew', pillar: 'PRODUCT-DEMO', outcome: 'Process-centric coffee tech immersion.', isLive: true, tech: 'Next.js + Tailwind' },

  // Group 4: PORTFOLIO-CREATIVE
  { id: 'm13', title: 'Atelier Noir', slug: '/atelier-noir', pillar: 'PORTFOLIO-CREATIVE', outcome: 'Editorial layout for fashion houses.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm14', title: 'Kinship Studio', slug: '/kinship-studio', pillar: 'PORTFOLIO-CREATIVE', outcome: 'Minimalist photography portfolio architecture.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm15', title: 'Momentum Films', slug: '/momentum-films', pillar: 'PORTFOLIO-CREATIVE', outcome: 'Cinematic video-first production showcase.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm16', title: 'Form & Field', slug: '/form-field', pillar: 'PORTFOLIO-CREATIVE', outcome: 'Geometric industrial design studio explorer.', isLive: true, tech: 'Next.js + Tailwind' },

  // Group 5: LANDING-PAGE
  { id: 'm17', title: 'SEO Playbook', slug: '/seo-playbook', pillar: 'LANDING-PAGE', outcome: 'Direct response curriculum sales funnel.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm18', title: 'Agency Accelerator', slug: '/agency-accelerator', pillar: 'LANDING-PAGE', outcome: 'High-ticket coaching application system.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm19', title: 'SaaS Launch Checklist', slug: '/saas-checklist', pillar: 'LANDING-PAGE', outcome: 'Lead magnet strategy for software founders.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm20', title: 'AI Marketing Workshop', slug: '/ai-workshop', pillar: 'LANDING-PAGE', outcome: 'Live demo hook for technical training.', isLive: true, tech: 'Next.js + Tailwind' },

  // Group 6: SAAS-MARKETING
  { id: 'm21', title: 'FlowSync', slug: '/flowsync', pillar: 'SAAS-MARKETING', outcome: 'Feature-heavy software growth marketing.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm22', title: 'CustomerHub', slug: '/customerhub', pillar: 'SAAS-MARKETING', outcome: 'Metric-centric CRM platform landing page.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm23', title: 'InvoiceFlow', slug: '/invoiceflow', pillar: 'SAAS-MARKETING', outcome: 'Security-first fintech marketing UX.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm24', title: 'CodeReview Pro', slug: '/codereview-pro', pillar: 'SAAS-MARKETING', outcome: 'Developer-centric SaaS positioning.', isLive: true, tech: 'Next.js + Tailwind' },

  // Group 7: EVENT-PROMO
  { id: 'm25', title: 'SaaStr Annual', slug: '/saastr-annual', pillar: 'EVENT-PROMO', outcome: 'FOMO-driven industry networking tool.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm26', title: 'Design Matters', slug: '/design-matters', pillar: 'EVENT-PROMO', outcome: 'Interactive concept visualizer for festivals.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm27', title: 'AI for Business Summit', slug: '/ai-summit', pillar: 'EVENT-PROMO', outcome: 'Credible ROI calculator for executives.', isLive: true, tech: 'Next.js + Tailwind' },
  { id: 'm28', title: 'Founder Retreat', slug: '/founder-retreat', pillar: 'EVENT-PROMO', outcome: 'Intimate cohort preview for retreat vetting.', isLive: true, tech: 'Next.js + Tailwind' },
];

const PILLARS: { id: Pillar; label: string; icon: any }[] = [
  { id: 'LEAD-MACHINE', label: 'Lead Machines', icon: Target },
  { id: 'LUXURY-SHOWCASE', label: 'Luxury Showcases', icon: Sparkles },
  { id: 'PRODUCT-DEMO', label: 'Product Demos', icon: Layout },
  { id: 'PORTFOLIO-CREATIVE', label: 'Creative Portfolios', icon: Code },
  { id: 'LANDING-PAGE', label: 'Direct Response', icon: Zap },
  { id: 'SAAS-MARKETING', label: 'SaaS Growth', icon: BarChart3 },
  { id: 'EVENT-PROMO', label: 'Event Promos', icon: Users },
];

export default function PortfolioPage() {
  const liveCount = MISSIONS.filter(m => m.isLive).length;

  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <Header onScroll={(e, id) => handleScroll(e, id)} />
      
      <main className="flex-grow pt-24 pb-32">
        <div className="w-full max-w-7xl mx-auto px-6">
          
          {/* --- HERO: SYSTEM STATUS --- */}
          <section className="mb-24 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-8">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-400"></span>
                </div>
                Active Missions: {liveCount} // Deployment Status: Online
              </div>
              <h1 className="text-4xl md:text-6xl font-medium mb-6 tracking-tighter text-zinc-100 uppercase">
                OPERATIONAL INDEX
              </h1>
              <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto font-normal leading-relaxed">
                A registry of high-performance digital architectures engineered for conversion and visual authority.
              </p>
            </FadeIn>
          </section>

          {/* --- STICKY SYSTEM FILTER --- */}
          <div className="sticky top-14 z-40 -mx-6 px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-zinc-800 mb-16">
            <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mr-2">Index_Registry:</span>
              {PILLARS.map((p) => (
                <button
                  key={p.id}
                  onClick={(e) => handleScroll(e, p.id)}
                  className="whitespace-nowrap py-2 text-[11px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* --- MISSION SECTIONS --- */}
          <div className="space-y-32">
            {PILLARS.map((pillar) => {
              const missions = MISSIONS.filter(m => m.pillar === pillar.id && m.isLive);
              if (missions.length === 0) return null;

              return (
                <section key={pillar.id} id={pillar.id} className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-12 border-b border-zinc-800 pb-6">
                    <pillar.icon className="w-4 h-4 text-zinc-500" />
                    <h2 className="text-xs font-medium text-zinc-100 uppercase tracking-[0.3em]">{pillar.label}</h2>
                    <span className="text-[10px] font-mono text-zinc-600 ml-auto">{missions.length} SYSTEMS</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {missions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* --- PENDING MISSIONS FOOTER --- */}
          <section className="mt-48 p-12 rounded-xl border border-zinc-800 bg-[#050505] text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
            <h3 className="text-xs font-medium text-zinc-100 uppercase tracking-[0.3em] mb-4">Pipeline_Registry</h3>
            <p className="text-[13px] text-zinc-500 max-w-2xl font-normal leading-relaxed mb-12">
              Additional missions are currently in the pre-deployment queue, including automated SaaS growth tools and luxury product immersion demos.
            </p>
            <div className="flex flex-wrap gap-3 opacity-20 pointer-events-none">
              {MISSIONS.filter(m => !m.isLive).map(m => (
                <span key={m.id} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-sm font-mono text-[9px] uppercase tracking-widest">{m.title}</span>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* --- PERFORMANCE FOOTER --- */}
      <footer className="w-full border-t border-zinc-800 bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 text-left space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-zinc-600" />
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em]">Operational Protocol v2.4.0</span>
          </div>
          <p className="text-[11px] font-normal text-zinc-500 uppercase tracking-widest">
            Every system in this index is optimized for high-density performance and conversion architecture.
          </p>
          <p className="text-[10px] font-mono text-zinc-700">
            &copy; 2025 ELDWORKSTUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-[#050505] border border-zinc-800 p-6 transition-all duration-300 hover:border-zinc-600"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest">
          {mission.tech}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-zinc-400 transition-colors" />
      </div>

      <h3 className="text-[14px] font-medium text-zinc-100 mb-3 uppercase tracking-tight">
        {mission.title}
      </h3>
      <p className="text-[13px] text-zinc-500 leading-relaxed mb-10 flex-grow font-normal">
        {mission.outcome}
      </p>

      <Link 
        href={mission.slug} 
        target="_blank"
        className="mt-auto"
      >
        <button className="w-full py-4 bg-transparent border border-zinc-800 text-zinc-300 font-mono text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-zinc-100 hover:text-black">
          Inspect_Build
        </button>
      </Link>
    </motion.div>
  );
}
