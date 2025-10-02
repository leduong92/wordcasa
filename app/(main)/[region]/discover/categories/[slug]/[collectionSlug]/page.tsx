import ProductGrid from '@/components/product/ProductGrid';
import ShopLeftBanner from '@/components/ShopLeftBanner';
import { translations } from '@/i18n';
import { loadProducts } from '@/lib/commonService';
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
                <ShopLeftBanner
                    region={region}
                    title={capitalizeWords(collectionSlug) + ' ' + capitalizeWords(slug)}
                    t={t}
                />
            </div>

            <div className="pt-3 flex flex-col md:flex-row">
                <ProductGrid
                    products={products}
                    totalRecords={totalRecords}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    sp={sp}
                    region={region}
                    t={t}
                    url={`/discover/categories/${slug}/${collectionSlug}`}
                />
            </div>
        </div>
    );
}
