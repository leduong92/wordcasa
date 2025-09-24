'use client';
import { useCartStore } from '@/hook/useCartStore';
import React, { useEffect, useState } from 'react';

const CartQuantity = () => {
    const [isMounted, setIsMounted] = useState(false);
    const totalQuantity = useCartStore((state) => state.totalQuantity());

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return;
    return (
        <h1 className="text-6xl font-serif mb-6 font-basker">
            Cart{' '}
            <span className="text-gray-800 text-2xl">
                {' '}
                {totalQuantity} {totalQuantity > 1 ? 'items' : 'item'}
            </span>
        </h1>
    );
};

export default CartQuantity;
