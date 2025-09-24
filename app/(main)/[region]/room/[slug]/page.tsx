import VideoPlayer from '@/components/VideoPlayer';
import { translations } from '@/i18n';
import { apiClient } from '@/lib/apiClient';
import { CategoryLandingPageDto, CollectionDto, ItemCategoryDto } from '@/modals';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const RoomPage = async ({ params, searchParams }: PageProps) => {
    const { region, slug } = await params;

    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const response = await apiClient.get<CategoryLandingPageDto>(
        `/api/item/room/${region}/${slug}`
    );

    const item = response.data;
    const text = item?.displayName?.split('');
    return (
        <div className="pt-5">
            {/* Banner */}
            <div>
                <div className="w-full relative h-[600px] mb-10">
                    <VideoPlayer
                        src="/videos/home_01.mp4"
                        videoClass="w-full h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-900/30 flex flex-col justify-center items-center text-center text-neutral-200 px-6 rounded-md">
                        <h1 className="text-5xl font-semibold mb-4 flex tracking-wide">
                            {text?.map((char, i) => (
                                <span
                                    key={i}
                                    className="opacity-0 animate-fadeInChar"
                                    style={{ animationDelay: `${i * 0.1}s` }} // delay từng ký tự
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </h1>
                        <p className="max-w-2xl text-justify ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nam
                            eligendi quam quidem, saepe aut culpa nulla non cum similique
                            consequuntur voluptates. Officiis voluptatem officia sed ipsam, pariatur
                            magni quasi.
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-8 md:px-32 py-16">
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
