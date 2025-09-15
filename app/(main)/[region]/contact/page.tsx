import { cookies } from 'next/headers';
import { translations } from '@/i18n';

type Props = { params: { region: string } };

export default async function ContactPage({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{t.contact}</h2>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad provident
                exercitationem numquam. Impedit tenetur, porro recusandae, officiis provident quidem
                aliquam nemo nisi, accusantium magnam laborum debitis ex quod minima perferendis.
            </p>
            <p className="mt-2 text-gray-600">Region: {region.toUpperCase()}</p>
        </div>
    );
}
