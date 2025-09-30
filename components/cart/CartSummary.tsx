'use client';

import { useCartStore } from '@/hook/useCartStore';
import { formatCurrency } from '@/lib/utils';
import CheckoutButton from '../checkout/CheckoutButton';
import { useEffect, useState } from 'react';
import SkeletonCartSummary from './SkeletonCartSummary';

export default function CartSummary({
    region,
    isCheckout,
}: {
    region: string;
    isCheckout: boolean;
}) {
    const [isMounted, setIsMounted] = useState(false);

    const items = useCartStore((state) => state.cart);
    const totalQuantity = useCartStore((state) => state.totalQuantity());

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <SkeletonCartSummary />;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-neutral-200/10 p-6 md:p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 ">
                    <p>Cart summary</p>
                </h2>
                <div className="flex justify-between text-neutral-600 mb-4">
                    <span>Subtotal</span>
                    <span className="font-medium">
                        {formatCurrency(
                            items.reduce((sum, ci) => sum + (ci.price ?? 0) * ci.quantity, 0)
                        )}
                    </span>
                </div>
                <div className="flex justify-between text-neutral-600 mb-4">
                    <span>Estimated shipping</span>
                    <span className="font-medium">{`$49`}</span>
                </div>
                <div className="flex justify-between text-neutral-600 mb-4">
                    <span>Incl. taxes</span>
                    <span className="font-medium">{`$87.65`}</span>
                </div>
                <div className="flex justify-between text-neutral-600 mb-4">
                    <span>Delivery</span>
                    <span>-</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total price (incl taxes & shipping)</span>
                    <span>
                        {formatCurrency(
                            items.reduce((sum, ci) => sum + (ci.price ?? 0) * ci.quantity, 0)
                        )}
                    </span>
                </div>
                {!isCheckout && (
                    <div className="py-4">
                        <CheckoutButton region={region} />
                    </div>
                )}
            </div>
        </div>
    );
}
