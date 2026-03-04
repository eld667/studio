"use client";

import { LayoutDashboard, FolderOpen, Eye, CreditCard, LogOut, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export type Tab = "overview" | "vault" | "preview" | "billing";

interface DashboardSidebarProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    userEmail: string | undefined;
    companyName: string | null;
    avatarUrl?: string | null;
    isAdmin?: boolean;
    allClients?: { id: string; full_name: string; company_name: string }[];
    targetClientId?: string;
}

const navItems: { id: Tab; label: string; icon: React.ElementType; tag?: string }[] = [
    { id: "overview", label: "Project Overview", icon: LayoutDashboard },
    { id: "vault", label: "The Vault", icon: FolderOpen, tag: "Tasks & Media" },
    { id: "preview", label: "Live Preview", icon: Eye },
    { id: "billing", label: "Billing & Strategy", icon: CreditCard },
];

export function DashboardSidebar({
    activeTab,
    setActiveTab,
    userEmail,
    companyName,
    avatarUrl,
    isAdmin,
    allClients,
    targetClientId,
}: DashboardSidebarProps) {
    const router = useRouter();

    return (
        <aside className="fixed left-0 top-0 h-full w-60 bg-black/80 border-r border-white/[0.07] backdrop-blur-xl flex flex-col z-40">
            {/* Logo */}
            <div className="px-5 h-20 flex items-center border-b border-white/[0.07] flex-shrink-0">
                <a href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-white group-hover:text-black transition-colors">
                        E
                    </div>
                    <span className="text-sm font-bold tracking-tighter text-white">
                        EldWorkStudio
                    </span>
                </a>
            </div>

            {/* Admin Switcher */}
            {isAdmin && allClients && (
                <div className="px-5 py-4 border-b border-white/[0.07]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.25em] flex items-center gap-1.5">
                            <Users className="w-3 h-3" />
                            Admin Access
                        </span>
                    </div>
                    <div className="relative">
                        <select
                            className="w-full appearance-none bg-white/[0.03] border border-white/[0.07] rounded-md px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-white/20 transition-all hover:bg-white/[0.05]"
                            value={targetClientId}
                            onChange={(e) => {
                                const newId = e.target.value;
                                if (newId === userEmail) { // Wait, user.id isn't in userEmail...
                                    // Hack: Actually we can just push the ID. The page knows if it's the admin.
                                    router.push(`/dashboard?client_id=${newId}`);
                                } else {
                                    router.push(`/dashboard?client_id=${newId}`);
                                }
                            }}
                        >
                            <option value="">Reset to Self</option>
                            {allClients.map((c) => (
                                <option key={c.id} value={c.id} className="bg-zinc-900 text-white">
                                    {c.company_name || c.full_name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/30">
                            ▼
                        </div>
                    </div>
                </div>
            )}

            {/* Nav Label */}
            <div className="px-5 pt-6 pb-2">
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.25em]">
                    Navigation
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all group ${isActive
                                ? "bg-white/10 text-white"
                                : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                }`}
                        >
                            <Icon
                                className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? "text-white" : "text-white/30 group-hover:text-white/50"
                                    }`}
                            />
                            <div className="min-w-0">
                                <span className="text-xs font-medium block truncate">{item.label}</span>
                                {item.tag && (
                                    <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest">
                                        {item.tag}
                                    </span>
                                )}
                            </div>
                            {isActive && (
                                <div className="ml-auto w-1 h-1 rounded-full bg-white flex-shrink-0" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="mx-5 border-t border-white/[0.07] mb-4" />

            {/* User Block */}
            <div className="px-4 pb-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/[0.03] border border-white/[0.07]">
                    {avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-7 h-7 rounded-full border border-white/10 object-cover flex-shrink-0"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-3.5 h-3.5 text-white/50" />
                        </div>
                    )}
                    <div className="min-w-0">
                        {companyName && (
                            <p className="text-xs font-medium text-white truncate">{companyName}</p>
                        )}
                        <p className="font-mono text-[9px] text-white/30 truncate">{userEmail}</p>
                    </div>
                </div>

                <form action="/auth/signout" method="post">
                    <button
                        type="submit"
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors text-xs"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                    </button>
                </form>
            </div>
        </aside>
    );
}
