import { cookies } from 'next/headers';
import MainLayout from '@/components/layout/main/MainLayout';
import Footer from '@/components/Footer';
import UserModal from '@/components/auth/AuthModal';
import JoinMailList from '@/components/JoinMailList';

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
    return (
        <>
            <MainLayout region={region} lang={lang}>
                {children}
            </MainLayout>
            <Footer region={region} lang={lang} />
            <UserModal region={region} />
            <JoinMailList />
        </>
    );
}
