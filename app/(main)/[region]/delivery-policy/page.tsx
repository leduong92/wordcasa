import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
interface PageProps {
    params: Promise<{ region: string }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: 'Delivery Policy | Worldcasa',
        description: ``,
    };
}
const DeliveryPolicyPage = () => {
    return <div>DeliveryPolicyPage</div>;
};

export default DeliveryPolicyPage;
