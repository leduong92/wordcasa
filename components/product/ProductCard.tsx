'use client';
import { ItemDto } from '@/modals';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface ProductCardProps {
    region: string;
    product: ItemDto;
}

const ProductCard = ({ region, product }: ProductCardProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(
        product?.itemVariantDtos[0]?.itemImageDtos?.[0]?.imageUrl ?? null
    );

    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleVariantClick = (img: string) => {
        if (img === activeImage) return;
        setIsLoading(true);
        setActiveImage(img);
    };

    if (!isMounted) return;
    return (
        <div className="flex flex-col h-full overflow-hidden ">
            <Link
                href={`/${region}/product/${product.slug}`}
                className="block flex-shrink-0 relative"
                aria-label={product.productName ?? 'Product link'}
            >
                <div className="h-[220px] md:h-[240px] lg:h-[260px] flex items-center justify-center bg-neutral-500/5">
                    {activeImage ? (
                        <>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-400 border-t-transparent"></div>
                                </div>
                            )}
                            <Image
                                src={`${activeImage}?profile=basic&w=420`}
                                alt={product.productName ?? ''}
                                width={420}
                                height={260}
                                className={`object-contain max-h-full transition-opacity duration-300 p-4 md:p-8 lg:p-14 ${
                                    isLoading ? 'opacity-0' : 'opacity-100'
                                }`}
                                priority={false}
                                onLoad={() => setIsLoading(false)}
                            />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                            <span className="text-sm">No image</span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="flex-1 flex flex-col pt-2">
                {/* Tên */}
                <Link href={`/${region}/product/${product.slug}`} className="">
                    <h3 className="text-sm font-medium tracking-wide hover:text-neutral-500">
                        {product.productName}
                    </h3>
                </Link>

                {/* SKU */}
                <div className="text-neutral-500 select-text tracking-wider mt-2 text-sm">
                    {product.parentCode}
                </div>

                {/* Variants */}
                {product.itemVariantDtos.length > 1 && (
                    <div className="flex items-center gap-1 mt-3">
                        {product.itemVariantDtos.map((variant, idx) => {
                            const imgUrl = variant.itemImageDtos?.[0]?.imageUrl;
                            if (!imgUrl) return null;

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleVariantClick(imgUrl)}
                                    className={`w-10 h-10 border rounded-full cursor-pointer overflow-hidden flex items-center justify-center 
                                    ${
                                        activeImage === imgUrl
                                            ? 'border-neutral-500'
                                            : 'border-neutral-50'
                                    }`}
                                >
                                    <Image
                                        src={`${imgUrl}?profile=basic&w=80`}
                                        alt={`variant ${idx}`}
                                        width={80}
                                        height={80}
                                        className="object-contain w-full h-full p-1"
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
