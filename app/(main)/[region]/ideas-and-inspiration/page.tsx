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

const categories = [
    { name: 'Living rooms', slug: 'living-room', image: '/denver_cocktail_table.jpg' },
    { name: 'Dining rooms', slug: 'dining-room', image: '/bed_2.jpg' },
    { name: 'Bedrooms', slug: 'bedroom', image: '/bed_3.jpg' },
];

interface CollectionPageProps {
    params: Promise<{ region: string; slug: string }>;
    searchParams: Promise<Record<string, string[] | undefined>>;
}

export async function generateMetadata(
    { params, searchParams }: CollectionPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, region } = await params;

    return {
        title: 'Ideas and Inspiration | Worldcasa',
        description: 'Ideas and Inspiration',
    };
}

const IdeasAndInspiration = async ({ params, searchParams }: CollectionPageProps) => {
    const { region, slug } = await params;
    const sp = await searchParams;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    const text = 'Ideas & Inspiration'.split('');

    return (
        <div className="py-8 md:py-16">
            <div className="w-full relative h-[450px] mb-10">
                <VideoPlayer
                    src="/videos/living_room.mp4"
                    videoClass="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-neutral-900/30 flex flex-col justify-center items-center text-center text-neutral-200 px-6 rounded-md">
                    <h1 className="text-2xl md:text-5xl font-semibold mb-4 flex tracking-wide">
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

            <div className="py-8 md:py-16">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                        <h1 className="text-4xl font-bold mb-4">Inspire Room Designs</h1>
                        <p className="py-4 text-justify leading-8">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem soluta
                            iusto consequuntur atque, doloremque dolores quaerat voluptas quasi?
                            Voluptatibus ducimus iure assumenda sequi velit consequatur eius iste
                            vitae quibusdam blanditiis?
                        </p>
                    </div>
                    <div className="md:w-2/3 flex md:justify-end">
                        <div className="flex space-x-8 md:w-2/3">
                            {categories.map((cat) => (
                                <Link
                                    href={`/${region}/discover/rooms/${cat.slug}`}
                                    key={cat.name}
                                    className="cursor-pointer group"
                                    aria-label={cat.name}
                                >
                                    <div className="">
                                        <Image
                                            src={cat.image}
                                            alt="New In"
                                            width={350}
                                            height={350}
                                            className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
                                        />
                                        <p className="mt-2 text-neutral-700">{cat.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8 md:py-12">
                <main className="w-full space-y-16">
                    {/* ==== Top section ==== */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="relative rounded-3xl overflow-hidden group">
                            <Image
                                src="/bed_1.jpg"
                                alt="Free room design advice"
                                width={800}
                                height={500}
                                className="object-cover w-full h-[350px] md:h-[420px] transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                                <div>
                                    <h2 className="text-white text-2xl md:text-3xl font-bold">
                                        Free room design advice.
                                    </h2>
                                    <p className="text-white/90 mt-2 text-sm md:text-base">
                                        Our team helps make your space personal, pretty, and
                                        practical.
                                    </p>
                                </div>
                                <Link
                                    href={`/${region}/interior-design-service#form-section`}
                                    className="self-start mt-6 bg-white text-neutral-800 text-sm font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-100 transition cursor-pointer"
                                >
                                    TALK TO AN EXPERT
                                </Link>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative rounded-3xl overflow-hidden group">
                            <Image
                                src="/bed_2.jpg"
                                alt="Customer Room Tours"
                                width={800}
                                height={500}
                                className="object-cover w-full h-[350px] md:h-[420px] transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                                <div>
                                    <h2 className="text-white text-2xl md:text-3xl font-bold">
                                        Customer Room Tours
                                    </h2>
                                    <p className="text-white/90 mt-2 text-sm md:text-base">
                                        See how real customers design and use their spaces.
                                    </p>
                                </div>
                                <button className="self-start mt-6 bg-white text-black text-sm font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-100 transition">
                                    BROWSE TOURS
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ==== Bottom section ==== */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            Design Tips & Guides
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Expert advice to help you plan, decorate, clean, and maximize
                            functionality in every room.
                        </p>

                        <div className="py-8">
                            <h3 className="text-xl font-semibold mb-4">Plan your room.</h3>

                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'Modern Living in a Small Space with Children',
                                        readTime: '5 min read',
                                    },
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'Add Personality to Your Minimalist Themed Decor',
                                        readTime: '1 min read',
                                    },
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'How to Create Modern Multifunctional Rooms',
                                        readTime: '4 min read',
                                    },
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'How to Create the Ultimate Modern Bedroom Retreat',
                                        readTime: '4 min read',
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="rounded-lg overflow-hidden mb-3">
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                width={400}
                                                height={250}
                                                className="object-cover w-full h-[180px]"
                                            />
                                        </div>
                                        <h4 className="text-sm md:text-base leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-xs">{item.readTime}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="py-8">
                            <h3 className="text-xl font-semibold mb-4">Material things.</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'Modern Living in a Small Space with Children',
                                        readTime: '5 min read',
                                    },
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'Add Personality to Your Minimalist Themed Decor',
                                        readTime: '1 min read',
                                    },
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'How to Create Modern Multifunctional Rooms',
                                        readTime: '4 min read',
                                    },
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'How to Create the Ultimate Modern Bedroom Retreat',
                                        readTime: '4 min read',
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="rounded-lg overflow-hidden mb-3">
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                width={400}
                                                height={250}
                                                className="object-cover w-full h-[180px]"
                                            />
                                        </div>
                                        <h4 className="text-sm md:text-base leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-xs">{item.readTime}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="py-8">
                            <h3 className="text-xl font-semibold mb-4">Order with confidence.</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'Modern Living in a Small Space with Children',
                                        readTime: '5 min read',
                                    },
                                    {
                                        img: '/bed_2.jpg',
                                        title: 'Add Personality to Your Minimalist Themed Decor',
                                        readTime: '1 min read',
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="rounded-lg overflow-hidden mb-3">
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                width={400}
                                                height={250}
                                                className="object-cover w-full h-[180px]"
                                            />
                                        </div>
                                        <h4 className="text-sm md:text-base leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-xs">{item.readTime}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default IdeasAndInspiration;
