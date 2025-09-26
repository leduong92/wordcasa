import { capitalizeWords } from '@/lib/utils';
import React from 'react';

interface ShopBannerProps {
    region: string;
    title: string;
}

const ShopLeftBanner = ({ region, title }: ShopBannerProps) => {
    return (
        <>
            <div className="flex-1 py-6 md:py-14">
                <h1 className="text-5xl md:text-7xl font-serif font-basker mb-4">
                    {capitalizeWords(title)}
                </h1>
                <p className="text-xl text-gray-600 basker mt-4 md:mt-8">
                    Explore our latest designs – crafted for modern living.
                </p>
            </div>
        </>
    );
};

export default ShopLeftBanner;
