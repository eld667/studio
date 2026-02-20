"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronRight, ChevronLeft, Calendar, Bot, MailCheck, Search, BarChart3, Star, Server, Wrench, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

// --- Data ---

const tiers = [
    {
        id: "quick-launch",
        name: "Quick Launch",
        price: "$299",
        description: "Perfect for getting online fast.",
        features: ["1-Page Landing", "Mobile Optimized", "3-Day Delivery"]
    },
    {
        id: "custom-build",
        name: "Custom Build",
        price: "$799+",
        description: "Tailored design for conversion.",
        features: ["Multi-Section", "SEO Setup", "Copywriting Help"],
        popular: true
    },
    {
        id: "full-experience",
        name: "Full Experience",
        price: "$2,000+",
        description: "Premium, complex functionality.",
        features: ["CMS Integrated", "Advanced Logic", "Custom Motion"]
    },
    {
        id: "consulting",
        name: "Consulting",
        price: "Custom",
        description: "Hourly or retainer based work.",
        features: ["Strategy", "Audits", "Technical Advisory"]
    }
];

const addOns = [
    { id: "booking", icon: Calendar, name: "Booking System", price: "$149" },
    { id: "chatbot", icon: Bot, name: "AI Chatbot", price: "$199" },
    { id: "email", icon: MailCheck, name: "Email Automation", price: "$149" },
    { id: "seo", icon: Search, name: "Adv. SEO Package", price: "$199/mo" },
    { id: "analytics", icon: BarChart3, name: "Analytics Dash", price: "$99" },
    { id: "hosting", icon: Server, name: "Managed Hosting", price: "$19/mo" },
];

// --- Schemas ---

const detailsSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    company: z.string().optional(),
    message: z.string().optional(),
});

type Step = 1 | 2 | 3;

export function MultiStepForm() {
    const [step, setStep] = useState<Step>(1);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();

    // Form for Step 3
    const form = useForm<z.infer<typeof detailsSchema>>({
        resolver: zodResolver(detailsSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            message: ""
        }
    });

    const handleTierSelect = (id: string) => {
        setSelectedTier(id);
    };

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const nextStep = () => {
        if (step === 1 && !selectedTier) return; // Prevent creating validation error visually, just block
        setStep(prev => Math.min(prev + 1, 3) as Step);
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1) as Step);
    };

    const onSubmit = async (values: z.infer<typeof detailsSchema>) => {
        setIsSubmitting(true);

        // Construct the Payload
        const payload = {
            plan: tiers.find(t => t.id === selectedTier),
            addOns: addOns.filter(a => selectedAddOns.includes(a.id)),
            details: values,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch('https://automation.eldworkstudio.com/webhook/contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ELDWORK-KEY': 'Eldin_AI_Studio_2026!'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setIsSuccess(true);
            toast({
                title: "Inquiry Sent Successfully",
                description: "Your project details have been received. We'll be in touch soon!",
                variant: "default",
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Submission Error:", error);
            toast({
                title: "Submission Failed",
                description: "There was an error sending your message. Please try again or contact us directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Card className="bg-[#0A0A0A] border-white/10 p-12 shadow-2xl shadow-black/50 text-center min-h-[500px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                    <Check className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Project Brief Received</h3>
                <p className="text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
                    We've captured your project details. You'll receive a confirmation email shortly, and our team will review your requirements within 24 hours.
                </p>
                <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="border-white/10 text-white/50 hover:text-white"
                >
                    Start New Project
                </Button>
            </Card>
        );
    }

    return (
        <Card className="bg-[#0A0A0A] border-white/10 overflow-hidden flex flex-col shadow-2xl shadow-black/50 min-h-[600px]">
            {/* Progress Bar */}
            <div className="h-1 w-full bg-white/5">
                <motion.div
                    className="h-full bg-brand"
                    initial={{ width: "33%" }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col">
                <div className="mb-8">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">Step {step} of 3</span>
                    <h2 className="text-2xl font-medium text-white mt-2">
                        {step === 1 && "Select your starting point"}
                        {step === 2 && "Power up your project"}
                        {step === 3 && "Finalize details"}
                    </h2>
                </div>

                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                {tiers.map((tier) => (
                                    <div
                                        key={tier.id}
                                        onClick={() => handleTierSelect(tier.id)}
                                        className={cn(
                                            "cursor-pointer relative p-5 rounded-sm border transition-all duration-200 group",
                                            selectedTier === tier.id
                                                ? "bg-brand/10 border-brand"
                                                : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={cn("font-medium", selectedTier === tier.id ? "text-white" : "text-white/80")}>
                                                {tier.name}
                                            </h3>
                                            {selectedTier === tier.id && <div className="w-4 h-4 rounded-full bg-brand flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></div>}
                                        </div>
                                        <div className="text-lg font-bold text-white mb-2">{tier.price}</div>
                                        <p className="text-xs text-white/40 mb-3">{tier.description}</p>
                                        <ul className="space-y-1">
                                            {tier.features.map(f => (
                                                <li key={f} className="text-[10px] text-white/50 flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-white/20" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                            >
                                {addOns.map((addon) => {
                                    const Icon = addon.icon;
                                    const isSelected = selectedAddOns.includes(addon.id);
                                    return (
                                        <div
                                            key={addon.id}
                                            onClick={() => toggleAddOn(addon.id)}
                                            className={cn(
                                                "cursor-pointer p-4 rounded-sm border transition-all duration-200 flex flex-col gap-3",
                                                isSelected
                                                    ? "bg-brand/10 border-brand"
                                                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                            )}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className={cn("p-2 rounded-md", isSelected ? "bg-brand/20 text-white" : "bg-white/5 text-white/60")}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                {isSelected && <Check className="w-4 h-4 text-brand" />}
                                            </div>
                                            <div>
                                                <h4 className={cn("text-sm font-medium", isSelected ? "text-white" : "text-white/80")}>{addon.name}</h4>
                                                <p className="text-xs text-white/40 mt-1">{addon.price}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Form {...form}>
                                    <form id="details-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white/60 text-xs uppercase tracking-wider font-mono">Name</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} className="bg-white/5 border-white/10 focus:border-white/30 text-white h-11 rounded-sm" placeholder="Your name" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white/60 text-xs uppercase tracking-wider font-mono">Email</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} type="email" className="bg-white/5 border-white/10 focus:border-white/30 text-white h-11 rounded-sm" placeholder="company@example.com" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white/60 text-xs uppercase tracking-wider font-mono">Company (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} className="bg-white/5 border-white/10 focus:border-white/30 text-white h-11 rounded-sm" placeholder="Your company website" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white/60 text-xs uppercase tracking-wider font-mono">Additional Details</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            className="bg-white/5 border-white/10 focus:border-white/30 text-white min-h-[120px] rounded-sm resize-none"
                                                            placeholder="Any specifics you'd like to discuss?"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={step === 1 || isSubmitting}
                        className="text-white/50 hover:text-white hover:bg-white/5 disabled:opacity-30"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    {step < 3 ? (
                        <Button
                            onClick={nextStep}
                            disabled={!selectedTier}
                            className="bg-white text-black hover:bg-zinc-200 h-11 px-8 rounded-sm font-medium uppercase text-xs tracking-[0.2em] disabled:opacity-50"
                        >
                            Next Step <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            form="details-form"
                            disabled={isSubmitting}
                            className="bg-brand text-white hover:bg-brand/90 h-11 px-8 rounded-sm font-medium uppercase text-xs tracking-[0.2em]"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit Project"}
                            {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
