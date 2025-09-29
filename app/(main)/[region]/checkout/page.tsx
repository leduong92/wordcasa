import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import CheckoutPage from '@/components/checkout/CheckoutPage';

interface CheckoutPageProps {
    params: Promise<{ region: string }>;
}
export default async function CheckoutLayout({ params }: CheckoutPageProps) {
    const { region } = await params;
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
        const callbackUrl = `/${region}/checkout`;
        // redirect(`/auth/login?callbackUrl=${callbackUrl}`);
    }

    return <CheckoutPage region={region} />;
}
