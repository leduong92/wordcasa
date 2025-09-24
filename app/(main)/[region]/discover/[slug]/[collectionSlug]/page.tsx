// app/[lang]/room/[slug]/[collectionSlug]/page.tsx

import ProductGrid from '@/components/product/ProductGrid';
import { translations } from '@/i18n';
import { apiClient } from '@/lib/apiClient';
import { loadProducts } from '@/lib/apiService';
import { capitalizeWords } from '@/lib/utils';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';

interface PageProps {
    params: Promise<{ region: string; slug: string; collectionSlug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CollectionDetail({ params, searchParams }: PageProps) {
    const { region, slug, collectionSlug } = await params;

    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const { products, totalRecords, totalPages, pageIndex, pageSize } = await loadProducts(
        slug,
        undefined,
        collectionSlug,
        sp
    );
    return (
        <div className="pt-5">
            <div className="flex border-b">
                <div className="flex-1 py-8 lg:py-14">
                    <h1 className="text-5xl md:text-7xl font-basker mb-4 ">
                        <span> {capitalizeWords(collectionSlug)}</span> {capitalizeWords(slug)}
                    </h1>

                    <p className="text-xl text-gray-600 basker mt-8">
                        {/* Explore our latest designs – crafted for modern living. */}
                    </p>
                </div>

                {/* Categories */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        {/* {categories.map((cat) => (
                            <div key={cat.name} className="cursor-pointer group">
                                <div className="relative w-full h-40 overflow-hidden rounded-lg">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <p className="mt-2 text-center">{cat.name}</p>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>

            <div className="pt-3 flex flex-col md:flex-row">
                <ProductGrid
                    products={products}
                    totalRecords={totalRecords}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    sp={sp}
                    region={region}
                />
            </div>
        </div>
    );
}
