import { cookies } from 'next/headers';
import { languages } from '@/i18n';
import MainLayout from '@/components/layout/MainLayout';

export default async function RegionLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ region: string }>;
}) {
    const { region } = await params;

    const cookieStore = await cookies();
    let lang = cookieStore.get('lang')?.value || 'en';
    if (!languages.includes(lang as any)) {
        lang = 'en';
    }

    return (
        <MainLayout region={region} lang={lang}>
            {children}
        </MainLayout>
    );
}
