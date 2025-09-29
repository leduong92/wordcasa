import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { Metadata } from 'next';
import { getMenus, loadProducts } from '@/lib/commonService';
import ProductGrid from '@/components/product/ProductGrid';
import { capitalizeWords } from '@/lib/utils';
import ShopLeftBanner from '@/components/ShopLeftBanner';

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
            <ShopLeftBanner region={region} title={slug} />

            {/* <div className="flex w-full items-center justify-between py-4">
                <div className="w-full">
                    <FilterMenu categoryDtos={menus} />
                    <ActiveFilters />
                </div>
            </div> */}

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
