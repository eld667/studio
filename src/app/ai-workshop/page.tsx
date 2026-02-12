
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Zap, 
  Target, 
  Gift, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Video,
  Mail,
  Play
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { FadeIn } from "@/app/FadeIn";
import { WorkshopHeader } from "@/components/layout/WorkshopHeader";
import { AIDemoPreview } from "./AIDemoPreview";
import { CountdownTimer } from "./CountdownTimer";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const registerSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
});

export default function AIMarketingWorkshopPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const sarahImg = PlaceHolderImages.find(img => img.id === 'instructor-sarah')?.imageUrl || "https://picsum.photos/seed/sarah/400/400";
  const liveImg = PlaceHolderImages.find(img => img.id === 'ai-workshop-live')?.imageUrl || "https://picsum.photos/seed/live/800/600";
  const toolkitImg = PlaceHolderImages.find(img => img.id === 'ai-toolkit-preview')?.imageUrl || "https://picsum.photos/seed/toolkit/800/600";
  const attendeeImg = PlaceHolderImages.find(img => img.id === 'attendee-1')?.imageUrl || "https://picsum.photos/seed/user1/200/200";

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", company: "" },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "AI Marketing Workshop Registration",
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Seat Reserved!", description: "Check your email for the workshop calendar invite." });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      <WorkshopHeader />

      <main>
        {/* 1. HERO: THE LIVE DEMO HOOK */}
        <section className="relative pt-20 pb-32 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-white uppercase italic">
                Watch AI Transform Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400">Marketing in Real-Time</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                Live 3-hour workshop: See exactly how to <span className="text-white">10x your content output</span> using AI — no tech skills required.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AIDemoPreview />
            </FadeIn>

            <div className="mt-16 flex flex-col items-center gap-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">This is what you'll learn to do in 3 hours</p>
              <Button 
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-black text-xl px-12 py-8 h-auto rounded-2xl shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-pulse hover:animate-none"
              >
                SAVE MY SEAT — $197
              </Button>
              <p className="text-sm font-bold text-amber-500/80">Only 500 seats — 47 remaining</p>
            </div>
          </div>
        </section>

        {/* 2. THE WORKSHOP PROMISE */}
        <section className="py-24 bg-[#0a0f1e] border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">What You'll Walk Away With</h2>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "AI Content Engine", 
                  icon: Bot, 
                  desc: "Generate 10 blog posts in the time it used to take for 1. Create social media calendars in 20 mins.",
                  color: "bg-purple-500"
                },
                { 
                  title: "Marketing Automation", 
                  icon: Zap, 
                  desc: "Set up AI-powered workflows. Automate repetitive tasks and build systems that work while you sleep.",
                  color: "bg-cyan-500"
                },
                { 
                  title: "Campaign Optimization", 
                  icon: Target, 
                  desc: "Use AI for A/B testing at scale. Predict winning ad copy and optimize based on data, not guesswork.",
                  color: "bg-blue-500"
                },
                { 
                  title: "Bonus Toolkit", 
                  icon: Gift, 
                  desc: "200+ proven AI prompts, tool stack recommendations, and a 30-day implementation plan included.",
                  color: "bg-amber-500"
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <Card className="bg-white/5 border-white/10 rounded-[2rem] h-full hover:border-cyan-500/50 transition-all duration-500 group">
                    <CardContent className="p-10 flex flex-col h-full">
                      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg", item.color)}>
                        <item.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 3. THE AGENDA */}
        <section id="agenda" className="py-24 bg-[#0F172A]">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">3 Hours That Will Change <br/><span className="text-cyan-400">Your Marketing Forever</span></h2>
              </FadeIn>
            </div>

            <div className="space-y-24">
              {[
                { 
                  hour: "Hour 1", 
                  title: "AI Content Creation Mastery", 
                  img: sarahImg, 
                  desc: "Live demo: Blog post from idea to publish in 15 min. Social media content at scale and email sequences that convert.",
                  items: ["Content ideation frameworks", "Bulk production secrets", "Conversion-first email prompts"]
                },
                { 
                  hour: "Hour 2", 
                  title: "Automation & Workflows", 
                  img: liveImg, 
                  desc: "Setting up AI marketing automation. Zapier + AI integrations, content calendar automation, and lead nurturing sequences.",
                  items: ["No-code automation setup", "Custom AI agent creation", "Workflow efficiency audits"]
                },
                { 
                  hour: "Hour 3", 
                  title: "Optimization & Scale", 
                  img: toolkitImg, 
                  desc: "A/B testing with AI and predictive analytics. Campaign optimization and scaling what works with live Q&A.",
                  items: ["Predictive performance data", "Scaling winning campaigns", "Advanced Q&A session"]
                }
              ].map((m, i) => (
                <FadeIn key={i} delay={0.1}>
                  <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", i % 2 !== 0 ? "lg:flex-row-reverse" : "")}>
                    <div className={cn("space-y-8", i % 2 !== 0 ? "lg:order-2" : "")}>
                      <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-cyan-500/20">
                        {m.hour}
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">{m.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed">{m.desc}</p>
                      <ul className="space-y-4">
                        {m.items.map((item, ii) => (
                          <li key={ii} className="flex items-center gap-3 text-slate-300 font-bold">
                            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={cn("relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl", i % 2 !== 0 ? "lg:order-1" : "")}>
                      <Image src={m.img} alt={m.title} fill className="object-cover" data-ai-hint="ai marketing interface" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. MEET YOUR INSTRUCTOR */}
        <section id="instructor" className="py-24 bg-[#0a0f1e] relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="bg-white/5 border border-white/10 rounded-[4rem] p-8 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-cyan-500/30">
                <Image src={sarahImg} alt="Sarah Chen" fill className="object-cover" data-ai-hint="sarah chen headshot" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-3xl font-black text-white uppercase tracking-tighter">Sarah Chen</p>
                  <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Sarah Chen • Strategist & Educator</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">Your Guide to <br/><span className="text-cyan-400">Marketing Mastery</span></h2>
                <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                  <p>"I spent 5 years as a marketing director at a Series B startup, drowning in content calendars and burning out. When AI tools emerged, I became obsessed with finding the 20% of features that drive 80% of results."</p>
                  <p>"In the past 2 years, I've trained 5,000+ marketers and helped 200+ companies implement AI workflows. This workshop is everything I wish I knew 2 years ago—condensed into 3 actionable hours."</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 opacity-50 grayscale hover:opacity-100 transition-opacity duration-500">
                  {["HubSpot", "Product Hunt", "Marketing Week", "LinkedIn"].map((logo) => (
                    <div key={logo} className="font-black text-sm uppercase tracking-widest text-white">{logo}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SOCIAL PROOF */}
        <section className="py-24 bg-[#0F172A]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">What Past Attendees Are Saying</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />)}
                </div>
                <p className="text-xl text-slate-400 font-medium">4.9/5 average rating from 2,400+ attendees</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { 
                  name: "Jennifer Park", 
                  role: "Marketing Director, SaaS Co", 
                  img: attendeeImg, 
                  quote: "I was skeptical about AI. 3 hours later, I had written 6 weeks of social content and set up 3 automations. Best $197 I've spent.",
                  result: "10x output in first month"
                },
                { 
                  name: "Marcus Johnson", 
                  role: "Agency Owner", 
                  img: attendeeImg, 
                  quote: "The automation section alone saved me 15 hours a week. I actually took a vacation for the first time in 2 years.",
                  result: "15 hrs/week saved"
                },
                { 
                  name: "Lisa Chen", 
                  role: "Content Marketer", 
                  img: attendeeImg, 
                  quote: "I went from spending 2 days on a blog post to 2 hours. My traffic tripled in 3 months using the AI system.",
                  result: "3x traffic in 90 days"
                },
              ].map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] h-full flex flex-col">
                    <p className="text-xl italic text-slate-300 mb-10 leading-relaxed">"{t.quote}"</p>
                    <div className="mt-auto flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/30">
                        <Image src={t.img} alt={t.name} fill className="object-cover" data-ai-hint="attendee photo" />
                      </div>
                      <div>
                        <p className="font-black text-white uppercase text-sm tracking-tight">{t.name}</p>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5 text-cyan-400 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Result: {t.result}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PRICING & GUARANTEE */}
        <section id="register" className="py-24 bg-[#0a0f1e] relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <FadeIn>
              <div className="bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-amber-500/20 p-1 rounded-[4rem] shadow-2xl shadow-cyan-500/10">
                <div className="bg-[#0F172A] p-12 md:p-20 rounded-[3.8rem]">
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic">Secure Your Seat</h2>
                  <div className="space-y-4 mb-12">
                    <p className="text-5xl md:text-8xl font-black text-white">$197</p>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Value if sold separately: <span className="line-through text-red-400/60">$1,088+</span></p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16 max-w-2xl mx-auto">
                    {[
                      "Live 3-Hour Workshop",
                      "Lifetime Recording Access",
                      "200+ Proven AI Prompts",
                      "Marketing Tool Stack Guide",
                      "Private Alumni Community",
                      "30-Day Implementation Plan"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                        <span className="font-bold text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl mb-12 text-left">
                    <p className="text-cyan-400 font-black uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Sarah's Show-Up Guarantee
                    </p>
                    <p className="text-slate-300 italic text-sm leading-relaxed">"Attend the full workshop and implement at least 3 tactics. If you don't save at least 5 hours/week, I'll refund 100% and you keep the toolkit. Zero risk."</p>
                  </div>

                  {isSuccess ? (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-black text-white uppercase">Mission Accepted.</h3>
                      <p className="text-slate-400">Your registration is confirmed. Check your inbox for details.</p>
                    </div>
                  ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
                          <input {...form.register("name")} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-cyan-500 focus:outline-none transition-all font-bold text-white" placeholder="John Doe" />
                          {form.formState.errors.name && <p className="text-red-400 text-xs">{form.formState.errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Work Email</label>
                          <input {...form.register("email")} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-cyan-500 focus:outline-none transition-all font-bold text-white" placeholder="john@company.com" />
                          {form.formState.errors.email && <p className="text-red-400 text-xs">{form.formState.errors.email.message}</p>}
                        </div>
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black text-2xl py-10 rounded-2xl shadow-[0_0_40px_rgba(245,158,11,0.2)] transition-all uppercase italic"
                      >
                        {form.formState.isSubmitting ? "Processing..." : "Register Now — $197"}
                      </Button>
                      <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4 flex items-center justify-center gap-4">
                        <span>Secure Checkout</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                        <span>Instant Confirmation</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                        <span>Team Access Included</span>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 7. FAQ */}
        <section id="faq" className="py-24 bg-[#0F172A] border-t border-white/5">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-4xl font-black text-white mb-16 text-center uppercase tracking-tight italic font-playfair underline decoration-cyan-500/30 underline-offset-8">INTEL <span className="text-cyan-400">DEBRIEF</span></h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "What if I can't attend live?", a: "No problem. Everyone gets 30-day access to the full recording, workbook, and toolkit. But attending live means you can ask questions and get feedback in real-time." },
                { q: "What tools do I need?", a: "Just a computer and internet. We'll cover free and paid AI tools, with free alternatives for everything. Most paid tools have free trials you can use." },
                { q: "Is this for beginners?", a: "Yes. We start with fundamentals and build up. Whether you're new to AI or have dabbled, you'll leave with a complete system." },
                { q: "Can I get my team to watch?", a: "Yes. One registration includes access for up to 3 team members from your company. Just share the link once you're inside." },
              ].map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-2xl px-6">
                  <AccordionTrigger className="text-left font-black text-lg hover:no-underline py-6 text-white uppercase tracking-tight">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-lg leading-relaxed pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="py-32 bg-gradient-to-b from-[#0F172A] to-cyan-950/20 relative overflow-hidden">
          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none italic">Your Marketing Will <br/><span className="text-amber-500">Never Be the Same</span></h2>
              <p className="text-xl md:text-3xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">3 hours. 10x output. Join 2,400+ marketers who've already transformed their workflow.</p>
              
              <div className="mb-16">
                <CountdownTimer />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Button 
                  onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg" 
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-black text-3xl px-16 py-10 h-auto rounded-3xl shadow-2xl transition-all uppercase italic"
                >
                  SAVE MY SEAT — $197
                </Button>
              </div>
              <p className="mt-12 text-slate-500 font-mono text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-4">
                Questions? <a href="mailto:hello@aimarketingworkshop.com" className="text-white hover:text-cyan-400 underline decoration-cyan-500/30">Email Support</a>
              </p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0a0f1e] py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Zap className="w-8 h-8 text-amber-500 fill-amber-500" />
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">AI Marketing Workshop</span>
          </div>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-12">Built for the next generation of content masters</p>
          <div className="flex justify-center gap-8 text-slate-400 font-medium">
            <Link href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Refund Policy</Link>
          </div>
          <p className="mt-12 text-slate-600 text-[10px] uppercase tracking-widest">&copy; 2025 EldWorkStudio AI Workshop. All rights reserved.</p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA (Bottom) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button 
          onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-amber-500 text-black font-black py-8 text-xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] rounded-2xl border-2 border-amber-600/20 backdrop-blur-sm italic"
        >
          REGISTER NOW — $197
        </Button>
      </div>
    </div>
  );
}
