import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default async function DashboardPage(props: { searchParams: Promise<{ client_id?: string }> }) {
    const searchParams = await props.searchParams;

    try {
        const supabase = await createClient();

        // 1. Auth Guard
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return redirect('/login');
        }

        // 2. Fetch logged-in user's profile (checking for admin)
        const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, company_name, avatar_url, is_admin')
            .eq('id', user.id)
            .single();

        const isAdmin = profile?.is_admin === true;

        // 3. Determine Target Client ID
        const targetClientId = isAdmin && searchParams.client_id ? searchParams.client_id : user.id;

        // 4. If Admin: Fetch all clients who have active projects for the switcher
        let allClients: { id: string; full_name: string; company_name: string; avatar_url: string | null }[] = [];
        if (isAdmin) {
            // A simple joined query: get profiles that exist in projects.
            const { data: clientsData, error } = await supabase
                .from('profiles')
                .select('id, full_name, company_name, avatar_url')
                .eq('is_admin', false); // Exclude other admins from the client list

            if (!error && clientsData) {
                allClients = clientsData;
            }
        }

        // 5. Fetch project for the target client
        const { data: project } = await supabase
            .from('projects')
            .select('id, name, status, current_step, total_steps, preview_url')
            .eq('client_id', targetClientId)
            .single();

        // 6. Fetch milestones, tasks, and media
        let milestones: { title: string; status: 'pending' | 'in-progress' | 'completed'; order_index: number }[] = [];
        let tasks: { title: string; assigned_to: 'agency' | 'client'; status: string; created_at?: string }[] = [];
        let vaultFiles: { name: string; size: number; url: string; created_at: string }[] = [];

        if (project?.id) {
            const [msRes, tsRes] = await Promise.all([
                supabase
                    .from('milestones')
                    .select('title, status, order_index')
                    .eq('project_id', project.id)
                    .order('order_index', { ascending: true }),
                supabase
                    .from('tasks')
                    .select('title, assigned_to, status, created_at')
                    .eq('project_id', project.id)
                    .order('created_at', { ascending: true }),
            ]);

            milestones = (msRes.data ?? []) as typeof milestones;
            tasks = (tsRes.data ?? []) as typeof tasks;

            // Safe fetch from Storage (client-assets bucket)
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('client-assets')
                .list(targetClientId, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

            // Suppress the error if the bucket/folder just doesn't exist yet
            if (storageData && !storageError) {
                vaultFiles = storageData
                    .filter((file) => file.name !== '.emptyFolderPlaceholder') // Ignore placeholders
                    .map((file) => {
                        const { data: { publicUrl } } = supabase.storage
                            .from('client-assets')
                            .getPublicUrl(`${targetClientId}/${file.name}`);

                        return {
                            name: file.name,
                            size: file.metadata?.size ?? 0,
                            url: publicUrl,
                            created_at: file.created_at,
                        };
                    });
            }
        }

        return (
            <DashboardShell
                user={{ email: user.email, id: user.id }}
                profile={profile}
                isAdmin={isAdmin}
                allClients={allClients}
                targetClientId={targetClientId}
                project={project}
                milestones={milestones}
                tasks={tasks}
                vaultFiles={vaultFiles}
            />
        );
    } catch (error: any) {
        if (error?.message === 'NEXT_REDIRECT' || error?.digest?.startsWith('NEXT_REDIRECT')) throw error;
        return (
            <div style={{ color: 'red', padding: 50 }}>
                <pre>{error?.stack || error?.message || String(error)}</pre>
            </div>
        );
    }
}
