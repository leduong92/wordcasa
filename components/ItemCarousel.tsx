'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CommonPageProps, ItemCategoryDto } from '@/modals';
import Link from 'next/link';

interface Props extends CommonPageProps {
    items: ItemCategoryDto[];
}

export default function ItemCarousel({ region, t, items }: Props) {
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
        <div className="relative ">
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
                                        src={`${
                                            item.itemVariantDtos?.[0]?.itemImageDtos?.[0]
                                                ?.imageUrl ?? ''
                                        }?profile=basic&w=400`}
                                        alt={item.productName}
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
                            <p className="text-sm text-left text-neutral-600 ">{item.sku}</p>

                            {item.itemVariantDtos.length > 1 && (
                                <div className="flex items-center gap-2 mt-3">
                                    {item.itemVariantDtos.map((variant, idx) => {
                                        const imgUrl = variant.itemImageDtos?.[0]?.imageUrl;
                                        if (!imgUrl) return null;

                                        return (
                                            <Link
                                                href={`/${region}/product/${item.slug}`}
                                                key={idx}
                                                className={`w-6 h-6 cursor-pointer overflow-hidden flex items-center justify-center`}
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

            {/* Prev Button */}
            <button
                onClick={() => instanceRef.current?.prev()}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Next Button */}
            <button
                onClick={() => instanceRef.current?.next()}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
                <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
        </div>
    );
}
