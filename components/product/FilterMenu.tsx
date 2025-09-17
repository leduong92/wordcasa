'use client';
import { useCallback, useState } from 'react';
import { Funnel, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SortMenu from './SortMenu';

interface FilterMenuProps {
    initialSearchParams: { [key: string]: string | string[] | undefined };
}

const toggleFilter = (currentParams: string | string[] | undefined, value: string) => {
    const params = Array.isArray(currentParams)
        ? [...currentParams]
        : currentParams
        ? [currentParams]
        : [];
    const index = params.indexOf(value);

    if (index > -1) {
        params.splice(index, 1);
    } else {
        params.push(value);
    }
    return params.length > 0 ? params : undefined;
};

// Component AccordionItem mẫu (Bạn có thể đặt nó trong một file riêng)
const AccordionItem = ({
    title,
    options,
    filterGroup,
    onFilterClick,
    isFilterActive,
}: {
    title: string;
    options: string[];
    filterGroup: { name: string; value: string }; // Cấu trúc mới
    onFilterClick: (group: { name: string; value: string }, optionValue: string) => void;
    isFilterActive: (group: { name: string; value: string }, optionValue: string) => boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const getOptionValue = (option: string) => option.toLowerCase().replace(/\s/g, '');

    return (
        <div className="mb-2">
            <button
                className="flex items-center justify-between w-full p-2 text-sm font-medium text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <span>{isOpen ? '-' : '+'}</span>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
            >
                {options && (
                    <div className="mt-2 pl-2 space-y-2 text-sm text-gray-600">
                        {options.map((option) => (
                            <label key={option} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="accent-black"
                                    checked={isFilterActive(filterGroup, getOptionValue(option))}
                                    onChange={() =>
                                        onFilterClick(filterGroup, getOptionValue(option))
                                    }
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function FilterMenu({ initialSearchParams }: FilterMenuProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    const handleFilterClick = useCallback(
        (group: { name: string; value: string }, optionValue: string) => {
            // We use URLSearchParams from the useSearchParams hook, which is a client-side API.
            // This is safe and avoids the `window` error.
            const newSearchParams = new URLSearchParams(searchParams.toString());

            // Luôn set category dựa trên group.name (ví dụ: 'sofas' từ 'Sofas')
            newSearchParams.set(group.name, group.value);

            let currentValues = newSearchParams.getAll('value');
            if (currentValues.includes(optionValue)) {
                currentValues = currentValues.filter((v) => v !== optionValue);
            } else {
                currentValues.push(optionValue);
            }

            newSearchParams.delete('value');
            currentValues.forEach((v) => newSearchParams.append('value', v));

            newSearchParams.set('page', '1'); // Thêm dòng này để reset trang
            router.push(`/${pathname.replace('/', '')}?${newSearchParams.toString()}`);
        },
        [pathname, router, searchParams]
    );

    const isFilterActive = useCallback(
        (group: { name: string; value: string }, optionValue: string) => {
            const category = searchParams.get(group.name);
            const values = searchParams.getAll('value');

            return category === group.value && values.includes(optionValue);
        },
        [searchParams]
    );

    return (
        <div className="flex">
            {/* Nút Filter cho Mobile */}
            <div className="md:hidden flex justify-between items-center w-full">
                <button className="flex items-center gap-2" onClick={() => setOpen(true)}>
                    <Funnel size={18} />
                    <span>Filters</span>
                </button>
                <div className="md:hidden items-center justify-end">
                    <SortMenu />
                </div>
            </div>

            {/* Sidebar Desktop */}
            <aside className="hidden md:block md:w-52 lg:w-64 sticky top-4 h-fit pr-2">
                <h3 className="font-semibold mb-2">Category</h3>

                <div className="pt-2">
                    <AccordionItem
                        title="Sofas"
                        options={[
                            'All Sofas',
                            'Sectional Sofas',
                            'Loveseats',
                            '3 Seater Sofas',
                            'Modular Sofas',
                        ]}
                        filterGroup={{ name: 'category', value: 'sofas' }}
                        onFilterClick={handleFilterClick}
                        isFilterActive={isFilterActive}
                    />
                    <AccordionItem
                        title="Tables"
                        options={['Dining Tables', 'Coffee Tables', 'Side Tables']}
                        filterGroup={{ name: 'category', value: 'tables' }}
                        onFilterClick={handleFilterClick}
                        isFilterActive={isFilterActive}
                    />
                    <AccordionItem
                        title="Chairs"
                        options={['Armchairs', 'Dining Chairs', 'Office Chairs']}
                        filterGroup={{ name: 'category', value: 'chairs' }}
                        onFilterClick={handleFilterClick}
                        isFilterActive={isFilterActive}
                    />
                    <AccordionItem
                        title="Beds"
                        options={['King Size', 'Queen Size', 'Single']}
                        filterGroup={{ name: 'category', value: 'beds' }}
                        onFilterClick={handleFilterClick}
                        isFilterActive={isFilterActive}
                    />
                </div>

                <h3 className="font-semibold mt-6 mb-2">Featured</h3>
                <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="accent-black"
                            checked={isFilterActive({ name: 'category', value: 'sale' }, 'true')}
                            onChange={() =>
                                handleFilterClick({ name: 'category', value: 'sale' }, 'true')
                            }
                        />{' '}
                        Sale
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="accent-black"
                            checked={isFilterActive({ name: 'category', value: 'new' }, 'true')}
                            onChange={() =>
                                handleFilterClick({ name: 'category', value: 'new' }, 'true')
                            }
                        />{' '}
                        New Arrival
                    </label>
                </div>
            </aside>

            {/* Overlay + Sidebar Mobile */}
            <div
                className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
                    open ? 'opacity-100 visible' : 'opacity-0 invisible'
                } lg:hidden`}
                onClick={() => setOpen(false)}
            >
                {/* Sidebar panel */}
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

                    <h3 className="font-semibold mb-2">Category</h3>
                    <ul className="space-y-2">
                        <li
                            className="cursor-pointer hover:text-gray-600"
                            onClick={() =>
                                handleFilterClick({ name: 'category', value: 'sofas' }, 'category')
                            }
                        >
                            Sofas
                        </li>
                        <li
                            className="cursor-pointer hover:text-gray-600"
                            onClick={() =>
                                handleFilterClick({ name: 'category', value: 'tables' }, 'category')
                            }
                        >
                            Tables
                        </li>
                        <li className="cursor-pointer hover:text-gray-600">Chairs</li>
                        <li className="cursor-pointer hover:text-gray-600">Beds</li>
                    </ul>

                    <h3 className="font-semibold mt-6 mb-2">Featured</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-black"
                                checked={isFilterActive(
                                    { name: 'category', value: 'sale' },
                                    'true'
                                )}
                                onChange={() =>
                                    handleFilterClick({ name: 'category', value: 'sale' }, 'true')
                                }
                            />{' '}
                            Sale
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-black"
                                checked={isFilterActive({ name: 'category', value: 'new' }, 'true')}
                                onChange={() =>
                                    handleFilterClick({ name: 'category', value: 'new' }, 'true')
                                }
                            />{' '}
                            New Arrival
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
