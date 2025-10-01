import { NextRequest, NextResponse } from 'next/server';

import { ALL_COUNTRY_CODES } from './lib/countryCodes';

const ALL_REGIONS = ALL_COUNTRY_CODES;

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    // console.log('Vercel Country Header:', req.headers.get('x-vercel-ip-country'));
    const geoRegion = req.headers.get('x-vercel-ip-country');

    let region = geoRegion?.toLowerCase() || 'us';
    if (!ALL_REGIONS.includes(region as any)) {
        region = 'us';
    }
    // Ignore static files / API
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

    const firstPart = pathname.split('/')[1];

    if (!ALL_REGIONS.includes(firstPart as any)) {
        const redirectUrl = new URL(`/${region}${pathname}`, req.url);
        const res = NextResponse.redirect(redirectUrl);
        res.cookies.set('region', region, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'lax',
            httpOnly: true,
        });
        return res;
    }

    return NextResponse.next();
}
