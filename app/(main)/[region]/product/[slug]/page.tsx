import ShopByCategory from '@/components/ShopByCategory';
import ProductVariantClient from '@/components/product/ProductDetailClient';
import { apiClient } from '@/lib/apiClient';
import { ItemDto } from '@/modals';
import Script from 'next/script';
import React from 'react';

import type { Metadata, ResolvingMetadata } from 'next';
import ProductRelated from '@/components/product/ProductRelated';

type PageProps = {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params, searchParams }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, region } = await params;

    const response = await apiClient.get<ItemDto>(`/api/item/${region}/${slug}`, {
        next: { revalidate: 60 },
    });

    return {
        title: response.data?.productName + ' | Worldcasa',
        description: response.data?.description,
    };
}

async function getProductDetail(region: string, slug: string) {
    const response = await apiClient.get<ItemDto>(`/api/item/${region}/${slug}`, {
        next: { revalidate: 60 },
    });
    if (!response.isSuccess) return null;
    return response.data;
}

const ProductDetailPage = async ({ params }: { params: { region: string; slug: string } }) => {
    const { slug, region } = await params;
    const product = await getProductDetail(region, slug);

    if (!product) {
        return <div>Product not found.</div>;
    }
    console.log(product.relatedItems);

    return (
        <div className="pt-5">
            {/* Main content, passing product data to the Client Component */}
            <ProductVariantClient product={product} />

            <section className="px-8 py-8">
                <div>
                    <h1 className="font-semibold  text-3xl">We also recommend</h1>
                </div>
                <div className="py-8">
                    <ProductRelated region={region} items={product.relatedItems} />
                </div>
            </section>

            <section className="px-8 py-8">
                <ShopByCategory region={region} />
            </section>

            <Script src="https://scripts.sirv.com/sirvjs/v3/sirv.js" strategy="lazyOnload" />

            <Script id="sirvZoom">
                {`
                var SirvOptions = {
                    viewer: {
                      zoom: {
                        mode: 'deep',
                      }
                    }
                  }
                `}
            </Script>
        </div>
    );
};

export default ProductDetailPage;
