import { cookies } from 'next/headers';
import MainLayout from '@/components/layout/MainLayout';
import Footer from '@/components/Footer';

export default async function RegionLayout({
    children,
    params,
    auth,
}: {
    children: React.ReactNode;
    params: Promise<{ region: string }>;
    auth: React.ReactNode;
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
            {auth}
        </>
    );
}
