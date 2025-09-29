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
        title: 'Customer Service | Worldcasa',
        description: ``,
    };
}
const CustomerServicePage = () => {
    return <div>CustomerServicePage</div>;
};

export default CustomerServicePage;
