// components/SearchInput.tsx
'use client';

import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { CommonPageProps } from '@/modals';

const popularTerms = [
    'marid',
    'paris',
    'beds',
    'chairs',
    'nightstand',
    'living',
    'dining',
    'new',
    'lisbon',
    'seoul',
];

const categories = [
    { name: 'Sofas', image: '/bed_1.jpg' },
    { name: 'Beds', image: '/bed_2.jpg' },
    { name: 'Dining', image: '/bed_3.jpg' },
    { name: 'Storage', image: '/bed_4.jpg' },
];

interface Props extends CommonPageProps {
    isShowDialog: boolean;
    isSidebar: boolean;
}

export default function SearchInput({ isShowDialog, region, isSidebar, t }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    // Lấy giá trị tìm kiếm ban đầu từ URL
    const initialSearchKey = searchParams.get('searchKey') || '';
    const [searchQuery, setSearchQuery] = useState(initialSearchKey);

    // Tạo một URLSearchParams mới để tránh lỗi `window not defined`
    const currentParams = new URLSearchParams(searchParams.toString());

    // Hàm xử lý khi người dùng gõ
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        setSearchQuery('');
    }, [pathname]);

    // Hàm xử lý khi người dùng nhấn Enter hoặc nút tìm kiếm
    const handleSearch = () => {
        // Cập nhật tham số tìm kiếm và reset trang về 1
        currentParams.set('searchKey', searchQuery);
        currentParams.set('page', '1');

        // router.push(`/${pathname.replace('/', '')}/search?${currentParams.toString()}`);

        if (!searchQuery.trim()) return;
        router.push(`/${region}/search?${currentParams.toString()}`);

        setOpen(false);
    };

    if (isSidebar) {
        return (
            <div>
                <SearchBox
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    t={t}
                />
            </div>
        );
    }

    if (!isShowDialog) {
        return (
            <div>
                <SearchBox
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    t={t}
                />
                <PopularTermsList />
                <CategoryGrid />
            </div>
        );
    }

    return (
        <div>
            {/* Thanh search nhỏ */}
            <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                onFocus={() => setOpen(true)}
                readonly={true}
                t={t}
                className="border-b"
            />

            {/* Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[95%] max-w-3xl h-[90vh]">
                    <DialogTitle style={{ display: 'none' }}></DialogTitle>
                    <div className="w-full h-full flex flex-col">
                        <div className="flex px-4 md:px-14 py-4 gap-6 h-full">
                            {/* Left side */}
                            <div className="w-1/2 flex flex-col">
                                <SearchBox
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    onSearch={handleSearch}
                                    autoFocus
                                    readonly={false}
                                    className="border-b mb-4"
                                />
                                <PopularTermsList />
                            </div>

                            {/* Right side */}
                            <div className="w-1/2">
                                <CategoryGrid />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

/* ------------------ Sub Components ------------------ */
function SearchBox({
    value,
    onChange,
    onSearch,
    onFocus,
    autoFocus = false,
    readonly = false,
    className = '',
    t,
}: {
    value: string;
    onChange: (v: string) => void;
    onSearch: () => void;
    onFocus?: () => void;
    autoFocus?: boolean;
    readonly?: boolean;
    className?: string;
    t?: Record<string, string>;
}) {
    return (
        <div className={`flex items-center space-x-2 relative ${className}`}>
            <input
                type="text"
                placeholder={`${t?.search ?? 'Search...'}`}
                value={value}
                autoFocus={autoFocus}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                onFocus={onFocus}
                readOnly={readonly}
                className="w-full px-4 py-2 focus:outline-none text-base"
            />
            {/* Clear button hiển thị khi có text */}
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="absolute right-10 text-gray-400 hover:text-gray-600 cursor-pointer"
                    aria-label="Times"
                >
                    <X size={16} />
                </button>
            )}
            <button
                onClick={onSearch}
                className="absolute right-4 cursor-pointer w-8 h-8"
                aria-label="Search"
            >
                <Search size={18} />
            </button>
        </div>
    );
}

function PopularTermsList() {
    return (
        <div className="px-2 py-6 border-b">
            <h2 className="text-base font-medium mb-4">Popular search terms</h2>
            <ul className="space-y-3 text-sm text-gray-700">
                {popularTerms.map((term, i) => (
                    <li
                        key={i}
                        style={{ animationDelay: `${i * 60}ms` }}
                        className="flex items-center gap-2 opacity-0 animate-fadeInUp"
                    >
                        <Search size={14} className="text-gray-500" />
                        <span>{term}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CategoryGrid() {
    return (
        <div className="grid grid-cols-2 gap-4 px-2">
            {categories.map((cat, i) => (
                <div key={i} className="flex flex-col">
                    <div className="relative w-full h-[100px] md:h-[250px] overflow-hidden rounded-md">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                    </div>
                    <span className="text-sm text-gray-700 mt-2">{cat.name}</span>
                </div>
            ))}
        </div>
    );
}
