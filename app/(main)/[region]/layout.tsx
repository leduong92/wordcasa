import { cookies } from 'next/headers';
import MainLayout from '@/components/layout/main/MainLayout';
import Footer from '@/components/Footer';
import UserModal from '@/components/auth/AuthModal';
import JoinMailList from '@/components/JoinMailList';
import { translations } from '@/i18n';

export default async function RegionLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ region: string }>;
}) {
    const { region } = await params;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];
    return (
        <>
            <MainLayout region={region} lang={lang} t={t}>
                {children}
            </MainLayout>
            <Footer region={region} lang={lang} t={t} />
            <UserModal region={region} />
            <JoinMailList />
        </>
    );
}
