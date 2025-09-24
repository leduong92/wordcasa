import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { Metadata } from 'next';
import FilterMenu from '@/components/product/Filter/FilterMenu';
import ActiveFilters from '@/components/product/Filter/ActiveFilters';
import { getMenus, loadProducts } from '@/lib/apiService';
import ProductGrid from '@/components/product/ProductGrid';
import { capitalizeWords } from '@/lib/utils';

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const { page } = await searchParams;
    const { slug, region } = await params;
    const pageIndex = Number(page) > 0 ? Number(page) : 1;

    return {
        title: `${capitalizeWords(slug)} | Page ${pageIndex} | Worldcasa`,
        description: `Browse our catalog - Page ${pageIndex}. Find sofas, chairs, tables and more.`,
        alternates: {
            canonical: `/${region}/product?page=${pageIndex}`,
        },
        openGraph: {
            title: `Worldcasa Products - Page ${pageIndex}`,
            description: `Browse furniture collection - Page ${pageIndex}.`,
            url: `/${region}/product?page=${pageIndex}`,
            siteName: 'Worldcasa',
            type: 'website',
        },
    };
}

interface PageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const { region, slug } = await params;
    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const { products, totalRecords, totalPages, pageIndex, pageSize } = await loadProducts(
        slug,
        undefined,
        undefined,
        sp
    );

    const menus = await getMenus();

    return (
        <div className="pt-5">
            {/* Banner */}
            <div className="flex border-b">
                <div className="flex-1 py-8 lg:py-14">
                    <h1 className="text-5xl font-basker font-basker text-neutral-700">
                        {capitalizeWords(slug)}
                    </h1>
                    <p className="text-xl text-neutral-700 basker mt-8">
                        {/* Explore our latest designs – crafted for modern living. */}
                    </p>
                </div>

                {/* Categories */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"></div>
                </div>
            </div>

            <div className="flex w-full items-center justify-between py-4">
                <div className="w-full">
                    <FilterMenu categoryDtos={menus} />
                    <ActiveFilters />
                </div>
            </div>

            {/* Layout */}
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
