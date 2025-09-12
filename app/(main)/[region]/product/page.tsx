import { cookies } from 'next/headers';
import { translations } from '@/i18n';

type Product = { id: number; title: string; price: number };

export default async function ProductsPage({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;
    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const res = await fetch('https://fakestoreapi.com/products?limit=5', {
        cache: 'no-store',
    });
    const products: Product[] = await res.json();

    return (
        <div>
            <p className="mt-2 text-gray-600">Region: {region.toUpperCase()}</p>
            <h2 className="text-2xl font-bold mb-4">
                {t.products} - {region.toUpperCase()}
            </h2>
            <ul className="space-y-2">
                {products.map((p) => (
                    <li
                        key={p.id}
                        className="p-4 border rounded bg-white shadow-sm flex justify-between"
                    >
                        <span>{p.title}</span>
                        <span className="font-semibold">${p.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
