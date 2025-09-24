import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface CheckoutPageProps {
    params: Promise<{ region: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { region } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
        const callbackUrl = `/${region}/checkout`;
        // redirect(`/auth/login?callbackUrl=${callbackUrl}`);
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Checkout - {region}</h1>
            <p>Welcome, {session?.user?.email}</p>
            {/* TODO: Checkout form */}
        </div>
    );
}
