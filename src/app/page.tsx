
"use client";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";
import Link from "next/link";
import { EldworkStandard } from "@/components/layout/EldworkStandard";
import { ServiceBenefits } from "@/components/layout/ServiceBenefits";
import { FullServiceBundle } from "@/components/layout/FullServiceBundle";
import { ProcessSteps } from "@/components/layout/ProcessSteps";
import { CTASection } from "@/components/layout/CTASection";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

function ProjectViewport({
  title,
  impact,
  image,
  speed,
  href,
  height
}: {
  title: string;
  impact: string;
  image: string;
  speed: string;
  href: string;
  height: number;
}) {
  const isMobile = useIsMobile();
  const numericSpeed = parseFloat(speed) || 7;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);

  const isInView = useInView(viewportRef, { amount: 0.6 });

  useEffect(() => {
    const updateHeight = () => {
      if (viewportRef.current) {
        setViewportHeight(viewportRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const scrollTarget = `calc(-100% + ${viewportHeight}px)`;

  return (
    <FadeIn>
      <div className="flex flex-col gap-6 group">
        <div className="relative">
          {/* Workstation Lid (Screen Enclosure) */}
          <div className="border-2 border-zinc-800 bg-zinc-950 px-2 pt-4 pb-2 rounded-t-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
            <div
              ref={viewportRef}
              className="relative aspect-[16/10] overflow-hidden bg-zinc-900"
            >
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-40" />

              <motion.div
                className="w-full absolute top-0 left-0"
                initial={{ y: 0 }}
                animate={isMobile && isInView ? {
                  y: scrollTarget
                } : { y: 0 }}
                whileHover={!isMobile ? {
                  y: scrollTarget
                } : undefined}
                transition={{
                  duration: isMobile ? numericSpeed * 4 : numericSpeed,
                  ease: "linear",
                  repeat: isMobile && isInView ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={title}
                    width={1440}
                    height={height}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hinge Gap */}
          <div className="h-[2px] bg-black w-full" />

          {/* Workstation Base (Metallic Body) */}
          <div className="mx-[-4px] h-[14px] rounded-b-md bg-zinc-800 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 border-b-[3px] border-zinc-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]" />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-zinc-100 uppercase tracking-tight mb-1">
              {title}
            </h3>
            <p className="text-zinc-400 text-[14px] font-normal leading-relaxed min-h-[40px]">
              {impact}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href={href} className="flex-1">
              <Button
                size="sm"
                className="w-full bg-white text-black hover:bg-white/90 font-medium uppercase text-[10px] tracking-widest h-10 rounded-none"
              >
                Launch Live Demo
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-white/20 text-white hover:bg-white/5 font-medium uppercase text-[10px] tracking-widest h-10 rounded-none"
            >
              Systems Architecture
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function CaseStudyShowcase() {
  return (
    <section id="work" className="w-full bg-black py-24 px-6 -mt-32 md:-mt-40 relative z-30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-medium mb-6 text-zinc-100 uppercase tracking-tight">
              Flagship Operations
            </h2>
            <p className="text-[14px] text-zinc-500 max-w-2xl mx-auto font-normal">
              High-performance digital architectures engineered for conversion.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24">
          <ProjectViewport
            title="SwiftMove Movers"
            impact="Scaling Logistics with AI-Driven Dispatch & Real-Time UX."
            image="/images/swiftmove-movers.webp"
            speed="7.5s"
            href="/swiftmove-movers"
            height={5993}
          />

          <ProjectViewport
            title="Whisky Vault"
            impact="A Premium Digital Cellar: High-End E-commerce & Branding."
            image="/images/reserve-whisky.webp"
            speed="7s"
            href="/reserve-whisky"
            height={5650}
          />

          <ProjectViewport
            title="CustomerHub"
            impact="The Intelligence Hub: Advanced SaaS Data Visualization & Sync."
            image="/images/customerhub.webp"
            speed="9.5s"
            href="/customerhub"
            height={7355}
          />
        </div>

        <FadeIn>
          <div className="pt-16 border-t border-white/10">
            <Link href="/portfolio">
              <Button
                className="w-full bg-white text-black hover:bg-white/90 font-medium py-6 text-sm md:text-base uppercase tracking-[0.1em] transition-all group rounded-none"
              >
                PROCEED TO FULL REPOSITORY <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}





export default function Home() {
  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Handle initial hash scroll from external pages
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500); // Delay to allow content/lenis to initialize
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onScroll={handleScroll} />
      <main className="flex-grow">
        <Hero onExploreClick={(e) => handleScroll(e, 'work')}>
          In 2026, a generic website is costing you customers. We build high-trust, purpose-driven sites that turn visitors into clients.
        </Hero>
        <CaseStudyShowcase />
        <EldworkStandard />
        <ServiceBenefits />
        <FullServiceBundle />
        <ProcessSteps />
        <CTASection />
      </main>
    </div>
  );
}
