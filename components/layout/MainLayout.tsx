'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import NavMainMenu from './NavMainMenu';

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
        <div className="min-h-screen ">
            <NavMainMenu region={region} lang={lang} />
            <main className="px-4 md:px-8 lg:px-32 xl:px-64">{children}</main>
        </div>
    );
}
