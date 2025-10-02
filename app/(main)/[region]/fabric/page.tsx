import { translations } from '@/i18n';
import { cookies } from 'next/headers';
import React from 'react';

const FabricPage = async () => {
    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];
    return <div>FabricPage</div>;
};

export default FabricPage;
