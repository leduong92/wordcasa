import { clientApi } from '@/lib/clientApi';
import { ShippingAddressDto } from '@/modals';
import React, { useEffect, useState } from 'react';
import AddressCardSkeleton from './AddressCardSkeleton';
import { Button } from '../ui/button';

interface CheckoutItem {
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface ShippingAddress {
    fullName: string;
    addressLine1: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
}

interface PaymentFormProps {
    items: CheckoutItem[];
    shippingAddress: ShippingAddress;
}

export default function PaymentForm({ items, shippingAddress }: PaymentFormProps) {
    const [addresses, setAddresses] = useState<ShippingAddressDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadAddresses() {
            setIsLoading(true);
            const res = await clientApi.get<ShippingAddressDto[]>(`/api/shippingaddress`, {
                withAuth: true,
            });
            const list = res.data ?? [];
            setAddresses(list);
            setIsLoading(false);
        }
        loadAddresses();
    }, []);

    const handlePay = async () => {
        try {
            setIsLoading(true);

            // const response = await fetch('/api/checkout', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         items,
            //         shippingAddress,
            //     }),
            // });

            // if (!response.ok) throw new Error('Failed to create checkout session');

            // const { id } = await response.json();

            // const stripe = await stripePromise;
            // if (!stripe) throw new Error('Stripe failed to load');

            // const { error } = await stripe.redirectToCheckout({
            //     sessionId: session.id,
            // });
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-600 py-1">
                {isLoading ? (
                    <AddressCardSkeleton />
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-neutral-600">
                            Shipping Address
                        </h2>
                        {addresses
                            .filter((x) => x.isActive == true)
                            .map((addr, idx) => (
                                <div key={addr.id} className={`rounded-md border p-5`}>
                                    <div className="font-semibold flex justify-between items-center">
                                        <span>
                                            {addr.shippingFirstName} {addr.shippingLastName}
                                        </span>
                                    </div>
                                    <span className="flex gap-2">
                                        {addr.shippingAddress1}{' '}
                                        {addr.isRuralArea && <p className="">(Rural Area)</p>}
                                    </span>
                                    <p>
                                        {addr.shippingCity}, {addr.shippingProvince}{' '}
                                        {addr.shippingZipCode}
                                    </p>
                                    <p>{addr.shippingCountryCode}</p>
                                    <p>{addr.shippingPhoneNumber}</p>
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <div className="py-5">
                <div className="p-6 space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Payment</h2>
                    <p className="text-neutral-500">
                        Click the button below to complete your payment securely via Stripe.
                    </p>

                    <Button
                        onClick={handlePay}
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isLoading ? 'Processing...' : 'Pay with Stripe'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
