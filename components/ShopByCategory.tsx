'use client';
import { apiClient } from '@/lib/apiClient';
import { ItemCategoryDto, ItemDto } from '@/modals/itemDto';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import ItemCarousel from './ItemCarousel';

const tabs = [
    { id: 1, label: 'Living' },
    { id: 2, label: 'Dining' },
    { id: 3, label: 'Bed' },
];

export default function ShopByCategory() {
    const [activeTab, setActiveTab] = useState<number>(1);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadData = async (roomId: number) => {
        try {
            setLoading(true);
            const response = await apiClient.get<ItemCategoryDto[]>(
                `/api/item/categories/us/${roomId}`
            );
            setData(response.data ?? []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(activeTab); // load khi tab thay đổi
    }, [activeTab]);

    return (
        <section aria-label="Shop by Category" className="py-16 px-4">
            <div className="mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
                    Shop by Categories
                </h2>

                {/* Category Tabs */}
                <div className="flex justify-center space-x-6 mb-12 text-sm md:text-base uppercase font-medium">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 cursor-pointer font-medium ${
                                activeTab === tab.id ? 'border-b-2 border-black' : 'text-gray-500'
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                            aria-label={tab.label}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="">
                    {loading ? <div>Loading...</div> : <ItemList items={data} />}
                </div>
            </div>
        </section>
    );
}

export function ItemList({ items }: { items: ItemCategoryDto[] }) {
    if (!items || items.length === 0) {
        return <div>No items found</div>;
    }

    return (
        <div className="">
            <ItemCarousel items={items} />
        </div>
    );
}
