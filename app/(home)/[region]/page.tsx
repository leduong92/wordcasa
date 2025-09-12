import Image from 'next/image';
import HomeLayout from '../../../components/layout/HomeLayout';
import { apiClient, PagedResult } from '@/lib/apiClient';
import { ItemDto } from '@/modals/itemDto';
import { GetManageItemPagingRequest } from '@/modals/getManageItemPagingRequest';

export default async function RegionHome({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;

    const request: GetManageItemPagingRequest = {
        pageIndex: 1,
        pageSize: 10,
    };

    const products = await apiClient.post<PagedResult<ItemDto>>(`/api/item/paging`, {
        body: JSON.stringify(request),
    });

    return (
        <HomeLayout region={region}>
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
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4 text-center"></div>
            </section>

            <section className="bg-gray-100">
                <div className="flex flex-col md:flex-row w-full h-full">
                    {/* Text content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center ">
                        <span className="text-2xl font-bold">Paris</span>
                        <p className="mt-4 text-gray-700">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis unde
                            odio quaerat corrupti modi eveniet aspernatur, ratione tenetur dicta
                            consequuntur reiciendis, ullam atque cupiditate, aliquam non molestias.
                            Voluptatum, maxime qui?
                        </p>
                    </div>

                    {/* Image with fill */}
                    <div className="w-full md:w-1/2 flex items-center justify-center ">
                        <div className="w-full aspect-video relative overflow-hidden">
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

                <div className="flex flex-col md:flex-row-reverse w-full h-full">
                    {/* Text content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center ">
                        <span className="text-2xl font-bold">Seoul</span>
                        <p className="mt-4 text-gray-700">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis unde
                            odio quaerat corrupti modi eveniet aspernatur, ratione tenetur dicta
                            consequuntur reiciendis, ullam atque cupiditate, aliquam non molestias.
                            Voluptatum, maxime qui?
                        </p>
                    </div>

                    {/* Image with fill */}
                    <div className="w-full md:w-1/2 flex items-center justify-center ">
                        <div className="w-full aspect-video relative overflow-hidden">
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

                <div className="flex flex-col md:flex-row w-full h-full">
                    {/* Text content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center ">
                        <span className="text-2xl font-bold">Madrid</span>
                        <p className="mt-4 text-gray-700">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis unde
                            odio quaerat corrupti modi eveniet aspernatur, ratione tenetur dicta
                            consequuntur reiciendis, ullam atque cupiditate, aliquam non molestias.
                            Voluptatum, maxime qui?
                        </p>
                    </div>

                    {/* Image with fill */}
                    <div className="w-full md:w-1/2 flex items-center justify-center ">
                        <div className="w-full aspect-video relative overflow-hidden">
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
            <div>
                {products.data?.items.map((itm) => (
                    <div>{itm.productName}</div>
                ))}
            </div>
            <section className="h-screen flex items-center justify-center bg-gray-300">
                <p className="text-xl">Next section 3 content...</p>
            </section>
        </HomeLayout>
    );
}
