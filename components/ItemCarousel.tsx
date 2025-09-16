'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ItemCategoryDto } from '@/modals';

export default function ItemCarousel({ items }: { items: ItemCategoryDto[] }) {
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
    console.log(items[0]);
    return (
        <div className="relative">
            {/* Slider */}
            <div ref={sliderRef} className="keen-slider">
                {items.map((item) => (
                    <div key={item.id} className="keen-slider__slide rounded-xl ">
                        <div className="relative w-full h-[200px]">
                            <Image
                                src={`${
                                    item.itemVariantDtos?.[0]?.itemImageDtos?.[0]?.imageUrl ?? ''
                                }?profile=basic&w=400`}
                                alt={item.productName}
                                fill
                                className="object-contain rounded p-5"
                            />
                        </div>
                        <h3 className="font-semibold text-center text-neutral-700 mt-4">
                            {item.productName}
                        </h3>
                        <p className="text-sm text-neutral-700 text-center">{item.sku}</p>
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
