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
        title: 'Return Policy | Worldcasa',
        description: ``,
    };
}
const ReturnPolicyPage = () => {
    return <div>ReturnPolicyPage</div>;
};

export default ReturnPolicyPage;
