// components/auth/ForgotForm.tsx
'use client';

import { useAuthModal } from '@/hook/useAuthModal';

export default function ForgotForm() {
    const { setView, setOpen } = useAuthModal();

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();

        setOpen(false);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
            <p className="text-sm text-center text-muted-foreground">
                Enter your email to receive reset instructions
            </p>

            <div className="space-y-3">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded border px-3 py-2"
                />
                <button
                    className="w-full bg-brown-600 text-white py-2 rounded"
                    onClick={handleReset}
                >
                    Send Reset Link
                </button>
            </div>

            <p className="text-sm text-center mt-3">
                Back to{' '}
                <button onClick={() => setView('login')} className="underline cursor-pointer">
                    Log in
                </button>
            </p>
        </div>
    );
}
