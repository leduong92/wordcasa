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
        title: 'Store | Worldcasa',
        description: ``,
    };
}
const StorePage = () => {
    return <div>StorePage</div>;
};

export default StorePage;
