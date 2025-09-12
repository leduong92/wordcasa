'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const SearchBar = ({ onSearch }: { onSearch?: () => void }) => {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = (formData.get('q') as string).trim();
        if (searchValue) {
            router.push(`/search?q=${searchValue}`);
        } else {
            router.push('/search'); //
        }
        onSearch?.();
    };
    return (
        <form className="flex justify-between gap-4 p-2 flex-1  border " onSubmit={handleSearch}>
            <input
                autoComplete="off"
                type="text"
                name="q"
                placeholder="Search products..."
                className="flex-1 bg-transparent outline-none text-sm"
                defaultValue={''}
            />
            <button className="cursor-pointer" aria-label="Search"></button>
        </form>
    );
};

export default SearchBar;
