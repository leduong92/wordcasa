'use client';

import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ActiveFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const q = searchParams.get('q') || '';

    // parse q => { field: [values] }
    const parsed: Record<string, string[]> = {};
    q.split('__').forEach((part) => {
        const [field, value] = part.split('--');
        if (field && value) {
            parsed[field] = value.split('..');
        }
    });

    // tổng số filter đang chọn
    const totalCount = Object.values(parsed).reduce((sum, arr) => sum + arr.length, 0);

    const removeFilter = (field: string, value: string) => {
        const newFilters: Record<string, string[]> = { ...parsed };
        newFilters[field] = (newFilters[field] || []).filter((v) => v !== value);
        if (newFilters[field].length === 0) delete newFilters[field];

        const newQ = Object.entries(newFilters)
            .map(([k, v]) => `${k}--${v.join('..')}`)
            .join('__');

        const params = new URLSearchParams(searchParams.toString());
        if (newQ) params.set('q', newQ);
        else params.delete('q');
        params.delete('page');

        router.push(`/${pathname.replace('/', '')}?${params.toString()}`);
    };

    const clearAll = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('q');
        params.delete('page');
        router.push(`/${pathname.replace('/', '')}?${params.toString()}`);
    };

    if (totalCount === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <button
                onClick={clearAll}
                className="px-3 py-1 cursor-pointer flex items-center gap-2 bg-neutral-800 hover:bg-neutral-500 text-neutral-50 rounded text-sm"
            >
                All filters ({totalCount}) <X size={16} />
            </button>

            {Object.entries(parsed).map(([field, values]) =>
                values.map((value) => (
                    <span
                        key={`${field}-${value}`}
                        className="flex items-center gap-1 border capitalize px-2 py-1 cursor-pointer rounded text-sm bg-neutral-100"
                    >
                        {field}: {value}
                        <button
                            onClick={() => removeFilter(field, value)}
                            className="ml-1 text-gray-600 hover:text-black cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    </span>
                ))
            )}
        </div>
    );
}
