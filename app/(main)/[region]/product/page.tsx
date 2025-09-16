import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import { GetManageItemPagingRequest } from '@/modals/getManageItemPagingRequest';
import { apiClient, PagedResult } from '@/lib/apiClient';
import { ItemDto } from '@/modals';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';
import FilterMenu from '@/components/product/FilterMenu';
import Link from 'next/link';
import { Metadata } from 'next';

interface ProductsPageProps {
    params: Promise<{ region: string }>;
    searchParams: Promise<{ page?: string }>;
}

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

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
    const { region } = await params;
    const { page } = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const pageIndex = Number(page) > 0 ? Number(page) : 1;
    const pageSize = 15;

    const request: GetManageItemPagingRequest = {
        pageIndex: pageIndex,
        pageSize: pageSize,
    };

    const response = await apiClient.post<PagedResult<ItemDto>>(`/api/item/paging`, request);

    const products = response.data?.items;

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
                            From materials built to last to curves designed for comfort and more,
                            our new collection is full of details you’ll love — all made with how
                            you live in mind.
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products?.map((p) => (
                            <div key={p.id} className="">
                                <ProductCard region={region} product={p} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-10 space-x-2">
                            {/* Prev */}
                            {pageIndex > 1 && (
                                <Link
                                    href={`/${region}/product?page=${pageIndex - 1}`}
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
                                        href={`/${region}/product?page=${pageNum}`}
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
                                    href={`/${region}/product?page=${pageIndex + 1}`}
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
