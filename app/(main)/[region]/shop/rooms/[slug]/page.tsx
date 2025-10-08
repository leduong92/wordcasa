import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { Metadata } from 'next';
import FilterMenu from '@/components/product/Filter/FilterMenu';
import ActiveFilters from '@/components/product/Filter/ActiveFilters';
import { getMenus, loadProducts } from '@/lib/commonService';
import ProductGrid from '@/components/product/ProductGrid';
import { capitalizeWords } from '@/lib/utils';
import ShopLeftBanner from '@/components/ShopLeftBanner';

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const { page } = await searchParams;
    const { slug, region } = await params;
    const pageIndex = Number(page) > 0 ? Number(page) : 1;

    return {
        title: `${capitalizeWords(slug)} | Page ${pageIndex} | World Casa`,
        description: `Browse our catalog - Page ${pageIndex}. Find sofas, chairs, tables and more.`,
        alternates: {
            canonical: `/${region}/shop/rooms?page=${pageIndex}`,
        },
        openGraph: {
            title: `World Casa Products - Page ${pageIndex}`,
            description: `Browse furniture collection - Page ${pageIndex}.`,
            url: `/${region}/shop/rooms?page=${pageIndex}`,
            siteName: 'World Casa',
            type: 'website',
        },
    };
}

interface PageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ShopePages({ params, searchParams }: PageProps) {
    const { region, slug } = await params;
    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const { products, totalRecords, totalPages, pageIndex, pageSize } = await loadProducts(
        undefined,
        slug,
        undefined,
        sp
    );

    const menus = await getMenus();

    return (
        <div className="pt-5">
            {/* Banner */}
            <div className="flex border-b">
                <ShopLeftBanner region={region} title={slug} t={t} />
            </div>

            <div className="flex w-full items-center justify-between py-4">
                <div className="w-full">
                    <FilterMenu categoryDtos={menus} t={t} />
                    <ActiveFilters t={t} />
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
                    t={t}
                    url={`/shop/room/${slug}`}
                />
            </div>
        </div>
    );
}
