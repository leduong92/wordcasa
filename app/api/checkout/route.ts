import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
});

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

export async function POST(req: Request) {
    try {
        const { items, shippingAddress } = await req.json();

        // Item: { name, price, quantity }
        const line_items = items.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100, // cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            metadata: {
                shipping_name: shippingAddress?.fullName,
                shipping_address: shippingAddress?.addressLine1,
                shipping_city: shippingAddress?.city,
                shipping_country: shippingAddress?.country,
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe checkout error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
