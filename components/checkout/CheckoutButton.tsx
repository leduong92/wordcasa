'use client';
import { useAuthModal } from '@/hook/useAuthModal';
import { CommonPageProps } from '@/modals';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import React from 'react';

const CheckoutButton = ({ region, t }: CommonPageProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { open, view, setView } = useAuthModal();

    const handleCheckout = () => {
        if (status === 'unauthenticated') {
            // router.push(`/${region}/auth/login?callbackUrl=/${region}/checkout`);
            setView('login');
            return;
        }

        if ((session as any)?.error === 'RefreshAccessTokenError') {
            setView('login');
            return;
        }
        router.push(`/${region}/checkout`);
    };
    return (
        <button
            onClick={handleCheckout}
            className="block w-full py-3 text-center bg-black text-white rounded-md hover:bg-neutral-700 cursor-pointer"
        >
            Checkout
        </button>
    );
};

export default CheckoutButton;
