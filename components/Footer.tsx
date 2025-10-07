import { CommonPageProps } from '@/modals';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = ({ lang, region, t }: CommonPageProps) => {
    return (
        <footer className="mt-24 px-4 md:px-8 lg:px-12">
            {/* Top section */}
            <div className="flex">
                <div className="hidden md:block w-1/3 border-b h-32"></div>
                <div className="md:col-span-2 flex gap-6 p-4 md:p-12 bg-neutral-200 rounded-xl w-full md:w-2/3">
                    <div className="flex-1 rounded-md overflow-hidden">
                        <Link href={`/${region}/fabric`} aria-label="Get fabrics samples">
                            <Image
                                src="/bed_3.jpg"
                                alt="Get free fabric samples"
                                width={300}
                                height={150}
                                className="w-full h-32 md:h-48 object-cover"
                            />
                            <p className="p-2 font-medium text-base">{t?.getSample}</p>
                        </Link>
                    </div>
                    <div className="flex-1 rounded-md overflow-hidden">
                        <Link
                            href={`/${region}/interior-design-service`}
                            aria-label="Need help? Let's talk"
                        >
                            <Image
                                src="/bed_4.jpg"
                                alt="Need help? Let's talk"
                                width={300}
                                height={150}
                                className="w-full h-32 md:h-48 object-cover"
                            />
                            <p className="p-2 font-medium text-base">{t?.help}</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8  py-10">
                {/* Left links */}
                <div className="space-y-2 text-base text-gray-700">
                    <div>
                        <Link
                            href={`/${region}/web/customer-service`}
                            aria-label={t?.customerService}
                        >
                            <p>{t?.customerService}</p>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/${region}/store`} aria-label={t?.findStore}>
                            <p>{t?.findStore}</p>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/${region}/about`} aria-label={t?.aboutUs}>
                            <p>{t?.aboutUs}</p>
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={`/${region}/web/delivery-policy`}
                            aria-label={t?.deliveryPolicy}
                        >
                            <p>{t?.deliveryPolicy}</p>
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={`/${region}/web/return-policy`}
                            aria-label={t?.saleReturnPilicy}
                        >
                            <p>{t?.saleReturnPilicy}</p>
                        </Link>
                    </div>
                </div>
                <div></div>
                {/* Social icons */}
                <div className="flex items-center justify-center gap-6 py-6">
                    <a
                        href="#"
                        className="p-2 border rounded-full hover:bg-gray-200"
                        aria-label="Facebook"
                    >
                        <Image src="/facebook.png" alt="" width={25} height={25} />
                    </a>
                    <a
                        href="#"
                        className="p-2 border rounded-full hover:bg-gray-200"
                        aria-label="Instagram"
                    >
                        <Image src="/instagram.png" alt="" width={25} height={25} />
                    </a>
                    {/* <a
                        href="#"
                        className="p-2 border rounded-full hover:bg-gray-200"
                        aria-label="Pinterest"
                    >
                        <Image src="/pinterest?.png" alt="" width={25} height={25} />
                    </a> */}
                    <a
                        href="#"
                        className="p-2 border rounded-full hover:bg-gray-200"
                        aria-label="Youtube"
                    >
                        <Image src="/youtube.png" alt="" width={25} height={25} />
                    </a>
                    <a
                        href="#"
                        className="p-2 border rounded-full hover:bg-gray-200"
                        aria-label="X"
                    >
                        <Image src="/x.png" alt="" width={25} height={25} />
                    </a>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                <Link href={'/'} aria-label="Worldcasa">
                    <p className="text-center md:text-left text-neutral-500">
                        {/* All prices are recommended retail prices in Vietnamese DONG (₫) and include VAT?. */}
                        © 2025 <span className="tracking-wider text-xs uppercase">WorldCasa</span>
                    </p>
                </Link>

                <div className="flex gap-6">
                    <Link
                        href={`/${region}/web/cookie-information`}
                        aria-label="cookie-information"
                    >
                        {t?.cookieInformation}
                    </Link>
                    <Link href={`/${region}/web/terms-of-use`} aria-label="terms-of-use">
                        {t?.termsOfUse}
                    </Link>
                    <Link href={`/${region}/web/privacy-policy`} aria-label="privacy-policy">
                        {t?.privacyPolicy}
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/paypal.png" alt="Apple Pay" className="h-6" />
                        <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                        <img src="/visa.png" alt="Visa" className="h-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
