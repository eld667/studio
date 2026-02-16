
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { FadeIn } from '../FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Sparkles, 
  Layout, 
  Code, 
  Zap, 
  BarChart3, 
  Users
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/use-active-section';
import { Button } from '@/components/ui/button';

// --- MISSION DATABASE ---
type Pillar = 'LEAD-MACHINE' | 'LUXURY-SHOWCASE' | 'PRODUCT-DEMO' | 'PORTFOLIO-CREATIVE' | 'LANDING-PAGE' | 'SAAS-MARKETING' | 'EVENT-PROMO';

interface Mission {
  id: string;
  title: string;
  slug: string;
  pillar: Pillar;
  outcome: string;
}

const MISSIONS: Mission[] = [
  { id: 'm1', title: 'Elite Roofing', slug: '/elite-roofing', pillar: 'LEAD-MACHINE', outcome: 'Engineered for high-intent homeowner lead capture.' },
  { id: 'm2', title: 'PureGreen Lawn', slug: '/puregreen-lawn', pillar: 'LEAD-MACHINE', outcome: 'Optimized conversion funnel for local services.' },
  { id: 'm3', title: 'BrightSpark Electric', slug: '/brightspark-electric', pillar: 'LEAD-MACHINE', outcome: 'Emergency response UX for rapid dispatching.' },
  { id: 'm4', title: 'SwiftMove Movers', slug: '/swiftmove-movers', pillar: 'LEAD-MACHINE', outcome: 'Multi-step quote calculator for logistics growth.' },
  { id: 'm5', title: 'Atelier Vérité', slug: '/atelier-verite', pillar: 'LUXURY-SHOWCASE', outcome: 'Cinematic storytelling for high-end craft.' },
  { id: 'm6', title: 'Maison d\'Or', slug: '/maison-dor', pillar: 'LUXURY-SHOWCASE', outcome: 'Interactive jewelry salon with 3D product focus.' },
  { id: 'm7', title: 'Reserve Whisky Vault', slug: '/reserve-whisky', pillar: 'LUXURY-SHOWCASE', outcome: 'Gated membership experience for collectors.' },
  { id: 'm8', title: 'Kintsugi Wellness', slug: '/kintsugi-wellness', pillar: 'LUXURY-SHOWCASE', outcome: 'Minimalist healing sanctuary visual design.' },
  { id: 'm9', title: 'Nebula Sound Pro', slug: '/nebula-sound', pillar: 'PRODUCT-DEMO', outcome: 'Immersive audio-visual product demonstration.' },
  { id: 'm10', title: 'Lumina Desk', slug: '/lumina-desk', pillar: 'PRODUCT-DEMO', outcome: 'Feature-first hardware showcase.' },
  { id: 'm11', title: 'Haven Air Purifier', slug: '/haven-air', pillar: 'PRODUCT-DEMO', outcome: 'Scientific air quality dashboard.' },
  { id: 'm12', title: 'Summit Brew', slug: '/summit-brew', pillar: 'PRODUCT-DEMO', outcome: 'Process-centric coffee tech immersion.' },
  { id: 'm13', title: 'Atelier Noir', slug: '/atelier-noir', pillar: 'PORTFOLIO-CREATIVE', outcome: 'Editorial layout for fashion houses.' },
  { id: 'm14', title: 'Kinship Studio', slug: '/kinship-studio', pillar: 'PORTFOLIO-CREATIVE', outcome: 'Minimalist photography portfolio architecture.' },
  { id: 'm15', title: 'Momentum Films', slug: '/momentum-films', pillar: 'PORTFOLIO-CREATIVE', outcome: 'Cinematic video-first production showcase.' },
  { id: 'm16', title: 'Form & Field', slug: '/form-field', pillar: 'PORTFOLIO-CREATIVE', outcome: 'Geometric industrial design studio explorer.' },
  { id: 'm17', title: 'SEO Playbook', slug: '/seo-playbook', pillar: 'LANDING-PAGE', outcome: 'Direct response curriculum sales funnel.' },
  { id: 'm18', title: 'Agency Accelerator', slug: '/agency-accelerator', pillar: 'LANDING-PAGE', outcome: 'High-ticket coaching application system.' },
  { id: 'm19', title: 'SaaS Launch Checklist', slug: '/saas-checklist', pillar: 'LANDING-PAGE', outcome: 'Lead magnet strategy for software founders.' },
  { id: 'm20', title: 'AI Marketing Workshop', slug: '/ai-workshop', pillar: 'LANDING-PAGE', outcome: 'Live demo hook for technical training.' },
  { id: 'm21', title: 'FlowSync', slug: '/flowsync', pillar: 'SAAS-MARKETING', outcome: 'Feature-heavy software growth marketing.' },
  { id: 'm22', title: 'CustomerHub', slug: '/customerhub', pillar: 'SAAS-MARKETING', outcome: 'Metric-centric CRM platform landing page.' },
  { id: 'm23', title: 'InvoiceFlow', slug: '/invoiceflow', pillar: 'SAAS-MARKETING', outcome: 'Security-first fintech marketing UX.' },
  { id: 'm24', title: 'CodeReview Pro', slug: '/codereview-pro', pillar: 'SAAS-MARKETING', outcome: 'Developer-centric SaaS positioning.' },
  { id: 'm25', title: 'SaaStr Annual', slug: '/saastr-annual', pillar: 'EVENT-PROMO', outcome: 'FOMO-driven industry networking tool.' },
  { id: 'm26', title: 'Design Matters', slug: '/design-matters', pillar: 'EVENT-PROMO', outcome: 'Interactive concept visualizer for festivals.' },
  { id: 'm27', title: 'AI for Business Summit', slug: '/ai-summit', pillar: 'EVENT-PROMO', outcome: 'Credible ROI calculator for executives.' },
  { id: 'm28', title: 'Founder Retreat', slug: '/founder-retreat', pillar: 'EVENT-PROMO', outcome: 'Intimate cohort preview for retreat vetting.' },
];

