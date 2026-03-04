"use client";

import { CheckCircle2, Clock, Circle, ArrowRight, User, Activity, Flame, Medal } from "lucide-react";
import { FadeIn } from "@/app/FadeIn";

type MilestoneStatus = "pending" | "in-progress" | "completed";

interface Milestone {
    title: string;
    status: MilestoneStatus;
    order_index: number;
}

interface Task {
    title: string;
    assigned_to: "agency" | "client";
    status: string;
}

interface Project {
    name: string;
    status: string;
    current_step: number;
    total_steps: number;
}

interface OverviewTabProps {
    project: Project | null;
    milestones: Milestone[];
    nextUpTask: Task | null;
    fullName: string | null;
    companyName: string | null;
}

function MilestoneIcon({ status }: { status: MilestoneStatus }) {
    if (status === "completed")
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
    if (status === "in-progress")
        return (
            <div className="relative flex-shrink-0">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            </div>
        );
    return <Circle className="w-4 h-4 text-white/20 flex-shrink-0" />;
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        "in-progress": "text-blue-400 bg-blue-400/10 border-blue-400/20",
        active: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        completed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        pending: "text-white/30 bg-white/5 border-white/10",
        paused: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    };
    const style = styles[status?.toLowerCase()] ?? "text-white/30 bg-white/5 border-white/10";
    return (
        <span
            className={`font-mono text-[9px] uppercase tracking-[0.2em] border px-2 py-0.5 rounded-sm ${style}`}
        >
            {status}
        </span>
    );
}

// ── NEW: Progress Ring Component ──
function ProgressRing({ current, total }: { current: number; total: number }) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progressPercent = total > 0 ? current / total : 0;
    const offset = circumference - progressPercent * circumference;

    return (
        <div className="relative flex items-center justify-center w-36 h-36">
            <svg className="w-full h-full transform -rotate-90">
                {/* Background Track */}
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    className="stroke-white/[0.05]"
                    strokeWidth="8"
                    fill="transparent"
                />
                {/* Progress Arc */}
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    className="stroke-blue-500 transition-all duration-1000 ease-in-out"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-medium tracking-tighter text-white">
                    {Math.round(progressPercent * 100)}<span className="text-sm text-white/40 ml-0.5">%</span>
                </span>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-1">
                    Step {current}/{total}
                </span>
            </div>
        </div>
    );
}

export function OverviewTab({
    project,
    milestones,
    nextUpTask,
    fullName,
    companyName,
}: OverviewTabProps) {
    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] block mb-3">
                    [ NO PROJECT ASSIGNED ]
                </span>
                <p className="text-white/30 text-sm">
                    Your project hasn't been set up yet. We'll notify you when it's ready.
                </p>
            </div>
        );
    }

    const completedMilestones = milestones
        .filter((m) => m.status === "completed")
        .sort((a, b) => b.order_index - a.order_index) // Descending order
        .slice(0, 3); // Last 3

    return (
        <div className="space-y-6">
            {/* Header */}
            <FadeIn>
                <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
                    <div>
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] block mb-2">
                            [ CLIENT PORTAL ]
                        </span>
                        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
                            {fullName ? `Welcome back, ${fullName.split(" ")[0]}.` : "Welcome back."}
                        </h1>
                        {companyName && (
                            <p className="text-zinc-400 text-sm mt-1">{companyName}</p>
                        )}
                    </div>
                </div>
            </FadeIn>

            {/* TOP ROW: Progress, Health, Next Up */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Progress Ring */}
                <FadeIn delay={0.05} className="lg:col-span-1">
                    <div className="h-full p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block mb-6 self-start w-full text-left">
                            Delivery Progress
                        </span>
                        <ProgressRing current={project.current_step} total={project.total_steps} />
                    </div>
                </FadeIn>

                {/* 2. Project Health */}
                <FadeIn delay={0.10} className="lg:col-span-1">
                    <div className="h-full p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm flex flex-col">
                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block mb-5">
                            Project Health
                        </span>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                    <Activity className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white">{project.status === 'active' ? 'Active & On Track' : 'In Progress'}</h3>
                                    <p className="text-xs text-zinc-500 mt-0.5">Phase {project.current_step} Execution</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-zinc-500">Timeline Status</span>
                                    <span className="text-emerald-400 font-medium tracking-wide">ON SCHEDULE</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-zinc-500">Last Update</span>
                                    <span className="text-white/60">Just now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* 3. Next Up */}
                <FadeIn delay={0.15} className="lg:col-span-1">
                    <div className="h-full p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm flex flex-col">
                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block mb-5">
                            Your Next Action
                        </span>
                        <div className="flex-1 flex flex-col justify-center">
                            {nextUpTask ? (
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Flame className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm leading-snug">
                                                {nextUpTask.title}
                                            </p>
                                            <span className="font-mono text-[9px] text-amber-500/80 uppercase tracking-widest mt-1 block">
                                                Awaiting Review
                                            </span>
                                        </div>
                                    </div>
                                    <button className="flex items-center justify-between px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md text-xs font-medium text-white transition-colors group">
                                        <span>Resolve Action Item</span>
                                        <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-400/50 mb-3" />
                                    <p className="text-white/30 text-sm">You are all caught up.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* BOTTOM ROW: Milestones & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Milestones Roadmap */}
                <FadeIn delay={0.20}>
                    <div className="h-full p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block mb-6">
                            Project Roadmap
                        </span>
                        {milestones.length > 0 ? (
                            <div className="relative border-l border-white/[0.08] ml-2 space-y-6">
                                {milestones.map((m, i) => {
                                    const isDone = m.status === "completed";
                                    const isCurrent = m.status === "in-progress";

                                    return (
                                        <div key={i} className="relative pl-6">
                                            {/* Line node dot */}
                                            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#09090B] border border-white/20 flex items-center justify-center">
                                                {isDone && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                                                {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="flex-1">
                                                    <p className={`text-sm ${isDone ? "text-white/30 line-through" : isCurrent ? "text-white font-medium" : "text-white/60"}`}>
                                                        {m.title}
                                                    </p>
                                                </div>
                                                {isCurrent && (
                                                    <span className="font-mono text-[9px] text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-0.5 rounded-sm">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-white/20 text-sm text-center py-8">No milestones.</p>
                        )}
                    </div>
                </FadeIn>

                {/* Recent Activity */}
                <FadeIn delay={0.25}>
                    <div className="h-full p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block">
                                Recent Activity
                            </span>
                            <span className="font-mono text-[9px] text-emerald-400/50 uppercase tracking-widest">
                                Live
                            </span>
                        </div>

                        {completedMilestones.length > 0 ? (
                            <div className="space-y-4">
                                {completedMilestones.map((m, i) => (
                                    <div key={i} className="flex items-start gap-4 p-3 rounded-md bg-white/[0.02] border border-white/[0.04]">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Medal className="w-4 h-4 text-emerald-500/70" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white/80">Completed Milestone</p>
                                            <p className="text-xs text-white/40 mt-1">"{m.title}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <Clock className="w-6 h-6 text-white/10 mb-2" />
                                <p className="text-sm text-white/30">No recent activity yet.</p>
                            </div>
                        )}
                    </div>
                </FadeIn>

            </div>
        </div>
    );
}
