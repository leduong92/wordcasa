import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';

export default function ProductGrid({
    products,
    totalRecords,
    pageIndex,
    pageSize,
    sp,
    region,
    t,
    url,
}: {
    products: any[];
    totalRecords: number;
    pageIndex: number;
    pageSize: number;
    sp: Record<string, string | string[] | undefined>;
    region: string;
    t?: Record<string, string>;
    url: string;
}) {
    const totalPages = Math.ceil(totalRecords / pageSize);

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} region={region} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-2">
                    {pageIndex > 1 && (
                        <Link
                            href={{
                                pathname: `/${region}${url}`,
                                query: { ...sp, page: String(pageIndex - 1) },
                            }}
                            className="px-3 py-2 border rounded bg-white text-gray-700 hover:bg-gray-100"
                        >
                            Prev
                        </Link>
                    )}

                    {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        const isActive = pageNum === pageIndex;
                        return (
                            <Link
                                key={pageNum}
                                href={{
                                    pathname: `/${region}${url}`,
                                    query: { ...sp, page: String(pageNum) },
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

                    {pageIndex < totalPages && (
                        <Link
                            href={{
                                pathname: `/${region}${url}`,
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
    );
}
