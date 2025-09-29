import VideoPlayer from '@/components/VideoPlayer';
import { translations } from '@/i18n';
import { CategoryLandingPageDto } from '@/modals';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { capitalizeWords } from '@/lib/utils';
import { serverApi } from '@/lib/serverApi';

interface CollectionPageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string[] | undefined>>;
}

export async function generateMetadata(
    { params, searchParams }: CollectionPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, region } = await params;

    const response = await serverApi.get<CategoryLandingPageDto>(
        `/api/item/room/${region}/${slug}`
    );

    const item = response.data;

    return {
        title: item?.displayName + ' | Worldcasa',
        description: item?.description,
    };
}

const DiscoverRoomsPage = async ({ params, searchParams }: CollectionPageProps) => {
    const { region, slug } = await params;
    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const response = await serverApi.get<CategoryLandingPageDto>(
        `/api/item/room/${region}/${slug}`
    );

    const item = response.data;
    const text = item?.displayName?.split('');

    return (
        <div className="py-8 md:py-12">
            <div className="w-full relative h-[550px] mb-10">
                <VideoPlayer
                    src="/videos/living_room.mp4"
                    videoClass="w-full h-[550px] object-cover"
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
                        eligendi quam quidem, saepe aut culpa nulla non cum similique consequuntur
                        voluptates. Officiis voluptatem officia sed ipsam, pariatur magni quasi.
                    </p>
                </div>
            </div>
            <div className="pt-8">
                <div className="py-8 md:py-12">
                    <h1 className="text-3xl font-semibold">
                        Discover our <span className="lowercase">{capitalizeWords(slug)}</span>{' '}
                        designs
                    </h1>
                    <p className="text-neutral-600">
                        Get inspiration from{' '}
                        <span className="lowercase">{capitalizeWords(slug)}</span> styled by our
                        skilled Interior Designers
                    </p>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {item?.collectionDtos.map((c) => (
                            <Link
                                href={`/${region}/discover/rooms/${item.slug}/${c.slug}`}
                                key={c.id || c.slug}
                                className="group"
                            >
                                {/* Image */}
                                <div className="relative w-full h-80 overflow-hidden">
                                    <Image
                                        src={'/bed_1.jpg'}
                                        alt={c.displayName ?? ''}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}

                                <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-black py-2">
                                    <span>Explore {c.name}</span>
                                    <span>↗</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverRoomsPage;
