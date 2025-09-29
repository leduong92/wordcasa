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
        title: 'Privacy | Worldcasa',
        description: ``,
    };
}
const PrivacyPolicyPage = () => {
    return <div>PrivacyPolicyPage</div>;
};

export default PrivacyPolicyPage;
