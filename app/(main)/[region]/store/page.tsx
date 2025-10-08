import { translations } from '@/i18n';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react';
interface PageProps {
    params: Promise<{ region: string }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: 'Store | World Casa',
        description: ``,
    };
}
const StorePage = async () => {
    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];
    return <div>StorePage</div>;
};

export default StorePage;
