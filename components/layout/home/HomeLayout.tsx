import NavHomeMenu from './NavHomeMenu';
import { getMenus } from '@/lib/commonService';

export default async function HomeLayout({
    children,
    lang,
    region,
}: {
    children: React.ReactNode;
    lang: string;
    region: string;
}) {
    const menus = await getMenus();

    return (
        <div className="">
            <NavHomeMenu region={region} lang={lang} categoryDtos={menus} />
            <main className="flex-1 font-helve tracking-wide">{children}</main>
        </div>
    );
}
