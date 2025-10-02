import { ReactNode } from 'react';
import NavMainMenu from './NavMainMenu';
import { getMenus } from '@/lib/commonService';
import { CommonPageProps } from '@/modals';

interface Props extends CommonPageProps {
    children: ReactNode;
}

export default async function MainLayout({ region, lang, t, children }: Props) {
    const menus = await getMenus();

    return (
        <div className="">
            <NavMainMenu region={region} lang={lang} categoryDtos={menus} t={t} />
            <main className="px-4 md:px-8 lg:px-12 font-helve text-neutral-700 tracking-wide">
                {children}
            </main>
        </div>
    );
}
