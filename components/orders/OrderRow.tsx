'use client';

import { CommonPageProps } from '@/modals';
import { BadgeInfo } from 'lucide-react';
import Link from 'next/link';

interface OrderRowProps extends CommonPageProps {
    order: {
        id: string;
        date: string;
        total: number;
        status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
        itemCount: number;
    };
}

export default function OrderRow({ order, region, t }: OrderRowProps) {
    const statusColor: Record<string, string> = {
        Delivered: 'bg-green-100 text-green-700',
        Processing: 'bg-yellow-100 text-yellow-700',
        Shipped: 'bg-blue-100 text-blue-500',
        Cancelled: 'bg-red-100 text-red-700',
    };

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
            <td className="py-4 px-4 font-medium text-neutral-700">#{order.id}</td>
            <td className="py-4 px-4 text-neutral-600">{order.date}</td>
            <td className="py-4 px-4">
                <span
                    className={`text-sm px-2 py-1 rounded-full font-medium ${
                        statusColor[order.status]
                    }`}
                >
                    {order.status}
                </span>
            </td>
            <td className="py-4 px-4 text-right text-neutral-600">{order.itemCount}</td>
            <td className="py-4 px-4 text-right font-semibold text-neutral-700">
                ${order.total.toFixed(2)}
            </td>
            <td className="py-4 px-4 text-right">
                <Link
                    href={`/${region}/account/orders/${order.id}`}
                    className="text-sm text-blue-500 hover:text-blue-600 flex justify-end gap-2 items-center"
                >
                    View <BadgeInfo size={15} />
                </Link>
            </td>
        </tr>
    );
}
