"use client";

import { CheckCircle2, Circle, Clock, Download, FileIcon } from "lucide-react";
import { FadeIn } from "@/app/FadeIn";
import { formatDistanceToNow } from "date-fns";

type TaskStatus = "todo" | "in-progress" | "done" | "completed";
type Assignee = "agency" | "client";

interface Task {
    title: string;
    assigned_to: Assignee;
    status: TaskStatus | string;
    created_at?: string;
}

interface VaultFile {
    name: string;
    size: number;
    url: string;
    created_at: string;
}

interface VaultTabProps {
    tasks: Task[];
    vaultFiles: VaultFile[];
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
    todo: { label: "To Do", icon: Circle, color: "text-white/30", bg: "bg-white/5", border: "border-white/10" },
    "in-progress": { label: "In Progress", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
    done: { label: "Done", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    completed: { label: "Done", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
};

function TaskCard({ task }: { task: Task }) {
    const cfg = statusConfig[task.status] ?? statusConfig["todo"];
    const StatusIcon = cfg.icon;
    const isDone = task.status === "done" || task.status === "completed";

    return (
        <div className="flex items-start gap-3 p-4 rounded-md border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
            <StatusIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.color}`} />
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-snug ${isDone ? "text-white/30 line-through" : "text-white/80"}`}>
                    {task.title}
                </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <span
                    className={`font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-sm border ${cfg.color} ${cfg.bg} ${cfg.border}`}
                >
                    {cfg.label}
                </span>
            </div>
        </div>
    );
}

function formatFileSize(bytes: number) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function VaultTab({ tasks, vaultFiles }: VaultTabProps) {
    // Group tasks by assignee
    const clientTasks = tasks.filter((t) => t.assigned_to === "client");
    const agencyTasks = tasks.filter((t) => t.assigned_to === "agency");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ── LEFT COLUMN: TASKS (7 cols) ── */}
            <div className="lg:col-span-7 space-y-8">
                <FadeIn>
                    <div className="mb-6">
                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block mb-1">[ THE VAULT — TASKS ]</span>
                        <p className="text-white/40 text-xs">
                            Project deliverables and action items.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Client Tasks */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-purple-400">
                                    Assigned to You
                                </span>
                                <span className="text-[10px] text-white/30 font-mono">({clientTasks.length})</span>
                            </div>
                            {clientTasks.length > 0 ? (
                                <div className="space-y-2">
                                    {clientTasks.map((task, i) => (
                                        <TaskCard key={i} task={task} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 rounded-md border border-dashed border-white/[0.06] flex items-center justify-center text-center">
                                    <p className="text-white/30 text-xs text-center w-full">No pending action items for you.</p>
                                </div>
                            )}
                        </div>

                        {/* Agency Tasks */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                                    Assigned to Studio
                                </span>
                                <span className="text-[10px] text-white/30 font-mono">({agencyTasks.length})</span>
                            </div>
                            {agencyTasks.length > 0 ? (
                                <div className="space-y-2">
                                    {agencyTasks.map((task, i) => (
                                        <TaskCard key={i} task={task} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 rounded-md border border-dashed border-white/[0.06] flex items-center justify-center text-center">
                                    <p className="text-white/30 text-xs text-center w-full">No active tasks assigned to the studio.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* ── RIGHT COLUMN: MEDIA (5 cols) ── */}
            <div className="lg:col-span-5">
                <FadeIn delay={0.1}>
                    <div className="mb-6">
                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] block mb-1">[ PROJECT MEDIA ]</span>
                        <p className="text-white/40 text-xs">Files, assets & shared deliverables.</p>
                    </div>

                    {vaultFiles.length === 0 ? (
                        <div className="aspect-square rounded-md border border-dashed border-white/[0.08] bg-white/[0.01] flex flex-col items-center justify-center gap-2 text-center p-6">
                            <FileIcon className="w-8 h-8 text-white/10 mb-2" />
                            <p className="text-sm font-medium text-white/50">No files yet</p>
                            <p className="text-xs text-white/30 font-mono uppercase tracking-wider">Media will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {vaultFiles.map((file) => (
                                <div
                                    key={file.name}
                                    className="flex items-center justify-between p-3 rounded-md border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                                >
                                    <div className="flex items-center gap-3 min-w-0 pr-4">
                                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center flex-shrink-0">
                                            <FileIcon className="w-4 h-4 text-white/50" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm text-white/80 font-medium truncate">{file.name}</p>
                                            <p className="text-[9px] text-white/30 font-mono uppercase tracking-wider mt-0.5">
                                                {formatFileSize(file.size)} • {formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white transition-colors flex-shrink-0"
                                        title="Download/Open"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </FadeIn>
            </div>
        </div>
    );
}
