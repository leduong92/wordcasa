import { CommonPageProps } from '@/modals';
import NavHomeMenu from './NavHomeMenu';
import { getMenus } from '@/lib/commonService';

interface Props extends CommonPageProps {
    children: React.ReactNode;
}

export default async function HomeLayout({ children, lang, region, t }: Props) {
    const menus = await getMenus();

    return (
        <div className="">
            <NavHomeMenu region={region} lang={lang} categoryDtos={menus} t={t} />
            <main className="flex-1 font-helve tracking-wide">{children}</main>
        </div>
    );
}
