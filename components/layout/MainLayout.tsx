'use client';
import { ReactNode } from 'react';
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
        <div className="">
            <NavMainMenu region={region} lang={lang} />
            <main className="px-4 md:px-8 lg:px-24">{children}</main>
        </div>
    );
}
