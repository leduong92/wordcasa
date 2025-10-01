import Link from 'next/link';
import React from 'react';

const CartEmpty = ({ region }: { region: string }) => {
    return (
        <div className="flex h-[calc(100vh-90px)] items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-serif text-gray-600">
                    Your cart is empty
                </h2>

                {/* Subtext */}
                <p className="mt-5 text-base text-gray-500">Please add products to your cart</p>

                {/* CTA Button */}
                <div className="mt-6">
                    <Link
                        href={`/${region}/shop/new-arrivals`}
                        className="inline-block rounded-md border bg-neutral-100 px-6 py-2 text-base font-medium text-gray-700 hover:bg-neutral-300 transition"
                    >
                        See all products here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartEmpty;
