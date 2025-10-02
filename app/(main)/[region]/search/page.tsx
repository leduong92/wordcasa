import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { Metadata } from 'next';
import FilterMenu from '@/components/product/Filter/FilterMenu';
import ActiveFilters from '@/components/product/Filter/ActiveFilters';
import { getMenus, loadProducts } from '@/lib/commonService';
import ProductGrid from '@/components/product/ProductGrid';

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const { page } = await searchParams;
    const { region } = await params;
    const pageIndex = Number(page) > 0 ? Number(page) : 1;

    return {
        title: `Search | Page ${pageIndex} | Worldcasa`,
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
    params: Promise<{ region: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ params, searchParams }: PageProps) {
    const { region } = await params;
    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const { products, totalRecords, totalPages, pageIndex, pageSize } = await loadProducts(
        undefined,
        undefined,
        undefined,
        sp
    );

    const menus = await getMenus();
    return (
        <div className="">
            {/* Banner */}
            <div className="flex flex-col md:flex-row border-b">
                <div className="flex-1 py-6 md:py-8">
                    {/* <h1 className="text-6xl md:text-7xl font-serif font-basker mb-4">
                        New arrivals
                    </h1> */}
                    <p className="text-xl text-neutral-500 basker mt-4 md:mt-8 tracking-wide">
                        Showing {totalRecords} results for{' '}
                        <strong className="text-neutral-800">“{sp.searchKey}”</strong>
                    </p>
                </div>

                {/* Categories */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        {/* {categories.map((cat) => (
                            <Link
                                href={`/${region}/room/${cat.slug}`}
                                key={cat.name}
                                className="cursor-pointer group"
                            >
                                <div className="relative w-full h-40 overflow-hidden rounded-lg">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <p className="mt-2 text-center">{cat.name}</p>
                            </Link>
                        ))} */}
                    </div>
                </div>
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
                    url={`/search`}
                />
            </div>
        </div>
    );
}
