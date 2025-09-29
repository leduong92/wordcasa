'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/hook/useCartStore';
import { Skeleton } from '../ui/skeleton';

const CartIcon = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { cart, fetchCart } = useCartStore();

    const totalQuantity = useCartStore((s) => s.totalQuantity());

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const fetch = async () => {
                const res = await fetchCart();
                return res;
            };
            fetch();
        }
    }, [isMounted]);

    if (!isMounted)
        return (
            <div className="relative cursor-pointer">
                <div className="cursor-pointer">
                    <ShoppingCart size={18} />
                </div>
                <Skeleton className="absolute -top-4 -right-3 w-6 h-6 rounded-full flex items-center justify-center z-10" />
            </div>
        );

    return (
        <>
            <div className="relative cursor-pointer">
                <Link href={`/cart`} className="cursor-pointer">
                    <ShoppingCart size={18} />
                    {cart && cart.length > 0 && (
                        <div
                            className="absolute -top-4 -right-3 w-6 h-6 bg-neutral-900
                    rounded-full text-neutral-100  text-sm flex items-center justify-center"
                        >
                            {totalQuantity}
                        </div>
                    )}
                </Link>
            </div>
        </>
    );
};

export default CartIcon;
