'use client';
import { useCartStore } from '@/store/useCartStore';
import { Cart } from '@/modals/cart';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CartContent = () => {
    const { cart, updateQuantity, removeFromCart } = useCartStore();

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide">
            {cart.map((item: Cart) => (
                <div key={item.product.id} className="flex py-2 justify-between border mb-4 p-4">
                    <div className="flex items-center justify-center w-[150px]">
                        <Link
                            href={`#/product/${item.product.slug}`}
                            className="w-full "
                            prefetch={true}
                        >
                            <Image
                                src={`${item.product.image}?profile=basic&w=150`}
                                alt={item.product.name}
                                width={150}
                                height={150}
                                className="object-cover p-2"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col justify-between w-2/3 px-2">
                        <div className="flex flex-col gap-2 ">
                            <span className={`text-sm`}>{item.product.name}</span>
                            <span className="text-sm text-gray-500">{item.product.sku}</span>
                        </div>
                        <div className="flx flex-col gap-2">
                            <span className="text-xs text-green-600">
                                Stock: {item.product.stock}
                            </span>
                            <div>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="flex gap-1 hover:text-gray-600"
                                    aria-label="Remove cart"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                    <span className="text-xs">Remove</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-end text-right w-max">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500">${item.product.price}</span>
                            <div className="bg-gray-100 p-1  rounded-3xl flex items-center justify-between w-20">
                                <button
                                    className="cursor-pointer text-3xl disabled:cursor-not-allowed disabled:opacity-20"
                                    disabled={item.quantity <= 1}
                                    onClick={() =>
                                        updateQuantity(item.product.id, item.quantity - 1)
                                    }
                                    aria-label="Decrease"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14"
                                        />
                                    </svg>
                                </button>
                                <span className="text-sm">{item.quantity}</span>
                                <button
                                    className="cursor-pointer text-3xl disabled:cursor-not-allowed disabled:opacity-20"
                                    disabled={item.quantity >= item.product.stock}
                                    onClick={() =>
                                        updateQuantity(item.product.id, item.quantity + 1)
                                    }
                                    aria-label="Increase"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="">
                            <span className="text-sm">
                                Total: ${item.product.price * item.quantity}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContent;
