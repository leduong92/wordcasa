import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { GetManageItemPagingRequest } from '@/modals/getManageItemPagingRequest';
import { apiClient, PagedResult } from '@/lib/apiClient';
import { ItemDto } from '@/modals';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

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
    console.log(products?.[0]?.itemVariantDtos);
    return (
        <div>
            <div className="flex py-5 gap-3">
                <span>Home</span>
                <span>/</span>
                <span>Products</span>
            </div>
            <div>
                <div className="w-full relative h-[350px] mb-10">
                    <Image src={'/bed_1.jpg'} fill alt="" className="object-cover rounded-md" />
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-neutral-50 px-6 rounded-md">
                        <h2 className="text-3xl md:text-5xl font-semibold mb-4">New Arrivals</h2>
                        <p className="max-w-2xl">
                            From materials built to last to curves designed for comfort and more,
                            our new collection is full of details you’ll love — all made with how
                            you live in mind.
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products?.map((p) => (
                        <div key={p.id} className="">
                            <ProductCard region={region} product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
