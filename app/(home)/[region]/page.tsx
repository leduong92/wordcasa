import Image from 'next/image';
import HomeLayout from '../../../components/layout/home/HomeLayout';
import ShopByCategory from '@/components/layout/home/ShopByCategory';
import { cookies } from 'next/headers';
import { languages } from '@/i18n';

export default async function HomePage({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;

    const cookieStore = await cookies();
    let lang = cookieStore.get('lang')?.value || 'en';
    if (!languages.includes(lang as any)) {
        lang = 'en';
    }

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

                <div className="flex flex-col md:flex-row gap-5 w-full h-full pt-8">
                    {/* Text content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center lg:p-16 ">
                        <span className="text-4xl font-bold text-center">Madrid</span>
                        <p className="mt-4 text-gray-700 leading-8 text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis unde
                            odio quaerat corrupti modi eveniet aspernatur, ratione tenetur dicta
                            consequuntur reiciendis, ullam atque cupiditate, aliquam non molestias.
                            Voluptatum, maxime qui?
                        </p>
                    </div>

                    {/* Image with fill */}
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
                </div>
            </section>

            <section className="px-4 md:px-8 py-8">
                <ShopByCategory region={region} />
            </section>
        </HomeLayout>
    );
}
