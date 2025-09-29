'use client';
import { ItemCategoryDto } from '@/modals';
import React, { useEffect, useState } from 'react';
import ItemCarousel from '../ItemCarousel';
import { clientApi } from '@/lib/clientApi';

const tabs = [
    { id: 1, label: 'Living' },
    { id: 2, label: 'Dining' },
    { id: 3, label: 'Bed' },
];

const CategoryTabs = ({
    initialRoomId,
    initialData,
    region,
}: {
    initialRoomId: number;
    initialData: ItemCategoryDto[];
    region: string;
}) => {
    const [activeTab, setActiveTab] = useState<number>(initialRoomId);
    const [data, setData] = useState<ItemCategoryDto[]>(initialData);
    const [loading, setLoading] = useState<boolean>(false);

    const loadData = async (roomId: number) => {
        try {
            setLoading(true);
            const response = await clientApi.get<ItemCategoryDto[]>(
                `/api/item/categories/us/${roomId}`,
                { cache: 'no-store' }
            );
            setData(response.data ?? []);
        } catch (error) {
            console.log('Error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(activeTab);
    }, [activeTab]);

    return (
        <>
            {/*Category Tabs */}
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
                {loading ? <div>Loading...</div> : <ItemList region={region} items={data} />}
            </div>
        </>
    );
};

export default CategoryTabs;

export function ItemList({ region, items }: { region: string; items: ItemCategoryDto[] }) {
    if (!items || items.length === 0) {
        return <div>No items found</div>;
    }

    return (
        <div className="">
            <ItemCarousel region={region} items={items} />
        </div>
    );
}
