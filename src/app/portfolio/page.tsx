
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
    <div className="flex flex-col min-h-screen bg-black text-gray-300 font-sans selection:bg-blue-500 selection:text-white">
      <Header onScroll={(e, id) => handleScroll(e, id)} />
      
      <main className="flex-grow pt-24 pb-32">
        <div className="w-full max-w-7xl mx-auto px-6">
          
          {/* --- HERO: SYSTEM STATUS --- */}
          <section className="mb-24 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] mb-8">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                Currently Deploying 28 Systems of Intelligence. {liveCount} Missions Live.
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white uppercase italic">
                The EldWork <br />
                <span className="bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">
                  Mission Registry.
                </span>
              </h1>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium">
                Optimized for speed, conversion, and intelligence density. Select a strategic pillar to inspect the architecture.
              </p>
            </FadeIn>
          </section>

          {/* --- STICKY SYSTEM FILTER --- */}
          <div className="sticky top-14 z-40 -mx-6 px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 mb-16">
            <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mr-4">Filter_By:</span>
              {PILLARS.map((p) => (
                <button
                  key={p.id}
                  onClick={(e) => handleScroll(e, p.id)}
                  className="whitespace-nowrap px-4 py-2 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-white/30 transition-all"
                >
                  [{p.label}]
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
                  <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-6">
                    <pillar.icon className="w-6 h-6 text-blue-500" />
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest">{pillar.label}</h2>
                    <span className="text-xs font-mono text-gray-600 ml-auto">{missions.length} ACTIVE_MISSIONS</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {missions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* --- PENDING MISSIONS FOOTER --- */}
          <section className="mt-48 p-12 rounded-[2rem] border border-white/5 bg-zinc-950/50 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Incoming Data</h3>
            <p className="text-gray-500 max-w-2xl mx-auto mb-12 italic">
              10 additional missions are currently in the pre-deployment queue, including automated SaaS growth tools and product immersion demos.
            </p>
            <div className="flex flex-wrap justify-center gap-3 opacity-30 grayscale pointer-events-none">
              {MISSIONS.filter(m => !m.isLive).map(m => (
                <span key={m.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px]">{m.title}</span>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* --- PERFORMANCE FOOTER --- */}
      <footer className="w-full border-t border-white/10 bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-blue-500" />
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.3em]">System Intelligence Compliance</span>
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Every system shown is optimized for &lt;1s load times and maximum intelligence density.
          </p>
          <p className="text-[10px] font-mono text-gray-600">
            &copy; 2025 EldWorkStudio. Global Mission Registry. v2.4.0
          </p>
        </div>
      </footer>
    </div>
  );
}

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-[#0a0a0a] border border-[#1a1a1a] p-6 hover:border-blue-500/50 transition-all duration-500"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-mono font-bold text-gray-500 uppercase">
          {mission.tech}
        </span>
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors uppercase italic">
        {mission.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-grow">
        {mission.outcome}
      </p>

      <Link 
        href={mission.slug} 
        target="_blank"
        className="mt-auto"
      >
        <button className="w-full py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2">
          Inspect Live Build <ArrowUpRight className="w-3 h-3" />
        </button>
      </Link>
    </motion.div>
  );
}
