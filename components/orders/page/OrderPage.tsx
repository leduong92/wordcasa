'use client';

import { useEffect, useState } from 'react';
import OrderRow from '@/components/orders/OrderRow';
import OrdersSkeleton from '@/components/orders/OrdersSkeleton';
import Pagination from '@/components/orders/Pagination';
import { CommonPageProps } from '@/modals';

interface Order {
    id: string;
    date: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    itemCount: number;
}

interface OrderPageProps extends CommonPageProps {
    orderInput: Order[];
}

const OrderPage = ({ orderInput, region }: OrderPageProps) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 5; // số dòng mỗi trang

    useEffect(() => {
        setLoading(true);

        // Giả lập gọi API có phân trang
        setTimeout(() => {
            const allOrders: Order[] = Array.from({ length: 18 }).map((_, i) => ({
                id: `ORD-${1001 + i}`,
                date: `2025-09-${(i + 5).toString().padStart(2, '0')}`,
                total: 50 + Math.random() * 300,
                status: ['Processing', 'Shipped', 'Delivered'][i % 3] as any,
                itemCount: Math.floor(Math.random() * 4) + 1,
            }));

            const start = (page - 1) * pageSize;
            const paginated = allOrders.slice(start, start + pageSize);

            setOrders(paginated);
            setTotalPages(Math.ceil(allOrders.length / pageSize));
            setLoading(false);
        }, 1000);
    }, [page]);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6 text-neutral-700">Order History</h1>

                <div className="bg-neutral-50 shadow-sm rounded-2xl overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-neutral-500 text-sm">
                            <tr>
                                <th className="py-3 px-4 text-left">Order ID</th>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-right">Items</th>
                                <th className="py-3 px-4 text-right">Total</th>
                                <th className="py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <OrdersSkeleton rows={5} />
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-neutral-500 py-16">
                                        You have no orders yet.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <OrderRow key={order.id} order={order} region={region} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && orders.length > 0 && (
                    <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                )}
            </div>
        </div>
    );
};

export default OrderPage;
