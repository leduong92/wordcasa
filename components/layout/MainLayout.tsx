'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';

export default function MainLayout({
    region,
    lang,
    children,
}: {
    region: string;
    lang: string;
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <nav className="space-x-4">
                    <Link href={`/${region}`}>Home</Link>
                    <Link href={`/${region}/about`}>About</Link>
                    <Link href={`/${region}/product`}>Products</Link>
                </nav>
                <LanguageSwitcher currentLang={lang} />
            </header>
            <main className="p-8">{children}</main>
        </div>
    );
}
