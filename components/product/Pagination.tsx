import Link from 'next/link';
import React from 'react';

const Pagination = ({
    region,
    currentPage,
    totalPages,
}: {
    region: string;
    currentPage: number;
    totalPages: number;
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            {currentPage > 1 && (
                <Link href={'#'} rel="prev" className="px-3 py-1 border rounded">
                    Prev
                </Link>
            )}

            {pages.map((page) => (
                <Link
                    key={page}
                    href={'#'}
                    className={`px-3 py-1 border rounded ${
                        page === currentPage ? 'bg-black text-white' : 'bg-white'
                    }`}
                >
                    {page}
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link href={'#'} rel="next" className="px-3 py-1 border rounded">
                    Next
                </Link>
            )}
        </div>
    );
};

export default Pagination;
