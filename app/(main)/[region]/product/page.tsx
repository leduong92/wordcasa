import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { GetManageItemPagingRequest, ItemRequest } from '@/modals/getManageItemPagingRequest';
import { apiClient, PagedResult } from '@/lib/apiClient';
import { ItemDto } from '@/modals';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { Metadata } from 'next';
import SortMenu from '@/components/product/SortMenu';
import FilterMenu from '@/components/product/Filter/FilterMenu';
import ActiveFilters from '@/components/product/Filter/ActiveFilters';

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

interface ProductsPageProps {
    params: Promise<{ region: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
    const { region } = await params;
    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const pageIndex = Number(sp.page) > 0 ? Number(sp.page) : 1;
    const pageSize = 15;

    const q = sp.q as string | undefined;
    const parsedFilters = parseQ(q);

    const request: GetManageItemPagingRequest = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortKey: sp.sortKey as string,
        searchKey: sp.searchKey as string,
        obj: parsedFilters,
    };
    const response = await apiClient.post<PagedResult<ItemDto>>(`/api/item/paging`, request);

    const products = response.data?.items ?? [];
    const totalRecords = response.data?.totalRecords ?? 0;
    const totalPages = Math.ceil(totalRecords / pageSize);
    return (
        <div className="pt-5">
            {/* Breadcrumb */}
            <div className="flex mb-5 gap-3">
                <Link href={`/${region}`}>Home</Link>
                <span>/</span>
                <span>Products</span>
            </div>
            {/* Banner */}
            <div>
                <div className="w-full relative h-[350px] mb-10">
                    <Image src={'/bed_1.jpg'} fill alt="" className="object-cover rounded-md" />
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-neutral-50 px-6 rounded-md">
                        <h2 className="text-3xl md:text-5xl font-semibold mb-4">New Arrivals</h2>
                        <p className="max-w-2xl">
                            {`From materials built to last to curves designed for comfort and more,
                            our new collection is full of details you’ll love — all made with how
                            you live in mind.`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Layout */}
            <div className="pt-3 flex flex-col md:flex-row">
                {/* Sticky Filter Menu */}
                <FilterMenu />

                {/* Products */}
                <div className="flex-1">
                    <div className="hidden md:flex w-full items-center justify-between">
                        <div className="">
                            <ActiveFilters />
                        </div>
                        <div>
                            <SortMenu />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3  gap-6">
                        {products?.map((p) => (
                            <div key={p.id} className="">
                                <ProductCard region={region} product={p} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-10 space-x-2">
                            {/* Prev */}
                            {pageIndex > 1 && (
                                <Link
                                    href={{
                                        pathname: `/${region}/product`,
                                        query: {
                                            ...sp,
                                            page: String(pageIndex - 1),
                                        },
                                    }}
                                    className="px-3 py-2 border rounded bg-white text-gray-700 hover:bg-gray-100"
                                >
                                    Prev
                                </Link>
                            )}

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const pageNum = i + 1;
                                const isActive = pageNum === pageIndex;
                                return (
                                    <Link
                                        key={pageNum}
                                        href={{
                                            pathname: `/${region}/product`,
                                            query: {
                                                ...sp,
                                                page: String(pageNum),
                                            },
                                        }}
                                        className={`px-3 py-2 border rounded ${
                                            isActive
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {pageNum}
                                    </Link>
                                );
                            })}

                            {/* Next */}
                            {pageIndex < totalPages && (
                                <Link
                                    href={{
                                        pathname: `/${region}/product`,
                                        query: { ...sp, page: String(pageIndex + 1) },
                                    }}
                                    className="px-3 py-2 border rounded bg-white text-gray-700 hover:bg-gray-100"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function parseQ(q?: string): ItemRequest {
    if (!q) return {};

    const filters: ItemRequest = {};
    q.split('__').forEach((part) => {
        const [field, value] = part.split('--');
        if (!field || !value) return;

        switch (field) {
            case 'category':
                filters.category = filters.category ? `${filters.category},${value}` : value;
                break;
            case 'flags':
                filters.flags = filters.flags ? `${filters.flags},${value}` : value;
                break;
            case 'price':
                filters.price = filters.price ? `${filters.price},${value}` : value;
                break;
            default:
                filters.value = filters.value ? `${filters.value},${value}` : value;
                break;
        }
    });

    return filters;
}
