'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MoveRight } from 'lucide-react';
import { useAuthModal } from '@/hook/useAuthModal';
import { useCartStore } from '@/hook/useCartStore';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setView, setOpen } = useAuthModal();

    const { fetchCart } = useCartStore();

    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        const fetchAnonymousId = await fetch('/api/anonymous');
        const data = await fetchAnonymousId.json();
        const anonymousId = data.anonymousId;
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl,
            anonymousId,
        });

        if (res?.ok) {
            // const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl as string) : '/';
            // router.push(`/${redirectUrl.slice(1)}`);
            await fetchCart();
        } else {
            console.log('Invalid credentials');
        }
        setIsLoading(false);
        setOpen(false);
    };

    return (
        <>
            <h3 className="text-lg font-semibold">Log in with Email</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="flex justify-between items-center">
                    <span></span>
                    <button
                        type="button"
                        onClick={() => setView('forgot')}
                        className="text-sm text-muted-foreground hover:underline cursor-pointer"
                    >
                        Forgot Password?
                    </button>
                </div>

                <Button className="bg-[#8B572A] hover:bg-[#734522] text-white flex items-center justify-center gap-2 cursor-pointer">
                    {isLoading ? 'Processing...' : 'Log in'}
                </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground">
                New to Worldcasa?{' '}
                <button
                    type="button"
                    onClick={() => setView('signup')}
                    className="underline font-medium cursor-pointer"
                >
                    Sign up
                </button>
            </p>
        </>
    );
}
