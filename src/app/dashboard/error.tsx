'use client';

import { useEffect } from 'react';

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-black text-red-500 p-8">
            <div className="max-w-2xl bg-red-950 p-6 rounded-lg border border-red-500">
                <h2 className="text-xl font-bold mb-4">Dashboard Error</h2>
                <pre className="whitespace-pre-wrap text-sm">{error.message}</pre>
                {error.stack && (
                    <pre className="whitespace-pre-wrap text-xs mt-4 opacity-70 border-t border-red-500/30 pt-4">
                        {error.stack}
                    </pre>
                )}
            </div>
        </div>
    );
}
