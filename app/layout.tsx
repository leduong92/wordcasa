// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import GoToTopButton from '@/components/GoToTopButton';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';
import { languages, translations } from '@/i18n';

const hurme = localFont({
    src: [
        {
            path: '../public/fonts/HurmeGeometricSans1-Regular.woff',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-hurme',
});
export const metadata: Metadata = {
    title: 'Official Website | WorldCasa',
    description: 'Next.js app with region-based layouts',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    return (
        <html lang="en" className={hurme.variable}>
            <body>
                {children}
                <GoToTopButton />
                <Footer lang={lang} />
            </body>
        </html>
    );
}
