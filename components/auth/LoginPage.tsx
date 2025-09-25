'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function LoginPage({ region }: { region: string }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl,
        });

        if (res?.ok) {
            const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl as string) : '/';
            router.push(`/${redirectUrl.slice(1)}`);
        } else {
            console.log('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center py-16">
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white border rounded shadow-md space-y-6"
            >
                <h1 className="text-xl font-bold">Login</h1>
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-neutral-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
