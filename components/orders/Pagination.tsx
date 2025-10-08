'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
    return (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
            <p>
                Showing <span className="font-semibold">{page}</span> of{' '}
                <span className="font-semibold">{totalPages}</span> pages
            </p>

            <div className="flex items-center gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => onChange(page - 1)}
                    className={`flex items-center gap-1 px-3 py-1.5 border rounded-lg cursor-pointer ${
                        page === 1
                            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'hover:bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                >
                    <ChevronLeft size={16} /> Prev
                </button>

                <button
                    disabled={page === totalPages}
                    onClick={() => onChange(page + 1)}
                    className={`flex items-center gap-1 px-3 py-1.5 border rounded-lg cursor-pointer ${
                        page === totalPages
                            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'hover:bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                >
                    Next <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
