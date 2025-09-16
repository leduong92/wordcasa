import { apiClient } from '@/lib/apiClient';
import { ItemDto } from '@/modals';
import Image from 'next/image';
import React from 'react';

async function getProductDetail(slug: string) {
    const response = await apiClient.get<ItemDto>(`/api/item/${slug}`, {
        next: { revalidate: 60 },
    });
    if (!response.isSuccess) return null;
    return response.data;
}

const ProductDetailPage = async ({ params }: { params: { region: string; slug: string } }) => {
    const { slug } = await params;
    const product = await getProductDetail(slug);

    return (
        <>
            <div className="flex py-3 gap-3">
                <span>Home</span>
                <span>/</span>
                <span>Products</span>
                <span>/</span>
                <span>{product?.productName}</span>
            </div>
            <div className="grid grid-cols-1 md:lg:grid-cols-10 gap-12">
                {/* Left: Sticky Images */}
                <div className="relative lg:col-span-7">
                    <div className="sticky top-24">
                        <div className="flex flex-col gap-4">
                            {product?.itemVariantDtos?.[0]?.itemImageDtos?.map((img, idx) => (
                                <div key={idx} className="w-full">
                                    <Image
                                        src={img.imageUrl ?? ''}
                                        alt={`Product ${idx}`}
                                        width={800}
                                        height={600}
                                        className="rounded-lg object-cover w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="space-y-8 lg:col-span-3">
                    <div>
                        <h1 className="text-3xl font-semibold">Madison Chaise Sectional Sofa</h1>
                        <p className="text-lg text-gray-700 mt-2">$2,199</p>
                        <span className="text-sm text-red-500">New</span>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-2">Model</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border rounded">Fabric</button>
                            <button className="px-4 py-2 border rounded">Leather</button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-2">Material</h2>
                        <div className="flex gap-3">
                            <div className="w-16 h-16 border rounded bg-gray-200"></div>
                            <div className="w-16 h-16 border rounded bg-green-800"></div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-2">Orientation</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border rounded">Left Facing</button>
                            <button className="px-4 py-2 border rounded">Right Facing</button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-2">Warranty</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border rounded">2 Years - $89</button>
                            <button className="px-4 py-2 border rounded">3 Years - $149</button>
                            <button className="px-4 py-2 border rounded">5 Years - $199</button>
                        </div>
                    </div>

                    <button className="w-full bg-black text-white py-3 rounded-lg text-lg">
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;
