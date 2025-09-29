import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import FilterMenu from '@/components/product/Filter/FilterMenu';
import ActiveFilters from '@/components/product/Filter/ActiveFilters';
import { getMenus, loadProducts } from '@/lib/commonService';
import ProductGrid from '@/components/product/ProductGrid';
import ShopLeftBanner from '@/components/ShopLeftBanner';

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const { page } = await searchParams;
    const { region } = await params;
    const pageIndex = Number(page) > 0 ? Number(page) : 1;

    return {
        title: `New Arrivals | Page ${pageIndex} | Worldcasa`,
        description: `Browse our catalog - Page ${pageIndex}. Find sofas, chairs, tables and more.`,
        alternates: {
            canonical: `/${region}/product?page=${pageIndex}`,
        },
        openGraph: {
            title: `Worldcasa New Products - Page ${pageIndex}`,
            description: `Browse furniture collection - Page ${pageIndex}.`,
            url: `/${region}/product?page=${pageIndex}`,
            siteName: 'Worldcasa',
            type: 'website',
        },
    };
}

const categories = [
    { name: 'Living rooms', slug: 'living-room', image: '/bed_1.jpg' },
    { name: 'Dining rooms', slug: 'dining-room', image: '/bed_2.jpg' },
    { name: 'Bedrooms', slug: 'bedroom', image: '/bed_3.jpg' },
];

interface PageProps {
    params: Promise<{ region: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NewArrivalsPage({ params, searchParams }: PageProps) {
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
        <div className="pt-2">
            {/* Banner */}
            <div className="flex flex-col md:flex-row items-center border-b py-5">
                <ShopLeftBanner region={region} title={'New arrivals'} />

                {/* Categories */}
                <div className="flex-1 items-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <Link
                                href={`/${region}/shop/rooms/${cat.slug}`}
                                key={cat.name}
                                className="cursor-pointer group"
                            >
                                <div className="relative w-full h-40 overflow-hidden">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <p className="mt-2 text-center">{cat.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center justify-between py-4">
                <div className="w-full">
                    <FilterMenu categoryDtos={menus} />
                    <ActiveFilters />
                </div>
            </div>

            {/* Layout */}
            <div className="pt-3 flex flex-col md:flex-row w-full">
                <ProductGrid
                    products={products}
                    totalRecords={totalRecords}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    sp={sp}
                    region={region}
                    url="/shop/new-arrivals"
                />
            </div>
        </div>
    );
}
