import { NextRequest, NextResponse } from 'next/server';
import { regions } from '@/i18n';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Bỏ qua static files / API
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/robots.txt') ||
        pathname.startsWith('/sitemap.xml') ||
        pathname.match(
            /\.(?:ico|png|jpg|jpeg|gif|svg|webp|css|js|map|json|txt|xml|mp4|webm|pdf|woff2?|ttf|eot)$/
        )
    ) {
        return NextResponse.next();
    }

    let region = req.cookies.get('region')?.value;

    if (!region) {
        try {
            const geoRes = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client');
            const data = await geoRes.json();
            const countryCode = data.countryCode;
            region = countryCode?.toLowerCase() || 'us';
        } catch {
            region = 'us';
        }

        if (!regions.includes(region as any)) {
            region = 'us';
        }
    }
    console.log(region);
    const firstPart = pathname.split('/')[1];

    if (!regions.includes(firstPart as any)) {
        const redirectUrl = new URL(`/${region}${pathname}`, req.url);
        const res = NextResponse.redirect(redirectUrl);

        // cookie 1 năm
        res.cookies.set('region', region ?? 'us', {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'lax',
            httpOnly: true,
        });

        return res;
    }

    const res = NextResponse.next();
    if (!req.cookies.get('region')) {
        res.cookies.set('region', firstPart, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'lax',
            httpOnly: true,
        });
    }

    return res;
}
