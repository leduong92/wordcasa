import CartEmpty from '@/components/cart/CartEmpty';
import CartItems from '@/components/cart/CartItems';
import CartQuantity from '@/components/cart/CartQuantity';
import CartSummary from '@/components/cart/CartSummary';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';

interface PageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(
    { params, searchParams }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, region } = await params;

    return {
        title: 'Cart | Worldcasa',
        description: 'Cart',
    };
}

const CartPage = async ({ params, searchParams }: PageProps) => {
    const { region } = await params;
    const isCartEmpty = false;

    if (isCartEmpty) {
        return <CartEmpty region={region} />;
    }

    return (
        <main className="min-h-screen py-4">
            <CartQuantity />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* LEFT: Product list */}
                <div className="lg:col-span-2 flex flex-col gap-2">
                    {/* Product card */}
                    <CartItems region={region} />
                </div>

                {/* RIGHT: Order summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="sticky top-28">
                        <CartSummary region={region} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
