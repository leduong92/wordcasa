import ProfilePage from '@/components/profile/ProfilePage';
import { translations } from '@/i18n';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';

interface PageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(
    { params, searchParams }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, region } = await params;

    return {
        title: 'Profile | World Casa',
        description: 'User Profile',
    };
}

export default async function ProfileLayout({ params, searchParams }: PageProps) {
    const { region } = await params;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    return <ProfilePage region={region} />;
}
