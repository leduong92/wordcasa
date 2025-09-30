import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // file config next-auth

export async function POST(req: Request) {
    const body = await req.json();
    const { accessToken, refreshToken } = body;

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'No session' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
}
