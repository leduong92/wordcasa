import OrderPage from '@/components/orders/page/OrderPage';
import OrderRow from '@/components/orders/OrderRow';
import { translations } from '@/i18n';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';

interface Order {
    id: string;
    date: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    itemCount: number;
}

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
        title: 'Orders | World Casa',
        description: 'Orders',
    };
}

const orders = [
    {
        id: 'ORD-1001',
        date: '2025-10-05',
        total: 245.5,
        status: 'Delivered',
        itemCount: 2,
    },
    {
        id: 'ORD-1002',
        date: '2025-09-20',
        total: 89.9,
        status: 'Processing',
        itemCount: 3,
    },
    {
        id: 'ORD-1003',
        date: '2025-09-10',
        total: 159.0,
        status: 'Shipped',
        itemCount: 1,
    },
] as Order[];

const OrdersPage = async ({ params, searchParams }: PageProps) => {
    const { region } = await params;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <OrderPage orderInput={orders} region={region} />
        </div>
    );
};

export default OrdersPage;
