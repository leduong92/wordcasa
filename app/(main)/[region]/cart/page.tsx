import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CartPageProps {
    params: Promise<{ region: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const cartItems = [
    {
        id: 1,
        name: 'Kingston',
        description: 'Kingston extendable dining table',
        image: '/bed_1.jpg', // Tên file ảnh trong thư mục public
        price: 20380,
        quantity: 1,
        size: 'H74 x W90 x 180/230cm',
        leg: 'matt ash grey structure lacquered',
        tabletop: 'matte white lacquered',
        itemNo: '3700128702790115',
    },
    {
        id: 2,
        name: 'Santiago',
        description: 'Santiago coffee table',
        image: '/bed_2.jpg', // Tên file ảnh trong thư mục public
        price: 24990,
        quantity: 1,
        size: 'H40 x D90cm',
        leg: 'dark oak veneer',
        tabletop: 'dark oak veneer',
        itemNo: '370040426702702',
    },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

const CartPage = async ({ params, searchParams }: CartPageProps) => {
    const { region } = await params;
    const isCart = false;
    return (
        <>
            {isCart ? (
                <div className="flex h-[calc(100vh-90px)] items-center justify-center bg-gray-50 px-4">
                    <div className="text-center">
                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-600">
                            Your cart is empty
                        </h2>

                        {/* Subtext */}
                        <p className="mt-5 text-base text-gray-500">
                            Please add products to your cart
                        </p>

                        {/* CTA Button */}
                        <div className="mt-6">
                            <Link
                                href={{
                                    pathname: `/${region}/category`,
                                    query: {
                                        q: 'flag--Newcategory',
                                    },
                                }}
                                className="inline-block rounded-md border border-gray-300 px-6 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition"
                            >
                                See all products here
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <main className="bg-gray-50 min-h-screen p-4 md:p-8">
                    <h1 className="text-6xl font-serif mb-6 font-basker">
                        Cart <span className="text-gray-800 text-lg">2 items</span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* LEFT: Product list */}
                        <div className="lg:col-span-2 flex flex-col gap-2">
                            {/* Product card */}
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white p-4 md:p-6 rounded flex flex-col items-center md:flex-row gap-6"
                                >
                                    <div className="relative w-full md:w-72 h-56 md:h-64 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt="Santiago"
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 288px"
                                            priority
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between mt-4">
                                                <div>
                                                    <h2 className="text-xl font-bold">Kingston</h2>
                                                    <p className="text-gray-600">
                                                        Kingston extendable dining table
                                                    </p>
                                                </div>
                                                <div>
                                                    <select className="border px-2 py-1 rounded">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <p className="mt-2 font-semibold">28,390,000 đ</p>
                                            <div className="flex justify-between">
                                                <div>
                                                    <ul className="text-sm text-gray-500 mt-2 space-y-1">
                                                        <li>Size H74½xW99xL160/230cm</li>
                                                        <li>
                                                            Leg matt ash grey structure lacquered
                                                        </li>
                                                        <li>Tabletop matte white lacquered</li>
                                                        <li>Item no 3700128T0780115</li>
                                                    </ul>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="h-full flex items-end">
                                                        <button className="text-sm text-gray-500 items-center flex gap-1">
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
                            ))}
                        </div>

                        {/* RIGHT: Order summary */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-white p-6 md:p-8 rounded shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Order summary</h2>
                                <div className="flex justify-between text-gray-600 mb-2">
                                    <span>Subtotal</span>
                                    <span>53,380,000 đ</span>
                                </div>
                                <div className="flex justify-between text-gray-600 mb-4">
                                    <span>Delivery</span>
                                    <span>-</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                    <span>Total price</span>
                                    <span>53,380,000 đ</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Incl. tax (10,331,613 đ)
                                </p>
                                <button className="w-full bg-black text-white py-3 mt-4 rounded">
                                    Get quotation
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Discount code</h2>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Discount code *"
                                        className="border flex-1 px-3 py-2 rounded"
                                    />
                                    <button className="bg-black text-white px-4 py-2 rounded">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default CartPage;
