import { ReactNode } from 'react';
import NavMainMenu from './NavMainMenu';
import { getMenus } from '@/lib/apiService';

export default async function MainLayout({
    region,
    lang,
    children,
}: {
    region: string;
    lang: string;
    children: ReactNode;
}) {
    const menus = await getMenus();

    return (
        <div className="">
            <NavMainMenu region={region} lang={lang} categoryDtos={menus} />
            <main className="px-4 md:px-8 lg:px-12 font-helve text-neutral-700">{children}</main>
        </div>
    );
}
