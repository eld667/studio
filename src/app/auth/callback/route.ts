import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
        const supabase = await createClient();

        // Exchange the OAuth code for a session
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (!exchangeError) {
            // Get the authenticated user
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // VIP CHECK: Does this user have a profile?
                // Profiles are auto-created by a SQL trigger ONLY if the user's email
                // is in the allowed_emails table. No profile = not a VIP client.
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('id', user.id)
                    .single();

                if (profile && !profileError) {
                    // ✅ VIP client — welcome in
                    return NextResponse.redirect(`${origin}/dashboard`);
                } else {
                    // 🚫 Not on the VIP list — sign them out immediately
                    await supabase.auth.signOut();
                    return NextResponse.redirect(`${origin}/login?error=unauthorized`);
                }
            }
        }
    }

    // Generic failure fallback
    return NextResponse.redirect(`${origin}/login?error=unauthorized`);
}
