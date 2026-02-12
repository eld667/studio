
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Mail, 
  ChevronRight, 
  Layout, 
  Code, 
  Target, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  Download,
  AlertCircle,
  Clock,
  ExternalLink,
  Users,
  LineChart
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '../FadeIn';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// --- SCHEMAS ---
const contactSchema = z.object({
  email: z.string().email("Invalid return path"),
});

// --- TYPES ---
type Question = {
  id: number;
  text: string;
  options: { label: string; score: number; feedback: string }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "Have you tested your product with real users outside your team?",
    options: [
      { label: "Yes, 10+ beta users", score: 20, feedback: "" },
      { label: "Yes, but only friends/family", score: 10, feedback: "Friends and family are biased. You need external friction to find real bugs." },
      { label: "No, not yet", score: 0, feedback: "This puts you in the 73% of failed launches that skipped validation. Building in a vacuum is the #1 SaaS killer." }
    ]
  },
  {
    id: 2,
    text: "Do you have a pricing strategy beyond 'cheaper than competitors'?",
    options: [
      { label: "Yes, value-based pricing set", score: 20, feedback: "" },
      { label: "Kind of, still figuring it out", score: 10, feedback: "Ambiguous pricing creates friction. Section 3 of the checklist will save you weeks of guesswork." },
      { label: "No, we'll price later", score: 0, feedback: "Waiting to price means you're building without knowing if the unit economics work. It's a dangerous blindspot." }
    ]
  },
  {
    id: 3,
    text: "Have you set up analytics to track activation and retention?",
    options: [
      { label: "Yes, full funnel tracking ready", score: 20, feedback: "" },
      { label: "Basic Google Analytics only", score: 10, feedback: "GA4 is great for traffic, but you need event-based tracking to know why users are dropping off inside the app." },
      { label: "Not yet", score: 0, feedback: "No analytics setup = flying blind. You won't know if your launch was successful or just noisy." }
    ]
  },
  {
    id: 4,
    text: "Do you have a launch day communication plan?",
    options: [
      { label: "Yes, press + Product Hunt + email + social", score: 20, feedback: "" },
      { label: "Sort of, we'll figure it out", score: 10, feedback: "A scattered launch leads to scattered results. Coordination is key to hitting the algorithm 'spike'." },
      { label: "No, we'll just post somewhere", score: 0, feedback: "Launching to crickets is the standard experience for founders without a dedicated channel strategy." }
    ]
  },
  {
    id: 5,
    text: "Have you stress-tested your infrastructure?",
    options: [
      { label: "Yes, load tested with 10x expected traffic", score: 20, feedback: "" },
      { label: "Basic testing, hope it holds", score: 10, feedback: "A 'good' launch can crash a 'basic' server. Don't let your success be your downfall." },
      { label: "It worked fine for beta", score: 0, feedback: "Beta traffic != Launch traffic. Database locks and API rate limits are invisible until they break under load." }
    ]
  }
];

