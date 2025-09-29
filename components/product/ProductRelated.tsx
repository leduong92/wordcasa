'use client';

import { ItemRelatedDto } from '@/modals';
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import Link from 'next/link';

const ProductRelated = ({ region, items }: { region: string; items: ItemRelatedDto[] }) => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 5,
            spacing: 20,
        },
        breakpoints: {
            '(max-width: 1024px)': {
                slides: { perView: 3, spacing: 15 },
            },
            '(max-width: 768px)': {
                slides: { perView: 2, spacing: 10 },
            },
            '(max-width: 480px)': {
                slides: { perView: 1, spacing: 10 },
            },
        },
    });

    return (
        <div className="relative">
            {/* Slider */}
            <div ref={sliderRef} className="keen-slider">
                {items.map((item) => (
                    <div key={item.id} className="keen-slider__slide rounded-xl ">
                        <Link
                            href={`/${region}/product/${item.slug}`}
                            className="block flex-shrink-0 relative"
                        >
                            <div>
                                <div className="relative w-full h-[200px] bg-neutral-500/1">
                                    <Image
                                        src={`${item.imageUrl ?? ''}?profile=basic&w=400`}
                                        alt={item.productName ?? ''}
                                        fill
                                        className="object-contain rounded p-5"
                                    />
                                </div>
                            </div>
                        </Link>
                        <div className="flex-1 flex flex-col pt-2">
                            <h3 className="text-sm font-semibold text-left text-neutral-800 my-2">
                                {item.productName}
                            </h3>
                            <p className="text-sm text-left text-neutral-600 ">{item.parentCode}</p>

                            {item.variants.length > 1 && (
                                <div className="flex items-center gap-2 pt-1">
                                    {item.variants.map((variant, idx) => {
                                        const imgUrl = variant.images?.[0];
                                        if (!imgUrl) return null;

                                        return (
                                            <Link
                                                href={`/${region}/product/${item.slug}`}
                                                key={idx}
                                                className={`w-8 h-8 cursor-pointer overflow-hidden flex items-center justify-center`}
                                            >
                                                <Image
                                                    src={`${imgUrl}?profile=basic&w=80`}
                                                    alt={`variant ${idx}`}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain w-full h-full"
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductRelated;
