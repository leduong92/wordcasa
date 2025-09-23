'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ItemDto, ItemVariantDto } from '@/modals';
import { ShoppingBag } from 'lucide-react';

declare var Sirv: any;

export default function ProductVariantClient({ product }: { product: ItemDto }) {
    const [selectedVariant, setSelectedVariant] = useState<ItemVariantDto>(
        product.itemVariantDtos[0]
    );

    useEffect(() => {
        if (typeof Sirv !== 'undefined' && Sirv.start) {
            // Re-run Sirv.start() on the updated container
            // The `Sirv.start()` function will find the new .Sirv container and
            // initialize the viewer for the new variant's images.
            Sirv.start();
        }
    }, [selectedVariant]);

    const handleVariantClick = (variant: ItemVariantDto) => {
        setSelectedVariant(variant);
    };

    return (
        <div className="grid grid-cols-1 md:lg:grid-cols-10 gap-12 pt-5">
            {/* Left: Sticky Images */}
            <div className="relative lg:col-span-7">
                <div className="sticky top-24">
                    <div className="flex flex-col gap-4">
                        <div
                            key={selectedVariant.id}
                            className="Sirv w-full object-contain aspect-video"
                            data-options="zoom.hint.enable:false; thumbnails.position:left; thumbnails.align:start; thumbnails.size:120; viewer.fit:contain"
                        >
                            {selectedVariant?.itemImageDtos?.map((item, idx) => (
                                <div
                                    key={item.id || idx}
                                    className="p-3"
                                    data-src={`${item.imageUrl}?profile=basic`}
                                    data-alt={`Product image ${idx + 1} of ${product.productName}`}
                                    aria-label={`${product.parentCode}_Image_${idx}`}
                                    data-type="zoom"
                                    data-options="mode:deep; trigger:click"
                                >
                                    <noscript>
                                        <Image
                                            src={`${item.imageUrl ?? ''}?profile=basic&w=600&h=600`}
                                            alt={`Product ${idx}`}
                                            width={600}
                                            height={600}
                                            className="rounded-lg object-cover w-full"
                                        />
                                    </noscript>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Product Info & Variants */}
            <div className="space-y-8 lg:col-span-3">
                <div>
                    <h1 className="text-3xl font-semibold">{product.productName}</h1>
                    <p className="pt-2 text-neutral-800">{selectedVariant.sku}</p>
                    <p className="text-lg text-gray-700 mt-3">
                        ${selectedVariant.itemPriceDtos?.[0].price}
                    </p>
                </div>

                {/* Display Dimensions based on selected variant */}
                <div>
                    <p
                        className="text-lg text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{
                            __html: `${selectedVariant.dimensions ?? 0} in`,
                        }}
                    ></p>
                    <p className="text-lg text-gray-700 mt-2">{selectedVariant.dimensionsCM} cm</p>
                </div>

                {/* Variant Selector */}
                {product.itemVariantDtos.length > 1 && (
                    <div>
                        <h2 className="text-lg font-medium mb-2">Finish</h2>
                        <div className="flex flex-wrap gap-2">
                            {product.itemVariantDtos.map((variant, idx) => {
                                const imgUrl = variant.itemImageDtos?.[0]?.imageUrl;
                                if (!imgUrl) return null;

                                return (
                                    <button
                                        key={variant.id || idx}
                                        type="button"
                                        onClick={() => handleVariantClick(variant)}
                                        className={`w-32 h-32 border cursor-pointer overflow-hidden flex items-center justify-center 
                                        ${
                                            selectedVariant.id === variant.id
                                                ? 'border-neutral-500'
                                                : 'border-neutral-50'
                                        }`}
                                    >
                                        <Image
                                            src={`${imgUrl}?profile=basic&w=80`}
                                            alt={`variant ${idx}`}
                                            width={150}
                                            height={150}
                                            className="object-contain w-full h-full p-1"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Add to Cart button and other interactive elements can go here */}
                <button className="w-full bg-black text-white py-3 rounded-md text-lg flex gap-3">
                    <ShoppingBag />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
}
