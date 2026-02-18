"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/app/FadeIn';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, MessageSquare, Clock, ArrowRight, Check, Copy } from 'lucide-react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    company: z.string().optional(),
    serviceType: z.string().min(1, { message: "Please select a service." }),
    message: z.string().min(10, { message: "Please tell us a bit about your project." }),
});

export default function ContactPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            serviceType: "",
            message: "",
        },
    });

    const { formState: { isSubmitting }, reset } = form;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const leadId = uuidv4();
        const leadData = {
            ...values,
            id: leadId,
            timestamp: new Date().toISOString(),
            source: 'contact-page'
        };
        const leadsCollection = collection(firestore, 'leads');

        try {
            await addDoc(leadsCollection, leadData);
            setIsSuccess(true);
            reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Firebase Error:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem submitting your message. Please try again.",
            });
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText('eldworkstudio.contact@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#09090B]">
            <Header onScroll={handleScroll} />
            <main className="flex-grow pt-32 pb-20 lg:pt-40 lg:pb-28">

                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <div className="max-w-6xl mx-auto px-6 relative z-10">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Left Column: Info & Context */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <FadeIn>
                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-5">
                                    [ CONTACT US ]
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter leading-[1.1] mb-6">
                                    Let's start a conversation.
                                </h1>
                                <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-lg mb-12">
                                    Have a project in mind? We'd love to hear about it. Whether you're ready to start or just have a few questions, we're here to help.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <div className="space-y-8">
                                    {/* Direct Contact Card */}
                                    <div className="bg-white/[0.02] border border-white/[0.08] p-6 rounded-sm">
                                        <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-[#007AFF]" /> Direct Email
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-white/60 font-mono text-sm">eldworkstudio.contact@gmail.com</span>
                                            <TooltipProvider>
                                                <Tooltip open={copied}>
                                                    <TooltipTrigger asChild>
                                                        <button onClick={handleCopy} className="text-white/20 hover:text-white transition-colors">
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Copied!</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                            <Clock className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-white">Response Time</h4>
                                            <p className="text-xs text-white/40 mt-1 leading-relaxed">
                                                We typically respond within 24 hours on business days.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Booking CTA */}
                                    <div className="pt-4">
                                        <p className="text-sm text-white/40 mb-4">Prefer to talk face-to-face?</p>
                                        <Link href="https://calendly.com" target="_blank">
                                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-none h-11 px-6 uppercase text-[10px] tracking-[0.2em]">
                                                Book a Free Strategy Call
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Right Column: Form */}
                        <div className="lg:pt-4">
                            <FadeIn delay={0.2}>
                                <Card className="bg-[#0A0A0A] border-white/10 p-8 lg:p-10 shadow-2xl shadow-black/50">
                                    {isSuccess ? (
                                        <div className="h-full min-h-[400px] flex flex-col justify-center items-center text-center">
                                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                                                <Check className="w-8 h-8 text-emerald-400" />
                                            </div>
                                            <h3 className="text-xl font-medium text-white mb-2">Message Received</h3>
                                            <p className="text-sm text-white/40 max-w-xs mx-auto mb-8">
                                                Thanks for reaching out! We'll review your message and get back to you shortly.
                                            </p>
                                            <Button
                                                onClick={() => setIsSuccess(false)}
                                                variant="outline"
                                                className="border-white/10 text-white/50 hover:text-white"
                                            >
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    name="serviceType"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-white/60 text-xs uppercase tracking-wider font-mono">Interested In</FormLabel>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                                                {['Web Design / Landing Page', 'Full Custom Build', 'E-commerce', 'Consulting'].map((option) => (
                                                                    <div
                                                                        key={option}
                                                                        onClick={() => field.onChange(option)}
                                                                        className={`
                                      cursor-pointer px-4 py-3 rounded-sm text-sm border transition-all duration-200
                                      ${field.value === option
                                                                                ? 'bg-[#007AFF]/10 border-[#007AFF] text-white'
                                                                                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'}
                                    `}
                                                                    >
                                                                        {option}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="message"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-white/60 text-xs uppercase tracking-wider font-mono">Project Details</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    {...field}
                                                                    className="bg-white/5 border-white/10 focus:border-white/30 text-white min-h-[150px] rounded-sm resize-none"
                                                                    placeholder="Tell us about your goals, timeline, and budget..."
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-white text-black hover:bg-zinc-200 h-12 rounded-sm font-medium uppercase text-xs tracking-[0.2em]"
                                                >
                                                    {isSubmitting ? "Sending..." : "Send Message"}
                                                </Button>
                                            </form>
                                        </Form>
                                    )}
                                </Card>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
