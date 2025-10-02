import { translations } from '@/i18n';
import { cookies } from 'next/headers';
import React from 'react';

const HelpPage = async () => {
    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];
    return <div>HelpPage</div>;
};

export default HelpPage;
