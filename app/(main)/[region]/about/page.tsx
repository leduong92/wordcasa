import { cookies } from 'next/headers';
import { translations } from '@/i18n';

type Props = { params: { region: string } };

export default async function AboutPage({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{t.about}</h2>
            <p>This page is translated based on selected language.</p>
            <p className="mt-2 text-gray-600">Region: {region.toUpperCase()}</p>
        </div>
    );
}
