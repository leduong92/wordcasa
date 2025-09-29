'use client';
import { useCartStore } from '@/hook/useCartStore';
import { Trash, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CartEmpty from './CartEmpty';
import { formatCurrency } from '@/lib/utils';
import SkeletonCartItem from './SkeletonCartItem';

const CartItems = ({ region }: { region: string }) => {
    const cartItems = useCartStore((state) => state.cart);
    const [isMounted, setIsMounted] = useState(false);

    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeItem = useCartStore((s) => s.removeFromCart);
    const totalQuantity = useCartStore((s) => s.totalQuantity());

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <SkeletonCartItem />;
    }

    if (cartItems.length === 0) {
        return <CartEmpty region={region} />;
    }

    return (
        <div>
            {cartItems.map((ci) => {
                const img = ci.imageUrl ?? '/placeholder.png';
                const price = ci.price ?? 0;
                return (
                    <div
                        key={ci.id}
                        className="bg-neutral-200/10 border-b p-4 md:p-6 rounded-lg flex flex-col items-center md:flex-row gap-4"
                    >
                        <div className="relative w-full md:w-60 h-48 md:h-60 flex-shrink-0">
                            <Image
                                src={`${img}?profile=basic&w=300`}
                                alt={ci.productName ?? 'Product'}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 100vw, 288px"
                                priority
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-between w-full px-2">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <h2 className="text-xl font-bold">{ci.productName}</h2>
                                        <p className="text-neutral-600">{ci.sku}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mt-3">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(ci.variantId, ci.quantity - 1)
                                                }
                                                disabled={ci.quantity <= 1}
                                                className="px-3 py-1 border rounded cursor-pointer hover:bg-neutral-200
                                                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-transparent
                                                "
                                            >
                                                -
                                            </button>
                                            <span>{ci.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(ci.variantId, ci.quantity + 1)
                                                }
                                                className="px-3 py-1 border rounded cursor-pointer hover:bg-neutral-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[12px] text-neutral-500">Retail price </p>
                                    <p className="text-lg text-neutral-700 font-medium font-helve tracking-wide">
                                        {formatCurrency(price * ci.quantity)}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="">
                                        <div className="text-sm text-neutral-500 mt-2 space-y-1">
                                            <div className="flex justify-between text-neutral-600 mb-2">
                                                <span className="w-1/3">Size </span>
                                                <span className="font-medium">
                                                    <p
                                                        className="text-neutral-600 w-max px-3"
                                                        dangerouslySetInnerHTML={{
                                                            __html: `${ci.dimensionsCM} cm`,
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                            <div>
                                                {ci.itemVariantOptionDtos?.[0].optionValueDto.value}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="h-full flex items-end">
                                            <button
                                                className="text-sm text-neutral-500 hover:text-neutral-800 items-center flex gap-1 cursor-pointer"
                                                onClick={() => removeItem(ci.id)}
                                            >
                                                <span>Remove</span>
                                                <span>
                                                    <Trash size={14} />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CartItems;
