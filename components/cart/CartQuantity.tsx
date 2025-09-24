'use client';
import { useCartStore } from '@/hook/useCartStore';
import React from 'react';

const CartQuantity = () => {
    const totalQuantity = useCartStore((state) => state.totalQuantity());
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
