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
        title: 'Delivery Policy | Worldcasa',
        description: ``,
    };
}
const DeliveryPolicyPage = async () => {
    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];
    return <div>DeliveryPolicyPage</div>;
};

export default DeliveryPolicyPage;
