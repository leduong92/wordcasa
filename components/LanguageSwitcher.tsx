'use client';

import { useRouter } from 'next/navigation';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
        router.refresh();
    };

    return (
        <div className="">
            {/* Mobile */}
            <select
                value={currentLang}
                onChange={handleChange}
                className="md:hidden rounded focus-visible:outline-none cursor-pointer border-0"
            >
                <option value="en">En</option>
                <option value="id">Id</option>
            </select>

            {/* Desktop */}
            <select
                value={currentLang}
                onChange={handleChange}
                className="hidden md:block rounded focus-visible:outline-none cursor-pointer border-0"
            >
                <option value="en">English</option>
                <option value="id">Bahasa</option>
            </select>
        </div>
    );
}
