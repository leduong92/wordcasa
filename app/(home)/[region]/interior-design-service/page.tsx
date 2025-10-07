import HomeLayout from '@/components/layout/home/HomeLayout';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import { translations } from '@/i18n';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ScrollToForm from '../../../../components/interior-service/ScrollToForm';
import ProjectForm from '@/components/interior-service/ProjectForm';
import Footer from '@/components/Footer';
import UserModal from '@/components/auth/AuthModal';
import CookieConsentPopup from '@/components/layout/CookieConsentPopup';
import { MoveRight } from 'lucide-react';

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    return {
        title: 'Free interior design service | Worldcasa',
        description: `Free interior design service`,
    };
}
const InteriorDesignService = async ({ params }: { params: Promise<{ region: string }> }) => {
    const { region } = await params;

    const cookieStore = await cookies();
    const lang = (cookieStore.get('lang')?.value || 'en') as 'en' | 'id';
    const t = translations[lang];

    return (
        <>
            <HomeLayout region={region} lang={lang} t={t}>
                <section className="relative h-[600px] w-full">
                    <VideoPlayer
                        videoClass="absolute top-0 left-0 w-full h-full object-cover"
                        src="/videos/home_1.mp4"
                    />
                    <div className="absolute inset-0 bg-neutral-900/30 flex items-center justify-center px-4 text-center">
                        <div className="flex justify-center mb-10">
                            <div className="gap-3 space-y-5">
                                <span className="text-xl text-neutral-200">
                                    Get free styling advice
                                </span>
                                <h1 className="text-4xl text-neutral-200 font-semibold pt-2">
                                    Free interior design service
                                </h1>
                                <ScrollToForm region={region} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Information */}
                <section className="px-16 md:px-32 lg:px-64 py-12 text-gray-800">
                    {/* Header Section */}
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                            WorldCasa's Interior Design Services
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We offer complete design plans. Tell us about your home, your needs, and
                            your vision. Our team of experts will create a custom layout including
                            furniture recommendations and color coordination, just for you.
                        </p>

                        <p className="font-medium mb-4">It’s perfect for:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div>
                                <Image
                                    src="/1.svg"
                                    alt="Custom Designs"
                                    width={40}
                                    height={40}
                                    className="mb-2"
                                />
                                <p className="">Creating custom designs</p>
                                <p className="text-sm text-gray-600">for new spaces.</p>
                            </div>

                            <div>
                                <Image
                                    src="/1.svg"
                                    alt="Room Redesigns"
                                    width={40}
                                    height={40}
                                    className="mb-2"
                                />
                                <p className="">Complete room redesigns</p>
                                <p className="text-sm text-gray-600">for existing spaces.</p>
                            </div>

                            <div>
                                <Image
                                    src="/1.svg"
                                    alt="Layout Options"
                                    width={40}
                                    height={40}
                                    className="mb-2"
                                />
                                <p className="">Exploring layout options</p>
                                <p className="text-sm text-gray-600">to find the right fit.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Step */}
                <section className="px-16 md:px-32 lg:px-64 py-12 text-gray-800">
                    {/* Process Section */}
                    <div className="">
                        <h3 className="text-2xl font-semibold mb-6">3 Steps</h3>

                        <div className="grid md:grid-cols-3 gap-10">
                            {/* Step 1 */}
                            <div>
                                <Image
                                    src="/bed_1.jpg"
                                    alt="Step 1"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mb-3"
                                />
                                <span className="text-sm font-semibold">
                                    01. Meet your designer
                                </span>
                                <p className="text-xs py-1 text-neutral-600">
                                    We'll pair you with your interior design stylist, who will
                                    listen to your ideas and style, and plan your project.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div>
                                <Image
                                    src="/bed_2.jpg"
                                    alt="Step 2"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mb-3"
                                />
                                <span className="text-sm font-semibold">
                                    02. Co-create your designs
                                </span>
                                <p className="text-xs py-1 text-neutral-600">
                                    Time to visualise. We'll dive into colour, materials, texture,
                                    lighting, and layout to create your designs.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="space-y-3">
                                <Image
                                    src="/bed_3.jpg"
                                    alt="Step 3"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mb-3"
                                />
                                <span className="text-sm font-semibold">
                                    03. We’ll take care of the rest
                                </span>
                                <p className="text-xs py-1 text-neutral-600">
                                    Once you're happy with the design plan, we'll handle all the
                                    logistics, including delivery, set-up and styling.
                                </p>
                                <ScrollToForm region={region} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* 3D */}
                <section className="px-16 md:px-32 lg:px-64 py-12 text-gray-800">
                    <section className="px-4 md:px-8 py-8">
                        <div className="flex flex-col md:flex-row gap-5 w-full h-full">
                            {/* Text content */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center lg:px-16">
                                <span className="text-4xl font-bold">
                                    Great design is about asking the right questions
                                </span>
                                <p className="mt-4 text-gray-700 leading-8 text-justify">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Blanditiis unde odio quaerat corrupti modi eveniet aspernatur,
                                    ratione tenetur dicta consequuntur reiciendis, ullam atque
                                    cupiditate, aliquam non molestias. Voluptatum, maxime qui?
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
                                <span className="text-4xl font-bold">
                                    Visualise your future homes
                                </span>
                                <p className="mt-4 text-gray-700 leading-8 text-justify">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Blanditiis unde odio quaerat corrupti modi eveniet aspernatur,
                                    ratione tenetur dicta consequuntur reiciendis, ullam atque
                                    cupiditate, aliquam non molestias. Voluptatum, maxime qui?
                                </p>

                                <Link
                                    href={`/${region}/web/furniture-design`}
                                    className="py-3 flex items-center gap-1 font-semibold"
                                >
                                    Learn more about 3D <MoveRight size={15} />
                                </Link>
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
                    </section>
                </section>

                {/* Design Journey */}
                <section>
                    <div className="w-full">
                        {/* Section 1 – Hero */}
                        <section className="px-16 md:px-32 lg:px-64 py-12 text-gray-800">
                            <h2 className="text-4xl font-semibold leading-tight mb-2">
                                Your design journey begins... wherever you like
                            </h2>
                            <p className="text-gray-600 mb-10">
                                We understand life is busy. That’s why we offer you multiple ways to
                                begin your interior design journey with us.
                            </p>

                            {/* 3 Image Columns */}
                            <div className="grid md:grid-cols-3 gap-8">
                                {/* In store */}
                                <div>
                                    <div className="relative w-full h-[350px] mb-4">
                                        <Image
                                            src="/bed_4.jpg"
                                            alt="In store"
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <h3 className="font-semibold mb-1">In store</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Arrange a dedicated time slot at your local BoConcept store,
                                        see our entire range of products and materials in situ, and
                                        get started designing your space.
                                    </p>
                                </div>

                                {/* Virtually */}
                                <div>
                                    <div className="relative w-full h-[350px] mb-4">
                                        <Image
                                            src="/bed_4.jpg"
                                            alt="Virtually"
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <h3 className="font-semibold mb-1">Virtually</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        We can have a video call to chat about your space and
                                        understand your needs. Show us your home on the call, or
                                        don’t. It’s entirely up to you.
                                    </p>
                                </div>

                                {/* At home */}
                                <div>
                                    <div className="relative w-full h-[350px] mb-4">
                                        <Image
                                            src="/bed_4.jpg"
                                            alt="At home"
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <h3 className="font-semibold mb-1">At home</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        For the full immersive experience, our interior design
                                        stylist can visit you to see your space first-hand. Whatever
                                        size, they’ll have plenty of ideas.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 – Why you should get help */}
                        <section className="bg-[#313C35] text-white py-16 px-6">
                            <div className="px-6">
                                <h2 className="text-2xl font-semibold mb-10">
                                    Why you should get help from our stylists?
                                </h2>

                                <div className="grid md:grid-cols-3 gap-12">
                                    {/* 1 */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Free interior design service
                                        </h3>
                                        <p className="text-sm text-gray-300 font-semibold">
                                            We want you to experience the joy of designing your
                                            space with an expert, so we’ve included it for free.
                                        </p>
                                    </div>

                                    {/* 2 */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            No obligations
                                        </h3>
                                        <p className="text-sm text-gray-300 font-semibold">
                                            Fill in the form and we’ll arrange your complimentary
                                            consultation. Pay only for the products you choose.
                                        </p>
                                    </div>

                                    {/* 3 */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            You choose the time and place
                                        </h3>
                                        <p className="text-sm text-gray-300 font-semibold">
                                            We can meet you online, in store, or even at your home —
                                            choose a time and place that works for you.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <section className="py-12 text-gray-800">
                    <div id="form-section" className="p-8">
                        <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center">
                            Book Your Free Design Consultation
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <ProjectForm />
                            <div className="relative">
                                <Image
                                    src={`/bed_1.jpg`}
                                    fill
                                    alt="Interior Service Image"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </HomeLayout>
            <Footer lang={lang} region={region} t={t} />
            <UserModal region={region} t={t} />
            <CookieConsentPopup region={region} t={t} />
        </>
    );
};

export default InteriorDesignService;
