'use client';

import { useCartStore } from '@/hook/useCartStore';
import { formatCurrency } from '@/lib/utils';

export default function CartSummary() {
    const items = useCartStore((state) => state.cart);
    const totalQuantity = useCartStore((state) => state.totalQuantity());

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-neutral-100/30 p-6 md:p-8 rounded shadow-sm">
                <h2 className="text-xl font-bold mb-4 ">
                    <p>Cart summary</p>
                </h2>
                <div className="flex justify-between text-neutral-600 mb-4">
                    <span>Subtotal</span>
                    <span className="font-medium">
                        {formatCurrency(
                            items.reduce(
                                (sum, ci) =>
                                    sum + (ci.variant.itemPriceDtos?.[0]?.price ?? 0) * ci.quantity,
                                0
                            )
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
                            items.reduce(
                                (sum, ci) =>
                                    sum + (ci.variant.itemPriceDtos?.[0]?.price ?? 0) * ci.quantity,
                                0
                            )
                        )}
                    </span>
                </div>
                <button className="w-full bg-black text-white py-3 mt-4 rounded">Check out</button>
            </div>

            {/* <div className="bg-neutral-100 p-6 rounded shadow-sm">
                <h2 className="text-xl font-bold mb-4">Discount code</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Discount code *"
                        className="border flex-1 px-3 py-2 rounded w-full"
                    />
                    <button className="bg-black text-white px-4 py-2 rounded">Apply</button>
                </div>
            </div> */}
        </div>
    );
}
