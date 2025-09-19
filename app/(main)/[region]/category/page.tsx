import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { GetManageItemPagingRequest, ItemRequest } from '@/modals/getManageItemPagingRequest';
import { apiClient, PagedResult } from '@/lib/apiClient';
import { ItemDto } from '@/modals';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { Metadata } from 'next';
import FilterMenu from '@/components/product/Filter/FilterMenu';
import ActiveFilters from '@/components/product/Filter/ActiveFilters';
import { parseQ } from '@/lib/utils';
import { loadProducts } from '@/lib/apiService';
import ProductGrid from '@/components/product/ProductGrid';

export async function generateMetadata({
    params,
    searchParams,
}: ProductsPageProps): Promise<Metadata> {
    const { page } = await searchParams;
    const { region } = await params;
    const pageIndex = Number(page) > 0 ? Number(page) : 1;

    return {
        title: `Buy Products Online | Page ${pageIndex} | Worldcasa`,
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

const categories = [
    { name: 'Living rooms', image: '/bed_1.jpg' },
    { name: 'Bedrooms', image: '/bed_1.jpg' },
    { name: 'Dining rooms', image: '/bed_1.jpg' },
];

interface ProductsPageProps {
    params: Promise<{ region: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CategoryNoSlugPage({ params, searchParams }: ProductsPageProps) {
    const { region } = await params;
    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const { products, totalRecords, totalPages, pageIndex, pageSize } = await loadProducts(
        undefined,
        sp
    );

    return (
        <div className="pt-5">
            {/* Breadcrumb */}
            <div className="flex mb-5 gap-3 text-sm">
                <Link href={`/${region}`}>Home</Link>
                <span>/</span>
                <span>Products</span>
            </div>
            {/* Banner */}
            <div className="flex border-b">
                <div className="flex-1 pt-14">
                    <h1 className="text-7xl font-serif font-basker mb-4">New arrivals</h1>
                    <p className="text-xl text-gray-600 basker mt-8">
                        Explore our latest designs – crafted for modern living.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        {categories.map((cat) => (
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
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center justify-between py-4">
                <div className="w-full">
                    <FilterMenu />
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