export default function SaaSChecklistPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Hero, 1-5: Quiz, 6: Results
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: "" }
  });

  const totalScore = useMemo(() => {
    return answers.reduce((sum, current, i) => {
      const q = questions[i];
      if (!q) return sum; // Safety check for sync issues
      const opt = q.options[current];
      if (!opt) return sum; // Safety check for sync issues
      return sum + opt.score;
    }, 0);
  }, [answers]);

  const scoreStats = useMemo(() => {
    if (totalScore <= 25) return { status: "RED ALERT", color: "text-red-500", bg: "bg-red-50", border: "border-red-200", icon: XCircle, risk: "High failure risk" };
    if (totalScore <= 50) return { status: "YELLOW ALERT", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200", icon: AlertTriangle, risk: "Medium-High risk" };
    if (totalScore <= 75) return { status: "GREEN WITH CAUTION", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", icon: AlertCircle, risk: "Low-Medium risk" };
    return { status: "LAUNCH READY", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: CheckCircle2, risk: "Optimized for success" };
  }, [totalScore]);

  const handleAnswer = (optionIndex: number) => {
    // Only allow answers if we're in the quiz steps
    if (currentStep < 1 || currentStep > questions.length) return;
    
    // Prevent double clicking/multiple answers for same step
    if (answers.length >= currentStep) return;

    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    // Always increment step to progress or reach results
    setCurrentStep(prev => prev + 1);
  };

  const onContactSubmit = async (values: z.infer<typeof contactSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      source: "SaaS Launch Checklist Validator",
      score: totalScore,
      riskLevel: scoreStats.risk,
      answers: answers.map((a, i) => ({ 
        question: questions[i]?.text || 'Unknown', 
        answer: questions[i]?.options[a]?.label || 'Unknown' 
      })),
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'leads'), leadData);
      setIsSuccess(true);
      toast({ title: "Checklist Sent!", description: "Check your inbox for the 137-point roadmap." });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Failed to send. Please check your connection." });
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentStep(1);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <header className="relative pt-24 pb-16 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-orange-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Launch Risk Detector v2.0
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-8 tracking-tighter text-slate-950 font-mono">
                  LAUNCHING YOUR SAAS <br/>
                  <span className="text-orange-600 underline decoration-slate-200 underline-offset-8">WITHOUT THIS</span> <br/>
                  IS LIKE SKYDIVING...
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-xl font-medium leading-relaxed">
                  ...without checking your parachute. Use the 137-point roadmap derived from 50+ successful launches to stop guessing and start scaling.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button 
                    onClick={() => {
                      setCurrentStep(1);
                      document.getElementById('validator')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    size="lg" 
                    className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-black text-lg px-10 py-8 h-auto rounded-xl shadow-xl hover:scale-105 transition-all uppercase tracking-tight"
                  >
                    Check Launch Readiness <ChevronRight className="ml-2" />
                  </Button>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Join 50,000+ Founders</p>
                </div>
              </FadeIn>
            </div>

            <div className="relative">
              <FadeIn delay={0.2}>
                <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                    alt="SaaS Team Planning" 
                    fill 
                    className="object-cover"
                    data-ai-hint="startup office"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                      <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Status:</p>
                      <p className="text-white font-bold">Launch Anxiety</p>
                    </div>
                    <div className="p-4 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-2xl">
                      <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1">Target:</p>
                      <p className="text-white font-bold">12K MRR Freedom</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </header>

      {/* 2. THE VALIDATOR (INTERACTIVE) */}
      <section id="validator" className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-4 tracking-tight font-mono uppercase">Find Your Launch Blindspots</h2>
              <p className="text-lg text-slate-500 font-medium tracking-tight">Takes less than 60 seconds to diagnose your biggest technical & strategic risks.</p>
            </div>
          </FadeIn>

          <Card className="bg-white rounded-[2.5rem] shadow-2xl border-none overflow-hidden min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div 
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-12 text-center flex flex-col items-center justify-center flex-grow"
                >
                  <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mb-8 rotate-3">
                    <Zap className="w-10 h-10 fill-current" />
                  </div>
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">System Ready.</h3>
                  <p className="text-slate-500 text-lg mb-10 max-w-md font-medium">Click below to start the diagnostic scan of your SaaS infrastructure and strategy.</p>
                  <Button onClick={() => setCurrentStep(1)} size="lg" className="bg-slate-950 text-white font-black px-12 py-8 rounded-2xl hover:scale-105 transition-all">
                    INITIATE SCAN
                  </Button>
                </motion.div>
              )}

              {currentStep >= 1 && currentStep <= questions.length && (
                <motion.div 
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="p-8 md:p-16 flex flex-col flex-grow"
                >
                  <div className="flex justify-between items-center mb-12">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Question 0{currentStep} / 05</span>
                    <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-orange-500" 
                        initial={{ width: `${((currentStep-1)/5)*100}%` }}
                        animate={{ width: `${(currentStep/5)*100}%` }}
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-950 mb-12 leading-tight font-mono uppercase italic">
                    {questions[currentStep-1].text}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 mt-auto">
                    {questions[currentStep-1].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="group p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center justify-between"
                      >
                        <span className="font-bold text-slate-700 group-hover:text-orange-700 text-lg">{opt.label}</span>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep > questions.length && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col flex-grow"
                >
                  {/* Result Header */}
                  <div className={cn("p-12 text-center border-b", scoreStats.bg, scoreStats.border)}>
                    <div className={cn("w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-sm bg-white", scoreStats.color)}>
                      <scoreStats.icon className="w-10 h-10" />
                    </div>
                    <p className={cn("text-[10px] font-black uppercase tracking-[0.4em] mb-2", scoreStats.color)}>{scoreStats.status}</p>
                    <h3 className="text-5xl font-black text-slate-950 mb-2">{totalScore}%</h3>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Readiness Score: {scoreStats.risk}</p>
                  </div>

                  {/* Personalized Blindspots */}
                  <div className="p-8 md:p-12 space-y-8 flex-grow">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Detected Blindspots (Fix These First):
                    </h4>
                    <div className="space-y-4">
                      {answers.map((ans, i) => {
                        const feedback = questions[i]?.options[ans]?.feedback;
                        if (!feedback) return null;
                        return (
                          <div key={i} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 border border-orange-100">
                              <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-black text-xs uppercase tracking-widest text-orange-600 mb-1">Checklist Section 0{i+1}</p>
                              <p className="text-slate-700 font-medium leading-relaxed">{feedback}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Final Capture */}
                  <div className="p-8 md:p-12 bg-slate-950 text-white">
                    <div className="max-w-md mx-auto text-center">
                      <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">GET THE FULL REPAIR MANUAL</h4>
                      <p className="text-slate-400 text-sm mb-8 font-medium">Email me the 137-point checklist plus my detailed blindspot report.</p>
                      
                      {isSuccess ? (
                        <div className="flex flex-col items-center gap-4 py-4">
                          <CheckCircle2 className="w-12 h-12 text-green-400" />
                          <p className="font-bold">TRANSMISSION RECEIVED. CHECK INBOX.</p>
                          <Button variant="ghost" onClick={resetQuiz} className="text-slate-500 hover:text-white underline">Start Over</Button>
                        </div>
                      ) : (
                        <Form {...contactForm}>
                          <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                            <FormField
                              control={contactForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                      <input {...field} type="email" placeholder="you@domain.com" className="w-full bg-white/10 border border-white/20 p-5 pl-12 rounded-2xl focus:border-orange-500 focus:outline-none transition-all font-bold text-white placeholder:text-slate-600" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black text-xl py-10 rounded-2xl shadow-xl transition-all uppercase italic">
                              Send My Checklist →
                            </Button>
                          </form>
                        </Form>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </section>

      {/* 3. THE BLINDSPOTS DATABASE (STATISTICS) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-6 uppercase tracking-tight font-mono">Statistical Realities</h2>
              <p className="text-xl text-slate-500 font-medium">Why the "Last 50" failed launches didn't make it to Year 2.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: "No User Validation", val: "73%", res: "Built something nobody wanted", icon: Users },
              { label: "No Analytics Events", val: "68%", res: "Couldn't measure what mattered", icon: BarChart3 },
              { label: "Weak Onboarding", val: "61%", res: "Users churned immediately", icon: Zap },
              { label: "No Launch Plan", val: "54%", res: "Crickets on launch day", icon: Layout },
              { label: "No Pricing Strategy", val: "49%", res: "Underpriced to death", icon: Target },
              { label: "No Support System", val: "47%", res: "Reputation damage", icon: ShieldCheck }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-orange-200 transition-colors group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 group-hover:rotate-6 transition-transform">
                      <stat.icon className="w-6 h-6 text-slate-400" />
                    </div>
                    <span className="text-2xl font-black text-orange-600">{stat.val}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-950 mb-2 uppercase tracking-tight">{stat.label}</h4>
                  <p className="text-slate-500 text-sm font-medium italic">Result: {stat.res}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT'S INSIDE (CHECKLIST PREVIEW) */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase italic">The 137-Point <br/>Repair Manual</h2>
                <p className="text-xl text-slate-400 mb-12 font-medium">We broken down the launch into 4 high-stakes phases. Each item includes the 'Why' and the 'Tool' to fix it.</p>
                
                <div className="space-y-6">
                  {[
                    { title: "Pre-Launch (37 items)", desc: "Technical, legal, and analytics setup. The invisible foundation.", icon: Code },
                    { title: "Beta Phase (28 items)", desc: "Feedback loops, onboarding iteration, and UX smoothing.", icon: Target },
                    { title: "Launch Day (23 items)", desc: "PR coordination, Product Hunt strategy, and traffic surge management.", icon: Zap },
                    { title: "Post-Launch (49 items)", desc: "Retention systems, churn tracking, and growth loops.", icon: LineChart },
                  ].map((phase, i) => (
                    <div key={i} className="flex gap-5 group cursor-default">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-orange-500/50 transition-colors">
                        <phase.icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{phase.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="relative">
              <FadeIn delay={0.2}>
                <div className="bg-white rounded-[3rem] p-1 shadow-2xl">
                  <div className="bg-slate-50 rounded-[2.8rem] p-10 text-slate-900 border border-slate-200">
                    <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-200">
                      <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl">✓</div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">Checklist Preview</h3>
                    </div>
                    <div className="space-y-6 opacity-60">
                      {[
                        "Database connection pool scaling tested",
                        "Email deliverability SPF/DKIM/DMARC verified",
                        "Og:image tags optimized for social sharing",
                        "User feedback widget installed & live",
                        "Refund policy legally reviewed & accessible"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm font-bold">
                          <div className="w-5 h-5 border-2 border-slate-300 rounded-md" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-200 text-center">
                      <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">...AND 132 MORE</p>
                      <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-8 rounded-2xl shadow-xl">
                        UNLOCK THE FULL LIST
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100 relative">
              <div className="absolute top-10 right-10 opacity-10">
                <Trophy className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="flex gap-1 text-orange-500 mb-8">
                  {[...Array(5)].map((_, i) => <Zap key={i} className="w-6 h-6 fill-current" />)}
                </div>
                <p className="text-2xl md:text-4xl font-black text-slate-950 mb-10 leading-tight italic font-mono uppercase">
                  "We were 2 weeks from launch and I took this validator on a whim. Turns out we were missing email verification AND hadn't set up churn tracking. Fixed both in 3 days. Launch was smooth. Now at $12K MRR."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative border-2 border-orange-500">
                    <Image src="https://picsum.photos/seed/m1/200/200" alt="Marcus T." fill className="object-cover" data-ai-hint="founder face" />
                  </div>
                  <div>
                    <p className="font-black text-slate-950 uppercase tracking-tight">Marcus T.</p>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Founder of TaskFlow</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. BONUS BUNDLE */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-6 uppercase tracking-tight font-mono">The Launch Bundle</h2>
              <p className="text-xl text-slate-500 font-medium tracking-tight">You get more than just a list. You get the assets to execute.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "PDF Checklist", desc: "137 items with tool recommendations.", icon: Download },
              { title: "Notion/Sheets Sync", desc: "Track progress with your team.", icon: Layout },
              { title: "Email Templates", desc: "Press, PR, and Welcome sequences.", icon: Mail },
              { title: "Onboarding Flow", desc: "Step-by-step UI/UX blueprints.", icon: Target },
              { title: "Analytics Cheat Sheet", desc: "Events every SaaS must track.", icon: BarChart3 },
              { title: "Competitor Matrix", desc: "The analysis template YC uses.", icon: ShieldCheck },
            ].map((bundle, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                    <bundle.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-950 mb-2 uppercase tracking-tight">{bundle.title}</h4>
                  <p className="text-slate-500 text-sm font-medium">{bundle.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-7xl font-black text-slate-950 mb-8 tracking-tighter uppercase font-mono italic">Still Launching <br/><span className="text-orange-600">Without The Checklist?</span></h2>
            <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto font-medium">Join 50,000+ founders who stopped guessing. Get the full launch system now.</p>
            
            <div className="max-w-md mx-auto bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl">
              {!isSuccess ? (
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input {...field} type="email" placeholder="Email address" className="w-full bg-white border-2 border-slate-100 p-5 rounded-2xl focus:border-orange-500 focus:outline-none transition-all font-bold text-slate-950" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black text-2xl py-10 rounded-2xl shadow-xl transition-all uppercase italic">
                      Send Me The Checklist →
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <p className="font-black text-xl">MISSION READY. CHECK EMAIL.</p>
                </div>
              )}
              <div className="mt-8 flex flex-col items-center gap-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Used by alumni of:</p>
                <div className="flex gap-6 opacity-30 grayscale contrast-200">
                  <span className="font-black italic">YC</span>
                  <span className="font-black italic">Techstars</span>
                  <span className="font-black italic">500</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. MICRO FAQ */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-black text-slate-950 mb-12 text-center uppercase tracking-tight font-mono">Micro FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Is this actually free?", a: "100% free. I wish I had this when I launched my first SaaS. Just paying it forward to the founder community." },
              { q: "What format is the checklist?", a: "You get a PDF, a Notion template, and a Google Sheets version. Use whatever fits your workflow." },
              { q: "How long does it take to use?", a: "The validator takes 60 seconds. The full 137-point audit takes about 2-3 hours. Way less time than recovering from a failed launch." }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="text-lg font-black text-slate-950 mb-2 uppercase tracking-tight flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-orange-500" /> {f.q}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed pl-6">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center text-white font-black">✓</div>
            <span className="text-xl font-black tracking-tighter text-slate-950">SAAS LAUNCH CHECKLIST</span>
          </div>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-12">Built for the next generation of SaaS founders</p>
          <div className="flex justify-center gap-8 text-slate-500 font-bold text-xs uppercase tracking-widest">
            <button className="hover:text-orange-600 transition-colors">Privacy</button>
            <button className="hover:text-orange-600 transition-colors">Terms</button>
            <button className="hover:text-orange-600 transition-colors">Support</button>
          </div>
          <p className="mt-12 text-slate-300 text-[10px] uppercase tracking-widest">&copy; 2025 EldWorkStudio. All rights reserved.</p>
        </div>
      </footer>

      {/* STICKY CTA (Mobile Only) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[90]">
        <Button onClick={() => document.getElementById('validator')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-orange-600 text-white font-black py-8 text-lg shadow-[0_10px_30px_rgba(249,115,22,0.4)] rounded-2xl flex items-center justify-center gap-3 border-2 border-white/20 backdrop-blur-sm">
          <Zap className="w-5 h-5" />
          CHECK MY READINESS
        </Button>
      </div>

    </div>
  );
}
