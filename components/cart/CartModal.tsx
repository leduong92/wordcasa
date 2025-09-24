'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import CartQtyLoadingSkeleton from './CartQtyLoadingSkeleton';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/hook/useCartStore';

const CartModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { cart } = useCartStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <CartQtyLoadingSkeleton />;

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    return (
        <>
            <div className="relative cursor-pointer">
                <Link href={`/cart`} className="cursor-pointer">
                    <ShoppingCart size={18} />
                </Link>
                {cart.length > 0 && (
                    <div
                        className="absolute -top-4 -right-4 w-6 h-6 bg-neutral-800
                    rounded-full text-neutral-100  text-sm flex items-center justify-center"
                    >
                        {totalQuantity}
                    </div>
                )}
            </div>
        </>
    );
};

export default CartModal;
