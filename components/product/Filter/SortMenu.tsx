// components/SortMenu.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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

    return (
        <div className="flex items-center">
            <label htmlFor="sort-by" className="mr-2">
                Sort by:
            </label>
            <Select onValueChange={(val) => handleSortChange(val)}>
                <SelectTrigger className="w-[150px] border-none focus-visible:border-none">
                    <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name-asc">Product: A-Z</SelectItem>
                    <SelectItem value="name-desc">Product: Z-A</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
