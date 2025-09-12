'use client';

import { useRouter } from 'next/navigation';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
        router.refresh(); // reload để áp dụng language mới
    };

    return (
        <select
            value={currentLang}
            onChange={handleChange}
            className="p-1 rounded border text-black"
        >
            <option value="en">English</option>
            <option value="id">Bahasa</option>
        </select>
    );
}
