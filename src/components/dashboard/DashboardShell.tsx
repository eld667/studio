"use client";

import { useState } from "react";
import { DashboardSidebar, type Tab } from "./DashboardSidebar";
import { OverviewTab } from "./OverviewTab";
import { VaultTab } from "./VaultTab";
import { PreviewTab } from "./PreviewTab";
import { BillingTab } from "./BillingTab";

interface DashboardShellProps {
    user: { email?: string; id: string };
    profile: { full_name: string | null; company_name: string | null; avatar_url?: string | null; is_admin?: boolean } | null;
    isAdmin: boolean;
    allClients: { id: string; full_name: string; company_name: string; avatar_url: string | null }[];
    targetClientId: string;
    project: {
        id: string;
        name: string;
        status: string;
        current_step: number;
        total_steps: number;
        preview_url: string | null;
    } | null;
    milestones: {
        title: string;
        status: "pending" | "in-progress" | "completed";
        order_index: number;
    }[];
    tasks: {
        title: string;
        assigned_to: "agency" | "client";
        status: string;
        created_at?: string;
    }[];
    vaultFiles: {
        name: string;
        size: number;
        url: string;
        created_at: string;
    }[];
}

export function DashboardShell({
    user,
    profile,
    isAdmin,
    allClients,
    targetClientId,
    project,
    milestones,
    tasks,
    vaultFiles,
}: DashboardShellProps) {
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    const nextUpTask =
        tasks.find((t) => t.status === "todo" && t.assigned_to === "client") ?? null;

    const sortedMilestones = [...milestones].sort((a, b) => a.order_index - b.order_index);

    return (
        <div className="flex min-h-screen bg-[#09090B]">
            {/* Sidebar */}
            <DashboardSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                userEmail={user.email}
                companyName={profile?.company_name ?? null}
                avatarUrl={profile?.avatar_url ?? null}
                isAdmin={isAdmin}
                allClients={allClients}
                targetClientId={targetClientId}
            />

            {/* Main Area (offset for fixed sidebar) */}
            <div className="flex-1 ml-60">
                {/* Dot grid background */}
                <div
                    className="fixed inset-0 z-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                <main className="relative z-10 min-h-screen px-8 py-10 lg:px-12 lg:py-12 max-w-5xl">
                    {activeTab === "overview" && (
                        <OverviewTab
                            project={project}
                            milestones={sortedMilestones}
                            nextUpTask={nextUpTask}
                            fullName={profile?.full_name ?? null}
                            companyName={profile?.company_name ?? null}
                        />
                    )}
                    {activeTab === "vault" && <VaultTab tasks={tasks} vaultFiles={vaultFiles} />}
                    {activeTab === "preview" && (
                        <PreviewTab
                            previewUrl={project?.preview_url ?? null}
                            projectName={project?.name ?? null}
                        />
                    )}
                    {activeTab === "billing" && <BillingTab />}
                </main>
            </div>
        </div>
    );
}
