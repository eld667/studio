// The dashboard layout is intentionally minimal.
// DashboardShell (inside page.tsx) owns the full layout including the fixed sidebar.
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
