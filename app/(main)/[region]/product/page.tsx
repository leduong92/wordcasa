import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { GetManageItemPagingRequest } from '@/modals/getManageItemPagingRequest';
import { apiClient, PagedResult } from '@/lib/apiClient';
import { ItemDto } from '@/modals';

type Product = { id: number; title: string; price: number };

export default async function ProductsPage({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;
    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const request: GetManageItemPagingRequest = {
        pageIndex: 1,
        pageSize: 10,
    };

    const response = await apiClient.post<PagedResult<ItemDto>>(`/api/item/paging`, {
        body: JSON.stringify(request),
    });

    const products = response.data?.items;

    return (
        <div>
            <p className="mt-2 text-gray-600">Region: {region.toUpperCase()}</p>
            <h2 className="text-2xl font-bold mb-4">
                {t.products} - {region.toUpperCase()}
            </h2>
            <ul className="space-y-2">
                {products?.map((p) => (
                    <li
                        key={p.id}
                        className="p-4 border rounded bg-white shadow-sm flex justify-between"
                    >
                        <span>{p.productName}</span>
                        <span className="font-semibold">{p.parentCode}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
