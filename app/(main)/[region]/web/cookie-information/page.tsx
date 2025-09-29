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
        title: 'Cookie Information | Worldcasa',
        description: ``,
    };
}
const CookieInformationPage = () => {
    return <div>CookieInformationPage</div>;
};

export default CookieInformationPage;
