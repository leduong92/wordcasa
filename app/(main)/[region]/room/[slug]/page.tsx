import { translations } from '@/i18n';
import { apiClient } from '@/lib/apiClient';
import { CategoryLandingPageDto, CollectionDto, ItemCategoryDto } from '@/modals';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface RoomsPageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const RoomPage = async ({ params, searchParams }: RoomsPageProps) => {
    const { region, slug } = await params;

    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const response = await apiClient.get<CategoryLandingPageDto>(
        `/api/item/room/${region}/${slug}`
    );

    const item = response.data;

    return (
        <div className="pt-5">
            {/* Banner */}
            <div>
                <div className="w-full relative h-[550px] mb-10">
                    <Image src={'/bed_1.jpg'} fill alt="" className="object-cover rounded-md" />
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-neutral-50 px-6 rounded-md">
                        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
                            {item?.displayName}
                        </h2>
                        <p className="max-w-2xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nam
                            eligendi quam quidem, saepe aut culpa nulla non cum similique
                            consequuntur voluptates. Officiis voluptatem officia sed ipsam, pariatur
                            magni quasi.
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-16 md:px-32 py-16">
                <h1 className="font-bold text-4xl capitalize">Inspiring {item?.displayName}</h1>
                <p className="text-gray-600 mt-2">
                    Get inspiration from {item?.displayName} styled by our skilled Interior
                    Designers
                </p>
            </div>

            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {item?.collectionDtos?.map((item) => (
                        <Link
                            href={`/${region}/room/${slug}/${item.slug}`}
                            key={item.id}
                            className="flex flex-col"
                        >
                            <div className="relative w-full h-[350px]">
                                <img
                                    src={`/bed_1.jpg`}
                                    alt={item.displayName ?? ''}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <button className="mt-3 text-sm text-gray-700 hover:underline flex items-center gap-1">
                                <span>Explore {item.displayName}</span>
                                <span>↗</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomPage;
