import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import CheckoutPage from '@/components/checkout/CheckoutPage';
import { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
    params: Promise<{ region: string }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: 'Checkout | Worldcasa',
        description: ``,
    };
}
export default async function CheckoutLayout({ params }: PageProps) {
    const { region } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
        const callbackUrl = `/${region}/checkout`;
        // redirect(`/auth/login?callbackUrl=${callbackUrl}`);
    }

    return <CheckoutPage region={region} />;
}
