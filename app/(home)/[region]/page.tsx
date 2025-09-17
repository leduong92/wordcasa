import Image from 'next/image';
import HomeLayout from '../../../components/layout/home/HomeLayout';
import ShopByCategory from '@/components/layout/home/ShopByCategory';
import { cookies } from 'next/headers';
import { translations } from '@/i18n';
import ShopTheLook from '@/components/ShopTheLook';

export default async function HomePage({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';

    return (
        <HomeLayout region={region} lang={lang}>
            <section className="relative w-full">
                <div className="aspect-video w-full">
                    <video
                        // autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                    >
                        <source
                            src="https://theodorealexander.sirv.com/Videos/Home_Videos/TA_introduction_041_2.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                {/* Overlay content */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center"></div>
            </section>

            <section className="px-4 md:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-5 w-full h-full">
                    {/* Text content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center lg:px-16">
                        <span className="text-4xl font-bold text-center">Paris</span>
                        <p className="mt-4 text-gray-700 leading-8 text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis unde
                            odio quaerat corrupti modi eveniet aspernatur, ratione tenetur dicta
                            consequuntur reiciendis, ullam atque cupiditate, aliquam non molestias.
                            Voluptatum, maxime qui?
                        </p>
                    </div>

                    {/* Image with fill */}
                    <div className="w-full md:w-1/2 flex items-center justify-center ">
                        <div className="w-full aspect-video relative overflow-hidden rounded-md">
                            <Image
                                src="/bed_1.jpg"
                                alt="Paris"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-5 w-full h-full pt-8">
                    {/* Text content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center lg:p-16">
                        <span className="text-4xl font-bold text-center">Seoul</span>
                        <p className="mt-4 text-gray-700 leading-8 text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis unde
                            odio quaerat corrupti modi eveniet aspernatur, ratione tenetur dicta
                            consequuntur reiciendis, ullam atque cupiditate, aliquam non molestias.
                            Voluptatum, maxime qui?
                        </p>
                    </div>

                    {/* Image with fill */}
                    <div className="w-full md:w-1/2 flex items-center justify-center ">
                        <div className="w-full aspect-video relative overflow-hidden rounded-md">
                            <Image
                                src="/bed_2.jpg"
                                alt="Seoul"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* <div className="flex flex-col md:flex-row gap-5 w-full h-full pt-8">
                    <div className="w-full md:w-1/2 flex flex-col justify-center lg:p-16 ">
                        <span className="text-4xl font-bold text-center">Madrid</span>
                        <p className="mt-4 text-gray-700 leading-8 text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis unde
                            odio quaerat corrupti modi eveniet aspernatur, ratione tenetur dicta
                            consequuntur reiciendis, ullam atque cupiditate, aliquam non molestias.
                            Voluptatum, maxime qui?
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <div className="w-full aspect-video relative overflow-hidden rounded-md">
                            <Image
                                src="/bed_3.jpg"
                                alt="Madrid"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div> */}
            </section>

            <section className="px-4 md:px-8 py-8">
                <ShopByCategory region={region} />
            </section>

            <section className="px-4 md:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col justify-center items-center lg:px-16 w-full md:w-1/3">
                        <h1 className="text-3xl font-medium">Discover our timeless designs</h1>
                        <p className="mt-4 text-gray-700 leading-8 text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure
                            impedit esse aliquid quam. Fuga debitis, nisi sapiente eaque doloribus
                            nam non laudantium voluptas saepe iusto, facere qui aliquid ad.
                        </p>
                    </div>
                    <div className="w-full md:w-2/3">
                        <div className="columns-2 gap-8 ">
                            <img className="aspect-3/2 rounded-2xl p-2" src="/bed_2.jpg" />
                            <img className="aspect-square rounded-2xl p-2" src="/chair.jpg" />
                            <img className="aspect-square rounded-2xl p-2" src="/nighstand.jpg" />
                            <img className="aspect-3/2 rounded-2xl p-2" src="/bed_3.jpg" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-8 py-8">
                <div className="text-center">
                    <h3 className="text-base md:text-2xl">The Art of Living Danishly</h3>
                    <h1 className="text-2xl md:text-4xl font-bold">
                        Introducing our new bed collections
                    </h1>
                </div>
                <div className="grid grid-cols-2 gap-8 py-8">
                    <div className="">
                        <Image
                            src={`/bed_1.jpg`}
                            alt="bed"
                            width={600}
                            height={550}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="">
                        <Image
                            src={`/bed_2.jpg`}
                            alt="bed"
                            width={600}
                            height={550}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-8 py-8">
                <ShopTheLook />
            </section>
        </HomeLayout>
    );
}
