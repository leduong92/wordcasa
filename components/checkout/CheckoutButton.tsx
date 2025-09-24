'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import React from 'react';

const CheckoutButton = ({ region }: { region: string }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleCheckout = () => {
        if (status === 'unauthenticated') {
            router.push(`/${region}/auth/login?callbackUrl=/${region}/checkout`);
        } else {
            router.push(`/${region}/checkout`);
        }
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
