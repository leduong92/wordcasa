import ShopByCategory from '@/components/layout/home/ShopByCategory';
import ProductVariantClient from '@/components/product/ProductDetailClient';
import { apiClient } from '@/lib/apiClient';
import { ItemDto } from '@/modals';
import Image from 'next/image';
import Script from 'next/script';
import React from 'react';

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
        return <div>Sản phẩm không tồn tại.</div>;
    }

    return (
        <div className="pt-5">
            {/* Breadcrumb */}
            <div className="flex mb-5 gap-3">
                <span>Home</span>
                <span>/</span>
                <span>Products</span>
                <span>/</span>
                <span>{product?.productName}</span>
            </div>

            {/* Main content, passing product data to the Client Component */}
            <ProductVariantClient product={product} />

            <section className="px-8 py-8">
                <div>
                    <h1>We also recommend</h1>
                </div>
                <div></div>
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
