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
        title: 'Terms Of Use | Worldcasa',
        description: ``,
    };
}
const TermsOfUsePage = () => {
    return <div>TermsOfUsePage</div>;
};

export default TermsOfUsePage;
