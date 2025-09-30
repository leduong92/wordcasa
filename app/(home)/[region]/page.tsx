import Image from 'next/image';
import HomeLayout from '../../../components/layout/home/HomeLayout';
import ShopByCategory from '@/components/ShopByCategory';
import { cookies } from 'next/headers';
import VideoPlayer from '@/components/VideoPlayer';
import Footer from '@/components/Footer';
import UserModal from '@/components/auth/AuthModal';
import CookieConsentPopup from '@/components/CookieConsentPopup';
import JoinMailList from '@/components/JoinMailList';

export default async function HomePage({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';

    return (
        <>
            <HomeLayout region={region} lang={lang}>
                <section className="relative h-screen w-full">
                    <VideoPlayer
                        videoClass="absolute top-0 left-0 w-full h-full object-cover"
                        src="/videos/home_01.mp4"
                    />
                </section>

                <section className="px-4 md:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-5 w-full h-full">
                        {/* Text content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center lg:px-16">
                            <span className="text-4xl font-bold text-center">Living rooms</span>
                            <p className="mt-4 text-gray-700 leading-8 text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                                unde odio quaerat corrupti modi eveniet aspernatur, ratione tenetur
                                dicta consequuntur reiciendis, ullam atque cupiditate, aliquam non
                                molestias. Voluptatum, maxime qui?
                            </p>
                        </div>

                        {/* Image with fill */}
                        <div className="w-full md:w-1/2 flex items-center justify-center ">
                            <div className="w-full aspect-video relative overflow-hidden rounded-md">
                                <Image
                                    src="/bed_1.jpg"
                                    alt="Paris"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse gap-5 w-full h-full pt-8">
                        {/* Text content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center lg:p-16">
                            <span className="text-4xl font-bold text-center">Dining rooms</span>
                            <p className="mt-4 text-gray-700 leading-8 text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                                unde odio quaerat corrupti modi eveniet aspernatur, ratione tenetur
                                dicta consequuntur reiciendis, ullam atque cupiditate, aliquam non
                                molestias. Voluptatum, maxime qui?
                            </p>
                        </div>

                        {/* Image with fill */}
                        <div className="w-full md:w-1/2 flex items-center justify-center ">
                            <div className="w-full aspect-video relative overflow-hidden rounded-md">
                                <Image
                                    src="/bed_2.jpg"
                                    alt="Seoul"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 w-full h-full">
                        {/* Text content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center lg:px-16">
                            <span className="text-4xl font-bold text-center">Beds rooms</span>
                            <p className="mt-4 text-gray-700 leading-8 text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                                unde odio quaerat corrupti modi eveniet aspernatur, ratione tenetur
                                dicta consequuntur reiciendis, ullam atque cupiditate, aliquam non
                                molestias. Voluptatum, maxime qui?
                            </p>
                        </div>

                        {/* Image with fill */}
                        <div className="w-full md:w-1/2 flex items-center justify-center ">
                            <div className="w-full aspect-video relative overflow-hidden rounded-md">
                                <Image
                                    src="/bed_1.jpg"
                                    alt="Paris"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                <section className="px-4 md:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col justify-center items-center lg:px-16 w-full md:w-1/3">
                            <h1 className="text-3xl font-medium">Discover our timeless designs</h1>
                            <p className="mt-4 text-gray-700 leading-8 text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure
                                impedit esse aliquid quam. Fuga debitis, nisi sapiente eaque
                                doloribus nam non laudantium voluptas saepe iusto, facere qui
                                aliquid ad.
                            </p>
                        </div>
                        <div className="w-full md:w-2/3">
                            <div className="columns-2 gap-8 ">
                                <img className="aspect-3/2 rounded-2xl p-2" src="/bed_2.jpg" />
                                <img className="aspect-square rounded-2xl p-2" src="/chair.jpg" />
                                <img
                                    className="aspect-square rounded-2xl p-2"
                                    src="/nighstand.jpg"
                                />
                                <img className="aspect-3/2 rounded-2xl p-2" src="/bed_3.jpg" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-4 md:px-8 py-8">
                    <div className="text-center">
                        <h3 className="text-base md:text-3xl">The Art of Living </h3>
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

                {/* <section className="px-4 md:px-8 py-8">
                <ShopTheLook />
                </section> */}
            </HomeLayout>
            <Footer lang={lang} region={region} />
            <UserModal region={region} />
            <CookieConsentPopup />
        </>
    );
}
