'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Funnel, X } from 'lucide-react';
import SortMenu from './SortMenu';
import FilterContent from './FilterContent';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CategoryDto, CommonPageProps } from '@/modals';

interface Props extends CommonPageProps {
    categoryDtos: CategoryDto[] | undefined;
}

export default function FilterMenu({ categoryDtos, t }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    // Parse query q -> object
    const parseQuery = useCallback((q?: string) => {
        if (!q) return {};
        const filters: Record<string, string[]> = {};
        const parts = q.split('__');
        for (const part of parts) {
            const [field, value] = part.split('--');
            if (!field || !value) {
                continue;
            }
            // nhiều value => tách bằng ".."
            filters[field] = value.split('..');
        }
        return filters;
    }, []);

    const filters = parseQuery(searchParams.get('q') || '');

    // Build lại URL khi thay đổi filter
    const updateUrl = (newFilters: Record<string, string[]>, sortKey?: string) => {
        const q = Object.entries(newFilters)
            .map(([k, v]) => `${k}--${v.join('..')}`)
            .join('__');

        const params = new URLSearchParams(searchParams.toString());
        if (q) {
            params.set('q', q);
        } else {
            params.delete('q');
        }
        if (sortKey && sortKey.trim() !== '') {
            params.set('sortKey', sortKey);
        } else {
            params.delete('sortKey');
        }
        params.delete('page'); // reset page
        router.push(`/${pathname.replace('/', '')}?${params.toString()}`);
    };

    // Toggle filter on/off
    const toggleFilter = (field: string, value: string) => {
        const newFilters: Record<string, string[]> = { ...filters };
        const values = new Set(newFilters[field] || []);

        if (values.has(value)) {
            values.delete(value);
        } else {
            values.add(value);
        }

        if (values.size === 0) {
            delete newFilters[field]; // xoá field nếu rỗng
        } else {
            newFilters[field] = Array.from(values);
        }

        updateUrl(newFilters);
    };

    // Check selected
    const isSelected = (field: string, value: string) => filters[field]?.includes(value) ?? false;

    return (
        <div className="flex">
            {/* Nút Filter cho Mobile */}
            <div className="flex justify-between items-center w-full">
                <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setOpen(true)}
                    aria-label="Filters"
                >
                    <Funnel size={18} />
                    <span>{t?.filters}</span>
                </button>
                <div className="items-center justify-end">
                    <SortMenu t={t} />
                </div>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-80">
                    <SheetHeader>
                        <SheetTitle>{t?.filters}</SheetTitle>
                    </SheetHeader>
                    <FilterContent
                        isSelected={isSelected}
                        toggleFilter={toggleFilter}
                        categoryDtos={categoryDtos}
                        t={t}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}
