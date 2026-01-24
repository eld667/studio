
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, MessageCircle, Phone, Send } from 'lucide-react';
import { FadeIn } from '../FadeIn';
import { cn } from '@/lib/utils';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  name: z.string().min(1, { message: "Identity required." }),
  email: z.string().email({ message: "Invalid return path." }),
  subject: z.string().min(1, { message: "Subject required." }),
  message: z.string().min(1, { message: "Mission parameters required." }),
});

interface TerminalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TerminalInput = React.forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ label, id, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <div className="relative">
        <label htmlFor={id} className="font-mono text-xs text-gray-400">{label}</label>
        <div className="flex items-center gap-2 mt-1">
          <span className={cn(
            "font-mono text-blue-400 transition-opacity",
            isFocused ? 'opacity-100' : 'opacity-0'
          )}>></span>
          <input
            ref={ref}
            id={id}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full bg-transparent border-b font-mono text-gray-300 placeholder-gray-600 transition-colors duration-300 focus:outline-none",
              isFocused ? 'border-blue-500/50' : 'border-white/10',
              error ? 'border-red-500/50' : ''
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs font-mono text-red-400">{error}</p>}
      </div>
    );
  }
);
TerminalInput.displayName = 'TerminalInput';


interface TerminalTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TerminalTextarea = React.forwardRef<HTMLTextAreaElement, TerminalTextareaProps>(
  ({ label, id, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <div className="relative">
        <label htmlFor={id} className="font-mono text-xs text-gray-400">{label}</label>
        <div className="flex items-start gap-2 mt-1">
           <span className={cn(
            "font-mono text-blue-400 transition-opacity mt-2",
            isFocused ? 'opacity-100' : 'opacity-0'
          )}>></span>
          <textarea
            ref={ref}
            id={id}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full bg-transparent border-b font-mono text-gray-300 placeholder-gray-600 transition-colors duration-300 focus:outline-none min-h-[100px]",
              isFocused ? 'border-blue-500/50' : 'border-white/10',
              error ? 'border-red-500/50' : ''
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs font-mono text-red-400">{error}</p>}
      </div>
    );
  }
);
TerminalTextarea.displayName = 'TerminalTextarea';


export function CommandBridge() {
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const { formState: { isSubmitting, errors }, reset } = form;

  const handleCopy = () => {
    navigator.clipboard.writeText('eldworkstudio.contact@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const leadId = uuidv4();
    const leadData = {
      ...values,
      id: leadId,
      timestamp: new Date().toISOString(),
    };
    const leadsCollection = collection(firestore, 'leads');
    
    try {
        await addDoc(leadsCollection, leadData);
        setIsSuccess(true);
        reset();
    } catch (serverError) {
        console.error("Firebase Error:", serverError);
        toast({
            variant: "destructive",
            title: "Transmission Failed.",
            description: "A server-side error occurred. Please try an alternate contact method.",
        });
    }
  };

  return (
    <section id="command-center" className="scroll-mt-32 w-full py-16">
      <FadeIn>
        <h3 className="text-3xl font-bold text-white mb-12 text-center font-mono">[COMMAND_BRIDGE]</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* LEFT: System Status */}
          <div className="lg:col-span-2">
            <motion.div 
              whileHover="hover"
              className="relative bg-zinc-900/50 border border-white/10 rounded-lg p-6 h-full"
            >
              <motion.div 
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute -inset-px rounded-lg bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 opacity-0"
              />
              <div className="relative flex flex-col h-full">
                <p className="font-mono text-sm text-gray-400">// PROTOCOL: INITIAL_CONTACT</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <p className="font-mono text-green-400">Prizren Node: Active</p>
                </div>
                <div className="mt-8 flex-grow space-y-4">
                   <button 
                        onClick={handleCopy}
                        className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-3 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors whitespace-nowrap"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                              key={copied ? 'copied' : 'copy'}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center justify-center gap-2 w-full"
                          >
                              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                              {copied ? 'Copied!' : 'eldworkstudio.contact@gmail.com'}
                          </motion.span>
                      </AnimatePresence>
                    </button>
                    <a href="https://wa.me/38348420904" target="_blank" rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-3 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors whitespace-nowrap"
                    >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                    </a>
                    <a href="tel:+38348420904"
                        className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-white/20 rounded-md px-4 py-3 hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors whitespace-nowrap"
                    >
                        <Phone className="h-4 w-4" />
                        +383 48 420 904
                    </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Mission Briefing */}
          <div className="lg:col-span-3">
             <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                <h4 className="font-mono text-lg text-white mb-6">// MISSION BRIEFING</h4>
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="min-h-[350px] flex flex-col justify-center font-mono text-green-400"
                    >
                      <p><span className="text-green-400">[OK]</span> TRANSMISSION_RECEIVED.</p>
                      <p>ANALYZING_PARAMETERS...</p>
                      <p>EXPECT_DECODED_RESPONSE_IN_12H.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={form.handleSubmit(onSubmit)} 
                      className="space-y-6"
                    >
                      <TerminalInput
                        label="User_Identity"
                        id="name"
                        placeholder="e.g., John Doe"
                        {...form.register("name")}
                        error={errors.name?.message}
                      />
                      <TerminalInput
                        label="Return_Path"
                        id="email"
                        type="email"
                        placeholder="e.g., user@domain.com"
                         {...form.register("email")}
                        error={errors.email?.message}
                      />
                      <TerminalInput
                        label="Briefing_Subject"
                        id="subject"
                        placeholder="e.g., Project Inquiry"
                         {...form.register("subject")}
                        error={errors.subject?.message}
                      />
                      <TerminalTextarea
                        label="Mission_Parameters"
                        id="message"
                        placeholder="Describe your project requirements..."
                         {...form.register("message")}
                        error={errors.message?.message}
                      />
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="relative w-full flex items-center justify-center font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 h-12 rounded-md overflow-hidden transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                className="absolute top-0 left-0 h-full w-full bg-white/10"
                              />
                              <span className="relative z-10 font-mono">DEPLOYING...</span>
                            </>
                          ) : (
                            <span className="font-mono flex items-center gap-2 group-hover:scale-105 transition-transform">
                              <Send className="w-4 h-4" />
                              DEPLOY TRANSMISSION
                            </span>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
             </div>
          </div>

        </div>
      </FadeIn>
    </section>
  );
}
