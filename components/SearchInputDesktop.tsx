// components/SearchInput.tsx
'use client';

import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

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
    { name: 'Chairs', image: '/bed_2.jpg' },
    { name: 'Dining', image: '/bed_3.jpg' },
    { name: 'Storage', image: '/bed_4.jpg' },
];

export default function SearchInputDesktop() {
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

    // Hàm xử lý khi người dùng nhấn Enter hoặc nút tìm kiếm
    const handleSearch = () => {
        // Cập nhật tham số tìm kiếm và reset trang về 1
        currentParams.set('searchKey', searchQuery);
        currentParams.set('page', '1');

        router.push(`/${pathname.replace('/', '')}?${currentParams.toString()}`);
    };

    return (
        <div>
            <div className="flex items-center space-x-2 relative">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    onFocus={() => setOpen(true)}
                    className="px-4 placeholder-gray-300 focus:outline-none focus-visible:outline-none "
                />
            </div>
            {/* <Dialog>
                <DialogTrigger>
                    <div className="flex items-center space-x-2 relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            onFocus={() => setOpen(true)}
                            className="px-4 placeholder-gray-300 focus:outline-none focus-visible:outline-none "
                        />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2/3">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <div className="flex items-center gap-2 flex-1 w-full">
                                <Search size={18} className="text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                    onFocus={() => setOpen(true)}
                                    className="px-4 w-full placeholder-gray-300 focus:outline-none focus-visible:outline-none "
                                />
                            </div>
                            <button onClick={() => setOpen(false)}>
                                <X size={24} className="text-gray-600" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-8">
    
                            <div>
                                <h2 className="text-base font-semibold mb-4">
                                    Popular search terms
                                </h2>
                                <ul className="space-y-3 text-sm text-gray-700">
                                    {popularTerms.map((term, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2 cursor-pointer hover:text-black"
                                        >
                                            <Search size={14} className="text-gray-500" />
                                            <span>{term}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6">
                                {categories.map((cat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="relative w-full aspect-square overflow-hidden rounded-md shadow-sm">
                                            <Image
                                                src={cat.image}
                                                alt={cat.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-700 mt-2">
                                            {cat.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}

            {/* <div className="block md:hidden">
                <div className="px-2 py-6 border-b">
                    <h2 className="text-base font-medium mb-4">Popular search terms</h2>
                    <ul className="space-y-3 text-sm text-gray-700">
                        {popularTerms.map((term, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Search size={14} className="text-gray-500" />
                                <span>{term}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 px-2">
                    {categories.map((cat, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-sm text-gray-700 mt-2">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
}
