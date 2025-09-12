'use client';
import { ItemDto } from '@/modals/itemDto';
import { useMemo, useState } from 'react';

export default function ShopByCategory({ products }: { products: ItemDto[] }) {
    const [selectedCategory, setSelectedCategory] = useState<'Living' | 'Dining' | 'Bed'>('Living');

    const categoryMap: { [key: string]: string } = {
        '1': 'Living',
        '2': 'Dining',
        '3': 'Beds',
    };

    const filteredProducts = useMemo(
        () => products.filter((product) => categoryMap[product.roomId ?? 0] === selectedCategory),
        [products, selectedCategory]
    );

    return (
        <section aria-label="Shop by Category" className="bg-white py-16 px-4">
            <div className="mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
                    Shop by Categories
                </h2>

                {/* Category Tabs */}
                <div className="flex justify-center space-x-6 mb-12 text-sm md:text-base uppercase font-medium">
                    {['Living', 'Dining', 'Bed'].map((category) => (
                        <button
                            key={category}
                            aria-label={category}
                            onClick={() =>
                                setSelectedCategory(category as 'Living' | 'Dining' | 'Bed')
                            }
                            className={`pb-1 border-b-2 ${
                                selectedCategory === category
                                    ? 'text-yellow-600 border-yellow-600'
                                    : 'text-gray-500 border-transparent hover:text-yellow-600'
                            } transition`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.slice(0, 7).map((product) => (
                            <div className="group flex flex-col gap-2.5">
                                <div
                                    className="
                    aspect-square overflow-hidden rounded-md bg-gray-200/50
                    relative before:absolute before:inset-0
                    before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                    before:translate-x-[-50%] before:opacity-0
                    before:animate-shimmer
                "
                                />

                                <div className="flex flex-col gap-2">
                                    <div className="h-2 w-4/5 rounded-full bg-gray-200" />
                                    <div className="h-2 w-1/3 rounded-full bg-gray-200" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">{`Oops. There're no data in ${selectedCategory} category.`}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
