import OrderDetailPage from '@/components/orders/page/OrderDetailPage';
import { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(
    { params, searchParams }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, region } = await params;

    return {
        title: 'Order Details | World Casa',
        description: 'Order Details',
    };
}

export default async function OrderDetailLayout({ params, searchParams }: PageProps) {
    const { region } = await params;

    return <OrderDetailPage region={region} />;
}
