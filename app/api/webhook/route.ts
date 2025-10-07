import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
});

export async function POST(req: Request) {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    //  Xử lý sự kiện
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Payment success:', session);
        //  Lưu order vào DB tại đây
    }

    return NextResponse.json({ received: true });
}
