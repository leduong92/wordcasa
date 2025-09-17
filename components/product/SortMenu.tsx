// components/SortMenu.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface SortMenuProps {
    initialSearchParams: { [key: string]: string | string[] | undefined };
}

export default function SortMenu() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSortChange = (sortKey: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('sortKey', sortKey);
        newSearchParams.set('page', '1'); // Luôn reset về trang 1 khi sắp xếp
        router.push(`/${pathname.replace('/', '')}?${newSearchParams.toString()}`);
    };

    const isSortActive = (key: string) => searchParams.get('sortKey') === key;

    return (
        <div className="">
            <label htmlFor="sort-by" className="mr-2">
                Sort by:
            </label>
            <select
                id="sort-by"
                className="p-1 focus-visible:outline-none"
                onChange={(e) => handleSortChange(e.target.value)}
                value={searchParams.get('sortKey') || ''}
            >
                <option value="">Default</option>
                <option value="price-asc">Price: Low - High</option>
                <option value="price-desc">Price: High - Low</option>
                <option value="name-asc">Product: A-Z</option>
                <option value="name-desc">Product: Z-A</option>
            </select>
        </div>
    );
}
