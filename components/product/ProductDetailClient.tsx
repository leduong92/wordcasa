'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CommonPageProps, ItemDto, ItemVariantDto } from '@/modals';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import AddToCartButton from '../cart/AddToCartButton';
import { formatCurrency } from '@/lib/utils';
import { CalendarDays, Container, CreditCard, Package, Truck } from 'lucide-react';
import Link from 'next/link';

declare var Sirv: any;

interface Props extends CommonPageProps {
    product: ItemDto;
}

export default function ProductVariantClient({ product, t, region }: Props) {
    const [selectedVariant, setSelectedVariant] = useState<ItemVariantDto>(
        product.itemVariantDtos[0]
    );

    const [options, setOptions] = useState(
        'zoom.hint.enable:false; thumbnails.position:left; thumbnails.align:start; thumbnails.size:110; viewer.fit:contain'
    );

    useEffect(() => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            setOptions('zoom.hint.enable:false; viewer.fit:contain');
        }
    }, []);

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
        <div className="grid grid-cols-1 md:lg:grid-cols-10 gap-8 md:gap-12 pt-4">
            {/* Left: Sticky Images */}
            <div className="relative lg:col-span-7">
                <div className="sticky top-28">
                    <div className="flex flex-col gap-4 h-[600px]">
                        <div
                            key={selectedVariant.id}
                            className="Sirv w-full object-contain"
                            data-options={options}
                        >
                            {selectedVariant?.itemImageDtos?.map((item, idx) => (
                                <div
                                    key={item.id || idx}
                                    className="p-8 md:p-16 h-full"
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
                                            className="rounded-lg object-cover w-full p-8"
                                        />
                                    </noscript>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Product Info & Variants */}
            <div className="space-y-6 lg:col-span-3">
                <div>
                    <h1 className="text-3xl font-semibold">{product.productName}</h1>
                    <p className="pt-2 text-neutral-600 tracking-wide">{selectedVariant.sku}</p>
                </div>

                {/* Display Dimensions based on selected variant */}
                <div>
                    <p
                        className=" text-gray-700 text-sm"
                        dangerouslySetInnerHTML={{
                            __html: `${selectedVariant.dimensions ?? 0} in`,
                        }}
                    ></p>
                    <p className="text-sm text-gray-700">{selectedVariant.dimensionsCM} cm</p>
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
                                        className={`w-24 h-24 border cursor-pointer overflow-hidden flex items-center justify-center 
                                        ${
                                            selectedVariant.id === variant.id
                                                ? 'border-neutral-500'
                                                : 'border-neutral-50'
                                        }`}
                                        aria-label={`Selected Variant ${idx}`}
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

                <div>
                    <p className="text-sm text-neutral-600 py-1">Retail price </p>
                    <p className="text-lg text-gray-700 font-medium font-helve tracking-wide">
                        {formatCurrency(selectedVariant.itemPriceDtos?.[0].price ?? 0)}
                    </p>
                </div>

                {/* Add to Cart button and other interactive elements can go here */}
                <AddToCartButton item={product} variant={selectedVariant} />

                {/* DeliveryInfo */}
                <div className="space-y-4 text-sm text-gray-600 tracking-wide pt-2">
                    {/* Ship to */}
                    <div className="flex items-start gap-2">
                        <Package className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                            <p>
                                Ship to{' '}
                                <Link href="#" className="underline underline-offset-4">
                                    Los Angeles, 90024
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* In stock */}
                    <div className="flex items-start gap-2">
                        <svg
                            className="w-5 h-5 text-emerald-600 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                            <p className="text-emerald-600 font-semibold">In stock</p>
                            <p className="text-gray-500">
                                Item is unavailable for viewing in showroom.
                            </p>
                        </div>
                    </div>

                    {/* Ship from */}
                    <div className="flex items-start gap-2">
                        <Container className="w-5 h-5 text-gray-600 mt-0.5" />
                        <p>Ship from Los Angeles</p>
                    </div>

                    {/* Delivery estimated */}
                    <div className="flex items-start gap-2">
                        <CalendarDays className="w-5 h-5 text-gray-600 mt-0.5" />
                        <p>
                            Delivery Estimated{' '}
                            <span className="font-semibold text-neutral-800">
                                Within Oct 7 – Oct 14
                            </span>
                        </p>
                    </div>

                    {/* Delivery policy */}
                    <div className="flex items-start gap-2">
                        <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                            <p>Delivery calculated per shipment*</p>
                            <Link href="#" className="underline underline-offset-4 text-xs">
                                View full Delivery Policy here
                            </Link>
                        </div>
                    </div>

                    {/* Pay later */}
                    <div className="flex items-start gap-2">
                        <CreditCard className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                            <p>Pay Later</p>
                            <p className="text-gray-500 text-xs">With monthly installments</p>
                        </div>
                    </div>
                </div>

                {/* Product information */}
                <div className="pt-2">
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="cursor-pointer">
                                Product Information
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                                <p>
                                    Key features include advanced processing capabilities, and an
                                    intuitive user interface designed for both beginners and
                                    experts.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="cursor-pointer">
                                Shipping Details
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    We offer worldwide shipping through trusted courier partners.
                                    Standard delivery takes 3-5 business days, while express
                                    shipping ensures delivery within 1-2 business days.
                                </p>
                                <p>
                                    All orders are carefully packaged and fully insured. Track your
                                    shipment in real-time through our dedicated tracking portal.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="cursor-pointer">
                                Return Policy
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    We stand behind our products with a comprehensive 30-day return
                                    policy. If you&apos;re not completely satisfied, simply return
                                    the item in its original condition.
                                </p>
                                <p>
                                    Our hassle-free return process includes free return shipping and
                                    full refunds processed within 48 hours of receiving the returned
                                    item.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
