import VideoPlayer from '@/components/VideoPlayer';
import { translations } from '@/i18n';
import { apiClient } from '@/lib/apiClient';
import { CategoryLandingPageDto, CollectionDto } from '@/modals';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react';

interface CollectionPageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string[] | undefined>>;
}

const CollectionPage = async ({ params, searchParams }: CollectionPageProps) => {
    const { region, slug } = await params;
    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];
    console.log(slug);

    const response = await apiClient.get<CategoryLandingPageDto>(
        `/api/item/category/${region}/${slug}`
    );

    const item = response.data;

    return (
        <div>
            <div>
                <div className="w-full mx-auto py-8 lg:py-16">
                    <h1 className="text-4xl lg:text-6xl font-bold">{item?.metaDescription}</h1>
                    <p className="pt-2">{item?.description}</p>
                </div>

                <div className="relative w-full mx-auto">
                    <VideoPlayer
                        videoClass="w-full h-auto object-cover"
                        src="/videos/home_01.mp4"
                    />
                </div>
            </div>
            <div className="pt-8">
                <h1 className="text-3xl py-5">Discover our table designs</h1>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {item?.collectionDtos.map((c) => (
                            <div key={c.name} className="group">
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
                                <h3 className="mt-4 text-lg font-semibold">{c.name}</h3>
                                <a
                                    href={`/${region}/collection/${c.slug}`}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                                >
                                    <span>Meet {c.name}</span>
                                    <span>→</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;
