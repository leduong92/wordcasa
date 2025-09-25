// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import GoToTopButton from '@/components/GoToTopButton';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';
import { languages, translations } from '@/i18n';
import NextAuthProvider from '@/components/NextAuthProvider';
import UserModal from '@/components/auth/AuthModal';

export const baskerville = localFont({
    src: [
        {
            path: '../public/fonts/Baskervville-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--baskerville',
    display: 'swap',
});

export const helveticaNeue = localFont({
    src: [
        {
            path: '../public/fonts/HelveticaNeue_Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/HelveticaNeue_Roman.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/HelveticaNeue_Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/HelveticaNeue_Bd.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--helvetica-neue',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Official Website | WorldCasa',
    description:
        'Luxury design furniture by Worldcasa. Shop designer furniture from a worldwide brand. Worldcasa provides interior solutions for living, dining, bedroom, home office and commercial spaces no matter the type or size of space you’re workingwith.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    return (
        <html lang="en" className={`${baskerville.variable} ${helveticaNeue.variable}`}>
            <body>
                <NextAuthProvider>{children}</NextAuthProvider>
                <GoToTopButton />
                <UserModal />
            </body>
        </html>
    );
}
