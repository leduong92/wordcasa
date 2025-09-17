// components/SearchInput.tsx
'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SearchInputProps {
    initialSearchParams: { [key: string]: string | string[] | undefined };
}

export default function SearchInput() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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
                className="border rounded px-4 py-2  focus:outline-none focus-visible:outline-none focus:ring-1 focus:ring-neutral-300"
            />
            <button onClick={handleSearch} className="absolute right-4 cursor-pointer ">
                <Search size={16} />
            </button>
        </div>
    );
}
