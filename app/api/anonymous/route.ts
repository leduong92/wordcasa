// app/api/anonymous/route.ts
import { cookies } from 'next/headers';

export async function GET() {
    const anonymousId = (await cookies()).get('AnonymousId')?.value ?? null;
    return Response.json({ anonymousId });
}
