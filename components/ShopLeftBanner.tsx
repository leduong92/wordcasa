import { capitalizeWords } from '@/lib/utils';
import React from 'react';
import { BackButton } from './BackButton';
import { CommonPageProps } from '@/modals';

interface Props extends CommonPageProps {
    title: string;
}

const ShopLeftBanner = ({ region, t, title }: Props) => {
    return (
        <>
            <div className="flex-1">
                <BackButton t={t} />
                <div className="flex-1 py-8">
                    <h1 className="text-5xl md:text-7xl font-serif font-basker mb-4">
                        {capitalizeWords(title)}
                    </h1>
                    <p className="text-xl text-gray-600 basker mt-4 md:mt-8">
                        Explore our latest designs – crafted for modern living.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ShopLeftBanner;
