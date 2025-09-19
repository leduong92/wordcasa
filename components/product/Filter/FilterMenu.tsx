'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import AccordionItem from './AccordionItem';
import { Funnel, X } from 'lucide-react';
import SortMenu from '../SortMenu';
import FilterContent from './FilterContent';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export default function FilterMenu() {
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
                >
                    <Funnel size={18} />
                    <span>Filters</span>
                </button>
                <div className="items-center justify-end">
                    <SortMenu />
                </div>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-72">
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <FilterContent isSelected={isSelected} toggleFilter={toggleFilter} />
                </SheetContent>
            </Sheet>

            {/* <aside className="hidden md:block md:w-52 lg:w-64 sticky top-4 h-fit pr-2">
                <FilterContent isSelected={isSelected} toggleFilter={toggleFilter} />
            </aside> */}

            {/* Overlay + Sidebar Mobile */}
            {/* <div
                className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
                    open ? 'opacity-100 visible' : 'opacity-0 invisible'
                } lg:hidden`}
                onClick={() => setOpen(false)}
            >
                <div
                    className={`fixed top-0 left-0 w-72 h-full bg-white p-4 shadow-lg transform transition-transform duration-300 ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()} // tránh click overlay đóng panel khi click trong menu
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg">Filters</h2>
                        <button onClick={() => setOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <FilterContent isSelected={isSelected} toggleFilter={toggleFilter} />
                </div>
            </div> */}
        </div>
    );
}