const PILLARS: { id: Pillar; label: string; icon: any }[] = [
  { id: 'LEAD-MACHINE', label: 'LEAD GENERATION', icon: Target },
  { id: 'LUXURY-SHOWCASE', label: 'PREMIUM BRANDS', icon: Sparkles },
  { id: 'PRODUCT-DEMO', label: 'PRODUCT SALES', icon: Layout },
  { id: 'PORTFOLIO-CREATIVE', label: 'CREATIVE SITES', icon: Code },
  { id: 'LANDING-PAGE', label: 'PROMO PAGES', icon: Zap },
  { id: 'SAAS-MARKETING', label: 'SOFTWARE & APPS', icon: BarChart3 },
  { id: 'EVENT-PROMO', label: 'EVENTS & GIGS', icon: Users },
];

function MissionCard({ mission }: { mission: Mission }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const imgSrc = `/images${mission.slug}.webp`;

  return (
    <div className="flex flex-col w-[42vw] md:w-full shrink-0 snap-start group">
      {/* --- KINETIC VIEWPORT --- */}
      <div 
        className="relative aspect-[16/10] w-full overflow-hidden border border-zinc-800 bg-zinc-900 rounded-sm cursor-pointer"
        onMouseEnter={() => setIsScrolling(true)}
        onMouseLeave={() => setIsScrolling(false)}
        onClick={() => setIsScrolling(!isScrolling)}
      >
        <motion.img
          src={imgSrc}
          alt={mission.title}
          className="w-full h-auto absolute top-0 left-0"
          animate={{ y: isScrolling ? "-80%" : "0%" }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>

      {/* --- ACTION & METADATA --- */}
      <Link href={mission.slug} target="_blank" className="block mt-2">
        <button className="w-full py-2.5 bg-transparent border border-zinc-800 text-zinc-400 text-[9px] font-mono uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black hover:border-zinc-100">
          VISIT_SITE_LIVE
        </button>
      </Link>

      <div className="mt-3">
        <h3 className="text-[13px] font-medium text-zinc-100 uppercase tracking-tighter leading-none">
          {mission.title}
        </h3>
        <p className="text-[11px] text-zinc-500 uppercase line-clamp-1 mt-1 font-normal tracking-tight">
          {mission.outcome}
        </p>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const activeSection = useActiveSection(PILLARS.map(p => p.id));

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
      
      <main className="flex-grow pt-32 pb-32">
        <div className="w-full max-w-7xl mx-auto px-6">
          
          {/* --- HERO SECTION --- */}
          <section className="mb-24 text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-8">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-400"></span>
                </div>
                MISSION_REGISTRY // DEPLOYMENT_STATUS: ONLINE
              </div>
              <h1 className="text-4xl md:text-6xl font-medium mb-6 tracking-tighter text-zinc-100 uppercase">
                OUR WORK.
              </h1>
              <p className="text-sm md:text-base text-zinc-500 max-w-2xl font-normal leading-relaxed uppercase tracking-tight">
                High-performance websites and smart systems built to help your business grow. Select a category below to see our solutions in action.
              </p>
            </FadeIn>
          </section>

          {/* --- STICKY TACTILE NAV --- */}
          <div className="sticky top-14 z-40 -mx-6 px-6 py-6 bg-black/80 backdrop-blur-xl border-b border-zinc-800 mb-16">
            <div className="max-w-7xl mx-auto">
              <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-4">EXPLORE BY NEED:</p>
              <div className="flex md:grid md:grid-cols-7 gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {PILLARS.map((p) => {
                  const isActive = activeSection === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={(e) => handleScroll(e, p.id)}
                      className={cn(
                        "whitespace-nowrap py-3 px-4 text-[10px] font-mono uppercase tracking-widest transition-all duration-200 border text-center flex-1",
                        isActive 
                          ? "bg-zinc-100 text-black border-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                          : "bg-transparent border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100"
                      )}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- MISSION SECTIONS --- */}
          <div className="space-y-32">
            {PILLARS.map((pillar) => {
              const missions = MISSIONS.filter(m => m.pillar === pillar.id);
              if (missions.length === 0) return null;

              return (
                <section key={pillar.id} id={pillar.id} className="scroll-mt-48">
                  <div className="flex items-center gap-4 mb-12 border-b border-zinc-800 pb-6">
                    <pillar.icon className="w-4 h-4 text-zinc-500" />
                    <h2 className="text-xs font-medium text-zinc-100 uppercase tracking-[0.3em]">{pillar.label}</h2>
                    <span className="text-[10px] font-mono text-zinc-600 ml-auto">{missions.length} SYSTEMS</span>
                  </div>

                  {/* High Density Grid / Slider */}
                  <div className="flex overflow-x-auto md:grid md:grid-cols-4 snap-x snap-mandatory gap-4 md:gap-6 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                    {missions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
