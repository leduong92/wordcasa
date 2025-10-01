import { NextRequest, NextResponse } from 'next/server';

const regions = ['us', 'id', 'vn'] as const;

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const geo = (req as any).geo; // ép kiểu any

    console.log('Vercel Geo Object:', geo);

    // console.log('Vercel Country Header:', req.headers.get('x-vercel-ip-country'));

    let region = geo?.toLowerCase() || 'us';
    if (!regions.includes(region as any)) {
        region = 'us';
    }
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

    const firstPart = pathname.split('/')[1];

    if (!regions.includes(firstPart as any)) {
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
