'use client';
// import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import CartContent from './CartContent';
import CartTotal from './CartTotal';
import CartQtyLoadingSkeleton from './CartQtyLoadingSkeleton';
import { ShoppingCart } from 'lucide-react';

const CartModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const { cart } = useCartStore();
    const modalRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                !toggleRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isMounted) return <CartQtyLoadingSkeleton />;

    return (
        <>
            {/* <div className="relative cursor-pointer">
                <div
                    ref={toggleRef}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="cursor-pointer"
                >
                    <ShoppingCart />
                </div>
                {cart.length > 0 && (
                    <div
                        className="absolute -top-4 -right-4 w-6 h-6 bg-cartNumber 
                    rounded-full text-white text-sm flex items-center justify-center"
                    >
                        {cart.length}
                    </div>
                )}
            </div>
            {isOpen && (
                <div
                    ref={modalRef}
                    className="w-96 h-[calc(100vh-64px)] absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 md:top-8 right-0 flex flex-col gap-6 z-20"
                >
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between pb-2">
                            <h2 className="text-2xl">Shopping Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className=" text-2xl"
                                aria-label="Cart"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {cart.length <= 0 ? (
                            <div className="py-8">Shopping cart is empty</div>
                        ) : (
                            <>
                                <CartContent />

                                <div className="h-[2px] boxShadown"></div>

                                <div className="px-4 py-1 mt-2">
                                    <CartTotal />
                                </div>
                                <div className="flex justify-between text-sm pt-4">
                                    <Link href="/cart">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="rounded-md py-3 px-4 ring-1 ring-gray-300 text-sm hover:bg-gray-200"
                                            aria-label="View Cart"
                                        >
                                            View Cart
                                        </button>
                                    </Link>
                                    <Link href="/checkout">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="rounded-md py-3 px-4 bg-black text-white text-sm hover:opacity-85"
                                            aria-label="Checkout"
                                        >
                                            Checkout
                                        </button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )} */}
        </>
    );
};

export default CartModal;
