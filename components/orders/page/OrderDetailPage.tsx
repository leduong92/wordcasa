'use client';
import OrderDetailSkeleton from '@/components/orders/OrderDetailSkeleton';
import { ArrowLeft, CreditCard, MapPin, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import OrderProgress from '../OrderProgress';
import { CommonPageProps } from '@/modals';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    image: string;
}

interface OrderDetail {
    id: string;
    date: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered';
    shippingAddress: {
        name: string;
        phone: string;
        address: string;
        city: string;
        country: string;
    };
    paymentMethod: string;
    items: OrderItem[];
}

export default function OrderDetailPage({ region }: CommonPageProps) {
    const params = useParams();
    const orderId = params.id;
    const [order, setOrder] = useState<OrderDetail | null>(null);

    useEffect(() => {
        // Giả lập dữ liệu từ API
        setTimeout(() => {
            setOrder({
                id: orderId as string,
                date: '2025-10-05',
                total: 245.5,
                status: 'Delivered',
                paymentMethod: 'Visa •••• 5523',
                shippingAddress: {
                    name: 'Nguyen Van A',
                    phone: '0909 123 456',
                    address: '123 Le Loi Street',
                    city: 'Ho Chi Minh City',
                    country: 'Vietnam',
                },
                items: [
                    {
                        name: 'Leather Jacket',
                        quantity: 1,
                        price: 120,
                        image: '/bed_1.jpg',
                    },
                    {
                        name: 'White Sneakers',
                        quantity: 1,
                        price: 125.5,
                        image: '/bed_2.jpg',
                    },
                ],
            });
        }, 1500);
    }, [orderId]);

    if (!order) {
        return <OrderDetailSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-5xl mx-auto bg-neutral-50   rounded-2xl shadow-sm p-6">
                <Link
                    href={`/${region}/account/orders`}
                    className="flex items-center text-sm text-blue-500 hover:text-blue-600 mb-4"
                >
                    <ArrowLeft size={16} className="mr-1" /> Back to orders
                </Link>

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold text-neutral-600">Order #{order.id}</h1>
                    <p className="text-sm text-neutral-500">Placed on {order.date}</p>
                </div>

                <OrderProgress status={order.status} />

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {/* Shipping info */}
                    <div>
                        <h2 className="font-semibold text-neutral-800 mb-2 flex items-center gap-2">
                            <MapPin size={18} /> Shipping Information
                        </h2>
                        <div className="text-sm text-neutral-600 space-y-1">
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.phone}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>
                                {order.shippingAddress.city}, {order.shippingAddress.country}
                            </p>
                        </div>
                    </div>

                    {/* Payment info */}
                    <div>
                        <h2 className="font-semibold text-neutral-800 mb-2 flex items-center gap-2">
                            <CreditCard size={18} /> Payment Method
                        </h2>
                        <p className="text-sm text-neutral-600">{order.paymentMethod}</p>
                        <p className="text-sm text-neutral-600 mt-2">
                            Total:{' '}
                            <span className="font-semibold text-neutral-800">
                                ${order.total.toFixed(2)}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Items */}
                <div className="mt-8">
                    <h2 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                        <Package size={18} /> Order Items
                    </h2>
                    <div className="divide-y divide-gray-100">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover border"
                                    />
                                    <div>
                                        <p className="font-medium text-neutral-800">{item.name}</p>
                                        <p className="text-sm text-neutral-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-neutral-800">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 flex justify-end">
                    <div className="text-right">
                        <p className="text-neutral-500 text-sm">Subtotal:</p>
                        <p className="text-lg font-semibold text-neutral-800">
                            ${order.total.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
